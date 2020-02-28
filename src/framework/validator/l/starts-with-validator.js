Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.StartsWithValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must start with one of the given values.</p>
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
     * <p>Defined aliases: ['<code>starts_with</code>', '<code>starts-with</code>', '<code>starts</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.StartsWithValidator(data, {starts: ['abc','def']});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.StartsWithValidator#starts
     * @type {String|Array}
     * @description
     * <p>The option is required.</p>
     * <p>The list of starts.</p>
     * <p>One of the "<code>start</code>" needs to be the end of the passed value.</p>
     */

    var StartsWithValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseValidator.call(this, data, options, {
            pattern: optionRules.pattern || 'length:{"min":3,"max":255}',
            starts: optionRules.starts || 'type:{"type":["iterable","string"],"any":true}'
        }, lang, internal);

        this.message = this.__options.message || 'The %%attribute%% must start with one of the following: %%values%%.';
        this.starts = this.__options.starts;

        this.name = 'StartsWithValidator';
    };
    StartsWithValidator.prototype = Object.create(sogv.BaseValidator.prototype);
    StartsWithValidator.prototype.constructor = StartsWithValidator;

    Object.defineProperty(StartsWithValidator.prototype, 'alias', {
        get: function () {
            return [
                'starts_with',
                'starts-with',
                'starts'
            ];
        }
    });

    Object.defineProperty(StartsWithValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'starts',
                    'type': 'array'
                }
            ];
        }
    });

    Object.assign(StartsWithValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.StartsWithValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            for (var i = 0; i < this.starts.length; i ++) {
                if(true === this.data.startsWith(this.starts[i])) {
                    return ;
                }
            }

            this.__setErrorMessage(this.message, this.__messageParameters());
            return ;
        },

        /**
         * @private
         * @function
         * @name sogv.StartsWithValidator#__beforeValidate
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

            if (true === sogv.isType('string', this.starts)) {
                this.starts = [this.starts];
            }
        },

        /**
         * @private
         * @function
         * @name sogv.StartsWithValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'values': JSON.stringify(this.starts)
            }
        }
    });

    return {
        StartsWithValidator: StartsWithValidator
    };
}());

sogv.registerValidator(sogv.StartsWithValidator);