Object.assign(abv, (function () {
    'use strict';

    /**
     * @abstract
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
        this.__error = new abv.ErrorCollection({"lang": lang});
        this.__internal = (true === internal);
        this.__name = null;

        if (false === this.__internal) {
            this.__validateOptions(optionRules);
        }
    };

    Object.assign(AbstractValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AbstractValidator#__setName
         * @description Set validator name
         * @param {String} name The validator name
         */
        __setName: function (name) {
            this.__name = name;
        },
        /**
         * @private
         * @function
         * @name abv.AbstractValidator#__setName
         * @description Get validator name
         * @returns {String} The validator name
         */
        __getName: function () {
            return this.__name;
        },

        /**
         * @function
         * @name abv.AbstractValidator#isValid
         * @description Check if data valid
         * @returns {Boolean} Validation status
         */
        isValid: function () {
            this.__beforeValidate();

            if (false === this.__hasMessages()) {
                this.__validate();
            }

            this.__afterValidate();

            return (false === this.__hasMessages()) ? true: false;
        },

        /**
         * @private
         * @function
         * @name abv.AbstractValidator#isValid
         * @description Check if data valid
         * @returns {Boolean} Validation status
         */
        __hasMessages: function () {
            return this.__error.has();
        },

        /**
         * @function
         * @name abv.AbstractValidator#messages
         * @description Return error messages
         * @returns {abv.Error} Error messages
         */
        messages: function () {
            return this.__error;
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
            this.__error.add(message, parameters);
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
                    throw new Error("[option:" + key + "]: " +  message);
                }
            }
        },

        /**
         * @private
         * @function
         * @name abv.AbstractValidator#__normalize
         * @description Normalize string data
         */
        __normalize: function () {
            if ('string' === typeof this.data) {
                this.data = this.data.trim();
            }
        }
    });

    return {
        AbstractValidator: AbstractValidator
    };
}()));
