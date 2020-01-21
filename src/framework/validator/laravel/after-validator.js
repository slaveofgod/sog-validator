Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AfterValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be a value after a given date.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.AfterValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.AfterValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if the value is not greater than the comparison value.</p>
     * <p>Default: "<code>The %%attribute%% must be a date after %%date%%.</code>"</p>
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
     *             <td><code>%%attribute%%</code></td>
     *             <td>The string "value"</td>
     *         </tr>
     *         <tr>
     *             <td><code>%%date%%</code></td>
     *             <td>The current (invalid) date</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name abv.AfterValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a date in string, number or date object formats.
     */

    var AfterValidator = function (data, options, optionRules, lang, internal) {
        abv.GreaterThanValidator.call(this, data, {
            message: "The %%attribute%% must be a date after %%date%%.",
            value: options.value
        }, {
            value: 'required|type:{"type":["date","date-string"],"any":true}'
        }, lang, internal);

        this.name = 'AfterValidator';
    };
    AfterValidator.prototype = Object.create(abv.GreaterThanValidator.prototype);
    AfterValidator.prototype.constructor = AfterValidator;

    Object.defineProperty(AfterValidator.prototype, 'alias', {
        get: function () {
            return 'after';
        }
    });

    Object.defineProperty(AfterValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'date'
                }
            ];
        }
    });

    Object.assign(AfterValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AfterValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'date': this.data
            }
        }
    });

    return {
        AfterValidator: AfterValidator
    };
}());

abv.registry(abv.AfterValidator);