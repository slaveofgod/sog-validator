Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.GreaterThanValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * Validates that a value is greater than another value, defined in the options.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.GreaterThanValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.GreaterThanValidator#message
     * @type {String}
     * @description This is the message that will be shown if the value is not greater than the comparison value.
     * Defaults to "This value should be greater than %%compared_value%%."
     * You can use the following parameters in this message:
     * <table>
     *     <tr>
     *         <td><b>Parameter</b></td>
     *         <td><b>Description</b></td>
     *     </tr>
     *     <tr>
     *         <td>%%compared_value%%</td>
     *         <td>The expected value</td>
     *     </tr>
     *     <tr>
     *         <td>%%compared_value_type%%</td>
     *         <td>TThe expected value type</td>
     *     </tr>
     *     <tr>
     *         <td>%%value%%</td>
     *         <td>The current (invalid) value</td>
     *     </tr>
     * </table>
     */

    /**
     * @name abv.GreaterThanValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a string, number or date object.
     */

    var GreaterThanValidator = function (data, options, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}',
            value: 'required|type:{"type":["scalar","date"],"any":true}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be greater than %%compared_value%%.';

        this.__setName('GreaterThanValidator');
    };
    GreaterThanValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    GreaterThanValidator.prototype.constructor = GreaterThanValidator;

    Object.defineProperty(GreaterThanValidator.prototype, 'name', {
        get: function () {
            return this.__getName();
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
                'value': this.data,
                'compared_value': this.value,
                'compared_value_type': abv.getType(this.value)
            }
        }
    });

    return {
        GreaterThanValidator: GreaterThanValidator
    };
}());