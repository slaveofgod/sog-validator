Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.Ipv6Validator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be an <code>IPv6</code> address.</p>
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
     * <p>Defined aliases: ['<code>ipv6</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.Ipv6Validator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var Ipv6Validator = function (data, options, optionRules, lang, internal) {
        sogv.IpValidator.call(this, data, {
            version: 6,
            message: 'The %%attribute%% must be a valid IPv6 address.',
        }, optionRules, lang, internal);

        this.name = 'Ipv6Validator';
    };
    Ipv6Validator.prototype = Object.create(sogv.IpValidator.prototype);
    Ipv6Validator.prototype.constructor = Ipv6Validator;

    Object.defineProperty(Ipv6Validator.prototype, 'alias', {
        get: function () {
            return [
                'ipv6'
            ];
        }
    });

    Object.defineProperty(Ipv6Validator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(Ipv6Validator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.Ipv6Validator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value'
            }
        }
    });

    return {
        Ipv6Validator: Ipv6Validator
    };
}());

sogv.registerValidator(sogv.Ipv6Validator);