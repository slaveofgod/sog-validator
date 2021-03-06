Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.LessThanOrEqualValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is <code>less than</code> or <code>equal</code> to another value, defined in the options.</p>
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
     * <p>Defined aliases: ['<code>less_than_or_equal</code>'', '<code>less-than-or-equal</code>', '<code>max</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LessThanOrEqualValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.LessThanOrEqualValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is not less than or equal to the comparison value.</p>
     * <p>Default: "<code>This value should be less than or equal to %%compared_value%%.</code>"</p>
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
     * @name sogv.LessThanOrEqualValidator#value
     * @type {*}
     * @description
     * <p>This option is required.</p>
     * <p>It defines the value to compare to.</p>
     * <p>It can be a <code>string</code>, <code>number</code> or <code>date object</code>.</p>
     */

    var LessThanOrEqualValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseComparisonValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            value: optionRules.value || 'required|type:{"type":["scalar","date"],"any":true}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be less than or equal to %%compared_value%%.';

        this.name = 'LessThanOrEqualValidator';
    };
    LessThanOrEqualValidator.prototype = Object.create(sogv.BaseComparisonValidator.prototype);
    LessThanOrEqualValidator.prototype.constructor = LessThanOrEqualValidator;

    Object.defineProperty(LessThanOrEqualValidator.prototype, 'alias', {
        get: function () {
            return [
                'less_than_or_equal',
                'less-than-or-equal',
                'max'
            ];
        }
    });

    Object.defineProperty(LessThanOrEqualValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'boolean|scalar|date-string'
                }
            ];
        }
    });

    Object.assign(LessThanOrEqualValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.LessThanOrEqualValidator#__compareValues
         * @description
         * <p>Compare two value.</p>
         * @param {*} value Value
         * @param {*} comparedValue Compared value
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            return (value <= comparedValue);
        },

        /**
         * @private
         * @function
         * @name sogv.LessThanOrEqualValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
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
        LessThanOrEqualValidator: LessThanOrEqualValidator
    };
}());

sogv.registerValidator(sogv.LessThanOrEqualValidator);