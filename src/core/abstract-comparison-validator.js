Object.assign(abv, function () {
    'use strict';

    /**
     * @abstract
     * @constructor
     * @name abv.AbstractComparisonValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * Abstract base class that implements functionality for validation.
     * Provides a base class for the validation of property comparisons.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     */

    // PROPERTIES

    var AbstractComparisonValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, optionRules, lang, internal);

        this.value = this.__options.value;
    };
    AbstractComparisonValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    AbstractComparisonValidator.prototype.constructor = AbstractComparisonValidator;

    Object.assign(AbstractComparisonValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AbstractComparisonValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            // Check if empty
            if ('undefined' === typeof this.data || null === this.data || '' === this.data) {
                return ;
            }

            if (false === this.__compareValues(
                this.__prepareDataForComparing(this.__convertDataToValueType()),
                this.__prepareDataForComparing(this.value)
            )) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.AbstractComparisonValidator#__prepareDataForComparing
         * @description Prepare data for comparing
         * @returns {*}
         */
        __prepareDataForComparing: function (data) {
            switch (abv.getType(data)) {
                case 'Date':
                    return data.getTime();
                    break;
                case 'Object':
                case 'Array':
                    return JSON.stringify(data);
                    break;
            }

            return data;
        },

        /**
         * @private
         * @function
         * @name abv.AbstractComparisonValidator#__convertDataToValueType
         * @description Convert data to value type
         * @returns {*}
         */
        __convertDataToValueType: function () {
            if (abv.getType(this.data) === abv.getType(this.value)) {
                return this.data;
            }

            switch (abv.getType(this.value)) {
                case 'Date':
                    return new Date(this.data);
                    break;
            }

            return this.data;
        }
    });

    return {
        AbstractComparisonValidator: AbstractComparisonValidator
    };
}());