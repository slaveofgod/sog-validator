Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.IsFalseValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is <code>false</code>.</p>
     * <p>Specifically, this checks to see if the value is exactly <code>false</code>, exactly the integer <code>0</code>, or exactly the string <code>"0"</code>.</p>
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
     * <p>Defined aliases: ['<code>is-false</code>', '<code>false</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IsFalseValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.IsFalseValidator#message
     * @type {String}
     * @description
     * <p>This message is shown if the underlying data is not false.</p>
     * <p>Default: "<code>This value should be false.</code>"</p>
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

    var IsFalseValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be false.';

        this.name = 'IsFalseValidator';
    };
    IsFalseValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    IsFalseValidator.prototype.constructor = IsFalseValidator;

    Object.defineProperty(IsFalseValidator.prototype, 'alias', {
        get: function () {
            return [
                'is-false',
                'false'
            ];
        }
    });

    Object.defineProperty(IsFalseValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(IsFalseValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.IsFalseValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (
                false !== this.data
                && 0 !== this.data
                && '0' !== this.data
            ) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.IsFalseValidator#__messageParameters
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
        IsFalseValidator: IsFalseValidator
    };
}());

sogv.registry(sogv.IsFalseValidator);