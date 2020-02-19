Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.NegativeOrZeroValidator
     * @extends sogv.AbstractComparisonValidator
     * @classdesc
     * <p>Validates that a value is a negative <code>number</code> or <code>equal</code> to <code>zero</code>.</p>
     * <p>If you don't want to allow <code>zero</code> as value, use <code>sogv.Negative</code> instead.</p>
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
     * <p>Defined aliases: ['<code>negative-or-zero</code>', '<code>noz</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NegativeOrZeroValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.NegativeOrZeroValidator#message
     * @type {String}
     * @description
     * <p>The default message supplied when the value is not less than or equal to zero.</p>
     * <p>Default: "<code>This value should be either negative or zero.</code>"</p>
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

    var NegativeOrZeroValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractComparisonValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.value = 0;
        this.message = this.__options.message || 'This value should be either negative or zero.';

        this.name = 'NegativeOrZeroValidator';
    };
    NegativeOrZeroValidator.prototype = Object.create(sogv.AbstractComparisonValidator.prototype);
    NegativeOrZeroValidator.prototype.constructor = NegativeOrZeroValidator;

    Object.defineProperty(NegativeOrZeroValidator.prototype, 'alias', {
        get: function () {
            return [
                'negative-or-zero',
                'noz'
            ];
        }
    });

    Object.defineProperty(NegativeOrZeroValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(NegativeOrZeroValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.NegativeOrZeroValidator#__compareValues
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
         * @name sogv.NegativeOrZeroValidator#__messageParameters
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
        NegativeOrZeroValidator: NegativeOrZeroValidator
    };
}());

sogv.registry(sogv.NegativeOrZeroValidator);