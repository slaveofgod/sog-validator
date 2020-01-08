/*
 * Bob Validator Library v2.0 revision 09b5980
 * Copyright 2011-2020 Bob Validator Ltd. All rights reserved.
 */
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.abv = factory();
    }
}(this, function () {

var _typeLookup = function() {
  var result = {};
  var names = ["Array", "Object", "Function", "Date", "RegExp", "Float32Array"];
  for (var i = 0; i < names.length; i++) {
    result["[object " + names[i] + "]"] = names[i].toLowerCase();
  }
  return result;
}();
var abv = {version:"2.0", revision:"09b5980", config:{}, common:{}, parseRulesFromLaravelFormat:function(rules) {
  var splitted = rules.split("|");
  var validators = {};
  for (key in splitted) {
    if (!splitted.hasOwnProperty(key)) {
      continue;
    }
    var rule = splitted[key];
    var validator = rule.substring(0, rule.indexOf(";"));
    var options = {};
    if ("" === validator) {
      validator = rule;
    } else {
      rule.substring(rule.indexOf(";") + 1).split(",").map(function(element) {
        var option = element.split(":");
        options[option[0]] = option[1];
      });
    }
    validators[validator] = options;
  }
  return validators;
}, parseRulesFromJsonFormat:function(rules) {
  var splitted = rules.split("|");
  var validators = {};
  for (var key in splitted) {
    if (!splitted.hasOwnProperty(key)) {
      continue;
    }
    var rule = splitted[key];
    var validator = rule.substring(0, rule.indexOf(":"));
    var options = {};
    if ("" === validator) {
      validator = rule;
    } else {
      var rulesString = rule.substring(rule.indexOf(":") + 1);
      try {
        options = JSON.parse(rulesString);
      } catch (e) {
        throw new Error('Invalid JSON: "' + rulesString + '"');
      }
    }
    validators[validator] = options;
  }
  return validators;
}, getType:function(data) {
  var results = /function (.{1,})\(/.exec(data.constructor.toString());
  return results && results.length > 1 ? results[1] : "";
}, isType:function(type, data) {
  switch(type) {
    case "array":
      return Array.isArray(data);
      break;
    case "bool":
    case "boolean":
      return "boolean" === typeof data;
      break;
    case "callable":
      return null !== data && "function" === typeof data;
      break;
    case "float":
    case "double":
      return Number(data) === data && data % 1 !== 0;
      break;
    case "int":
    case "integer":
      return Number(data) === data && data % 1 === 0;
      break;
    case "null":
      return null === data ? true : false;
      break;
    case "iterable":
      if (data == null) {
        return false;
      }
      return "function" === typeof data[Symbol.iterator] ? true : false;
      break;
    case "numeric":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      return /^[0-9]{0,}\.?[0-9]+$/.test(data);
      break;
    case "object":
      return "object" === typeof data ? true : false;
      break;
    case "real":
      return "number" === typeof data && !isNaN(data) && isFinite(data) ? true : false;
    case "scalar":
      return true === this.isType("integer", data) || true === this.isType("float", data) || true === this.isType("string", data) || true === this.isType("boolean", data) ? true : false;
      break;
    case "string":
      return "string" === typeof data ? true : false;
      break;
    case "alnum":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      if (null === data) {
        return false;
      }
      return /^[a-zA-Z0-9]+$/.test(data);
      break;
    case "alpha":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      if (null === data) {
        return false;
      }
      return /^[a-zA-Z]+$/.test(data);
      break;
    case "digit":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      if (null === data) {
        return false;
      }
      return /^[0-9]+$/.test(data);
      break;
    case "graph":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      return data.toString() === data.toString().replace(/[\r\n\t]/, "") ? true : false;
      break;
    case "lower":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      var matches;
      if ((matches = /[a-z]+/m.exec(data)) !== null) {
        if ("undefined" !== matches[0] && matches[0] === data) {
          return true;
        }
        return false;
      }
      return false;
      break;
    case "print":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      var regex = /[\r|\n|\t]+/mg;
      var m;
      var counter = 0;
      while ((m = regex.exec(data)) !== null) {
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        counter++;
      }
      return counter > 0 ? false : true;
      break;
    case "punct":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      return data.toString() === data.toString().replace(/[0-9a-zA-Z \r\n\t]/, "") ? true : false;
    case "space":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      return /^[\r\n\t]+$/.test(data);
    case "upper":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      var matches;
      if ((matches = /[A-Z]+/m.exec(data)) !== null) {
        if ("undefined" !== matches[0] && matches[0] === data) {
          return true;
        }
        return false;
      }
      return false;
      break;
    case "xdigit":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      return /^[A-Fa-f0-9]+$/.test(data);
      break;
    case "stringOrArray":
      if (this.isType("string", data) || this.isType("array", data)) {
        return true;
      }
      return false;
      break;
  }
  return false;
}, makeValidator:function(data, validator, options, lang, internal) {
  var validatorObject;
  switch(validator) {
    case "not-blank":
      validatorObject = new abv.NotBlankValidator(data, options, lang, internal);
      break;
    case "blank":
      validatorObject = new abv.BlankValidator(data, options, lang, internal);
      break;
    case "required":
    case "not-null":
      validatorObject = new abv.NotNullValidator(data, options, lang, internal);
      break;
    case "is-null":
    case "null":
      validatorObject = new abv.IsNullValidator(data, options, lang, internal);
      break;
    case "is-true":
    case "true":
      validatorObject = new abv.IsTrueValidator(data, options, lang, internal);
      break;
    case "is-false":
    case "false":
      validatorObject = new abv.IsFalseValidator(data, options, lang, internal);
      break;
    case "type":
      validatorObject = new abv.TypeValidator(data, options, lang, internal);
      break;
    case "email":
      validatorObject = new abv.EmailValidator(data, options, lang, internal);
      break;
    case "length":
      validatorObject = new abv.LengthValidator(data, options, lang, internal);
      break;
    case "url":
      validatorObject = new abv.UrlValidator(data, options, lang, internal);
      break;
    case "regex":
      validatorObject = new abv.RegexValidator(data, options, lang, internal);
      break;
    case "ip":
      validatorObject = new abv.IpValidator(data, options, lang, internal);
      break;
    case "json":
      validatorObject = new abv.JsonValidator(data, options, lang, internal);
      break;
    case "uuid":
      validatorObject = new abv.UuidValidator(data, options, lang, internal);
      break;
    case "equal-to":
      validatorObject = new abv.EqualToValidator(data, options, lang, internal);
      break;
  }
  return validatorObject;
}, isValid:function(data, rules, internal) {
  var engine = new abv.Application({lang:"en", internal:internal});
  var validator = engine.makeSingle(data, rules);
  return validator.isValid();
}, isValidWithErrorMessage:function(data, rules, internal) {
  var engine = new abv.Application({lang:"en", internal:internal});
  var validator = engine.makeSingle(data, rules);
  return true === validator.isValid() ? null : validator.messages().first();
}};
if (typeof exports !== "undefined") {
  exports.abv = abv;
}
;Object.assign(abv, function() {
  var AbstractValidator = function(data, options, optionRules, lang, internal) {
    this.data = data;
    this.lang = lang || "en";
    this.__options = options || {};
    this.__error = new abv.ErrorCollection({"lang":lang});
    this.__internal = true === internal;
    this.__name = null;
    if (false === this.__internal) {
      this.__validateOptions(optionRules);
    }
  };
  Object.assign(AbstractValidator.prototype, {__setName:function(name) {
    this.__name = name;
  }, isValid:function() {
    this.__beforeValidate();
    if (false === this.__hasMessages()) {
      this.__validate();
    }
    this.__afterValidate();
    return false === this.__hasMessages() ? true : false;
  }, __hasMessages:function() {
    return this.__error.has();
  }, messages:function() {
    return this.__error;
  }, __setErrorMessage:function(message, parameters) {
    this.__error.add(message, parameters);
  }, __beforeValidate:function() {
  }, __afterValidate:function() {
  }, __validateOptions:function(rules) {
    if ("undefined" === typeof rules || null === rules) {
      return;
    }
    for (var key in rules) {
      if (!rules.hasOwnProperty(key)) {
        continue;
      }
      var message = abv.isValidWithErrorMessage(this.__options[key], rules[key], true);
      if (null !== message) {
        throw new Error("[option:" + key + "]: " + message);
      }
    }
  }, __normalize:function() {
    if ("string" === typeof this.data) {
      this.data = this.data.trim();
    }
  }});
  return {AbstractValidator:AbstractValidator};
}());
Object.assign(abv, function() {
  var AbstractComparisonValidator = function(data, options, optionRules, lang, internal) {
    abv.AbstractValidator.call(this, data, options, optionRules, lang, internal);
    this.value = this.__options.value;
  };
  AbstractComparisonValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  AbstractComparisonValidator.prototype.constructor = AbstractComparisonValidator;
  Object.assign(AbstractComparisonValidator.prototype, {__validate:function() {
    if ("undefined" === typeof this.data || null === this.data || "" === this.data) {
      return;
    }
    if (false === this.__compareValues(this.__prepareDataForComparing(this.__convertDataToValueType()), this.__prepareDataForComparing(this.value))) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __prepareDataForComparing:function(data) {
    switch(abv.getType(data)) {
      case "Date":
        return data.getTime();
        break;
      case "Object":
      case "Array":
        return JSON.stringify(data);
        break;
    }
    return data;
  }, __convertDataToValueType:function() {
    if (abv.getType(this.data) === abv.getType(this.value)) {
      return this.data;
    }
    switch(abv.getType(this.value)) {
      case "Date":
        return new Date(this.data);
        break;
    }
    return this.data;
  }});
  return {AbstractComparisonValidator:AbstractComparisonValidator};
}());
Object.assign(abv, function() {
  var Application = function(options) {
    options = options || {};
    this.lang = options.lang || "en";
    this.internal = true === options.internal;
    abv.app = this;
  };
  Application.prototype.constructor = Application;
  Object.assign(Application.prototype, {make:function(rules, data) {
    var validators = {};
    for (var key in rules) {
      if (!rules.hasOwnProperty(key)) {
        continue;
      }
      validators[key] = new abv.AllValidator(data[key], rules[key], {lang:this.lang, internal:this.internal});
    }
    return validators;
  }, makeSingle:function(data, rules) {
    var validator = new abv.AllValidator(data, rules, {lang:this.lang, internal:this.internal});
    return validator;
  }});
  return {Application:Application};
}());
abv.filter_var = function(input, filter, options) {
  function is(val, type) {
    if (val == null) {
      return type === "null";
    }
    if (type === "primitive") {
      return val !== Object(val);
    }
    var actual = typeof val;
    if (actual === "object") {
      return {"[object Array]":"array", "[object RegExp]":"regex"}[Object.prototype.toString.call(val)] || "object";
    }
    if (actual === "number") {
      if (isNaN(val)) {
        return type === "nan";
      }
      if (!isFinite(val)) {
        return "inf";
      }
    }
    return type === actual;
  }
  function str2regex(str) {
  }
  function isPrimitive(val) {
    return val !== Object(val);
  }
  var supportedFilters = {FILTER_VALIDATE_INT:257, FILTER_VALIDATE_BOOLEAN:258, FILTER_VALIDATE_FLOAT:259, FILTER_VALIDATE_REGEXP:272, FILTER_VALIDATE_URL:273, FILTER_VALIDATE_EMAIL:274, FILTER_VALIDATE_IP:275, FILTER_SANITIZE_STRING:513, FILTER_SANITIZE_STRIPPED:513, FILTER_SANITIZE_ENCODED:514, FILTER_SANITIZE_SPECIAL_CHARS:515, FILTER_UNSAFE_RAW:516, FILTER_DEFAULT:516, FILTER_SANITIZE_EMAIL:517, FILTER_SANITIZE_URL:518, FILTER_SANITIZE_NUMBER_INT:519, FILTER_SANITIZE_NUMBER_FLOAT:520, FILTER_SANITIZE_MAGIC_QUOTES:521, 
  FILTER_SANITIZE_FULL_SPECIAL_CHARS:-1, FILTER_CALLBACK:1024};
  var supportedFlags = {FILTER_FLAG_ALLOW_OCTAL:1, FILTER_FLAG_ALLOW_HEX:2, FILTER_FLAG_STRIP_LOW:4, FILTER_FLAG_STRIP_HIGH:8, FILTER_FLAG_ENCODE_LOW:16, FILTER_FLAG_ENCODE_HIGH:32, FILTER_FLAG_ENCODE_AMP:64, FILTER_FLAG_NO_ENCODE_QUOTES:128, FILTER_FLAG_ALLOW_FRACTION:4096, FILTER_FLAG_ALLOW_THOUSAND:8192, FILTER_FLAG_ALLOW_SCIENTIFIC:16384, FILTER_FLAG_PATH_REQUIRED:262144, FILTER_FLAG_QUERY_REQUIRED:524288, FILTER_FLAG_IPV4:1048576, FILTER_FLAG_IPV6:2097152, FILTER_FLAG_NO_RES_RANGE:4194304, FILTER_FLAG_NO_PRIV_RANGE:8388608, 
  FILTER_NULL_ON_FAILURE:134217728};
  if (is(filter, "null")) {
    filter = supportedFilters.FILTER_DEFAULT;
  } else {
    if (is(filter, "string")) {
      filter = supportedFilters[filter];
    }
  }
  var flags = 0;
  if (is(options, "number")) {
    flags = options;
  } else {
    if (is(options, "string")) {
      flags = supportedFlags[options] || 0;
    } else {
      if (is(options, "object") && is(options.flags, "number")) {
        flags = options.flags;
      }
    }
  }
  var opts = {};
  if (is(options, "object")) {
    opts = options.options || {};
  }
  var failure = flags & supportedFlags.FILTER_NULL_ON_FAILURE ? null : false;
  if (!is(filter, "number")) {
    return failure;
  }
  if (!isPrimitive(input)) {
    return failure;
  }
  var data = is(input, "string") ? input.replace(/(^\s+)|(\s+$)/g, "") : input;
  switch(filter) {
    case supportedFilters.FILTER_VALIDATE_BOOLEAN:
      return /^(?:1|true|yes|on)$/i.test(data) || (/^(?:0|false|no|off)$/i.test(data) ? false : failure);
    case supportedFilters.FILTER_VALIDATE_INT:
      var numValue = +data;
      if (!/^(?:0|[+\-]?[1-9]\d*)$/.test(data)) {
        if (flags & supportedFlags.FILTER_FLAG_ALLOW_HEX && /^0x[\da-f]+$/i.test(data)) {
          numValue = parseInt(data, 16);
        } else {
          if (flags & supportedFlags.FILTER_FLAG_ALLOW_OCTAL && /^0[0-7]+$/.test(data)) {
            numValue = parseInt(data, 8);
          } else {
            return failure;
          }
        }
      }
      var minValue = is(opts.min_range, "number") ? opts.min_range : -Infinity;
      var maxValue = is(opts.max_range, "number") ? opts.max_range : Infinity;
      if (!is(numValue, "number") || numValue % 1 || numValue < minValue || numValue > maxValue) {
        return failure;
      }
      return numValue;
    case supportedFilters.FILTER_VALIDATE_REGEXP:
      if (is(options.regexp, "regex")) {
        var matches = options.regexp(data);
        return matches ? matches[0] : failure;
      }
    case supportedFilters.FILTER_VALIDATE_IP:
      var ipv4 = /^(25[0-5]|2[0-4]\d|[01]?\d?\d)\.(25[0-5]|2[0-4]\d|[01]?\d?\d)\.(25[0-5]|2[0-4]\d|[01]?\d?\d)\.(25[0-5]|2[0-4]\d|[01]?\d?\d)$/;
      var ipv4privrange = /^(?:0?10|172\.0?(?:1[6-9]|2\d|3[01])|192\.168)\./;
      var ipv4resrange = /^(?:0?0?0\.|127\.0?0?0\.0?0?0\.0?0?1|128\.0?0?0\.|169\.254\.|191\.255\.|192\.0?0?0\.0?0?2\.|25[0-5]\.|2[34]\d\.|22[4-9]\.)/;
      var ipv6 = /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?$/;
      var mode = supportedFlags.FILTER_FLAG_IPV4 | supportedFlags.FILTER_FLAG_IPV6;
      if (flags !== 0) {
        mode &= flags;
      }
      if (mode & supportedFlags.FILTER_FLAG_IPV4) {
        var ip = ipv4.test(input);
        if (ip) {
          if (flags & supportedFlags.FILTER_FLAG_NO_PRIV_RANGE && privrange.test(data)) {
            return failure;
          }
          if (flags & supportedFlags.FILTER_FLAG_NO_RES_RANGE && resrange.test(data)) {
            return failure;
          }
          return input;
        }
      }
      if (mode & supportedFlags.FILTER_FLAG_IPV6) {
        var ip = ipv6.test(input);
        if (ip) {
          return input;
        }
      }
      return failure;
    case supportedFilters.FILTER_CALLBACK:
      var fn = opts;
      if (is(fn, "string")) {
        fn = this.window[fn];
      }
      if (is(fn, "function")) {
        return fn(input);
      }
      return failure;
    case supportedFilters.FILTER_SANITIZE_NUMBER_INT:
      return ("" + input).replace(/[^\d+\-]/g, "");
    case supportedFilters.FILTER_SANITIZE_NUMBER_FLOAT:
      return ("" + input).replace(/[^\deE.,+\-]/g, "").replace(/[eE.,]/g, function(m) {
        return {".":filter & supportedFilters.FILTER_FLAG_ALLOW_FRACTION ? "." : "", ",":filter & supportedFilters.FILTER_FLAG_ALLOW_THOUSAND ? "," : "", "e":filter & supportedFilters.FILTER_FLAG_ALLOW_SCIENTIFIC ? "e" : "", "E":filter & supportedFilters.FILTER_FLAG_ALLOW_SCIENTIFIC ? "e" : ""}[m];
      });
    case supportedFilters.FILTER_SANITIZE_URL:
      return ("" + data).replace(/[^a-zA-Z\d$\-_.+!*'(),{}|\\\^~\[\]`<>#%";\/?:@&=]/g, "");
    case supportedFilters.FILTER_SANITIZE_EMAIL:
      return ("" + data).replace(/[^a-zA-Z\d!#$%&'*+\-\/=?\^_`{|}~@.\[\]]/g, "");
    case supportedFilters.FILTER_DEFAULT:
    case supportedFilters.FILTER_UNSAFE_RAW:
      data = input + "";
      if (flags & supportedFlags.FILTER_FLAG_ENCODE_AMP) {
        data = data.replace(/&/g, "&#38");
      }
      if ((supportedFlags.FILTER_FLAG_ENCODE_LOW | supportedFlags.FILTER_FLAG_STRIP_LOW | supportedFlags.FILTER_FLAG_ENCODE_HIGH | supportedFlags.FILTER_FLAG_STRIP_HIGH) & flags) {
        data = data.replace(/[\s\S]/g, function(c) {
          var charCode = c.charCodeAt(0);
          if (charCode < 32) {
            return flags & supportedFlags.FILTER_FLAG_STRIP_LOW ? "" : flags & supportedFlags.FILTER_FLAG_ENCODE_LOW ? "&#" + charCode : c;
          } else {
            if (charCode > 127) {
              return flags & supportedFlags.FILTER_FLAG_STRIP_HIGH ? "" : flags & supportedFlags.FILTER_FLAG_ENCODE_HIGH ? "&#" + charCode : c;
            }
          }
          return c;
        });
      }
      return data;
    default:
      return false;
  }
  return false;
};
abv.hexdec = function(hexString) {
  hexString = (hexString + "").replace(/[^a-f0-9]/gi, "");
  return parseInt(hexString, 16);
};
Object.assign(abv, function() {
  var ErrorCollection = function(options) {
    this.lang = options.lang || "en";
    this.__messages = [];
  };
  Object.assign(ErrorCollection.prototype, {has:function() {
    return this.count() > 0;
  }, add:function(message, parameters) {
    this.__messages.push({message:message, parameters:parameters});
  }, get:function(position) {
    var pos = position || 0;
    var message = this.__messages[pos];
    if (undefined !== typeof message) {
      return this.__prepare(message.message, message.parameters);
    }
    return null;
  }, first:function() {
    return this.get(0);
  }, count:function() {
    return this.__messages.length;
  }, __prepare:function(message, parameters) {
    parameters = parameters || {};
    for (var key in parameters) {
      if (!parameters.hasOwnProperty(key)) {
        continue;
      }
      message = message.replace("%%" + key + "%%", parameters[key]);
    }
    return message;
  }});
  return {ErrorCollection:ErrorCollection};
}());
Object.assign(abv, function() {
  var AllValidator = function(data, rules, options) {
    abv.AbstractValidator.call(this, data, options, null, options && options["lang"] ? options["lang"] : null, options && true === options["internal"]);
    this.rules = rules;
    this.__validatorCollection = [];
    this.__setName("AllValidator");
    this.__configure();
  };
  AllValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  AllValidator.prototype.constructor = AllValidator;
  Object.assign(AllValidator.prototype, {__configure:function() {
    var validationRules = this.rules;
    if ("string" === typeof this.rules) {
      var validationRules = abv.parseRulesFromJsonFormat(this.rules);
    }
    for (var key in validationRules) {
      if (!validationRules.hasOwnProperty(key)) {
        continue;
      }
      this.add(key, validationRules[key]);
    }
  }, add:function(name, options) {
    var validator = abv.makeValidator(this.data, name, options, this.lang, this.__internal);
    this.__validatorCollection.push(validator);
  }, __validate:function() {
    for (var key in this.__validatorCollection) {
      if (!this.__validatorCollection.hasOwnProperty(key)) {
        continue;
      }
      if (false === this.__validatorCollection[key].isValid()) {
        this.__setErrorMessage(this.__validatorCollection[key].messages().first());
        break;
      }
    }
  }});
  return {AllValidator:AllValidator};
}());
Object.assign(abv, function() {
  var NotBlankValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.allowNull = !this.__options.allowNull || false === this.__options.allowNull ? false : true;
    this.message = this.__options.message || "This value should not be blank.";
    this.normalize = !this.__options.normalize || false === this.__options.normalize ? false : true;
    this.__setName("NotBlankValidator");
  };
  NotBlankValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  NotBlankValidator.prototype.constructor = NotBlankValidator;
  Object.assign(NotBlankValidator.prototype, {__validate:function() {
    if ("string" === typeof this.data && true === this.normalize) {
      this.__normalize();
    }
    if ("undefined" === typeof this.data) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
    if (("undefined" === typeof this.data || null === this.data) && false === this.allowNull) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
    if (false === this.data) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
    if ("" === this.data) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
    if (true === Array.isArray(this.data) && 0 === this.data.length) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {NotBlankValidator:NotBlankValidator};
}());
Object.assign(abv, function() {
  var BlankValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.message = this.__options.message || "This value should be blank.";
    this.__setName("BlankValidator");
  };
  BlankValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  BlankValidator.prototype.constructor = BlankValidator;
  Object.assign(BlankValidator.prototype, {__validate:function() {
    if ("" !== this.data && null !== this.data) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {BlankValidator:BlankValidator};
}());
Object.assign(abv, function() {
  var IsNullValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.message = this.__options.message || "This value should be null.";
    this.__setName("IsNullValidator");
  };
  IsNullValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  IsNullValidator.prototype.constructor = IsNullValidator;
  Object.assign(IsNullValidator.prototype, {__validate:function() {
    if (null !== this.data) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {IsNullValidator:IsNullValidator};
}());
Object.assign(abv, function() {
  var NotNullValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.message = this.__options.message || "This value should not be null.";
    this.__setName("NotNullValidator");
  };
  NotNullValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  NotNullValidator.prototype.constructor = NotNullValidator;
  Object.assign(NotNullValidator.prototype, {__validate:function() {
    if ("undefined" === typeof this.data) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
    if (null === this.data) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {NotNullValidator:NotNullValidator};
}());
Object.assign(abv, function() {
  var IsTrueValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.message = this.__options.message || "This value should be true.";
    this.__setName("IsTrueValidator");
  };
  IsTrueValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  IsTrueValidator.prototype.constructor = IsTrueValidator;
  Object.assign(IsTrueValidator.prototype, {__validate:function() {
    if (true !== this.data && 1 !== this.data && "1" !== this.data) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {IsTrueValidator:IsTrueValidator};
}());
Object.assign(abv, function() {
  var IsFalseValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.message = this.__options.message || "This value should be false.";
    this.__setName("IsFalseValidator");
  };
  IsFalseValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  IsFalseValidator.prototype.constructor = IsFalseValidator;
  Object.assign(IsFalseValidator.prototype, {__validate:function() {
    if (false !== this.data && 0 !== this.data && "0" !== this.data) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {IsFalseValidator:IsFalseValidator};
}());
Object.assign(abv, function() {
  var TypeValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {type:'type:{"type":"stringOrArray"}', message:'length:{"min":3,"max":255}'}, lang, internal);
    this.type = this.__options.type || "string";
    this.message = this.__options.message || "This value should be of type %%type%%.";
    this.__setName("TypeValidator");
    this.__invalidType = null;
  };
  TypeValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  TypeValidator.prototype.constructor = TypeValidator;
  Object.assign(TypeValidator.prototype, {__validate:function() {
    if ("undefined" === typeof this.data) {
      return;
    }
    var types = this.type;
    if ("string" === typeof this.type) {
      types = [this.type];
    }
    for (var key in types) {
      if (!types.hasOwnProperty(key)) {
        continue;
      }
      if (false === abv.isType(types[key], this.data)) {
        this.__invalidType = types[key];
        this.__setErrorMessage(this.message, this.__messageParameters());
        break;
      }
    }
  }, __messageParameters:function() {
    return {"type":this.__invalidType, "value":this.data};
  }});
  return {TypeValidator:TypeValidator};
}());
Object.assign(abv, function() {
  var EmailValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', mode:'length:{"min":2,"max":20}', normalize:'type:{"type":"bool"}'}, lang, internal);
    this.message = this.__options.message || "This value is not a valid email address.";
    this.mode = ["loose", "strict", "html5"].includes(this.__options.mode) ? this.__options.mode : "html5";
    this.normalize = !this.__options.normalize || false === this.__options.normalize ? false : true;
    this.__patternLoose = /^.+@\S+\.\S+$/;
    this.__patternHtml5 = /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    this.__setName("EmailValidator");
  };
  EmailValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  EmailValidator.prototype.constructor = EmailValidator;
  Object.assign(EmailValidator.prototype, {__validate:function() {
    if (true === this.normalize) {
      this.__normalize();
    }
    if ("undefined" === typeof this.data || null === this.data || "" === this.data) {
      return;
    }
    switch(this.mode) {
      case "loose":
        if (false === this.__patternLoose.test(this.data)) {
          this.__setErrorMessage(this.message, this.__messageParameters());
          return;
        }
        break;
      case "strict":
        this.__setErrorMessage(this.message, this.__messageParameters());
        return;
        break;
      case "html5":
        if (false === this.__patternHtml5.test(this.data)) {
          this.__setErrorMessage(this.message, this.__messageParameters());
          return;
        }
        break;
    }
  }, __beforeValidate:function() {
    var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
    if (null !== errorMessage) {
      this.__setErrorMessage(errorMessage, {});
      return;
    }
    try {
      if ("undefined" !== typeof this.data) {
        this.data = this.data.toString();
      }
    } catch (e) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {EmailValidator:EmailValidator};
}());
Object.assign(abv, function() {
  var LengthValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {allowEmptyString:'type:{"type":"bool"}', charset:'length:{"min":2,"max":10}', charsetMessage:'length:{"min":3,"max":255}', exactMessage:'length:{"min":3,"max":255}', max:'type:{"type":"integer"}', maxMessage:'length:{"min":3,"max":255}', min:'type:{"type":"integer"}', minMessage:'length:{"min":3,"max":255}', normalize:'type:{"type":"bool"}'}, lang, internal);
    this.allowEmptyString = !this.__options.allowEmptyString || false === this.__options.allowEmptyString ? false : true;
    this.exactMessage = this.__options.exactMessage || "This value should have exactly %%limit%% characters.";
    this.max = this.__options.max;
    this.maxMessage = this.__options.maxMessage || "This value is too long. It should have %%limit%% characters or less.";
    this.min = this.__options.min;
    this.minMessage = this.__options.minMessage || "This value is too short. It should have %%limit%% characters or more.";
    this.normalize = !this.__options.normalize || false === this.__options.normalize ? false : true;
    this.__setName("LengthValidator");
  };
  LengthValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  LengthValidator.prototype.constructor = LengthValidator;
  Object.assign(LengthValidator.prototype, {__validate:function() {
    if (true === this.normalize) {
      this.__normalize();
    }
    if ("undefined" === typeof this.data || null === this.data || "" === this.data && true === this.allowEmptyString) {
      return;
    }
    var length = this.data.length;
    if (this.max && length > this.max) {
      this.__setErrorMessage(this.min == this.max ? this.exactMessage : this.maxMessage, this.min == this.max ? this.exact__messageParameters() : this.max__messageParameters());
      return;
    }
    if (this.min && length < this.min) {
      this.__setErrorMessage(this.min == this.max ? this.exactMessage : this.minMessage, this.min == this.max ? this.exact__messageParameters() : this.min__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    if (!this.min && !this.max) {
      throw new Error('Either option "min" or "max" must be given for constraint');
    }
    var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
    if (null !== errorMessage) {
      this.__setErrorMessage(errorMessage, {});
      return;
    }
    try {
      if ("undefined" !== typeof this.data) {
        this.data = this.data.toString();
      }
    } catch (e) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, exact__messageParameters:function() {
    return {"value":this.data, "limit":this.min};
  }, max__messageParameters:function() {
    return {"value":this.data, "limit":this.max};
  }, min__messageParameters:function() {
    return {"value":this.data, "limit":this.min};
  }});
  return {LengthValidator:LengthValidator};
}());
Object.assign(abv, function() {
  var UrlValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', normalize:'type:{"type":"bool"}', protocols:'type:{"type":"stringOrArray"}', relativeProtocol:'type:{"type":"bool"}'}, lang, internal);
    this.message = this.__options.message || "This value is not a valid URL.";
    this.normalize = !this.__options.normalize || false === this.__options.normalize ? false : true;
    this.protocols = this.__options.protocols || ["http", "https", "ftp"];
    this.relativeProtocol = !this.__options.relativeProtocol || false === this.__options.relativeProtocol ? false : true;
    this.__setName("UrlValidator");
    this.__pattern = "^((((%s):(?:\\/\\/)?)(?:[\\-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9\\.\\-]+|(?:www\\.|[\\-;:&=\\+\\$,\\w]+@)[A-Za-z0-9\\.\\-]+)((?:\\/[\\+~%\\/\\.\\w\\-_]*)?\\??(?:[\\-\\+=&;%@\\.\\w_]*)#?(?:[\\.\\!\\/\\\\\\w]*))?)$";
    this.__configure();
  };
  UrlValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  UrlValidator.prototype.constructor = UrlValidator;
  Object.assign(UrlValidator.prototype, {__configure:function() {
    if ("string" === typeof this.protocols) {
      this.protocols = [this.protocols];
    }
    this.__pattern = true === this.relativeProtocol ? this.__pattern.replace("(%s):", "(?:(%s):)?") : this.__pattern;
    this.__pattern = this.__pattern.replace("%s", this.protocols.join("|"));
  }, __validate:function() {
    if (true === this.normalize) {
      this.__normalize();
    }
    if ("undefined" === typeof this.data || null === this.data || "" === this.data) {
      return;
    }
    var pattern = new RegExp(this.__pattern);
    if (false === pattern.test(this.data)) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
    if (null !== errorMessage) {
      this.__setErrorMessage(errorMessage, {});
      return;
    }
    try {
      if ("undefined" !== typeof this.data) {
        this.data = this.data.toString();
      }
    } catch (e) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
    var errorMessage = abv.isValidWithErrorMessage(this.protocols, 'type:{"type":"array"}', true);
    if (null !== errorMessage) {
      this.__setErrorMessage(errorMessage, {});
      return;
    }
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {UrlValidator:UrlValidator};
}());
Object.assign(abv, function() {
  var RegexValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {match:'type:{"type": "bool"}', message:'length:{"min":3,"max":255}', pattern:"required", normalize:'type:{"type": "bool"}'}, lang, internal);
    this.match = false === this.__options.match ? false : true;
    this.message = this.__options.message || "This value is not valid.";
    this.pattern = this.__options.pattern;
    this.normalize = !this.__options.normalize || false === this.__options.normalize ? false : true;
    this.__setName("RegexValidator");
  };
  RegexValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  RegexValidator.prototype.constructor = RegexValidator;
  Object.assign(RegexValidator.prototype, {__validate:function() {
    if (true === this.normalize) {
      this.__normalize();
    }
    if ("undefined" === typeof this.data || null === this.data || "" === this.data) {
      return;
    }
    var regexp = new RegExp(this.pattern);
    if (this.match !== regexp.test(this.data)) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
    if (null !== errorMessage) {
      this.__setErrorMessage(errorMessage, {});
      return;
    }
    try {
      if ("undefined" !== typeof this.data) {
        this.data = this.data.toString();
      }
    } catch (e) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {RegexValidator:RegexValidator};
}());
Object.assign(abv, function() {
  var IpValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', normalize:'type:{"type":"bool"}', version:'length:{"min":1,"max":255}'}, lang, internal);
    this.V4 = "4";
    this.V6 = "6";
    this.ALL = "all";
    this.V4_NO_PRIV = "4_no_priv";
    this.V6_NO_PRIV = "6_no_priv";
    this.ALL_NO_PRIV = "all_no_priv";
    this.V4_NO_RES = "4_no_res";
    this.V6_NO_RES = "6_no_res";
    this.ALL_NO_RES = "all_no_res";
    this.V4_ONLY_PUBLIC = "4_public";
    this.V6_ONLY_PUBLIC = "6_public";
    this.ALL_ONLY_PUBLIC = "all_public";
    this.FILTER_VALIDATE_IP = 275;
    this.FILTER_FLAG_IPV4 = 1048576;
    this.FILTER_FLAG_IPV6 = 2097152;
    this.FILTER_FLAG_NO_PRIV_RANGE = 8388608;
    this.FILTER_FLAG_NO_RES_RANGE = 4194304;
    this.message = this.__options.message || "This is not a valid IP address.";
    this.normalize = !this.__options.normalize || false === this.__options.normalize ? false : true;
    this.version = [this.V4, this.V6, this.ALL, this.V4_NO_PRIV, this.V6_NO_PRIV, this.ALL_NO_PRIV, this.V4_NO_RES, this.V6_NO_RES, this.ALL_NO_RES, this.V4_ONLY_PUBLIC, this.V6_ONLY_PUBLIC, this.ALL_ONLY_PUBLIC].includes(this.__options.mode) ? this.__options.mode : "4";
    this.__setName("IpValidator");
  };
  IpValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  IpValidator.prototype.constructor = IpValidator;
  Object.assign(IpValidator.prototype, {__validate:function() {
    if (true === this.normalize) {
      this.__normalize();
    }
    if ("undefined" === typeof this.data || null === this.data || "" === this.data) {
      return;
    }
    var flag = null;
    switch(this.version) {
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
    if (!abv.filter_var(this.data, this.FILTER_VALIDATE_IP, flag)) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
    if (null !== errorMessage) {
      this.__setErrorMessage(errorMessage, {});
      return;
    }
    try {
      if ("undefined" !== typeof this.data) {
        this.data = this.data.toString();
      }
    } catch (e) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {IpValidator:IpValidator};
}());
Object.assign(abv, function() {
  var JsonValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.message = this.__options.message || "This value should be valid JSON.";
    this.__setName("JsonValidator");
  };
  JsonValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  JsonValidator.prototype.constructor = JsonValidator;
  Object.assign(JsonValidator.prototype, {__validate:function() {
    try {
      JSON.parse(this.data);
    } catch (e) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
    if (null !== errorMessage) {
      this.__setErrorMessage(errorMessage, {});
      return;
    }
    try {
      if ("undefined" !== typeof this.data) {
        this.data = this.data.toString();
      }
    } catch (e) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {JsonValidator:JsonValidator};
}());
Object.assign(abv, function() {
  var UuidValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', normalize:'type:{"type":"bool"}', versions:'type:{"type":"array"}'}, lang, internal);
    this.V1_MAC1 = 1;
    this.V2_DCE = 2;
    this.V3_MD5 = 3;
    this.V4_RANDOM = 4;
    this.V5_SHA1 = 5;
    this.__versions = [this.V1_MAC1, this.V2_DCE, this.V3_MD5, this.V4_RANDOM, this.V5_SHA1];
    this.STRICT_LENGTH = 36;
    this.STRICT_FIRST_HYPHEN_POSITION = 8;
    this.STRICT_LAST_HYPHEN_POSITION = 23;
    this.STRICT_VERSION_POSITION = 14;
    this.STRICT_VARIANT_POSITION = 19;
    this.LOOSE_MAX_LENGTH = 39;
    this.LOOSE_FIRST_HYPHEN_POSITION = 4;
    this.message = this.__options.message || "This is not a valid UUID.";
    this.normalize = !this.__options.normalize || false === this.__options.normalize ? false : true;
    this.strict = false === this.__options.strict ? false : true;
    this.versions = this.__checkVersions() ? this.__options.versions : this.__versions;
    this.__setName("UuidValidator");
  };
  UuidValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  UuidValidator.prototype.constructor = UuidValidator;
  Object.assign(UuidValidator.prototype, {__validate:function() {
    if (true === this.normalize) {
      this.__normalize();
    }
    if ("undefined" === typeof this.data || null === this.data || "" === this.data) {
      return;
    }
    if (true === this.strict) {
      this.__validateStrict();
    } else {
      this.__validateLoose();
    }
  }, __validateLoose:function() {
    var trimmed = this.data.replace(/[|]|{|}/g, "");
    var h = this.LOOSE_FIRST_HYPHEN_POSITION;
    var l = this.LOOSE_MAX_LENGTH;
    for (var i = 0; i < l; ++i) {
      if ("undefined" === typeof trimmed[i]) {
        this.__setErrorMessage(this.message, this.__messageParameters());
        return;
      }
      if ("-" === trimmed[i]) {
        if (i !== h) {
          this.__setErrorMessage(this.message, this.__messageParameters());
          return;
        }
        h += 5;
        continue;
      }
      if (i === h) {
        h += 4;
        --l;
      }
      if (false === abv.isType("xdigit", trimmed[i])) {
        this.__setErrorMessage(this.message, this.__messageParameters());
        return;
      }
    }
    if ("undefined" !== typeof trimmed[i]) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __validateStrict:function() {
    var h = this.STRICT_FIRST_HYPHEN_POSITION;
    for (var i = 0; i < this.STRICT_LENGTH; ++i) {
      if ("undefined" === typeof this.data[i]) {
        this.__setErrorMessage(this.message, this.__messageParameters());
        return;
      }
      if ("-" === this.data[i]) {
        if (i !== h) {
          this.__setErrorMessage(this.message, this.__messageParameters());
          return;
        }
        if (h < this.STRICT_LAST_HYPHEN_POSITION) {
          h += 5;
        }
        continue;
      }
      if (false === abv.isType("xdigit", this.data[i])) {
        this.__setErrorMessage(this.message, this.__messageParameters());
        return;
      }
      if (i === h) {
        this.__setErrorMessage(this.message, this.__messageParameters());
        return;
      }
    }
    if ("undefined" !== typeof this.data[i]) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
    if (false === this.versions.includes(parseInt(this.data[this.STRICT_VERSION_POSITION]))) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
    if (8 !== (abv.hexdec(this.data[this.STRICT_VARIANT_POSITION]) & 12)) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
    if (null !== errorMessage) {
      this.__setErrorMessage(errorMessage, {});
      return;
    }
    try {
      if ("undefined" !== typeof this.data) {
        this.data = this.data.toString();
      }
    } catch (e) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __checkVersions:function() {
    var versions = this.__options.versions;
    if (!versions || 0 === versions.length) {
      return false;
    }
    if (true === abv.isType("array", versions)) {
      for (var key in versions) {
        if (!versions.hasOwnProperty(key)) {
          continue;
        }
        if (false === this.__versions.includes(versions[key])) {
          throw new Error('Invalid version: "' + versions[key] + '"');
        }
      }
      return true;
    }
    return false;
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {UuidValidator:UuidValidator};
}());
Object.assign(abv, function() {
  var EqualToValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', value:"required"}, lang, internal);
    this.message = this.__options.message || "This value should be equal to %%compared_value%%.";
    this.__setName("EqualToValidator");
  };
  EqualToValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  EqualToValidator.prototype.constructor = EqualToValidator;
  Object.assign(EqualToValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value == comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {EqualToValidator:EqualToValidator};
}());


return abv;
}));

