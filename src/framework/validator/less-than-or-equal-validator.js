Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.LessThanOrEqualValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * Validates that a value is less than or equal to another value, defined in the options.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.LessThanOrEqualValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.LessThanOrEqualValidator#message
     * @type {String}
     * @description
     * This is the message that will be shown if the value is not less than or equal to the comparison value.
     * Default: "This value should be less than or equal to %%compared_value%%."
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

    /**
     * @name abv.LessThanOrEqualValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a string, number or date object.
     */

    var LessThanOrEqualValidator = function (data, options, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options,{
            message: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            value: 'required|type:{"type":["scalar","date"],"any":true}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be less than or equal to %%compared_value%%.';

        this.name = 'LessThanOrEqualValidator';
    };
    LessThanOrEqualValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    LessThanOrEqualValidator.prototype.constructor = LessThanOrEqualValidator;

    Object.defineProperty(LessThanOrEqualValidator.prototype, 'alias', {
        get: function () {
            return 'less-than-or-equal';
        }
    });

    Object.assign(LessThanOrEqualValidator.prototype, {
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
            return (value <= comparedValue);
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
        LessThanOrEqualValidator: LessThanOrEqualValidator
    };
}());

abv.registry(abv.LessThanOrEqualValidator);