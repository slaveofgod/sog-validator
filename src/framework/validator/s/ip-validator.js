Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.IpValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid IP address.</p>
     * <p>By default, this will validate the value as <code>IPv4</code>, but a number of different options exist to validate as <code>IPv6</code> and many other combinations.</p>
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
     * <p>Defined aliases: ['<code>ip</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IpValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.IpValidator#message
     * @type {String}
     * @description
     * <p>This message is shown if the string is not a valid IP address.</p>
     * <p>Default: "<code>This is not a valid IP address.</code>"</p>
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
     * @name sogv.IpValidator#normalize
     * @type {Boolean}
     * @description
     * <p>Normalizer string before validate (trim, etc.).</p>
     * <p>Default: <code>false</code>.</p>
     */

    /**
     * @name sogv.IpValidator#version
     * @type {String}
     * @description
     * <p>This determines exactly how the IP address is validated and can take one of a variety of different values.</p>
     * <p>Default: "<code>4</code>".</p>
     * <b>All ranges</b>
     * <ul>
     *     <li><b>4</b> - Validates for IPv4 addresses</li>
     *     <li><b>6</b> - Validates for IPv6 addresses</li>
     *     <li><b>all</b> - Validates all IP formats</li>
     * </ul>
     * <b>No private ranges</b>
     * <ul>
     *     <li><b>4_no_priv</b> - Validates for IPv4 but without private IP ranges</li>
     *     <li><b>6_no_priv</b> - Validates for IPv6 but without private IP ranges</li>
     *     <li><b>all_no_priv</b> - Validates for all IP formats but without private IP ranges</li>
     * </ul>
     * <b>No reserved ranges</b>
     * <ul>
     *     <li><b>4_no_res</b> - Validates for IPv4 but without reserved IP ranges</li>
     *     <li><b>6_no_res</b> - Validates for IPv6 but without reserved IP ranges</li>
     *     <li><b>all_no_res</b> - Validates for all IP formats but without reserved IP ranges</li>
     * </ul>
     * <b>Only public ranges</b>
     * <ul>
     *     <li><b>4_public</b> - Validates for IPv4 but without private and reserved ranges</li>
     *     <li><b>6_public</b> - Validates for IPv6 but without private and reserved ranges</li>
     *     <li><b>all_public</b> - Validates for all IP formats but without private and reserved ranges</li>
     * </ul>
     */

    var IpValidator = function (data, options, optionRules, lang, internal) {
        sogv.BaseValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            normalize: optionRules.normalize || 'type:{"type":"bool"}',
            version: optionRules.version || 'type:{"type":["string","numeric"],"any":true}|length:{"min":1,"max":255}'
        }, lang, internal);

        this.V4 = "4";
        this.V6 = "6"
        this.ALL = "all";
        // adds FILTER_FLAG_NO_PRIV_RANGE flag (skip private ranges)
        this.V4_NO_PRIV = "4_no_priv";
        this.V6_NO_PRIV = "6_no_priv";
        this.ALL_NO_PRIV = "all_no_priv";
        // adds FILTER_FLAG_NO_RES_RANGE flag (skip reserved ranges)
        this.V4_NO_RES = "4_no_res";
        this.V6_NO_RES = "6_no_res";
        this.ALL_NO_RES = "all_no_res";
        // adds FILTER_FLAG_NO_PRIV_RANGE and FILTER_FLAG_NO_RES_RANGE flags (skip both)
        this.V4_ONLY_PUBLIC = "4_public";
        this.V6_ONLY_PUBLIC = "6_public";
        this.ALL_ONLY_PUBLIC = "all_public";

        this.FILTER_VALIDATE_IP = 275;
        this.FILTER_FLAG_IPV4 = 1048576;
        this.FILTER_FLAG_IPV6 = 2097152;
        this.FILTER_FLAG_NO_PRIV_RANGE = 8388608;
        this.FILTER_FLAG_NO_RES_RANGE = 4194304;

        this.message = this.__options.message || 'This is not a valid IP address.';
        this.normalize = ('undefined' === typeof this.__options.normalize || false === this.__options.normalize) ? false : true;
        this.version = ([
            this.V4,
            this.V6,
            this.ALL,
            this.V4_NO_PRIV,
            this.V6_NO_PRIV,
            this.ALL_NO_PRIV,
            this.V4_NO_RES,
            this.V6_NO_RES,
            this.ALL_NO_RES,
            this.V4_ONLY_PUBLIC,
            this.V6_ONLY_PUBLIC,
            this.ALL_ONLY_PUBLIC
        ].includes(this.__options.mode)) ? this.__options.mode : '4';

        this.name = 'IpValidator';
    };
    IpValidator.prototype = Object.create(sogv.BaseValidator.prototype);
    IpValidator.prototype.constructor = IpValidator;

    Object.defineProperty(IpValidator.prototype, 'alias', {
        get: function () {
            return [
                'ip'
            ];
        }
    });

    Object.defineProperty(IpValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'version',
                    'type': 'string'
                }
            ];
        }
    });

    Object.assign(IpValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.IpValidator#__validate
         * @description
         * <p>Validate data</p>
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

            var flag = null;
            switch (this.version) {
                case this.V4:
                    flag = this.FILTER_FLAG_IPV4;
                    break;
                case this.V6:
                    flag = this.FILTER_FLAG_IPV6;
                    break;
                case this.V4_NO_PRIV:
                    flag = this.FILTER_FLAG_IPV4 | this.FILTER_FLAG_NO_PRIV_RANGE;
                    break;
                case this.V6_NO_PRIV:
                    flag = this.FILTER_FLAG_IPV6 | this.FILTER_FLAG_NO_PRIV_RANGE;
                    break;
                case this.ALL_NO_PRIV:
                    flag = this.FILTER_FLAG_NO_PRIV_RANGE;
                    break;
                case this.V4_NO_RES:
                    flag = this.FILTER_FLAG_IPV4 | this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                case this.V6_NO_RES:
                    flag = this.FILTER_FLAG_IPV6 | this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                case this.ALL_NO_RES:
                    flag = this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                case this.V4_ONLY_PUBLIC:
                    flag = this.FILTER_FLAG_IPV4 | this.FILTER_FLAG_NO_PRIV_RANGE | this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                case this.V6_ONLY_PUBLIC:
                    flag = this.FILTER_FLAG_IPV6 | this.FILTER_FLAG_NO_PRIV_RANGE | this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                case this.ALL_ONLY_PUBLIC:
                    flag = this.FILTER_FLAG_NO_PRIV_RANGE | this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                default:
                    flag = null;
                    break;
            }

            if (!sogv.filter_var(this.data, this.FILTER_VALIDATE_IP, flag)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.IpValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.<p>
         */
        __beforeValidate: function () {
            // Cancel validation if data is empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', this.lang, true);
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
         * @name sogv.IpValidator#__messageParameters
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
        IpValidator: IpValidator
    };
}());

sogv.registerValidator(sogv.IpValidator);