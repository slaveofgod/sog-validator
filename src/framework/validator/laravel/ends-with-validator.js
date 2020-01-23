Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.EndsWithValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must end with one of the given values.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.EndsWithValidator(data, {ends: ['abc','def']});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.EndsWithValidator#ends
     * @type {String|Array}
     * @description
     * <p>The option is required. The list of ends. One of the "end" needs to be the end of the passed value.</p>
     */

    var EndsWithValidator = function (data, options, optionRules, lang, internal) {
        abv.RegexValidator.call(this, data, options, {
            pattern: optionRules.pattern || 'length:{"min":3,"max":255}',
            ends: optionRules.ends || 'type:{"type":["iterable","string"],"any":true}'
        }, lang, internal);

        this.message = this.__options.message || 'The %%attribute%% must end with one of the following: %%values%%.';
        this.ends = this.__options.ends;
        this.pattern;
        this.patternSample = "^.*%s$";

        this.name = 'EndsWithValidator';
    };
    EndsWithValidator.prototype = Object.create(abv.RegexValidator.prototype);
    EndsWithValidator.prototype.constructor = EndsWithValidator;

    Object.defineProperty(EndsWithValidator.prototype, 'alias', {
        get: function () {
            return [
                'ends_with',
                'ends-with'
            ];
        }
    });

    Object.defineProperty(EndsWithValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'ends',
                    'type': 'array'
                }
            ];
        }
    });

    Object.assign(EndsWithValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.EndsWithValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            for (var i = 0; i < this.ends.length; i ++) {
                this.pattern = abv.sprintf(this.patternSample, this.ends[i]);
                abv.RegexValidator.prototype.__validate.call(this);
                if(false === this.__hasErrors()) {
                    return ;
                }
            }

            this.__setErrorMessage(this.message, this.__messageParameters());
            return ;
        },

        /**
         * @private
         * @function
         * @name abv.EndsWithValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            abv.RegexValidator.prototype.__beforeValidate.call(this);

            if (true === abv.isType('string', this.ends)) {
                this.ends = [this.ends];
            }
        },

        /**
         * @private
         * @function
         * @name abv.EndsWithValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'values': JSON.stringify(this.ends)
            }
        }
    });

    return {
        EndsWithValidator: EndsWithValidator
    };
}());

abv.registry(abv.EndsWithValidator);