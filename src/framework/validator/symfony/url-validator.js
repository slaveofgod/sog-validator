Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.UrlValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is a valid <code>URL</code> string.</p>
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
     * <p>Defined aliases: ['<code>url</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.UrlValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.UrlValidator#message
     * @type {String}
     * @description
     * This message is shown if the URL is invalid.</p>
     * <p>Default: "<code>This value is not a valid URL.</code>"</p>
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

    /**
     * @name sogv.UrlValidator#normalize
     * @type {Boolean}
     * @description
     * Normalizer string before validate (trim, etc.).
     * Default: <code>false</code>.
     */

    /**
     * @name sogv.UrlValidator#protocols
     * @type {Array}
     * @description
     * The protocols considered to be valid for the URL.
     * For example, if you also consider the ftp:// type URLs to be valid, redefine the protocols array, listing http, https, and also ftp.
     * Default: <code>['http', 'https', 'ftp']</code>
     */

    /**
     * @name sogv.UrlValidator#relativeProtocol
     * @type {Boolean}
     * @description
     * If true, the protocol is considered optional when validating the syntax of the given URL.
     * This means that both http:// and https:// are valid but also relative URLs that contain no protocol (e.g. //example.com).
     * Default: <code>false</code>.
     */

    var UrlValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            normalize: optionRules.normalize || 'type:{"type":"bool"}',
            protocols: optionRules.protocols || 'type:{"type":["string","array"],"any":true}',
            relativeProtocol: optionRules.relativeProtocol || 'type:{"type":"bool"}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid URL.';
        this.normalize = ('undefined' === typeof this.__options.normalize || false === this.__options.normalize) ? false : true;
        this.protocols = this.__options.protocols || ['http', 'https', 'ftp'];
        this.relativeProtocol = ('undefined' === typeof this.__options.relativeProtocol || false === this.__options.relativeProtocol) ? false : true;

        this.name = 'UrlValidator';

        this.__pattern = "^((((%s):(?:\\/\\/)?)(?:[\\-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9\\.\\-]+|(?:www\\.|[\\-;:&=\\+\\$,\\w]+@)[A-Za-z0-9\\.\\-]+)((?:\\/[\\+~%\\/\\.\\w\\-_]*)?\\??(?:[\\-\\+=&;%@\\.\\w_]*)#?(?:[\\.\\!\\/\\\\\\w]*))?)$";

        this.__configure();
    };
    UrlValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    UrlValidator.prototype.constructor = UrlValidator;

    Object.defineProperty(UrlValidator.prototype, 'alias', {
        get: function () {
            return [
                'url'
            ];
        }
    });

    Object.defineProperty(UrlValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'relativeProtocol',
                    'type': 'boolean'
                }, {
                    'name': 'protocols',
                    'type': 'array'
                }
            ];
        }
    });

    Object.assign(UrlValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.AllValidator#configure
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
         * @name sogv.UrlValidator#__validate
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

            var pattern = new RegExp(this.__pattern);
            if (false === pattern.test(this.data)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.UrlValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Cancel validation if data is empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            var errorMessage;

            // Check if value is scalar
            errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
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

            // Check if protocols is array
            errorMessage = sogv.isValidWithErrorMessage(this.protocols, 'type:{"type":"array"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.UrlValidator#__messageParameters
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
        UrlValidator: UrlValidator
    };
}());

sogv.registry(sogv.UrlValidator);