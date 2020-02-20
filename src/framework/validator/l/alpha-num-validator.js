Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.AlphaNumValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be entirely <code>alpha-numeric</code> characters.</p>
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
     * <p>Defined aliases: ['<code>alpha_num</code>', '<code>alpha-num</code>', '<code>alnum</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.AlphaNumValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var AlphaNumValidator = function (data, options, optionRules, lang, internal) {
        sogv.TypeValidator.call(this, data, {
            type: 'alnum',
            message: "The %%attribute%% may only contain letters and numbers."
        }, {}, lang, internal);

        this.name = 'AlphaNumValidator';
    };
    AlphaNumValidator.prototype = Object.create(sogv.TypeValidator.prototype);
    AlphaNumValidator.prototype.constructor = AlphaNumValidator;

    Object.defineProperty(AlphaNumValidator.prototype, 'alias', {
        get: function () {
            return [
                'alpha_num',
                'alpha-num',
                'alnum'
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
         * @name sogv.AlphaNumValidator#__messageParameters
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
        AlphaNumValidator: AlphaNumValidator
    };
}());

sogv.registerValidator(sogv.AlphaNumValidator);