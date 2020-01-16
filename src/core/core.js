/**
 * @private
 * @function
 * @name _typeLookup
 * @description Create look up table for types
 */
var _typeLookup = function () {
    var result = { };
    var names = ["Array", "Object", "Function", "Date", "RegExp", "Float32Array"];

    for (var i = 0; i < names.length; i++)
        result["[object " + names[i] + "]"] = names[i].toLowerCase();

    return result;
}();

/**
 * @name abv
 * @namespace
 * @description Root namespace for the Bob Validator Library
 */
var abv = {
    version: "__CURRENT_SDK_VERSION__",
    revision: "__REVISION__",
    config: { },
    common: { },
    validators: { },

    /**
     * @function
     * @name abv.registry
     * @description Register validator
     * @param {Function} validator Validator
     */
    registry: function (validator) {
        var __v = [validator];
        var __validator = new __v[0](null, {}, 'en', true);
        var alias = __validator.alias;

        // Check that "alias" property exist
        if ('undefined' === typeof alias) {
            throw new Error('The validator has to have "alias" property');
        }

        // Check that the validator extend from "abv.AbstractValidator" abstract class
        if ('AbstractValidator' !== __validator.base) {
            throw new Error('The validator has to extend "abv.AbstractValidator" abstract class');
        }

        // Check that "__validate" method is implemented
        if ('undefined' === typeof __validator.__validate) {
            throw new Error('The validator has to implement "__validate" method');
        }

        // Check that alias is type of "string" or "array"
        if (
            false === abv.isType('string', alias)
            && false === abv.isType('array', alias)
        ) {
            throw new Error('The alias must be type of "string" or "array", "' + abv.getType(alias) + '" given');
        }

        if ('string' === typeof alias) {
            alias = [alias];
        }

        alias.forEach(function (element) {
            if ('undefined' === typeof abv.validators[element]) {
                abv.validators[element] = validator;
            }
        });
    },

    /**
     * @private
     * @function
     * @name abv.__parseRulesFromLaravelFormat
     * @description Parse validation rules from string (Laravel format)
     * @param {String} rules Validation rules in string format
     * @returns {Object} The roles in array format
     */
    __parseRulesFromLaravelFormat: function (rules) {
        var splitted = rules.split('|');
        var validators = {};

        for (var key in splitted) {
            if (!splitted.hasOwnProperty(key)) continue;

            var rule = splitted[key];
            var validator = rule.substring(0, rule.indexOf(';'));
            var options = {};

            if ('' === validator) {
                validator = rule;
            } else {
                rule.substring(rule.indexOf(';') + 1).split(',').map(function (element) {
                    var option = element.split(':');
                    options[option[0]] = option[1];
                });
            }

            validators[validator] = options;
        }

        return validators;
    },

    /**
     * @private
     * @function
     * @name abv.__parseRulesFromJsonFormat
     * @description Parse validation rules from string (JSON format)
     * @param {String} rules Validation rules in string format
     * @returns {Object} The roles in array format
     */
    __parseRulesFromJsonFormat: function (rules) {
        var splitted = rules.split('|');
        var validators = {};

        for (var key in splitted) {
            if (!splitted.hasOwnProperty(key)) continue;

            var rule = splitted[key];
            var validator = rule.substring(0, rule.indexOf(':'));
            var options = {};

            if ('' === validator) {
                validator = rule;
            } else {
                var rulesString = rule.substring(rule.indexOf(':') + 1);
                try {
                    options = JSON.parse(rulesString);
                } catch (e) {
                    throw new Error('Invalid JSON: "' + rulesString + '"');
                }
            }

            validators[validator] = options;
        }

        return validators;
    },

    /**
     * @function
     * @name abv.getType
     * @description Get data type
     * @param {*} data Data, which type needs to be defined
     * @returns {String}
     */
    getType: function (data) {
        var results = /function (.{1,})\(/.exec(data.constructor.toString());

        if (
            null === results
            && 'undefined' !== typeof data.name
        ) {
            return data.name;
        }

        return (results && results.length > 1) ? results[1] : "";
    },

    /**
     * @function
     * @name abv.isType
     * @description Parse validation rules from string
     * @param {String} type Type string
     * @param {*} data Data, which type needs to be checked
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
                return abv["is_" + type](data);
                break;
            case 'alnum':
            case 'alpha':
            case 'alpha':
            case 'digit':
            case 'graph':
            case 'lower':
            case 'print':
            case 'punct':
            case 'space':
            case 'upper':
            case 'xdigit':
                return abv["ctype_" + type](data);
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
     * @name abv.makeValidator
     * @description Create object of the validator
     * @param {*} data The data which needs to be validated
     * @param {String} validator Validator name
     * @param {Object} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @returns {Object} The roles in array format
     */
    makeValidator: function (data, validator, options, lang, internal) {
        if ('undefined' === typeof abv.validators[validator]) {
            throw new Error('Validator with alias "' + validator + '" is not registered');
        }

        return new abv.validators[validator](data, options, lang, internal);
    },

    /**
     * @function
     * @name abv.isValid
     * @description Check if data valid according to validation rules
     * @param {*} data The data which needs to be validated
     * @param {String} rules Validation rules in string format
     * @param {Boolean} internal It means, that validation called from core
     * @returns {Boolean} Validation status
     */
    isValid: function (data, rules, internal) {
        var engine = new abv.Application({
            internal: internal
        });

        var validator = engine.makeSingle(
            data,
            rules
        );

        return validator.isValid();
    },

    /**
     * @function
     * @name abv.isValidWithErrorMessage
     * @description Check if data valid according to validation rules
     * @param {*} data The data which needs to be validated
     * @param {String} rules Validation rules in string format
     * @param {Boolean} internal It means, that validation called from core
     * @returns {Null|String} If valid this function return null otherwise error message
     */
    isValidWithErrorMessage: function (data, rules, internal) {
        var engine = new abv.Application({
            internal: internal
        });

        var validator = engine.makeSingle(
            data,
            rules
        );

        return (true === validator.isValid()) ? null : validator.errors().first();
    }
};

if (typeof exports !== 'undefined')
    exports.abv = abv;
