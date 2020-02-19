Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.DistinctValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>When working with <code>arrays</code>, the field under validation must not have any duplicate values.</p>
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
     * <p>Defined aliases: ['<code>distinct</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DistinctValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var DistinctValidator = function (data, options, optionRules, lang, internal) {
        sogv.UniqueValidator.call(this, data, {
            message: 'The %%attribute%% field has a duplicate value.'
        }, {}, lang, internal);

        this.name = 'DistinctValidator';
    };
    DistinctValidator.prototype = Object.create(sogv.UniqueValidator.prototype);
    DistinctValidator.prototype.constructor = DistinctValidator;

    Object.defineProperty(DistinctValidator.prototype, 'alias', {
        get: function () {
            return [
                'distinct'
            ];
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
         * @name sogv.DistinctValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            sogv.UniqueValidator.prototype.__beforeValidate.call(this);

            // Check if value is array
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":["array","iterable"]}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.DigitsValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
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

sogv.registry(sogv.DistinctValidator);