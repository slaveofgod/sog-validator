Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.ObjectValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Finds whether a variable is an <code>object</code>.</p>
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
     * <p>Defined aliases: ['<code>object</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ObjectValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var ObjectValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseValidator.call(this, data, {}, {}, lang, internal);

        this.message = 'The %%attribute%% field must be object.';

        this.name = 'ObjectValidator';
    };
    ObjectValidator.prototype = Object.create(sogv.BaseValidator.prototype);
    ObjectValidator.prototype.constructor = ObjectValidator;

    Object.defineProperty(ObjectValidator.prototype, 'alias', {
        get: function () {
            return [
                'object'
            ];
        }
    });

    Object.defineProperty(ObjectValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(ObjectValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.ObjectValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (false === sogv.isValid(this.data, 'type:{"type":"object"}')) {
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
         * @name sogv.ObjectValidator#__messageParameters
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
        ObjectValidator: ObjectValidator
    };
}());

sogv.registerValidator(sogv.ObjectValidator);