Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IsNullValidator
     * @extends abv.ValidatorAbstract
     * @classdesc Validates that a value is exactly equal to <code class="notranslate">null</code>.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @example
     * var validator = new abv.IsNullValidator(data);
     * if (false === validator.isValid()) {
     *      validator.getErrorMessage();
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
        abv.ValidatorAbstract.call(this);

        options = options || {};

        this.data = data;
        this.lang = lang || 'en';

        this.message = options.message || 'This value should be null.';

        this.__name = 'IsNullValidator';
        this.__isValid = true;
        this.__errorMessage = null;
    };
    IsNullValidator.prototype = Object.create(abv.ValidatorAbstract.prototype);
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
                this.__isValid = false;
                this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());
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