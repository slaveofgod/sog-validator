Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IsTrueValidator
     * @extends abv.ValidatorExtension
     * @classdesc Validates that a value is true. Specifically, this checks if the value is exactly <code class="notranslate">true</code>, exactly the integer <code class="notranslate">1</code>, or exactly the string <code class="notranslate">"1"</code>.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     */

    // PROPERTIES

    /**
     * @name abv.IsTrueValidator#data
     * @type {*}
     * @description Data that needs to be validated.
     */

    /**
     * @name abv.IsTrueValidator#lang
     * @type {String}
     * @description Language of error messages.
     */

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

    var IsTrueValidator = function (data, options, lang) {
        abv.ValidatorExtension.call(this);

        options = options || {};

        this.data = data;
        this.lang = lang || 'en';

        this.message = options.message || 'This value should be true.';

        this.__name = 'IsTrueValidator';
        this.__isValid = true;
        this.__errorMessage = null;
    };
    IsTrueValidator.prototype = Object.create(abv.ValidatorExtension.prototype);
    IsTrueValidator.prototype.constructor = IsTrueValidator;

    Object.assign(IsTrueValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IsTrueValidator#validate
         * @description Validate data
         */
        validate: function () {
            if (
                true !== this.data
                && 1 !== this.data
                && '1' !== this.data
            ) {
                this.__isValid = false;
                this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());
            }
        },

        /**
         * @private
         * @function
         * @name abv.IsTrueValidator#messageParameters
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
        IsTrueValidator: IsTrueValidator
    };
}());