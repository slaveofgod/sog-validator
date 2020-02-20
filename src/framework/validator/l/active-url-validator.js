Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.ActiveUrlValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must have a valid <code>A</code> or <code>AAAA</code> record</p>
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
     * <p>Defined aliases: ['<code>active_url</code>','<code>active-url</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ActiveUrlValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var ActiveUrlValidator = function (data, options, optionRules, lang, internal) {
        sogv.UrlValidator.call(this, data, {
            message: "The %%attribute%% is not a valid URL."
        }, {}, lang, internal);

        this.name = 'ActiveUrlValidator';
    };
    ActiveUrlValidator.prototype = Object.create(sogv.UrlValidator.prototype);
    ActiveUrlValidator.prototype.constructor = ActiveUrlValidator;

    Object.defineProperty(ActiveUrlValidator.prototype, 'alias', {
        get: function () {
            return [
                'active_url',
                'active-url'
            ];
        }
    });

    Object.defineProperty(ActiveUrlValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(ActiveUrlValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.ActiveUrlValidator#__messageParameters
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
        ActiveUrlValidator: ActiveUrlValidator
    };
}());

sogv.registerValidator(sogv.ActiveUrlValidator);