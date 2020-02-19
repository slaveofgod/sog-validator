Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.Ipv4Validator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be an <code>IPv4</code> address.</p>
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
     * <p>Defined aliases: ['<code>ipv4</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.Ipv4Validator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    var Ipv4Validator = function (data, options, optionRules, lang, internal) {
        sogv.IpValidator.call(this, data, {
            version: 4,
            message: 'The %%attribute%% must be a valid IPv4 address.',
        }, optionRules, lang, internal);

        this.name = 'Ipv4Validator';
    };
    Ipv4Validator.prototype = Object.create(sogv.IpValidator.prototype);
    Ipv4Validator.prototype.constructor = Ipv4Validator;

    Object.defineProperty(Ipv4Validator.prototype, 'alias', {
        get: function () {
            return [
                'ipv4'
            ];
        }
    });

    Object.defineProperty(Ipv4Validator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(Ipv4Validator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.Ipv4Validator#__messageParameters
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
        Ipv4Validator: Ipv4Validator
    };
}());

sogv.registry(sogv.Ipv4Validator);