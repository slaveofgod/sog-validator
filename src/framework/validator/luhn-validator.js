Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.LuhnValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * <p>This constraint is used to ensure that a credit card number passes the {@link https://en.wikipedia.org/wiki/Luhn_algorithm|Luhn algorithm}.</p>
     * <p>It is useful as a first step to validating a credit card: before communicating with a payment gateway.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: "<code class="notranslate">en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.LuhnValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.LuhnValidator#message
     * @type {String}
     * @description
     * <p>The default message supplied when the value does not pass the Luhn check.</p>
     * <p>Default: "<code class="notranslate">Invalid card number.</code>"</p>
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
     *             <td><code class="notranslate">%%value%%</code></td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var LuhnValidator = function (data, options, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options,{
            message: 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'Invalid card number.';

        this.name = 'LuhnValidator';
    };
    LuhnValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    LuhnValidator.prototype.constructor = LuhnValidator;

    Object.defineProperty(LuhnValidator.prototype, 'alias', {
        get: function () {
            return 'luhn';
        }
    });

    Object.assign(LuhnValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.LuhnValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (false === abv.isType('digit', this.data)) {
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
                checkSum += abv.array_sum(abv.str_split(this.data[i] * 2));
            }

            if (0 === checkSum || 0 !== checkSum % 10) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.LuhnValidator#__beforeValidate
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
         * @name abv.LuhnValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
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

abv.registry(abv.LuhnValidator);