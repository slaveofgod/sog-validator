Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.NotBlankValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is not blank - meaning not equal to a blank string, a blank array, <code>false</code> or <code>null</code> (null behavior is configurable).</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>not-blank</code>', '<code>not-empty</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NotBlankValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.NotBlankValidator#allowNull
     * @type {Boolean}
     * @description
     * If set to <code>true</code>, <code>null</code> values are considered valid and won't trigger a constraint violation.</p>
     * Default: <code>false</code>
     */

    /**
     * @name sogv.NotBlankValidator#normalize
     * @type {Boolean}
     * @description
     * <p>Normalizer string before validate (trim, etc.).</p>
     * <p>Default: <code>false</code></p>
     */

    /**
     * @name sogv.NotBlankValidator#message
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
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.allowNull = ('undefined' === typeof this.__options.allowNull || false === this.__options.allowNull) ? false : true;
        this.message = this.__options.message || 'This value should not be blank.';
        this.normalize = ('undefined' === typeof this.__options.normalize || false === this.__options.normalize) ? false : true;

        this.name = 'NotBlankValidator';
    };
    NotBlankValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    NotBlankValidator.prototype.constructor = NotBlankValidator;

    Object.defineProperty(NotBlankValidator.prototype, 'alias', {
        get: function () {
            return [
                'not-blank',
                'not-empty'
            ];
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
         * @name sogv.NotBlankValidator#__validate
         * @description
         * <p>Validate data.</p>
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
                null === this.data
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
         * @name sogv.NotBlankValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
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

sogv.registry(sogv.NotBlankValidator);