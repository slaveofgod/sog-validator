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


    /**
     * @private
     * @function
     * @name abv.parseRulesFromLaravelFormat
     * @description Parse validation rules from string (Laravel format)
     * @param {String} rules Validation rules in string format
     * @returns {Object} The roles in array format
     */
    parseRulesFromLaravelFormat: function (rules) {
        var splitted = rules.split('|');
        var validators = {};

        for (key in splitted) {
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
     * @name abv.parseRulesFromJsonFormat
     * @description Parse validation rules from string (JSON format)
     * @param {String} rules Validation rules in string format
     * @returns {Object} The roles in array format
     */
    parseRulesFromJsonFormat: function (rules) {
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
                return Array.isArray(data);
                break;
            case 'bool':
            case 'boolean':
                return ("boolean" === typeof data);
                break;
            case 'callable':
                return (null !== data && "function" === typeof data);
                break;
            case 'float':
            case 'double':
                return (Number(data) === data && data % 1 !== 0);
                break;
            case 'int':
            case 'integer':
                return (Number(data) === data && data % 1 === 0);
                break;
            case 'null':
                return (null === data) ? true : false;
                break;
            case 'iterable':
                // checks for null and undefined
                if (data == null) return false;
                return ('function' === typeof data[Symbol.iterator]) ? true : false;
                break;
            case 'numeric':
                if (false === this.isType('scalar', data)) return false;
                return /^[0-9]{0,}\.?[0-9]+$/.test(data);
                break;
            case 'object':
                return ('object' === typeof data) ? true : false;
                break;
            case 'real':
                return ('number' === typeof data && !isNaN(data) && isFinite(data)) ? true : false;
                break;
            case 'scalar': // Scalar variables are those containing an integer, float, string or boolean.
                return (
                    true === this.isType('integer', data)
                    || true === this.isType('float', data)
                    || true === this.isType('string', data)
                    || true === this.isType('boolean', data)
                ) ? true : false;
                break;
            case 'string':
                return ('string' === typeof data) ? true : false;
                break;
            case 'alnum':
                if (false === this.isType('scalar', data)) return false;
                if (null === data) return false;
                return /^[a-zA-Z0-9]+$/.test(data);
                break;
            case 'alpha':
                if (false === this.isType('scalar', data)) return false;
                if (null === data) return false;
                return /^[a-zA-Z]+$/.test(data);
                break;
            case 'digit':
                if (false === this.isType('scalar', data)) return false;
                if (null === data) return false;
                return /^[0-9]+$/.test(data);
                break;
            case 'graph':
                if (false === this.isType('scalar', data)) return false;
                return (data.toString() === data.toString().replace(/[\r\n\t]/, '')) ? true : false;
                break;
            case 'lower':
                if (false === this.isType('scalar', data)) return false;
                var matches;
                if ((matches = /[a-z]+/m.exec(data)) !== null) {
                    if (
                        'undefined' !== matches[0]
                        && matches[0] === data
                    ) {
                        return true;
                    }
                    return false;
                }
                return false;
                break;
            case 'print':
                if (false === this.isType('scalar', data)) return false;
                var regex = /[\r|\n|\t]+/mg;
                var m;
                var counter = 0;
                while ((m = regex.exec(data)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }

                    counter ++;
                }

                return (counter > 0) ? false : true;
                break;
            case 'punct':
                if (false === this.isType('scalar', data)) return false;
                return (data.toString() === data.toString().replace(/[0-9a-zA-Z \r\n\t]/, '')) ? true : false;
                break;
            case 'space':
                if (false === this.isType('scalar', data)) return false;
                return /^[\r\n\t]+$/.test(data);
                break;
            case 'upper':
                if (false === this.isType('scalar', data)) return false;
                var matches;
                if ((matches = /[A-Z]+/m.exec(data)) !== null) {
                    if (
                        'undefined' !== matches[0]
                        && matches[0] === data
                    ) {
                        return true;
                    }
                    return false;
                }
                return false;
                break;
            case 'xdigit':
                if (false === this.isType('scalar', data)) return false;
                return /^[A-Fa-f0-9]+$/.test(data);
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
        var validatorObject;

        switch (validator) {
            case 'not-blank':
                validatorObject = new abv.NotBlankValidator(data, options, lang, internal);
                break;
            case 'blank':
                validatorObject = new abv.BlankValidator(data, options, lang, internal);
                break;
            case 'required':
            case 'not-null':
                validatorObject = new abv.NotNullValidator(data, options, lang, internal);
                break;
            case 'is-null':
            case 'null':
                validatorObject = new abv.IsNullValidator(data, options, lang, internal);
                break;
            case 'is-true':
            case 'true':
                validatorObject = new abv.IsTrueValidator(data, options, lang, internal);
                break;
            case 'is-false':
            case 'false':
                validatorObject = new abv.IsFalseValidator(data, options, lang, internal);
                break;
            case 'type':
                validatorObject = new abv.TypeValidator(data, options, lang, internal);
                break;
            case 'email':
                validatorObject = new abv.EmailValidator(data, options, lang, internal);
                break;
            case 'length':
                validatorObject = new abv.LengthValidator(data, options, lang, internal);
                break;
            case 'url':
                validatorObject = new abv.UrlValidator(data, options, lang, internal);
                break;
            case 'regex':
                validatorObject = new abv.RegexValidator(data, options, lang, internal);
                break;
            case 'ip':
                validatorObject = new abv.IpValidator(data, options, lang, internal);
                break;
            case 'json':
                validatorObject = new abv.JsonValidator(data, options, lang, internal);
                break;
            case 'uuid':
                validatorObject = new abv.UuidValidator(data, options, lang, internal);
                break;
            case 'equal-to':
                validatorObject = new abv.EqualToValidator(data, options, lang, internal);
                break;
            case 'not-equal-to':
                validatorObject = new abv.NotEqualToValidator(data, options, lang, internal);
                break;
            case 'identical-to':
                validatorObject = new abv.IdenticalToValidator(data, options, lang, internal);
                break;
            case 'not-identical-to':
                validatorObject = new abv.NotIdenticalToValidator(data, options, lang, internal);
                break;
            case 'less-than':
                validatorObject = new abv.LessThanValidator(data, options, lang, internal);
                break;
            case 'less-than-or-equal':
                validatorObject = new abv.LessThanOrEqualValidator(data, options, lang, internal);
                break;
            case 'greater-than':
                validatorObject = new abv.GreaterThanValidator(data, options, lang, internal);
                break;
            case 'greater-than-or-equal':
                validatorObject = new abv.GreaterThanOrEqualThanValidator(data, options, lang, internal);
                break;
            case 'range':
                validatorObject = new abv.RangeValidator(data, options, lang, internal);
                break;
        }

        return validatorObject;
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
            lang: 'en',
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
            lang: 'en',
            internal: internal
        });

        var validator = engine.makeSingle(
            data,
            rules
        );

        return (true === validator.isValid()) ? null : validator.messages().first();
    }
};

if (typeof exports !== 'undefined')
    exports.abv = abv;
