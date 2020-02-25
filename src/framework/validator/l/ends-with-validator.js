Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.EndsWithValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must end with one of the given values.</p>
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
     * <p>Defined aliases: ['<code>ends_with</code>', '<code>ends-with</code>', '<code>ends</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.EndsWithValidator(data, {ends: ['abc','def']});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.EndsWithValidator#ends
     * @type {String|Array}
     * @description
     * <p>The option is required.</p>
     * <p>The list of ends.</p>
     * <p>One of the "<code>end</code>" needs to be the end of the passed value.</p>
     */

    var EndsWithValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            pattern: optionRules.pattern || 'length:{"min":3,"max":255}',
            ends: optionRules.ends || 'type:{"type":["iterable","string"],"any":true}'
        }, lang, internal);

        this.message = this.__options.message || 'The %%attribute%% must end with one of the following: %%values%%.';
        this.ends = this.__options.ends;

        this.name = 'EndsWithValidator';
    };
    EndsWithValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    EndsWithValidator.prototype.constructor = EndsWithValidator;

    Object.defineProperty(EndsWithValidator.prototype, 'alias', {
        get: function () {
            return [
                'ends_with',
                'ends-with',
                'ends'
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
         * @name sogv.EndsWithValidator#__validate
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
         * @name sogv.EndsWithValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Cancel validation if data is empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', this.lang, true);
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

            if (true === sogv.isType('string', this.ends)) {
                this.ends = [this.ends];
            }
        },

        /**
         * @private
         * @function
         * @name sogv.EndsWithValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
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

sogv.registerValidator(sogv.EndsWithValidator);