Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.BetweenValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must have a size between the given min and max.</p>
     * <p>Strings, numerics, arrays and dates are evaluated in the same fashion as the size rule.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.BetweenValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var BetweenValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, {
            max: optionRules.max || 'required|type:{"type":["numeric","date-string"],"any":true}',
            min: optionRules.min || 'required|type:{"type":["numeric","date-string"],"any":true}',
        }, lang, internal);

        this.max = this.__options.max;
        this.min = this.__options.min;
        this.dateMessage = 'The %%attribute%% must be between %%min%% and %%max%% date.';
        this.numericMessage = 'The %%attribute%% must be between %%min%% and %%max%%.';
        this.stringMessage = 'The %%attribute%% must be between %%min%% and %%max%% characters.';
        this.arrayMessage = 'The %%attribute%% must have between %%min%% and %%max%% items.';

        this.name = 'BetweenValidator';
    };
    BetweenValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    BetweenValidator.prototype.constructor = BetweenValidator;

    Object.defineProperty(BetweenValidator.prototype, 'alias', {
        get: function () {
            return 'between';
        }
    });

    Object.defineProperty(BetweenValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'max',
                    'type': 'numeric|date-string'
                }, {
                    'name': 'min',
                    'type': 'numeric|date-string'
                }
            ];
        }
    });

    Object.assign(BetweenValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.BetweenValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (true === abv.isType('numeric', this.min)) {
                if (true === abv.isType('numeric', this.data)) {
                    this.__validateNumeric();
                } else if (true === abv.isType('array', this.data)) {
                    this.__validateArray();
                } else if (true === abv.isType('string', this.data)) {
                    this.__validateString();
                } else {
                    this.__setErrorMessage('Data type ' + typeof this.data + ' does not supported');
                    return ;
                }
            } else if (
                true === abv.isType('date-string', this.min)
                || true === abv.isType('datetime', this.min)
            ) {
                this.__validateDateTime();
            }
        },

        /**
         * @private
         * @function
         * @name abv.BetweenValidator#__validateNumeric
         * @description Validate numeric
         */
        __validateNumeric: function () {
            var status = abv.isValid(this.data, {
                'range': {
                    'min': this.min,
                    'max': this.max
                }
            });

            if (false === status) {
                this.__setErrorMessage(this.numericMessage, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.BetweenValidator#__validateDateTime
         * @description Validate date time
         */
        __validateDateTime: function () {
            var status = abv.isValid(this.data, {
                'range': {
                    'min': this.min,
                    'max': this.max
                }
            });

            if (false === status) {
                this.__setErrorMessage(this.dateMessage, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.BetweenValidator#__validateArray
         * @description Validate array
         */
        __validateArray: function () {
            var status = abv.isValid(this.data, {
                'count': {
                    'min': this.min,
                    'max': this.max
                }
            });

            if (false === status) {
                this.__setErrorMessage(this.arrayMessage, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.BetweenValidator#__validateString
         * @description Validate array
         */
        __validateString: function () {
            var status = abv.isValid(this.data, {
                'length': {
                    'min': this.min,
                    'max': this.max
                }
            });

            if (false === status) {
                this.__setErrorMessage(this.stringMessage, this.__messageParameters());
                return ;
            }
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
        },

        /**
         * @private
         * @function
         * @name abv.BetweenValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'max': this.max,
                'min': this.min
            }
        }
    });

    return {
        BetweenValidator: BetweenValidator
    };
}());

abv.registry(abv.BetweenValidator);