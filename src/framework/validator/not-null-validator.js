Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.NotNullValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is not strictly equal to <code class="notranslate">null</code>.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.NotNullValidator(data);
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.NotNullValidator#message
     * @type {String}
     * @description This is the message that will be shown if the value is null. Defaults to "This value should not be null."
     * You can use the following parameters in this message:
     * <table>
     *     <tr>
     *         <td><b>Parameter</b></td>
     *         <td><b>Description</b></td>
     *     </tr>
     *     <tr>
     *         <td>%%value%%</td>
     *         <td>The current (invalid) value</td>
     *     </tr>
     * </table>
     */

    var NotNullValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should not be null.';

        this.__setName('NotNullValidator');
    };
    NotNullValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    NotNullValidator.prototype.constructor = NotNullValidator;

    Object.assign(NotNullValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.NotNullValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            // Check if undefined
            if ('undefined' === typeof this.data) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // Check if null
            if (null === this.data) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.NotNullValidator#__messageParameters
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
        NotNullValidator: NotNullValidator
    };
}());