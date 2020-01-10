Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.TimeValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is a valid time, meaning a string (or an object that can be cast into a string) that follows a valid HH:mm:ss format.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.TimeValidator(data);
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.TimeValidator#message
     * @type {String}
     * @description
     * This message is shown if the underlying data is not a valid time.
     * Defaults to "This value is not a valid time."
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

    var TimeValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid time.';
        this.format = this.__options.format || 'HH:mm:ss';

        this.__setName('TimeValidator');
    };
    TimeValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    TimeValidator.prototype.constructor = TimeValidator;

    Object.defineProperty(TimeValidator.prototype, 'name', {
        get: function () {
            return this.__getName();
        }
    });

    Object.assign(TimeValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.TimeValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            // Check if empty
            if ('undefined' === typeof this.data || null === this.data || '' === this.data) {
                return ;
            }

            if (this.data !== this.__moment(this.data, this.format).format(this.format)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.TimeValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if ('undefined' === typeof this.data || null === this.data || '' === this.data) {
                return ;
            }

            // Check if value is scalar
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            try {
                if ('undefined' !== typeof this.data) {
                    this.data = this.data.toString();
                }
            } catch (e) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.TimeValidator#__messageParameters
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
        TimeValidator: TimeValidator
    };
}());