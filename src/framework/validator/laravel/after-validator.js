Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AfterValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be a value after a given date.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.AfterValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.AfterValidator#value
     * @type {*}
     * @description
     * <p>This option is required.</p>
     * <p>It defines the value to compare to.</p>
     * <p>It can be a data in <code>string</code>, <code>number</code> or <code>date object</code> formats.</p>
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
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
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