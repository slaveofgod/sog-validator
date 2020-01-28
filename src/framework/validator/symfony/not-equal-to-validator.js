Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.NotEqualToValidator
     * @extends sogv.AbstractComparisonValidator
     * @classdesc
     * <p>Validates that a value is not equal to another value, defined in the options.</p>
     * <p>This constraint compares using <code>!=</code>, so <code>3</code> and "<code>3</code>" are considered equal. <code>sogv.Use NotIdenticalTo</code> to compare with <code>!==</code>.</p>
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
     * <p>Defined aliases: ['<code>not-equal-to</code>', '<code>not-equal</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NotEqualToValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.NotEqualToValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is not equal.</p>
     * <p>Default: "<code>This value should not be equal to %%compared_value%%.</code>"</p>
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
     *             <td><code>%%compared_value%%</code></td>
     *             <td>The expected value</td>
     *         </tr>
     *         <tr>
     *             <td><code>%%compared_value_type%%</code></td>
     *             <td>The expected value type</td>
     *         </tr>
     *         <tr>
     *             <td><code>%%value%%</code></td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name sogv.NotEqualToValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a string, number or object.
     */

    var NotEqualToValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractComparisonValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            value: optionRules.value || 'required'
        }, lang, internal);

        this.message = this.__options.message || 'This value should not be equal to %%compared_value%%.';

        this.name = 'NotEqualToValidator';
    };
    NotEqualToValidator.prototype = Object.create(sogv.AbstractComparisonValidator.prototype);
    NotEqualToValidator.prototype.constructor = NotEqualToValidator;

    Object.defineProperty(NotEqualToValidator.prototype, 'alias', {
        get: function () {
            return [
                'not-equal-to',
                'not-equal'
            ];
        }
    });

    Object.defineProperty(NotEqualToValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'any'
                }
            ];
        }
    });

    Object.assign(NotEqualToValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.NotEqualToValidator#__compareValues
         * @description Compare two value
         * @param {*} value Value
         * @param {*} comparedValue Compared value
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            return (value != comparedValue);
        },

        /**
         * @private
         * @function
         * @name sogv.NotEqualToValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': this.__formattedData(this.data),
                'compared_value': this.__formattedData(this.value),
                'compared_value_type': sogv.getType(this.value)
            }
        }
    });

    return {
        NotEqualToValidator: NotEqualToValidator
    };
}());

sogv.registry(sogv.NotEqualToValidator);