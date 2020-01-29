Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.ArrayValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be an array</p>
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
     * <p>Defined aliases: ['<code>array</code>', '<code>arr</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ArrayValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var ArrayValidator = function (data, options, optionRules, lang, internal) {
        sogv.TypeValidator.call(this, data, {
            type: 'array',
            message: "The %%attribute%% must be an array."
        }, {}, lang, internal);

        this.name = 'ArrayValidator';
    };
    ArrayValidator.prototype = Object.create(sogv.TypeValidator.prototype);
    ArrayValidator.prototype.constructor = ArrayValidator;

    Object.defineProperty(ArrayValidator.prototype, 'alias', {
        get: function () {
            return [
                'array',
                'arr'
            ];
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
         * @name sogv.ArrayValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
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

sogv.registry(sogv.ArrayValidator);