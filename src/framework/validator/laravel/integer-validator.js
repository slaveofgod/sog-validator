Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IntegerValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be an integer.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.IntegerValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var IntegerValidator = function (data, options, optionRules, lang, internal) {
        abv.TypeValidator.call(this, data, {
            type: 'integer',
            message: "The %%attribute%% must be an integer."
        }, {}, lang, internal);

        this.name = 'IntegerValidator';
    };
    IntegerValidator.prototype = Object.create(abv.TypeValidator.prototype);
    IntegerValidator.prototype.constructor = IntegerValidator;

    Object.defineProperty(IntegerValidator.prototype, 'alias', {
        get: function () {
            return [
                'integer'
            ];
        }
    });

    Object.defineProperty(IntegerValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(IntegerValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IntegerValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value'
            }
        }
    });

    return {
        IntegerValidator: IntegerValidator
    };
}());

abv.registry(abv.IntegerValidator);