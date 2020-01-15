Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.BicValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * This constraint is used to ensure that a value has the proper format of a {@link https://en.wikipedia.org/wiki/Business_Identifier_Code|Business Identifier Code (BIC)}.
     * BIC is an internationally agreed means to uniquely identify both financial and non-financial institutions.
     * You may also check that the BIC is associated with a given IBAN.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.BicValidator(data);
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.BicValidator#iban
     * @type {String}
     * @description
     * An IBAN value to validate that the BIC is associated with it.
     * Default: null
     */

    /**
     * @name abv.BicValidator#ibanMessage
     * @type {String}
     * @description
     * The default message supplied when the value does not pass the combined BIC/IBAN check.
     * Default: "This Business Identifier Code (BIC) is not associated with IBAN %%iban%%."
     * You can use the following parameters in this message:
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td>%%iban%%</td>
     *             <td>The current IBAN value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name abv.BicValidator#message
     * @type {String}
     * @description
     * The default message supplied when the value does not pass the BIC check.
     * Default: "This is not a valid Business Identifier Code (BIC)."
     * You can use the following parameters in this message:
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td>%%value%%</td>
     *             <td>The current (invalid) BIC value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var BicValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            iban: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            ibanMessage: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            message: 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.BIC_COUNTRY_TO_IBAN_COUNTRY_MAP = {
            // Reference: https://www.ecbs.org/iban/france-bank-account-number.html
            'GF': 'FR', // French Guiana
            'PF': 'FR', // French Polynesia
            'TF': 'FR', // French Southern Territories
            'GP': 'FR', // Guadeloupe
            'MQ': 'FR', // Martinique
            'YT': 'FR', // Mayotte
            'NC': 'FR', // New Caledonia
            'RE': 'FR', // Reunion
            'PM': 'FR', // Saint Pierre and Miquelon
            'WF': 'FR', // Wallis and Futuna Islands
            // Reference: https://www.ecbs.org/iban/united-kingdom-uk-bank-account-number.html
            'JE': 'GB', // Jersey
            'IM': 'GB', // Isle of Man
            'GG': 'GB', // Guernsey
            'VG': 'GB', // British Virgin Islands
        };

        this.iban = this.__options.iban || null;
        this.ibanMessage = this.__options.ibanMessage || 'This Business Identifier Code (BIC) is not associated with IBAN %%iban%%.';
        this.message = this.__options.message || 'This is not a valid Business Identifier Code (BIC).';

        this.name = 'BicValidator';
    };
    BicValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    BicValidator.prototype.constructor = BicValidator;

    Object.defineProperty(BicValidator.prototype, 'alias', {
        get: function () {
            return 'bic';
        }
    });

    Object.assign(BicValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.BicValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            var canonicalize = this.data.split(' ').join('');

            // the bic must be either 8 or 11 characters long
            if (false === [8, 11].includes(canonicalize.length)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // must contain alphanumeric values only
            if (false === abv.isType('alnum', canonicalize)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // first 4 letters must be alphabetic (bank code)
            if (false === abv.isType('alpha', canonicalize.substr(0, 4))) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            if (null !== abv.isValidWithErrorMessage(canonicalize.substr(4, 2), 'country', true)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // should contain uppercase characters only
            if (canonicalize.toUpperCase() !== canonicalize) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // check against an IBAN
            if (null === this.iban) {
                return ;
            }

            var ibanCountryCode = this.iban.substr(0, 2);
            if (
                true === abv.isType('alpha', ibanCountryCode)
                && this.__bicAndIbanCountriesMatch(canonicalize.substr(4, 2), ibanCountryCode)
            ) {
                this.__setErrorMessage(this.ibanMessage, this.__ibanMessageParameters());
                return ;
            }
        },

        /**
         * @private
         * @name abv.EmailValidator#__bicAndIbanCountriesMatch
         * @description Match BIC and IBAN countries
         * @param {String} bicCountryCode BIC country code
         * @param {String} ibanCountryCode IBAN country code
         * @returns {Boolean}
         */
        __bicAndIbanCountriesMatch: function (bicCountryCode, ibanCountryCode) {
            return ibanCountryCode === bicCountryCode || ibanCountryCode === (this.BIC_COUNTRY_TO_IBAN_COUNTRY_MAP[bicCountryCode] || null);
        },

        /**
         * @private
         * @function
         * @name abv.EmailValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            try {
                if ('undefined' !== typeof this.data) {
                    this.data = this.data.toString();
                }
            } catch (e) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.BicValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': this.data
            }
        },

        /**
         * @private
         * @function
         * @name abv.BicValidator#__ibanMessageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __ibanMessageParameters: function () {
            return {
                'iban': this.iban
            }
        }
    });

    return {
        BicValidator: BicValidator
    };
}());

abv.registry(abv.BicValidator);