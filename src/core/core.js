/**
 * @name sogv
 * @namespace
 * @description Root namespace for the SOG Validator Library
 */
var sogv = {
    version: "__CURRENT_SDK_VERSION__",
    revision: "__REVISION__",
    config: { },
    common: { },
    validators: { },

    /**
     * @function
     * @name sogv.registerValidator
     * @description
     * <p>Register validator.</p>
     * @param {Function} validator The validator.
     */
    registerValidator: function (validator) {
        var __v = [validator];
        var __validator = new __v[0](null, {}, {}, this.lang, true);
        var alias = __validator.alias;
        var options = __validator.options;

        // Check that "alias" property exist
        if ('undefined' === typeof alias) {
            throw new Error('The validator has to have "alias" property');
        }

        // Check that the validator extend from "sogv.AbstractValidator" abstract class
        if ('AbstractValidator' !== __validator.base) {
            throw new Error('The validator has to extend "sogv.AbstractValidator" abstract class');
        }

        // Check that "__validate" method is implemented
        if ('undefined' === typeof __validator.__validate) {
            throw new Error('The validator has to implement "__validate" method');
        }

        // Check that alias is type of "string" or "array"
        if (
            false === sogv.isType('string', alias)
            && false === sogv.isType('array', alias)
        ) {
            throw new Error('The alias must be type of "string" or "array", "' + sogv.getType(alias) + '" given');
        }

        // Check that options is type of "array"
        if (
            !options
            || false === sogv.isType('array', options)
        ) {
            throw new Error('The options must be type of "array", "' + sogv.getType(options) + '" given');
        }

        if ('string' === typeof alias) {
            alias = [alias];
        }

        alias.forEach(function (element) {
            if ('undefined' === typeof sogv.validators[element]) {
                sogv.validators[element] = validator;
            }
        });
    },

    /**
     * @function
     * @name sogv.getType
     * @description
     * <p>Get data type.</p>
     * @param {*} data Data, which type needs to be defined.
     * @returns {String} Data type
     */
    getType: function (data) {
        var results = null;

        try {
            results = /function (.{1,})\(/.exec(data.constructor.toString());
        } catch (e) {}

        if (
            null === results
            && 'undefined' !== typeof data
            && 'undefined' !== typeof data.name
        ) {
            return data.name;
        }

        return (results && results.length > 1) ? results[1] : typeof data;
    },

    /**
     * @function
     * @name sogv.isType
     * @description
     * <p>Parse validation rules from string.</p>
     * @param {String} type Type string.
     * @param {*} data Data, which type needs to be checked.
     * @returns {Boolean} Is correct data type.
     */
    isType: function (type, data) {
        switch (type) {
            case 'array':
            case 'bool':
            case 'boolean':
            case 'callable':
            case 'float':
            case 'double':
            case 'int':
            case 'integer':
            case 'null':
            case 'iterable':
            case 'numeric':
            case 'object':
            case 'real':
            case 'scalar':
            case 'string':
                return sogv["is_" + type](data);
                break;
            case 'alnum':
            case 'alpha':
            case 'digit':
            case 'graph':
            case 'lower':
            case 'print':
            case 'punct':
            case 'space':
            case 'upper':
            case 'xdigit':
                return sogv["ctype_" + type](data);
                break;
            case 'aldash':
                return /^[a-zA-Z0-9_-]+$/.test(data);
                break;
            case 'date':
            case 'datetime':
                if (
                    'object' === typeof data
                    && 'Date' === this.getType(data)
                ) {
                    return true;
                }
                return false;
                break;
            case 'date-string':
                if (false === this.isType('string', data)) return false;
                return Number.isNaN(Date.parse(data)) ? false : true;
                break;
        }

        return false;
    },

    /**
     * @function
     * @name sogv.makeValidator
     * @description
     * <p>Create object of the validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {String} validator Validator name.
     * @param {Object} options The setting options.
     * @param {Object} optionRules The validation rules for setting options.
     * @param {Object} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @returns {Object} The object of validator.
     */
    makeValidator: function (data, validator, options, optionRules, lang, internal) {
        if ('undefined' === typeof sogv.validators[validator]) {
            throw new Error('Validator with alias "' + validator + '" is not registered.');
        }

        return new sogv.validators[validator](data, options, optionRules, lang, internal);
    },

    /**
     * @function
     * @name sogv.isValid
     * @description
     * <p>Check if data valid according to validation rules.</p>
     * @param {*} data The data which needs to be validated.
     * @param {String} rules Validation rules in string format.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal It means, that validation called from core.
     * @returns {Boolean} Validation status.
     */
    isValid: function (data, rules, lang, internal) {
        var engine = new sogv.Application({
            internal: internal,
            lang: lang
        });

        var validator = engine.makeSingle(
            data,
            rules
        );

        return validator.isValid();
    },

    /**
     * @function
     * @name sogv.isValidWithErrorMessage
     * @description
     * <p>Check if data valid according to validation rules.</p>
     * @param {*} data The data which needs to be validated.
     * @param {String} rules Validation rules in string format.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal It means, that validation called from core.
     * @returns {Null|String} If valid this function return null otherwise error message.
     */
    isValidWithErrorMessage: function (data, rules, lang, internal) {
        var engine = new sogv.Application({
            internal: internal,
            lang: lang
        });

        var validator = engine.makeSingle(
            data,
            rules
        );

        return (true === validator.isValid()) ? null : validator.errors().first();
    },

    /**
     * @function
     * @name sogv.convertToType
     * @description Convert data to one of the type.
     * @param {*} data The data which needs to be converted
     * @param {String} strTypes Data types. (Example: 'integer|date-string')
     * @returns {*} The converted data
     */
    convertToType: function (data, strTypes) {
        var types = strTypes.split('|');

        if ('undefined' === typeof data) {
            return data;
        }

        for (var i = 0; i < types.length; i++) {
            switch (types[i]) {
                case 'array':
                    return data.split(';');
                    break;
                case 'int':
                case 'integer':
                    if (parseInt(data) == data) {
                        return parseInt(data);
                    }
                    break;
                case 'float':
                    if (parseFloat(data) == data) {
                        return parseFloat(data);
                    }
                    break;
                case 'scalar':
                    if ((data * 1) == data) {
                        return (data * 1);
                    }
                    break;
                case 'date-string':
                    if (
                        false === data.includes(';')
                        && sogv.isType('date-string', data)
                    ) {
                        return data;
                    }
                    break;
                case 'str':
                case 'string':
                    try {
                        var __data = data.toString();
                        if (
                            __data == data
                            && false === data.includes(';')
                        ) {
                            return data.toString();
                        }
                    } catch (e) {}
                    break;
                case 'boolean':
                case 'bool':
                    if (
                        "true" === data
                        || "false" === data
                        || true === data
                        || false === data
                    ) {
                        return (false === data || "false" === data) ? false : true;
                    }
                    break;
            }
        }

        return data;
    }
};

if (typeof exports !== 'undefined')
    exports.sogv = sogv;
