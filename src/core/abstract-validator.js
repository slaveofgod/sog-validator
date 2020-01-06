Object.assign(abv, (function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AbstractValidator
     * @classdesc Abstract base class that implements functionality for validation.
     * @description Create a new validation extension.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options
     * @param {String} lang Language of error messages.
     * @constructor
     */

    // PROPERTIES

    /**
     * @name abv.RegexValidator#data
     * @type {*}
     * @description Data that needs to be validated.
     */

    /**
     * @name abv.RegexValidator#lang
     * @type {String}
     * @description Language of error messages.
     */

    var AbstractValidator = function (data, options, optionRules, lang, internal) {

        this.data = data;
        this.lang = lang || 'en';

        this.__options = options || {};
        this.__errorMessage = null;
        this.__internal = (true === internal);

        if (false === this.__internal) {
            this.__validateOptions(optionRules);
        }
    };

    Object.assign(AbstractValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AbstractValidator#prepareMessage
         * @description Prepare error message
         * @param {String} message Error message text
         * @param {Object} parameters Error message parameters
         * @returns {String} Processed message
         */
        __prepareMessage: function (message, parameters) {
            parameters = parameters || {};

            for (var key in parameters) {
                if (!parameters.hasOwnProperty(key)) continue;

                message = message.replace("%%" + key + "%%", parameters[key]);
            }

            return message;
        },

        /**
         * @function
         * @name abv.AbstractValidator#isValid
         * @description Check if data valid
         * @returns {Boolean} Validation status
         */
        isValid: function () {
            this.__beforeValidate();

            if (null === this.__errorMessage) {
                this.validate();
            }

            this.__afterValidate();

            return (null === this.__errorMessage) ? true: false;
        },

        /**
         * @function
         * @name abv.AbstractValidator#errorMessage
         * @description Return error message
         * @returns {String} Error message
         */
        errorMessage: function () {
            return this.__errorMessage;
        },

        /**
         * @private
         * @function
         * @name abv.AbstractValidator#__setErrorMessage
         * @param {String} message Error message text
         * @param {Object} parameters Error message parameters
         * @description Set error message
         */
        __setErrorMessage: function (message, parameters) {
            this.__errorMessage = this.__prepareMessage(message, parameters);
        },

        /**
         * @private
         * @function
         * @name abv.AbstractValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {},

        /**
         * @private
         * @function
         * @name abv.AbstractValidator#__afterValidate
         * @description Execute after validation is complete
         */
        __afterValidate: function () {},

        /**
         * @private
         * @function
         * @name abv.AbstractValidator#__validateOptions
         * @description Validate options
         * @param {Object} rules Validation rules
         */
        __validateOptions: function (rules) {
            if ('undefined' === typeof rules || null === rules) {
                return ;
            }

            for (var key in rules) {
                if (!rules.hasOwnProperty(key)) continue;

                var message = abv.isValidWithErrorMessage(this.__options[key], rules[key], true);
                if (null !== message) {
                    throw new Error(message);
                }
            }
        }
    });

    return {
        AbstractValidator: AbstractValidator
    };
}()));
