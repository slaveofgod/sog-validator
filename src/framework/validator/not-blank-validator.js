Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.NotBlankValidator
     * @extends abv.ValidatorExtension
     * @classdesc Validates that a value is not blank - meaning not equal to a blank string, a blank array, <code class="notranslate">false</code> or <code class="notranslate">null</code> (null behavior is configurable).
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     */

    // PROPERTIES

    /**
     * @name abv.NotBlankValidator#data
     * @type {*}
     * @description Data that needs to be validated.
     */

    /**
     * @name abv.NotBlankValidator#lang
     * @type {String}
     * @description Language of error messages.
     */

    /**
     * @name abv.NotBlankValidator#allowNull
     * @type {Boolean}
     * @description If set to <code class="notranslate">true</code>, <code class="notranslate">null</code> values are considered valid and won't trigger a constraint violation. Defaults to false
     */

    /**
     * @name abv.NotBlankValidator#normalize
     * @type {Boolean}
     * @description Normalizer string before validate (trim, etc.). Defaults to false
     */

    /**
     * @name abv.NotBlankValidator#message
     * @type {String}
     * @description This is the message that will be shown if the value is blank. Defaults to "This value should not be blank."
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

    var NotBlankValidator = function (data, options, lang) {
        abv.ValidatorExtension.call(this);

        options = options || {};

        this.data = data;
        this.lang = lang || 'en';

        this.allowNull = options.allowNull ? ('true' == options.allowNull ? true : false) : false;
        this.message = options.message || 'This value should not be blank.';
        this.normalize = options.normalize ? ('true' == options.normalize ? true : false) : false;

        this.__name = 'NotBlankValidator';
        this.__isValid = true;
        this.__errorMessage = null;
    };
    NotBlankValidator.prototype = Object.create(abv.ValidatorExtension.prototype);
    NotBlankValidator.prototype.constructor = NotBlankValidator;

    Object.assign(NotBlankValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.NotBlankValidator#validate
         * @description Validate data
         */
        validate: function () {
            // Normalize
            if (
                'string' === typeof this.data
                && true === this.normalize
            ) {
                this.data = this.data.trim();
            }

            // Check if undefined
            if ('undefined' === typeof this.data) {
                this.__isValid = false;
                this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());
            }

            // Check if null and allowNull = false
            if (
                true === this.__isValid
                && null === this.data
                && false === this.allowNull
            ) {
                this.__isValid = false;
                this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());
            }

            // Check if false
            if (
                true === this.__isValid
                && false === this.data
            ) {
                this.__isValid = false;
                this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());
            }

            // Check if empty string
            if (
                true === this.__isValid
                && '' === this.data
            ) {
                this.__isValid = false;
                this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());
            }

            // Check if empty string
            if (
                true === this.__isValid
                && true === Array.isArray(this.data)
                && 0 === this.data.length
            ) {
                this.__isValid = false;
                this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());
            }
        },

        /**
         * @private
         * @function
         * @name abv.NotBlankValidator#messageParameters
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
        NotBlankValidator: NotBlankValidator
    };
}());