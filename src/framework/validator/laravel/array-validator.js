Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.ArrayValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be an array</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.ArrayValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var ArrayValidator = function (data, options, optionRules, lang, internal) {
        abv.TypeValidator.call(this, data, {
            type: 'array',
            message: "The %%attribute%% must be an array."
        }, {}, lang, internal);

        this.name = 'ArrayValidator';
    };
    ArrayValidator.prototype = Object.create(abv.TypeValidator.prototype);
    ArrayValidator.prototype.constructor = ArrayValidator;

    Object.defineProperty(ArrayValidator.prototype, 'alias', {
        get: function () {
            return 'array';
        }
    });

    Object.defineProperty(ArrayValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(ArrayValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.ArrayValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value'
            }
        }
    });

    return {
        ArrayValidator: ArrayValidator
    };
}());

abv.registry(abv.ArrayValidator);