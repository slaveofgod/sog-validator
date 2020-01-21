Object.assign(abv, function () {
    'use strict';

    /**add
     * @constructor
     * @name abv.ValidatorHandler
     * @classdesc This service provides handling validation of form
     * @description Create a new validator handler.
     */

    var ValidatorHandler = function (options) {
        this.__validators = [];

        this.name = 'ValidatorHandler';
    };

    Object.assign(ValidatorHandler.prototype, {
        /**
         * @function
         * @name abv.ValidatorHandler#add
         * @description Add new validator for field
         * @param {String} key Field key
         * @param {abv.AllValidator} validator Validator
         */
        add: function (key, validator) {
            this.__validators.push({
                key: key,
                validator: validator
            });
        },

        /**
         * @function
         * @name abv.ValidatorHandler#get
         * @description Get validator for field
         * @param {String} key Field key
         * @returns {abv.AllValidator}
         */
        get: function (key) {
            for (var i = 0; i < this.__validators.length; i ++) {
                if (key === this.__validators[i].key) {
                    return this.__validators[i].validator;
                }
            }

            return null;
        },

        /**
         * @function
         * @name abv.ValidatorHandler#isValid
         * @description Check if data valid
         * @returns {Boolean} Validation status
         */
        isValid: function () {
            for (var i = 0; i < this.__validators.length; i ++) {
                if (false === this.__validators[i].validator.isValid()) {
                    return false;
                }
            }

            return true;
        },

        /**
         * @function
         * @name abv.ValidatorHandler#isValidWithErrorMessage
         * @description Check if data valid
         * @returns {Boolean} Validation status
         */
        isValidWithErrorMessage: function () {
            for (var i = 0; i < this.__validators.length; i ++) {
                if (false === this.__validators[i].validator.isValid()) {
                    return this.__validators[i].validator.errors().first();
                }
            }

            return null;
        },
    });

    return {
        ValidatorHandler: ValidatorHandler
    };
}());