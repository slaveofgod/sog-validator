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
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.UrlValidator(data);
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

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
     * Defaults to ['http', 'https', 'ftp']
     */

    /**
     * @name abv.UrlValidator#relativeProtocol
     * @type {Boolean}
     * @description
     * If true, the protocol is considered optional when validating the syntax of the given URL.
     * This means that both http:// and https:// are valid but also relative URLs that contain no protocol (e.g. //example.com).
     * Defaults to false.
     */

    var UrlValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}',
            normalize: 'type:{"type":"bool"}',
            protocols: 'type:{"type":"stringOrArray"}',
            relativeProtocol: 'type:{"type":"bool"}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid URL.';
        this.normalize = (!this.__options.normalize || false === this.__options.normalize) ? false : true;
        this.protocols = this.__options.protocols || ['http', 'https', 'ftp'];
        this.relativeProtocol = (!this.__options.relativeProtocol || false === this.__options.relativeProtocol) ? false : true;

        this.__setName('UrlValidator');

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
            if ('string' === typeof this.protocols) {
                this.protocols = [this.protocols];
            }

            this.__pattern = (true === this.relativeProtocol) ? this.__pattern.replace('(%s):', '(?:(%s):)?') : this.__pattern;
            this.__pattern = this.__pattern.replace('%s', this.protocols.join('|'));
        },

        /**
         * @private
         * @function
         * @name abv.UrlValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            // Normalize
            if (true === this.normalize) {
                this.__normalize();
            }

            // Check if empty
            if ('undefined' === typeof this.data || null === this.data || '' === this.data) {
                return;
            }

            var pattern = new RegExp(this.__pattern);
            if (false === pattern.test(this.data)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.UrlValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
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

            // Check if protocols is array
            var errorMessage = abv.isValidWithErrorMessage(this.protocols, 'type:{"type":"array"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.UrlValidator#__messageParameters
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
        UrlValidator: UrlValidator
    };
}());