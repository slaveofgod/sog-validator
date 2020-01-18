Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IsbnValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc This constraint validates that an {@link https://en.wikipedia.org/wiki/Isbn|International Standard Book Number (ISBN)} is either a valid ISBN-10 or a valid ISBN-13.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.IsbnValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.IsbnValidator#bothIsbnMessage
     * @type {String}
     * @description
     * The message that will be shown if the type option is null and the given value does not pass any of the ISBN checks.</p>
     * <p>Default: "<code>This value is neither a valid ISBN-10 nor a valid ISBN-13.</code>"</p>
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
     * @name abv.IsbnValidator#isbn10Message
     * @type {String}
     * @description
     * The message that will be shown if the type option is isbn10 and the given value does not pass the ISBN-10 check.</p>
     * <p>Default: "<code>This value is not a valid ISBN-10.</code>"</p>
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
     * @name abv.IsbnValidator#isbn13Message
     * @type {String}
     * @description
     * The message that will be shown if the type option is isbn13 and the given value does not pass the ISBN-13 check.</p>
     * <p>Default: "<code>This value is not a valid ISBN-13.</code>"</p>
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
     * @name abv.IsbnValidator#message
     * @type {String}
     * @description
     * The message that will be shown if the value is not valid. If not null, this message has priority over all the other messages.
     * Default: <code>null</code>
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
     * @name abv.IsbnValidator#type
     * @type {String}
     * @description
     * The type of ISBN to validate against. Valid values are isbn10, isbn13 and null to accept any kind of ISBN.
     * Default: <code>null</code>
     */

    var IsbnValidator = function (data, options, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options,{
            bothIsbnMessage: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            isbn10Message: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            isbn13Message: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            message: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            type: 'type:{"type":"string"}'
        }, lang, internal);

        this.bothIsbnMessage = this.__options.bothIsbnMessage || 'This value is neither a valid ISBN-10 nor a valid ISBN-13.';
        this.isbn10Message = this.__options.isbn10Message || 'This value is not a valid ISBN-10.';
        this.isbn13Message = this.__options.isbn13Message || 'This value is not a valid ISBN-13.';
        this.message = this.__options.message || null;
        this.type = this.__options.type || null;

        this.name = 'IsbnValidator';
    };
    IsbnValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    IsbnValidator.prototype.constructor = IsbnValidator;

    Object.defineProperty(IsbnValidator.prototype, 'alias', {
        get: function () {
            return 'isbn';
        }
    });

    Object.assign(IsbnValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IsbnValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            var canonical = this.data.split('-').join('');

            // Explicitly validate against ISBN-10
            if ('isbn10' === this.type) {
                if (false === this.__validateIsbn10(canonical)) {
                    this.__setErrorMessage(this.__getMessage(this.type), this.__messageParameters());
                    return ;
                }
            }

            // Explicitly validate against ISBN-13
            if ('isbn13' === this.type) {
                if (false === this.__validateIsbn13(canonical)) {
                    this.__setErrorMessage(this.__getMessage(this.type), this.__messageParameters());
                    return ;
                }
            }

            // Try both ISBNs

            // First, try ISBN-10
            var code = this.__validateIsbn10(canonical);
            
            // The ISBN can only be an ISBN-13 if the value was too long for ISBN-10
            if (false === code) {
                // Try ISBN-13 now
                code = this.__validateIsbn13(canonical);
                // If too short, this means we have 11 or 12 digits
                if (false === code) {
                    code = false;
                }
            }

            if (true !== code) {
                this.__setErrorMessage(this.__getMessage(), this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.IsbnValidator#__validateIsbn10
         * @description Validate ISBN 10
         * @param {String} isbn ISBN
         * @returns {Boolean}
         */
        __validateIsbn10: function (isbn) {
            // Choose an algorithm so that ERROR_INVALID_CHARACTERS is preferred
            // over ERROR_TOO_SHORT/ERROR_TOO_LONG
            // Otherwise "0-45122-5244" passes, but "0-45122_5244" reports
            // "too long"
            // Error priority:
            // 1. ERROR_INVALID_CHARACTERS
            // 2. ERROR_TOO_SHORT/ERROR_TOO_LONG
            // 3. ERROR_CHECKSUM_FAILED
            var checkSum = 0;
            var i;
            for (i = 0; i < 10; ++i) {
                // If we test the length before the loop, we get an ERROR_TOO_SHORT
                // when actually an ERROR_INVALID_CHARACTERS is wanted, e.g. for
                // "0-45122_5244" (typo)
                if ('undefined' === typeof isbn[i]) {
                    return false;
                }
                var digit = null;
                if ('X' === isbn[i]) {
                    digit = 10;
                } else if (true === abv.isType('digit', isbn[i])) {
                    digit = isbn[i];
                } else {
                    return false;
                }
                checkSum += digit * (10 - i);
            }
            if ('undefined' !== typeof isbn[i]) {
                return false;
            }
            return 0 === checkSum % 11 ? true : false;
        },

        /**
         * @private
         * @function
         * @name abv.IsbnValidator#__validateIsbn13
         * @description Validate ISBN 13
         * @param {String} isbn ISBN
         * @returns {Boolean}
         */
        __validateIsbn13: function (isbn) {
            // Error priority:
            // 1. ERROR_INVALID_CHARACTERS
            // 2. ERROR_TOO_SHORT/ERROR_TOO_LONG
            // 3. ERROR_CHECKSUM_FAILED
            if (false === abv.isType('digit', isbn)) {
                return false;
            }
            var length = isbn.length;
            if (length < 13) {
                return false;
            }
            if (length > 13) {
                return false;
            }
            var checkSum = 0;
            for (var i = 0; i < 13; i += 2) {
                checkSum += isbn[i];
            }
            for (var i = 1; i < 12; i += 2) {
                checkSum += isbn[i] * 3;
            }
            return 0 === checkSum % 10 ? true : false;
        },

        /**
         * @private
         * @function
         * @name abv.IsbnValidator#__getMessage
         * @description Get message by type
         * @param {String} type Message type
         * @returns {String}
         */
        __getMessage: function (type) {
            if (null !== this.message) {
                return this.message;
            } else if ('isbn10' === type) {
                return this.isbn10Message;
            } else if ('isbn13' === type) {
                return this.isbn13Message;
            }

            return this.bothIsbnMessage;
        },

        /**
         * @private
         * @function
         * @name abv.IsbnValidator#__beforeValidate
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
         * @name abv.IsbnValidator#__messageParameters
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
        IsbnValidator: IsbnValidator
    };
}());

abv.registry(abv.IsbnValidator);