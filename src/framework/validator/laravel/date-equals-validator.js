Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.DateEqualsValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be <code>equal</code> to the given <code>date</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>date_equals</code>', '<code>date-equals</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DateEqualsValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var DateEqualsValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractComparisonValidator.call(this, data, options, {
            value: optionRules.value || 'required|type:{"type":["date-string","datetime"],"any":true}'
        }, lang, internal);

        this.message = 'The %%attribute%% must be a date equal to %%date%%.';

        this.name = 'DateEqualsValidator';
    };
    DateEqualsValidator.prototype = Object.create(sogv.AbstractComparisonValidator.prototype);
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
         * @name sogv.DateEqualsValidator#__compareValues
         * @description
         * <p>Compare two value.</p>
         * @param {*} value The value.
         * @param {*} comparedValue Compared value.
         * @returns {Boolean}
         */
        __compareValues: function(value, comparedValue) {
            return (value == comparedValue);
        },

        /**
         * @private
         * @function
         * @name sogv.BetweenValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is datetime
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":["datetime","date-string"],"any":true}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.DateEqualsValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
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

sogv.registry(sogv.DateEqualsValidator);