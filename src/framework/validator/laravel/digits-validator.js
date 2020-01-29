Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.DigitsValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be <code>numeric</code> and must have an exact <code>length</code> of value.</p>
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
     * <p>Defined aliases: ['<code>digits</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DigitsValidator(data, {"length": 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.DigitsValidator#length
     * @type {*}
     * @description This option is required. It defines the exact count of digits.
     */

    var DigitsValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            length: optionRules.length || 'required|type:{"type":"integer"}'
        }, lang, internal);

        this.message = 'The %%attribute%% must be %%digits%% digits.';
        this.length = this.__options.length;

        this.name = 'DigitsValidator';
    };
    DigitsValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
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
            return [
                {
                    'name': 'length',
                    'type': 'integer'
                }
            ];
        }
    });

    Object.assign(DigitsValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.DigitsValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"numeric"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage);
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
         * @name sogv.LocaleValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Check if empty
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

            // Convert data to string
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
         * @name sogv.DigitsValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'digits': this.length
            }
        }
    });

    return {
        DigitsValidator: DigitsValidator
    };
}());

sogv.registry(sogv.DigitsValidator);