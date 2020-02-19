Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.EmailValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is a valid <code>email address</code>.</p>
     * <p>The underlying value is cast to a string before being validated.</p>
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
     * <p>Defined aliases: ['<code>email</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.EmailValidator(data, {data: 'loose'});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.EmailValidator#mode
     * @type {String}
     * @description
     * <p>This option is optional and defines the pattern the <code>email</code> address is validated against.</p>
     * <p>Default: '<code>html5</code>'</p>
     * <p>Valid values are:</p>
     * <ul>
     *     <li><b>loose</b> - A simple regular expression. Allows all values with an "@" symbol in, and a "." in the second host part of the email address.</li>
     *     <!--li><b>strict</b> - Uses the egulias/email-validator library to perform an RFC compliant validation. You will need to install that library to use this mode.</li-->
     *     <li><b>html5</b> - This matches the pattern used for the {@link https://www.w3.org/TR/html5/sec-forms.html#email-state-typeemail|HTML5 email input element}.</li>
     * </ul>
     */

    /**
     * @name sogv.EmailValidator#normalize
     * @type {Boolean}
     * @description
     * <p>Normalizer string before validate (trim, etc.).</p>
     * <p>Default: <code>false</code></p>
     */

    /**
     * @name sogv.EmailValidator#message
     * @type {String}
     * @description
     * <p>This message is shown if the underlying data is not a valid email address.</p>
     * <p>Default: "<code>This value is not a valid email address.</code>"</p>
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
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            mode: optionRules.mode || 'type:{"type":"string"}|length:{"min":2,"max":20}',
            normalize: optionRules.normalize || 'type:{"type":"bool"}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid email address.';
        this.mode = (['loose', 'strict', 'html5'].includes(this.__options.mode)) ? this.__options.mode : 'html5';
        this.normalize = ('undefined' === typeof this.__options.normalize || false === this.__options.normalize) ? false : true;

        this.__patternLoose = /^.+\@\S+\.\S+$/;
        this.__patternHtml5 = /^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

        this.name = 'EmailValidator';
    };
    EmailValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    EmailValidator.prototype.constructor = EmailValidator;

    Object.defineProperty(EmailValidator.prototype, 'alias', {
        get: function () {
            return [
                'email'
            ];
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
         * @name sogv.EmailValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            // Normalize
            if (true === this.normalize) {
                this.__normalize();
            }

            // Cancel validation if data is empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
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
         * @name sogv.EmailValidator#__beforeValidate
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
         * @name sogv.EmailValidator#__messageParameters
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
        EmailValidator: EmailValidator
    };
}());

sogv.registry(sogv.EmailValidator);