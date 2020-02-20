Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.AlphaDashValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation may have <code>alpha-numeric</code> characters, as well as <code>dashes</code> and <code>underscores</code>.</p>
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
     * <p>Defined aliases: ['<code>alpha_dash</code>', '<code>alpha-dash</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.AlphaDashValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var AlphaDashValidator = function (data, options, optionRules, lang, internal) {
        sogv.TypeValidator.call(this, data, {
            type: 'aldash',
            message: "The %%attribute%% may only contain letters, numbers, dashes and underscores."
        }, {}, lang, internal);

        this.name = 'AlphaDashValidator';
    };
    AlphaDashValidator.prototype = Object.create(sogv.TypeValidator.prototype);
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
         * @name sogv.AlphaDashValidator#__messageParameters
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
        AlphaDashValidator: AlphaDashValidator
    };
}());

sogv.registerValidator(sogv.AlphaDashValidator);