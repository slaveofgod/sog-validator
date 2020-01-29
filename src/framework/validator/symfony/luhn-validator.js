Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.LuhnValidator
     * @extends sogv.AbstractComparisonValidator
     * @classdesc
     * <p>This constraint is used to ensure that a <code>credit card</code> number passes the {@link https://en.wikipedia.org/wiki/Luhn_algorithm|Luhn algorithm}.</p>
     * <p>It is useful as a first step to validating a credit card: before communicating with a payment gateway.</p>
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
     * <p>Defined aliases: ['<code>luhn</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LuhnValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.LuhnValidator#message
     * @type {String}
     * @description
     * <p>The default message supplied when the value does not pass the Luhn check.</p>
     * <p>Default: "<code>Invalid card number.</code>"</p>
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

    var LuhnValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'Invalid card number.';

        this.name = 'LuhnValidator';
    };
    LuhnValidator.prototype = Object.create(sogv.AbstractComparisonValidator.prototype);
    LuhnValidator.prototype.constructor = LuhnValidator;

    Object.defineProperty(LuhnValidator.prototype, 'alias', {
        get: function () {
            return [
                'luhn'
            ];
        }
    });

    Object.defineProperty(LuhnValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(LuhnValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.LuhnValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (false === sogv.isType('digit', this.data)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            var checkSum = 0;
            var length = this.data.length;

            // Starting with the last digit and walking left, add every second
            // digit to the check sum
            // e.g. 7  9  9  2  7  3  9  8  7  1  3
            //      ^     ^     ^     ^     ^     ^
            //    = 7  +  9  +  7  +  9  +  7  +  3
            for (var i = length - 1; i >= 0; i -= 2) {
                checkSum += (this.data[i] * 1);
            }

            // Starting with the second last digit and walking left, double every
            // second digit and add it to the check sum
            // For doubles greater than 9, sum the individual digits
            // e.g. 7  9  9  2  7  3  9  8  7  1  3
            //         ^     ^     ^     ^     ^
            //    =    1+8 + 4  +  6  +  1+6 + 2
            for (var i = length - 2; i >= 0; i -= 2) {
                checkSum += sogv.array_sum(sogv.str_split(this.data[i] * 2));
            }

            if (0 === checkSum || 0 !== checkSum % 10) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.LuhnValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Check if empty
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
         * @name sogv.LuhnValidator#__messageParameters
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
        LuhnValidator: LuhnValidator
    };
}());

sogv.registry(sogv.LuhnValidator);