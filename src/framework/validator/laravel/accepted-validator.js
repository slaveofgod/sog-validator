Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AcceptedValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be <code>yes</code>, <code>on</code>, <code>1</code>, or <code>true</code>.</p>
     * <p>This is useful for validating "Terms of Service" acceptance.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.AcceptedValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var AcceptedValidator = function (data, options, optionRules, lang, internal) {
        abv.ChoiceValidator.call(this, data, {
            choices: ['yes', 'on', 1, true, '1', 'true'],
            message: "The %%attribute%% must be accepted."
        }, {}, lang, internal);

        this.name = 'AcceptedValidator';
    };
    AcceptedValidator.prototype = Object.create(abv.ChoiceValidator.prototype);
    AcceptedValidator.prototype.constructor = AcceptedValidator;

    Object.defineProperty(AcceptedValidator.prototype, 'alias', {
        get: function () {
            return 'accepted';
        }
    });

    Object.defineProperty(AcceptedValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(AcceptedValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AcceptedValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'field'
            }
        }
    });

    return {
        AcceptedValidator: AcceptedValidator
    };
}());

abv.registry(abv.AcceptedValidator);