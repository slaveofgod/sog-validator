Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.JsonValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value has valid JSON syntax.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.JsonValidator(data);
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.JsonValidator#message
     * @type {String}
     * @description
     * This message is shown if the underlying data is not a valid JSON value.
     * Default: "This value should be valid JSON."
     */

    var JsonValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}'
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

    Object.assign(JsonValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.JsonValidator#__validate
         * @description Validate data
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
         * @name abv.EmailValidator#__beforeValidate
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
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.JsonValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
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