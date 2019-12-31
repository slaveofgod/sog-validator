Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.NotNullValidator
     * @extends abv.ValidatorAbstract
     * @classdesc Validates that a value is not strictly equal to <code class="notranslate">null</code>.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @example
     * var validator = new abv.NotNullValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errorMessage();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.NotNullValidator#data
     * @type {*}
     * @description Data that needs to be validated.
     */

    /**
     * @name abv.NotNullValidator#lang
     * @type {String}
     * @description Language of error messages.
     */

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

    var NotNullValidator = function (data, options, lang) {
        abv.ValidatorAbstract.call(this);

        options = options || {};

        this.data = data;
        this.lang = lang || 'en';

        this.message = options.message || 'This value should not be null.';

        this.__name = 'NotNullValidator';
    };
    NotNullValidator.prototype = Object.create(abv.ValidatorAbstract.prototype);
    NotNullValidator.prototype.constructor = NotNullValidator;

    Object.assign(NotNullValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.NotNullValidator#validate
         * @description Validate data
         */
        validate: function () {
            // Check if undefined
            if ('undefined' === typeof this.data) {
                this.__setErrorMessage(this.message, this.messageParameters());
                return ;
            }

            // Check if null
            if (null === this.data) {
                this.__setErrorMessage(this.message, this.messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.NotNullValidator#messageParameters
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
        NotNullValidator: NotNullValidator
    };
}());