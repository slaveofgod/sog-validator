Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.AnyValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is valid at least for one of the rule.</p>
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
     * <p>Defined aliases: ['<code>any</code>', '<code>one-of</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.AnyValidator(data, contains);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.AnyValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is not valid.</p>
     * <p>Default: "<code>This value should be valid at least for one rule.</code>"</p>
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
     * @name sogv.AnyValidator#rules
     * @type {String}
     * @description
     * <p>This option is required.</p>
     * <p>It defines the value to check the containing.</p>
     */

    var AnyValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseValidator.call(this, data, options, {
            rules: optionRules.max || 'required|array|count:1,100',
        }, lang, internal);

        this.message = 'This value should be valid at least for one rule.';
        this.rules = this.__options.rules;

        this.name = 'AnyValidator';
    };
    AnyValidator.prototype = Object.create(sogv.BaseValidator.prototype);
    AnyValidator.prototype.constructor = AnyValidator;

    Object.defineProperty(AnyValidator.prototype, 'alias', {
        get: function () {
            return [
                'any',
                'one-of'
            ];
        }
    });

    Object.defineProperty(AnyValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'rules',
                    'type': 'array'
                }
            ];
        }
    });

    Object.assign(AnyValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.AnyValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            for (var i = 0; i < this.rules.length; i ++) {
                if (true === sogv.isValid(this.data, this.rules[i])) {
                    return ;
                }
            }

            this.__setErrorMessage(this.message, this.__messageParameters());
            return ;
        },

        /**
         * @private
         * @function
         * @name sogv.AnyValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Cancel validation if data is empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.AnyValidator#__messageParameters
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
        AnyValidator: AnyValidator
    };
}());

sogv.registerValidator(sogv.AnyValidator);