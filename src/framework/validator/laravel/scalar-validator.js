Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.ScalarValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Finds whether a variable is a scalar. Scalar variables are those containing an <code>integer</code>, <code>float</code>, <code>string</code> or <code>boolean</code>.</p>
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
     * <p>Defined aliases: ['<code>scalar</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ScalarValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var ScalarValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, {}, {}, lang, internal);

        this.message = 'The %%attribute%% field must be scalar.';

        this.name = 'ScalarValidator';
    };
    ScalarValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    ScalarValidator.prototype.constructor = ScalarValidator;

    Object.defineProperty(ScalarValidator.prototype, 'alias', {
        get: function () {
            return [
                'scalar'
            ];
        }
    });

    Object.defineProperty(ScalarValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(ScalarValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.ScalarValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (false === sogv.isValid(this.data, 'type:{"type":"scalar"}')) {
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
         * @name sogv.ScalarValidator#__messageParameters
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
        ScalarValidator: ScalarValidator
    };
}());

sogv.registry(sogv.ScalarValidator);