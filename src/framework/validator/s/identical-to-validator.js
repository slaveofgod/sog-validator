Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.IdenticalToValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is identical to another value, defined in the options.</p>
     * <p>This constraint compares using <code>===</code>, so <code>3</code> and "<code>3</code>" are not considered equal.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>identical-to</code>', '<code>identical</code>', '<code>it</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IdenticalToValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.IdenticalToValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is not identical.</p>
     * <p>Default: "<code>This value should be identical to %%compared_value_type%% %%compared_value%%.</code>"</p>
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
     * @name sogv.IdenticalToValidator#value
     * @type {*}
     * @description
     * <p>This option is <code>required</code>.</p>
     * <p>It defines the value to compare to.</p>
     * <p>It can be a <code>string</code>, <code>number</code> or <code>object</code>.</p>
     */

    var IdenticalToValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseComparisonValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            value: optionRules.value || 'required'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be identical to %%compared_value_type%% %%compared_value%%.';

        this.name = 'IdenticalToValidator';
    };
    IdenticalToValidator.prototype = Object.create(sogv.BaseComparisonValidator.prototype);
    IdenticalToValidator.prototype.constructor = IdenticalToValidator;

    Object.defineProperty(IdenticalToValidator.prototype, 'alias', {
        get: function () {
            return [
                'identical-to',
                'identical',
                'it'
            ];
        }
    });

    Object.defineProperty(IdenticalToValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'boolean|scalar|any'
                }
            ];
        }
    });

    Object.assign(IdenticalToValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.IdenticalToValidator#__compareValues
         * @description
         * <p>Compare two value.</p>
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
         * @name sogv.IdenticalToValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
         */
        __messageParameters: function () {
            return {
                'value': this.__formattedData(this.data),
                'compared_value': this.__formattedData(this.value),
                'compared_value_type': sogv.getType(this.value)
            }
        }
    });

    return {
        IdenticalToValidator: IdenticalToValidator
    };
}());

sogv.registerValidator(sogv.IdenticalToValidator);