Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.NotNullValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is not strictly equal to <code>null</code>.</p>
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
     * <p>Defined aliases: ['<code>not-null</code>', '<code>required</code>', '<code>present</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NotNullValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.NotNullValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is null.</p>
     * <p>Default: "<code>This value should not be null.</code>"</p>
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

    var NotNullValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should not be null.';

        this.name = 'NotNullValidator';
    };
    NotNullValidator.prototype = Object.create(sogv.BaseValidator.prototype);
    NotNullValidator.prototype.constructor = NotNullValidator;

    Object.defineProperty(NotNullValidator.prototype, 'alias', {
        get: function () {
            return [
                'not-null',
                'required',
                'present'
            ];
        }
    });

    Object.defineProperty(NotNullValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(NotNullValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.NotNullValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            // Check if undefined
            if ('undefined' === typeof this.data) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // Check if null
            if (null === this.data) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.NotNullValidator#__messageParameters
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
        NotNullValidator: NotNullValidator
    };
}());

sogv.registerValidator(sogv.NotNullValidator);