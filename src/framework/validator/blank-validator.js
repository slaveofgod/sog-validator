Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.BlankValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is blank - meaning equal to an empty string or <code class="notranslate">null</code>.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     *
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal It means, that validation called from core.
     *
     *
     *
     * @example
     * var validator = new abv.BlankValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errorMessage();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.BlankValidator#message
     * @type {String}
     * @description This is the message that will be shown if the value is not blank. Defaults to "This value should be blank."
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

    var BlankValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be blank.';

        this.__name = 'BlankValidator';
    };
    BlankValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    BlankValidator.prototype.constructor = BlankValidator;

    Object.assign(BlankValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.BlankValidator#validate
         * @description Validate data
         */
        validate: function () {
            if (
                '' !== this.data
                && null !== this.data
            ) {
                this.__setErrorMessage(this.message, this.messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.BlankValidator#messageParameters
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
        BlankValidator: BlankValidator
    };
}());