Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AcceptedValidator
     * @extends abv.ChoiceValidator
     * @classdesc
     * <p>The field under validation must be yes, on, 1, or true.</p>
     * <p>This is useful for validating "Terms of Service" acceptance.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @example
     * var validator = new abv.AcceptedValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var AcceptedValidator = function (data) {
        abv.ChoiceValidator.call(this, data, {
            choices: ['yes', 'on', 1, true, '1', 'true'],
            message: "The %%attribute%% must be accepted."
        }, {});

        this.name = 'AcceptedValidator';
    };
    AcceptedValidator.prototype = Object.create(abv.ChoiceValidator.prototype);
    AcceptedValidator.prototype.constructor = AcceptedValidator;

    Object.defineProperty(AcceptedValidator.prototype, 'alias', {
        get: function () {
            return 'accepted';
        }
    });

    Object.defineProperty(AcceptedValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(AcceptedValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AcceptedValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'field'
            }
        }
    });

    return {
        AcceptedValidator: AcceptedValidator
    };
}());

abv.registry(abv.AcceptedValidator);