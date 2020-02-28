Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.ContainsValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value contains given substring.</p>
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
     * <p>Defined aliases: ['<code>contains</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ContainsValidator(data, contains);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.ContainsValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is not contains given substring.</p>
     * <p>Default: "<code>This value should contains the given substring.</code>"</p>
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

    /**
     * @name sogv.ContainsValidator#value
     * @type {String}
     * @description
     * <p>This option is required.</p>
     * <p>It defines the value to check the containing.</p>
     */

    var ContainsValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseValidator.call(this, data, options, {
            value: optionRules.max || 'required|type:{"type":"string"}',
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.value = this.__options.value;
        this.message = this.__options.message || 'This value should contains the given substring.';

        this.name = 'ContainsValidator';
    };
    ContainsValidator.prototype = Object.create(sogv.BaseValidator.prototype);
    ContainsValidator.prototype.constructor = ContainsValidator;

    Object.defineProperty(ContainsValidator.prototype, 'alias', {
        get: function () {
            return [
                'contains'
            ];
        }
    });

    Object.defineProperty(ContainsValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'string'
                }
            ];
        }
    });

    Object.assign(ContainsValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.ContainsValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (false === this.data.includes(this.value)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.ContainsValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Cancel validation if data is empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', this.lang, true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            // Convert data to string
            try {
                if ('undefined' !== typeof this.data) {
                    this.data = this.data.toString();
                }
            } catch (e) {
                this.__setErrorMessage('This value ' + this.data + ' could not be converted to string.');
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.ContainsValidator#__messageParameters
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
        ContainsValidator: ContainsValidator
    };
}());

sogv.registerValidator(sogv.ContainsValidator);