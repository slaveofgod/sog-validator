Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.DistinctValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>When working with <code>arrays</code>, the field under validation must not have any duplicate values.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.DistinctValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var DistinctValidator = function (data, options, optionRules, lang, internal) {
        abv.UniqueValidator.call(this, data, {
            message: 'The %%attribute%% field has a duplicate value.'
        }, {}, lang, internal);

        this.name = 'DistinctValidator';
    };
    DistinctValidator.prototype = Object.create(abv.UniqueValidator.prototype);
    DistinctValidator.prototype.constructor = DistinctValidator;

    Object.defineProperty(DistinctValidator.prototype, 'alias', {
        get: function () {
            return 'distinct';
        }
    });

    Object.defineProperty(DistinctValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(DistinctValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.DistinctValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            abv.UniqueValidator.prototype.__beforeValidate.call(this);

            // Check if value is array
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":["array","iterable"]}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.DigitsValidator#__messageParameters
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
        DistinctValidator: DistinctValidator
    };
}());

abv.registry(abv.DistinctValidator);