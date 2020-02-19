Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.CntrlValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Check for <code>control</code> character(s).</p>
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
     * <p>Defined aliases: ['<code>cntrl</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.CntrlValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var CntrlValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, {}, {}, lang, internal);

        this.message = 'The %%attribute%% field must be cntrl.';

        this.name = 'CntrlValidator';
    };
    CntrlValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    CntrlValidator.prototype.constructor = CntrlValidator;

    Object.defineProperty(CntrlValidator.prototype, 'alias', {
        get: function () {
            return [
                'cntrl'
            ];
        }
    });

    Object.defineProperty(CntrlValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(CntrlValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.CntrlValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (false === sogv.isValid(this.data, 'type:{"type":"cntrl"}')) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.BetweenValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Cancel validation if data is empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.CntrlValidator#__messageParameters
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
        CntrlValidator: CntrlValidator
    };
}());

sogv.registry(sogv.CntrlValidator);