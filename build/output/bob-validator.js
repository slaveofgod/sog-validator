/*
 * Bob Validator Library v2.0 revision eb31d32
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
var abv = {version:"2.0", revision:"eb31d32", config:{}, common:{}, parseRulesFromLaravelFormat:function(rules) {
  var splitted = rules.split("|");
  var validators = {};
  for (var key in splitted) {
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
  if (null === results && "undefined" !== typeof data.name) {
    return data.name;
  }
  return results && results.length > 1 ? results[1] : "";
}, isType:function(type, data) {
  switch(type) {
    case "array":
    case "bool":
    case "boolean":
    case "callable":
    case "float":
    case "double":
    case "int":
    case "integer":
    case "null":
    case "iterable":
    case "numeric":
    case "object":
    case "real":
    case "scalar":
    case "string":
      return abv["is_" + type](data);
      break;
    case "alnum":
    case "alpha":
    case "alpha":
    case "digit":
    case "graph":
    case "lower":
    case "print":
    case "punct":
    case "space":
    case "upper":
    case "xdigit":
      return abv["ctype_" + type](data);
      break;
    case "date":
    case "datetime":
      if ("object" === typeof data && "Date" === this.getType(data)) {
        return true;
      }
      return false;
      break;
    case "date-string":
      if (false === this.isType("string", data)) {
        return false;
      }
      return Number.isNaN(Date.parse(data)) ? false : true;
      break;
  }
  return false;
}, __isType:function(type, data) {
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
      break;
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
      break;
    case "space":
      if (false === this.isType("scalar", data)) {
        return false;
      }
      return /^[\r\n\t]+$/.test(data);
      break;
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
    case "date":
    case "datetime":
      if ("object" === typeof data && "Date" === this.getType(data)) {
        return true;
      }
      return false;
      break;
    case "date-string":
      if (false === this.isType("string", data)) {
        return false;
      }
      return Number.isNaN(Date.parse(data)) ? false : true;
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
    case "not-equal-to":
      validatorObject = new abv.NotEqualToValidator(data, options, lang, internal);
      break;
    case "identical-to":
      validatorObject = new abv.IdenticalToValidator(data, options, lang, internal);
      break;
    case "not-identical-to":
      validatorObject = new abv.NotIdenticalToValidator(data, options, lang, internal);
      break;
    case "less-than":
      validatorObject = new abv.LessThanValidator(data, options, lang, internal);
      break;
    case "less-than-or-equal":
      validatorObject = new abv.LessThanOrEqualValidator(data, options, lang, internal);
      break;
    case "greater-than":
      validatorObject = new abv.GreaterThanValidator(data, options, lang, internal);
      break;
    case "greater-than-or-equal":
      validatorObject = new abv.GreaterThanOrEqualThanValidator(data, options, lang, internal);
      break;
    case "range":
      validatorObject = new abv.RangeValidator(data, options, lang, internal);
      break;
    case "divisible-by":
      validatorObject = new abv.DivisibleByValidator(data, options, lang, internal);
      break;
    case "unique":
      validatorObject = new abv.UniqueValidator(data, options, lang, internal);
      break;
    case "positive":
      validatorObject = new abv.PositiveValidator(data, options, lang, internal);
      break;
    case "positive-or-zero":
      validatorObject = new abv.PositiveOrZeroValidator(data, options, lang, internal);
      break;
    case "negative":
      validatorObject = new abv.NegativeValidator(data, options, lang, internal);
      break;
    case "negative-or-zero":
      validatorObject = new abv.NegativeOrZeroValidator(data, options, lang, internal);
      break;
  }
  return validatorObject;
}, isValid:function(data, rules, internal) {
  var engine = new abv.Application({internal:internal});
  var validator = engine.makeSingle(data, rules);
  return validator.isValid();
}, isValidWithErrorMessage:function(data, rules, internal) {
  var engine = new abv.Application({internal:internal});
  var validator = engine.makeSingle(data, rules);
  return true === validator.isValid() ? null : validator.messages().first();
}};
if (typeof exports !== "undefined") {
  exports.abv = abv;
}
;Object.assign(abv, function() {
  var AbstractValidator = function(data, options, optionRules, lang, internal) {
    var __data = data;
    this.data = __data;
    this.lang = lang || "en";
    abv.setlocale("LC_ALL", "en");
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
  }, __getName:function() {
    return this.__name;
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
    if ("object" === typeof data) {
      try {
        return JSON.stringify(data);
      } catch (e) {
        return data;
      }
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
  Object.defineProperty(Application.prototype, "name", {get:function() {
    return "Application";
  }});
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
abv.hexdec = function(hexString) {
  hexString = (hexString + "").replace(/[^a-f0-9]/gi, "");
  return parseInt(hexString, 16);
};
Object.assign(abv, function() {
  var ErrorCollection = function(options) {
    this.lang = options.lang || "en";
    this.__messages = [];
  };
  Object.defineProperty(ErrorCollection.prototype, "name", {get:function() {
    return "ErrorCollection";
  }});
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
abv.fmod = function(a, b) {
  return Number((a - Math.floor(a / b) * b).toPrecision(8));
};
abv.re = {not_string:/[^s]/, not_bool:/[^t]/, not_type:/[^T]/, not_primitive:/[^v]/, number:/[diefg]/, numeric_arg:/[bcdiefguxX]/, json:/[j]/, not_json:/[^j]/, text:/^[^\x25]+/, modulo:/^\x25{2}/, placeholder:/^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/, key:/^([a-z_][a-z_\d]*)/i, key_access:/^\.([a-z_][a-z_\d]*)/i, index_access:/^\[(\d+)\]/, sign:/^[+-]/};
abv.sprintf = function(key) {
  return abv.sprintf_format(abv.sprintf_parse(key), arguments);
};
abv.vsprintf = function(fmt, argv) {
  return abv.sprintf.apply(null, [fmt].concat(argv || []));
};
abv.sprintf_format = function(parse_tree, argv) {
  var cursor = 1, tree_length = parse_tree.length, arg, output = "", i, k, ph, pad, pad_character, pad_length, is_positive, sign;
  for (i = 0; i < tree_length; i++) {
    if (typeof parse_tree[i] === "string") {
      output += parse_tree[i];
    } else {
      if (typeof parse_tree[i] === "object") {
        ph = parse_tree[i];
        if (ph.keys) {
          arg = argv[cursor];
          for (k = 0; k < ph.keys.length; k++) {
            if (arg == undefined) {
              throw new Error(abv.sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k - 1]));
            }
            arg = arg[ph.keys[k]];
          }
        } else {
          if (ph.param_no) {
            arg = argv[ph.param_no];
          } else {
            arg = argv[cursor++];
          }
        }
        if (abv.re.not_type.test(ph.type) && abv.re.not_primitive.test(ph.type) && arg instanceof Function) {
          arg = arg();
        }
        if (abv.re.numeric_arg.test(ph.type) && (typeof arg !== "number" && isNaN(arg))) {
          throw new TypeError(abv.sprintf("[sprintf] expecting number but found %T", arg));
        }
        if (abv.re.number.test(ph.type)) {
          is_positive = arg >= 0;
        }
        switch(ph.type) {
          case "b":
            arg = parseInt(arg, 10).toString(2);
            break;
          case "c":
            arg = String.fromCharCode(parseInt(arg, 10));
            break;
          case "d":
          case "i":
            arg = parseInt(arg, 10);
            break;
          case "j":
            arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0);
            break;
          case "e":
            arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential();
            break;
          case "f":
            arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
            break;
          case "g":
            arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
            break;
          case "o":
            arg = (parseInt(arg, 10) >>> 0).toString(8);
            break;
          case "s":
            arg = String(arg);
            arg = ph.precision ? arg.substring(0, ph.precision) : arg;
            break;
          case "t":
            arg = String(!!arg);
            arg = ph.precision ? arg.substring(0, ph.precision) : arg;
            break;
          case "T":
            arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
            arg = ph.precision ? arg.substring(0, ph.precision) : arg;
            break;
          case "u":
            arg = parseInt(arg, 10) >>> 0;
            break;
          case "v":
            arg = arg.valueOf();
            arg = ph.precision ? arg.substring(0, ph.precision) : arg;
            break;
          case "x":
            arg = (parseInt(arg, 10) >>> 0).toString(16);
            break;
          case "X":
            arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
            break;
        }
        if (abv.re.json.test(ph.type)) {
          output += arg;
        } else {
          if (abv.re.number.test(ph.type) && (!is_positive || ph.sign)) {
            sign = is_positive ? "+" : "-";
            arg = arg.toString().replace(abv.re.sign, "");
          } else {
            sign = "";
          }
          pad_character = ph.pad_char ? ph.pad_char === "0" ? "0" : ph.pad_char.charAt(1) : " ";
          pad_length = ph.width - (sign + arg).length;
          pad = ph.width ? pad_length > 0 ? pad_character.repeat(pad_length) : "" : "";
          output += ph.align ? sign + arg + pad : pad_character === "0" ? sign + pad + arg : pad + sign + arg;
        }
      }
    }
  }
  return output;
};
abv.sprintf_cache = Object.create(null);
abv.sprintf_parse = function(fmt) {
  if (abv.sprintf_cache[fmt]) {
    return abv.sprintf_cache[fmt];
  }
  var _fmt = fmt, match, parse_tree = [], arg_names = 0;
  while (_fmt) {
    if ((match = abv.re.text.exec(_fmt)) !== null) {
      parse_tree.push(match[0]);
    } else {
      if ((match = abv.re.modulo.exec(_fmt)) !== null) {
        parse_tree.push("%");
      } else {
        if ((match = abv.re.placeholder.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = abv.re.key.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                if ((field_match = abv.re.key_access.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                } else {
                  if ((field_match = abv.re.index_access.exec(replacement_field)) !== null) {
                    field_list.push(field_match[1]);
                  } else {
                    throw new SyntaxError("[sprintf] failed to parse named argument key");
                  }
                }
              }
            } else {
              throw new SyntaxError("[sprintf] failed to parse named argument key");
            }
            match[2] = field_list;
          } else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
          }
          parse_tree.push({placeholder:match[0], param_no:match[1], keys:match[2], sign:match[3], pad_char:match[4], align:match[5], width:match[6], precision:match[7], type:match[8]});
        } else {
          throw new SyntaxError("[sprintf] unexpected placeholder");
        }
      }
    }
    _fmt = _fmt.substring(match[0].length);
  }
  return abv.sprintf_cache[fmt] = parse_tree;
};
abv.checkdate = function(m, d, y) {
  return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
};
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
          if (flags & supportedFlags.FILTER_FLAG_NO_PRIV_RANGE && ipv4privrange.test(data)) {
            return failure;
          }
          if (flags & supportedFlags.FILTER_FLAG_NO_RES_RANGE && ipv4resrange.test(data)) {
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
};
abv.getenv = function(varname) {
  if (typeof process !== "undefined" || !process.env || !process.env[varname]) {
    return false;
  }
  return process.env[varname];
};
abv.ini_get = function(varname) {
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.ini = $locutus.php.ini || {};
  if ($locutus.php.ini[varname] && $locutus.php.ini[varname].local_value !== undefined) {
    if ($locutus.php.ini[varname].local_value === null) {
      return "";
    }
    return $locutus.php.ini[varname].local_value;
  }
  return "";
};
abv.setlocale = function(category, locale) {
  var categ = "";
  var cats = [];
  var i = 0;
  var _copy = function _copy(orig) {
    if (orig instanceof RegExp) {
      return new RegExp(orig);
    } else {
      if (orig instanceof Date) {
        return new Date(orig);
      }
    }
    var newObj = {};
    for (var i in orig) {
      if (typeof orig[i] === "object") {
        newObj[i] = _copy(orig[i]);
      } else {
        newObj[i] = orig[i];
      }
    }
    return newObj;
  };
  var _nplurals2a = function(n) {
    return n !== 1 ? 1 : 0;
  };
  var _nplurals2b = function(n) {
    return n > 1 ? 1 : 0;
  };
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  if (!$locutus.php.locales || !$locutus.php.locales.fr_CA || !$locutus.php.locales.fr_CA.LC_TIME || !$locutus.php.locales.fr_CA.LC_TIME.x) {
    $locutus.php.locales = {};
    $locutus.php.locales.en = {"LC_COLLATE":function(str1, str2) {
      return str1 === str2 ? 0 : str1 > str2 ? 1 : -1;
    }, "LC_CTYPE":{an:/^[A-Za-z\d]+$/g, al:/^[A-Za-z]+$/g, ct:/^[\u0000-\u001F\u007F]+$/g, dg:/^[\d]+$/g, gr:/^[\u0021-\u007E]+$/g, lw:/^[a-z]+$/g, pr:/^[\u0020-\u007E]+$/g, pu:/^[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]+$/g, sp:/^[\f\n\r\t\v ]+$/g, up:/^[A-Z]+$/g, xd:/^[A-Fa-f\d]+$/g, CODESET:"UTF-8", lower:"abcdefghijklmnopqrstuvwxyz", upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"}, "LC_TIME":{a:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], A:["Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"], b:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], B:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], c:"%a %d %b %Y %r %Z", p:["AM", "PM"], P:["am", "pm"], r:"%I:%M:%S %p", x:"%m/%d/%Y", X:"%r", alt_digits:"", ERA:"", ERA_YEAR:"", ERA_D_T_FMT:"", ERA_D_FMT:"", ERA_T_FMT:""}, "LC_MONETARY":{int_curr_symbol:"USD", currency_symbol:"$", mon_decimal_point:".", 
    mon_thousands_sep:",", mon_grouping:[3], positive_sign:"", negative_sign:"-", int_frac_digits:2, frac_digits:2, p_cs_precedes:1, p_sep_by_space:0, n_cs_precedes:1, n_sep_by_space:0, p_sign_posn:3, n_sign_posn:0}, "LC_NUMERIC":{decimal_point:".", thousands_sep:",", grouping:[3]}, "LC_MESSAGES":{YESEXPR:"^[yY].*", NOEXPR:"^[nN].*", YESSTR:"", NOSTR:""}, nplurals:_nplurals2a};
    $locutus.php.locales.en_US = _copy($locutus.php.locales.en);
    $locutus.php.locales.en_US.LC_TIME.c = "%a %d %b %Y %r %Z";
    $locutus.php.locales.en_US.LC_TIME.x = "%D";
    $locutus.php.locales.en_US.LC_TIME.X = "%r";
    $locutus.php.locales.en_US.LC_MONETARY.int_curr_symbol = "USD ";
    $locutus.php.locales.en_US.LC_MONETARY.p_sign_posn = 1;
    $locutus.php.locales.en_US.LC_MONETARY.n_sign_posn = 1;
    $locutus.php.locales.en_US.LC_MONETARY.mon_grouping = [3, 3];
    $locutus.php.locales.en_US.LC_NUMERIC.thousands_sep = "";
    $locutus.php.locales.en_US.LC_NUMERIC.grouping = [];
    $locutus.php.locales.en_GB = _copy($locutus.php.locales.en);
    $locutus.php.locales.en_GB.LC_TIME.r = "%l:%M:%S %P %Z";
    $locutus.php.locales.en_AU = _copy($locutus.php.locales.en_GB);
    $locutus.php.locales.C = _copy($locutus.php.locales.en);
    $locutus.php.locales.C.LC_CTYPE.CODESET = "ANSI_X3.4-1968";
    $locutus.php.locales.C.LC_MONETARY = {int_curr_symbol:"", currency_symbol:"", mon_decimal_point:"", mon_thousands_sep:"", mon_grouping:[], p_cs_precedes:127, p_sep_by_space:127, n_cs_precedes:127, n_sep_by_space:127, p_sign_posn:127, n_sign_posn:127, positive_sign:"", negative_sign:"", int_frac_digits:127, frac_digits:127};
    $locutus.php.locales.C.LC_NUMERIC = {decimal_point:".", thousands_sep:"", grouping:[]};
    $locutus.php.locales.C.LC_TIME.c = "%a %b %e %H:%M:%S %Y";
    $locutus.php.locales.C.LC_TIME.x = "%m/%d/%y";
    $locutus.php.locales.C.LC_TIME.X = "%H:%M:%S";
    $locutus.php.locales.C.LC_MESSAGES.YESEXPR = "^[yY]";
    $locutus.php.locales.C.LC_MESSAGES.NOEXPR = "^[nN]";
    $locutus.php.locales.fr = _copy($locutus.php.locales.en);
    $locutus.php.locales.fr.nplurals = _nplurals2b;
    $locutus.php.locales.fr.LC_TIME.a = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
    $locutus.php.locales.fr.LC_TIME.A = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    $locutus.php.locales.fr.LC_TIME.b = ["jan", "f\u00e9v", "mar", "avr", "mai", "jun", "jui", "ao\u00fb", "sep", "oct", "nov", "d\u00e9c"];
    $locutus.php.locales.fr.LC_TIME.B = ["janvier", "f\u00e9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\u00fbt", "septembre", "octobre", "novembre", "d\u00e9cembre"];
    $locutus.php.locales.fr.LC_TIME.c = "%a %d %b %Y %T %Z";
    $locutus.php.locales.fr.LC_TIME.p = ["", ""];
    $locutus.php.locales.fr.LC_TIME.P = ["", ""];
    $locutus.php.locales.fr.LC_TIME.x = "%d.%m.%Y";
    $locutus.php.locales.fr.LC_TIME.X = "%T";
    $locutus.php.locales.fr_CA = _copy($locutus.php.locales.fr);
    $locutus.php.locales.fr_CA.LC_TIME.x = "%Y-%m-%d";
  }
  if (!$locutus.php.locale) {
    $locutus.php.locale = "en_US";
    if (typeof window !== "undefined" && window.document) {
      var d = window.document;
      var NS_XHTML = "https://www.w3.org/1999/xhtml";
      var NS_XML = "https://www.w3.org/XML/1998/namespace";
      if (d.getElementsByTagNameNS && d.getElementsByTagNameNS(NS_XHTML, "html")[0]) {
        if (d.getElementsByTagNameNS(NS_XHTML, "html")[0].getAttributeNS && d.getElementsByTagNameNS(NS_XHTML, "html")[0].getAttributeNS(NS_XML, "lang")) {
          $locutus.php.locale = d.getElementsByTagName(NS_XHTML, "html")[0].getAttributeNS(NS_XML, "lang");
        } else {
          if (d.getElementsByTagNameNS(NS_XHTML, "html")[0].lang) {
            $locutus.php.locale = d.getElementsByTagNameNS(NS_XHTML, "html")[0].lang;
          }
        }
      } else {
        if (d.getElementsByTagName("html")[0] && d.getElementsByTagName("html")[0].lang) {
          $locutus.php.locale = d.getElementsByTagName("html")[0].lang;
        }
      }
    }
  }
  $locutus.php.locale = $locutus.php.locale.replace("-", "_");
  if (!($locutus.php.locale in $locutus.php.locales)) {
    if ($locutus.php.locale.replace(/_[a-zA-Z]+$/, "") in $locutus.php.locales) {
      $locutus.php.locale = $locutus.php.locale.replace(/_[a-zA-Z]+$/, "");
    }
  }
  if (!$locutus.php.localeCategories) {
    $locutus.php.localeCategories = {"LC_COLLATE":$locutus.php.locale, "LC_CTYPE":$locutus.php.locale, "LC_MONETARY":$locutus.php.locale, "LC_NUMERIC":$locutus.php.locale, "LC_TIME":$locutus.php.locale, "LC_MESSAGES":$locutus.php.locale};
  }
  if (locale === null || locale === "") {
    locale = abv.getenv(category) || abv.getenv("LANG");
  } else {
    if (Object.prototype.toString.call(locale) === "[object Array]") {
      for (i = 0; i < locale.length; i++) {
        if (!(locale[i] in $locutus.php.locales)) {
          if (i === locale.length - 1) {
            return false;
          }
          continue;
        }
        locale = locale[i];
        break;
      }
    }
  }
  if (locale === "0" || locale === 0) {
    if (category === "LC_ALL") {
      for (categ in $locutus.php.localeCategories) {
        cats.push(categ + "=" + $locutus.php.localeCategories[categ]);
      }
      return cats.join(";");
    }
    return $locutus.php.localeCategories[category];
  }
  if (!(locale in $locutus.php.locales)) {
    return false;
  }
  if (category === "LC_ALL") {
    for (categ in $locutus.php.localeCategories) {
      $locutus.php.localeCategories[categ] = locale;
    }
  } else {
    $locutus.php.localeCategories[category] = locale;
  }
  return locale;
};
abv.ctype_alnum = function(text) {
  if (typeof text !== "string") {
    return false;
  }
  abv.setlocale("LC_ALL", 0);
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  var p = $locutus.php;
  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.an) !== -1;
};
abv.ctype_alpha = function(text) {
  if (typeof text !== "string") {
    return false;
  }
  abv.setlocale("LC_ALL", 0);
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  var p = $locutus.php;
  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.al) !== -1;
};
abv.ctype_cntrl = function(text) {
  if (typeof text !== "string") {
    return false;
  }
  abv.setlocale("LC_ALL", 0);
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  var p = $locutus.php;
  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.ct) !== -1;
};
abv.ctype_digit = function(text) {
  if (typeof text !== "string") {
    return false;
  }
  abv.setlocale("LC_ALL", 0);
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  var p = $locutus.php;
  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.dg) !== -1;
};
abv.ctype_graph = function(text) {
  if (typeof text !== "string") {
    return false;
  }
  abv.setlocale("LC_ALL", 0);
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  var p = $locutus.php;
  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.gr) !== -1;
};
abv.ctype_lower = function(text) {
  if (typeof text !== "string") {
    return false;
  }
  abv.setlocale("LC_ALL", 0);
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  var p = $locutus.php;
  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.lw) !== -1;
};
abv.ctype_print = function(text) {
  if (typeof text !== "string") {
    return false;
  }
  abv.setlocale("LC_ALL", 0);
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  var p = $locutus.php;
  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.pr) !== -1;
};
abv.ctype_punct = function(text) {
  if (typeof text !== "string") {
    return false;
  }
  abv.setlocale("LC_ALL", 0);
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  var p = $locutus.php;
  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.pu) !== -1;
};
abv.ctype_space = function(text) {
  if (typeof text !== "string") {
    return false;
  }
  abv.setlocale("LC_ALL", 0);
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  var p = $locutus.php;
  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.sp) !== -1;
};
abv.ctype_upper = function(text) {
  if (typeof text !== "string") {
    return false;
  }
  abv.setlocale("LC_ALL", 0);
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  var p = $locutus.php;
  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.up) !== -1;
};
abv.ctype_xdigit = function(text) {
  if (typeof text !== "string") {
    return false;
  }
  abv.setlocale("LC_ALL", 0);
  var $global = typeof window !== "undefined" ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  var p = $locutus.php;
  return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.xd) !== -1;
};
abv.is_array = function(mixedVar) {
  var _getFuncName = function(fn) {
    var name = /\W*function\s+([\w$]+)\s*\(/.exec(fn);
    if (!name) {
      return "(Anonymous)";
    }
    return name[1];
  };
  var _isArray = function(mixedVar) {
    if (!mixedVar || typeof mixedVar !== "object" || typeof mixedVar.length !== "number") {
      return false;
    }
    var len = mixedVar.length;
    mixedVar[mixedVar.length] = "bogus";
    if (len !== mixedVar.length) {
      mixedVar.length -= 1;
      return true;
    }
    delete mixedVar[mixedVar.length];
    return false;
  };
  if (!mixedVar || typeof mixedVar !== "object") {
    return false;
  }
  var isArray = _isArray(mixedVar);
  if (isArray) {
    return true;
  }
  var iniVal = (typeof require !== "undefined" ? abv.ini_get("locutus.objectsAsArrays") : undefined) || "on";
  if (iniVal === "on") {
    var asString = Object.prototype.toString.call(mixedVar);
    var asFunc = _getFuncName(mixedVar.constructor);
    if (asString === "[object Object]" && asFunc === "Object") {
      return true;
    }
  }
  return false;
};
abv.is_binary = function(vr) {
  return typeof vr === "string";
};
abv.is_bool = function(mixedVar) {
  return mixedVar === true || mixedVar === false;
};
abv.is_buffer = function(vr) {
  return typeof vr === "string";
};
abv.is_callable = function(mixedVar, syntaxOnly, callableName) {
  var $global = typeof window !== "undefined" ? window : global;
  var validJSFunctionNamePattern = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
  var name = "";
  var obj = {};
  var method = "";
  var validFunctionName = false;
  var getFuncName = function(fn) {
    var name = /\W*function\s+([\w$]+)\s*\(/.exec(fn);
    if (!name) {
      return "(Anonymous)";
    }
    return name[1];
  };
  if (/(^class|\(this,)/.test(mixedVar.toString())) {
    return false;
  }
  if (typeof mixedVar === "string") {
    obj = $global;
    method = mixedVar;
    name = mixedVar;
    validFunctionName = !!name.match(validJSFunctionNamePattern);
  } else {
    if (typeof mixedVar === "function") {
      return true;
    } else {
      if (Object.prototype.toString.call(mixedVar) === "[object Array]" && mixedVar.length === 2 && typeof mixedVar[0] === "object" && typeof mixedVar[1] === "string") {
        obj = mixedVar[0];
        method = mixedVar[1];
        name = (obj.constructor && getFuncName(obj.constructor)) + "::" + method;
      }
    }
  }
  if (syntaxOnly || typeof obj[method] === "function") {
    if (callableName) {
      $global[callableName] = name;
    }
    return true;
  }
  if (validFunctionName && typeof eval(method) === "function") {
    if (callableName) {
      $global[callableName] = name;
    }
    return true;
  }
  return false;
};
abv.is_double = function(mixedVar) {
  return abv.is_float(mixedVar);
};
abv.is_float = function is_float(mixedVar) {
  return +mixedVar === mixedVar && (!isFinite(mixedVar) || !!(mixedVar % 1));
};
abv.is_integer = function(mixedVar) {
  return abv.is_int(mixedVar);
};
abv.is_int = function(mixedVar) {
  return mixedVar === +mixedVar && isFinite(mixedVar) && !(mixedVar % 1);
};
abv.is_long = function(mixedVar) {
  return abv.is_float(mixedVar);
};
abv.is_null = function(mixedVar) {
  return mixedVar === null;
};
abv.is_numeric = function(mixedVar) {
  var whitespace = [" ", "\n", "\r", "\t", "\f", "\x0B", "\u00a0", "\u2000", "\u2001", "\u2002", "\u2003", "\u2004", "\u2005", "\u2006", "\u2007", "\u2008", "\u2009", "\u200a", "\u200b", "\u2028", "\u2029", "\u3000"].join("");
  return (typeof mixedVar === "number" || typeof mixedVar === "string" && whitespace.indexOf(mixedVar.slice(-1)) === -1) && mixedVar !== "" && !isNaN(mixedVar);
};
abv.is_object = function(mixedVar) {
  if (Object.prototype.toString.call(mixedVar) === "[object Array]") {
    return false;
  }
  return mixedVar !== null && typeof mixedVar === "object";
};
abv.is_real = function(mixedVar) {
  return abv.is_float(mixedVar);
};
abv.is_scalar = function(mixedVar) {
  return /boolean|number|string/.test(typeof mixedVar);
};
abv.is_string = function(mixedVar) {
  return typeof mixedVar === "string";
};
abv.is_unicode = function(vr) {
  if (typeof vr !== "string") {
    return false;
  }
  var arr = [];
  var highSurrogate = "[\ud800-\udbff]";
  var lowSurrogate = "[\udc00-\udfff]";
  var highSurrogateBeforeAny = new RegExp(highSurrogate + "([\\s\\S])", "g");
  var lowSurrogateAfterAny = new RegExp("([\\s\\S])" + lowSurrogate, "g");
  var singleLowSurrogate = new RegExp("^" + lowSurrogate + "$");
  var singleHighSurrogate = new RegExp("^" + highSurrogate + "$");
  while ((arr = highSurrogateBeforeAny.exec(vr)) !== null) {
    if (!arr[1] || !arr[1].match(singleLowSurrogate)) {
      return false;
    }
  }
  while ((arr = lowSurrogateAfterAny.exec(vr)) !== null) {
    if (!arr[1] || !arr[1].match(singleHighSurrogate)) {
      return false;
    }
  }
  return true;
};
abv.is_iterable = function(mixedVar) {
  return mixedVar && "function" === typeof mixedVar[Symbol.iterator] ? true : false;
};
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
  Object.defineProperty(AllValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(NotBlankValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(BlankValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(IsNullValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(NotNullValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(IsTrueValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(IsFalseValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
    abv.AbstractValidator.call(this, data, options, {type:'type:{"type":["string","array"],"any":true}', message:'length:{"min":3,"max":255}', any:'type:{"type":"boolean"}'}, lang, internal);
    this.type = this.__options.type || "string";
    this.message = this.__options.message || "This value should be of type %%type%%.";
    this.any = true === this.__options.any;
    this.__setName("TypeValidator");
    this.__invalidType = null;
  };
  TypeValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  TypeValidator.prototype.constructor = TypeValidator;
  Object.defineProperty(TypeValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(TypeValidator.prototype, {__validate:function() {
    if ("undefined" === typeof this.data) {
      return;
    }
    var types = this.type;
    if ("string" === typeof this.type) {
      types = [this.type];
    }
    if (true === this.any) {
      this.__validateAnyTypes(types);
    } else {
      this.__validateAllTypes(types);
    }
  }, __validateAllTypes:function(types) {
    for (var key in types) {
      if (!types.hasOwnProperty(key)) {
        continue;
      }
      if (false === abv.isType(types[key], this.data)) {
        this.__invalidType = types[key];
        this.__setErrorMessage(this.message, this.__messageParameters());
        return;
      }
    }
    return;
  }, __validateAnyTypes:function(types) {
    for (var key in types) {
      if (!types.hasOwnProperty(key)) {
        continue;
      }
      if (true === abv.isType(types[key], this.data)) {
        return;
      }
    }
    this.__invalidType = types[key];
    this.__setErrorMessage(this.message, this.__messageParameters());
    return;
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
  Object.defineProperty(EmailValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(LengthValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', normalize:'type:{"type":"bool"}', protocols:'type:{"type":["string","array"],"any":true}', relativeProtocol:'type:{"type":"bool"}'}, lang, internal);
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
  Object.defineProperty(UrlValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(RegexValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(IpValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(JsonValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(UuidValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
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
  Object.defineProperty(EqualToValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(EqualToValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value == comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {EqualToValidator:EqualToValidator};
}());
Object.assign(abv, function() {
  var NotEqualToValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', value:"required"}, lang, internal);
    this.message = this.__options.message || "This value should not be equal to %%compared_value%%.";
    this.__setName("NotEqualToValidator");
  };
  NotEqualToValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  NotEqualToValidator.prototype.constructor = NotEqualToValidator;
  Object.defineProperty(NotEqualToValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(NotEqualToValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value != comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {NotEqualToValidator:NotEqualToValidator};
}());
Object.assign(abv, function() {
  var IdenticalToValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', value:"required"}, lang, internal);
    this.message = this.__options.message || "This value should be identical to %%compared_value_type%% %%compared_value%%.";
    this.__setName("IdenticalToValidator");
  };
  IdenticalToValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  IdenticalToValidator.prototype.constructor = IdenticalToValidator;
  Object.defineProperty(IdenticalToValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(IdenticalToValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value === comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {IdenticalToValidator:IdenticalToValidator};
}());
Object.assign(abv, function() {
  var NotIdenticalToValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', value:"required"}, lang, internal);
    this.message = this.__options.message || "This value should not be identical to %%compared_value_type%% %%compared_value%%.";
    this.__setName("NotIdenticalToValidator");
  };
  NotIdenticalToValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  NotIdenticalToValidator.prototype.constructor = NotIdenticalToValidator;
  Object.defineProperty(NotIdenticalToValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(NotIdenticalToValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value !== comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {NotIdenticalToValidator:NotIdenticalToValidator};
}());
Object.assign(abv, function() {
  var LessThanValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', value:'required|type:{"type":["scalar","date"],"any":true}'}, lang, internal);
    this.message = this.__options.message || "This value should be less than %%compared_value%%.";
    this.__setName("LessThanValidator");
  };
  LessThanValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  LessThanValidator.prototype.constructor = LessThanValidator;
  Object.defineProperty(LessThanValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(LessThanValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value < comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {LessThanValidator:LessThanValidator};
}());
Object.assign(abv, function() {
  var LessThanOrEqualValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', value:'required|type:{"type":["scalar","date"],"any":true}'}, lang, internal);
    this.message = this.__options.message || "This value should be less than or equal to %%compared_value%%.";
    this.__setName("LessThanOrEqualValidator");
  };
  LessThanOrEqualValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  LessThanOrEqualValidator.prototype.constructor = LessThanOrEqualValidator;
  Object.defineProperty(LessThanOrEqualValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(LessThanOrEqualValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value <= comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {LessThanOrEqualValidator:LessThanOrEqualValidator};
}());
Object.assign(abv, function() {
  var GreaterThanValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', value:'required|type:{"type":["scalar","date"],"any":true}'}, lang, internal);
    this.message = this.__options.message || "This value should be greater than %%compared_value%%.";
    this.__setName("GreaterThanValidator");
  };
  GreaterThanValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  GreaterThanValidator.prototype.constructor = GreaterThanValidator;
  Object.defineProperty(GreaterThanValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(GreaterThanValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value > comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {GreaterThanValidator:GreaterThanValidator};
}());
Object.assign(abv, function() {
  var GreaterThanOrEqualThanValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', value:'required|type:{"type":["scalar","date"],"any":true}'}, lang, internal);
    this.message = this.__options.message || "This value should be greater than or equal to %%compared_value%%.";
    this.__setName("GreaterThanOrEqualThanValidator");
  };
  GreaterThanOrEqualThanValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  GreaterThanOrEqualThanValidator.prototype.constructor = GreaterThanOrEqualThanValidator;
  Object.defineProperty(GreaterThanOrEqualThanValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(GreaterThanOrEqualThanValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value >= comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {GreaterThanOrEqualThanValidator:GreaterThanOrEqualThanValidator};
}());
Object.assign(abv, function() {
  var RangeValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {invalidMessage:'length:{"min":3,"max":255}', max:'required|type:{"type":["numeric","date-string"],"any":true}', maxMessage:'length:{"min":3,"max":255}', min:'required|type:{"type":["numeric","date-string"],"any":true}', minMessage:'length:{"min":3,"max":255}', notInRangeMessage:'length:{"min":3,"max":255}'}, lang, internal);
    this.invalidMessage = this.__options.invalidMessage || "This value should be a valid number.";
    this.max = this.__options.max;
    this.maxMessage = this.__options.maxMessage || "This value should be %%limit%% or less.";
    this.min = this.__options.min;
    this.minMessage = this.__options.minMessage || "This value should be %%limit%% or more.";
    this.notInRangeMessage = this.__options.notInRangeMessage || "This value should be between %%min%% and %%max%%.";
    this.__setName("RangeValidator");
  };
  RangeValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  RangeValidator.prototype.constructor = RangeValidator;
  Object.defineProperty(RangeValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(RangeValidator.prototype, {__validate:function() {
    if ("undefined" === typeof this.data || null === this.data || "" === this.data) {
      return;
    }
    var hasLowerLimit = null !== this.min;
    var hasUpperLimit = null !== this.max;
    if (hasLowerLimit && hasUpperLimit && (this.data < this.min || this.data > this.max)) {
      this.__setErrorMessage(this.notInRangeMessage, this.__notInRangeMessageParameters());
      return;
    }
    if (hasUpperLimit && this.data > this.max) {
      this.__setErrorMessage(this.maxMessage, this.__maxMessageParameters());
      return;
    }
    if (hasLowerLimit && this.data < this.min) {
      this.__setErrorMessage(this.minMessage, this.__minMessageParameters());
      return;
    }
  }, __beforeValidate:function() {
    if ("undefined" === typeof this.data || null === this.data || "" === this.data) {
      return;
    }
    if (false === abv.isType("numeric", this.data) && false === abv.isType("date-string", this.data)) {
      this.__setErrorMessage(this.invalidMessage, this.__invalidMessageParameters());
      return;
    }
    if (false === abv.isType("numeric", this.data) && true === abv.isType("date-string", this.data)) {
      var date = new Date(this.data);
      this.data = date.getTime();
    }
    if (false === abv.isType("numeric", this.min) && true === abv.isType("date-string", this.min)) {
      var date = new Date(this.min);
      this.min = date.getTime();
    }
    if (false === abv.isType("numeric", this.max) && true === abv.isType("date-string", this.max)) {
      var date = new Date(this.max);
      this.max = date.getTime();
    }
  }, __invalidMessageParameters:function() {
    return {"value":this.data};
  }, __notInRangeMessageParameters:function() {
    return {"max":this.max, "min":this.min, "value":this.data};
  }, __maxMessageParameters:function() {
    return {"limit":this.max, "value":this.data};
  }, __minMessageParameters:function() {
    return {"limit":this.min, "value":this.data};
  }});
  return {RangeValidator:RangeValidator};
}());
Object.assign(abv, function() {
  var DivisibleByValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', value:'required|type:{"type":["scalar","date"],"any":true}'}, lang, internal);
    this.message = this.__options.message || "This value should be a multiple of %%compared_value%%.";
    this.__setName("DivisibleByValidator");
  };
  DivisibleByValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  DivisibleByValidator.prototype.constructor = DivisibleByValidator;
  Object.defineProperty(DivisibleByValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(DivisibleByValidator.prototype, {__compareValues:function(value, comparedValue) {
    if (abv.isType("integer", value) && abv.isType("integer", comparedValue)) {
      return 0 === value % comparedValue;
    }
    var remainder = abv.fmod(value, comparedValue);
    if (true === remainder) {
      return true;
    }
    return abv.sprintf("%.12e", comparedValue) === abv.sprintf("%.12e", remainder);
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {DivisibleByValidator:DivisibleByValidator};
}());
Object.assign(abv, function() {
  var UniqueValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.message = this.__options.message || "This collection should contain only unique elements.";
    this.__repeated = [];
    this.__setName("UniqueValidator");
  };
  UniqueValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  UniqueValidator.prototype.constructor = UniqueValidator;
  Object.defineProperty(UniqueValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(UniqueValidator.prototype, {__validate:function() {
    if ("undefined" === typeof this.data || null === this.data || "" === this.data) {
      return;
    }
    if (true === abv.isType("string", this.data) || true === abv.isType("array", this.data)) {
      this.__validateArray();
    }
    if (this.__repeated.length > 0) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __validateArray:function() {
    var counter = {};
    for (var i = 0; i < this.data.length; i++) {
      var key = typeof this.data[i] + " '" + this.data[i] + "'";
      if ("undefined" === typeof counter[key]) {
        counter[key] = 0;
      }
      counter[key]++;
      if (false === this.__repeated.includes(key) && counter[key] > 1) {
        this.__repeated.push(key);
      }
    }
  }, __beforeValidate:function() {
    if ("undefined" === typeof this.data || null === this.data || "" === this.data) {
      return;
    }
    var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"iterable"}', true);
    if (null !== errorMessage) {
      this.__setErrorMessage(errorMessage, {});
      return;
    }
  }, __messageParameters:function() {
    return {"value":JSON.stringify(this.__repeated)};
  }});
  return {UniqueValidator:UniqueValidator};
}());
Object.assign(abv, function() {
  var PositiveValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.value = 0;
    this.message = this.__options.message || "This value should be positive.";
    this.__setName("PositiveValidator");
  };
  PositiveValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  PositiveValidator.prototype.constructor = PositiveValidator;
  Object.defineProperty(PositiveValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(PositiveValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value > comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {PositiveValidator:PositiveValidator};
}());
Object.assign(abv, function() {
  var PositiveOrZeroValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.value = 0;
    this.message = this.__options.message || "This value should be either positive or zero.";
    this.__setName("PositiveOrZeroValidator");
  };
  PositiveOrZeroValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  PositiveOrZeroValidator.prototype.constructor = PositiveOrZeroValidator;
  Object.defineProperty(PositiveOrZeroValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(PositiveOrZeroValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value >= comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {PositiveOrZeroValidator:PositiveOrZeroValidator};
}());
Object.assign(abv, function() {
  var NegativeValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.value = 0;
    this.message = this.__options.message || "This value should be negative.";
    this.__setName("NegativeValidator");
  };
  NegativeValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  NegativeValidator.prototype.constructor = NegativeValidator;
  Object.defineProperty(NegativeValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(NegativeValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value < comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {NegativeValidator:NegativeValidator};
}());
Object.assign(abv, function() {
  var NegativeOrZeroValidator = function(data, options, lang, internal) {
    abv.AbstractComparisonValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.value = 0;
    this.message = this.__options.message || "This value should be either negative or zero.";
    this.__setName("NegativeOrZeroValidator");
  };
  NegativeOrZeroValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
  NegativeOrZeroValidator.prototype.constructor = NegativeOrZeroValidator;
  Object.defineProperty(NegativeOrZeroValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(NegativeOrZeroValidator.prototype, {__compareValues:function(value, comparedValue) {
    return value <= comparedValue;
  }, __messageParameters:function() {
    return {"value":this.data, "compared_value":this.value, "compared_value_type":abv.getType(this.value)};
  }});
  return {NegativeOrZeroValidator:NegativeOrZeroValidator};
}());


return abv;
}));

