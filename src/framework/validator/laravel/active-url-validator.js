Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.ActiveUrlValidator
     * @extends abv.UrlValidator
     * @classdesc
     * <p>The field under validation must have a valid A or AAAA record</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @example
     * var validator = new abv.ActiveUrlValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var ActiveUrlValidator = function (data) {
        abv.UrlValidator.call(this, data, {
            message: "The %%attribute%% is not a valid URL."
        }, {});

        this.name = 'ActiveUrlValidator';
    };
    ActiveUrlValidator.prototype = Object.create(abv.UrlValidator.prototype);
    ActiveUrlValidator.prototype.constructor = ActiveUrlValidator;

    Object.defineProperty(ActiveUrlValidator.prototype, 'alias', {
        get: function () {
            return [
                'active_url',
                'active-url'
            ];
        }
    });

    Object.defineProperty(ActiveUrlValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(ActiveUrlValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.ActiveUrlValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value'
            }
        }
    });

    return {
        ActiveUrlValidator: ActiveUrlValidator
    };
}());

abv.registry(abv.ActiveUrlValidator);