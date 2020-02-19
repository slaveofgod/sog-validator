Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.NumericValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be numeric.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>numeric</code>', '<code>num</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NumericValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var NumericValidator = function (data, options, optionRules, lang, internal) {
        sogv.TypeValidator.call(this, data, {
            type: 'numeric',
            message: "The %%attribute%% must be a number."
        }, {}, lang, internal);

        this.name = 'NumericValidator';
    };
    NumericValidator.prototype = Object.create(sogv.TypeValidator.prototype);
    NumericValidator.prototype.constructor = NumericValidator;

    Object.defineProperty(NumericValidator.prototype, 'alias', {
        get: function () {
            return [
                'numeric',
                'num'
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
         * @name sogv.NumericValidator#__messageParameters
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

sogv.registry(sogv.NumericValidator);