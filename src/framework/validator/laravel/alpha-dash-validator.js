Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AlphaDashValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation may have <code>alpha-numeric</code> characters, as well as <code>dashes</code> and <code>underscores</code>.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.AlphaDashValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var AlphaDashValidator = function (data, options, optionRules, lang, internal) {
        abv.TypeValidator.call(this, data, {
            type: 'aldash',
            message: "The %%attribute%% may only contain letters, numbers, dashes and underscores."
        }, {}, lang, internal);

        this.name = 'AlphaDashValidator';
    };
    AlphaDashValidator.prototype = Object.create(abv.TypeValidator.prototype);
    AlphaDashValidator.prototype.constructor = AlphaDashValidator;

    Object.defineProperty(AlphaDashValidator.prototype, 'alias', {
        get: function () {
            return [
                'alpha_dash',
                'alpha-dash'
            ];
        }
    });

    Object.defineProperty(AlphaDashValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(AlphaDashValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AlphaDashValidator#__messageParameters
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
        AlphaDashValidator: AlphaDashValidator
    };
}());

abv.registry(abv.AlphaDashValidator);