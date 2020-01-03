Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.UrlValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is a valid URL string.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @example
     * var validator = new abv.UrlValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errorMessage();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.UrlValidator#data
     * @type {*}
     * @description Data that needs to be validated.
     */

    /**
     * @name abv.UrlValidator#lang
     * @type {String}
     * @description Language of error messages.
     */

    /**
     * @name abv.UrlValidator#message
     * @type {String}
     * @description This message is shown if the URL is invalid. Defaults to "This value is not a valid URL."
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

    /**
     * @name abv.UrlValidator#normalize
     * @type {Boolean}
     * @description Normalizer string before validate (trim, etc.). Defaults to false.
     */

    /**
     * @name abv.UrlValidator#protocols
     * @type {Array}
     * @description
     * The protocols considered to be valid for the URL.
     * For example, if you also consider the ftp:// type URLs to be valid, redefine the protocols array, listing http, https, and also ftp.
     * Defaults to ['http', 'https']
     */

    /**
     * @name abv.UrlValidator#relativeProtocol
     * @type {Boolean}
     * @description
     * If true, the protocol is considered optional when validating the syntax of the given URL.
     * This means that both http:// and https:// are valid but also relative URLs that contain no protocol (e.g. //example.com).
     * Defaults to false.
     */

    var UrlValidator = function (data, options, lang) {
        abv.AbstractValidator.call(this);

        options = options || {};

        this.data = data;
        this.lang = lang || 'en';

        this.message = options.message || 'This value is not a valid URL.';
        this.normalize = options.normalize || false;
        this.protocols = options.protocols || ['http', 'https'];
        this.relativeProtocol = options.relativeProtocol || false;

        this.__name = 'UrlValidator';

        this.__pattern = "^((((%s):(?:\\/\\/)?)(?:[\\-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9\\.\\-]+|(?:www\\.|[\\-;:&=\\+\\$,\\w]+@)[A-Za-z0-9\\.\\-]+)((?:\\/[\\+~%\\/\\.\\w\\-_]*)?\\??(?:[\\-\\+=&;%@\\.\\w_]*)#?(?:[\\.\\!\\/\\\\\\w]*))?)$";

        this.__configure();
    };
    UrlValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    UrlValidator.prototype.constructor = UrlValidator;

    Object.assign(UrlValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AllValidator#configure
         * @description Configure validator
         */
        __configure: function () {
            this.__pattern = (true === this.relativeProtocol) ? this.__pattern.replace('(%s):', '(?:(%s):)?') : this.__pattern;
            this.__pattern = this.__pattern.replace('%s', this.protocols.join('|'));
        },

        /**
         * @private
         * @function
         * @name abv.UrlValidator#validate
         * @description Validate data
         */
        validate: function () {
            // Check if value is scalar
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}');
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            try {
                this.data = this.data.toString();

                // Normalize
                if (true === this.normalize) {
                    this.data = this.data.trim();
                }

                // Check if empty
                if (null === this.data || '' === this.data) {
                    return;
                }

                var pattern = new RegExp(this.__pattern);
                if (false === pattern.test(this.data)) {
                    this.__setErrorMessage(this.message, this.messageParameters());
                    return ;
                }
            } catch (e) {
                this.__setErrorMessage(this.message, this.messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.UrlValidator#messageParameters
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
        UrlValidator: UrlValidator
    };
}());