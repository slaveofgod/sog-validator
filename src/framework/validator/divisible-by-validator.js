Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.DivisibleByValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc Validates that a value is divisible by another value, defined in the options.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.DivisibleByValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.DivisibleByValidator#message
     * @type {String}
     * @description
     * This is the message that will be shown if the value is not divisible by the comparison value.
     * Defaults to "This value should be a multiple of %%compared_value%%."
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
     * @name abv.LessThanOrEqualValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a number or date object.
     */

    var DivisibleByValidator = function (data, options, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}',
            value: 'required|type:{"type":["scalar","date"],"any":true}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be a multiple of %%compared_value%%.';

        this.__setName('DivisibleByValidator');
    };
    DivisibleByValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    DivisibleByValidator.prototype.constructor = DivisibleByValidator;

    Object.defineProperty(DivisibleByValidator.prototype, 'name', {
        get: function () {
            return this.__getName();
        }
    });

    Object.assign(DivisibleByValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.LessThanOrEqualValidator#__compareValues
         * @description Compare two value
         * @param {*} value Value
         * @param {*} comparedValue Compared value
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            if (abv.isType('integer', value) && abv.isType('integer', comparedValue)) {
                return 0 === (value % comparedValue);
            }

            var remainder = abv.fmod(value, comparedValue);
            if (true === remainder) {
                return true;
            }

            return abv.sprintf('%.12e', comparedValue) === abv.sprintf('%.12e', remainder);
        },

        /**
         * @private
         * @function
         * @name abv.LessThanOrEqualValidator#__messageParameters
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
        DivisibleByValidator: DivisibleByValidator
    };
}());