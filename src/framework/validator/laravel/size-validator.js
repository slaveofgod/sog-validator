Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.SizeValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must have a size matching the given value.</p>
     * <p>For <code>string</code> data, value corresponds to the number of characters.</p>
     * <p>For <code>numeric</code> data, value corresponds to a given integer value.</p>
     * <p>For an <code>array</code>, size corresponds to the count of the array.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.SizeValidator(data, {min: 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.SizeValidator#value
     * @type {Integer}
     * @description
     * <p>This option is required.</p>
     * <p>It defines the value to compare to.</p>
     */

    var SizeValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, {
            value: optionRules.max || 'required|type:{"type":"numeric"}',
            message: optionRules.minMessage || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.value = this.__options.value;
        this.numericMessage = 'The %%attribute%% must be %%size%%.';
        this.stringMessage = 'The %%attribute%% must be %%size%% characters.';
        this.arrayMessage = 'The %%attribute%% must contain %%size%% items.';

        this.name = 'SizeValidator';
    };
    SizeValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    SizeValidator.prototype.constructor = SizeValidator;

    Object.defineProperty(SizeValidator.prototype, 'alias', {
        get: function () {
            return 'size';
        }
    });

    Object.defineProperty(SizeValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'integer'
                }
            ];
        }
    });

    Object.assign(SizeValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.SizeValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (true === abv.isType('numeric', this.data)) {
                if (this.data !== this.value) {
                    this.__setErrorMessage(this.numericMessage, this.__numericMessageParameters());
                    return ;
                }
            } else if (true === abv.isType('string', this.data)) {
                if (this.data.length !== this.value) {
                    this.__setErrorMessage(this.stringMessage, this.__stringMessageParameters());
                    return ;
                }
            } else if (true === abv.isType('array', this.data)) {
                if (this.data.length !== this.value) {
                    this.__setErrorMessage(this.arrayMessage, this.__arrayMessageParameters());
                    return;
                }
            }
        },

        /**
         * @private
         * @function
         * @name abv.SizeValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is valid type
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":["string","numeric","array"],"any":true}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return;
            }
        },

        /**
         * @private
         * @function
         * @name abv.SizeValidator#__numericMessageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __numericMessageParameters: function () {
            return {
                'attribute': 'value',
                'size': this.value
            }
        },

        /**
         * @private
         * @function
         * @name abv.SizeValidator#__stringMessageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __stringMessageParameters: function () {
            return {
                'attribute': 'value',
                'size': this.value
            }
        },

        /**
         * @private
         * @function
         * @name abv.SizeValidator#__arrayMessageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __arrayMessageParameters: function () {
            return {
                'attribute': 'value',
                'size': this.value
            }
        }
    });

    return {
        SizeValidator: SizeValidator
    };
}());

abv.registry(abv.SizeValidator);