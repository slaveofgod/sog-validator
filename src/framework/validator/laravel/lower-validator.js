Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.LowerValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Check for <code>lowercase</code> character(s).</p>
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
     * <p>Defined aliases: ['<code>lower</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LowerValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var LowerValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, {}, {}, lang, internal);

        this.message = 'The %%attribute%% field must be lower.';

        this.name = 'LowerValidator';
    };
    LowerValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    LowerValidator.prototype.constructor = LowerValidator;

    Object.defineProperty(LowerValidator.prototype, 'alias', {
        get: function () {
            return [
                'lower'
            ];
        }
    });

    Object.defineProperty(LowerValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(LowerValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.LowerValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (false === sogv.isValid(this.data, 'type:{"type":"lower"}')) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.BetweenValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.LowerValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value'
            }
        }
    });

    return {
        LowerValidator: LowerValidator
    };
}());

sogv.registry(sogv.LowerValidator);