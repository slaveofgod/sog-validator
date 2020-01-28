Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.CallableValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Verify that the contents of a variable can be called as a <code>function</code>.</p>
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
     * <p>Defined aliases: ['<code>callable</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.CallableValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var CallableValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, {}, {}, lang, internal);

        this.message = 'The %%attribute%% field must be callable.';

        this.name = 'CallableValidator';
    };
    CallableValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    CallableValidator.prototype.constructor = CallableValidator;

    Object.defineProperty(CallableValidator.prototype, 'alias', {
        get: function () {
            return [
                'callable'
            ];
        }
    });

    Object.defineProperty(CallableValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(CallableValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.CallableValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (false === sogv.isValid(this.data, 'type:{"type":"callable"}')) {
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
         * @name sogv.CallableValidator#__messageParameters
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
        CallableValidator: CallableValidator
    };
}());

sogv.registry(sogv.CallableValidator);