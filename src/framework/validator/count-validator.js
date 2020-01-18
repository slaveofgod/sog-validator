Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.CountValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc Validates that a given collection's (i.e. an array or an object that implements Countable) element count is between some minimum and maximum value.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.CountValidator(data, {"min": 10, "max": 20});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.CountValidator#exactMessage
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
     * @name abv.CountValidator#max
     * @type {Integer}
     * @description
     * <p>This option is the "max" count value. Validation will fail if the given collection elements count is greater than this max value.</p>
     * <p>This option is required when the min option is not defined.<.p>
     */

    /**
     * @name abv.CountValidator#maxMessage
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
     * @name abv.CountValidator#min
     * @type {Integer}
     * @description
     * <p>This option is the "min" count value. Validation will fail if the given collection elements count is less than this min value.</p>
     * <p>This option is required when the max option is not defined.</p>
     */

    /**
     * @name abv.CountValidator#minMessage
     * @type {String}
     * @description
     * The message that will be shown if the underlying collection elements count is less than the min option.</p>
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

    var CountValidator = function (data, options, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options,{
            exactMessage: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            max: 'type:{"type":"numeric"}',
            maxMessage: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            min: 'type:{"type":"numeric"}',
            minMessage: 'type:{"type":"string"}|length:{"min":3,"max":255}',
        }, lang, internal);

        this.exactMessage = this.__options.exactMessage || 'This collection should contain exactly %%limit%% elements.';
        this.max = this.__options.max || null;
        this.maxMessage = this.__options.maxMessage || 'This collection should contain %%limit%% elements or less.';
        this.min = this.__options.min || null;
        this.minMessage = this.__options.minMessage || 'This collection should contain %%limit%% elements or more.';

        this.name = 'CountValidator';
    };
    CountValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    CountValidator.prototype.constructor = CountValidator;

    Object.defineProperty(CountValidator.prototype, 'alias', {
        get: function () {
            return 'count';
        }
    });

    Object.assign(CountValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IsTrueValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            var count = this.data.length;

            if (null !== this.max && count > this.max) {
                var __message = (this.min == this.max) ? this.exactMessage : this.maxMessage;
                var __messageParameters = (this.min == this.max) ? this.__exactMessageParameters() : this.__maxMessageParameters();
                this.__setErrorMessage(__message, __messageParameters);
                return ;
            }

            if (null !== this.min && count < this.min) {
                var __message = (this.min == this.max) ? this.exactMessage : this.maxMessage;
                var __messageParameters = (this.min == this.max) ? this.__exactMessageParameters() : this.__minMessageParameters();
                this.__setErrorMessage(__message, __messageParameters);
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.IpValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"iterable"}', true);
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
         * @name abv.IsTrueValidator#__minMessageParameters
         * @description Returned parameters for error message which needs to be replaced
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
         * @name abv.IsTrueValidator#__maxMessageParameters
         * @description Returned parameters for error message which needs to be replaced
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
         * @name abv.IsTrueValidator#__exactMessageParameters
         * @description Returned parameters for error message which needs to be replaced
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
         * @name abv.IsTrueValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
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

abv.registry(abv.CountValidator);