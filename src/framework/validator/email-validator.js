Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.EmailValidator
     * @extends abv.ValidatorExtension
     * @classdesc Validates that a value is a valid email address. The underlying value is cast to a string before being validated.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
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
        abv.ValidatorExtension.call(this);

        options = options || {};

        this.data = data;
        this.lang = lang || 'en';

        this.message = options.message || 'This value is not a valid email address.';
        this.mode = (['loose', 'strict', 'html5'].includes(options.mode)) ? options.mode : 'html5';
        this.normalize = options.normalize ? ('true' == options.normalize ? true : false) : false;


        this.__name = 'EmailValidator';
        this.__isValid = true;
        this.__errorMessage = null;
    };
    EmailValidator.prototype = Object.create(abv.ValidatorExtension.prototype);
    EmailValidator.prototype.constructor = EmailValidator;

    Object.assign(EmailValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.EmailValidator#validate
         * @description Validate data
         */
        validate: function () {
            try {
                this.data = this.data.toString();

                // Normalize
                if (true === this.normalize) {
                    this.data = this.data.trim();
                }

                switch (this.mode) {
                    case 'loose':
                        if (
                            true === this.__isValid
                            && false === /^.+\@\S+\.\S+$/.test(this.data)
                        ) {
                            this.__isValid = false;
                            this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());
                        }
                        break;
                    /**
                     * @todo Implement [mode:strict]
                     */
                    case 'strict':
                        if (
                            true === this.__isValid
                        ) {
                            this.__isValid = false;
                            this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());
                        }
                        break;
                    case 'html5':
                        if (
                            true === this.__isValid
                            && false === /^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(this.data)
                        ) {
                            this.__isValid = false;
                            this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());
                        }
                        break;
                }
            } catch (e) {
                this.__isValid = false;
                this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());
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