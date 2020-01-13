Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.RegexValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value matches a regular expression.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.RegexValidator(data, {pattern: 'regular expression'});
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.RegexValidator#match
     * @type {Boolean}
     * @description
     * If true (or not set), this validator will pass if the given string matches the given pattern regular expression.
     * However, when this option is set to false, the opposite will occur: validation will pass only if the given string does not match the pattern regular expression.
     * Default to true.
     */

    /**
     * @name abv.RegexValidator#message
     * @type {String}
     * @description
     * This is the message that will be shown if this validator fails.
     * Defaults to "This value is not valid."
     * You can use the following parameters in this message:
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td>%%value%%</td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name abv.RegexValidator#pattern
     * @type {String}
     * @description
     * This required option is the regular expression pattern that the input will be matched against.
     * By default, this validator will fail if the input string does not match this regular expression.
     * However, if match is set to false, then validation will fail if the input string does match this pattern.
     */

    /**
     * @name abv.RegexValidator#normalize
     * @type {Boolean}
     * @description Normalizer string before validate (trim, etc.). Defaults to false
     */

    var RegexValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            match: 'type:{"type": "bool"}',
            message: 'length:{"min":3,"max":255}',
            pattern: 'required',
            normalize: 'type:{"type": "bool"}'
        }, lang, internal);

        this.match = (false === this.__options.match) ? false : true;
        this.message = this.__options.message || 'This value is not valid.';
        this.pattern = this.__options.pattern;
        this.normalize = (!this.__options.normalize || false === this.__options.normalize) ? false : true;

        this.__setName('RegexValidator');
    };
    RegexValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    RegexValidator.prototype.constructor = RegexValidator;

    Object.defineProperty(RegexValidator.prototype, 'name', {
        get: function () {
            return this.__getName();
        }
    });

    Object.assign(RegexValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.RegexValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            // Normalize
            if (true === this.normalize) {
                this.__normalize();
            }

            // Check if empty
            if (true === this.__isEmptyData()) {
                return ;
            }

            var regexp = new RegExp(this.pattern);
            if (this.match !== regexp.test(this.data)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.RegexValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
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
         * @name abv.RegexValidator#__messageParameters
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
        RegexValidator: RegexValidator
    };
}());