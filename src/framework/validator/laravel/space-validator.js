Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.SpaceValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Check for <code>whitespace</code> character(s).</p>
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
     * <p>Defined aliases: ['<code>space</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.SpaceValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var SpaceValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, {}, {}, lang, internal);

        this.message = 'The %%attribute%% field must be space.';

        this.name = 'SpaceValidator';
    };
    SpaceValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    SpaceValidator.prototype.constructor = SpaceValidator;

    Object.defineProperty(SpaceValidator.prototype, 'alias', {
        get: function () {
            return [
                'space'
            ];
        }
    });

    Object.defineProperty(SpaceValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(SpaceValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.SpaceValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (false === sogv.isValid(this.data, 'type:{"type":"space"}')) {
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
         * @name sogv.SpaceValidator#__messageParameters
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
        SpaceValidator: SpaceValidator
    };
}());

sogv.registry(sogv.SpaceValidator);