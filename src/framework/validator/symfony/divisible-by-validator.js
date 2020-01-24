Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.DivisibleByValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * <p>Validates that a value is divisible by another value, defined in the options.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.DivisibleByValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.DivisibleByValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is not divisible by the comparison value.</p>
     * <p>Default: "<code>This value should be a multiple of %%compared_value%%.</code>"</p>
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
     * @name abv.LessThanOrEqualValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a number or date object.
     */

    var DivisibleByValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            value: optionRules.value || 'required|type:{"type":["scalar","date"],"any":true}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be a multiple of %%compared_value%%.';

        this.name = 'DivisibleByValidator';
    };
    DivisibleByValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    DivisibleByValidator.prototype.constructor = DivisibleByValidator;

    Object.defineProperty(DivisibleByValidator.prototype, 'alias', {
        get: function () {
            return 'divisible-by';
        }
    });

    Object.defineProperty(DivisibleByValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'date'
                }
            ];
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
                'value': this.__formattedData(this.data),
                'compared_value': this.__formattedData(this.value),
                'compared_value_type': abv.getType(this.value)
            }
        }
    });

    return {
        DivisibleByValidator: DivisibleByValidator
    };
}());

abv.registry(abv.DivisibleByValidator);