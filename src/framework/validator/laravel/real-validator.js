Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.RealValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Finds whether the type of a variable is <code>real</code>.</p>
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
     * <p>Defined aliases: ['<code>real</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.RealValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var RealValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, {}, {}, lang, internal);

        this.message = 'The %%attribute%% field must be real.';

        this.name = 'RealValidator';
    };
    RealValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    RealValidator.prototype.constructor = RealValidator;

    Object.defineProperty(RealValidator.prototype, 'alias', {
        get: function () {
            return [
                'real'
            ];
        }
    });

    Object.defineProperty(RealValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(RealValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.RealValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (false === sogv.isValid(this.data, 'type:{"type":"real"}')) {
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
         * @name sogv.RealValidator#__messageParameters
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
        RealValidator: RealValidator
    };
}());

sogv.registry(sogv.RealValidator);