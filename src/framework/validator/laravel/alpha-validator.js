Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AlphaValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be entirely alphabetic characters.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.AlphaValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var AlphaValidator = function (data, options, optionRules, lang, internal) {
        abv.TypeValidator.call(this, data, {
            type: 'alpha',
            message: "The %%attribute%% may only contain letters."
        }, {}, lang, internal);

        this.name = 'AlphaValidator';
    };
    AlphaValidator.prototype = Object.create(abv.TypeValidator.prototype);
    AlphaValidator.prototype.constructor = AlphaValidator;

    Object.defineProperty(AlphaValidator.prototype, 'alias', {
        get: function () {
            return 'alpha';
        }
    });

    Object.defineProperty(AlphaValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(AlphaValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AlphaValidator#__messageParameters
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
        AlphaValidator: AlphaValidator
    };
}());

abv.registry(abv.AlphaValidator);