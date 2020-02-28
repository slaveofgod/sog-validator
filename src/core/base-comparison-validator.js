Object.assign(sogv, function () {
    'use strict';

    /**
     * @abstract
     * @constructor
     * @name sogv.BaseComparisonValidator
     * @extends sogv.BaseValidator
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

    var BaseComparisonValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseValidator.call(this, data, options, optionRules, lang, internal);

        this.value = this.__options.value;

        this.name = 'BaseComparisonValidator';
    };
    BaseComparisonValidator.prototype = Object.create(sogv.BaseValidator.prototype);
    BaseComparisonValidator.prototype.constructor = BaseComparisonValidator;

    Object.assign(BaseComparisonValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.BaseComparisonValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            // Cancel validation if data is empty
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
         * @name sogv.BaseComparisonValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Cancel validation if data is empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }
        }
    });

    return {
        BaseComparisonValidator: BaseComparisonValidator
    };
}());