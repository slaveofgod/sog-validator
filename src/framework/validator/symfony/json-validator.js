Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.JsonValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>Validates that a value has valid <code>JSON</code> syntax.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.JsonValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.JsonValidator#message
     * @type {String}
     * @description
     * <p>This message is shown if the underlying data is not a valid JSON value.</p>
     * <p>Default: "<code>This value should be valid JSON.</code>"</p>
     */

    var JsonValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be valid JSON.';

        this.name = 'JsonValidator';
    };
    JsonValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    JsonValidator.prototype.constructor = JsonValidator;

    Object.defineProperty(JsonValidator.prototype, 'alias', {
        get: function () {
            return 'json';
        }
    });

    Object.defineProperty(JsonValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(JsonValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.JsonValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            try {
                JSON.parse(this.data);
            } catch (e) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.JsonValidator#__beforeValidate
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
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
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
         * @name abv.JsonValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': this.data
            }
        }
    });

    return {
        JsonValidator: JsonValidator
    };
}());

abv.registry(abv.JsonValidator);