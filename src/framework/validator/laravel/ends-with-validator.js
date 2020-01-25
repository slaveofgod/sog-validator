Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.EndsWithValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must end with one of the given values.</p>
     * @description
     * <p>Create a new Validator.</p>
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
     * <p>The option is required.</p>
     * <p>The list of ends.</p>
     * <p>One of the "<code>end</code>" needs to be the end of the passed value.</p>
     */

    var EndsWithValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, {
            pattern: optionRules.pattern || 'length:{"min":3,"max":255}',
            ends: optionRules.ends || 'type:{"type":["iterable","string"],"any":true}'
        }, lang, internal);

        this.message = this.__options.message || 'The %%attribute%% must end with one of the following: %%values%%.';
        this.ends = this.__options.ends;

        this.name = 'EndsWithValidator';
    };
    EndsWithValidator.prototype = Object.create(abv.AbstractValidator.prototype);
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
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            for (var i = 0; i < this.ends.length; i ++) {
                if(true === this.data.endsWith(this.ends[i])) {
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
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            // Convert data to string
            try {
                if ('undefined' !== typeof this.data) {
                    this.data = this.data.toString();
                }
            } catch (e) {
                this.__setErrorMessage('This value ' + this.data + ' could not be converted to string.');
                return ;
            }

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