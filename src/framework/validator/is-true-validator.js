Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IsTrueValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is true. Specifically, this checks if the value is exactly <code class="notranslate">true</code>, exactly the integer <code class="notranslate">1</code>, or exactly the string <code class="notranslate">"1"</code>.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.IsTrueValidator(data);
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.IsTrueValidator#message
     * @type {String}
     * @description This message is shown if the underlying data is not true. Defaults to "This value should be true."
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

    var IsTrueValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be true.';

        this.__setName('IsTrueValidator');
    };
    IsTrueValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    IsTrueValidator.prototype.constructor = IsTrueValidator;

    Object.defineProperty(IsTrueValidator.prototype, 'name', {
        get: function () {
            return this.__getName();
        }
    });

    Object.assign(IsTrueValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IsTrueValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (
                true !== this.data
                && 1 !== this.data
                && '1' !== this.data
            ) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.IsTrueValidator#__messageParameters
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
        IsTrueValidator: IsTrueValidator
    };
}());