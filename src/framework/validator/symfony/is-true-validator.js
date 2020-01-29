Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.IsTrueValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is true.</p>
     * <p>Specifically, this checks if the value is exactly <code>true</code>, exactly the integer <code>1</code>, or exactly the string <code>"1"</code>.</p>
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
     * <p>Defined aliases: ['<code>is-true</code>', '<code>true</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IsTrueValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.IsTrueValidator#message
     * @type {String}
     * @description
     * <p>This message is shown if the underlying data is not true.</p>
     * <p>Default: "<code>This value should be true.</code>"</p>
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

    var IsTrueValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be true.';

        this.name = 'IsTrueValidator';
    };
    IsTrueValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    IsTrueValidator.prototype.constructor = IsTrueValidator;

    Object.defineProperty(IsTrueValidator.prototype, 'alias', {
        get: function () {
            return [
                'is-true',
                'true'
            ];
        }
    });

    Object.defineProperty(IsTrueValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(IsTrueValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.IsTrueValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (
                true !== this.data
                && 1 !== this.data
                && '1' !== this.data
            ) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.IsTrueValidator#__messageParameters
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
        IsTrueValidator: IsTrueValidator
    };
}());

sogv.registry(sogv.IsTrueValidator);