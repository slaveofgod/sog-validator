Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.RangeValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a given number or Date object is between some minimum and maximum.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.RangeValidator('1991-12-17T03:24:00', {"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"});
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.RangeValidator#invalidMessage
     * @type {String}
     * @description
     * The message that will be shown if the underlying value is not a number.
     * Defaults to "This value should be a valid number."
     * You can use the following parameters in this message:
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td>%%value%%</td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name abv.RangeValidator#max
     * @type {Number|String|Date}
     * @description
     * This required option is the "max" value. Validation will fail if the given value is greater than this max value.
     */

    /**
     * @name abv.RangeValidator#maxMessage
     * @type {String}
     * @description
     * The message that will be shown if the underlying value is more than the max option.
     * Defaults to "This value should be %%limit%% or less."
     * You can use the following parameters in this message:
     * <table>
     *     <tr>
     *         <td><b>Parameter</b></td>
     *         <td><b>Description</b></td>
     *     </tr>
     *     <tr>
     *         <td>%%limit%%</td>
     *         <td>The upper limit</td>
     *     </tr>
     *     <tr>
     *         <td>%%value%%</td>
     *         <td>The current (invalid) value</td>
     *     </tr>
     * </table>
     */

    /**
     * @name abv.RangeValidator#min
     * @type {Number|String|Date}
     * @description
     * This required option is the "min" value. Validation will fail if the given value is less than this min value.
     */

    /**
     * @name abv.RangeValidator#minMessage
     * @type {String}
     * @description
     * The message that will be shown if the underlying value is less than the min option.
     * Defaults to "This value should be %%limit%% or more."
     * You can use the following parameters in this message:
     * <table>
     *     <tr>
     *         <td><b>Parameter</b></td>
     *         <td><b>Description</b></td>
     *     </tr>
     *     <tr>
     *         <td>%%limit%%</td>
     *         <td>The lower limit</td>
     *     </tr>
     *     <tr>
     *         <td>%%value%%</td>
     *         <td>The current (invalid) value</td>
     *     </tr>
     * </table>
     */

    /**
     * @name abv.RangeValidator#notInRangeMessage
     * @type {String}
     * @description
     * The message that will be shown if the underlying value is less than the min option or greater than the max option.
     * Defaults to "This value should be between %%min%% and %%max%%."
     * You can use the following parameters in this message:
     * <table>
     *     <tr>
     *         <td><b>Parameter</b></td>
     *         <td><b>Description</b></td>
     *     </tr>
     *     <tr>
     *         <td>%%max%%</td>
     *         <td>The upper limit</td>
     *     </tr>
     *     <tr>
     *         <td>%%max%%</td>
     *         <td>The lower limit</td>
     *     </tr>
     *     <tr>
     *         <td>%%value%%</td>
     *         <td>The current (invalid) value</td>
     *     </tr>
     * </table>
     */

    var RangeValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            invalidMessage: 'length:{"min":3,"max":255}',
            max: 'required|type:{"type":["numeric","date-string"],"any":true}',
            maxMessage: 'length:{"min":3,"max":255}',
            min: 'required|type:{"type":["numeric","date-string"],"any":true}',
            minMessage: 'length:{"min":3,"max":255}',
            notInRangeMessage: 'length:{"min":3,"max":255}'
        }, lang, internal);

        this.invalidMessage = this.__options.invalidMessage || 'This value should be a valid number.';
        this.max = this.__options.max;
        this.maxMessage = this.__options.maxMessage || 'This value should be %%limit%% or less.';
        this.min = this.__options.min;
        this.minMessage = this.__options.minMessage || 'This value should be %%limit%% or more.';
        this.notInRangeMessage = this.__options.notInRangeMessage || 'This value should be between %%min%% and %%max%%.';

        this.__setName('RangeValidator');
    };
    RangeValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    RangeValidator.prototype.constructor = RangeValidator;

    Object.defineProperty(RangeValidator.prototype, 'name', {
        get: function () {
            return this.__getName();
        }
    });

    Object.assign(RangeValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.RangeValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            // Check if empty
            if ('undefined' === typeof this.data || null === this.data || '' === this.data) {
                return ;
            }

            var hasLowerLimit = null !== this.min;
            var hasUpperLimit = null !== this.max;

            if (hasLowerLimit && hasUpperLimit && (this.data < this.min || this.data > this.max)) {
                this.__setErrorMessage(this.notInRangeMessage, this.__notInRangeMessageParameters());
                return ;
            }

            if (hasUpperLimit && this.data > this.max) {
                this.__setErrorMessage(this.maxMessage, this.__maxMessageParameters());
                return ;
            }

            if (hasLowerLimit && this.data < this.min) {
                this.__setErrorMessage(this.minMessage, this.__minMessageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.RangeValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if ('undefined' === typeof this.data || null === this.data || '' === this.data) {
                return ;
            }

            // Check if data type in not "numeric" or "date-string"
            if (
                false === abv.isType('numeric', this.data)
                && false === abv.isType('date-string', this.data)
            ) {
                this.__setErrorMessage(this.invalidMessage, this.__invalidMessageParameters());
                return ;
            }

            // Convert "data" to datetime if type is "date-string"
            if (
                false === abv.isType('numeric', this.data)
                && true === abv.isType('date-string', this.data)
            ) {
                var date = new Date(this.data);
                this.data = date.getTime();
            }

            // Convert "min" to datetime if type is "date-string"
            if (
                false === abv.isType('numeric', this.min)
                && true === abv.isType('date-string', this.min)
            ) {
                var date = new Date(this.min);
                this.min = date.getTime();
            }

            // Convert "max" to datetime if type is "date-string"
            if (
                false === abv.isType('numeric', this.max)
                && true === abv.isType('date-string', this.max)
            ) {
                var date = new Date(this.max);
                this.max = date.getTime();
            }
        },

        /**
         * @private
         * @function
         * @name abv.RangeValidator#__invalidMessageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __invalidMessageParameters: function () {
            return {
                'value': this.data
            }
        },

        /**
         * @private
         * @function
         * @name abv.RangeValidator#__notInRangeMessageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __notInRangeMessageParameters: function () {
            return {
                'max': this.max,
                'min': this.min,
                'value': this.data
            }
        },

        /**
         * @private
         * @function
         * @name abv.RangeValidator#__maxMessageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __maxMessageParameters: function () {
            return {
                'limit': this.max,
                'value': this.data
            }
        },

        /**
         * @private
         * @function
         * @name abv.RangeValidator#__minMessageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __minMessageParameters: function () {
            return {
                'limit': this.min,
                'value': this.data
            }
        }
    });

    return {
        RangeValidator: RangeValidator
    };
}());