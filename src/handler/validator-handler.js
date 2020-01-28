Object.assign(sogv, function () {
    'use strict';

    /**add
     * @constructor
     * @name sogv.ValidatorHandler
     * @classdesc This service provides handling validation of form
     * @description
     * <p>Create a new validator handler.</p>
     */

    var ValidatorHandler = function (options) {
        this.__validators = [];

        this.name = 'ValidatorHandler';
    };

    Object.assign(ValidatorHandler.prototype, {
        /**
         * @function
         * @name sogv.ValidatorHandler#add
         * @description
         * <p>Add new validator for field.</p>
         * @param {String} key Field key
         * @param {sogv.AllValidator} validator Validator
         */
        add: function (key, validator) {
            this.__validators.push({
                key: key,
                validator: validator
            });
        },

        /**
         * @function
         * @name sogv.ValidatorHandler#get
         * @description
         * <p>Get validator for field.</p>
         * @param {String} key Field key
         * @returns {sogv.AllValidator}
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
         * @name sogv.ValidatorHandler#isValid
         * @description
         * <p>Check if data valid.</p>
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
         * @name sogv.ValidatorHandler#isValidWithErrorMessage
         * @description
         * <p>Check if data valid.</p>
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