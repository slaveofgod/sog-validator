Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.NotBlankValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is not blank - meaning not equal to a blank string, a blank array, <code>false</code> or <code>null</code> (null behavior is configurable).
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.NotBlankValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.NotBlankValidator#allowNull
     * @type {Boolean}
     * @description
     * If set to <code>true</code>, <code>null</code> values are considered valid and won't trigger a constraint violation.</p>
     * Default: <code>false</code>
     */

    /**
     * @name abv.NotBlankValidator#normalize
     * @type {Boolean}
     * @description
     * <p>Normalizer string before validate (trim, etc.).</p>
     * <p>Default: <code>false</code></p>
     */

    /**
     * @name abv.NotBlankValidator#message
     * @type {String}
     * @description
     * This is the message that will be shown if the value is blank.</p>
     * <p>Default: "<code>This value should not be blank.</code>"</p>
     * <p>You can use the following parameters in this message:</p>
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td><code>%%value%%</code></td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var NotBlankValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.allowNull = (!this.__options.allowNull || false === this.__options.allowNull) ? false : true;
        this.message = this.__options.message || 'This value should not be blank.';
        this.normalize = (!this.__options.normalize || false === this.__options.normalize) ? false : true;

        this.name = 'NotBlankValidator';
    };
    NotBlankValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    NotBlankValidator.prototype.constructor = NotBlankValidator;

    Object.defineProperty(NotBlankValidator.prototype, 'alias', {
        get: function () {
            return 'not-blank';
        }
    });

    Object.defineProperty(NotBlankValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(NotBlankValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.NotBlankValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            // Normalize
            if (
                'string' === typeof this.data
                && true === this.normalize
            ) {
                this.__normalize();
            }

            // Check if undefined
            if ('undefined' === typeof this.data) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // Check if null and allowNull = false
            if (
                ('undefined' === typeof this.data || null === this.data)
                && false === this.allowNull
            ) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // Check if false
            if (false === this.data) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // Check if empty string
            if ('' === this.data) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // Check if empty string
            if (
                true === Array.isArray(this.data)
                && 0 === this.data.length
            ) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.NotBlankValidator#__messageParameters
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
        NotBlankValidator: NotBlankValidator
    };
}());

abv.registry(abv.NotBlankValidator);