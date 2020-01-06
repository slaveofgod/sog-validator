Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.EmailValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is a valid email address. The underlying value is cast to a string before being validated.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @example
     * var validator = new abv.EmailValidator(data, {data: 'loose'});
     * if (false === validator.isValid()) {
     *      validator.errorMessage();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.EmailValidator#data
     * @type {*}
     * @description Data that needs to be validated.
     */

    /**
     * @name abv.EmailValidator#lang
     * @type {String}
     * @description Language of error messages.
     */

    /**
     * @name abv.EmailValidator#mode
     * @type {String}
     * @description This option is optional and defines the pattern the email address is validated against. Default to 'html5'
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
     * @description Normalizer string before validate (trim, etc.). Defaults to false
     */

    /**
     * @name abv.EmailValidator#message
     * @type {String}
     * @description This message is shown if the underlying data is not a valid email address. Defaults to "This value is not a valid email address."
     * You can use the following parameters in this message:
     * <table>
     *     <tr>
     *         <td><b>Parameter</b></td>
     *         <td><b>Description</b></td>
     *     </tr>
     *     <tr>
     *         <td>%%value%%</td>
     *         <td>The current (invalid) value</td>
     *     </tr>
     * </table>
     */

    var EmailValidator = function (data, options, lang) {
        abv.AbstractValidator.call(this);

        options = options || {};

        this.data = data;
        this.lang = lang || 'en';

        this.message = options.message || 'This value is not a valid email address.';
        this.mode = (['loose', 'strict', 'html5'].includes(options.mode)) ? options.mode : 'html5';
        this.normalize = options.normalize || false;

        this.__patternLoose = /^.+\@\S+\.\S+$/;
        this.__patternHtml5 = /^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

        this.__name = 'EmailValidator';
    };
    EmailValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    EmailValidator.prototype.constructor = EmailValidator;

    Object.assign(EmailValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.EmailValidator#validate
         * @description Validate data
         */
        validate: function () {
            this.data = this.data.toString();

            // Normalize
            if (true === this.normalize) {
                this.data = this.data.trim();
            }

            // Check if empty
            if ('undefined' === typeof this.data || null === this.data || '' === this.data) {
                return;
            }

            switch (this.mode) {
                case 'loose':
                    if (false === this.__patternLoose.test(this.data)) {
                        this.__setErrorMessage(this.message, this.messageParameters());
                        return ;
                    }
                    break;
                /**
                 * @todo Implement [mode:strict]
                 */
                case 'strict':
                    this.__setErrorMessage(this.message, this.messageParameters());
                    return;
                    break ;
                case 'html5':
                    if (false === this.__patternHtml5.test(this.data)) {
                        this.__setErrorMessage(this.message, this.messageParameters());
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
            // Check if value is scalar
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}');
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            try {
                this.data = this.data.toString();
            } catch (e) {
                this.__setErrorMessage(this.message, this.messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.EmailValidator#messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        messageParameters: function () {
            return {
                'value': this.data
            }
        }
    });

    return {
        EmailValidator: EmailValidator
    };
}());