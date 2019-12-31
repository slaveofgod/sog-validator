Object.assign(abv, (function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AbstractValidator
     * @classdesc Abstract base class that implements functionality for validation.
     * @description Create a new validation extension.
     */
    var AbstractValidator = function () {
        this.__errorMessage = null;
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
            this.validate();
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
        __afterValidate: function () {}
    });

    return {
        AbstractValidator: AbstractValidator
    };
}()));
