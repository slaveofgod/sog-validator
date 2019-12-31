Object.assign(abv, (function () {
    'use strict';

    /**
     * @private
     * @constructor
     * @name abv.ValidatorAbstract
     * @classdesc Abstract base class that implements functionality for validation.
     * @description Create a new validation extension.
     */
    var ValidatorAbstract = function () {
        this.__errorMessage = null;
    };

    Object.assign(ValidatorAbstract.prototype, {
        /**
         * @private
         * @function
         * @name abv.ValidatorAbstract#prepareMessage
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
         * @name abv.ValidatorAbstract#isValid
         * @description Check if data valid
         * @returns {Boolean} Validation status
         */
        isValid: function () {
            this.checkRequirements();

            this.validate();

            return (null === this.__errorMessage) ? true: false;
        },

        /**
         * @function
         * @name abv.ValidatorAbstract#errorMessage
         * @description Return error message
         * @returns {String} Error message
         */
        errorMessage: function () {
            return this.__errorMessage;
        },

        /**
         * @private
         * @function
         * @name abv.ValidatorAbstract#__setErrorMessage
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
         * @name abv.ValidatorAbstract#checkRequirements
         * @description Checking if all required parameters is passed
         */
        checkRequirements: function () {}
    });

    return {
        ValidatorAbstract: ValidatorAbstract
    };
}()));
