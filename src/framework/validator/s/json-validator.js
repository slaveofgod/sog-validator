Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.JsonValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value has valid <code>JSON</code> syntax.</p>
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
     * <p>Defined aliases: ['<code>json</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.JsonValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.JsonValidator#message
     * @type {String}
     * @description
     * <p>This message is shown if the underlying data is not a valid JSON value.</p>
     * <p>Default: "<code>This value should be valid JSON.</code>"</p>
     */

    var JsonValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be valid JSON.';

        this.name = 'JsonValidator';
    };
    JsonValidator.prototype = Object.create(sogv.BaseValidator.prototype);
    JsonValidator.prototype.constructor = JsonValidator;

    Object.defineProperty(JsonValidator.prototype, 'alias', {
        get: function () {
            return [
                'json'
            ];
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
         * @name sogv.JsonValidator#__validate
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
         * @name sogv.JsonValidator#__beforeValidate
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
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', this.lang, true);
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
         * @name sogv.JsonValidator#__messageParameters
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

sogv.registerValidator(sogv.JsonValidator);