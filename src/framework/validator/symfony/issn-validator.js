Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IssnValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc Validates that a value is a valid {@link https://en.wikipedia.org/wiki/Issn|International Standard Serial Number (ISSN)}.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.IssnValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.IssnValidator#caseSensitive
     * @type {Boolean}
     * @description
     * <p>The validator will allow ISSN values to end with a lower case 'x' by default.</p>
     * <p>When switching this to true, the validator requires an upper case 'X'.</p>
     * <p>Default: <code>false</code><.p>
     */

    /**
     * @name abv.IssnValidator#message
     * @type {String}
     * @description
     * The message shown if the given value is not a valid ISSN.</p>
     * <p>Default: "<code>This value is not a valid ISSN.</code>"</p>
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
     * @name abv.IssnValidator#requireHyphen
     * @type {Boolean}
     * @description
     * <p>The validator will allow non hyphenated ISSN values by default.</p>
     * <p>When switching this to true, the validator requires a hyphenated ISSN value.</p>
     * <p>Default: <code>false</code></p>
     */

    var IssnValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options, {
            caseSensitive: optionRules.caseSensitive || 'type:{"type":"bool"}',
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            requireHyphen: optionRules.requireHyphen || 'type:{"type":"bool"}'
        }, lang, internal);

        this.caseSensitive = (true === this.__options.caseSensitive);
        this.message = this.__options.message || 'This value is not a valid ISSN.';
        this.requireHyphen = (true === this.__options.requireHyphen);

        this.name = 'IssnValidator';
    };
    IssnValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    IssnValidator.prototype.constructor = IssnValidator;

    Object.defineProperty(IssnValidator.prototype, 'alias', {
        get: function () {
            return 'issn';
        }
    });

    Object.defineProperty(IssnValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'caseSensitive',
                    'type': 'bool'
                }, {
                    'name': 'requireHyphen',
                    'type': 'bool'
                }
            ];
        }
    });

    Object.assign(IssnValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IssnValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            var canonical = this.data;

            // 1234-567X
            //     ^
            if ('undefined' !== typeof canonical[4] && '-' === canonical[4]) {
                // remove hyphen
                canonical = this.data.substr(0, 4);
                canonical += this.data.substr(5);
            } else if (true === this.requireHyphen) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            var length = canonical.length;

            if (length < 8) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            if (length > 8) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // 1234567X
            // ^^^^^^^ digits only
            if (false === abv.isType('digit', canonical.substr(0, 7))) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // 1234567X
            //        ^ digit, x or X
            if (false === abv.isType('digit', canonical[7]) && 'x' !== canonical[7] && 'X' !== canonical[7]) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // 1234567X
            //        ^ case-sensitive?
            if (true === this.caseSensitive && 'x' === canonical[7]) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // Calculate a checksum. "X" equals 10.
            var checkSum = ('X' === canonical[7] || 'x' === canonical[7]) ? 10 : parseInt(canonical[7]);
            for (var i = 0; i < 7; ++i) {
                // Multiply the first digit by 8, the second by 7, etc.
                checkSum += (8 - i) * parseInt(canonical[i]);
            }
            if (0 !== checkSum % 11) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.IssnValidator#__beforeValidate
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
         * @name abv.IssnValidator#__messageParameters
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
        IssnValidator: IssnValidator
    };
}());

abv.registry(abv.IssnValidator);