Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.TimeValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is a valid <code>time</code>, meaning a string (or an object that can be cast into a string) that follows a valid <code>HH:mm:ss</code> format.</p>
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
     * <p>Defined aliases: ['<code>time</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.TimeValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.TimeValidator#message
     * @type {String}
     * @description
     * <p>This message is shown if the underlying data is not a valid time.</p>
     * <p>Default: "<code>This value is not a valid time.</code>"</p>
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

    var TimeValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid time.';
        this.format = this.__options.format || 'HH:mm:ss';

        this.name = 'TimeValidator';
    };
    TimeValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    TimeValidator.prototype.constructor = TimeValidator;

    Object.defineProperty(TimeValidator.prototype, 'alias', {
        get: function () {
            return [
                'time'
            ];
        }
    });

    Object.defineProperty(TimeValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(TimeValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.TimeValidator#__validate
         * @description
         * <p>Validate data.</p>
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
         * @name sogv.TimeValidator#__beforeValidate
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
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
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
        },

        /**
         * @private
         * @function
         * @name sogv.TimeValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
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

sogv.registry(sogv.TimeValidator);