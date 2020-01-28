Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.DoubleValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Finds whether the type of a variable is <code>double</code>.</p>
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
     * <p>Defined aliases: ['<code>double</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DoubleValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var DoubleValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, {}, {}, lang, internal);

        this.message = 'The %%attribute%% field must be double.';

        this.name = 'DoubleValidator';
    };
    DoubleValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    DoubleValidator.prototype.constructor = DoubleValidator;

    Object.defineProperty(DoubleValidator.prototype, 'alias', {
        get: function () {
            return [
                'double'
            ];
        }
    });

    Object.defineProperty(DoubleValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(DoubleValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.DoubleValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (false === sogv.isValid(this.data, 'type:{"type":"double"}')) {
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
         * @name sogv.DoubleValidator#__messageParameters
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
        DoubleValidator: DoubleValidator
    };
}());

sogv.registry(sogv.DoubleValidator);