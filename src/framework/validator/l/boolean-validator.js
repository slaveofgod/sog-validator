Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.BooleanValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be able to be cast as a <code>boolean</code>. Accepted input are <code>true</code>, <code>false</code>, <code>1</code>, <code>0</code>, "<code>1</code>", and "<code>0</code>".</p>
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
     * <p>Defined aliases: ['<code>boolean</code>', '<code>bool</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.BooleanValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var BooleanValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, {}, {}, lang, internal);

        this.message = 'The %%attribute%% field must be true or false.';

        this.name = 'BooleanValidator';
    };
    BooleanValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    BooleanValidator.prototype.constructor = BooleanValidator;

    Object.defineProperty(BooleanValidator.prototype, 'alias', {
        get: function () {
            return [
                'bool',
                'boolean'
            ];
        }
    });

    Object.defineProperty(BooleanValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(BooleanValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.BooleanValidator#__validate
         * @description
         * <p>Validate data.<p>
         */
        __validate: function () {
            if (
                false === sogv.isValid(this.data, 'false')
                && false === sogv.isValid(this.data, 'true')
            ) {
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

            // Check if value is scalar
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.BooleanValidator#__messageParameters
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
        BooleanValidator: BooleanValidator
    };
}());

sogv.registerValidator(sogv.BooleanValidator);