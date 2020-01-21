Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.EmailValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * Validates that a value is a valid email address.</p>
     * The underlying value is cast to a string before being validated.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.EmailValidator(data, {data: 'loose'});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.EmailValidator#mode
     * @type {String}
     * @description
     * This option is optional and defines the pattern the email address is validated against.
     * Default to 'html5'
     * Valid values are:
     * <ul>
     *     <li><b>loose</b> - A simple regular expression. Allows all values with an "@" symbol in, and a "." in the second host part of the email address.</li>
     *     <!--li><b>strict</b> - Uses the egulias/email-validator library to perform an RFC compliant validation. You will need to install that library to use this mode.</li-->
     *     <li><b>html5</b> - This matches the pattern used for the {@link https://www.w3.org/TR/html5/sec-forms.html#email-state-typeemail|HTML5 email input element}.</li>
     * </ul>
     */

    /**
     * @name abv.EmailValidator#normalize
     * @type {Boolean}
     * @description
     * Normalizer string before validate (trim, etc.).
     * Default: false
     */

    /**
     * @name abv.EmailValidator#message
     * @type {String}
     * @description
     * This message is shown if the underlying data is not a valid email address.
     * <p>Default: "This value is not a valid email address."
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

    var EmailValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            mode: optionRules.mode || 'type:{"type":"string"}|length:{"min":2,"max":20}',
            normalize: optionRules.normalize || 'type:{"type":"bool"}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid email address.';
        this.mode = (['loose', 'strict', 'html5'].includes(this.__options.mode)) ? this.__options.mode : 'html5';
        this.normalize = (!this.__options.normalize || false === this.__options.normalize) ? false : true;

        this.__patternLoose = /^.+\@\S+\.\S+$/;
        this.__patternHtml5 = /^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

        this.name = 'EmailValidator';
    };
    EmailValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    EmailValidator.prototype.constructor = EmailValidator;

    Object.defineProperty(EmailValidator.prototype, 'alias', {
        get: function () {
            return 'email';
        }
    });

    Object.defineProperty(EmailValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'mode',
                    'type': 'string'
                }
            ];
        }
    });

    Object.assign(EmailValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.EmailValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            // Normalize
            if (true === this.normalize) {
                this.__normalize();
            }

            // Check if empty
            if (true === this.__isEmptyData()) {
                return ;
            }

            switch (this.mode) {
                case 'loose':
                    if (false === this.__patternLoose.test(this.data)) {
                        this.__setErrorMessage(this.message, this.__messageParameters());
                        return ;
                    }
                    break;
                /**
                 * @todo Implement [mode:strict]
                 */
                case 'strict':
                    this.__setErrorMessage(this.message, this.__messageParameters());
                    return ;
                    break ;
                case 'html5':
                    if (false === this.__patternHtml5.test(this.data)) {
                        this.__setErrorMessage(this.message, this.__messageParameters());
                        return ;
                    }
                    break;
            }
        },

        /**
         * @private
         * @function
         * @name abv.EmailValidator#__beforeValidate
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
         * @name abv.EmailValidator#__messageParameters
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
        EmailValidator: EmailValidator
    };
}());

abv.registry(abv.EmailValidator);