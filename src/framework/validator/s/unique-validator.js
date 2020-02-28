Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.UniqueValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that all the elements of the given collection are <code>unique</code> (none of them is present more than once).</p>
     * <p>Elements are compared strictly, so '<code>7</code>' and <code>7</code> are considered different elements (a string and an integer, respectively).</p>
     * <p>It can be a <code>string</code> or <code>array</code>.</p>
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
     * <p>Defined aliases: ['<code>unique</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.UniqueValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.UniqueValidator#message
     * @type {String}
     * @description
     * <p>This is the message that will be shown if at least one element is repeated in the collection.</p>
     * <p>Default: "<code>This collection should contain only unique elements.</code>"</p>
     * <p>You can use the following parameters in this message:</p>
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td><code>%%value%%</code></td>
     *             <td>The repeated value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var UniqueValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This collection should contain only unique elements.';

        // Repeated elements
        this.__repeated = [];

        this.name = 'UniqueValidator';
    };
    UniqueValidator.prototype = Object.create(sogv.BaseValidator.prototype);
    UniqueValidator.prototype.constructor = UniqueValidator;

    Object.defineProperty(UniqueValidator.prototype, 'alias', {
        get: function () {
            return [
                'unique'
            ];
        }
    });

    Object.defineProperty(UniqueValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(UniqueValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.UniqueValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            if (
                true === sogv.isType('string', this.data)
                || true === sogv.isType('array', this.data)
            ) {
                this.__validateArray();
            }

            if (this.__repeated.length > 0) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.UniqueValidator#__validateArray
         * @description
         * <p>Validate array data.</p>
         */
        __validateArray: function () {
            var counter = {};

            for (var i = 0; i < this.data.length; i ++) {
                var key = (typeof this.data[i]) + " '" + this.data[i] + "'";
                if ('undefined' === typeof counter[key]) {
                    counter[key] = 0;
                }

                counter[key] ++;

                if (
                    false === this.__repeated.includes(key)
                    && counter[key] > 1
                ) {
                    this.__repeated.push(key);
                }
            }
        },

        /**
         * @private
         * @function
         * @name sogv.UniqueValidator#__beforeValidate
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
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"iterable"}', this.lang, true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.UniqueValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': JSON.stringify(this.__repeated)
            }
        }
    });

    return {
        UniqueValidator: UniqueValidator
    };
}());

sogv.registerValidator(sogv.UniqueValidator);