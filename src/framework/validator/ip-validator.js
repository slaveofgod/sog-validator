Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IpValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is a valid IP address. By default, this will validate the value as IPv4, but a number of different options exist to validate as IPv6 and many other combinations.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal It means, that validation called from core.
     * @example
     * var validator = new abv.IpValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errorMessage();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.IpValidator#message
     * @type {String}
     * @description
     * This message is shown if the string is not a valid IP address.
     * Defaults to "This is not a valid IP address."
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
     * @name abv.IpValidator#normalize
     * @type {Boolean}
     * @description Normalizer string before validate (trim, etc.). Defaults to false.
     */

    /**
     * @name abv.IpValidator#version
     * @type {String}
     * @description
     * This determines exactly how the IP address is validated and can take one of a variety of different values.
     * Defaults to "4".
     * <br />
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

    var IpValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}',
            normalize: 'type:{"type":"bool"}',
            version: 'length:{"min":1,"max":255}'
        }, lang, internal);

        this.Ip__V4 = "4";
        this.Ip__V6 = "6"
        this.Ip__ALL = "all";
        // adds FILTER_FLAG_NO_PRIV_RANGE flag (skip private ranges)
        this.Ip__V4_NO_PRIV = "4_no_priv";
        this.Ip__V6_NO_PRIV = "6_no_priv";
        this.Ip__ALL_NO_PRIV = "all_no_priv";
        // adds FILTER_FLAG_NO_RES_RANGE flag (skip reserved ranges)
        this.Ip__V4_NO_RES = "4_no_res";
        this.Ip__V6_NO_RES = "6_no_res";
        this.Ip__ALL_NO_RES = "all_no_res";
        // adds FILTER_FLAG_NO_PRIV_RANGE and FILTER_FLAG_NO_RES_RANGE flags (skip both)
        this.Ip__V4_ONLY_PUBLIC = "4_public";
        this.Ip__V6_ONLY_PUBLIC = "6_public";
        this.Ip__ALL_ONLY_PUBLIC = "all_public";

        this.FILTER_VALIDATE_IP = 275;
        this.FILTER_FLAG_IPV4 = 1048576;
        this.FILTER_FLAG_IPV6 = 2097152;
        this.FILTER_FLAG_NO_PRIV_RANGE = 8388608;
        this.FILTER_FLAG_NO_RES_RANGE = 4194304;

        this.message = this.__options.message || 'This is not a valid IP address.';
        this.normalize = (!this.__options.normalize || false === this.__options.normalize) ? false : true;
        this.version = ([
            this.Ip__V4,
            this.Ip__V6,
            this.Ip__ALL,
            this.Ip__V4_NO_PRIV,
            this.Ip__V6_NO_PRIV,
            this.Ip__ALL_NO_PRIV,
            this.Ip__V4_NO_RES,
            this.Ip__V6_NO_RES,
            this.Ip__ALL_NO_RES,
            this.Ip__V4_ONLY_PUBLIC,
            this.Ip__V6_ONLY_PUBLIC,
            this.Ip__ALL_ONLY_PUBLIC
        ].includes(this.__options.mode)) ? this.__options.mode : '4';

        this.__setName('IpValidator');
    };
    IpValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    IpValidator.prototype.constructor = IpValidator;

    Object.assign(IpValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IpValidator#validate
         * @description Validate data
         */
        validate: function () {
            // Normalize
            if (true === this.normalize) {
                this.__normalize();
            }

            // Check if empty
            if ('undefined' === typeof this.data || null === this.data || '' === this.data) {
                return;
            }

            var flag = null;
            switch (this.version) {
                case this.Ip__V4:
                    flag = this.FILTER_FLAG_IPV4;
                    break;
                case this.Ip__V6:
                    flag = this.FILTER_FLAG_IPV6;
                    break;
                case this.Ip__V4_NO_PRIV:
                    flag = this.FILTER_FLAG_IPV4 | this.FILTER_FLAG_NO_PRIV_RANGE;
                    break;
                case this.Ip__V6_NO_PRIV:
                    flag = this.FILTER_FLAG_IPV6 | this.FILTER_FLAG_NO_PRIV_RANGE;
                    break;
                case this.Ip__ALL_NO_PRIV:
                    flag = this.FILTER_FLAG_NO_PRIV_RANGE;
                    break;
                case this.Ip__V4_NO_RES:
                    flag = this.FILTER_FLAG_IPV4 | this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                case this.Ip__V6_NO_RES:
                    flag = this.FILTER_FLAG_IPV6 | this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                case this.Ip__ALL_NO_RES:
                    flag = this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                case this.Ip__V4_ONLY_PUBLIC:
                    flag = this.FILTER_FLAG_IPV4 | this.FILTER_FLAG_NO_PRIV_RANGE | this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                case this.Ip__V6_ONLY_PUBLIC:
                    flag = this.FILTER_FLAG_IPV6 | this.FILTER_FLAG_NO_PRIV_RANGE | this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                case this.Ip__ALL_ONLY_PUBLIC:
                    flag = this.FILTER_FLAG_NO_PRIV_RANGE | this.FILTER_FLAG_NO_RES_RANGE;
                    break;
                default:
                    flag = null;
                    break;
            }

            if (!abv.filter_var(this.data, this.FILTER_VALIDATE_IP, flag)) {
                this.__setErrorMessage(this.message, this.messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.IpValidator#__beforeValidate
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
                this.__setErrorMessage(this.message, this.messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.IpValidator#messageParameters
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
        IpValidator: IpValidator
    };
}());