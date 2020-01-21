Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.DateValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is a valid date, meaning a string (or an object that can be cast into a string) that follows a valid YYYY-MM-DD format.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.DateValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.DateValidator#message
     * @type {String}
     * @description
     * This message is shown if the underlying data is not a valid date.
     * <p>Default: "<code>This value is not a valid date.</code>"
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
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var DateValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid date.';
        this.format = this.__options.format || 'YYYY-MM-DD';

        this.name = 'DateValidator';
    };
    DateValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    DateValidator.prototype.constructor = DateValidator;

    Object.defineProperty(DateValidator.prototype, 'alias', {
        get: function () {
            return 'date';
        }
    });

    Object.defineProperty(DateValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(DateValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.DateValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (this.data !== this.__moment(this.data, this.format).format(this.format)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.DateValidator#__beforeValidate
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
         * @name abv.DateValidator#__messageParameters
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
        DateValidator: DateValidator
    };
}());

abv.registry(abv.DateValidator);