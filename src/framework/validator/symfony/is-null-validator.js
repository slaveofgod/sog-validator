Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.IsNullValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is exactly equal to <code>null</code>.</p>
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
     * <p>Defined aliases: ['<code>is-null</code>', '<code>null</code>', '<code>nullable</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IsNullValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.IsNullValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is not null.</p>
     * <p>Default: "<code>This value should be null.</code>"</p>
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

    var IsNullValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be null.';

        this.name = 'IsNullValidator';
    };
    IsNullValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    IsNullValidator.prototype.constructor = IsNullValidator;

    Object.defineProperty(IsNullValidator.prototype, 'alias', {
        get: function () {
            return [
                'is-null',
                'null',
                'nullable'
            ];
        }
    });

    Object.defineProperty(IsNullValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(IsNullValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.IsNullValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (null !== this.data) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.IsNullValidator#__messageParameters
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
        IsNullValidator: IsNullValidator
    };
}());

sogv.registry(sogv.IsNullValidator);