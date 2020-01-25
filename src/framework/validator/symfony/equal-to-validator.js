Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.EqualToValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * <p>Validates that a value is equal to another value, defined in the options.</p>
     * <p>This constraint compares using <code>==</code>, so <code>3</code> and "<code>3</code>" are considered equal. Use <code>abv.IdenticalTo</code> to compare with <code>===</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.EqualToValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.EqualToValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is not equal.</p>
     * <p>Default: "<code>This value should be equal to %%compared_value%%.</code>"</p>
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
     * @name abv.EqualToValidator#value
     * @type {*}
     * @description
     * <p>This option is required.</p>
     * <p>It defines the value to compare to.</p>
     * <p>It can be a <code>string</code>, <code>number</code> or <code>object</code>.</p>
     */

    var EqualToValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            value: optionRules.value || 'required'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be equal to %%compared_value%%.';

        this.name = 'EqualToValidator';
    };
    EqualToValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    EqualToValidator.prototype.constructor = EqualToValidator;

    Object.defineProperty(EqualToValidator.prototype, 'alias', {
        get: function () {
            return [
                'equal-to',
                'equal',
                'same'
            ];
        }
    });

    Object.defineProperty(EqualToValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'any'
                }
            ];
        }
    });

    Object.assign(EqualToValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.EqualToValidator#__compareValues
         * @description
         * <p>Compare two value.</p>
         * @param {*} value Value
         * @param {*} comparedValue Compared value
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            return (value == comparedValue);
        },

        /**
         * @private
         * @function
         * @name abv.EqualToValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
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
        EqualToValidator: EqualToValidator
    };
}());

abv.registry(abv.EqualToValidator);