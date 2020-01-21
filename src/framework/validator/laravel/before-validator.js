Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.BeforeValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be a value preceding the given date.</p>
     * <p>The dates will be passed into the Data object.</p>
     * <p>In addition, like the after rule, the name of another field under validation may be supplied as the value of date.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.BeforeValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.BeforeValidator#value
     * @type {*}
     * @description This option is required. It defines the value to compare to. It can be a date in string, number or date object formats.
     */

    var BeforeValidator = function (data, options, optionRules, lang, internal) {
        abv.LessThanValidator.call(this, data, {
            message: "The %%attribute%% must be a date before %%date%%.",
            value: options.value
        }, {
            value: 'required|type:{"type":["date","date-string"],"any":true}'
        }, lang, internal);

        this.name = 'BeforeValidator';
    };
    BeforeValidator.prototype = Object.create(abv.LessThanValidator.prototype);
    BeforeValidator.prototype.constructor = BeforeValidator;

    Object.defineProperty(BeforeValidator.prototype, 'alias', {
        get: function () {
            return 'before';
        }
    });

    Object.defineProperty(BeforeValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'date'
                }
            ];
        }
    });

    Object.assign(BeforeValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.BeforeValidator#__messageParameters
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
        BeforeValidator: BeforeValidator
    };
}());

abv.registry(abv.BeforeValidator);