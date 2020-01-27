Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.LteValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be <code>less</code> than or <code>equal</code> to the given field.</p>
     * <p><code>Strings</code>, <code>numerics</code>, <code>arrays</code>, and <code>dates</code> are evaluated using the same conventions as the size rule.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.LteValidator(data, {"value": 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.LteValidator#value
     * @type {*}
     * @description
     * <p>This option is required.</p>
     * <p>It defines the value to compare to.</p>
     * <p>The data type could be <code>string</code>, <code>number</code>, <code>array</code> or <code>date</code>.<p>
     */

    var LteValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, {
            value: optionRules.value || 'required|type:{"type":["numeric","datetime","date-string","boolean"],"any":true}',
        }, lang, internal);

        this.value = this.__options.value;
        this.dateMessage = 'The %%attribute%% must be less than or equal %%value%% date.';
        this.numericMessage = 'The %%attribute%% must be less than or equal %%value%%.';
        this.stringMessage = 'The %%attribute%% must be less than or equal %%value%% characters.';
        this.arrayMessage = 'The %%attribute%% must not have more than %%value%% items.';

        this.name = 'LteValidator';
    };
    LteValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    LteValidator.prototype.constructor = LteValidator;

    Object.defineProperty(LteValidator.prototype, 'alias', {
        get: function () {
            return 'lte';
        }
    });

    Object.defineProperty(LteValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'boolean|string|numeric|array|datetime'
                }
            ];
        }
    });

    Object.assign(LteValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.LteValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (
                true === abv.isType('integer', this.value)
                && (
                    true === abv.isType('array', this.data)
                    || true === abv.isType('string', this.data)
                )
            ) {
                if (this.data.length >= this.value) {
                    this.__setErrorMessage((true === abv.isType('string', this.data)) ? this.stringMessage : this.arrayMessage, this.__messageParameters());
                    return;
                }
            } else {
                if (false === abv.isValid(this.data, {
                    'less-than-or-equal': {
                        "value": this.value
                    }
                }, true)) {
                    var __message = this.dateMessage;
                    if (
                        true === abv.isType('numeric', this.value)
                        || true === abv.isType('boolean', this.value)
                    ) {
                        __message = this.numericMessage;
                    }

                    this.__setErrorMessage(__message, this.__messageParameters());
                    return;
                }
            }
        },

        /**
         * @private
         * @function
         * @name abv.LteValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running</p>
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.LteValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'value': this.__formattedData(this.value)
            }
        },
    });

    return {
        LteValidator: LteValidator
    };
}());

abv.registry(abv.LteValidator);