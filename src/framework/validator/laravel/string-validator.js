Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.StringValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be a string.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.StringValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var StringValidator = function (data, options, optionRules, lang, internal) {
        abv.TypeValidator.call(this, data, {
            type: 'string',
            message: "The %%attribute%% must be a string."
        }, {}, lang, internal);

        this.name = 'StringValidator';
    };
    StringValidator.prototype = Object.create(abv.TypeValidator.prototype);
    StringValidator.prototype.constructor = StringValidator;

    Object.defineProperty(StringValidator.prototype, 'alias', {
        get: function () {
            return [
                'string'
            ];
        }
    });

    Object.defineProperty(StringValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(StringValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.StringValidator#__messageParameters
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
        StringValidator: StringValidator
    };
}());

abv.registry(abv.StringValidator);