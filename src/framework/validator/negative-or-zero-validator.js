Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.NegativeOrZeroValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * Validates that a value is a negative number or equal to zero.
     * If you don't want to allow zero as value, use abv.Negative instead.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.NegativeOrZeroValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.NegativeOrZeroValidator#message
     * @type {String}
     * @description
     * The default message supplied when the value is not less than or equal to zero.
     * Default: "This value should be either negative or zero."
     * You can use the following parameters in this message:
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td>%%compared_value%%</td>
     *             <td>The expected value</td>
     *         </tr>
     *         <tr>
     *             <td>%%compared_value_type%%</td>
     *             <td>TThe expected value type</td>
     *         </tr>
     *         <tr>
     *             <td>%%value%%</td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var NegativeOrZeroValidator = function (data, options, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options,{
            message: 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.value = 0;
        this.message = this.__options.message || 'This value should be either negative or zero.';

        this.name = 'NegativeOrZeroValidator';
    };
    NegativeOrZeroValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    NegativeOrZeroValidator.prototype.constructor = NegativeOrZeroValidator;

    Object.defineProperty(NegativeOrZeroValidator.prototype, 'alias', {
        get: function () {
            return 'negative-or-zero';
        }
    });

    Object.assign(NegativeOrZeroValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.NegativeOrZeroValidator#__compareValues
         * @description Compare two value
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
         * @name abv.NegativeOrZeroValidator#__messageParameters
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
        NegativeOrZeroValidator: NegativeOrZeroValidator
    };
}());

abv.registry(abv.NegativeOrZeroValidator);