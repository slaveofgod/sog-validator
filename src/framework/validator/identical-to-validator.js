Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IdenticalToValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * Validates that a value is identical to another value, defined in the options.
     * This constraint compares using ===, so 3 and "3" are not considered equal.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.IdenticalToValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.IdenticalToValidator#message
     * @type {String}
     * @description
     * This is the message that will be shown if the value is not identical.
     * Default: "This value should be identical to %%compared_value_type%% %%compared_value%%."
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
     *             <td>The expected value type</td>
     *         </tr>
     *         <tr>
     *             <td>%%value%%</td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name abv.IdenticalToValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a string, number or object.
     */

    var IdenticalToValidator = function (data, options, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options,{
            message: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            value: 'required'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be identical to %%compared_value_type%% %%compared_value%%.';

        this.name = 'IdenticalToValidator';
    };
    IdenticalToValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    IdenticalToValidator.prototype.constructor = IdenticalToValidator;

    Object.defineProperty(IdenticalToValidator.prototype, 'alias', {
        get: function () {
            return 'identical-to';
        }
    });

    Object.assign(IdenticalToValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IdenticalToValidator#__compareValues
         * @description Compare two value
         * @param {*} value Value
         * @param {*} comparedValue Compared value
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            return (value === comparedValue);
        },

        /**
         * @private
         * @function
         * @name abv.IdenticalToValidator#__messageParameters
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
        IdenticalToValidator: IdenticalToValidator
    };
}());

abv.registry(abv.IdenticalToValidator);