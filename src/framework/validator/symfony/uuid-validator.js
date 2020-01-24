Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.UuidValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is a valid {@link https://en.wikipedia.org/wiki/Universally_unique_identifier|Universally unique identifier (UUID)} per {@link https://tools.ietf.org/html/rfc4122|RFC 4122}.</p>
     * <p>By default, this will validate the format according to the RFC's guidelines, but this can be relaxed to accept non-standard <code>UUIDs</code> that other systems (like PostgreSQL) accept.</p>
     * <p><code>UUID</code> versions can also be restricted using a whitelist.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.UuidValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.UuidValidator#message
     * @type {String}
     * @description
     * <p>This message is shown if the string is not a valid <code>UUID</code>.</p>
     * <p>Default: "<code>This is not a valid UUID.</code>"</p>
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
     * @name abv.UuidValidator#normalize
     * @type {Boolean}
     * @description
     * <p>Normalizer string before validate (trim, etc.).</p>
     * <p>Default: <code>false</code>.</p>
     */

    /**
     * @name abv.UuidValidator#strict
     * @type {Boolean}
     * @description
     * <p>If this option is set to true the constraint will check if the <code>UUID</code> is formatted per the RFC's input format rules: <code>216fff40-98d9-11e3-a5e2-0800200c9a66</code>.</p>
     * <p>Default: <code>true</code>.</p>
     * <p>Setting this to false will allow alternate input formats like:</p>
     * </p>
     * <ul>
     *     <li><b>216f-ff40-98d9-11e3-a5e2-0800-200c-9a66</b></li>
     *     <li><b>{216fff40-98d9-11e3-a5e2-0800200c9a66}</b></li>
     *     <li><b>216fff4098d911e3a5e20800200c9a66</b></li>
     * </ul>
     */

    /**
     * @name abv.UuidValidator#versions
     * @type {Array}
     * @description
     * <p>This option can be used to only allow specific {@link https://en.wikipedia.org/wiki/Universally_unique_identifier#Variants_and_versions|UUID versions}.</p>
     * <p>Valid versions are <code>1</code> - <code>5</code>.</p>
     * <p>Default: <code>[1,2,3,4,5]</code>.</p>
     * <p>The following PHP constants can also be used:</p>
     * <ul>
     *     <li><b>1</b> - Date-Time and MAC address</li>
     *     <li><b>2</b> - Date-Time and MAC address, DCE security version</li>
     *     <li><b>3</b> - Namespace name-based (MD5)</li>
     *     <li><b>4</b> - Random</li>
     *     <li><b>5</b> - Namespace name-based (SHA-1)</li>
     * </ul>
     */

    var UuidValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            normalize: optionRules.normalize || 'type:{"type":"bool"}',
            versions: optionRules.versions || 'type:{"type":"array"}',
        }, lang, internal);

        // Possible versions defined by RFC 4122
        this.V1_MAC1 = 1;
        this.V2_DCE = 2;
        this.V3_MD5 = 3;
        this.V4_RANDOM = 4;
        this.V5_SHA1 = 5;

        /**
         * @private
         * @description
         * <p>Array of allowed versions (see version constants above).</p>
         * <p>All <code>UUID</code> versions are allowed by default.</p>
         * @type {Array}
         */
        this.__versions = [
            this.V1_MAC1,
            this.V2_DCE,
            this.V3_MD5,
            this.V4_RANDOM,
            this.V5_SHA1
        ];

        // The strict pattern matches UUIDs like this:
        // xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
        // Roughly speaking:
        // x = any hexadecimal character
        // M = any allowed version {1..5}
        // N = any allowed variant {8, 9, a, b}
        this.STRICT_LENGTH = 36;
        this.STRICT_FIRST_HYPHEN_POSITION = 8;
        this.STRICT_LAST_HYPHEN_POSITION = 23;
        this.STRICT_VERSION_POSITION = 14;
        this.STRICT_VARIANT_POSITION = 19;
        // The loose pattern validates similar yet non-compliant UUIDs.
        // Hyphens are completely optional. If present, they should only appear
        // between every fourth character:
        // xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx
        // xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxx-xxxx
        // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        // The value can also be wrapped with characters like []{}:
        // {xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx}
        // Neither the version nor the variant is validated by this pattern.
        this.LOOSE_MAX_LENGTH = 39;
        this.LOOSE_FIRST_HYPHEN_POSITION = 4;

        this.message = this.__options.message || 'This is not a valid UUID.';
        this.normalize = (!this.__options.normalize || false === this.__options.normalize) ? false : true;
        this.strict = (false === this.__options.strict) ? false : true;
        this.versions = (this.__checkVersions()) ? this.__options.versions : this.__versions;

        this.name = 'UuidValidator';
    };
    UuidValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    UuidValidator.prototype.constructor = UuidValidator;

    Object.defineProperty(UuidValidator.prototype, 'alias', {
        get: function () {
            return 'uuid';
        }
    });

    Object.defineProperty(UuidValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'versions',
                    'type': 'array'
                }
            ];
        }
    });

    Object.assign(UuidValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.UuidValidator#__validate
         * @description
         * <p>Validate data</p>
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

            if (true === this.strict) {
                this.__validateStrict();
            } else {
                this.__validateLoose();
            }
        },

        /**
         * @private
         * @function
         * @name abv.UuidValidator#__validateLoose
         * @description
         * <p>Validate loose.</p>
         */
        __validateLoose: function () {
            // Error priority:
            // 1. ERROR_INVALID_CHARACTERS
            // 2. ERROR_INVALID_HYPHEN_PLACEMENT
            // 3. ERROR_TOO_SHORT/ERROR_TOO_LONG
            // Trim any wrapping characters like [] or {} used by some legacy systems
            var trimmed = this.data.replace(/[|]|{|}/g,'');
            // Position of the next expected hyphen
            var h = this.LOOSE_FIRST_HYPHEN_POSITION;
            // Expected length
            var l = this.LOOSE_MAX_LENGTH;
            for (var i = 0; i < l; ++i) {
                // Check length
                if ('undefined' === typeof trimmed[i]) {
                    this.__setErrorMessage(this.message, this.__messageParameters());
                    return ;
                }
                // Hyphens must occur every fifth position
                // xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx
                //     ^    ^    ^    ^    ^    ^    ^
                if ('-' === trimmed[i]) {
                    if (i !== h) {
                        this.__setErrorMessage(this.message, this.__messageParameters());
                        return ;
                    }
                    h += 5;
                    continue;
                }
                // Missing hyphens are ignored
                if (i === h) {
                    h += 4;
                    --l;
                }
                // Check characters
                if (false === abv.isType('xdigit', trimmed[i])) {
                    this.__setErrorMessage(this.message, this.__messageParameters());
                    return ;
                }
            }
            // Check length again
            if ('undefined' !== typeof trimmed[i]) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.UuidValidator#__validateStrict
         * @description
         * <p>Validate strict.</p>
         */
        __validateStrict: function () {
            // Error priority:
            // 1. ERROR_INVALID_CHARACTERS
            // 2. ERROR_INVALID_HYPHEN_PLACEMENT
            // 3. ERROR_TOO_SHORT/ERROR_TOO_LONG
            // 4. ERROR_INVALID_VERSION
            // 5. ERROR_INVALID_VARIANT
            // Position of the next expected hyphen
            var h = this.STRICT_FIRST_HYPHEN_POSITION;
            for (var i = 0; i < this.STRICT_LENGTH; ++i) {
                // Check length
                if ('undefined' === typeof this.data[i]) {
                    this.__setErrorMessage(this.message, this.__messageParameters());
                    return ;
                }
                // Check hyphen placement
                // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
                //         ^    ^    ^    ^
                if ('-' === this.data[i]) {
                    if (i !== h) {
                        this.__setErrorMessage(this.message, this.__messageParameters());
                        return ;
                    }
                    // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
                    //                        ^
                    if (h < this.STRICT_LAST_HYPHEN_POSITION) {
                        h += 5;
                    }
                    continue;
                }
                // Check characters
                if (false === abv.isType('xdigit', this.data[i])) {
                    this.__setErrorMessage(this.message, this.__messageParameters());
                    return ;
                }
                // Missing hyphen
                if (i === h) {
                    this.__setErrorMessage(this.message, this.__messageParameters());
                    return ;
                }
            }
            // Check length again
            if ('undefined' !== typeof this.data[i]) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
            // Check version
            if (false === this.versions.includes(parseInt(this.data[this.STRICT_VERSION_POSITION]))) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
            // Check variant - first two bits must equal "10"
            //   0b10xx
            // & 0b1100 (12)
            // = 0b1000 (8)
            if (8 !== (abv.hexdec(this.data[this.STRICT_VARIANT_POSITION]) & 12)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.UuidValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
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
         * @name abv.UuidValidator#__checkVersions
         * @description
         * <p>Verification of transmitted versions.</p>
         * @returns {Boolean}
         */
        __checkVersions: function () {
            var versions = this.__options.versions;
            if (!versions || 0 === versions.length) {
               return false;
            }

            if (true === abv.isType('array', versions)) {
                for (var key in versions) {
                    if (!versions.hasOwnProperty(key)) continue;

                    if (false === this.__versions.includes(versions[key])) {
                        throw new Error('Invalid version: "' + versions[key] + '"');
                    }
                }

                return true;
            }

            return false;
        },

        /**
         * @private
         * @function
         * @name abv.UuidValidator#__messageParameters
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
        UuidValidator: UuidValidator
    };
}());

abv.registry(abv.UuidValidator);