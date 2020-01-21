Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AfterValidator
     * @extends abv.GreaterThanValidator
     * @classdesc
     * <p>The field under validation must be a value after a given date.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @example
     * var validator = new abv.AfterValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var AfterValidator = function (data, options) {
        abv.GreaterThanValidator.call(this, data, {
            message: "The %%attribute%% must be a date after %%date%%.",
            value: options.value
        }, {
            value: 'required|type:{"type":["date","date-string"],"any":true}'
        });

        this.name = 'AfterValidator';
    };
    AfterValidator.prototype = Object.create(abv.GreaterThanValidator.prototype);
    AfterValidator.prototype.constructor = AfterValidator;

    Object.defineProperty(AfterValidator.prototype, 'alias', {
        get: function () {
            return 'after';
        }
    });

    Object.defineProperty(AfterValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'date'
                }
            ];
        }
    });

    Object.assign(AfterValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AfterValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'date': this.data
            }
        }
    });

    return {
        AfterValidator: AfterValidator
    };
}());

abv.registry(abv.AfterValidator);