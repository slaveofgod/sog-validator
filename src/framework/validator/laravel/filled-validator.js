Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.FilledValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must not be <code>empty</code> when it is present.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.FilledValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var FilledValidator = function (data, options, optionRules, lang, internal) {
        abv.NotBlankValidator.call(this, data, {
            message: "The %%attribute%% field must have a value."
        }, optionRules, lang, internal);

        this.name = 'FilledValidator';
    };
    FilledValidator.prototype = Object.create(abv.NotBlankValidator.prototype);
    FilledValidator.prototype.constructor = FilledValidator;

    Object.defineProperty(FilledValidator.prototype, 'alias', {
        get: function () {
            return 'filled';
        }
    });

    Object.defineProperty(FilledValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(FilledValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.FilledValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'current'
            }
        }
    });

    return {
        FilledValidator: FilledValidator
    };
}());

abv.registry(abv.FilledValidator);