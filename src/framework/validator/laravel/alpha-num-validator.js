Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AlphaNumValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be entirely alpha-numeric characters.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.AlphaNumValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var AlphaNumValidator = function (data, options, optionRules, lang, internal) {
        abv.TypeValidator.call(this, data, {
            type: 'alnum',
            message: "The %%attribute%% may only contain letters and numbers."
        }, {}, lang, internal);

        this.name = 'AlphaNumValidator';
    };
    AlphaNumValidator.prototype = Object.create(abv.TypeValidator.prototype);
    AlphaNumValidator.prototype.constructor = AlphaNumValidator;

    Object.defineProperty(AlphaNumValidator.prototype, 'alias', {
        get: function () {
            return [
                'alpha_num',
                'alpha-num'
            ];
        }
    });

    Object.defineProperty(AlphaNumValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(AlphaNumValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AlphaNumValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'field'
            }
        }
    });

    return {
        AlphaNumValidator: AlphaNumValidator
    };
}());

abv.registry(abv.AlphaNumValidator);