Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.CountValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a given collection's (i.e. an array or an object that implements Countable) element <code>count</code> is <code>between</code> some <code>minimum</code> and <code>maximum</code> value.</p>
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
     * <p>Defined aliases: ['<code>count</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.CountValidator(data, {"min": 10, "max": 20});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.CountValidator#exactMessage
     * @type {String}
     * @description
     * <p>The message that will be shown if min and max values are equal and the underlying collection elements count is not exactly this value.</p>
     * <p>Default: "<code>This collection should contain exactly %%limit%% elements.</code>"</p>
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
     *             <td><code>%%count%%</code></td>
     *             <td>The current collection size</td>
     *         </tr>
     *         <tr>
     *             <td><code>%%limit%%</code></td>
     *             <td>The exact expected collection size</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name sogv.CountValidator#max
     * @type {Integer}
     * @description
     * <p>This option is the "<code>max</code>" count value. Validation will fail if the given collection elements count is greater than this max value.</p>
     * <p>This option is required when the min option is not defined.</p>
     */

    /**
     * @name sogv.CountValidator#maxMessage
     * @type {String}
     * @description
     * <p>The message that will be shown if the underlying collection elements count is more than the max option.</p>
     * <p>Default: "<code>This collection should contain %%limit%% elements or less.</code>"</p>
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
     *             <td><code>%%count%%</code></td>
     *             <td>The current collection size</td>
     *         </tr>
     *         <tr>
     *             <td><code>%%limit%%</code></td>
     *             <td>The upper limit</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name sogv.CountValidator#min
     * @type {Integer}
     * @description
     * <p>This option is the "<code>min</code>" count value. Validation will fail if the given collection elements count is less than this min value.</p>
     * <p>This option is required when the max option is not defined.</p>
     */

    /**
     * @name sogv.CountValidator#minMessage
     * @type {String}
     * @description
     * <p>The message that will be shown if the underlying collection elements count is less than the min option.</p>
     * <p>Default: "<code>This collection should contain %%limit%% elements or more.</code>"</p>
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
     *             <td><code>%%count%%</code></td>
     *             <td>The current collection size</td>
     *         </tr>
     *         <tr>
     *             <td><code>%%limit%%</code></td>
     *             <td>The lower limit</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var CountValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseValidator.call(this, data, options, {
            exactMessage: optionRules.exactMessage || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            max: optionRules.max || 'type:{"type":"numeric"}',
            maxMessage: optionRules.maxMessage || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            min: optionRules.min || 'type:{"type":"numeric"}',
            minMessage: optionRules.minMessage || 'type:{"type":"string"}|length:{"min":3,"max":255}',
        }, lang, internal);

        this.exactMessage = this.__options.exactMessage || 'This collection should contain exactly %%limit%% elements.';
        this.max = this.__options.max || null;
        this.maxMessage = this.__options.maxMessage || 'This collection should contain %%limit%% elements or less.';
        this.min = this.__options.min || null;
        this.minMessage = this.__options.minMessage || 'This collection should contain %%limit%% elements or more.';

        this.name = 'CountValidator';
    };
    CountValidator.prototype = Object.create(sogv.BaseValidator.prototype);
    CountValidator.prototype.constructor = CountValidator;

    Object.defineProperty(CountValidator.prototype, 'alias', {
        get: function () {
            return [
                'count'
            ];
        }
    });

    Object.defineProperty(CountValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'min',
                    'type': 'numeric'
                }, {
                    'name': 'max',
                    'type': 'numeric'
                },
            ];
        }
    });

    Object.assign(CountValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.IsTrueValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            var count = this.data.length;

            var __message;
            var __messageParameters;

            if (null !== this.max && count > this.max) {
                __message = (this.min == this.max) ? this.exactMessage : this.maxMessage;
                __messageParameters = (this.min == this.max) ? this.__exactMessageParameters() : this.__maxMessageParameters();
                this.__setErrorMessage(__message, __messageParameters);
                return ;
            }

            if (null !== this.min && count < this.min) {
                __message = (this.min == this.max) ? this.exactMessage : this.minMessage;
                __messageParameters = (this.min == this.max) ? this.__exactMessageParameters() : this.__minMessageParameters();
                this.__setErrorMessage(__message, __messageParameters);
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.IpValidator#__beforeValidate
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

            if (null === this.min && null === this.max) {
                throw new Error('Either option "min" or "max" must be given');
            }
        },

        /**
         * @private
         * @function
         * @name sogv.IsTrueValidator#__minMessageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __minMessageParameters: function () {
            return {
                'count': this.data.length,
                'limit': this.min
            }
        },

        /**
         * @private
         * @function
         * @name sogv.IsTrueValidator#__maxMessageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __maxMessageParameters: function () {
            return {
                'count': this.data.length,
                'limit': this.max
            }
        },

        /**
         * @private
         * @function
         * @name sogv.IsTrueValidator#__exactMessageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __exactMessageParameters: function () {
            return {
                'count': this.data.length,
                'limit': this.max
            }
        },

        /**
         * @private
         * @function
         * @name sogv.IsTrueValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': this.data
            }
        }
    });

    return {
        CountValidator: CountValidator
    };
}());

sogv.registerValidator(sogv.CountValidator);