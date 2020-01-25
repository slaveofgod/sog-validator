Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.NumericValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be numeric.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.NumericValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var NumericValidator = function (data, options, optionRules, lang, internal) {
        abv.TypeValidator.call(this, data, {
            type: 'numeric',
            message: "The %%attribute%% must be a number."
        }, {}, lang, internal);

        this.name = 'NumericValidator';
    };
    NumericValidator.prototype = Object.create(abv.TypeValidator.prototype);
    NumericValidator.prototype.constructor = NumericValidator;

    Object.defineProperty(NumericValidator.prototype, 'alias', {
        get: function () {
            return [
                'numeric'
            ];
        }
    });

    Object.defineProperty(NumericValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(NumericValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.NumericValidator#__messageParameters
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
        NumericValidator: NumericValidator
    };
}());

abv.registry(abv.NumericValidator);