Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.LengthValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a given string length is between some minimum and maximum value.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.LengthValidator(data, {min: 10});
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.LengthValidator#allowEmptyString
     * @type {Boolean}
     * @description If set to true, empty strings are considered valid. The default false value considers empty strings not valid. Defaults to false.
     */

    // /**
    //  * @name abv.LengthValidator#charset
    //  * @type {String}
    //  * @description The charset to be used when computing value's length. Defaults to 'UTF-8'.
    //  */
    //
    // /**
    //  * @name abv.LengthValidator#charsetMessage
    //  * @type {String}
    //  * @description The message that will be shown if the value is not using the given charset. Defaults to 'This value does not match the expected %%charset%% charset.'.
    //  * You can use the following parameters in this message:
    //  * <table>
    //  *     <tr>
    //  *         <td><b>Parameter</b></td>
    //  *         <td><b>Description</b></td>
    //  *     </tr>
    //  *     <tr>
    //  *         <td>%%charset%%</td>
    //  *         <td>The expected charset</td>
    //  *     </tr>
    //  *     <tr>
    //  *         <td>%%value%%</td>
    //  *         <td>The current (invalid) value</td>
    //  *     </tr>
    //  * </table>
    //  */

    /**
     * @name abv.LengthValidator#exactMessage
     * @type {String}
     * @description The message that will be shown if min and max values are equal and the underlying value's length is not exactly this value. Defaults to 'This value should have exactly %%limit%% characters.'.
     * You can use the following parameters in this message:
     * <table>
     *     <tr>
     *         <td><b>Parameter</b></td>
     *         <td><b>Description</b></td>
     *     </tr>
     *     <tr>
     *         <td>%%limit%%</td>
     *         <td>The exact expected length</td>
     *     </tr>
     *     <tr>
     *         <td>%%value%%</td>
     *         <td>The current (invalid) value</td>
     *     </tr>
     * </table>
     */

    /**
     * @name abv.LengthValidator#max
     * @type {Integer}
     * @description This option is the "max" length value. Validation will fail if the given value's length is greater than this max value.
     * This option is required when the "min: option is not defined.
     */

    /**
     * @name abv.LengthValidator#maxMessage
     * @type {String}
     * @description The message that will be shown if the underlying value's length is more than the max option. Defaults to 'This value is too long. It should have %%limit%% characters or less.'.
     * You can use the following parameters in this message:
     * <table>
     *     <tr>
     *         <td><b>Parameter</b></td>
     *         <td><b>Description</b></td>
     *     </tr>
     *     <tr>
     *         <td>%%limit%%</td>
     *         <td>The expected maximum length</td>
     *     </tr>
     *     <tr>
     *         <td>%%value%%</td>
     *         <td>The current (invalid) value</td>
     *     </tr>
     * </table>
     */

    /**
     * @name abv.LengthValidator#min
     * @type {Integer}
     * @description This option is the "min" length value. Validation will fail if the given value's length is less than this min value.
     * This option is required when the max option is not defined.
     * It is important to notice that NULL values and empty strings are considered valid no matter if the constraint required a minimum length. Validators are triggered only if the value is not blank.
     */

    /**
     * @name abv.LengthValidator#minMessage
     * @type {String}
     * @description The message that will be shown if the underlying value's length is less than the min option. Defaults to 'This value is too short. It should have %%limit%% characters or more.'.
     * You can use the following parameters in this message:
     * <table>
     *     <tr>
     *         <td><b>Parameter</b></td>
     *         <td><b>Description</b></td>
     *     </tr>
     *     <tr>
     *         <td>%%limit%%</td>
     *         <td>The expected minimum length</td>
     *     </tr>
     *     <tr>
     *         <td>%%value%%</td>
     *         <td>The current (invalid) value</td>
     *     </tr>
     * </table>
     */

    /**
     * @name abv.LengthValidator#normalize
     * @type {Boolean}
     * @description Normalizer string before validate (trim, etc.). Defaults to false
     */

    var LengthValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            allowEmptyString: 'type:{"type":"bool"}',
            charset: 'length:{"min":2,"max":10}',
            charsetMessage: 'length:{"min":3,"max":255}',
            exactMessage: 'length:{"min":3,"max":255}',
            max: 'type:{"type":"integer"}',
            maxMessage: 'length:{"min":3,"max":255}',
            min: 'type:{"type":"integer"}',
            minMessage: 'length:{"min":3,"max":255}',
            normalize: 'type:{"type":"bool"}'
        }, lang, internal);

        this.allowEmptyString = (!this.__options.allowEmptyString || false === this.__options.allowEmptyString) ? false : true;
        // this.charset = this.__options.charset || 'UTF-8';
        // this.charsetMessage = this.__options.charsetMessage || 'This value does not match the expected %%charset%% charset.';
        this.exactMessage = this.__options.exactMessage || 'This value should have exactly %%limit%% characters.';
        this.max = this.__options.max;
        this.maxMessage = this.__options.maxMessage || 'This value is too long. It should have %%limit%% characters or less.';
        this.min = this.__options.min;
        this.minMessage = this.__options.minMessage || 'This value is too short. It should have %%limit%% characters or more.';
        this.normalize = (!this.__options.normalize || false === this.__options.normalize) ? false : true;

        this.__setName('LengthValidator');
    };
    LengthValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    LengthValidator.prototype.constructor = LengthValidator;

    Object.assign(LengthValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.LengthValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            // Normalize
            if (true === this.normalize) {
                this.__normalize();
            }

            // Check if data in empty and [allowEmptyString: true]
            if ('undefined' === typeof this.data || null === this.data || ('' === this.data && true === this.allowEmptyString)) {
                return ;
            }

            /**
             * @todo Check encoding
             */

            var length = this.data.length;

            if (
                this.max
                && length > this.max
            ) {
                this.__setErrorMessage(
                    (this.min == this.max ? this.exactMessage : this.maxMessage),
                    (this.min == this.max ? this.exact__messageParameters() : this.max__messageParameters())
                );
                return ;
            }

            if (
                this.min
                && length < this.min
            ) {
                this.__setErrorMessage(
                    (this.min == this.max ? this.exactMessage : this.minMessage),
                    (this.min == this.max ? this.exact__messageParameters() : this.min__messageParameters())
                );
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.LengthValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            if (!this.min && !this.max) {
                throw new Error('Either option "min" or "max" must be given for constraint');
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
         * @name abv.LengthValidator#exact__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        exact__messageParameters: function () {
            return {
                'value': this.data,
                'limit': this.min
            }
        },

        /**
         * @private
         * @function
         * @name abv.LengthValidator#max__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        max__messageParameters: function () {
            return {
                'value': this.data,
                'limit': this.max
            }
        },

        /**
         * @private
         * @function
         * @name abv.LengthValidator#min__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        min__messageParameters: function () {
            return {
                'value': this.data,
                'limit': this.min
            }
        }
    });

    return {
        LengthValidator: LengthValidator
    };
}());