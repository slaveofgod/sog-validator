Object.assign(sogv, (function () {
    'use strict';

    /**
     * @abstract
     * @constructor
     * @name sogv.AbstractValidator
     * @classdesc Abstract base class that implements functionality for validation.
     * @description Create a new validation extension.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options
     * @param {String} lang Language of error messages.
     * @param {Boolean} lang Language of error messages.
     * @constructor
     */

    // PROPERTIES

    /**
     * @name sogv.RegexValidator#data
     * @type {*}
     * @description Data that needs to be validated.
     */

    /**
     * @name sogv.RegexValidator#lang
     * @type {String}
     * @description Language of error messages.
     */

    var AbstractValidator = function (data, options, optionRules, lang, internal) {

        var __data = data;

        this.data = __data;
        this.lang = lang || 'en';

        this.__options = options || {};
        this.__errorService = new sogv.ErrorHandler({"lang": lang, "internal": internal});
        this.__internal = (true === internal);
        this.__moment = sogv.moment;
        this.__name = null;
        this.__skip = false; // Skip validation (do not validate this value)

        // ensure setup of localization variables takes place
        this.__moment.locale(this.lang);
        sogv.setlocale('LC_ALL', this.lang);

        if (false === this.__internal) {
            this.__validateOptions(optionRules);
        }

        this.name = 'AbstractValidator';
        this.base = 'AbstractValidator';
    };

    Object.assign(AbstractValidator.prototype, {
        /**
         * @function
         * @name sogv.AbstractValidator#isValid
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
         * @name sogv.AbstractValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            throw new Error('The validator has to implement "__validate" method');
        },

        /**
         * @private
         * @function
         * @name sogv.AbstractValidator#isValid
         * @description Check if data valid
         * @returns {Boolean} Validation status
         */
        __hasErrors: function () {
            return this.__errorService.has();
        },

        /**
         * @function
         * @name sogv.AbstractValidator#errors
         * @description Return error errors
         * @returns {sogv.Error} Error messages
         */
        errors: function () {
            return this.__errorService;
        },

        /**
         * @private
         * @function
         * @name sogv.AbstractValidator#__setErrorMessage
         * @param {String} message Error message text
         * @param {Object} parameters Error message parameters
         * @description Set error message
         */
        __setErrorMessage: function (message, parameters) {
            this.__errorService.add(message, parameters);
        },

        /**
         * @private
         * @function
         * @name sogv.AbstractValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {},

        /**
         * @private
         * @function
         * @name sogv.AbstractValidator#__afterValidate
         * @description Execute after validation is complete
         */
        __afterValidate: function () {},

        /**
         * @private
         * @function
         * @name sogv.AbstractValidator#__validateOptions
         * @description Validate options
         * @param {Object} rules Validation rules
         */
        __validateOptions: function (rules) {
            if ('undefined' === typeof rules || null === rules) {
                return ;
            }

            for (var key in rules) {
                if (!rules.hasOwnProperty(key)) continue;

                var message = sogv.isValidWithErrorMessage(this.__options[key], rules[key], true);
                if (null !== message) {
                    throw new Error("[option:" + key + "]: " +  message);
                }
            }
        },

        /**
         * @private
         * @function
         * @name sogv.AbstractValidator#__normalize
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
         * @name sogv.AbstractValidator#__isEmptyData
         * @returns {Boolean} Status
         * @description Checking, if data empty
         */
        __isEmptyData: function () {
            return ('undefined' === typeof this.data || null === this.data || '' === this.data);
        },

        /**
         * @private
         * @function
         * @name sogv.AbstractValidator#__formattedData
         * @description Formatted data depending of type
         * @returns {*}
         */
        __formattedData: function (data) {
            if (true === sogv.isType('numeric', data)) {
                return data;
            }

            if (true === sogv.isType('bool', data)) {
                return data;
            }

            if (true === sogv.isType('array', data)) {
                return JSON.stringify(data);
            }

            if (
                true === sogv.isType('object', data)
                && 'Date' !== sogv.getType(data)
            ) {
                return JSON.stringify(data);
            }

            if (true === this.__moment(data).isValid()) {
                return this.__moment(data).format('LLL');
            }

            return data;
        },

        /**
         * @private
         * @function
         * @name sogv.AbstractValidator#__convertDataToValueType
         * @description Convert data to value type
         * @returns {*}
         */
        __convertDataToValueType: function () {
            if (sogv.getType(this.data) === sogv.getType(this.value)) {
                return this.data;
            }

            switch (sogv.getType(this.value)) {
                case 'Date':
                    return new Date(this.data);
                    break;
            }

            return this.data;
        },

        /**
         * @private
         * @function
         * @name sogv.AbstractComparisonValidator#__prepareDataForComparing
         * @description Prepare data for comparing
         * @returns {*}
         */
        __prepareDataForComparing: function (data) {
            switch (sogv.getType(data)) {
                case 'Date':
                    return data.getTime();
                    break;
                case 'Object':
                case 'Array':
                    return JSON.stringify(data);
                    break;
            }

            if ('object' === typeof data) {
                try {
                    return JSON.stringify(data);
                } catch (e) {
                    return data;
                }
            }

            return data;
        }
    });

    return {
        AbstractValidator: AbstractValidator
    };
}()));
