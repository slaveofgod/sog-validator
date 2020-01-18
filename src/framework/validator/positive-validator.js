Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.PositiveValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * <p>Validates that a value is a positive number.</p>
     * <p>Zero is neither positive nor negative, so you must use abv.PositiveOrZero if you want to allow zero as value.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.PositiveValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.PositiveValidator#message
     * @type {String}
     * @description
     * <p>The default message supplied when the value is not greater than zero.</p>
     * <p>Default: "<code>This value should be positive.</code>"</p>
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

    var PositiveValidator = function (data, options, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options,{
            message: 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.value = 0;
        this.message = this.__options.message || 'This value should be positive.';

        this.name = 'PositiveValidator';
    };
    PositiveValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    PositiveValidator.prototype.constructor = PositiveValidator;

    Object.defineProperty(PositiveValidator.prototype, 'alias', {
        get: function () {
            return 'positive';
        }
    });

    Object.assign(PositiveValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.PositiveValidator#__compareValues
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
         * @name abv.PositiveValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': this.data,
                'compared_value': this.value,
                'compared_value_type': abv.getType(this.value)
            }
        }
    });

    return {
        PositiveValidator: PositiveValidator
    };
}());

abv.registry(abv.PositiveValidator);