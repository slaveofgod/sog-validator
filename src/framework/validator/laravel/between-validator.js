Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.BetweenValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must have a <code>size</code> between the given <code>min</code> and <code>max</code>.</p>
     * <p><code>Strings</code>, <code>numerics</code>, <code>arrays</code> and <code>dates</code> are evaluated in the same fashion as the size rule.</p>
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
     * <p>Defined aliases: ['<code>between</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.BetweenValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var BetweenValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
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
    BetweenValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    BetweenValidator.prototype.constructor = BetweenValidator;

    Object.defineProperty(BetweenValidator.prototype, 'alias', {
        get: function () {
            return [
                'between'
            ];
        }
    });

    Object.defineProperty(BetweenValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'min',
                    'type': 'scalar|date-string'
                }, {
                    'name': 'max',
                    'type': 'scalar|date-string'
                }
            ];
        }
    });

    Object.assign(BetweenValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.BetweenValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (true === sogv.isType('numeric', this.min)) {
                if (true === sogv.isType('numeric', this.data)) {
                    this.__validateNumeric();
                } else if (true === sogv.isType('array', this.data)) {
                    this.__validateArray();
                } else if (true === sogv.isType('string', this.data)) {
                    this.__validateString();
                } else {
                    this.__setErrorMessage('Data type ' + typeof this.data + ' does not supported');
                    return ;
                }
            } else if (
                true === sogv.isType('date-string', this.min)
                || true === sogv.isType('datetime', this.min)
            ) {
                this.__validateDateTime();
            }
        },

        /**
         * @private
         * @function
         * @name sogv.BetweenValidator#__validateNumeric
         * @description Validate numeric
         */
        __validateNumeric: function () {
            var status = sogv.isValid(this.data, {
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
         * @name sogv.BetweenValidator#__validateDateTime
         * @description Validate date time
         */
        __validateDateTime: function () {
            var status = sogv.isValid(this.data, {
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
         * @name sogv.BetweenValidator#__validateArray
         * @description Validate array
         */
        __validateArray: function () {
            var status = sogv.isValid(this.data, {
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
         * @name sogv.BetweenValidator#__validateString
         * @description Validate array
         */
        __validateString: function () {
            var status = sogv.isValid(this.data, {
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
        },

        /**
         * @private
         * @function
         * @name sogv.BetweenValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
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

sogv.registry(sogv.BetweenValidator);