Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.BooleanValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be able to be cast as a <code>boolean</code>. Accepted input are <code>true</code>, <code>false</code>, <code>1</code>, <code>0</code>, "<code>1</code>", and "<code>0</code>".</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.BooleanValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var BooleanValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, {}, {}, lang, internal);

        this.message = 'The %%attribute%% field must be true or false.';

        this.name = 'BooleanValidator';
    };
    BooleanValidator.prototype = Object.create(abv.AbstractValidator.prototype);
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
         * @name abv.BooleanValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (
                false === abv.isValid(this.data, 'false')
                && false === abv.isValid(this.data, 'true')
            ) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.BetweenValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.BooleanValidator#__messageParameters
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
        BooleanValidator: BooleanValidator
    };
}());

abv.registry(abv.BooleanValidator);