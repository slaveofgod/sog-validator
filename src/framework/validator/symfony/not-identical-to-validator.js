Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.NotIdenticalToValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * <p>Validates that a value is not identical to another value, defined in the options.</p>
     * <p>This constraint compares using <code>!==</code>, so <code>3</code> and "<code>3</code>" are considered not equal.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.NotIdenticalToValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.NotIdenticalToValidator#message
     * @type {String}
     * @description
     * This is the message that will be shown if the value is identical.</p>
     * <p>Default: "<code>This value should not be identical to %%compared_value_type%% %%compared_value%%.</code>"</p>
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
     * @name abv.NotIdenticalToValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a string, number or object.
     */

    var NotIdenticalToValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            value: optionRules.value || 'required'
        }, lang, internal);

        this.message = this.__options.message || 'This value should not be identical to %%compared_value_type%% %%compared_value%%.';

        this.name = 'NotIdenticalToValidator';
    };
    NotIdenticalToValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    NotIdenticalToValidator.prototype.constructor = NotIdenticalToValidator;

    Object.defineProperty(NotIdenticalToValidator.prototype, 'alias', {
        get: function () {
            return 'not-identical-to';
        }
    });

    Object.defineProperty(NotIdenticalToValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'any'
                }
            ];
        }
    });

    Object.assign(NotIdenticalToValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.NotIdenticalToValidator#__compareValues
         * @description Compare two value
         * @param {*} value Value
         * @param {*} comparedValue Compared value
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            return (value !== comparedValue);
        },

        /**
         * @private
         * @function
         * @name abv.NotIdenticalToValidator#__messageParameters
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
        NotIdenticalToValidator: NotIdenticalToValidator
    };
}());

abv.registry(abv.NotIdenticalToValidator);