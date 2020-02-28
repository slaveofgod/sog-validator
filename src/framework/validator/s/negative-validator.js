Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.NegativeValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is a <code>negative</code> number.</p>
     * <p>Zero is neither positive nor negative, so you must use <code>sogv.NegativeOrZero</code> if you want to allow zero as value.</p>
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
     * <p>Defined aliases: ['<code>negative</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NegativeValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.NegativeValidator#message
     * @type {String}
     * @description
     * <p>The default message supplied when the value is not less than zero.</p>
     * <p>Default: "<code>This value should be negative.</code>"</p>
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

    var NegativeValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseComparisonValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.value = 0;
        this.message = this.__options.message || 'This value should be negative.';

        this.name = 'NegativeValidator';
    };
    NegativeValidator.prototype = Object.create(sogv.BaseComparisonValidator.prototype);
    NegativeValidator.prototype.constructor = NegativeValidator;

    Object.defineProperty(NegativeValidator.prototype, 'alias', {
        get: function () {
            return [
                'negative'
            ];
        }
    });

    Object.defineProperty(NegativeValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(NegativeValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.NegativeValidator#__compareValues
         * @description
         * <p>Compare two value.</p>
         * @param {*} value Value
         * @param {*} comparedValue Compared value
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            return (value < comparedValue);
        },

        /**
         * @private
         * @function
         * @name sogv.NegativeValidator#__messageParameters
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
        NegativeValidator: NegativeValidator
    };
}());

sogv.registerValidator(sogv.NegativeValidator);