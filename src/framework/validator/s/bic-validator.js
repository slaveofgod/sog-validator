Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.BicValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>This constraint is used to ensure that a value has the proper format of a {@link https://en.wikipedia.org/wiki/Business_Identifier_Code|Business Identifier Code (BIC)}.</p>
     * <p><code>BIC</code> is an internationally agreed means to uniquely identify both financial and non-financial institutions.</p>
     * <p>You may also check that the <code>BIC</code> is associated with a given <code>IBAN</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>bic</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.BicValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.BicValidator#iban
     * @type {String}
     * @description
     * <p>An IBAN value to validate that the BIC is associated with it.</p>
     * <p>Default: <code>null</code>.</p>
     */

    /**
     * @name sogv.BicValidator#ibanMessage
     * @type {String}
     * @description
     * <p>The default message supplied when the value does not pass the combined BIC/IBAN check.</p>
     * <p>Default: "<code>This Business Identifier Code (BIC) is not associated with IBAN %%iban%%.</code>"</p>
     * <p>You can use the following parameters in this message:</p>
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td><code>%%iban%%</code></td>
     *             <td>The current IBAN value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name sogv.BicValidator#message
     * @type {String}
     * @description
     * <p>The default message supplied when the value does not pass the BIC check.</p>
     * <p>Default: "<code>This is not a valid Business Identifier Code (BIC).</code>"</p>
     * <p>You can use the following parameters in this message:</p>
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td><code>%%value%%</code></td>
     *             <td>The current (invalid) BIC value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var BicValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            iban: optionRules.iban || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            ibanMessage: optionRules.ibanMessage || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
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
    BicValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    BicValidator.prototype.constructor = BicValidator;

    Object.defineProperty(BicValidator.prototype, 'alias', {
        get: function () {
            return [
                'bic'
            ];
        }
    });

    Object.defineProperty(BicValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'iban',
                    'type': 'string'
                }
            ];
        }
    });

    Object.assign(BicValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.BicValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            var canonicalize = this.data.split(' ').join('');

            // the bic must be either 8 or 11 characters long
            if (false === [8, 11].includes(canonicalize.length)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // must contain alphanumeric values only
            if (false === sogv.isType('alnum', canonicalize)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // first 4 letters must be alphabetic (bank code)
            if (false === sogv.isType('alpha', canonicalize.substr(0, 4))) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            if (null !== sogv.isValidWithErrorMessage(canonicalize.substr(4, 2), 'country', true)) {
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
                true === sogv.isType('alpha', ibanCountryCode)
                && this.__bicAndIbanCountriesMatch(canonicalize.substr(4, 2), ibanCountryCode)
            ) {
                this.__setErrorMessage(this.ibanMessage, this.__ibanMessageParameters());
                return ;
            }
        },

        /**
         * @private
         * @name sogv.BicValidator#__bicAndIbanCountriesMatch
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
         * @name sogv.BicValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Cancel validation if data is empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            // Convert data to string
            try {
                if ('undefined' !== typeof this.data) {
                    this.data = this.data.toString();
                }
            } catch (e) {
                this.__setErrorMessage('This value ' + this.data + ' could not be converted to string.');
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.BicValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
         */
        __messageParameters: function () {
            return {
                'value': this.data
            }
        },

        /**
         * @private
         * @function
         * @name sogv.BicValidator#__ibanMessageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
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

sogv.registerValidator(sogv.BicValidator);