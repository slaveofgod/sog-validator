Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.AlphaValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be entirely alphabetic characters.</p>
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
     * <p>Defined aliases: ['<code>alpha</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.AlphaValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var AlphaValidator = function (data, options, optionRules, lang, internal) {
        sogv.TypeValidator.call(this, data, {
            type: 'alpha',
            message: "The %%attribute%% may only contain letters."
        }, {}, lang, internal);

        this.name = 'AlphaValidator';
    };
    AlphaValidator.prototype = Object.create(sogv.TypeValidator.prototype);
    AlphaValidator.prototype.constructor = AlphaValidator;

    Object.defineProperty(AlphaValidator.prototype, 'alias', {
        get: function () {
            return [
                'alpha'
            ];
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
         * @name sogv.AlphaValidator#__messageParameters
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
        AlphaValidator: AlphaValidator
    };
}());

sogv.registerValidator(sogv.AlphaValidator);