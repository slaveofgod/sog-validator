Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.CardSchemeValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>This constraint ensures that a credit card number is valid for a given credit card company.</p>
     * <p>It can be used to validate the number before trying to initiate a payment through a payment gateway.</p>
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
     * <p>Defined aliases: ['<code>card-scheme</code>', '<code>cs</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.CardSchemeValidator(data, schemes);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.CardSchemeValidator#message
     * @type {String}
     * @description
     * The message shown when the value does not pass the CardScheme check.
     * <p>Default: "Unsupported card type or invalid card number."
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
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name sogv.CardSchemeValidator#schemes
     * @type {String|Array}
     * @description
     * This option is required and represents the name of the number scheme used to validate the credit card number, it can either be a string or an array.
     * </p>
     * Valid values are:
     * <ul>
     *     <li><b>AMEX</b></li>
     *     <li><b>CHINA_UNIONPAY</b></li>
     *     <li><b>DINERS</b></li>
     *     <li><b>DISCOVER</b></li>
     *     <li><b>INSTAPAYMENT</b></li>
     *     <li><b>JCB</b></li>
     *     <li><b>LASER</b></li>
     *     <li><b>MAESTRO</b></li>
     *     <li><b>MASTERCARD</b></li>
     *     <li><b>MIR</b></li>
     *     <li><b>UATP</b></li>
     *     <li><b>VISA</b></li>
     * </ul>
     * For more information about the used schemes, see {@link https://en.wikipedia.org/wiki/Bank_card_number#Issuer_identification_number_.28IIN.29|Wikipedia: Issuer identification number (IIN)}.
     */

    var CardSchemeValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            schemes: optionRules.schemes || 'required|type:{"type":["string","array"],"any":true}'
        }, lang, internal);

        this.__schemes = {
            // American Express card numbers start with 34 or 37 and have 15 digits.
            'AMEX': [
                /^3[47][0-9]{13}$/,
            ],
            // China UnionPay cards start with 62 and have between 16 and 19 digits.
            // Please note that these cards do not follow Luhn Algorithm as a checksum.
            'CHINA_UNIONPAY': [
                /^62[0-9]{14,17}$/,
            ],
            // Diners Club card numbers begin with 300 through 305, 36 or 38. All have 14 digits.
            // There are Diners Club cards that begin with 5 and have 16 digits.
            // These are a joint venture between Diners Club and MasterCard, and should be processed like a MasterCard.
            'DINERS': [
                /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            ],
            // Discover card numbers begin with 6011, 622126 through 622925, 644 through 649 or 65.
            // All have 16 digits.
            'DISCOVER': [
                /^6011[0-9]{12}$/,
                /^64[4-9][0-9]{13}$/,
                /^65[0-9]{14}$/,
                /^622(12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|91[0-9]|92[0-5])[0-9]{10}$/,
            ],
            // InstaPayment cards begin with 637 through 639 and have 16 digits.
            'INSTAPAYMENT': [
                /^63[7-9][0-9]{13}$/,
            ],
            // JCB cards beginning with 2131 or 1800 have 15 digits.
            // JCB cards beginning with 35 have 16 digits.
            'JCB': [
                /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
            ],
            // Laser cards begin with either 6304, 6706, 6709 or 6771 and have between 16 and 19 digits.
            'LASER': [
                /^(6304|670[69]|6771)[0-9]{12,15}$/,
            ],
            // Maestro international cards begin with 675900..675999 and have between 12 and 19 digits.
            // Maestro UK cards begin with either 500000..509999 or 560000..699999 and have between 12 and 19 digits.
            'MAESTRO': [
                /^(6759[0-9]{2})[0-9]{6,13}$/,
                /^(50[0-9]{4})[0-9]{6,13}$/,
                /^5[6-9][0-9]{10,17}$/,
                /^6[0-9]{11,18}$/,
            ],
            // All MasterCard numbers start with the numbers 51 through 55. All have 16 digits.
            // October 2016 MasterCard numbers can also start with 222100 through 272099.
            'MASTERCARD': [
                /^5[1-5][0-9]{14}$/,
                /^2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12})$/,
            ],
            // Payment system MIR numbers start with 220, then 1 digit from 0 to 4, then 12 digits
            'MIR': [
                /^220[0-4][0-9]{12}$/,
            ],
            // All UATP card numbers start with a 1 and have a length of 15 digits.
            'UATP': [
                /^1[0-9]{14}$/,
            ],
            // All Visa card numbers start with a 4 and have a length of 13, 16, or 19 digits.
            'VISA': [
                /^4([0-9]{12}|[0-9]{15}|[0-9]{18})$/,
            ]
        };

        this.message = this.__options.message || 'Unsupported card type or invalid card number.';
        this.schemes = ("string" ===typeof this.__options.schemes) ? [this.__options.schemes] : this.__options.schemes;

        this.name = 'CardSchemeValidator';
    };
    CardSchemeValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    CardSchemeValidator.prototype.constructor = CardSchemeValidator;

    Object.defineProperty(CardSchemeValidator.prototype, 'alias', {
        get: function () {
            return [
                'card-scheme',
                'cs'
            ];
        }
    });

    Object.defineProperty(CardSchemeValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'schemes',
                    'type': 'array'
                }
            ];
        }
    });

    Object.assign(CardSchemeValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.CardSchemeValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (false === sogv.isType('numeric', this.data)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            for (var i = 0; i < this.schemes.length; i ++) {
                if ('undefined' === typeof this.__schemes[this.schemes[i]]) continue;

                for (var j = 0; j < this.__schemes[this.schemes[i]].length; j ++) {
                    if (true === this.__schemes[this.schemes[i]][j].test(this.data)) {
                        return ;
                    }
                }
            }

            this.__setErrorMessage(this.message, this.__messageParameters());
            return ;
        },

        /**
         * @private
         * @function
         * @name sogv.CardSchemeValidator#__beforeValidate
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
         * @name sogv.CardSchemeValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
         */
        __messageParameters: function () {
            return {
                'value': this.data
            }
        }
    });

    return {
        CardSchemeValidator: CardSchemeValidator
    };
}());

sogv.registry(sogv.CardSchemeValidator);