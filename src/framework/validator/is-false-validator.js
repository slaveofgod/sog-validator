Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IsFalseValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is false. Specifically, this checks to see if the value is exactly <code class="notranslate">false</code>, exactly the integer <code class="notranslate">0</code>, or exactly the string <code class="notranslate">"0"</code>.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @example
     * var validator = new abv.IsFalseValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errorMessage();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.IsFalseValidator#message
     * @type {String}
     * @description This message is shown if the underlying data is not false. Defaults to "This value should be false."
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

    var IsFalseValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be false.';

        this.__setName('IsFalseValidator');
    };
    IsFalseValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    IsFalseValidator.prototype.constructor = IsFalseValidator;

    Object.assign(IsFalseValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IsFalseValidator#validate
         * @description Validate data
         */
        validate: function () {
            if (
                false !== this.data
                && 0 !== this.data
                && '0' !== this.data
            ) {
                this.__setErrorMessage(this.message, this.messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.IsFalseValidator#messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        messageParameters: function () {
            return {
                'value': this.data
            }
        }
    });

    return {
        IsFalseValidator: IsFalseValidator
    };
}());