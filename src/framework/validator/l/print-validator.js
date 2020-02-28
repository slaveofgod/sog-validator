Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.PrintValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Check for <code>printable</code> character(s).</p>
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
     * <p>Defined aliases: ['<code>print</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.PrintValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var PrintValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseValidator.call(this, data, {}, {}, lang, internal);

        this.message = 'The %%attribute%% field must be print.';

        this.name = 'PrintValidator';
    };
    PrintValidator.prototype = Object.create(sogv.BaseValidator.prototype);
    PrintValidator.prototype.constructor = PrintValidator;

    Object.defineProperty(PrintValidator.prototype, 'alias', {
        get: function () {
            return [
                'print'
            ];
        }
    });

    Object.defineProperty(PrintValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(PrintValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.PrintValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (false === sogv.isValid(this.data, 'type:{"type":"print"}')) {
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
         * @name sogv.PrintValidator#__messageParameters
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
        PrintValidator: PrintValidator
    };
}());

sogv.registerValidator(sogv.PrintValidator);