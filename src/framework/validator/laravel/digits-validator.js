Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.DigitsValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be numeric and must have an exact length of value.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.DigitsValidator(data, {"length": 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    /**
     * @name abv.DigitsValidator#length
     * @type {*}
     * @description This option is required. It defines the exact count of digits.
     */

    var DigitsValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            length: optionRules.length || 'required|type:{"type":"integer"}'
        }, lang, internal);

        this.message = 'The %%attribute%% must be %%digits%% digits.';
        this.length = this.__options.length;

        this.name = 'DigitsValidator';
    };
    DigitsValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    DigitsValidator.prototype.constructor = DigitsValidator;

    Object.defineProperty(DigitsValidator.prototype, 'alias', {
        get: function () {
            return [
                'digits'
            ];
        }
    });

    Object.defineProperty(DigitsValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(DigitsValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.DigitsValidator#__validate
         * @description Validate data
         */
        __validate: function () {

            if (false === abv.isValid(this.data, 'type:{"type":"numeric"}')) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            if (this.length !== this.data.length) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.LocaleValidator#__beforeValidate
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

            try {
                if ('undefined' !== typeof this.data) {
                    this.data = this.data.toString();
                }
            } catch (e) {
                this.__setErrorMessage('This value ' + this.data + ' could not be converted to string.');
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.DigitsValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'digits': this.value
            }
        }
    });

    return {
        DigitsValidator: DigitsValidator
    };
}());

abv.registry(abv.DigitsValidator);