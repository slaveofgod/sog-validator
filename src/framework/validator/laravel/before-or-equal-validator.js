Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.BeforeOrEqualValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be a value preceding or equal to the given date.</p>
     * <p>The dates will be passed into the Data object.</p>
     * <p>In addition, like the after rule, the name of another field under validation may be supplied as the value of date.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.BeforeOrEqualValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.BeforeOrEqualValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a date in string, number or date object formats.
     */

    var BeforeOrEqualValidator = function (data, options, optionRules, lang, internal) {
        abv.LessThanOrEqualValidator.call(this, data, {
            message: "The %%attribute%% must be a date before or equal to %%date%%.",
            value: options.value
        }, {
            value: 'required|type:{"type":["date","date-string"],"any":true}'
        }, lang, internal);

        this.name = 'BeforeOrEqualValidator';
    };
    BeforeOrEqualValidator.prototype = Object.create(abv.LessThanOrEqualValidator.prototype);
    BeforeOrEqualValidator.prototype.constructor = BeforeOrEqualValidator;

    Object.defineProperty(BeforeOrEqualValidator.prototype, 'alias', {
        get: function () {
            return [
                'before_or_equal',
                'before-or-equal'
            ];
        }
    });

    Object.defineProperty(BeforeOrEqualValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'date'
                }
            ];
        }
    });

    Object.assign(BeforeOrEqualValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.BeforeOrEqualValidator#__messageParameters
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
        BeforeOrEqualValidator: BeforeOrEqualValidator
    };
}());

abv.registry(abv.BeforeOrEqualValidator);