Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.DigitsBetweenValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be <code>numeric</code> and must have a length between the given <code>min</code> and <code>max</code>.</p>
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
     * <p>Defined aliases: ['<code>digits_between</code>', '<code>digits-between</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DigitsBetweenValidator(data, {"min": 5, "max": 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.DigitsBetweenValidator#min
     * @type {Integer}
     * @description
     * This option is required. It defines the min count of digits.
     */

    /**
     * @name sogv.DigitsBetweenValidator#max
     * @type {Integer}
     * @description
     * This option is required. It defines the max count of digits.
     */

    var DigitsBetweenValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            max: optionRules.max || 'type:{"type":"integer"}',
            min: optionRules.min || 'type:{"type":"integer"}'
        }, lang, internal);

        this.max = this.__options.max;
        this.min = this.__options.min;
        this.message = 'The %%attribute%% must be between %%min%% and %%max%% digits.';

        this.name = 'DigitsBetweenValidator';
    };
    DigitsBetweenValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    DigitsBetweenValidator.prototype.constructor = DigitsBetweenValidator;

    Object.defineProperty(DigitsBetweenValidator.prototype, 'alias', {
        get: function () {
            return [
                'digits_between',
                'digits-between'
            ];
        }
    });

    Object.defineProperty(DigitsBetweenValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'min',
                    'type': 'integer'
                }, {
                    'name': 'max',
                    'type': 'integer'
                }
            ];
        }
    });

    Object.assign(DigitsBetweenValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.DigitsBetweenValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"numeric"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage);
                return ;
            }

            if (this.min > this.data.length) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            if (this.max < this.data.length) {
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
            // Check "min" and "max" exist
            if (!this.min || !this.max) {
                throw new Error('Either option "min" and "max" must be given for constraint');
            }

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
         * @name sogv.DigitsBetweenValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'min': this.min,
                'max': this.max
            }
        }
    });

    return {
        DigitsBetweenValidator: DigitsBetweenValidator
    };
}());

sogv.registerValidator(sogv.DigitsBetweenValidator);