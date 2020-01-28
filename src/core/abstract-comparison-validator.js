Object.assign(sogv, function () {
    'use strict';

    /**
     * @abstract
     * @constructor
     * @name sogv.AbstractComparisonValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Abstract base class that implements functionality for validation.</p>
     * <p>Provides a base class for the validation of property comparisons.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     */

    // PROPERTIES

    var AbstractComparisonValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, optionRules, lang, internal);

        this.value = this.__options.value;

        this.name = 'AbstractComparisonValidator';
    };
    AbstractComparisonValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    AbstractComparisonValidator.prototype.constructor = AbstractComparisonValidator;

    Object.assign(AbstractComparisonValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.AbstractComparisonValidator#__validate
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
         * @name sogv.AbstractComparisonValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }
        }
    });

    return {
        AbstractComparisonValidator: AbstractComparisonValidator
    };
}());