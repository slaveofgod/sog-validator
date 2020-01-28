Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.TimezoneValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is a valid timezone identifier (e.g. <code>Europe/Paris</code>).</p>
     * <p>{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|List of tz database time zones}.</p>
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
     * <p>Defined aliases: ['<code>timezone</code>', '<code>tz</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.TimezoneValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.TimezoneValidator#message
     * @type {String}
     * @description
     * <p>This message is shown if the underlying data is not a valid timezone identifier.</p>
     * <p>Default: "<code>This value is not a valid timezone.</code>"</p>
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

    var TimezoneValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid timezone.';

        this.name = 'TimezoneValidator';
    };
    TimezoneValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    TimezoneValidator.prototype.constructor = TimezoneValidator;

    Object.defineProperty(TimezoneValidator.prototype, 'alias', {
        get: function () {
            return [
                'timezone',
                'tz'
            ];
        }
    });

    Object.defineProperty(TimezoneValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(TimezoneValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.TimezoneValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            var zone = this.__moment.tz.zone(this.data);
            if (null === zone) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.TimezoneValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
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
         * @name sogv.TimezoneValidator#__messageParameters
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
        TimezoneValidator: TimezoneValidator
    };
}());

sogv.registry(sogv.TimezoneValidator);