Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.NotEqualToValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * Validates that a value is not equal to another value, defined in the options.
     * This constraint compares using !=, so 3 and "3" are considered equal. abv.Use NotIdenticalTo to compare with !==.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.NotEqualToValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.NotEqualToValidator#message
     * @type {String}
     * @description This is the message that will be shown if the value is not equal.
     * Default: "This value should not be equal to %%compared_value%%."
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
     * @name abv.NotEqualToValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a string, number or object.
     */

    var NotEqualToValidator = function (data, options, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}',
            value: 'required'
        }, lang, internal);

        this.message = this.__options.message || 'This value should not be equal to %%compared_value%%.';

        this.name = 'NotEqualToValidator';
    };
    NotEqualToValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    NotEqualToValidator.prototype.constructor = NotEqualToValidator;

    Object.defineProperty(NotEqualToValidator.prototype, 'alias', {
        get: function () {
            return 'not-equal-to';
        }
    });

    Object.assign(NotEqualToValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.NotEqualToValidator#__compareValues
         * @description Compare two value
         * @param {*} value Value
         * @param {*} comparedValue Compared value
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            return (value != comparedValue);
        },

        /**
         * @private
         * @function
         * @name abv.NotEqualToValidator#__messageParameters
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
        NotEqualToValidator: NotEqualToValidator
    };
}());

abv.registry(abv.NotEqualToValidator);