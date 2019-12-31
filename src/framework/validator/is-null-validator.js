Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IsNullValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is exactly equal to <code class="notranslate">null</code>.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @example
     * var validator = new abv.IsNullValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errorMessage();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.IsNullValidator#data
     * @type {*}
     * @description Data that needs to be validated.
     */

    /**
     * @name abv.IsNullValidator#lang
     * @type {String}
     * @description Language of error messages.
     */

    /**
     * @name abv.IsNullValidator#message
     * @type {String}
     * @description This is the message that will be shown if the value is not null. Defaults to "This value should be null."
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

    var IsNullValidator = function (data, options, lang) {
        abv.AbstractValidator.call(this);

        options = options || {};

        this.data = data;
        this.lang = lang || 'en';

        this.message = options.message || 'This value should be null.';

        this.__name = 'IsNullValidator';
    };
    IsNullValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    IsNullValidator.prototype.constructor = IsNullValidator;

    Object.assign(IsNullValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IsNullValidator#validate
         * @description Validate data
         */
        validate: function () {
            if (null !== this.data) {
                this.__setErrorMessage(this.message, this.messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.IsNullValidator#messageParameters
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
        IsNullValidator: IsNullValidator
    };
}());