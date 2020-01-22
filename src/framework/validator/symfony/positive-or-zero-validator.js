Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.PositiveOrZeroValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * <p>Validates that a value is a positive number or equal to zero.</p>
     * <p>If you don't want to allow zero as value, use abv.Positive instead.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.PositiveOrZeroValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.PositiveOrZeroValidator#message
     * @type {String}
     * @description
     * The default message supplied when the value is not greater than or equal to zero.
     * <p>Default: "This value should be either positive or zero."
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

    var PositiveOrZeroValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.value = 0;
        this.message = this.__options.message || 'This value should be either positive or zero.';

        this.name = 'PositiveOrZeroValidator';
    };
    PositiveOrZeroValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    PositiveOrZeroValidator.prototype.constructor = PositiveOrZeroValidator;

    Object.defineProperty(PositiveOrZeroValidator.prototype, 'alias', {
        get: function () {
            return 'positive-or-zero';
        }
    });

    Object.defineProperty(PositiveOrZeroValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(PositiveOrZeroValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.PositiveOrZeroValidator#__compareValues
         * @description Compare two value
         * @param {*} value Value
         * @param {*} comparedValue Compared value
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            return (value >= comparedValue);
        },

        /**
         * @private
         * @function
         * @name abv.PositiveOrZeroValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': this.__formattedData(this.data),
                'compared_value': this.__formattedData(this.value),
                'compared_value_type': abv.getType(this.value)
            }
        }
    });

    return {
        PositiveOrZeroValidator: PositiveOrZeroValidator
    };
}());

abv.registry(abv.PositiveOrZeroValidator);