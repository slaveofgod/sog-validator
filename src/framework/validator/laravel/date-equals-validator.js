Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.DateEqualsValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be <code>equal</code> to the given <code>date</code>.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.DateEqualsValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var DateEqualsValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options, {
            value: optionRules.value || 'required|type:{"type":["date-string","datetime"],"any":true}'
        }, lang, internal);

        this.message = 'The %%attribute%% must be a date equal to %%date%%.';

        this.name = 'DateEqualsValidator';
    };
    DateEqualsValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    DateEqualsValidator.prototype.constructor = DateEqualsValidator;

    Object.defineProperty(DateEqualsValidator.prototype, 'alias', {
        get: function () {
            return [
                'date_equals',
                'date-equals'
            ];
        }
    });

    Object.defineProperty(DateEqualsValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(DateEqualsValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.DateEqualsValidator#__compareValues
         * @description Compare two value
         * @param {*} value Value
         * @param {*} comparedValue Compared value
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            return (value == comparedValue);
        },

        /**
         * @private
         * @function
         * @name abv.BetweenValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is datetime
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":["datetime","date-string"],"any":true}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.DateEqualsValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'date': this.__moment(this.data).format('LLL')
            }
        }
    });

    return {
        DateEqualsValidator: DateEqualsValidator
    };
}());

abv.registry(abv.DateEqualsValidator);