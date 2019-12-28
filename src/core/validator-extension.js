Object.assign(abv, (function () {
    'use strict';

    /**
     * @private
     * @constructor
     * @name abv.ValidatorExtension
     * @classdesc Abstract base class that implements functionality for validation.
     * @description Create a new validation extension.
     */
    var ValidatorExtension = function () {

    };

    Object.assign(ValidatorExtension.prototype, {
        /**
         * @private
         * @function
         * @name abv.ValidatorExtension#prepareMessage
         * @description Prepare error message
         * @param {String} message Error message text
         * @param {Object} parameters Error message parameters
         * @returns {String} Processed message
         */
        prepareMessage: function (message, parameters) {
            parameters = parameters || {};

            for (var key in parameters) {
                if (!parameters.hasOwnProperty(key)) continue;

                message = message.replace("%%" + key + "%%", parameters[key]);
            }

            return message;
        },

        /**
         * @function
         * @name abv.ValidatorExtension#isValid
         * @description Check if data valid
         * @returns {Boolean} Validation status
         */
        isValid: function () {
            this.validate();

            return this.__isValid;
        },

        /**
         * @function
         * @name abv.ValidatorExtension#getErrorMessage
         * @description Return error message
         * @returns {String} Error message
         */
        getErrorMessage: function () {
            return this.__errorMessage;
        }
    });

    return {
        ValidatorExtension: ValidatorExtension
    };
}()));
