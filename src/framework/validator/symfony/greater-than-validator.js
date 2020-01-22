Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.GreaterThanValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc Validates that a value is greater than another value, defined in the options.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.GreaterThanValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.GreaterThanValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is not greater than the comparison value.</p>
     * <p>Default: "<code>This value should be greater than %%compared_value%%.</code>"</p>
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
     * @name abv.GreaterThanValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a string, number or date object.
     */

    var GreaterThanValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            value: optionRules.value || 'required|type:{"type":["scalar","date"],"any":true}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be greater than %%compared_value%%.';

        this.name = 'GreaterThanValidator';
    };
    GreaterThanValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    GreaterThanValidator.prototype.constructor = GreaterThanValidator;

    Object.defineProperty(GreaterThanValidator.prototype, 'alias', {
        get: function () {
            return 'greater-than';
        }
    });

    Object.defineProperty(GreaterThanValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'scalar|date'
                }
            ];
        }
    });

    Object.assign(GreaterThanValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.GreaterThanValidator#__compareValues
         * @description Compare two value
         * @param {*} value Value
         * @param {*} comparedValue Compared value
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            return (value > comparedValue);
        },

        /**
         * @private
         * @function
         * @name abv.GreaterThanValidator#__messageParameters
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
        GreaterThanValidator: GreaterThanValidator
    };
}());

abv.registry(abv.GreaterThanValidator);