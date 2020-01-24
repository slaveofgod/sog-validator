Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.GreaterThanOrEqualValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * <p>Validates that a value is <code>greater than</code> or <code>equal</code> to another value, defined in the options.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.GreaterThanOrEqualValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.GreaterThanOrEqualValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is not greater than or equal to the comparison value.</p>
     * <p>Default: "<code>This value should be greater than or equal to %%compared_value%%.</code>"</p>
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
     * @name abv.GreaterThanOrEqualValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a string, number or date object.
     */

    var GreaterThanOrEqualValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            value: optionRules.value || 'required|type:{"type":["scalar","date"],"any":true}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be greater than or equal to %%compared_value%%.';

        this.name = 'GreaterThanOrEqualValidator';
    };
    GreaterThanOrEqualValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    GreaterThanOrEqualValidator.prototype.constructor = GreaterThanOrEqualValidator;

    Object.defineProperty(GreaterThanOrEqualValidator.prototype, 'alias', {
        get: function () {
            return 'greater-than-or-equal';
        }
    });

    Object.defineProperty(GreaterThanOrEqualValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'scalar|date'
                }
            ];
        }
    });

    Object.assign(GreaterThanOrEqualValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.GreaterThanOrEqualValidator#__compareValues
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
         * @name abv.GreaterThanOrEqualValidator#__messageParameters
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
        GreaterThanOrEqualValidator: GreaterThanOrEqualValidator
    };
}());

abv.registry(abv.GreaterThanOrEqualValidator);