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

        var __data = data;

        this.data = __data;
        this.lang = lang || 'en';

        this.__options = options || {};
        this.__error = new abv.ErrorCollection({"lang": lang});
        this.__internal = (true === internal);
        this.__moment = abv.moment;
        this.__name = null;
        this.__skip = false; // Skip validation (do not validate this value)

        // ensure setup of localization variables takes place
        this.__moment.locale(this.lang);
        abv.setlocale('LC_ALL', this.lang);

        if (false === this.__internal) {
            this.__validateOptions(optionRules);
        }

        this.name = 'AbstractValidator';
        this.base = 'AbstractValidator';
    };

    Object.assign(AbstractValidator.prototype, {
        /**
         * @function
         * @name abv.AbstractValidator#isValid
         * @description Check if data valid
         * @returns {Boolean} Validation status
         */
        isValid: function () {
            this.__beforeValidate();

            if (
                false === this.__hasErrors()
                && false === this.__skip
            ) {
                this.__validate();
            }

            this.__afterValidate();

            return (false === this.__hasErrors()) ? true: false;
        },

        /**
         * @private
         * @function
         * @name abv.AbstractValidator#isValid
         * @description Check if data valid
         * @returns {Boolean} Validation status
         */
        __hasErrors: function () {
            return this.__error.has();
        },

        /**
         * @function
         * @name abv.AbstractValidator#errors
         * @description Return error errors
         * @returns {abv.Error} Error messages
         */
        errors: function () {
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
        },

        /**
         * @private
         * @function
         * @name abv.AbstractValidator#__isEmptyData
         * @returns {Boolean} Status
         * @description Checking, if data empty
         */
        __isEmptyData: function () {
            return ('undefined' === typeof this.data || null === this.data || '' === this.data);
        }
    });

    return {
        AbstractValidator: AbstractValidator
    };
}()));
