Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.IntegerValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be an integer.</p>
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
     * <p>Defined aliases: ['<code>integer</code>', '<code>int</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IntegerValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var IntegerValidator = function (data, options, optionRules, lang, internal) {
        sogv.TypeValidator.call(this, data, {
            type: 'integer',
            message: "The %%attribute%% must be an integer."
        }, {}, lang, internal);

        this.name = 'IntegerValidator';
    };
    IntegerValidator.prototype = Object.create(sogv.TypeValidator.prototype);
    IntegerValidator.prototype.constructor = IntegerValidator;

    Object.defineProperty(IntegerValidator.prototype, 'alias', {
        get: function () {
            return [
                'integer',
                'int'
            ];
        }
    });

    Object.defineProperty(IntegerValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(IntegerValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.IntegerValidator#__messageParameters
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
        IntegerValidator: IntegerValidator
    };
}());

sogv.registerValidator(sogv.IntegerValidator);