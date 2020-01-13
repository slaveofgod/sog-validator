/*
 * Bob Validator Library v2.0 revision 6300ce0
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
var abv = {version:"2.0", revision:"6300ce0", config:{}, common:{}, parseRulesFromLaravelFormat:function(rules) {
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
    case "date":
      validatorObject = new abv.DateValidator(data, options, lang, internal);
      break;
    case "date-time":
      validatorObject = new abv.DateTimeValidator(data, options, lang, internal);
      break;
    case "time":
      validatorObject = new abv.TimeValidator(data, options, lang, internal);
      break;
    case "timezone":
      validatorObject = new abv.TimezoneValidator(data, options, lang, internal);
      break;
    case "choice":
      validatorObject = new abv.ChoiceValidator(data, options, lang, internal);
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
    this.__options = options || {};
    this.__error = new abv.ErrorCollection({"lang":lang});
    this.__internal = true === internal;
    this.__moment = abv.moment;
    this.__name = null;
    this.__skip = false;
    this.__moment.locale(this.lang);
    abv.setlocale("LC_ALL", this.lang);
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
    if (false === this.__hasMessages() && false === this.__skip) {
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
  }, __isEmptyData:function() {
    return "undefined" === typeof this.data || null === this.data || "" === this.data;
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
abv.moment = function() {
  var hookCallback;
  function hooks() {
    return hookCallback.apply(null, arguments);
  }
  function setHookCallback(callback) {
    hookCallback = callback;
  }
  function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
  }
  function isObject(input) {
    return input != null && Object.prototype.toString.call(input) === "[object Object]";
  }
  function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
      return Object.getOwnPropertyNames(obj).length === 0;
    } else {
      var k;
      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          return false;
        }
      }
      return true;
    }
  }
  function isUndefined(input) {
    return input === void 0;
  }
  function isNumber(input) {
    return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
  }
  function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
  }
  function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
      res.push(fn(arr[i], i));
    }
    return res;
  }
  function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function extend(a, b) {
    for (var i in b) {
      if (hasOwnProp(b, i)) {
        a[i] = b[i];
      }
    }
    if (hasOwnProp(b, "toString")) {
      a.toString = b.toString;
    }
    if (hasOwnProp(b, "valueOf")) {
      a.valueOf = b.valueOf;
    }
    return a;
  }
  function createUTC(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
  }
  function defaultParsingFlags() {
    return {empty:false, unusedTokens:[], unusedInput:[], overflow:-2, charsLeftOver:0, nullInput:false, invalidMonth:null, invalidFormat:false, userInvalidated:false, iso:false, parsedDateParts:[], meridiem:null, rfc2822:false, weekdayMismatch:false};
  }
  function getParsingFlags(m) {
    if (m._pf == null) {
      m._pf = defaultParsingFlags();
    }
    return m._pf;
  }
  var some;
  if (Array.prototype.some) {
    some = Array.prototype.some;
  } else {
    some = function(fun) {
      var t = Object(this);
      var len = t.length >>> 0;
      for (var i = 0; i < len; i++) {
        if (i in t && fun.call(this, t[i], i, t)) {
          return true;
        }
      }
      return false;
    };
  }
  function isValid(m) {
    if (m._isValid == null) {
      var flags = getParsingFlags(m);
      var parsedParts = some.call(flags.parsedDateParts, function(i) {
        return i != null;
      });
      var isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
      if (m._strict) {
        isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
      }
      if (Object.isFrozen == null || !Object.isFrozen(m)) {
        m._isValid = isNowValid;
      } else {
        return isNowValid;
      }
    }
    return m._isValid;
  }
  function createInvalid(flags) {
    var m = createUTC(NaN);
    if (flags != null) {
      extend(getParsingFlags(m), flags);
    } else {
      getParsingFlags(m).userInvalidated = true;
    }
    return m;
  }
  var momentProperties = hooks.momentProperties = [];
  function copyConfig(to, from) {
    var i, prop, val;
    if (!isUndefined(from._isAMomentObject)) {
      to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
      to._i = from._i;
    }
    if (!isUndefined(from._f)) {
      to._f = from._f;
    }
    if (!isUndefined(from._l)) {
      to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
      to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
      to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
      to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
      to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
      to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
      to._locale = from._locale;
    }
    if (momentProperties.length > 0) {
      for (i = 0; i < momentProperties.length; i++) {
        prop = momentProperties[i];
        val = from[prop];
        if (!isUndefined(val)) {
          to[prop] = val;
        }
      }
    }
    return to;
  }
  var updateInProgress = false;
  function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
      this._d = new Date(NaN);
    }
    if (updateInProgress === false) {
      updateInProgress = true;
      hooks.updateOffset(this);
      updateInProgress = false;
    }
  }
  function isMoment(obj) {
    return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
  }
  function absFloor(number) {
    if (number < 0) {
      return Math.ceil(number) || 0;
    } else {
      return Math.floor(number);
    }
  }
  function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion, value = 0;
    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber);
    }
    return value;
  }
  function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
    for (i = 0; i < len; i++) {
      if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
        diffs++;
      }
    }
    return diffs + lengthDiff;
  }
  function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
      console.warn("Deprecation warning: " + msg);
    }
  }
  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function() {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(null, msg);
      }
      if (firstTime) {
        var args = [];
        var arg;
        for (var i = 0; i < arguments.length; i++) {
          arg = "";
          if (typeof arguments[i] === "object") {
            arg += "\n[" + i + "] ";
            for (var key in arguments[0]) {
              arg += key + ": " + arguments[0][key] + ", ";
            }
            arg = arg.slice(0, -2);
          } else {
            arg = arguments[i];
          }
          args.push(arg);
        }
        warn(msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + (new Error).stack);
        firstTime = false;
      }
      return fn.apply(this, arguments);
    }, fn);
  }
  var deprecations = {};
  function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
      warn(msg);
      deprecations[name] = true;
    }
  }
  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;
  function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
  }
  function set(config) {
    var prop, i;
    for (i in config) {
      prop = config[i];
      if (isFunction(prop)) {
        this[i] = prop;
      } else {
        this["_" + i] = prop;
      }
    }
    this._config = config;
    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
  }
  function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
      if (hasOwnProp(childConfig, prop)) {
        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
          res[prop] = {};
          extend(res[prop], parentConfig[prop]);
          extend(res[prop], childConfig[prop]);
        } else {
          if (childConfig[prop] != null) {
            res[prop] = childConfig[prop];
          } else {
            delete res[prop];
          }
        }
      }
    }
    for (prop in parentConfig) {
      if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
        res[prop] = extend({}, res[prop]);
      }
    }
    return res;
  }
  function Locale(config) {
    if (config != null) {
      this.set(config);
    }
  }
  var keys;
  if (Object.keys) {
    keys = Object.keys;
  } else {
    keys = function(obj) {
      var i, res = [];
      for (i in obj) {
        if (hasOwnProp(obj, i)) {
          res.push(i);
        }
      }
      return res;
    };
  }
  var defaultCalendar = {sameDay:"[Today at] LT", nextDay:"[Tomorrow at] LT", nextWeek:"dddd [at] LT", lastDay:"[Yesterday at] LT", lastWeek:"[Last] dddd [at] LT", sameElse:"L"};
  function calendar(key, mom, now) {
    var output = this._calendar[key] || this._calendar["sameElse"];
    return isFunction(output) ? output.call(mom, now) : output;
  }
  var defaultLongDateFormat = {LTS:"h:mm:ss A", LT:"h:mm A", L:"MM/DD/YYYY", LL:"MMMM D, YYYY", LLL:"MMMM D, YYYY h:mm A", LLLL:"dddd, MMMM D, YYYY h:mm A"};
  function longDateFormat(key) {
    var format = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
    if (format || !formatUpper) {
      return format;
    }
    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function(val) {
      return val.slice(1);
    });
    return this._longDateFormat[key];
  }
  var defaultInvalidDate = "Invalid date";
  function invalidDate() {
    return this._invalidDate;
  }
  var defaultOrdinal = "%d";
  var defaultDayOfMonthOrdinalParse = /\d{1,2}/;
  function ordinal(number) {
    return this._ordinal.replace("%d", number);
  }
  var defaultRelativeTime = {future:"in %s", past:"%s ago", s:"a few seconds", ss:"%d seconds", m:"a minute", mm:"%d minutes", h:"an hour", hh:"%d hours", d:"a day", dd:"%d days", M:"a month", MM:"%d months", y:"a year", yy:"%d years"};
  function relativeTime(number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
  }
  function pastFuture(diff, output) {
    var format = this._relativeTime[diff > 0 ? "future" : "past"];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }
  var aliases = {};
  function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
  }
  function normalizeUnits(units) {
    return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : undefined;
  }
  function normalizeObjectUnits(inputObject) {
    var normalizedInput = {}, normalizedProp, prop;
    for (prop in inputObject) {
      if (hasOwnProp(inputObject, prop)) {
        normalizedProp = normalizeUnits(prop);
        if (normalizedProp) {
          normalizedInput[normalizedProp] = inputObject[prop];
        }
      }
    }
    return normalizedInput;
  }
  var priorities = {};
  function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
  }
  function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
      units.push({unit:u, priority:priorities[u]});
    }
    units.sort(function(a, b) {
      return a.priority - b.priority;
    });
    return units;
  }
  function zeroFill(number, targetLength, forceSign) {
    var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign = number >= 0;
    return (sign ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
  }
  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
  var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
  var formatFunctions = {};
  var formatTokenFunctions = {};
  function addFormatToken(token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === "string") {
      func = function() {
        return this[callback]();
      };
    }
    if (token) {
      formatTokenFunctions[token] = func;
    }
    if (padded) {
      formatTokenFunctions[padded[0]] = function() {
        return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
      };
    }
    if (ordinal) {
      formatTokenFunctions[ordinal] = function() {
        return this.localeData().ordinal(func.apply(this, arguments), token);
      };
    }
  }
  function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|\]$/g, "");
    }
    return input.replace(/\\/g, "");
  }
  function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;
    for (i = 0, length = array.length; i < length; i++) {
      if (formatTokenFunctions[array[i]]) {
        array[i] = formatTokenFunctions[array[i]];
      } else {
        array[i] = removeFormattingTokens(array[i]);
      }
    }
    return function(mom) {
      var output = "", i;
      for (i = 0; i < length; i++) {
        output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
      }
      return output;
    };
  }
  function formatMoment(m, format) {
    if (!m.isValid()) {
      return m.localeData().invalidDate();
    }
    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](m);
  }
  function expandFormat(format, locale) {
    var i = 5;
    function replaceLongDateFormatTokens(input) {
      return locale.longDateFormat(input) || input;
    }
    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
      format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
      localFormattingTokens.lastIndex = 0;
      i -= 1;
    }
    return format;
  }
  var match1 = /\d/;
  var match2 = /\d\d/;
  var match3 = /\d{3}/;
  var match4 = /\d{4}/;
  var match6 = /[+-]?\d{6}/;
  var match1to2 = /\d\d?/;
  var match3to4 = /\d\d\d\d?/;
  var match5to6 = /\d\d\d\d\d\d?/;
  var match1to3 = /\d{1,3}/;
  var match1to4 = /\d{1,4}/;
  var match1to6 = /[+-]?\d{1,6}/;
  var matchUnsigned = /\d+/;
  var matchSigned = /[+-]?\d+/;
  var matchOffset = /Z|[+-]\d\d:?\d\d/gi;
  var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi;
  var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/;
  var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
  var regexes = {};
  function addRegexToken(token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function(isStrict, localeData) {
      return isStrict && strictRegex ? strictRegex : regex;
    };
  }
  function getParseRegexForToken(token, config) {
    if (!hasOwnProp(regexes, token)) {
      return new RegExp(unescapeFormat(token));
    }
    return regexes[token](config._strict, config._locale);
  }
  function unescapeFormat(s) {
    return regexEscape(s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
      return p1 || p2 || p3 || p4;
    }));
  }
  function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  var tokens = {};
  function addParseToken(token, callback) {
    var i, func = callback;
    if (typeof token === "string") {
      token = [token];
    }
    if (isNumber(callback)) {
      func = function(input, array) {
        array[callback] = toInt(input);
      };
    }
    for (i = 0; i < token.length; i++) {
      tokens[token[i]] = func;
    }
  }
  function addWeekParseToken(token, callback) {
    addParseToken(token, function(input, array, config, token) {
      config._w = config._w || {};
      callback(input, config._w, config, token);
    });
  }
  function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
      tokens[token](input, config._a, config, token);
    }
  }
  var YEAR = 0;
  var MONTH = 1;
  var DATE = 2;
  var HOUR = 3;
  var MINUTE = 4;
  var SECOND = 5;
  var MILLISECOND = 6;
  var WEEK = 7;
  var WEEKDAY = 8;
  addFormatToken("Y", 0, 0, function() {
    var y = this.year();
    return y <= 9999 ? "" + y : "+" + y;
  });
  addFormatToken(0, ["YY", 2], 0, function() {
    return this.year() % 100;
  });
  addFormatToken(0, ["YYYY", 4], 0, "year");
  addFormatToken(0, ["YYYYY", 5], 0, "year");
  addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
  addUnitAlias("year", "y");
  addUnitPriority("year", 1);
  addRegexToken("Y", matchSigned);
  addRegexToken("YY", match1to2, match2);
  addRegexToken("YYYY", match1to4, match4);
  addRegexToken("YYYYY", match1to6, match6);
  addRegexToken("YYYYYY", match1to6, match6);
  addParseToken(["YYYYY", "YYYYYY"], YEAR);
  addParseToken("YYYY", function(input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  });
  addParseToken("YY", function(input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
  });
  addParseToken("Y", function(input, array) {
    array[YEAR] = parseInt(input, 10);
  });
  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  }
  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }
  hooks.parseTwoDigitYear = function(input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  };
  var getSetYear = makeGetSet("FullYear", true);
  function getIsLeapYear() {
    return isLeapYear(this.year());
  }
  function makeGetSet(unit, keepTime) {
    return function(value) {
      if (value != null) {
        set$1(this, unit, value);
        hooks.updateOffset(this, keepTime);
        return this;
      } else {
        return get(this, unit);
      }
    };
  }
  function get(mom, unit) {
    return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
  }
  function set$1(mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
      if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
        mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value, mom.month(), daysInMonth(value, mom.month()));
      } else {
        mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
      }
    }
  }
  function stringGet(units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units]();
    }
    return this;
  }
  function stringSet(units, value) {
    if (typeof units === "object") {
      units = normalizeObjectUnits(units);
      var prioritized = getPrioritizedUnits(units);
      for (var i = 0; i < prioritized.length; i++) {
        this[prioritized[i].unit](units[prioritized[i].unit]);
      }
    } else {
      units = normalizeUnits(units);
      if (isFunction(this[units])) {
        return this[units](value);
      }
    }
    return this;
  }
  function mod(n, x) {
    return (n % x + x) % x;
  }
  var indexOf;
  if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function(o) {
      var i;
      for (i = 0; i < this.length; ++i) {
        if (this[i] === o) {
          return i;
        }
      }
      return -1;
    };
  }
  function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
      return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
  }
  addFormatToken("M", ["MM", 2], "Mo", function() {
    return this.month() + 1;
  });
  addFormatToken("MMM", 0, 0, function(format) {
    return this.localeData().monthsShort(this, format);
  });
  addFormatToken("MMMM", 0, 0, function(format) {
    return this.localeData().months(this, format);
  });
  addUnitAlias("month", "M");
  addUnitPriority("month", 8);
  addRegexToken("M", match1to2);
  addRegexToken("MM", match1to2, match2);
  addRegexToken("MMM", function(isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
  });
  addRegexToken("MMMM", function(isStrict, locale) {
    return locale.monthsRegex(isStrict);
  });
  addParseToken(["M", "MM"], function(input, array) {
    array[MONTH] = toInt(input) - 1;
  });
  addParseToken(["MMM", "MMMM"], function(input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    if (month != null) {
      array[MONTH] = month;
    } else {
      getParsingFlags(config).invalidMonth = input;
    }
  });
  var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
  var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
  function localeMonths(m, format) {
    if (!m) {
      return isArray(this._months) ? this._months : this._months["standalone"];
    }
    return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? "format" : "standalone"][m.month()];
  }
  var defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
  function localeMonthsShort(m, format) {
    if (!m) {
      return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"][m.month()];
  }
  function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
      for (i = 0; i < 12; ++i) {
        mom = createUTC([2000, i]);
        this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase();
        this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
      }
    }
    if (strict) {
      if (format === "MMM") {
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === "MMM") {
        ii = indexOf.call(this._shortMonthsParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }
  function localeMonthsParse(monthName, format, strict) {
    var i, mom, regex;
    if (this._monthsParseExact) {
      return handleStrictParse.call(this, monthName, format, strict);
    }
    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
    }
    for (i = 0; i < 12; i++) {
      mom = createUTC([2000, i]);
      if (strict && !this._longMonthsParse[i]) {
        this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
        this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i");
      }
      if (!strict && !this._monthsParse[i]) {
        regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
        this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
      }
      if (strict && format === "MMMM" && this._longMonthsParse[i].test(monthName)) {
        return i;
      } else {
        if (strict && format === "MMM" && this._shortMonthsParse[i].test(monthName)) {
          return i;
        } else {
          if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
          }
        }
      }
    }
  }
  function setMonth(mom, value) {
    var dayOfMonth;
    if (!mom.isValid()) {
      return mom;
    }
    if (typeof value === "string") {
      if (/^\d+$/.test(value)) {
        value = toInt(value);
      } else {
        value = mom.localeData().monthsParse(value);
        if (!isNumber(value)) {
          return mom;
        }
      }
    }
    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
    return mom;
  }
  function getSetMonth(value) {
    if (value != null) {
      setMonth(this, value);
      hooks.updateOffset(this, true);
      return this;
    } else {
      return get(this, "Month");
    }
  }
  function getDaysInMonth() {
    return daysInMonth(this.year(), this.month());
  }
  var defaultMonthsShortRegex = matchWord;
  function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, "_monthsRegex")) {
        computeMonthsParse.call(this);
      }
      if (isStrict) {
        return this._monthsShortStrictRegex;
      } else {
        return this._monthsShortRegex;
      }
    } else {
      if (!hasOwnProp(this, "_monthsShortRegex")) {
        this._monthsShortRegex = defaultMonthsShortRegex;
      }
      return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
  }
  var defaultMonthsRegex = matchWord;
  function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, "_monthsRegex")) {
        computeMonthsParse.call(this);
      }
      if (isStrict) {
        return this._monthsStrictRegex;
      } else {
        return this._monthsRegex;
      }
    } else {
      if (!hasOwnProp(this, "_monthsRegex")) {
        this._monthsRegex = defaultMonthsRegex;
      }
      return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
    }
  }
  function computeMonthsParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }
    var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
    for (i = 0; i < 12; i++) {
      mom = createUTC([2000, i]);
      shortPieces.push(this.monthsShort(mom, ""));
      longPieces.push(this.months(mom, ""));
      mixedPieces.push(this.months(mom, ""));
      mixedPieces.push(this.monthsShort(mom, ""));
    }
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }
    this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
    this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
  }
  function createDate(y, m, d, h, M, s, ms) {
    var date;
    if (y < 100 && y >= 0) {
      date = new Date(y + 400, m, d, h, M, s, ms);
      if (isFinite(date.getFullYear())) {
        date.setFullYear(y);
      }
    } else {
      date = new Date(y, m, d, h, M, s, ms);
    }
    return date;
  }
  function createUTCDate(y) {
    var date;
    if (y < 100 && y >= 0) {
      var args = Array.prototype.slice.call(arguments);
      args[0] = y + 400;
      date = new Date(Date.UTC.apply(null, args));
      if (isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
      }
    } else {
      date = new Date(Date.UTC.apply(null, arguments));
    }
    return date;
  }
  function firstWeekOffset(year, dow, doy) {
    var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1;
  }
  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
    if (dayOfYear <= 0) {
      resYear = year - 1;
      resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else {
      if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
      } else {
        resYear = year;
        resDayOfYear = dayOfYear;
      }
    }
    return {year:resYear, dayOfYear:resDayOfYear};
  }
  function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
    if (week < 1) {
      resYear = mom.year() - 1;
      resWeek = week + weeksInYear(resYear, dow, doy);
    } else {
      if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
      } else {
        resYear = mom.year();
        resWeek = week;
      }
    }
    return {week:resWeek, year:resYear};
  }
  function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  }
  addFormatToken("w", ["ww", 2], "wo", "week");
  addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
  addUnitAlias("week", "w");
  addUnitAlias("isoWeek", "W");
  addUnitPriority("week", 5);
  addUnitPriority("isoWeek", 5);
  addRegexToken("w", match1to2);
  addRegexToken("ww", match1to2, match2);
  addRegexToken("W", match1to2);
  addRegexToken("WW", match1to2, match2);
  addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
  });
  function localeWeek(mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
  }
  var defaultLocaleWeek = {dow:0, doy:6};
  function localeFirstDayOfWeek() {
    return this._week.dow;
  }
  function localeFirstDayOfYear() {
    return this._week.doy;
  }
  function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, "d");
  }
  function getSetISOWeek(input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, "d");
  }
  addFormatToken("d", 0, "do", "day");
  addFormatToken("dd", 0, 0, function(format) {
    return this.localeData().weekdaysMin(this, format);
  });
  addFormatToken("ddd", 0, 0, function(format) {
    return this.localeData().weekdaysShort(this, format);
  });
  addFormatToken("dddd", 0, 0, function(format) {
    return this.localeData().weekdays(this, format);
  });
  addFormatToken("e", 0, 0, "weekday");
  addFormatToken("E", 0, 0, "isoWeekday");
  addUnitAlias("day", "d");
  addUnitAlias("weekday", "e");
  addUnitAlias("isoWeekday", "E");
  addUnitPriority("day", 11);
  addUnitPriority("weekday", 11);
  addUnitPriority("isoWeekday", 11);
  addRegexToken("d", match1to2);
  addRegexToken("e", match1to2);
  addRegexToken("E", match1to2);
  addRegexToken("dd", function(isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
  });
  addRegexToken("ddd", function(isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
  });
  addRegexToken("dddd", function(isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
  });
  addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    if (weekday != null) {
      week.d = weekday;
    } else {
      getParsingFlags(config).invalidWeekday = input;
    }
  });
  addWeekParseToken(["d", "e", "E"], function(input, week, config, token) {
    week[token] = toInt(input);
  });
  function parseWeekday(input, locale) {
    if (typeof input !== "string") {
      return input;
    }
    if (!isNaN(input)) {
      return parseInt(input, 10);
    }
    input = locale.weekdaysParse(input);
    if (typeof input === "number") {
      return input;
    }
    return null;
  }
  function parseIsoWeekday(input, locale) {
    if (typeof input === "string") {
      return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
  }
  function shiftWeekdays(ws, n) {
    return ws.slice(n, 7).concat(ws.slice(0, n));
  }
  var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
  function localeWeekdays(m, format) {
    var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? "format" : "standalone"];
    return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
  }
  var defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
  function localeWeekdaysShort(m) {
    return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
  }
  var defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
  function localeWeekdaysMin(m) {
    return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
  }
  function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];
      for (i = 0; i < 7; ++i) {
        mom = createUTC([2000, 1]).day(i);
        this._minWeekdaysParse[i] = this.weekdaysMin(mom, "").toLocaleLowerCase();
        this._shortWeekdaysParse[i] = this.weekdaysShort(mom, "").toLocaleLowerCase();
        this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
      }
    }
    if (strict) {
      if (format === "dddd") {
        ii = indexOf.call(this._weekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        if (format === "ddd") {
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        }
      }
    } else {
      if (format === "dddd") {
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        if (format === "ddd") {
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._minWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        }
      }
    }
  }
  function localeWeekdaysParse(weekdayName, format, strict) {
    var i, mom, regex;
    if (this._weekdaysParseExact) {
      return handleStrictParse$1.call(this, weekdayName, format, strict);
    }
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = [];
    }
    for (i = 0; i < 7; i++) {
      mom = createUTC([2000, 1]).day(i);
      if (strict && !this._fullWeekdaysParse[i]) {
        this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(mom, "").replace(".", "\\.?") + "$", "i");
        this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$", "i");
        this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$", "i");
      }
      if (!this._weekdaysParse[i]) {
        regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
        this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
      }
      if (strict && format === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else {
        if (strict && format === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
          return i;
        } else {
          if (strict && format === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else {
            if (!strict && this._weekdaysParse[i].test(weekdayName)) {
              return i;
            }
          }
        }
      }
    }
  }
  function getSetDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
      input = parseWeekday(input, this.localeData());
      return this.add(input - day, "d");
    } else {
      return day;
    }
  }
  function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, "d");
  }
  function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    if (input != null) {
      var weekday = parseIsoWeekday(input, this.localeData());
      return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
      return this.day() || 7;
    }
  }
  var defaultWeekdaysRegex = matchWord;
  function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysStrictRegex;
      } else {
        return this._weekdaysRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        this._weekdaysRegex = defaultWeekdaysRegex;
      }
      return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
  }
  var defaultWeekdaysShortRegex = matchWord;
  function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysShortStrictRegex;
      } else {
        return this._weekdaysShortRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysShortRegex")) {
        this._weekdaysShortRegex = defaultWeekdaysShortRegex;
      }
      return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
  }
  var defaultWeekdaysMinRegex = matchWord;
  function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysMinStrictRegex;
      } else {
        return this._weekdaysMinRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysMinRegex")) {
        this._weekdaysMinRegex = defaultWeekdaysMinRegex;
      }
      return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
  }
  function computeWeekdaysParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }
    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
      mom = createUTC([2000, 1]).day(i);
      minp = this.weekdaysMin(mom, "");
      shortp = this.weekdaysShort(mom, "");
      longp = this.weekdays(mom, "");
      minPieces.push(minp);
      shortPieces.push(shortp);
      longPieces.push(longp);
      mixedPieces.push(minp);
      mixedPieces.push(shortp);
      mixedPieces.push(longp);
    }
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }
    this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
    this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
    this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join("|") + ")", "i");
  }
  function hFormat() {
    return this.hours() % 12 || 12;
  }
  function kFormat() {
    return this.hours() || 24;
  }
  addFormatToken("H", ["HH", 2], 0, "hour");
  addFormatToken("h", ["hh", 2], 0, hFormat);
  addFormatToken("k", ["kk", 2], 0, kFormat);
  addFormatToken("hmm", 0, 0, function() {
    return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  });
  addFormatToken("hmmss", 0, 0, function() {
    return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });
  addFormatToken("Hmm", 0, 0, function() {
    return "" + this.hours() + zeroFill(this.minutes(), 2);
  });
  addFormatToken("Hmmss", 0, 0, function() {
    return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });
  function meridiem(token, lowercase) {
    addFormatToken(token, 0, 0, function() {
      return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
  }
  meridiem("a", true);
  meridiem("A", false);
  addUnitAlias("hour", "h");
  addUnitPriority("hour", 13);
  function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
  }
  addRegexToken("a", matchMeridiem);
  addRegexToken("A", matchMeridiem);
  addRegexToken("H", match1to2);
  addRegexToken("h", match1to2);
  addRegexToken("k", match1to2);
  addRegexToken("HH", match1to2, match2);
  addRegexToken("hh", match1to2, match2);
  addRegexToken("kk", match1to2, match2);
  addRegexToken("hmm", match3to4);
  addRegexToken("hmmss", match5to6);
  addRegexToken("Hmm", match3to4);
  addRegexToken("Hmmss", match5to6);
  addParseToken(["H", "HH"], HOUR);
  addParseToken(["k", "kk"], function(input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
  });
  addParseToken(["a", "A"], function(input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
  });
  addParseToken(["h", "hh"], function(input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
  });
  addParseToken("hmm", function(input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken("hmmss", function(input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken("Hmm", function(input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
  });
  addParseToken("Hmmss", function(input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
  });
  function localeIsPM(input) {
    return (input + "").toLowerCase().charAt(0) === "p";
  }
  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
  function localeMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? "pm" : "PM";
    } else {
      return isLower ? "am" : "AM";
    }
  }
  var getSetHour = makeGetSet("Hours", true);
  var baseConfig = {calendar:defaultCalendar, longDateFormat:defaultLongDateFormat, invalidDate:defaultInvalidDate, ordinal:defaultOrdinal, dayOfMonthOrdinalParse:defaultDayOfMonthOrdinalParse, relativeTime:defaultRelativeTime, months:defaultLocaleMonths, monthsShort:defaultLocaleMonthsShort, week:defaultLocaleWeek, weekdays:defaultLocaleWeekdays, weekdaysMin:defaultLocaleWeekdaysMin, weekdaysShort:defaultLocaleWeekdaysShort, meridiemParse:defaultLocaleMeridiemParse};
  var locales = {};
  var localeFamilies = {};
  var globalLocale;
  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace("_", "-") : key;
  }
  function chooseLocale(names) {
    var i = 0, j, next, locale, split;
    while (i < names.length) {
      split = normalizeLocale(names[i]).split("-");
      j = split.length;
      next = normalizeLocale(names[i + 1]);
      next = next ? next.split("-") : null;
      while (j > 0) {
        locale = loadLocale(split.slice(0, j).join("-"));
        if (locale) {
          return locale;
        }
        if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
          break;
        }
        j--;
      }
      i++;
    }
    return globalLocale;
  }
  function loadLocale(name) {
    var oldLocale = null;
    if (!locales[name] && typeof module !== "undefined" && module && module.exports) {
      try {
        oldLocale = globalLocale._abbr;
        var aliasedRequire = require;
        aliasedRequire("./locale/" + name);
        getSetGlobalLocale(oldLocale);
      } catch (e) {
      }
    }
    return locales[name];
  }
  function getSetGlobalLocale(key, values) {
    var data;
    if (key) {
      if (isUndefined(values)) {
        data = getLocale(key);
      } else {
        data = defineLocale(key, values);
      }
      if (data) {
        globalLocale = data;
      } else {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("Locale " + key + " not found. Did you forget to load it?");
        }
      }
    }
    return globalLocale._abbr;
  }
  function defineLocale(name, config) {
    if (config !== null) {
      var locale, parentConfig = baseConfig;
      config.abbr = name;
      if (locales[name] != null) {
        deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change " + "an existing locale. moment.defineLocale(localeName, " + "config) should only be used for creating a new locale " + "See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
        parentConfig = locales[name]._config;
      } else {
        if (config.parentLocale != null) {
          if (locales[config.parentLocale] != null) {
            parentConfig = locales[config.parentLocale]._config;
          } else {
            locale = loadLocale(config.parentLocale);
            if (locale != null) {
              parentConfig = locale._config;
            } else {
              if (!localeFamilies[config.parentLocale]) {
                localeFamilies[config.parentLocale] = [];
              }
              localeFamilies[config.parentLocale].push({name:name, config:config});
              return null;
            }
          }
        }
      }
      locales[name] = new Locale(mergeConfigs(parentConfig, config));
      if (localeFamilies[name]) {
        localeFamilies[name].forEach(function(x) {
          defineLocale(x.name, x.config);
        });
      }
      getSetGlobalLocale(name);
      return locales[name];
    } else {
      delete locales[name];
      return null;
    }
  }
  function updateLocale(name, config) {
    if (config != null) {
      var locale, tmpLocale, parentConfig = baseConfig;
      tmpLocale = loadLocale(name);
      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }
      config = mergeConfigs(parentConfig, config);
      locale = new Locale(config);
      locale.parentLocale = locales[name];
      locales[name] = locale;
      getSetGlobalLocale(name);
    } else {
      if (locales[name] != null) {
        if (locales[name].parentLocale != null) {
          locales[name] = locales[name].parentLocale;
        } else {
          if (locales[name] != null) {
            delete locales[name];
          }
        }
      }
    }
    return locales[name];
  }
  function getLocale(key) {
    var locale;
    if (key && key._locale && key._locale._abbr) {
      key = key._locale._abbr;
    }
    if (!key) {
      return globalLocale;
    }
    if (!isArray(key)) {
      locale = loadLocale(key);
      if (locale) {
        return locale;
      }
      key = [key];
    }
    return chooseLocale(key);
  }
  function listLocales() {
    return keys(locales);
  }
  function checkOverflow(m) {
    var overflow;
    var a = m._a;
    if (a && getParsingFlags(m).overflow === -2) {
      overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
      if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
        overflow = DATE;
      }
      if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
        overflow = WEEK;
      }
      if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
        overflow = WEEKDAY;
      }
      getParsingFlags(m).overflow = overflow;
    }
    return m;
  }
  function defaults(a, b, c) {
    if (a != null) {
      return a;
    }
    if (b != null) {
      return b;
    }
    return c;
  }
  function currentDateArray(config) {
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
      return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  }
  function configFromArray(config) {
    var i, date, input = [], currentDate, expectedWeekday, yearToUse;
    if (config._d) {
      return;
    }
    currentDate = currentDateArray(config);
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
      dayOfYearFromWeekInfo(config);
    }
    if (config._dayOfYear != null) {
      yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
      if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
        getParsingFlags(config)._overflowDayOfYear = true;
      }
      date = createUTCDate(yearToUse, 0, config._dayOfYear);
      config._a[MONTH] = date.getUTCMonth();
      config._a[DATE] = date.getUTCDate();
    }
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
      config._a[i] = input[i] = currentDate[i];
    }
    for (; i < 7; i++) {
      config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
    }
    if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
      config._nextDay = true;
      config._a[HOUR] = 0;
    }
    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
    if (config._tzm != null) {
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }
    if (config._nextDay) {
      config._a[HOUR] = 24;
    }
    if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
      getParsingFlags(config).weekdayMismatch = true;
    }
  }
  function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
      dow = 1;
      doy = 4;
      weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
      week = defaults(w.W, 1);
      weekday = defaults(w.E, 1);
      if (weekday < 1 || weekday > 7) {
        weekdayOverflow = true;
      }
    } else {
      dow = config._locale._week.dow;
      doy = config._locale._week.doy;
      var curWeek = weekOfYear(createLocal(), dow, doy);
      weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
      week = defaults(w.w, curWeek.week);
      if (w.d != null) {
        weekday = w.d;
        if (weekday < 0 || weekday > 6) {
          weekdayOverflow = true;
        }
      } else {
        if (w.e != null) {
          weekday = w.e + dow;
          if (w.e < 0 || w.e > 6) {
            weekdayOverflow = true;
          }
        } else {
          weekday = dow;
        }
      }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
      getParsingFlags(config)._overflowWeeks = true;
    } else {
      if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
      } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
      }
    }
  }
  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
  var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
  var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
  var isoDates = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, false], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, false], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, false], ["YYYYDDD", /\d{7}/]];
  var isoTimes = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]];
  var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
  function configFromISO(config) {
    var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat;
    if (match) {
      getParsingFlags(config).iso = true;
      for (i = 0, l = isoDates.length; i < l; i++) {
        if (isoDates[i][1].exec(match[1])) {
          dateFormat = isoDates[i][0];
          allowTime = isoDates[i][2] !== false;
          break;
        }
      }
      if (dateFormat == null) {
        config._isValid = false;
        return;
      }
      if (match[3]) {
        for (i = 0, l = isoTimes.length; i < l; i++) {
          if (isoTimes[i][1].exec(match[3])) {
            timeFormat = (match[2] || " ") + isoTimes[i][0];
            break;
          }
        }
        if (timeFormat == null) {
          config._isValid = false;
          return;
        }
      }
      if (!allowTime && timeFormat != null) {
        config._isValid = false;
        return;
      }
      if (match[4]) {
        if (tzRegex.exec(match[4])) {
          tzFormat = "Z";
        } else {
          config._isValid = false;
          return;
        }
      }
      config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
      configFromStringAndFormat(config);
    } else {
      config._isValid = false;
    }
  }
  var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
  function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];
    if (secondStr) {
      result.push(parseInt(secondStr, 10));
    }
    return result;
  }
  function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
      return 2000 + year;
    } else {
      if (year <= 999) {
        return 1900 + year;
      }
    }
    return year;
  }
  function preprocessRFC2822(s) {
    return s.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
      var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = (new Date(parsedInput[0], parsedInput[1], parsedInput[2])).getDay();
      if (weekdayProvided !== weekdayActual) {
        getParsingFlags(config).weekdayMismatch = true;
        config._isValid = false;
        return false;
      }
    }
    return true;
  }
  var obsOffsets = {UT:0, GMT:0, EDT:-4 * 60, EST:-5 * 60, CDT:-5 * 60, CST:-6 * 60, MDT:-6 * 60, MST:-7 * 60, PDT:-7 * 60, PST:-8 * 60};
  function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
      return obsOffsets[obsOffset];
    } else {
      if (militaryOffset) {
        return 0;
      } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
      }
    }
  }
  function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));
    if (match) {
      var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
      if (!checkWeekday(match[1], parsedArray, config)) {
        return;
      }
      config._a = parsedArray;
      config._tzm = calculateOffset(match[8], match[9], match[10]);
      config._d = createUTCDate.apply(null, config._a);
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
      getParsingFlags(config).rfc2822 = true;
    } else {
      config._isValid = false;
    }
  }
  function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);
    if (matched !== null) {
      config._d = new Date(+matched[1]);
      return;
    }
    configFromISO(config);
    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    }
    configFromRFC2822(config);
    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    }
    hooks.createFromInputFallback(config);
  }
  hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), " + "which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are " + "discouraged and will be removed in an upcoming major release. Please refer to " + "http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(config) {
    config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
  });
  hooks.ISO_8601 = function() {
  };
  hooks.RFC_2822 = function() {
  };
  function configFromStringAndFormat(config) {
    if (config._f === hooks.ISO_8601) {
      configFromISO(config);
      return;
    }
    if (config._f === hooks.RFC_2822) {
      configFromRFC2822(config);
      return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;
    var string = "" + config._i, i, parsedInput, tokens, token, skipped, stringLength = string.length, totalParsedInputLength = 0;
    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];
      parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
      if (parsedInput) {
        skipped = string.substr(0, string.indexOf(parsedInput));
        if (skipped.length > 0) {
          getParsingFlags(config).unusedInput.push(skipped);
        }
        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
        totalParsedInputLength += parsedInput.length;
      }
      if (formatTokenFunctions[token]) {
        if (parsedInput) {
          getParsingFlags(config).empty = false;
        } else {
          getParsingFlags(config).unusedTokens.push(token);
        }
        addTimeToArrayFromToken(token, parsedInput, config);
      } else {
        if (config._strict && !parsedInput) {
          getParsingFlags(config).unusedTokens.push(token);
        }
      }
    }
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
      getParsingFlags(config).unusedInput.push(string);
    }
    if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
      getParsingFlags(config).bigHour = undefined;
    }
    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
    configFromArray(config);
    checkOverflow(config);
  }
  function meridiemFixWrap(locale, hour, meridiem) {
    var isPm;
    if (meridiem == null) {
      return hour;
    }
    if (locale.meridiemHour != null) {
      return locale.meridiemHour(hour, meridiem);
    } else {
      if (locale.isPM != null) {
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
          hour += 12;
        }
        if (!isPm && hour === 12) {
          hour = 0;
        }
        return hour;
      } else {
        return hour;
      }
    }
  }
  function configFromStringAndArray(config) {
    var tempConfig, bestMoment, scoreToBeat, i, currentScore;
    if (config._f.length === 0) {
      getParsingFlags(config).invalidFormat = true;
      config._d = new Date(NaN);
      return;
    }
    for (i = 0; i < config._f.length; i++) {
      currentScore = 0;
      tempConfig = copyConfig({}, config);
      if (config._useUTC != null) {
        tempConfig._useUTC = config._useUTC;
      }
      tempConfig._f = config._f[i];
      configFromStringAndFormat(tempConfig);
      if (!isValid(tempConfig)) {
        continue;
      }
      currentScore += getParsingFlags(tempConfig).charsLeftOver;
      currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
      getParsingFlags(tempConfig).score = currentScore;
      if (scoreToBeat == null || currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
    extend(config, bestMoment || tempConfig);
  }
  function configFromObject(config) {
    if (config._d) {
      return;
    }
    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function(obj) {
      return obj && parseInt(obj, 10);
    });
    configFromArray(config);
  }
  function createFromConfig(config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
      res.add(1, "d");
      res._nextDay = undefined;
    }
    return res;
  }
  function prepareConfig(config) {
    var input = config._i, format = config._f;
    config._locale = config._locale || getLocale(config._l);
    if (input === null || format === undefined && input === "") {
      return createInvalid({nullInput:true});
    }
    if (typeof input === "string") {
      config._i = input = config._locale.preparse(input);
    }
    if (isMoment(input)) {
      return new Moment(checkOverflow(input));
    } else {
      if (isDate(input)) {
        config._d = input;
      } else {
        if (isArray(format)) {
          configFromStringAndArray(config);
        } else {
          if (format) {
            configFromStringAndFormat(config);
          } else {
            configFromInput(config);
          }
        }
      }
    }
    if (!isValid(config)) {
      config._d = null;
    }
    return config;
  }
  function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
      config._d = new Date(hooks.now());
    } else {
      if (isDate(input)) {
        config._d = new Date(input.valueOf());
      } else {
        if (typeof input === "string") {
          configFromString(config);
        } else {
          if (isArray(input)) {
            config._a = map(input.slice(0), function(obj) {
              return parseInt(obj, 10);
            });
            configFromArray(config);
          } else {
            if (isObject(input)) {
              configFromObject(config);
            } else {
              if (isNumber(input)) {
                config._d = new Date(input);
              } else {
                hooks.createFromInputFallback(config);
              }
            }
          }
        }
      }
    }
  }
  function createLocalOrUTC(input, format, locale, strict, isUTC) {
    var c = {};
    if (locale === true || locale === false) {
      strict = locale;
      locale = undefined;
    }
    if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
      input = undefined;
    }
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;
    return createFromConfig(c);
  }
  function createLocal(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
  }
  var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid();
    }
  });
  var prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid();
    }
  });
  function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
      moments = moments[0];
    }
    if (!moments.length) {
      return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
      if (!moments[i].isValid() || moments[i][fn](res)) {
        res = moments[i];
      }
    }
    return res;
  }
  function min() {
    var args = [].slice.call(arguments, 0);
    return pickBy("isBefore", args);
  }
  function max() {
    var args = [].slice.call(arguments, 0);
    return pickBy("isAfter", args);
  }
  var now = function() {
    return Date.now ? Date.now() : +new Date;
  };
  var ordering = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
  function isDurationValid(m) {
    for (var key in m) {
      if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
        return false;
      }
    }
    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
      if (m[ordering[i]]) {
        if (unitHasDecimal) {
          return false;
        }
        if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
          unitHasDecimal = true;
        }
      }
    }
    return true;
  }
  function isValid$1() {
    return this._isValid;
  }
  function createInvalid$1() {
    return createDuration(NaN);
  }
  function Duration(duration) {
    var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || normalizedInput.isoWeek || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
    this._isValid = isDurationValid(normalizedInput);
    this._milliseconds = +milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 1000 * 60 * 60;
    this._days = +days + weeks * 7;
    this._months = +months + quarters * 3 + years * 12;
    this._data = {};
    this._locale = getLocale();
    this._bubble();
  }
  function isDuration(obj) {
    return obj instanceof Duration;
  }
  function absRound(number) {
    if (number < 0) {
      return Math.round(-1 * number) * -1;
    } else {
      return Math.round(number);
    }
  }
  function offset(token, separator) {
    addFormatToken(token, 0, 0, function() {
      var offset = this.utcOffset();
      var sign = "+";
      if (offset < 0) {
        offset = -offset;
        sign = "-";
      }
      return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
    });
  }
  offset("Z", ":");
  offset("ZZ", "");
  addRegexToken("Z", matchShortOffset);
  addRegexToken("ZZ", matchShortOffset);
  addParseToken(["Z", "ZZ"], function(input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
  });
  var chunkOffset = /([\+\-]|\d\d)/gi;
  function offsetFromString(matcher, string) {
    var matches = (string || "").match(matcher);
    if (matches === null) {
      return null;
    }
    var chunk = matches[matches.length - 1] || [];
    var parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);
    return minutes === 0 ? 0 : parts[0] === "+" ? minutes : -minutes;
  }
  function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
      res = model.clone();
      diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
      res._d.setTime(res._d.valueOf() + diff);
      hooks.updateOffset(res, false);
      return res;
    } else {
      return createLocal(input).local();
    }
  }
  function getDateOffset(m) {
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
  }
  hooks.updateOffset = function() {
  };
  function getSetOffset(input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0, localAdjust;
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    if (input != null) {
      if (typeof input === "string") {
        input = offsetFromString(matchShortOffset, input);
        if (input === null) {
          return this;
        }
      } else {
        if (Math.abs(input) < 16 && !keepMinutes) {
          input = input * 60;
        }
      }
      if (!this._isUTC && keepLocalTime) {
        localAdjust = getDateOffset(this);
      }
      this._offset = input;
      this._isUTC = true;
      if (localAdjust != null) {
        this.add(localAdjust, "m");
      }
      if (offset !== input) {
        if (!keepLocalTime || this._changeInProgress) {
          addSubtract(this, createDuration(input - offset, "m"), 1, false);
        } else {
          if (!this._changeInProgress) {
            this._changeInProgress = true;
            hooks.updateOffset(this, true);
            this._changeInProgress = null;
          }
        }
      }
      return this;
    } else {
      return this._isUTC ? offset : getDateOffset(this);
    }
  }
  function getSetZone(input, keepLocalTime) {
    if (input != null) {
      if (typeof input !== "string") {
        input = -input;
      }
      this.utcOffset(input, keepLocalTime);
      return this;
    } else {
      return -this.utcOffset();
    }
  }
  function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
  }
  function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
      this.utcOffset(0, keepLocalTime);
      this._isUTC = false;
      if (keepLocalTime) {
        this.subtract(getDateOffset(this), "m");
      }
    }
    return this;
  }
  function setOffsetToParsedOffset() {
    if (this._tzm != null) {
      this.utcOffset(this._tzm, false, true);
    } else {
      if (typeof this._i === "string") {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
          this.utcOffset(tZone);
        } else {
          this.utcOffset(0, true);
        }
      }
    }
    return this;
  }
  function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
      return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;
    return (this.utcOffset() - input) % 60 === 0;
  }
  function isDaylightSavingTime() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }
  function isDaylightSavingTimeShifted() {
    if (!isUndefined(this._isDSTShifted)) {
      return this._isDSTShifted;
    }
    var c = {};
    copyConfig(c, this);
    c = prepareConfig(c);
    if (c._a) {
      var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
      this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
    } else {
      this._isDSTShifted = false;
    }
    return this._isDSTShifted;
  }
  function isLocal() {
    return this.isValid() ? !this._isUTC : false;
  }
  function isUtcOffset() {
    return this.isValid() ? this._isUTC : false;
  }
  function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
  }
  var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/;
  var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  function createDuration(input, key) {
    var duration = input, match = null, sign, ret, diffRes;
    if (isDuration(input)) {
      duration = {ms:input._milliseconds, d:input._days, M:input._months};
    } else {
      if (isNumber(input)) {
        duration = {};
        if (key) {
          duration[key] = input;
        } else {
          duration.milliseconds = input;
        }
      } else {
        if (!!(match = aspNetRegex.exec(input))) {
          sign = match[1] === "-" ? -1 : 1;
          duration = {y:0, d:toInt(match[DATE]) * sign, h:toInt(match[HOUR]) * sign, m:toInt(match[MINUTE]) * sign, s:toInt(match[SECOND]) * sign, ms:toInt(absRound(match[MILLISECOND] * 1000)) * sign};
        } else {
          if (!!(match = isoRegex.exec(input))) {
            sign = match[1] === "-" ? -1 : 1;
            duration = {y:parseIso(match[2], sign), M:parseIso(match[3], sign), w:parseIso(match[4], sign), d:parseIso(match[5], sign), h:parseIso(match[6], sign), m:parseIso(match[7], sign), s:parseIso(match[8], sign)};
          } else {
            if (duration == null) {
              duration = {};
            } else {
              if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
                diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
                duration = {};
                duration.ms = diffRes.milliseconds;
                duration.M = diffRes.months;
              }
            }
          }
        }
      }
    }
    ret = new Duration(duration);
    if (isDuration(input) && hasOwnProp(input, "_locale")) {
      ret._locale = input._locale;
    }
    return ret;
  }
  createDuration.fn = Duration.prototype;
  createDuration.invalid = createInvalid$1;
  function parseIso(inp, sign) {
    var res = inp && parseFloat(inp.replace(",", "."));
    return (isNaN(res) ? 0 : res) * sign;
  }
  function positiveMomentsDifference(base, other) {
    var res = {};
    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, "M").isAfter(other)) {
      --res.months;
    }
    res.milliseconds = +other - +base.clone().add(res.months, "M");
    return res;
  }
  function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
      return {milliseconds:0, months:0};
    }
    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
      res = positiveMomentsDifference(base, other);
    } else {
      res = positiveMomentsDifference(other, base);
      res.milliseconds = -res.milliseconds;
      res.months = -res.months;
    }
    return res;
  }
  function createAdder(direction, name) {
    return function(val, period) {
      var dur, tmp;
      if (period !== null && !isNaN(+period)) {
        deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). " + "See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
        tmp = val;
        val = period;
        period = tmp;
      }
      val = typeof val === "string" ? +val : val;
      dur = createDuration(val, period);
      addSubtract(this, dur, direction);
      return this;
    };
  }
  function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds, days = absRound(duration._days), months = absRound(duration._months);
    if (!mom.isValid()) {
      return;
    }
    updateOffset = updateOffset == null ? true : updateOffset;
    if (months) {
      setMonth(mom, get(mom, "Month") + months * isAdding);
    }
    if (days) {
      set$1(mom, "Date", get(mom, "Date") + days * isAdding);
    }
    if (milliseconds) {
      mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
      hooks.updateOffset(mom, days || months);
    }
  }
  var add = createAdder(1, "add");
  var subtract = createAdder(-1, "subtract");
  function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, "days", true);
    return diff < -6 ? "sameElse" : diff < -1 ? "lastWeek" : diff < 0 ? "lastDay" : diff < 1 ? "sameDay" : diff < 2 ? "nextDay" : diff < 7 ? "nextWeek" : "sameElse";
  }
  function calendar$1(time, formats) {
    var now = time || createLocal(), sod = cloneWithOffset(now, this).startOf("day"), format = hooks.calendarFormat(this, sod) || "sameElse";
    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
  }
  function clone() {
    return new Moment(this);
  }
  function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(units) || "millisecond";
    if (units === "millisecond") {
      return this.valueOf() > localInput.valueOf();
    } else {
      return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
  }
  function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(units) || "millisecond";
    if (units === "millisecond") {
      return this.valueOf() < localInput.valueOf();
    } else {
      return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
  }
  function isBetween(from, to, units, inclusivity) {
    var localFrom = isMoment(from) ? from : createLocal(from), localTo = isMoment(to) ? to : createLocal(to);
    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
      return false;
    }
    inclusivity = inclusivity || "()";
    return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
  }
  function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input), inputMs;
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(units) || "millisecond";
    if (units === "millisecond") {
      return this.valueOf() === localInput.valueOf();
    } else {
      inputMs = localInput.valueOf();
      return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
  }
  function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
  }
  function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
  }
  function diff(input, units, asFloat) {
    var that, zoneDelta, output;
    if (!this.isValid()) {
      return NaN;
    }
    that = cloneWithOffset(input, this);
    if (!that.isValid()) {
      return NaN;
    }
    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
    units = normalizeUnits(units);
    switch(units) {
      case "year":
        output = monthDiff(this, that) / 12;
        break;
      case "month":
        output = monthDiff(this, that);
        break;
      case "quarter":
        output = monthDiff(this, that) / 3;
        break;
      case "second":
        output = (this - that) / 1e3;
        break;
      case "minute":
        output = (this - that) / 6e4;
        break;
      case "hour":
        output = (this - that) / 36e5;
        break;
      case "day":
        output = (this - that - zoneDelta) / 864e5;
        break;
      case "week":
        output = (this - that - zoneDelta) / 6048e5;
        break;
      default:
        output = this - that;
    }
    return asFloat ? output : absFloor(output);
  }
  function monthDiff(a, b) {
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
    if (b - anchor < 0) {
      anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
      adjust = (b - anchor) / (anchor - anchor2);
    } else {
      anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
      adjust = (b - anchor) / (anchor2 - anchor);
    }
    return -(wholeMonthDiff + adjust) || 0;
  }
  hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
  hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
  function toString() {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }
  function toISOString(keepOffset) {
    if (!this.isValid()) {
      return null;
    }
    var utc = keepOffset !== true;
    var m = utc ? this.clone().utc() : this;
    if (m.year() < 0 || m.year() > 9999) {
      return formatMoment(m, utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ");
    }
    if (isFunction(Date.prototype.toISOString)) {
      if (utc) {
        return this.toDate().toISOString();
      } else {
        return (new Date(this.valueOf() + this.utcOffset() * 60 * 1000)).toISOString().replace("Z", formatMoment(m, "Z"));
      }
    }
    return formatMoment(m, utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
  }
  function inspect() {
    if (!this.isValid()) {
      return "moment.invalid(/* " + this._i + " */)";
    }
    var func = "moment";
    var zone = "";
    if (!this.isLocal()) {
      func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
      zone = "Z";
    }
    var prefix = "[" + func + '("]';
    var year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
    var datetime = "-MM-DD[T]HH:mm:ss.SSS";
    var suffix = zone + '[")]';
    return this.format(prefix + year + datetime + suffix);
  }
  function format(inputString) {
    if (!inputString) {
      inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
  }
  function from(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({to:this, from:time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }
  function fromNow(withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
  }
  function to(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({from:this, to:time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }
  function toNow(withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
  }
  function locale(key) {
    var newLocaleData;
    if (key === undefined) {
      return this._locale._abbr;
    } else {
      newLocaleData = getLocale(key);
      if (newLocaleData != null) {
        this._locale = newLocaleData;
      }
      return this;
    }
  }
  var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
    if (key === undefined) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  });
  function localeData() {
    return this._locale;
  }
  var MS_PER_SECOND = 1000;
  var MS_PER_MINUTE = 60 * MS_PER_SECOND;
  var MS_PER_HOUR = 60 * MS_PER_MINUTE;
  var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
  function mod$1(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor;
  }
  function localStartOfDate(y, m, d) {
    if (y < 100 && y >= 0) {
      return new Date(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return (new Date(y, m, d)).valueOf();
    }
  }
  function utcStartOfDate(y, m, d) {
    if (y < 100 && y >= 0) {
      return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return Date.UTC(y, m, d);
    }
  }
  function startOf(units) {
    var time;
    units = normalizeUnits(units);
    if (units === undefined || units === "millisecond" || !this.isValid()) {
      return this;
    }
    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
    switch(units) {
      case "year":
        time = startOfDate(this.year(), 0, 1);
        break;
      case "quarter":
        time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
        break;
      case "month":
        time = startOfDate(this.year(), this.month(), 1);
        break;
      case "week":
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
        break;
      case "isoWeek":
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;
      case "day":
      case "date":
        time = startOfDate(this.year(), this.month(), this.date());
        break;
      case "hour":
        time = this._d.valueOf();
        time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
        break;
      case "minute":
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_MINUTE);
        break;
      case "second":
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_SECOND);
        break;
    }
    this._d.setTime(time);
    hooks.updateOffset(this, true);
    return this;
  }
  function endOf(units) {
    var time;
    units = normalizeUnits(units);
    if (units === undefined || units === "millisecond" || !this.isValid()) {
      return this;
    }
    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
    switch(units) {
      case "year":
        time = startOfDate(this.year() + 1, 0, 1) - 1;
        break;
      case "quarter":
        time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;
      case "month":
        time = startOfDate(this.year(), this.month() + 1, 1) - 1;
        break;
      case "week":
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;
      case "isoWeek":
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;
      case "day":
      case "date":
        time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
        break;
      case "hour":
        time = this._d.valueOf();
        time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
        break;
      case "minute":
        time = this._d.valueOf();
        time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
        break;
      case "second":
        time = this._d.valueOf();
        time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
        break;
    }
    this._d.setTime(time);
    hooks.updateOffset(this, true);
    return this;
  }
  function valueOf() {
    return this._d.valueOf() - (this._offset || 0) * 60000;
  }
  function unix() {
    return Math.floor(this.valueOf() / 1000);
  }
  function toDate() {
    return new Date(this.valueOf());
  }
  function toArray() {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
  }
  function toObject() {
    var m = this;
    return {years:m.year(), months:m.month(), date:m.date(), hours:m.hours(), minutes:m.minutes(), seconds:m.seconds(), milliseconds:m.milliseconds()};
  }
  function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  }
  function isValid$2() {
    return isValid(this);
  }
  function parsingFlags() {
    return extend({}, getParsingFlags(this));
  }
  function invalidAt() {
    return getParsingFlags(this).overflow;
  }
  function creationData() {
    return {input:this._i, format:this._f, locale:this._locale, isUTC:this._isUTC, strict:this._strict};
  }
  addFormatToken(0, ["gg", 2], 0, function() {
    return this.weekYear() % 100;
  });
  addFormatToken(0, ["GG", 2], 0, function() {
    return this.isoWeekYear() % 100;
  });
  function addWeekYearFormatToken(token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
  }
  addWeekYearFormatToken("gggg", "weekYear");
  addWeekYearFormatToken("ggggg", "weekYear");
  addWeekYearFormatToken("GGGG", "isoWeekYear");
  addWeekYearFormatToken("GGGGG", "isoWeekYear");
  addUnitAlias("weekYear", "gg");
  addUnitAlias("isoWeekYear", "GG");
  addUnitPriority("weekYear", 1);
  addUnitPriority("isoWeekYear", 1);
  addRegexToken("G", matchSigned);
  addRegexToken("g", matchSigned);
  addRegexToken("GG", match1to2, match2);
  addRegexToken("gg", match1to2, match2);
  addRegexToken("GGGG", match1to4, match4);
  addRegexToken("gggg", match1to4, match4);
  addRegexToken("GGGGG", match1to6, match6);
  addRegexToken("ggggg", match1to6, match6);
  addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
  });
  addWeekParseToken(["gg", "GG"], function(input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
  });
  function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }
  function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
  }
  function getISOWeeksInYear() {
    return weeksInYear(this.year(), 1, 4);
  }
  function getWeeksInYear() {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  }
  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
      return weekOfYear(this, dow, doy).year;
    } else {
      weeksTarget = weeksInYear(input, dow, doy);
      if (week > weeksTarget) {
        week = weeksTarget;
      }
      return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
  }
  function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
  }
  addFormatToken("Q", 0, "Qo", "quarter");
  addUnitAlias("quarter", "Q");
  addUnitPriority("quarter", 7);
  addRegexToken("Q", match1);
  addParseToken("Q", function(input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
  });
  function getSetQuarter(input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
  }
  addFormatToken("D", ["DD", 2], "Do", "date");
  addUnitAlias("date", "D");
  addUnitPriority("date", 9);
  addRegexToken("D", match1to2);
  addRegexToken("DD", match1to2, match2);
  addRegexToken("Do", function(isStrict, locale) {
    return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
  });
  addParseToken(["D", "DD"], DATE);
  addParseToken("Do", function(input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
  });
  var getSetDayOfMonth = makeGetSet("Date", true);
  addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
  addUnitAlias("dayOfYear", "DDD");
  addUnitPriority("dayOfYear", 4);
  addRegexToken("DDD", match1to3);
  addRegexToken("DDDD", match3);
  addParseToken(["DDD", "DDDD"], function(input, array, config) {
    config._dayOfYear = toInt(input);
  });
  function getSetDayOfYear(input) {
    var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
  }
  addFormatToken("m", ["mm", 2], 0, "minute");
  addUnitAlias("minute", "m");
  addUnitPriority("minute", 14);
  addRegexToken("m", match1to2);
  addRegexToken("mm", match1to2, match2);
  addParseToken(["m", "mm"], MINUTE);
  var getSetMinute = makeGetSet("Minutes", false);
  addFormatToken("s", ["ss", 2], 0, "second");
  addUnitAlias("second", "s");
  addUnitPriority("second", 15);
  addRegexToken("s", match1to2);
  addRegexToken("ss", match1to2, match2);
  addParseToken(["s", "ss"], SECOND);
  var getSetSecond = makeGetSet("Seconds", false);
  addFormatToken("S", 0, 0, function() {
    return ~~(this.millisecond() / 100);
  });
  addFormatToken(0, ["SS", 2], 0, function() {
    return ~~(this.millisecond() / 10);
  });
  addFormatToken(0, ["SSS", 3], 0, "millisecond");
  addFormatToken(0, ["SSSS", 4], 0, function() {
    return this.millisecond() * 10;
  });
  addFormatToken(0, ["SSSSS", 5], 0, function() {
    return this.millisecond() * 100;
  });
  addFormatToken(0, ["SSSSSS", 6], 0, function() {
    return this.millisecond() * 1000;
  });
  addFormatToken(0, ["SSSSSSS", 7], 0, function() {
    return this.millisecond() * 10000;
  });
  addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
    return this.millisecond() * 100000;
  });
  addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
    return this.millisecond() * 1000000;
  });
  addUnitAlias("millisecond", "ms");
  addUnitPriority("millisecond", 16);
  addRegexToken("S", match1to3, match1);
  addRegexToken("SS", match1to3, match2);
  addRegexToken("SSS", match1to3, match3);
  var token;
  for (token = "SSSS"; token.length <= 9; token += "S") {
    addRegexToken(token, matchUnsigned);
  }
  function parseMs(input, array) {
    array[MILLISECOND] = toInt(("0." + input) * 1000);
  }
  for (token = "S"; token.length <= 9; token += "S") {
    addParseToken(token, parseMs);
  }
  var getSetMillisecond = makeGetSet("Milliseconds", false);
  addFormatToken("z", 0, 0, "zoneAbbr");
  addFormatToken("zz", 0, 0, "zoneName");
  function getZoneAbbr() {
    return this._isUTC ? "UTC" : "";
  }
  function getZoneName() {
    return this._isUTC ? "Coordinated Universal Time" : "";
  }
  var proto = Moment.prototype;
  proto.add = add;
  proto.calendar = calendar$1;
  proto.clone = clone;
  proto.diff = diff;
  proto.endOf = endOf;
  proto.format = format;
  proto.from = from;
  proto.fromNow = fromNow;
  proto.to = to;
  proto.toNow = toNow;
  proto.get = stringGet;
  proto.invalidAt = invalidAt;
  proto.isAfter = isAfter;
  proto.isBefore = isBefore;
  proto.isBetween = isBetween;
  proto.isSame = isSame;
  proto.isSameOrAfter = isSameOrAfter;
  proto.isSameOrBefore = isSameOrBefore;
  proto.isValid = isValid$2;
  proto.lang = lang;
  proto.locale = locale;
  proto.localeData = localeData;
  proto.max = prototypeMax;
  proto.min = prototypeMin;
  proto.parsingFlags = parsingFlags;
  proto.set = stringSet;
  proto.startOf = startOf;
  proto.subtract = subtract;
  proto.toArray = toArray;
  proto.toObject = toObject;
  proto.toDate = toDate;
  proto.toISOString = toISOString;
  proto.inspect = inspect;
  proto.toJSON = toJSON;
  proto.toString = toString;
  proto.unix = unix;
  proto.valueOf = valueOf;
  proto.creationData = creationData;
  proto.year = getSetYear;
  proto.isLeapYear = getIsLeapYear;
  proto.weekYear = getSetWeekYear;
  proto.isoWeekYear = getSetISOWeekYear;
  proto.quarter = proto.quarters = getSetQuarter;
  proto.month = getSetMonth;
  proto.daysInMonth = getDaysInMonth;
  proto.week = proto.weeks = getSetWeek;
  proto.isoWeek = proto.isoWeeks = getSetISOWeek;
  proto.weeksInYear = getWeeksInYear;
  proto.isoWeeksInYear = getISOWeeksInYear;
  proto.date = getSetDayOfMonth;
  proto.day = proto.days = getSetDayOfWeek;
  proto.weekday = getSetLocaleDayOfWeek;
  proto.isoWeekday = getSetISODayOfWeek;
  proto.dayOfYear = getSetDayOfYear;
  proto.hour = proto.hours = getSetHour;
  proto.minute = proto.minutes = getSetMinute;
  proto.second = proto.seconds = getSetSecond;
  proto.millisecond = proto.milliseconds = getSetMillisecond;
  proto.utcOffset = getSetOffset;
  proto.utc = setOffsetToUTC;
  proto.local = setOffsetToLocal;
  proto.parseZone = setOffsetToParsedOffset;
  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  proto.isDST = isDaylightSavingTime;
  proto.isLocal = isLocal;
  proto.isUtcOffset = isUtcOffset;
  proto.isUtc = isUtc;
  proto.isUTC = isUtc;
  proto.zoneAbbr = getZoneAbbr;
  proto.zoneName = getZoneName;
  proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth);
  proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth);
  proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear);
  proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone);
  proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);
  function createUnix(input) {
    return createLocal(input * 1000);
  }
  function createInZone() {
    return createLocal.apply(null, arguments).parseZone();
  }
  function preParsePostFormat(string) {
    return string;
  }
  var proto$1 = Locale.prototype;
  proto$1.calendar = calendar;
  proto$1.longDateFormat = longDateFormat;
  proto$1.invalidDate = invalidDate;
  proto$1.ordinal = ordinal;
  proto$1.preparse = preParsePostFormat;
  proto$1.postformat = preParsePostFormat;
  proto$1.relativeTime = relativeTime;
  proto$1.pastFuture = pastFuture;
  proto$1.set = set;
  proto$1.months = localeMonths;
  proto$1.monthsShort = localeMonthsShort;
  proto$1.monthsParse = localeMonthsParse;
  proto$1.monthsRegex = monthsRegex;
  proto$1.monthsShortRegex = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  proto$1.weekdays = localeWeekdays;
  proto$1.weekdaysMin = localeWeekdaysMin;
  proto$1.weekdaysShort = localeWeekdaysShort;
  proto$1.weekdaysParse = localeWeekdaysParse;
  proto$1.weekdaysRegex = weekdaysRegex;
  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  proto$1.weekdaysMinRegex = weekdaysMinRegex;
  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;
  function get$1(format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
  }
  function listMonthsImpl(format, index, field) {
    if (isNumber(format)) {
      index = format;
      format = undefined;
    }
    format = format || "";
    if (index != null) {
      return get$1(format, index, field, "month");
    }
    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
      out[i] = get$1(format, i, field, "month");
    }
    return out;
  }
  function listWeekdaysImpl(localeSorted, format, index, field) {
    if (typeof localeSorted === "boolean") {
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }
      format = format || "";
    } else {
      format = localeSorted;
      index = format;
      localeSorted = false;
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }
      format = format || "";
    }
    var locale = getLocale(), shift = localeSorted ? locale._week.dow : 0;
    if (index != null) {
      return get$1(format, (index + shift) % 7, field, "day");
    }
    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
      out[i] = get$1(format, (i + shift) % 7, field, "day");
    }
    return out;
  }
  function listMonths(format, index) {
    return listMonthsImpl(format, index, "months");
  }
  function listMonthsShort(format, index) {
    return listMonthsImpl(format, index, "monthsShort");
  }
  function listWeekdays(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, "weekdays");
  }
  function listWeekdaysShort(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, "weekdaysShort");
  }
  function listWeekdaysMin(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, "weekdaysMin");
  }
  getSetGlobalLocale("en", {dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/, ordinal:function(number) {
    var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }});
  hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale);
  hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
  var mathAbs = Math.abs;
  function abs() {
    var data = this._data;
    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);
    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.months = mathAbs(data.months);
    data.years = mathAbs(data.years);
    return this;
  }
  function addSubtract$1(duration, input, value, direction) {
    var other = createDuration(input, value);
    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;
    return duration._bubble();
  }
  function add$1(input, value) {
    return addSubtract$1(this, input, value, 1);
  }
  function subtract$1(input, value) {
    return addSubtract$1(this, input, value, -1);
  }
  function absCeil(number) {
    if (number < 0) {
      return Math.floor(number);
    } else {
      return Math.ceil(number);
    }
  }
  function bubble() {
    var milliseconds = this._milliseconds;
    var days = this._days;
    var months = this._months;
    var data = this._data;
    var seconds, minutes, hours, years, monthsFromDays;
    if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
      milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
      days = 0;
      months = 0;
    }
    data.milliseconds = milliseconds % 1000;
    seconds = absFloor(milliseconds / 1000);
    data.seconds = seconds % 60;
    minutes = absFloor(seconds / 60);
    data.minutes = minutes % 60;
    hours = absFloor(minutes / 60);
    data.hours = hours % 24;
    days += absFloor(hours / 24);
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));
    years = absFloor(months / 12);
    months %= 12;
    data.days = days;
    data.months = months;
    data.years = years;
    return this;
  }
  function daysToMonths(days) {
    return days * 4800 / 146097;
  }
  function monthsToDays(months) {
    return months * 146097 / 4800;
  }
  function as(units) {
    if (!this.isValid()) {
      return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;
    units = normalizeUnits(units);
    if (units === "month" || units === "quarter" || units === "year") {
      days = this._days + milliseconds / 864e5;
      months = this._months + daysToMonths(days);
      switch(units) {
        case "month":
          return months;
        case "quarter":
          return months / 3;
        case "year":
          return months / 12;
      }
    } else {
      days = this._days + Math.round(monthsToDays(this._months));
      switch(units) {
        case "week":
          return days / 7 + milliseconds / 6048e5;
        case "day":
          return days + milliseconds / 864e5;
        case "hour":
          return days * 24 + milliseconds / 36e5;
        case "minute":
          return days * 1440 + milliseconds / 6e4;
        case "second":
          return days * 86400 + milliseconds / 1000;
        case "millisecond":
          return Math.floor(days * 864e5) + milliseconds;
        default:
          throw new Error("Unknown unit " + units);
      }
    }
  }
  function valueOf$1() {
    if (!this.isValid()) {
      return NaN;
    }
    return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
  }
  function makeAs(alias) {
    return function() {
      return this.as(alias);
    };
  }
  var asMilliseconds = makeAs("ms");
  var asSeconds = makeAs("s");
  var asMinutes = makeAs("m");
  var asHours = makeAs("h");
  var asDays = makeAs("d");
  var asWeeks = makeAs("w");
  var asMonths = makeAs("M");
  var asQuarters = makeAs("Q");
  var asYears = makeAs("y");
  function clone$1() {
    return createDuration(this);
  }
  function get$2(units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + "s"]() : NaN;
  }
  function makeGetter(name) {
    return function() {
      return this.isValid() ? this._data[name] : NaN;
    };
  }
  var milliseconds = makeGetter("milliseconds");
  var seconds = makeGetter("seconds");
  var minutes = makeGetter("minutes");
  var hours = makeGetter("hours");
  var days = makeGetter("days");
  var months = makeGetter("months");
  var years = makeGetter("years");
  function weeks() {
    return absFloor(this.days() / 7);
  }
  var round = Math.round;
  var thresholds = {ss:44, s:45, m:45, h:22, d:26, M:11};
  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }
  function relativeTime$1(posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds = round(duration.as("s"));
    var minutes = round(duration.as("m"));
    var hours = round(duration.as("h"));
    var days = round(duration.as("d"));
    var months = round(duration.as("M"));
    var years = round(duration.as("y"));
    var a = seconds <= thresholds.ss && ["s", seconds] || seconds < thresholds.s && ["ss", seconds] || minutes <= 1 && ["m"] || minutes < thresholds.m && ["mm", minutes] || hours <= 1 && ["h"] || hours < thresholds.h && ["hh", hours] || days <= 1 && ["d"] || days < thresholds.d && ["dd", days] || months <= 1 && ["M"] || months < thresholds.M && ["MM", months] || years <= 1 && ["y"] || ["yy", years];
    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
  }
  function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === undefined) {
      return round;
    }
    if (typeof roundingFunction === "function") {
      round = roundingFunction;
      return true;
    }
    return false;
  }
  function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
      return false;
    }
    if (limit === undefined) {
      return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === "s") {
      thresholds.ss = limit - 1;
    }
    return true;
  }
  function humanize(withSuffix) {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }
    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);
    if (withSuffix) {
      output = locale.pastFuture(+this, output);
    }
    return locale.postformat(output);
  }
  var abs$1 = Math.abs;
  function sign(x) {
    return (x > 0) - (x < 0) || +x;
  }
  function toISOString$1() {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }
    var seconds = abs$1(this._milliseconds) / 1000;
    var days = abs$1(this._days);
    var months = abs$1(this._months);
    var minutes, hours, years;
    minutes = absFloor(seconds / 60);
    hours = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;
    years = absFloor(months / 12);
    months %= 12;
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, "") : "";
    var total = this.asSeconds();
    if (!total) {
      return "P0D";
    }
    var totalSign = total < 0 ? "-" : "";
    var ymSign = sign(this._months) !== sign(total) ? "-" : "";
    var daysSign = sign(this._days) !== sign(total) ? "-" : "";
    var hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
    return totalSign + "P" + (Y ? ymSign + Y + "Y" : "") + (M ? ymSign + M + "M" : "") + (D ? daysSign + D + "D" : "") + (h || m || s ? "T" : "") + (h ? hmsSign + h + "H" : "") + (m ? hmsSign + m + "M" : "") + (s ? hmsSign + s + "S" : "");
  }
  var proto$2 = Duration.prototype;
  proto$2.isValid = isValid$1;
  proto$2.abs = abs;
  proto$2.add = add$1;
  proto$2.subtract = subtract$1;
  proto$2.as = as;
  proto$2.asMilliseconds = asMilliseconds;
  proto$2.asSeconds = asSeconds;
  proto$2.asMinutes = asMinutes;
  proto$2.asHours = asHours;
  proto$2.asDays = asDays;
  proto$2.asWeeks = asWeeks;
  proto$2.asMonths = asMonths;
  proto$2.asQuarters = asQuarters;
  proto$2.asYears = asYears;
  proto$2.valueOf = valueOf$1;
  proto$2._bubble = bubble;
  proto$2.clone = clone$1;
  proto$2.get = get$2;
  proto$2.milliseconds = milliseconds;
  proto$2.seconds = seconds;
  proto$2.minutes = minutes;
  proto$2.hours = hours;
  proto$2.days = days;
  proto$2.weeks = weeks;
  proto$2.months = months;
  proto$2.years = years;
  proto$2.humanize = humanize;
  proto$2.toISOString = toISOString$1;
  proto$2.toString = toISOString$1;
  proto$2.toJSON = toISOString$1;
  proto$2.locale = locale;
  proto$2.localeData = localeData;
  proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1);
  proto$2.lang = lang;
  addFormatToken("X", 0, 0, "unix");
  addFormatToken("x", 0, 0, "valueOf");
  addRegexToken("x", matchSigned);
  addRegexToken("X", matchTimestamp);
  addParseToken("X", function(input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
  });
  addParseToken("x", function(input, array, config) {
    config._d = new Date(toInt(input));
  });
  hooks.version = "2.24.0";
  setHookCallback(createLocal);
  hooks.fn = proto;
  hooks.min = min;
  hooks.max = max;
  hooks.now = now;
  hooks.utc = createUTC;
  hooks.unix = createUnix;
  hooks.months = listMonths;
  hooks.isDate = isDate;
  hooks.locale = getSetGlobalLocale;
  hooks.invalid = createInvalid;
  hooks.duration = createDuration;
  hooks.isMoment = isMoment;
  hooks.weekdays = listWeekdays;
  hooks.parseZone = createInZone;
  hooks.localeData = getLocale;
  hooks.isDuration = isDuration;
  hooks.monthsShort = listMonthsShort;
  hooks.weekdaysMin = listWeekdaysMin;
  hooks.defineLocale = defineLocale;
  hooks.updateLocale = updateLocale;
  hooks.locales = listLocales;
  hooks.weekdaysShort = listWeekdaysShort;
  hooks.normalizeUnits = normalizeUnits;
  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat = getCalendarFormat;
  hooks.prototype = proto;
  hooks.HTML5_FMT = {DATETIME_LOCAL:"YYYY-MM-DDTHH:mm", DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss", DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS", DATE:"YYYY-MM-DD", TIME:"HH:mm", TIME_SECONDS:"HH:mm:ss", TIME_MS:"HH:mm:ss.SSS", WEEK:"GGGG-[W]WW", MONTH:"YYYY-MM"};
  hooks.defineLocale("af", {months:"Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"), monthsShort:"Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"), weekdays:"Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"), weekdaysShort:"Son_Maa_Din_Woe_Don_Vry_Sat".split("_"), weekdaysMin:"So_Ma_Di_Wo_Do_Vr_Sa".split("_"), meridiemParse:/vm|nm/i, isPM:function(input) {
    return /^nm$/i.test(input);
  }, meridiem:function(hours, minutes, isLower) {
    if (hours < 12) {
      return isLower ? "vm" : "VM";
    } else {
      return isLower ? "nm" : "NM";
    }
  }, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[Vandag om] LT", nextDay:"[M\u00f4re om] LT", nextWeek:"dddd [om] LT", lastDay:"[Gister om] LT", lastWeek:"[Laas] dddd [om] LT", sameElse:"L"}, relativeTime:{future:"oor %s", past:"%s gelede", s:"'n paar sekondes", ss:"%d sekondes", m:"'n minuut", mm:"%d minute", h:"'n uur", hh:"%d ure", d:"'n dag", dd:"%d dae", M:"'n maand", MM:"%d maande", 
  y:"'n jaar", yy:"%d jaar"}, dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/, ordinal:function(number) {
    return number + (number === 1 || number === 8 || number >= 20 ? "ste" : "de");
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("ar-dz", {months:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"), monthsShort:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"), 
  weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"), weekdaysShort:"\u0627\u062d\u062f_\u0627\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"), 
  weekdaysMin:"\u0623\u062d_\u0625\u062b_\u062b\u0644\u0627_\u0623\u0631_\u062e\u0645_\u062c\u0645_\u0633\u0628".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", 
  lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse:"L"}, relativeTime:{future:"\u0641\u064a %s", past:"\u0645\u0646\u0630 %s", s:"\u062b\u0648\u0627\u0646", ss:"%d \u062b\u0627\u0646\u064a\u0629", m:"\u062f\u0642\u064a\u0642\u0629", mm:"%d \u062f\u0642\u0627\u0626\u0642", h:"\u0633\u0627\u0639\u0629", hh:"%d \u0633\u0627\u0639\u0627\u062a", d:"\u064a\u0648\u0645", dd:"%d \u0623\u064a\u0627\u0645", 
  M:"\u0634\u0647\u0631", MM:"%d \u0623\u0634\u0647\u0631", y:"\u0633\u0646\u0629", yy:"%d \u0633\u0646\u0648\u0627\u062a"}, week:{dow:0, doy:4}});
  hooks.defineLocale("ar-kw", {months:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"), monthsShort:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"), 
  weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062a\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"), weekdaysShort:"\u0627\u062d\u062f_\u0627\u062a\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"), 
  weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", 
  lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse:"L"}, relativeTime:{future:"\u0641\u064a %s", past:"\u0645\u0646\u0630 %s", s:"\u062b\u0648\u0627\u0646", ss:"%d \u062b\u0627\u0646\u064a\u0629", m:"\u062f\u0642\u064a\u0642\u0629", mm:"%d \u062f\u0642\u0627\u0626\u0642", h:"\u0633\u0627\u0639\u0629", hh:"%d \u0633\u0627\u0639\u0627\u062a", d:"\u064a\u0648\u0645", dd:"%d \u0623\u064a\u0627\u0645", 
  M:"\u0634\u0647\u0631", MM:"%d \u0623\u0634\u0647\u0631", y:"\u0633\u0646\u0629", yy:"%d \u0633\u0646\u0648\u0627\u062a"}, week:{dow:0, doy:12}});
  var symbolMap = {1:"1", 2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", 0:"0"}, pluralForm = function(n) {
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
  }, plurals = {s:["\u0623\u0642\u0644 \u0645\u0646 \u062b\u0627\u0646\u064a\u0629", "\u062b\u0627\u0646\u064a\u0629 \u0648\u0627\u062d\u062f\u0629", ["\u062b\u0627\u0646\u064a\u062a\u0627\u0646", "\u062b\u0627\u0646\u064a\u062a\u064a\u0646"], "%d \u062b\u0648\u0627\u0646", "%d \u062b\u0627\u0646\u064a\u0629", "%d \u062b\u0627\u0646\u064a\u0629"], m:["\u0623\u0642\u0644 \u0645\u0646 \u062f\u0642\u064a\u0642\u0629", "\u062f\u0642\u064a\u0642\u0629 \u0648\u0627\u062d\u062f\u0629", ["\u062f\u0642\u064a\u0642\u062a\u0627\u0646", 
  "\u062f\u0642\u064a\u0642\u062a\u064a\u0646"], "%d \u062f\u0642\u0627\u0626\u0642", "%d \u062f\u0642\u064a\u0642\u0629", "%d \u062f\u0642\u064a\u0642\u0629"], h:["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629", "\u0633\u0627\u0639\u0629 \u0648\u0627\u062d\u062f\u0629", ["\u0633\u0627\u0639\u062a\u0627\u0646", "\u0633\u0627\u0639\u062a\u064a\u0646"], "%d \u0633\u0627\u0639\u0627\u062a", "%d \u0633\u0627\u0639\u0629", "%d \u0633\u0627\u0639\u0629"], d:["\u0623\u0642\u0644 \u0645\u0646 \u064a\u0648\u0645", 
  "\u064a\u0648\u0645 \u0648\u0627\u062d\u062f", ["\u064a\u0648\u0645\u0627\u0646", "\u064a\u0648\u0645\u064a\u0646"], "%d \u0623\u064a\u0627\u0645", "%d \u064a\u0648\u0645\u064b\u0627", "%d \u064a\u0648\u0645"], M:["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631", "\u0634\u0647\u0631 \u0648\u0627\u062d\u062f", ["\u0634\u0647\u0631\u0627\u0646", "\u0634\u0647\u0631\u064a\u0646"], "%d \u0623\u0634\u0647\u0631", "%d \u0634\u0647\u0631\u0627", "%d \u0634\u0647\u0631"], y:["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645", 
  "\u0639\u0627\u0645 \u0648\u0627\u062d\u062f", ["\u0639\u0627\u0645\u0627\u0646", "\u0639\u0627\u0645\u064a\u0646"], "%d \u0623\u0639\u0648\u0627\u0645", "%d \u0639\u0627\u0645\u064b\u0627", "%d \u0639\u0627\u0645"]}, pluralize = function(u) {
    return function(number, withoutSuffix, string, isFuture) {
      var f = pluralForm(number), str = plurals[u][pluralForm(number)];
      if (f === 2) {
        str = str[withoutSuffix ? 0 : 1];
      }
      return str.replace(/%d/i, number);
    };
  }, months$1 = ["\u064a\u0646\u0627\u064a\u0631", "\u0641\u0628\u0631\u0627\u064a\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064a\u0644", "\u0645\u0627\u064a\u0648", "\u064a\u0648\u0646\u064a\u0648", "\u064a\u0648\u0644\u064a\u0648", "\u0623\u063a\u0633\u0637\u0633", "\u0633\u0628\u062a\u0645\u0628\u0631", "\u0623\u0643\u062a\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062f\u064a\u0633\u0645\u0628\u0631"];
  hooks.defineLocale("ar-ly", {months:months$1, monthsShort:months$1, weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"), weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"), 
  weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"D/\u200fM/\u200fYYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, meridiemParse:/\u0635|\u0645/, isPM:function(input) {
    return "\u0645" === input;
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u0635";
    } else {
      return "\u0645";
    }
  }, calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay:"[\u063a\u062f\u064b\u0627 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastDay:"[\u0623\u0645\u0633 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse:"L"}, relativeTime:{future:"\u0628\u0639\u062f %s", 
  past:"\u0645\u0646\u0630 %s", s:pluralize("s"), ss:pluralize("s"), m:pluralize("m"), mm:pluralize("m"), h:pluralize("h"), hh:pluralize("h"), d:pluralize("d"), dd:pluralize("d"), M:pluralize("M"), MM:pluralize("M"), y:pluralize("y"), yy:pluralize("y")}, preparse:function(string) {
    return string.replace(/\u060c/g, ",");
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap[match];
    }).replace(/,/g, "\u060c");
  }, week:{dow:6, doy:12}});
  hooks.defineLocale("ar-ma", {months:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"), monthsShort:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"), 
  weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062a\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"), weekdaysShort:"\u0627\u062d\u062f_\u0627\u062a\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"), 
  weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", 
  lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse:"L"}, relativeTime:{future:"\u0641\u064a %s", past:"\u0645\u0646\u0630 %s", s:"\u062b\u0648\u0627\u0646", ss:"%d \u062b\u0627\u0646\u064a\u0629", m:"\u062f\u0642\u064a\u0642\u0629", mm:"%d \u062f\u0642\u0627\u0626\u0642", h:"\u0633\u0627\u0639\u0629", hh:"%d \u0633\u0627\u0639\u0627\u062a", d:"\u064a\u0648\u0645", dd:"%d \u0623\u064a\u0627\u0645", 
  M:"\u0634\u0647\u0631", MM:"%d \u0623\u0634\u0647\u0631", y:"\u0633\u0646\u0629", yy:"%d \u0633\u0646\u0648\u0627\u062a"}, week:{dow:6, doy:12}});
  var symbolMap$1 = {1:"\u0661", 2:"\u0662", 3:"\u0663", 4:"\u0664", 5:"\u0665", 6:"\u0666", 7:"\u0667", 8:"\u0668", 9:"\u0669", 0:"\u0660"}, numberMap = {"\u0661":"1", "\u0662":"2", "\u0663":"3", "\u0664":"4", "\u0665":"5", "\u0666":"6", "\u0667":"7", "\u0668":"8", "\u0669":"9", "\u0660":"0"};
  hooks.defineLocale("ar-sa", {months:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a\u0648_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648_\u0623\u063a\u0633\u0637\u0633_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"), monthsShort:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a\u0648_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648_\u0623\u063a\u0633\u0637\u0633_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"), 
  weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"), weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"), 
  weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, meridiemParse:/\u0635|\u0645/, isPM:function(input) {
    return "\u0645" === input;
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u0635";
    } else {
      return "\u0645";
    }
  }, calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse:"L"}, relativeTime:{future:"\u0641\u064a %s", 
  past:"\u0645\u0646\u0630 %s", s:"\u062b\u0648\u0627\u0646", ss:"%d \u062b\u0627\u0646\u064a\u0629", m:"\u062f\u0642\u064a\u0642\u0629", mm:"%d \u062f\u0642\u0627\u0626\u0642", h:"\u0633\u0627\u0639\u0629", hh:"%d \u0633\u0627\u0639\u0627\u062a", d:"\u064a\u0648\u0645", dd:"%d \u0623\u064a\u0627\u0645", M:"\u0634\u0647\u0631", MM:"%d \u0623\u0634\u0647\u0631", y:"\u0633\u0646\u0629", yy:"%d \u0633\u0646\u0648\u0627\u062a"}, preparse:function(string) {
    return string.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g, function(match) {
      return numberMap[match];
    }).replace(/\u060c/g, ",");
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$1[match];
    }).replace(/,/g, "\u060c");
  }, week:{dow:0, doy:6}});
  hooks.defineLocale("ar-tn", {months:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"), monthsShort:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"), 
  weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"), weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"), 
  weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", 
  lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse:"L"}, relativeTime:{future:"\u0641\u064a %s", past:"\u0645\u0646\u0630 %s", s:"\u062b\u0648\u0627\u0646", ss:"%d \u062b\u0627\u0646\u064a\u0629", m:"\u062f\u0642\u064a\u0642\u0629", mm:"%d \u062f\u0642\u0627\u0626\u0642", h:"\u0633\u0627\u0639\u0629", hh:"%d \u0633\u0627\u0639\u0627\u062a", d:"\u064a\u0648\u0645", dd:"%d \u0623\u064a\u0627\u0645", 
  M:"\u0634\u0647\u0631", MM:"%d \u0623\u0634\u0647\u0631", y:"\u0633\u0646\u0629", yy:"%d \u0633\u0646\u0648\u0627\u062a"}, week:{dow:1, doy:4}});
  var symbolMap$2 = {1:"\u0661", 2:"\u0662", 3:"\u0663", 4:"\u0664", 5:"\u0665", 6:"\u0666", 7:"\u0667", 8:"\u0668", 9:"\u0669", 0:"\u0660"}, numberMap$1 = {"\u0661":"1", "\u0662":"2", "\u0663":"3", "\u0664":"4", "\u0665":"5", "\u0666":"6", "\u0667":"7", "\u0668":"8", "\u0669":"9", "\u0660":"0"}, pluralForm$1 = function(n) {
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
  }, plurals$1 = {s:["\u0623\u0642\u0644 \u0645\u0646 \u062b\u0627\u0646\u064a\u0629", "\u062b\u0627\u0646\u064a\u0629 \u0648\u0627\u062d\u062f\u0629", ["\u062b\u0627\u0646\u064a\u062a\u0627\u0646", "\u062b\u0627\u0646\u064a\u062a\u064a\u0646"], "%d \u062b\u0648\u0627\u0646", "%d \u062b\u0627\u0646\u064a\u0629", "%d \u062b\u0627\u0646\u064a\u0629"], m:["\u0623\u0642\u0644 \u0645\u0646 \u062f\u0642\u064a\u0642\u0629", "\u062f\u0642\u064a\u0642\u0629 \u0648\u0627\u062d\u062f\u0629", ["\u062f\u0642\u064a\u0642\u062a\u0627\u0646", 
  "\u062f\u0642\u064a\u0642\u062a\u064a\u0646"], "%d \u062f\u0642\u0627\u0626\u0642", "%d \u062f\u0642\u064a\u0642\u0629", "%d \u062f\u0642\u064a\u0642\u0629"], h:["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629", "\u0633\u0627\u0639\u0629 \u0648\u0627\u062d\u062f\u0629", ["\u0633\u0627\u0639\u062a\u0627\u0646", "\u0633\u0627\u0639\u062a\u064a\u0646"], "%d \u0633\u0627\u0639\u0627\u062a", "%d \u0633\u0627\u0639\u0629", "%d \u0633\u0627\u0639\u0629"], d:["\u0623\u0642\u0644 \u0645\u0646 \u064a\u0648\u0645", 
  "\u064a\u0648\u0645 \u0648\u0627\u062d\u062f", ["\u064a\u0648\u0645\u0627\u0646", "\u064a\u0648\u0645\u064a\u0646"], "%d \u0623\u064a\u0627\u0645", "%d \u064a\u0648\u0645\u064b\u0627", "%d \u064a\u0648\u0645"], M:["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631", "\u0634\u0647\u0631 \u0648\u0627\u062d\u062f", ["\u0634\u0647\u0631\u0627\u0646", "\u0634\u0647\u0631\u064a\u0646"], "%d \u0623\u0634\u0647\u0631", "%d \u0634\u0647\u0631\u0627", "%d \u0634\u0647\u0631"], y:["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645", 
  "\u0639\u0627\u0645 \u0648\u0627\u062d\u062f", ["\u0639\u0627\u0645\u0627\u0646", "\u0639\u0627\u0645\u064a\u0646"], "%d \u0623\u0639\u0648\u0627\u0645", "%d \u0639\u0627\u0645\u064b\u0627", "%d \u0639\u0627\u0645"]}, pluralize$1 = function(u) {
    return function(number, withoutSuffix, string, isFuture) {
      var f = pluralForm$1(number), str = plurals$1[u][pluralForm$1(number)];
      if (f === 2) {
        str = str[withoutSuffix ? 0 : 1];
      }
      return str.replace(/%d/i, number);
    };
  }, months$2 = ["\u064a\u0646\u0627\u064a\u0631", "\u0641\u0628\u0631\u0627\u064a\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064a\u0644", "\u0645\u0627\u064a\u0648", "\u064a\u0648\u0646\u064a\u0648", "\u064a\u0648\u0644\u064a\u0648", "\u0623\u063a\u0633\u0637\u0633", "\u0633\u0628\u062a\u0645\u0628\u0631", "\u0623\u0643\u062a\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062f\u064a\u0633\u0645\u0628\u0631"];
  hooks.defineLocale("ar", {months:months$2, monthsShort:months$2, weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"), weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"), 
  weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"D/\u200fM/\u200fYYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, meridiemParse:/\u0635|\u0645/, isPM:function(input) {
    return "\u0645" === input;
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u0635";
    } else {
      return "\u0645";
    }
  }, calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextDay:"[\u063a\u062f\u064b\u0627 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT", nextWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastDay:"[\u0623\u0645\u0633 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT", lastWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT", sameElse:"L"}, relativeTime:{future:"\u0628\u0639\u062f %s", 
  past:"\u0645\u0646\u0630 %s", s:pluralize$1("s"), ss:pluralize$1("s"), m:pluralize$1("m"), mm:pluralize$1("m"), h:pluralize$1("h"), hh:pluralize$1("h"), d:pluralize$1("d"), dd:pluralize$1("d"), M:pluralize$1("M"), MM:pluralize$1("M"), y:pluralize$1("y"), yy:pluralize$1("y")}, preparse:function(string) {
    return string.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g, function(match) {
      return numberMap$1[match];
    }).replace(/\u060c/g, ",");
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$2[match];
    }).replace(/,/g, "\u060c");
  }, week:{dow:6, doy:12}});
  var suffixes = {1:"-inci", 5:"-inci", 8:"-inci", 70:"-inci", 80:"-inci", 2:"-nci", 7:"-nci", 20:"-nci", 50:"-nci", 3:"-\u00fcnc\u00fc", 4:"-\u00fcnc\u00fc", 100:"-\u00fcnc\u00fc", 6:"-nc\u0131", 9:"-uncu", 10:"-uncu", 30:"-uncu", 60:"-\u0131nc\u0131", 90:"-\u0131nc\u0131"};
  hooks.defineLocale("az", {months:"yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"), monthsShort:"yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"), weekdays:"Bazar_Bazar ert\u0259si_\u00c7\u0259r\u015f\u0259nb\u0259 ax\u015fam\u0131_\u00c7\u0259r\u015f\u0259nb\u0259_C\u00fcm\u0259 ax\u015fam\u0131_C\u00fcm\u0259_\u015e\u0259nb\u0259".split("_"), weekdaysShort:"Baz_BzE_\u00c7Ax_\u00c7\u0259r_CAx_C\u00fcm_\u015e\u0259n".split("_"), weekdaysMin:"Bz_BE_\u00c7A_\u00c7\u0259_CA_C\u00fc_\u015e\u0259".split("_"), 
  weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[bug\u00fcn saat] LT", nextDay:"[sabah saat] LT", nextWeek:"[g\u0259l\u0259n h\u0259ft\u0259] dddd [saat] LT", lastDay:"[d\u00fcn\u0259n] LT", lastWeek:"[ke\u00e7\u0259n h\u0259ft\u0259] dddd [saat] LT", sameElse:"L"}, relativeTime:{future:"%s sonra", past:"%s \u0259vv\u0259l", s:"birne\u00e7\u0259 saniy\u0259", ss:"%d saniy\u0259", 
  m:"bir d\u0259qiq\u0259", mm:"%d d\u0259qiq\u0259", h:"bir saat", hh:"%d saat", d:"bir g\u00fcn", dd:"%d g\u00fcn", M:"bir ay", MM:"%d ay", y:"bir il", yy:"%d il"}, meridiemParse:/gec\u0259|s\u0259h\u0259r|g\u00fcnd\u00fcz|ax\u015fam/, isPM:function(input) {
    return /^(g\u00fcnd\u00fcz|ax\u015fam)$/.test(input);
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "gec\u0259";
    } else {
      if (hour < 12) {
        return "s\u0259h\u0259r";
      } else {
        if (hour < 17) {
          return "g\u00fcnd\u00fcz";
        } else {
          return "ax\u015fam";
        }
      }
    }
  }, dayOfMonthOrdinalParse:/\d{1,2}-(\u0131nc\u0131|inci|nci|\u00fcnc\u00fc|nc\u0131|uncu)/, ordinal:function(number) {
    if (number === 0) {
      return number + "-\u0131nc\u0131";
    }
    var a = number % 10, b = number % 100 - a, c = number >= 100 ? 100 : null;
    return number + (suffixes[a] || suffixes[b] || suffixes[c]);
  }, week:{dow:1, doy:7}});
  function plural(word, num) {
    var forms = word.split("_");
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
  }
  function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {"ss":withoutSuffix ? "\u0441\u0435\u043a\u0443\u043d\u0434\u0430_\u0441\u0435\u043a\u0443\u043d\u0434\u044b_\u0441\u0435\u043a\u0443\u043d\u0434" : "\u0441\u0435\u043a\u0443\u043d\u0434\u0443_\u0441\u0435\u043a\u0443\u043d\u0434\u044b_\u0441\u0435\u043a\u0443\u043d\u0434", "mm":withoutSuffix ? "\u0445\u0432\u0456\u043b\u0456\u043d\u0430_\u0445\u0432\u0456\u043b\u0456\u043d\u044b_\u0445\u0432\u0456\u043b\u0456\u043d" : "\u0445\u0432\u0456\u043b\u0456\u043d\u0443_\u0445\u0432\u0456\u043b\u0456\u043d\u044b_\u0445\u0432\u0456\u043b\u0456\u043d", 
    "hh":withoutSuffix ? "\u0433\u0430\u0434\u0437\u0456\u043d\u0430_\u0433\u0430\u0434\u0437\u0456\u043d\u044b_\u0433\u0430\u0434\u0437\u0456\u043d" : "\u0433\u0430\u0434\u0437\u0456\u043d\u0443_\u0433\u0430\u0434\u0437\u0456\u043d\u044b_\u0433\u0430\u0434\u0437\u0456\u043d", "dd":"\u0434\u0437\u0435\u043d\u044c_\u0434\u043d\u0456_\u0434\u0437\u0451\u043d", "MM":"\u043c\u0435\u0441\u044f\u0446_\u043c\u0435\u0441\u044f\u0446\u044b_\u043c\u0435\u0441\u044f\u0446\u0430\u045e", "yy":"\u0433\u043e\u0434_\u0433\u0430\u0434\u044b_\u0433\u0430\u0434\u043e\u045e"};
    if (key === "m") {
      return withoutSuffix ? "\u0445\u0432\u0456\u043b\u0456\u043d\u0430" : "\u0445\u0432\u0456\u043b\u0456\u043d\u0443";
    } else {
      if (key === "h") {
        return withoutSuffix ? "\u0433\u0430\u0434\u0437\u0456\u043d\u0430" : "\u0433\u0430\u0434\u0437\u0456\u043d\u0443";
      } else {
        return number + " " + plural(format[key], +number);
      }
    }
  }
  hooks.defineLocale("be", {months:{format:"\u0441\u0442\u0443\u0434\u0437\u0435\u043d\u044f_\u043b\u044e\u0442\u0430\u0433\u0430_\u0441\u0430\u043a\u0430\u0432\u0456\u043a\u0430_\u043a\u0440\u0430\u0441\u0430\u0432\u0456\u043a\u0430_\u0442\u0440\u0430\u045e\u043d\u044f_\u0447\u044d\u0440\u0432\u0435\u043d\u044f_\u043b\u0456\u043f\u0435\u043d\u044f_\u0436\u043d\u0456\u045e\u043d\u044f_\u0432\u0435\u0440\u0430\u0441\u043d\u044f_\u043a\u0430\u0441\u0442\u0440\u044b\u0447\u043d\u0456\u043a\u0430_\u043b\u0456\u0441\u0442\u0430\u043f\u0430\u0434\u0430_\u0441\u043d\u0435\u0436\u043d\u044f".split("_"), 
  standalone:"\u0441\u0442\u0443\u0434\u0437\u0435\u043d\u044c_\u043b\u044e\u0442\u044b_\u0441\u0430\u043a\u0430\u0432\u0456\u043a_\u043a\u0440\u0430\u0441\u0430\u0432\u0456\u043a_\u0442\u0440\u0430\u0432\u0435\u043d\u044c_\u0447\u044d\u0440\u0432\u0435\u043d\u044c_\u043b\u0456\u043f\u0435\u043d\u044c_\u0436\u043d\u0456\u0432\u0435\u043d\u044c_\u0432\u0435\u0440\u0430\u0441\u0435\u043d\u044c_\u043a\u0430\u0441\u0442\u0440\u044b\u0447\u043d\u0456\u043a_\u043b\u0456\u0441\u0442\u0430\u043f\u0430\u0434_\u0441\u043d\u0435\u0436\u0430\u043d\u044c".split("_")}, 
  monthsShort:"\u0441\u0442\u0443\u0434_\u043b\u044e\u0442_\u0441\u0430\u043a_\u043a\u0440\u0430\u0441_\u0442\u0440\u0430\u0432_\u0447\u044d\u0440\u0432_\u043b\u0456\u043f_\u0436\u043d\u0456\u0432_\u0432\u0435\u0440_\u043a\u0430\u0441\u0442_\u043b\u0456\u0441\u0442_\u0441\u043d\u0435\u0436".split("_"), weekdays:{format:"\u043d\u044f\u0434\u0437\u0435\u043b\u044e_\u043f\u0430\u043d\u044f\u0434\u0437\u0435\u043b\u0430\u043a_\u0430\u045e\u0442\u043e\u0440\u0430\u043a_\u0441\u0435\u0440\u0430\u0434\u0443_\u0447\u0430\u0446\u0432\u0435\u0440_\u043f\u044f\u0442\u043d\u0456\u0446\u0443_\u0441\u0443\u0431\u043e\u0442\u0443".split("_"), 
  standalone:"\u043d\u044f\u0434\u0437\u0435\u043b\u044f_\u043f\u0430\u043d\u044f\u0434\u0437\u0435\u043b\u0430\u043a_\u0430\u045e\u0442\u043e\u0440\u0430\u043a_\u0441\u0435\u0440\u0430\u0434\u0430_\u0447\u0430\u0446\u0432\u0435\u0440_\u043f\u044f\u0442\u043d\u0456\u0446\u0430_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"), isFormat:/\[ ?[\u0423\u0443\u045e] ?(?:\u043c\u0456\u043d\u0443\u043b\u0443\u044e|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u0443\u044e)? ?\] ?dddd/}, weekdaysShort:"\u043d\u0434_\u043f\u043d_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043f\u0442_\u0441\u0431".split("_"), 
  weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043f\u0442_\u0441\u0431".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY \u0433.", LLL:"D MMMM YYYY \u0433., HH:mm", LLLL:"dddd, D MMMM YYYY \u0433., HH:mm"}, calendar:{sameDay:"[\u0421\u0451\u043d\u043d\u044f \u045e] LT", nextDay:"[\u0417\u0430\u045e\u0442\u0440\u0430 \u045e] LT", lastDay:"[\u0423\u0447\u043e\u0440\u0430 \u045e] LT", nextWeek:function() {
    return "[\u0423] dddd [\u045e] LT";
  }, lastWeek:function() {
    switch(this.day()) {
      case 0:
      case 3:
      case 5:
      case 6:
        return "[\u0423 \u043c\u0456\u043d\u0443\u043b\u0443\u044e] dddd [\u045e] LT";
      case 1:
      case 2:
      case 4:
        return "[\u0423 \u043c\u0456\u043d\u0443\u043b\u044b] dddd [\u045e] LT";
    }
  }, sameElse:"L"}, relativeTime:{future:"\u043f\u0440\u0430\u0437 %s", past:"%s \u0442\u0430\u043c\u0443", s:"\u043d\u0435\u043a\u0430\u043b\u044c\u043a\u0456 \u0441\u0435\u043a\u0443\u043d\u0434", m:relativeTimeWithPlural, mm:relativeTimeWithPlural, h:relativeTimeWithPlural, hh:relativeTimeWithPlural, d:"\u0434\u0437\u0435\u043d\u044c", dd:relativeTimeWithPlural, M:"\u043c\u0435\u0441\u044f\u0446", MM:relativeTimeWithPlural, y:"\u0433\u043e\u0434", yy:relativeTimeWithPlural}, meridiemParse:/\u043d\u043e\u0447\u044b|\u0440\u0430\u043d\u0456\u0446\u044b|\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430/, 
  isPM:function(input) {
    return /^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430)$/.test(input);
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u043d\u043e\u0447\u044b";
    } else {
      if (hour < 12) {
        return "\u0440\u0430\u043d\u0456\u0446\u044b";
      } else {
        if (hour < 17) {
          return "\u0434\u043d\u044f";
        } else {
          return "\u0432\u0435\u0447\u0430\u0440\u0430";
        }
      }
    }
  }, dayOfMonthOrdinalParse:/\d{1,2}-(\u0456|\u044b|\u0433\u0430)/, ordinal:function(number, period) {
    switch(period) {
      case "M":
      case "d":
      case "DDD":
      case "w":
      case "W":
        return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + "-\u0456" : number + "-\u044b";
      case "D":
        return number + "-\u0433\u0430";
      default:
        return number;
    }
  }, week:{dow:1, doy:7}});
  hooks.defineLocale("bg", {months:"\u044f\u043d\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0439_\u044e\u043d\u0438_\u044e\u043b\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438_\u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438_\u043d\u043e\u0435\u043c\u0432\u0440\u0438_\u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split("_"), monthsShort:"\u044f\u043d\u0440_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u044e\u043d\u0438_\u044e\u043b\u0438_\u0430\u0432\u0433_\u0441\u0435\u043f_\u043e\u043a\u0442_\u043d\u043e\u0435_\u0434\u0435\u043a".split("_"), 
  weekdays:"\u043d\u0435\u0434\u0435\u043b\u044f_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u044f\u0434\u0430_\u0447\u0435\u0442\u0432\u044a\u0440\u0442\u044a\u043a_\u043f\u0435\u0442\u044a\u043a_\u0441\u044a\u0431\u043e\u0442\u0430".split("_"), weekdaysShort:"\u043d\u0435\u0434_\u043f\u043e\u043d_\u0432\u0442\u043e_\u0441\u0440\u044f_\u0447\u0435\u0442_\u043f\u0435\u0442_\u0441\u044a\u0431".split("_"), weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"), 
  longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"D.MM.YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY H:mm", LLLL:"dddd, D MMMM YYYY H:mm"}, calendar:{sameDay:"[\u0414\u043d\u0435\u0441 \u0432] LT", nextDay:"[\u0423\u0442\u0440\u0435 \u0432] LT", nextWeek:"dddd [\u0432] LT", lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432] LT", lastWeek:function() {
    switch(this.day()) {
      case 0:
      case 3:
      case 6:
        return "[\u0412 \u0438\u0437\u043c\u0438\u043d\u0430\u043b\u0430\u0442\u0430] dddd [\u0432] LT";
      case 1:
      case 2:
      case 4:
      case 5:
        return "[\u0412 \u0438\u0437\u043c\u0438\u043d\u0430\u043b\u0438\u044f] dddd [\u0432] LT";
    }
  }, sameElse:"L"}, relativeTime:{future:"\u0441\u043b\u0435\u0434 %s", past:"\u043f\u0440\u0435\u0434\u0438 %s", s:"\u043d\u044f\u043a\u043e\u043b\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434\u0438", ss:"%d \u0441\u0435\u043a\u0443\u043d\u0434\u0438", m:"\u043c\u0438\u043d\u0443\u0442\u0430", mm:"%d \u043c\u0438\u043d\u0443\u0442\u0438", h:"\u0447\u0430\u0441", hh:"%d \u0447\u0430\u0441\u0430", d:"\u0434\u0435\u043d", dd:"%d \u0434\u043d\u0438", M:"\u043c\u0435\u0441\u0435\u0446", MM:"%d \u043c\u0435\u0441\u0435\u0446\u0430", 
  y:"\u0433\u043e\u0434\u0438\u043d\u0430", yy:"%d \u0433\u043e\u0434\u0438\u043d\u0438"}, dayOfMonthOrdinalParse:/\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/, ordinal:function(number) {
    var lastDigit = number % 10, last2Digits = number % 100;
    if (number === 0) {
      return number + "-\u0435\u0432";
    } else {
      if (last2Digits === 0) {
        return number + "-\u0435\u043d";
      } else {
        if (last2Digits > 10 && last2Digits < 20) {
          return number + "-\u0442\u0438";
        } else {
          if (lastDigit === 1) {
            return number + "-\u0432\u0438";
          } else {
            if (lastDigit === 2) {
              return number + "-\u0440\u0438";
            } else {
              if (lastDigit === 7 || lastDigit === 8) {
                return number + "-\u043c\u0438";
              } else {
                return number + "-\u0442\u0438";
              }
            }
          }
        }
      }
    }
  }, week:{dow:1, doy:7}});
  hooks.defineLocale("bm", {months:"Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_M\u025bkalo_Zuw\u025bnkalo_Zuluyekalo_Utikalo_S\u025btanburukalo_\u0254kut\u0254burukalo_Nowanburukalo_Desanburukalo".split("_"), monthsShort:"Zan_Few_Mar_Awi_M\u025b_Zuw_Zul_Uti_S\u025bt_\u0254ku_Now_Des".split("_"), weekdays:"Kari_Nt\u025bn\u025bn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"), weekdaysShort:"Kar_Nt\u025b_Tar_Ara_Ala_Jum_Sib".split("_"), weekdaysMin:"Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"), longDateFormat:{LT:"HH:mm", 
  LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"MMMM [tile] D [san] YYYY", LLL:"MMMM [tile] D [san] YYYY [l\u025br\u025b] HH:mm", LLLL:"dddd MMMM [tile] D [san] YYYY [l\u025br\u025b] HH:mm"}, calendar:{sameDay:"[Bi l\u025br\u025b] LT", nextDay:"[Sini l\u025br\u025b] LT", nextWeek:"dddd [don l\u025br\u025b] LT", lastDay:"[Kunu l\u025br\u025b] LT", lastWeek:"dddd [t\u025bm\u025bnen l\u025br\u025b] LT", sameElse:"L"}, relativeTime:{future:"%s k\u0254n\u0254", past:"a b\u025b %s b\u0254", s:"sanga dama dama", 
  ss:"sekondi %d", m:"miniti kelen", mm:"miniti %d", h:"l\u025br\u025b kelen", hh:"l\u025br\u025b %d", d:"tile kelen", dd:"tile %d", M:"kalo kelen", MM:"kalo %d", y:"san kelen", yy:"san %d"}, week:{dow:1, doy:4}});
  var symbolMap$3 = {1:"\u09e7", 2:"\u09e8", 3:"\u09e9", 4:"\u09ea", 5:"\u09eb", 6:"\u09ec", 7:"\u09ed", 8:"\u09ee", 9:"\u09ef", 0:"\u09e6"}, numberMap$2 = {"\u09e7":"1", "\u09e8":"2", "\u09e9":"3", "\u09ea":"4", "\u09eb":"5", "\u09ec":"6", "\u09ed":"7", "\u09ee":"8", "\u09ef":"9", "\u09e6":"0"};
  hooks.defineLocale("bn", {months:"\u099c\u09be\u09a8\u09c1\u09df\u09be\u09b0\u09c0_\u09ab\u09c7\u09ac\u09cd\u09b0\u09c1\u09df\u09be\u09b0\u09bf_\u09ae\u09be\u09b0\u09cd\u099a_\u098f\u09aa\u09cd\u09b0\u09bf\u09b2_\u09ae\u09c7_\u099c\u09c1\u09a8_\u099c\u09c1\u09b2\u09be\u0987_\u0986\u0997\u09b8\u09cd\u099f_\u09b8\u09c7\u09aa\u09cd\u099f\u09c7\u09ae\u09cd\u09ac\u09b0_\u0985\u0995\u09cd\u099f\u09cb\u09ac\u09b0_\u09a8\u09ad\u09c7\u09ae\u09cd\u09ac\u09b0_\u09a1\u09bf\u09b8\u09c7\u09ae\u09cd\u09ac\u09b0".split("_"), 
  monthsShort:"\u099c\u09be\u09a8\u09c1_\u09ab\u09c7\u09ac_\u09ae\u09be\u09b0\u09cd\u099a_\u098f\u09aa\u09cd\u09b0_\u09ae\u09c7_\u099c\u09c1\u09a8_\u099c\u09c1\u09b2_\u0986\u0997_\u09b8\u09c7\u09aa\u09cd\u099f_\u0985\u0995\u09cd\u099f\u09cb_\u09a8\u09ad\u09c7_\u09a1\u09bf\u09b8\u09c7".split("_"), weekdays:"\u09b0\u09ac\u09bf\u09ac\u09be\u09b0_\u09b8\u09cb\u09ae\u09ac\u09be\u09b0_\u09ae\u0999\u09cd\u0997\u09b2\u09ac\u09be\u09b0_\u09ac\u09c1\u09a7\u09ac\u09be\u09b0_\u09ac\u09c3\u09b9\u09b8\u09cd\u09aa\u09a4\u09bf\u09ac\u09be\u09b0_\u09b6\u09c1\u0995\u09cd\u09b0\u09ac\u09be\u09b0_\u09b6\u09a8\u09bf\u09ac\u09be\u09b0".split("_"), 
  weekdaysShort:"\u09b0\u09ac\u09bf_\u09b8\u09cb\u09ae_\u09ae\u0999\u09cd\u0997\u09b2_\u09ac\u09c1\u09a7_\u09ac\u09c3\u09b9\u09b8\u09cd\u09aa\u09a4\u09bf_\u09b6\u09c1\u0995\u09cd\u09b0_\u09b6\u09a8\u09bf".split("_"), weekdaysMin:"\u09b0\u09ac\u09bf_\u09b8\u09cb\u09ae_\u09ae\u0999\u09cd\u0997_\u09ac\u09c1\u09a7_\u09ac\u09c3\u09b9\u0983_\u09b6\u09c1\u0995\u09cd\u09b0_\u09b6\u09a8\u09bf".split("_"), longDateFormat:{LT:"A h:mm \u09b8\u09ae\u09df", LTS:"A h:mm:ss \u09b8\u09ae\u09df", L:"DD/MM/YYYY", LL:"D MMMM YYYY", 
  LLL:"D MMMM YYYY, A h:mm \u09b8\u09ae\u09df", LLLL:"dddd, D MMMM YYYY, A h:mm \u09b8\u09ae\u09df"}, calendar:{sameDay:"[\u0986\u099c] LT", nextDay:"[\u0986\u0997\u09be\u09ae\u09c0\u0995\u09be\u09b2] LT", nextWeek:"dddd, LT", lastDay:"[\u0997\u09a4\u0995\u09be\u09b2] LT", lastWeek:"[\u0997\u09a4] dddd, LT", sameElse:"L"}, relativeTime:{future:"%s \u09aa\u09b0\u09c7", past:"%s \u0986\u0997\u09c7", s:"\u0995\u09df\u09c7\u0995 \u09b8\u09c7\u0995\u09c7\u09a8\u09cd\u09a1", ss:"%d \u09b8\u09c7\u0995\u09c7\u09a8\u09cd\u09a1", 
  m:"\u098f\u0995 \u09ae\u09bf\u09a8\u09bf\u099f", mm:"%d \u09ae\u09bf\u09a8\u09bf\u099f", h:"\u098f\u0995 \u0998\u09a8\u09cd\u099f\u09be", hh:"%d \u0998\u09a8\u09cd\u099f\u09be", d:"\u098f\u0995 \u09a6\u09bf\u09a8", dd:"%d \u09a6\u09bf\u09a8", M:"\u098f\u0995 \u09ae\u09be\u09b8", MM:"%d \u09ae\u09be\u09b8", y:"\u098f\u0995 \u09ac\u099b\u09b0", yy:"%d \u09ac\u099b\u09b0"}, preparse:function(string) {
    return string.replace(/[\u09e7\u09e8\u09e9\u09ea\u09eb\u09ec\u09ed\u09ee\u09ef\u09e6]/g, function(match) {
      return numberMap$2[match];
    });
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$3[match];
    });
  }, meridiemParse:/\u09b0\u09be\u09a4|\u09b8\u0995\u09be\u09b2|\u09a6\u09c1\u09aa\u09c1\u09b0|\u09ac\u09bf\u0995\u09be\u09b2|\u09b0\u09be\u09a4/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u09b0\u09be\u09a4" && hour >= 4 || meridiem === "\u09a6\u09c1\u09aa\u09c1\u09b0" && hour < 5 || meridiem === "\u09ac\u09bf\u0995\u09be\u09b2") {
      return hour + 12;
    } else {
      return hour;
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u09b0\u09be\u09a4";
    } else {
      if (hour < 10) {
        return "\u09b8\u0995\u09be\u09b2";
      } else {
        if (hour < 17) {
          return "\u09a6\u09c1\u09aa\u09c1\u09b0";
        } else {
          if (hour < 20) {
            return "\u09ac\u09bf\u0995\u09be\u09b2";
          } else {
            return "\u09b0\u09be\u09a4";
          }
        }
      }
    }
  }, week:{dow:0, doy:6}});
  var symbolMap$4 = {1:"\u0f21", 2:"\u0f22", 3:"\u0f23", 4:"\u0f24", 5:"\u0f25", 6:"\u0f26", 7:"\u0f27", 8:"\u0f28", 9:"\u0f29", 0:"\u0f20"}, numberMap$3 = {"\u0f21":"1", "\u0f22":"2", "\u0f23":"3", "\u0f24":"4", "\u0f25":"5", "\u0f26":"6", "\u0f27":"7", "\u0f28":"8", "\u0f29":"9", "\u0f20":"0"};
  hooks.defineLocale("bo", {months:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f44\u0f0b\u0f54\u0f7c_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f66\u0f74\u0f58\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f5e\u0f72\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f63\u0f94\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0fb2\u0f74\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f62\u0f92\u0fb1\u0f51\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f42\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f45\u0f72\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54".split("_"), 
  monthsShort:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f44\u0f0b\u0f54\u0f7c_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f66\u0f74\u0f58\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f5e\u0f72\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f63\u0f94\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0fb2\u0f74\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f62\u0f92\u0fb1\u0f51\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f42\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f45\u0f72\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54".split("_"), 
  weekdays:"\u0f42\u0f5f\u0f60\u0f0b\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f42\u0f5f\u0f60\u0f0b\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"), weekdaysShort:"\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"), 
  weekdaysMin:"\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"), longDateFormat:{LT:"A h:mm", LTS:"A h:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY, A h:mm", LLLL:"dddd, D MMMM YYYY, A h:mm"}, calendar:{sameDay:"[\u0f51\u0f72\u0f0b\u0f62\u0f72\u0f44] LT", nextDay:"[\u0f66\u0f44\u0f0b\u0f49\u0f72\u0f53] LT", 
  nextWeek:"[\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f55\u0fb2\u0f42\u0f0b\u0f62\u0f97\u0f7a\u0f66\u0f0b\u0f58], LT", lastDay:"[\u0f41\u0f0b\u0f66\u0f44] LT", lastWeek:"[\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f55\u0fb2\u0f42\u0f0b\u0f58\u0f50\u0f60\u0f0b\u0f58] dddd, LT", sameElse:"L"}, relativeTime:{future:"%s \u0f63\u0f0b", past:"%s \u0f66\u0f94\u0f53\u0f0b\u0f63", s:"\u0f63\u0f58\u0f0b\u0f66\u0f44", ss:"%d \u0f66\u0f90\u0f62\u0f0b\u0f46\u0f0d", m:"\u0f66\u0f90\u0f62\u0f0b\u0f58\u0f0b\u0f42\u0f45\u0f72\u0f42", 
  mm:"%d \u0f66\u0f90\u0f62\u0f0b\u0f58", h:"\u0f46\u0f74\u0f0b\u0f5a\u0f7c\u0f51\u0f0b\u0f42\u0f45\u0f72\u0f42", hh:"%d \u0f46\u0f74\u0f0b\u0f5a\u0f7c\u0f51", d:"\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f45\u0f72\u0f42", dd:"%d \u0f49\u0f72\u0f53\u0f0b", M:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f45\u0f72\u0f42", MM:"%d \u0f5f\u0fb3\u0f0b\u0f56", y:"\u0f63\u0f7c\u0f0b\u0f42\u0f45\u0f72\u0f42", yy:"%d \u0f63\u0f7c"}, preparse:function(string) {
    return string.replace(/[\u0f21\u0f22\u0f23\u0f24\u0f25\u0f26\u0f27\u0f28\u0f29\u0f20]/g, function(match) {
      return numberMap$3[match];
    });
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$4[match];
    });
  }, meridiemParse:/\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c|\u0f5e\u0f7c\u0f42\u0f66\u0f0b\u0f40\u0f66|\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44|\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42|\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c" && hour >= 4 || meridiem === "\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44" && hour < 5 || meridiem === "\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42") {
      return hour + 12;
    } else {
      return hour;
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c";
    } else {
      if (hour < 10) {
        return "\u0f5e\u0f7c\u0f42\u0f66\u0f0b\u0f40\u0f66";
      } else {
        if (hour < 17) {
          return "\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44";
        } else {
          if (hour < 20) {
            return "\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42";
          } else {
            return "\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c";
          }
        }
      }
    }
  }, week:{dow:0, doy:6}});
  function relativeTimeWithMutation(number, withoutSuffix, key) {
    var format = {"mm":"munutenn", "MM":"miz", "dd":"devezh"};
    return number + " " + mutation(format[key], number);
  }
  function specialMutationForYears(number) {
    switch(lastNumber(number)) {
      case 1:
      case 3:
      case 4:
      case 5:
      case 9:
        return number + " bloaz";
      default:
        return number + " vloaz";
    }
  }
  function lastNumber(number) {
    if (number > 9) {
      return lastNumber(number % 10);
    }
    return number;
  }
  function mutation(text, number) {
    if (number === 2) {
      return softMutation(text);
    }
    return text;
  }
  function softMutation(text) {
    var mutationTable = {"m":"v", "b":"v", "d":"z"};
    if (mutationTable[text.charAt(0)] === undefined) {
      return text;
    }
    return mutationTable[text.charAt(0)] + text.substring(1);
  }
  hooks.defineLocale("br", {months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"), monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"), weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"), weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"), weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"h[e]mm A", LTS:"h[e]mm:ss A", L:"DD/MM/YYYY", LL:"D [a viz] MMMM YYYY", LLL:"D [a viz] MMMM YYYY h[e]mm A", 
  LLLL:"dddd, D [a viz] MMMM YYYY h[e]mm A"}, calendar:{sameDay:"[Hiziv da] LT", nextDay:"[Warc'hoazh da] LT", nextWeek:"dddd [da] LT", lastDay:"[Dec'h da] LT", lastWeek:"dddd [paset da] LT", sameElse:"L"}, relativeTime:{future:"a-benn %s", past:"%s 'zo", s:"un nebeud segondenno\u00f9", ss:"%d eilenn", m:"ur vunutenn", mm:relativeTimeWithMutation, h:"un eur", hh:"%d eur", d:"un devezh", dd:relativeTimeWithMutation, M:"ur miz", MM:relativeTimeWithMutation, y:"ur bloaz", yy:specialMutationForYears}, 
  dayOfMonthOrdinalParse:/\d{1,2}(a\u00f1|vet)/, ordinal:function(number) {
    var output = number === 1 ? "a\u00f1" : "vet";
    return number + output;
  }, week:{dow:1, doy:4}});
  function translate(number, withoutSuffix, key) {
    var result = number + " ";
    switch(key) {
      case "ss":
        if (number === 1) {
          result += "sekunda";
        } else {
          if (number === 2 || number === 3 || number === 4) {
            result += "sekunde";
          } else {
            result += "sekundi";
          }
        }
        return result;
      case "m":
        return withoutSuffix ? "jedna minuta" : "jedne minute";
      case "mm":
        if (number === 1) {
          result += "minuta";
        } else {
          if (number === 2 || number === 3 || number === 4) {
            result += "minute";
          } else {
            result += "minuta";
          }
        }
        return result;
      case "h":
        return withoutSuffix ? "jedan sat" : "jednog sata";
      case "hh":
        if (number === 1) {
          result += "sat";
        } else {
          if (number === 2 || number === 3 || number === 4) {
            result += "sata";
          } else {
            result += "sati";
          }
        }
        return result;
      case "dd":
        if (number === 1) {
          result += "dan";
        } else {
          result += "dana";
        }
        return result;
      case "MM":
        if (number === 1) {
          result += "mjesec";
        } else {
          if (number === 2 || number === 3 || number === 4) {
            result += "mjeseca";
          } else {
            result += "mjeseci";
          }
        }
        return result;
      case "yy":
        if (number === 1) {
          result += "godina";
        } else {
          if (number === 2 || number === 3 || number === 4) {
            result += "godine";
          } else {
            result += "godina";
          }
        }
        return result;
    }
  }
  hooks.defineLocale("bs", {months:"januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"), monthsShort:"jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"), monthsParseExact:true, weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota".split("_"), weekdaysShort:"ned._pon._uto._sri._\u010det._pet._sub.".split("_"), weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", 
  L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY H:mm", LLLL:"dddd, D. MMMM YYYY H:mm"}, calendar:{sameDay:"[danas u] LT", nextDay:"[sutra u] LT", nextWeek:function() {
    switch(this.day()) {
      case 0:
        return "[u] [nedjelju] [u] LT";
      case 3:
        return "[u] [srijedu] [u] LT";
      case 6:
        return "[u] [subotu] [u] LT";
      case 1:
      case 2:
      case 4:
      case 5:
        return "[u] dddd [u] LT";
    }
  }, lastDay:"[ju\u010der u] LT", lastWeek:function() {
    switch(this.day()) {
      case 0:
      case 3:
        return "[pro\u0161lu] dddd [u] LT";
      case 6:
        return "[pro\u0161le] [subote] [u] LT";
      case 1:
      case 2:
      case 4:
      case 5:
        return "[pro\u0161li] dddd [u] LT";
    }
  }, sameElse:"L"}, relativeTime:{future:"za %s", past:"prije %s", s:"par sekundi", ss:translate, m:translate, mm:translate, h:translate, hh:translate, d:"dan", dd:translate, M:"mjesec", MM:translate, y:"godinu", yy:translate}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:7}});
  hooks.defineLocale("ca", {months:{standalone:"gener_febrer_mar\u00e7_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"), format:"de gener_de febrer_de mar\u00e7_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split("_"), isFormat:/D[oD]?(\s)+MMMM/}, monthsShort:"gen._febr._mar\u00e7_abr._maig_juny_jul._ag._set._oct._nov._des.".split("_"), monthsParseExact:true, weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"), 
  weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"), weekdaysMin:"dg_dl_dt_dc_dj_dv_ds".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM [de] YYYY", ll:"D MMM YYYY", LLL:"D MMMM [de] YYYY [a les] H:mm", lll:"D MMM YYYY, H:mm", LLLL:"dddd D MMMM [de] YYYY [a les] H:mm", llll:"ddd D MMM YYYY, H:mm"}, calendar:{sameDay:function() {
    return "[avui a " + (this.hours() !== 1 ? "les" : "la") + "] LT";
  }, nextDay:function() {
    return "[dem\u00e0 a " + (this.hours() !== 1 ? "les" : "la") + "] LT";
  }, nextWeek:function() {
    return "dddd [a " + (this.hours() !== 1 ? "les" : "la") + "] LT";
  }, lastDay:function() {
    return "[ahir a " + (this.hours() !== 1 ? "les" : "la") + "] LT";
  }, lastWeek:function() {
    return "[el] dddd [passat a " + (this.hours() !== 1 ? "les" : "la") + "] LT";
  }, sameElse:"L"}, relativeTime:{future:"d'aqu\u00ed %s", past:"fa %s", s:"uns segons", ss:"%d segons", m:"un minut", mm:"%d minuts", h:"una hora", hh:"%d hores", d:"un dia", dd:"%d dies", M:"un mes", MM:"%d mesos", y:"un any", yy:"%d anys"}, dayOfMonthOrdinalParse:/\d{1,2}(r|n|t|\u00e8|a)/, ordinal:function(number, period) {
    var output = number === 1 ? "r" : number === 2 ? "n" : number === 3 ? "r" : number === 4 ? "t" : "\u00e8";
    if (period === "w" || period === "W") {
      output = "a";
    }
    return number + output;
  }, week:{dow:1, doy:4}});
  var months$3 = "leden_\u00fanor_b\u0159ezen_duben_kv\u011bten_\u010derven_\u010dervenec_srpen_z\u00e1\u0159\u00ed_\u0159\u00edjen_listopad_prosinec".split("_"), monthsShort = "led_\u00fano_b\u0159e_dub_kv\u011b_\u010dvn_\u010dvc_srp_z\u00e1\u0159_\u0159\u00edj_lis_pro".split("_");
  var monthsParse = [/^led/i, /^\u00fano/i, /^b\u0159e/i, /^dub/i, /^kv\u011b/i, /^(\u010dvn|\u010derven$|\u010dervna)/i, /^(\u010dvc|\u010dervenec|\u010dervence)/i, /^srp/i, /^z\u00e1\u0159/i, /^\u0159\u00edj/i, /^lis/i, /^pro/i];
  var monthsRegex$1 = /^(leden|\u00fanor|b\u0159ezen|duben|kv\u011bten|\u010dervenec|\u010dervence|\u010derven|\u010dervna|srpen|z\u00e1\u0159\u00ed|\u0159\u00edjen|listopad|prosinec|led|\u00fano|b\u0159e|dub|kv\u011b|\u010dvn|\u010dvc|srp|z\u00e1\u0159|\u0159\u00edj|lis|pro)/i;
  function plural$1(n) {
    return n > 1 && n < 5 && ~~(n / 10) !== 1;
  }
  function translate$1(number, withoutSuffix, key, isFuture) {
    var result = number + " ";
    switch(key) {
      case "s":
        return withoutSuffix || isFuture ? "p\u00e1r sekund" : "p\u00e1r sekundami";
      case "ss":
        if (withoutSuffix || isFuture) {
          return result + (plural$1(number) ? "sekundy" : "sekund");
        } else {
          return result + "sekundami";
        }
        break;
      case "m":
        return withoutSuffix ? "minuta" : isFuture ? "minutu" : "minutou";
      case "mm":
        if (withoutSuffix || isFuture) {
          return result + (plural$1(number) ? "minuty" : "minut");
        } else {
          return result + "minutami";
        }
        break;
      case "h":
        return withoutSuffix ? "hodina" : isFuture ? "hodinu" : "hodinou";
      case "hh":
        if (withoutSuffix || isFuture) {
          return result + (plural$1(number) ? "hodiny" : "hodin");
        } else {
          return result + "hodinami";
        }
        break;
      case "d":
        return withoutSuffix || isFuture ? "den" : "dnem";
      case "dd":
        if (withoutSuffix || isFuture) {
          return result + (plural$1(number) ? "dny" : "dn\u00ed");
        } else {
          return result + "dny";
        }
        break;
      case "M":
        return withoutSuffix || isFuture ? "m\u011bs\u00edc" : "m\u011bs\u00edcem";
      case "MM":
        if (withoutSuffix || isFuture) {
          return result + (plural$1(number) ? "m\u011bs\u00edce" : "m\u011bs\u00edc\u016f");
        } else {
          return result + "m\u011bs\u00edci";
        }
        break;
      case "y":
        return withoutSuffix || isFuture ? "rok" : "rokem";
      case "yy":
        if (withoutSuffix || isFuture) {
          return result + (plural$1(number) ? "roky" : "let");
        } else {
          return result + "lety";
        }
        break;
    }
  }
  hooks.defineLocale("cs", {months:months$3, monthsShort:monthsShort, monthsRegex:monthsRegex$1, monthsShortRegex:monthsRegex$1, monthsStrictRegex:/^(leden|ledna|\u00fanora|\u00fanor|b\u0159ezen|b\u0159ezna|duben|dubna|kv\u011bten|kv\u011btna|\u010dervenec|\u010dervence|\u010derven|\u010dervna|srpen|srpna|z\u00e1\u0159\u00ed|\u0159\u00edjen|\u0159\u00edjna|listopadu|listopad|prosinec|prosince)/i, monthsShortStrictRegex:/^(led|\u00fano|b\u0159e|dub|kv\u011b|\u010dvn|\u010dvc|srp|z\u00e1\u0159|\u0159\u00edj|lis|pro)/i, 
  monthsParse:monthsParse, longMonthsParse:monthsParse, shortMonthsParse:monthsParse, weekdays:"ned\u011ble_pond\u011bl\u00ed_\u00fater\u00fd_st\u0159eda_\u010dtvrtek_p\u00e1tek_sobota".split("_"), weekdaysShort:"ne_po_\u00fat_st_\u010dt_p\u00e1_so".split("_"), weekdaysMin:"ne_po_\u00fat_st_\u010dt_p\u00e1_so".split("_"), longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY H:mm", LLLL:"dddd D. MMMM YYYY H:mm", l:"D. M. YYYY"}, calendar:{sameDay:"[dnes v] LT", 
  nextDay:"[z\u00edtra v] LT", nextWeek:function() {
    switch(this.day()) {
      case 0:
        return "[v ned\u011bli v] LT";
      case 1:
      case 2:
        return "[v] dddd [v] LT";
      case 3:
        return "[ve st\u0159edu v] LT";
      case 4:
        return "[ve \u010dtvrtek v] LT";
      case 5:
        return "[v p\u00e1tek v] LT";
      case 6:
        return "[v sobotu v] LT";
    }
  }, lastDay:"[v\u010dera v] LT", lastWeek:function() {
    switch(this.day()) {
      case 0:
        return "[minulou ned\u011bli v] LT";
      case 1:
      case 2:
        return "[minul\u00e9] dddd [v] LT";
      case 3:
        return "[minulou st\u0159edu v] LT";
      case 4:
      case 5:
        return "[minul\u00fd] dddd [v] LT";
      case 6:
        return "[minulou sobotu v] LT";
    }
  }, sameElse:"L"}, relativeTime:{future:"za %s", past:"p\u0159ed %s", s:translate$1, ss:translate$1, m:translate$1, mm:translate$1, h:translate$1, hh:translate$1, d:translate$1, dd:translate$1, M:translate$1, MM:translate$1, y:translate$1, yy:translate$1}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  hooks.defineLocale("cv", {months:"\u043a\u04d1\u0440\u043b\u0430\u0447_\u043d\u0430\u0440\u04d1\u0441_\u043f\u0443\u0448_\u0430\u043a\u0430_\u043c\u0430\u0439_\u04ab\u04d7\u0440\u0442\u043c\u0435_\u0443\u0442\u04d1_\u04ab\u0443\u0440\u043b\u0430_\u0430\u0432\u04d1\u043d_\u044e\u043f\u0430_\u0447\u04f3\u043a_\u0440\u0430\u0448\u0442\u0430\u0432".split("_"), monthsShort:"\u043a\u04d1\u0440_\u043d\u0430\u0440_\u043f\u0443\u0448_\u0430\u043a\u0430_\u043c\u0430\u0439_\u04ab\u04d7\u0440_\u0443\u0442\u04d1_\u04ab\u0443\u0440_\u0430\u0432\u043d_\u044e\u043f\u0430_\u0447\u04f3\u043a_\u0440\u0430\u0448".split("_"), 
  weekdays:"\u0432\u044b\u0440\u0441\u0430\u0440\u043d\u0438\u043a\u0443\u043d_\u0442\u0443\u043d\u0442\u0438\u043a\u0443\u043d_\u044b\u0442\u043b\u0430\u0440\u0438\u043a\u0443\u043d_\u044e\u043d\u043a\u0443\u043d_\u043a\u04d7\u04ab\u043d\u0435\u0440\u043d\u0438\u043a\u0443\u043d_\u044d\u0440\u043d\u0435\u043a\u0443\u043d_\u0448\u04d1\u043c\u0430\u0442\u043a\u0443\u043d".split("_"), weekdaysShort:"\u0432\u044b\u0440_\u0442\u0443\u043d_\u044b\u0442\u043b_\u044e\u043d_\u043a\u04d7\u04ab_\u044d\u0440\u043d_\u0448\u04d1\u043c".split("_"), 
  weekdaysMin:"\u0432\u0440_\u0442\u043d_\u044b\u0442_\u044e\u043d_\u043a\u04ab_\u044d\u0440_\u0448\u043c".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD-MM-YYYY", LL:"YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7]", LLL:"YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7], HH:mm", LLLL:"dddd, YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7], HH:mm"}, 
  calendar:{sameDay:"[\u041f\u0430\u044f\u043d] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]", nextDay:"[\u042b\u0440\u0430\u043d] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]", lastDay:"[\u04d6\u043d\u0435\u0440] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]", nextWeek:"[\u04aa\u0438\u0442\u0435\u0441] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]", lastWeek:"[\u0418\u0440\u0442\u043d\u04d7] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]", sameElse:"L"}, relativeTime:{future:function(output) {
    var affix = /\u0441\u0435\u0445\u0435\u0442$/i.exec(output) ? "\u0440\u0435\u043d" : /\u04ab\u0443\u043b$/i.exec(output) ? "\u0442\u0430\u043d" : "\u0440\u0430\u043d";
    return output + affix;
  }, past:"%s \u043a\u0430\u044f\u043b\u043b\u0430", s:"\u043f\u04d7\u0440-\u0438\u043a \u04ab\u0435\u043a\u043a\u0443\u043d\u0442", ss:"%d \u04ab\u0435\u043a\u043a\u0443\u043d\u0442", m:"\u043f\u04d7\u0440 \u043c\u0438\u043d\u0443\u0442", mm:"%d \u043c\u0438\u043d\u0443\u0442", h:"\u043f\u04d7\u0440 \u0441\u0435\u0445\u0435\u0442", hh:"%d \u0441\u0435\u0445\u0435\u0442", d:"\u043f\u04d7\u0440 \u043a\u0443\u043d", dd:"%d \u043a\u0443\u043d", M:"\u043f\u04d7\u0440 \u0443\u0439\u04d1\u0445", MM:"%d \u0443\u0439\u04d1\u0445", 
  y:"\u043f\u04d7\u0440 \u04ab\u0443\u043b", yy:"%d \u04ab\u0443\u043b"}, dayOfMonthOrdinalParse:/\d{1,2}-\u043c\u04d7\u0448/, ordinal:"%d-\u043c\u04d7\u0448", week:{dow:1, doy:7}});
  hooks.defineLocale("cy", {months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"), monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"), weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"), weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"), weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", 
  LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[Heddiw am] LT", nextDay:"[Yfory am] LT", nextWeek:"dddd [am] LT", lastDay:"[Ddoe am] LT", lastWeek:"dddd [diwethaf am] LT", sameElse:"L"}, relativeTime:{future:"mewn %s", past:"%s yn \u00f4l", s:"ychydig eiliadau", ss:"%d eiliad", m:"munud", mm:"%d munud", h:"awr", hh:"%d awr", d:"diwrnod", dd:"%d diwrnod", M:"mis", MM:"%d mis", y:"blwyddyn", yy:"%d flynedd"}, dayOfMonthOrdinalParse:/\d{1,2}(fed|ain|af|il|ydd|ed|eg)/, 
  ordinal:function(number) {
    var b = number, output = "", lookup = ["", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed"];
    if (b > 20) {
      if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
        output = "fed";
      } else {
        output = "ain";
      }
    } else {
      if (b > 0) {
        output = lookup[b];
      }
    }
    return number + output;
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("da", {months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"), monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekdays:"s\u00f8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\u00f8rdag".split("_"), weekdaysShort:"s\u00f8n_man_tir_ons_tor_fre_l\u00f8r".split("_"), weekdaysMin:"s\u00f8_ma_ti_on_to_fr_l\u00f8".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY HH:mm", 
  LLLL:"dddd [d.] D. MMMM YYYY [kl.] HH:mm"}, calendar:{sameDay:"[i dag kl.] LT", nextDay:"[i morgen kl.] LT", nextWeek:"p\u00e5 dddd [kl.] LT", lastDay:"[i g\u00e5r kl.] LT", lastWeek:"[i] dddd[s kl.] LT", sameElse:"L"}, relativeTime:{future:"om %s", past:"%s siden", s:"f\u00e5 sekunder", ss:"%d sekunder", m:"et minut", mm:"%d minutter", h:"en time", hh:"%d timer", d:"en dag", dd:"%d dage", M:"en m\u00e5ned", MM:"%d m\u00e5neder", y:"et \u00e5r", yy:"%d \u00e5r"}, dayOfMonthOrdinalParse:/\d{1,2}\./, 
  ordinal:"%d.", week:{dow:1, doy:4}});
  function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {"m":["eine Minute", "einer Minute"], "h":["eine Stunde", "einer Stunde"], "d":["ein Tag", "einem Tag"], "dd":[number + " Tage", number + " Tagen"], "M":["ein Monat", "einem Monat"], "MM":[number + " Monate", number + " Monaten"], "y":["ein Jahr", "einem Jahr"], "yy":[number + " Jahre", number + " Jahren"]};
    return withoutSuffix ? format[key][0] : format[key][1];
  }
  hooks.defineLocale("de-at", {months:"J\u00e4nner_Februar_M\u00e4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort:"J\u00e4n._Feb._M\u00e4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact:true, weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", 
  LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY HH:mm", LLLL:"dddd, D. MMMM YYYY HH:mm"}, calendar:{sameDay:"[heute um] LT [Uhr]", sameElse:"L", nextDay:"[morgen um] LT [Uhr]", nextWeek:"dddd [um] LT [Uhr]", lastDay:"[gestern um] LT [Uhr]", lastWeek:"[letzten] dddd [um] LT [Uhr]"}, relativeTime:{future:"in %s", past:"vor %s", s:"ein paar Sekunden", ss:"%d Sekunden", m:processRelativeTime, mm:"%d Minuten", h:processRelativeTime, hh:"%d Stunden", d:processRelativeTime, dd:processRelativeTime, 
  M:processRelativeTime, MM:processRelativeTime, y:processRelativeTime, yy:processRelativeTime}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  function processRelativeTime$1(number, withoutSuffix, key, isFuture) {
    var format = {"m":["eine Minute", "einer Minute"], "h":["eine Stunde", "einer Stunde"], "d":["ein Tag", "einem Tag"], "dd":[number + " Tage", number + " Tagen"], "M":["ein Monat", "einem Monat"], "MM":[number + " Monate", number + " Monaten"], "y":["ein Jahr", "einem Jahr"], "yy":[number + " Jahre", number + " Jahren"]};
    return withoutSuffix ? format[key][0] : format[key][1];
  }
  hooks.defineLocale("de-ch", {months:"Januar_Februar_M\u00e4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort:"Jan._Feb._M\u00e4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact:true, weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", 
  L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY HH:mm", LLLL:"dddd, D. MMMM YYYY HH:mm"}, calendar:{sameDay:"[heute um] LT [Uhr]", sameElse:"L", nextDay:"[morgen um] LT [Uhr]", nextWeek:"dddd [um] LT [Uhr]", lastDay:"[gestern um] LT [Uhr]", lastWeek:"[letzten] dddd [um] LT [Uhr]"}, relativeTime:{future:"in %s", past:"vor %s", s:"ein paar Sekunden", ss:"%d Sekunden", m:processRelativeTime$1, mm:"%d Minuten", h:processRelativeTime$1, hh:"%d Stunden", d:processRelativeTime$1, dd:processRelativeTime$1, 
  M:processRelativeTime$1, MM:processRelativeTime$1, y:processRelativeTime$1, yy:processRelativeTime$1}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  function processRelativeTime$2(number, withoutSuffix, key, isFuture) {
    var format = {"m":["eine Minute", "einer Minute"], "h":["eine Stunde", "einer Stunde"], "d":["ein Tag", "einem Tag"], "dd":[number + " Tage", number + " Tagen"], "M":["ein Monat", "einem Monat"], "MM":[number + " Monate", number + " Monaten"], "y":["ein Jahr", "einem Jahr"], "yy":[number + " Jahre", number + " Jahren"]};
    return withoutSuffix ? format[key][0] : format[key][1];
  }
  hooks.defineLocale("de", {months:"Januar_Februar_M\u00e4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort:"Jan._Feb._M\u00e4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), monthsParseExact:true, weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", 
  L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY HH:mm", LLLL:"dddd, D. MMMM YYYY HH:mm"}, calendar:{sameDay:"[heute um] LT [Uhr]", sameElse:"L", nextDay:"[morgen um] LT [Uhr]", nextWeek:"dddd [um] LT [Uhr]", lastDay:"[gestern um] LT [Uhr]", lastWeek:"[letzten] dddd [um] LT [Uhr]"}, relativeTime:{future:"in %s", past:"vor %s", s:"ein paar Sekunden", ss:"%d Sekunden", m:processRelativeTime$2, mm:"%d Minuten", h:processRelativeTime$2, hh:"%d Stunden", d:processRelativeTime$2, dd:processRelativeTime$2, 
  M:processRelativeTime$2, MM:processRelativeTime$2, y:processRelativeTime$2, yy:processRelativeTime$2}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  var months$4 = ["\u0796\u07ac\u0782\u07aa\u0787\u07a6\u0783\u07a9", "\u078a\u07ac\u0784\u07b0\u0783\u07aa\u0787\u07a6\u0783\u07a9", "\u0789\u07a7\u0783\u07a8\u0797\u07aa", "\u0787\u07ad\u0795\u07b0\u0783\u07a9\u078d\u07aa", "\u0789\u07ad", "\u0796\u07ab\u0782\u07b0", "\u0796\u07aa\u078d\u07a6\u0787\u07a8", "\u0787\u07af\u078e\u07a6\u0790\u07b0\u0793\u07aa", "\u0790\u07ac\u0795\u07b0\u0793\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa", "\u0787\u07ae\u0786\u07b0\u0793\u07af\u0784\u07a6\u0783\u07aa", 
  "\u0782\u07ae\u0788\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa", "\u0791\u07a8\u0790\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa"], weekdays = ["\u0787\u07a7\u078b\u07a8\u0787\u07b0\u078c\u07a6", "\u0780\u07af\u0789\u07a6", "\u0787\u07a6\u0782\u07b0\u078e\u07a7\u0783\u07a6", "\u0784\u07aa\u078b\u07a6", "\u0784\u07aa\u0783\u07a7\u0790\u07b0\u078a\u07a6\u078c\u07a8", "\u0780\u07aa\u0786\u07aa\u0783\u07aa", "\u0780\u07ae\u0782\u07a8\u0780\u07a8\u0783\u07aa"];
  hooks.defineLocale("dv", {months:months$4, monthsShort:months$4, weekdays:weekdays, weekdaysShort:weekdays, weekdaysMin:"\u0787\u07a7\u078b\u07a8_\u0780\u07af\u0789\u07a6_\u0787\u07a6\u0782\u07b0_\u0784\u07aa\u078b\u07a6_\u0784\u07aa\u0783\u07a7_\u0780\u07aa\u0786\u07aa_\u0780\u07ae\u0782\u07a8".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"D/M/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, meridiemParse:/\u0789\u0786|\u0789\u078a/, isPM:function(input) {
    return "\u0789\u078a" === input;
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u0789\u0786";
    } else {
      return "\u0789\u078a";
    }
  }, calendar:{sameDay:"[\u0789\u07a8\u0787\u07a6\u078b\u07aa] LT", nextDay:"[\u0789\u07a7\u078b\u07a6\u0789\u07a7] LT", nextWeek:"dddd LT", lastDay:"[\u0787\u07a8\u0787\u07b0\u0794\u07ac] LT", lastWeek:"[\u078a\u07a7\u0787\u07a8\u078c\u07aa\u0788\u07a8] dddd LT", sameElse:"L"}, relativeTime:{future:"\u078c\u07ac\u0783\u07ad\u078e\u07a6\u0787\u07a8 %s", past:"\u0786\u07aa\u0783\u07a8\u0782\u07b0 %s", s:"\u0790\u07a8\u0786\u07aa\u0782\u07b0\u078c\u07aa\u0786\u07ae\u0785\u07ac\u0787\u07b0", ss:"d% \u0790\u07a8\u0786\u07aa\u0782\u07b0\u078c\u07aa", 
  m:"\u0789\u07a8\u0782\u07a8\u0793\u07ac\u0787\u07b0", mm:"\u0789\u07a8\u0782\u07a8\u0793\u07aa %d", h:"\u078e\u07a6\u0791\u07a8\u0787\u07a8\u0783\u07ac\u0787\u07b0", hh:"\u078e\u07a6\u0791\u07a8\u0787\u07a8\u0783\u07aa %d", d:"\u078b\u07aa\u0788\u07a6\u0780\u07ac\u0787\u07b0", dd:"\u078b\u07aa\u0788\u07a6\u0790\u07b0 %d", M:"\u0789\u07a6\u0780\u07ac\u0787\u07b0", MM:"\u0789\u07a6\u0790\u07b0 %d", y:"\u0787\u07a6\u0780\u07a6\u0783\u07ac\u0787\u07b0", yy:"\u0787\u07a6\u0780\u07a6\u0783\u07aa %d"}, 
  preparse:function(string) {
    return string.replace(/\u060c/g, ",");
  }, postformat:function(string) {
    return string.replace(/,/g, "\u060c");
  }, week:{dow:7, doy:12}});
  hooks.defineLocale("el", {monthsNominativeEl:"\u0399\u03b1\u03bd\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2_\u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2_\u039c\u03ac\u03c1\u03c4\u03b9\u03bf\u03c2_\u0391\u03c0\u03c1\u03af\u03bb\u03b9\u03bf\u03c2_\u039c\u03ac\u03b9\u03bf\u03c2_\u0399\u03bf\u03cd\u03bd\u03b9\u03bf\u03c2_\u0399\u03bf\u03cd\u03bb\u03b9\u03bf\u03c2_\u0391\u03cd\u03b3\u03bf\u03c5\u03c3\u03c4\u03bf\u03c2_\u03a3\u03b5\u03c0\u03c4\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2_\u039f\u03ba\u03c4\u03ce\u03b2\u03c1\u03b9\u03bf\u03c2_\u039d\u03bf\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2_\u0394\u03b5\u03ba\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2".split("_"), 
  monthsGenitiveEl:"\u0399\u03b1\u03bd\u03bf\u03c5\u03b1\u03c1\u03af\u03bf\u03c5_\u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03b1\u03c1\u03af\u03bf\u03c5_\u039c\u03b1\u03c1\u03c4\u03af\u03bf\u03c5_\u0391\u03c0\u03c1\u03b9\u03bb\u03af\u03bf\u03c5_\u039c\u03b1\u0390\u03bf\u03c5_\u0399\u03bf\u03c5\u03bd\u03af\u03bf\u03c5_\u0399\u03bf\u03c5\u03bb\u03af\u03bf\u03c5_\u0391\u03c5\u03b3\u03bf\u03cd\u03c3\u03c4\u03bf\u03c5_\u03a3\u03b5\u03c0\u03c4\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5_\u039f\u03ba\u03c4\u03c9\u03b2\u03c1\u03af\u03bf\u03c5_\u039d\u03bf\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5_\u0394\u03b5\u03ba\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5".split("_"), 
  months:function(momentToFormat, format) {
    if (!momentToFormat) {
      return this._monthsNominativeEl;
    } else {
      if (typeof format === "string" && /D/.test(format.substring(0, format.indexOf("MMMM")))) {
        return this._monthsGenitiveEl[momentToFormat.month()];
      } else {
        return this._monthsNominativeEl[momentToFormat.month()];
      }
    }
  }, monthsShort:"\u0399\u03b1\u03bd_\u03a6\u03b5\u03b2_\u039c\u03b1\u03c1_\u0391\u03c0\u03c1_\u039c\u03b1\u03ca_\u0399\u03bf\u03c5\u03bd_\u0399\u03bf\u03c5\u03bb_\u0391\u03c5\u03b3_\u03a3\u03b5\u03c0_\u039f\u03ba\u03c4_\u039d\u03bf\u03b5_\u0394\u03b5\u03ba".split("_"), weekdays:"\u039a\u03c5\u03c1\u03b9\u03b1\u03ba\u03ae_\u0394\u03b5\u03c5\u03c4\u03ad\u03c1\u03b1_\u03a4\u03c1\u03af\u03c4\u03b7_\u03a4\u03b5\u03c4\u03ac\u03c1\u03c4\u03b7_\u03a0\u03ad\u03bc\u03c0\u03c4\u03b7_\u03a0\u03b1\u03c1\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae_\u03a3\u03ac\u03b2\u03b2\u03b1\u03c4\u03bf".split("_"), 
  weekdaysShort:"\u039a\u03c5\u03c1_\u0394\u03b5\u03c5_\u03a4\u03c1\u03b9_\u03a4\u03b5\u03c4_\u03a0\u03b5\u03bc_\u03a0\u03b1\u03c1_\u03a3\u03b1\u03b2".split("_"), weekdaysMin:"\u039a\u03c5_\u0394\u03b5_\u03a4\u03c1_\u03a4\u03b5_\u03a0\u03b5_\u03a0\u03b1_\u03a3\u03b1".split("_"), meridiem:function(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? "\u03bc\u03bc" : "\u039c\u039c";
    } else {
      return isLower ? "\u03c0\u03bc" : "\u03a0\u039c";
    }
  }, isPM:function(input) {
    return (input + "").toLowerCase()[0] === "\u03bc";
  }, meridiemParse:/[\u03a0\u039c]\.?\u039c?\.?/i, longDateFormat:{LT:"h:mm A", LTS:"h:mm:ss A", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY h:mm A", LLLL:"dddd, D MMMM YYYY h:mm A"}, calendarEl:{sameDay:"[\u03a3\u03ae\u03bc\u03b5\u03c1\u03b1 {}] LT", nextDay:"[\u0391\u03cd\u03c1\u03b9\u03bf {}] LT", nextWeek:"dddd [{}] LT", lastDay:"[\u03a7\u03b8\u03b5\u03c2 {}] LT", lastWeek:function() {
    switch(this.day()) {
      case 6:
        return "[\u03c4\u03bf \u03c0\u03c1\u03bf\u03b7\u03b3\u03bf\u03cd\u03bc\u03b5\u03bd\u03bf] dddd [{}] LT";
      default:
        return "[\u03c4\u03b7\u03bd \u03c0\u03c1\u03bf\u03b7\u03b3\u03bf\u03cd\u03bc\u03b5\u03bd\u03b7] dddd [{}] LT";
    }
  }, sameElse:"L"}, calendar:function(key, mom) {
    var output = this._calendarEl[key], hours = mom && mom.hours();
    if (isFunction(output)) {
      output = output.apply(mom);
    }
    return output.replace("{}", hours % 12 === 1 ? "\u03c3\u03c4\u03b7" : "\u03c3\u03c4\u03b9\u03c2");
  }, relativeTime:{future:"\u03c3\u03b5 %s", past:"%s \u03c0\u03c1\u03b9\u03bd", s:"\u03bb\u03af\u03b3\u03b1 \u03b4\u03b5\u03c5\u03c4\u03b5\u03c1\u03cc\u03bb\u03b5\u03c0\u03c4\u03b1", ss:"%d \u03b4\u03b5\u03c5\u03c4\u03b5\u03c1\u03cc\u03bb\u03b5\u03c0\u03c4\u03b1", m:"\u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc", mm:"%d \u03bb\u03b5\u03c0\u03c4\u03ac", h:"\u03bc\u03af\u03b1 \u03ce\u03c1\u03b1", hh:"%d \u03ce\u03c1\u03b5\u03c2", d:"\u03bc\u03af\u03b1 \u03bc\u03ad\u03c1\u03b1", dd:"%d \u03bc\u03ad\u03c1\u03b5\u03c2", 
  M:"\u03ad\u03bd\u03b1\u03c2 \u03bc\u03ae\u03bd\u03b1\u03c2", MM:"%d \u03bc\u03ae\u03bd\u03b5\u03c2", y:"\u03ad\u03bd\u03b1\u03c2 \u03c7\u03c1\u03cc\u03bd\u03bf\u03c2", yy:"%d \u03c7\u03c1\u03cc\u03bd\u03b9\u03b1"}, dayOfMonthOrdinalParse:/\d{1,2}\u03b7/, ordinal:"%d\u03b7", week:{dow:1, doy:4}});
  hooks.defineLocale("en-SG", {months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, 
  calendar:{sameDay:"[Today at] LT", nextDay:"[Tomorrow at] LT", nextWeek:"dddd [at] LT", lastDay:"[Yesterday at] LT", lastWeek:"[Last] dddd [at] LT", sameElse:"L"}, relativeTime:{future:"in %s", past:"%s ago", s:"a few seconds", ss:"%d seconds", m:"a minute", mm:"%d minutes", h:"an hour", hh:"%d hours", d:"a day", dd:"%d days", M:"a month", MM:"%d months", y:"a year", yy:"%d years"}, dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/, ordinal:function(number) {
    var b = number % 10, output = ~~(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("en-au", {months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat:{LT:"h:mm A", LTS:"h:mm:ss A", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY h:mm A", 
  LLLL:"dddd, D MMMM YYYY h:mm A"}, calendar:{sameDay:"[Today at] LT", nextDay:"[Tomorrow at] LT", nextWeek:"dddd [at] LT", lastDay:"[Yesterday at] LT", lastWeek:"[Last] dddd [at] LT", sameElse:"L"}, relativeTime:{future:"in %s", past:"%s ago", s:"a few seconds", ss:"%d seconds", m:"a minute", mm:"%d minutes", h:"an hour", hh:"%d hours", d:"a day", dd:"%d days", M:"a month", MM:"%d months", y:"a year", yy:"%d years"}, dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/, ordinal:function(number) {
    var b = number % 10, output = ~~(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("en-ca", {months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat:{LT:"h:mm A", LTS:"h:mm:ss A", L:"YYYY-MM-DD", LL:"MMMM D, YYYY", LLL:"MMMM D, YYYY h:mm A", 
  LLLL:"dddd, MMMM D, YYYY h:mm A"}, calendar:{sameDay:"[Today at] LT", nextDay:"[Tomorrow at] LT", nextWeek:"dddd [at] LT", lastDay:"[Yesterday at] LT", lastWeek:"[Last] dddd [at] LT", sameElse:"L"}, relativeTime:{future:"in %s", past:"%s ago", s:"a few seconds", ss:"%d seconds", m:"a minute", mm:"%d minutes", h:"an hour", hh:"%d hours", d:"a day", dd:"%d days", M:"a month", MM:"%d months", y:"a year", yy:"%d years"}, dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/, ordinal:function(number) {
    var b = number % 10, output = ~~(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }});
  hooks.defineLocale("en-gb", {months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, 
  calendar:{sameDay:"[Today at] LT", nextDay:"[Tomorrow at] LT", nextWeek:"dddd [at] LT", lastDay:"[Yesterday at] LT", lastWeek:"[Last] dddd [at] LT", sameElse:"L"}, relativeTime:{future:"in %s", past:"%s ago", s:"a few seconds", ss:"%d seconds", m:"a minute", mm:"%d minutes", h:"an hour", hh:"%d hours", d:"a day", dd:"%d days", M:"a month", MM:"%d months", y:"a year", yy:"%d years"}, dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/, ordinal:function(number) {
    var b = number % 10, output = ~~(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("en-ie", {months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, 
  calendar:{sameDay:"[Today at] LT", nextDay:"[Tomorrow at] LT", nextWeek:"dddd [at] LT", lastDay:"[Yesterday at] LT", lastWeek:"[Last] dddd [at] LT", sameElse:"L"}, relativeTime:{future:"in %s", past:"%s ago", s:"a few seconds", ss:"%d seconds", m:"a minute", mm:"%d minutes", h:"an hour", hh:"%d hours", d:"a day", dd:"%d days", M:"a month", MM:"%d months", y:"a year", yy:"%d years"}, dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/, ordinal:function(number) {
    var b = number % 10, output = ~~(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("en-il", {months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, 
  calendar:{sameDay:"[Today at] LT", nextDay:"[Tomorrow at] LT", nextWeek:"dddd [at] LT", lastDay:"[Yesterday at] LT", lastWeek:"[Last] dddd [at] LT", sameElse:"L"}, relativeTime:{future:"in %s", past:"%s ago", s:"a few seconds", m:"a minute", mm:"%d minutes", h:"an hour", hh:"%d hours", d:"a day", dd:"%d days", M:"a month", MM:"%d months", y:"a year", yy:"%d years"}, dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/, ordinal:function(number) {
    var b = number % 10, output = ~~(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }});
  hooks.defineLocale("en-nz", {months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat:{LT:"h:mm A", LTS:"h:mm:ss A", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY h:mm A", 
  LLLL:"dddd, D MMMM YYYY h:mm A"}, calendar:{sameDay:"[Today at] LT", nextDay:"[Tomorrow at] LT", nextWeek:"dddd [at] LT", lastDay:"[Yesterday at] LT", lastWeek:"[Last] dddd [at] LT", sameElse:"L"}, relativeTime:{future:"in %s", past:"%s ago", s:"a few seconds", ss:"%d seconds", m:"a minute", mm:"%d minutes", h:"an hour", hh:"%d hours", d:"a day", dd:"%d days", M:"a month", MM:"%d months", y:"a year", yy:"%d years"}, dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/, ordinal:function(number) {
    var b = number % 10, output = ~~(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("eo", {months:"januaro_februaro_marto_aprilo_majo_junio_julio_a\u016dgusto_septembro_oktobro_novembro_decembro".split("_"), monthsShort:"jan_feb_mar_apr_maj_jun_jul_a\u016dg_sep_okt_nov_dec".split("_"), weekdays:"diman\u0109o_lundo_mardo_merkredo_\u0135a\u016ddo_vendredo_sabato".split("_"), weekdaysShort:"dim_lun_mard_merk_\u0135a\u016d_ven_sab".split("_"), weekdaysMin:"di_lu_ma_me_\u0135a_ve_sa".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"YYYY-MM-DD", LL:"D[-a de] MMMM, YYYY", 
  LLL:"D[-a de] MMMM, YYYY HH:mm", LLLL:"dddd, [la] D[-a de] MMMM, YYYY HH:mm"}, meridiemParse:/[ap]\.t\.m/i, isPM:function(input) {
    return input.charAt(0).toLowerCase() === "p";
  }, meridiem:function(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? "p.t.m." : "P.T.M.";
    } else {
      return isLower ? "a.t.m." : "A.T.M.";
    }
  }, calendar:{sameDay:"[Hodia\u016d je] LT", nextDay:"[Morga\u016d je] LT", nextWeek:"dddd [je] LT", lastDay:"[Hiera\u016d je] LT", lastWeek:"[pasinta] dddd [je] LT", sameElse:"L"}, relativeTime:{future:"post %s", past:"anta\u016d %s", s:"sekundoj", ss:"%d sekundoj", m:"minuto", mm:"%d minutoj", h:"horo", hh:"%d horoj", d:"tago", dd:"%d tagoj", M:"monato", MM:"%d monatoj", y:"jaro", yy:"%d jaroj"}, dayOfMonthOrdinalParse:/\d{1,2}a/, ordinal:"%da", week:{dow:1, doy:7}});
  var monthsShortDot = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), monthsShort$1 = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
  var monthsParse$1 = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
  var monthsRegex$2 = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
  hooks.defineLocale("es-do", {months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort:function(m, format) {
    if (!m) {
      return monthsShortDot;
    } else {
      if (/-MMM-/.test(format)) {
        return monthsShort$1[m.month()];
      } else {
        return monthsShortDot[m.month()];
      }
    }
  }, monthsRegex:monthsRegex$2, monthsShortRegex:monthsRegex$2, monthsStrictRegex:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex:/^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse:monthsParse$1, longMonthsParse:monthsParse$1, shortMonthsParse:monthsParse$1, weekdays:"domingo_lunes_martes_mi\u00e9rcoles_jueves_viernes_s\u00e1bado".split("_"), weekdaysShort:"dom._lun._mar._mi\u00e9._jue._vie._s\u00e1b.".split("_"), 
  weekdaysMin:"do_lu_ma_mi_ju_vi_s\u00e1".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"h:mm A", LTS:"h:mm:ss A", L:"DD/MM/YYYY", LL:"D [de] MMMM [de] YYYY", LLL:"D [de] MMMM [de] YYYY h:mm A", LLLL:"dddd, D [de] MMMM [de] YYYY h:mm A"}, calendar:{sameDay:function() {
    return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, nextDay:function() {
    return "[ma\u00f1ana a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, nextWeek:function() {
    return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, lastDay:function() {
    return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, lastWeek:function() {
    return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, sameElse:"L"}, relativeTime:{future:"en %s", past:"hace %s", s:"unos segundos", ss:"%d segundos", m:"un minuto", mm:"%d minutos", h:"una hora", hh:"%d horas", d:"un d\u00eda", dd:"%d d\u00edas", M:"un mes", MM:"%d meses", y:"un a\u00f1o", yy:"%d a\u00f1os"}, dayOfMonthOrdinalParse:/\d{1,2}\u00ba/, ordinal:"%d\u00ba", week:{dow:1, doy:4}});
  var monthsShortDot$1 = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), monthsShort$2 = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
  var monthsParse$2 = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
  var monthsRegex$3 = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
  hooks.defineLocale("es-us", {months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort:function(m, format) {
    if (!m) {
      return monthsShortDot$1;
    } else {
      if (/-MMM-/.test(format)) {
        return monthsShort$2[m.month()];
      } else {
        return monthsShortDot$1[m.month()];
      }
    }
  }, monthsRegex:monthsRegex$3, monthsShortRegex:monthsRegex$3, monthsStrictRegex:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex:/^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse:monthsParse$2, longMonthsParse:monthsParse$2, shortMonthsParse:monthsParse$2, weekdays:"domingo_lunes_martes_mi\u00e9rcoles_jueves_viernes_s\u00e1bado".split("_"), weekdaysShort:"dom._lun._mar._mi\u00e9._jue._vie._s\u00e1b.".split("_"), 
  weekdaysMin:"do_lu_ma_mi_ju_vi_s\u00e1".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"h:mm A", LTS:"h:mm:ss A", L:"MM/DD/YYYY", LL:"D [de] MMMM [de] YYYY", LLL:"D [de] MMMM [de] YYYY h:mm A", LLLL:"dddd, D [de] MMMM [de] YYYY h:mm A"}, calendar:{sameDay:function() {
    return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, nextDay:function() {
    return "[ma\u00f1ana a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, nextWeek:function() {
    return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, lastDay:function() {
    return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, lastWeek:function() {
    return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, sameElse:"L"}, relativeTime:{future:"en %s", past:"hace %s", s:"unos segundos", ss:"%d segundos", m:"un minuto", mm:"%d minutos", h:"una hora", hh:"%d horas", d:"un d\u00eda", dd:"%d d\u00edas", M:"un mes", MM:"%d meses", y:"un a\u00f1o", yy:"%d a\u00f1os"}, dayOfMonthOrdinalParse:/\d{1,2}\u00ba/, ordinal:"%d\u00ba", week:{dow:0, doy:6}});
  var monthsShortDot$2 = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), monthsShort$3 = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
  var monthsParse$3 = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
  var monthsRegex$4 = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
  hooks.defineLocale("es", {months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort:function(m, format) {
    if (!m) {
      return monthsShortDot$2;
    } else {
      if (/-MMM-/.test(format)) {
        return monthsShort$3[m.month()];
      } else {
        return monthsShortDot$2[m.month()];
      }
    }
  }, monthsRegex:monthsRegex$4, monthsShortRegex:monthsRegex$4, monthsStrictRegex:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i, monthsShortStrictRegex:/^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i, monthsParse:monthsParse$3, longMonthsParse:monthsParse$3, shortMonthsParse:monthsParse$3, weekdays:"domingo_lunes_martes_mi\u00e9rcoles_jueves_viernes_s\u00e1bado".split("_"), weekdaysShort:"dom._lun._mar._mi\u00e9._jue._vie._s\u00e1b.".split("_"), 
  weekdaysMin:"do_lu_ma_mi_ju_vi_s\u00e1".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"DD/MM/YYYY", LL:"D [de] MMMM [de] YYYY", LLL:"D [de] MMMM [de] YYYY H:mm", LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"}, calendar:{sameDay:function() {
    return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, nextDay:function() {
    return "[ma\u00f1ana a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, nextWeek:function() {
    return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, lastDay:function() {
    return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, lastWeek:function() {
    return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
  }, sameElse:"L"}, relativeTime:{future:"en %s", past:"hace %s", s:"unos segundos", ss:"%d segundos", m:"un minuto", mm:"%d minutos", h:"una hora", hh:"%d horas", d:"un d\u00eda", dd:"%d d\u00edas", M:"un mes", MM:"%d meses", y:"un a\u00f1o", yy:"%d a\u00f1os"}, dayOfMonthOrdinalParse:/\d{1,2}\u00ba/, ordinal:"%d\u00ba", week:{dow:1, doy:4}});
  function processRelativeTime$3(number, withoutSuffix, key, isFuture) {
    var format = {"s":["m\u00f5ne sekundi", "m\u00f5ni sekund", "paar sekundit"], "ss":[number + "sekundi", number + "sekundit"], "m":["\u00fche minuti", "\u00fcks minut"], "mm":[number + " minuti", number + " minutit"], "h":["\u00fche tunni", "tund aega", "\u00fcks tund"], "hh":[number + " tunni", number + " tundi"], "d":["\u00fche p\u00e4eva", "\u00fcks p\u00e4ev"], "M":["kuu aja", "kuu aega", "\u00fcks kuu"], "MM":[number + " kuu", number + " kuud"], "y":["\u00fche aasta", "aasta", "\u00fcks aasta"], 
    "yy":[number + " aasta", number + " aastat"]};
    if (withoutSuffix) {
      return format[key][2] ? format[key][2] : format[key][1];
    }
    return isFuture ? format[key][0] : format[key][1];
  }
  hooks.defineLocale("et", {months:"jaanuar_veebruar_m\u00e4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"), monthsShort:"jaan_veebr_m\u00e4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"), weekdays:"p\u00fchap\u00e4ev_esmasp\u00e4ev_teisip\u00e4ev_kolmap\u00e4ev_neljap\u00e4ev_reede_laup\u00e4ev".split("_"), weekdaysShort:"P_E_T_K_N_R_L".split("_"), weekdaysMin:"P_E_T_K_N_R_L".split("_"), longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"DD.MM.YYYY", LL:"D. MMMM YYYY", 
  LLL:"D. MMMM YYYY H:mm", LLLL:"dddd, D. MMMM YYYY H:mm"}, calendar:{sameDay:"[T\u00e4na,] LT", nextDay:"[Homme,] LT", nextWeek:"[J\u00e4rgmine] dddd LT", lastDay:"[Eile,] LT", lastWeek:"[Eelmine] dddd LT", sameElse:"L"}, relativeTime:{future:"%s p\u00e4rast", past:"%s tagasi", s:processRelativeTime$3, ss:processRelativeTime$3, m:processRelativeTime$3, mm:processRelativeTime$3, h:processRelativeTime$3, hh:processRelativeTime$3, d:processRelativeTime$3, dd:"%d p\u00e4eva", M:processRelativeTime$3, 
  MM:processRelativeTime$3, y:processRelativeTime$3, yy:processRelativeTime$3}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  hooks.defineLocale("eu", {months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"), monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"), monthsParseExact:true, weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"), weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"), weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", 
  L:"YYYY-MM-DD", LL:"YYYY[ko] MMMM[ren] D[a]", LLL:"YYYY[ko] MMMM[ren] D[a] HH:mm", LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] HH:mm", l:"YYYY-M-D", ll:"YYYY[ko] MMM D[a]", lll:"YYYY[ko] MMM D[a] HH:mm", llll:"ddd, YYYY[ko] MMM D[a] HH:mm"}, calendar:{sameDay:"[gaur] LT[etan]", nextDay:"[bihar] LT[etan]", nextWeek:"dddd LT[etan]", lastDay:"[atzo] LT[etan]", lastWeek:"[aurreko] dddd LT[etan]", sameElse:"L"}, relativeTime:{future:"%s barru", past:"duela %s", s:"segundo batzuk", ss:"%d segundo", m:"minutu bat", 
  mm:"%d minutu", h:"ordu bat", hh:"%d ordu", d:"egun bat", dd:"%d egun", M:"hilabete bat", MM:"%d hilabete", y:"urte bat", yy:"%d urte"}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:7}});
  var symbolMap$5 = {1:"\u06f1", 2:"\u06f2", 3:"\u06f3", 4:"\u06f4", 5:"\u06f5", 6:"\u06f6", 7:"\u06f7", 8:"\u06f8", 9:"\u06f9", 0:"\u06f0"}, numberMap$4 = {"\u06f1":"1", "\u06f2":"2", "\u06f3":"3", "\u06f4":"4", "\u06f5":"5", "\u06f6":"6", "\u06f7":"7", "\u06f8":"8", "\u06f9":"9", "\u06f0":"0"};
  hooks.defineLocale("fa", {months:"\u0698\u0627\u0646\u0648\u06cc\u0647_\u0641\u0648\u0631\u06cc\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06cc\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06cc\u0647_\u0627\u0648\u062a_\u0633\u067e\u062a\u0627\u0645\u0628\u0631_\u0627\u06a9\u062a\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062f\u0633\u0627\u0645\u0628\u0631".split("_"), monthsShort:"\u0698\u0627\u0646\u0648\u06cc\u0647_\u0641\u0648\u0631\u06cc\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06cc\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06cc\u0647_\u0627\u0648\u062a_\u0633\u067e\u062a\u0627\u0645\u0628\u0631_\u0627\u06a9\u062a\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062f\u0633\u0627\u0645\u0628\u0631".split("_"), 
  weekdays:"\u06cc\u06a9\u200c\u0634\u0646\u0628\u0647_\u062f\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200c\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647_\u062c\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"), weekdaysShort:"\u06cc\u06a9\u200c\u0634\u0646\u0628\u0647_\u062f\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200c\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647_\u062c\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"), 
  weekdaysMin:"\u06cc_\u062f_\u0633_\u0686_\u067e_\u062c_\u0634".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, meridiemParse:/\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631|\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/, isPM:function(input) {
    return /\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/.test(input);
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631";
    } else {
      return "\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631";
    }
  }, calendar:{sameDay:"[\u0627\u0645\u0631\u0648\u0632 \u0633\u0627\u0639\u062a] LT", nextDay:"[\u0641\u0631\u062f\u0627 \u0633\u0627\u0639\u062a] LT", nextWeek:"dddd [\u0633\u0627\u0639\u062a] LT", lastDay:"[\u062f\u06cc\u0631\u0648\u0632 \u0633\u0627\u0639\u062a] LT", lastWeek:"dddd [\u067e\u06cc\u0634] [\u0633\u0627\u0639\u062a] LT", sameElse:"L"}, relativeTime:{future:"\u062f\u0631 %s", past:"%s \u067e\u06cc\u0634", s:"\u0686\u0646\u062f \u062b\u0627\u0646\u06cc\u0647", ss:"\u062b\u0627\u0646\u06cc\u0647 d%", 
  m:"\u06cc\u06a9 \u062f\u0642\u06cc\u0642\u0647", mm:"%d \u062f\u0642\u06cc\u0642\u0647", h:"\u06cc\u06a9 \u0633\u0627\u0639\u062a", hh:"%d \u0633\u0627\u0639\u062a", d:"\u06cc\u06a9 \u0631\u0648\u0632", dd:"%d \u0631\u0648\u0632", M:"\u06cc\u06a9 \u0645\u0627\u0647", MM:"%d \u0645\u0627\u0647", y:"\u06cc\u06a9 \u0633\u0627\u0644", yy:"%d \u0633\u0627\u0644"}, preparse:function(string) {
    return string.replace(/[\u06f0-\u06f9]/g, function(match) {
      return numberMap$4[match];
    }).replace(/\u060c/g, ",");
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$5[match];
    }).replace(/,/g, "\u060c");
  }, dayOfMonthOrdinalParse:/\d{1,2}\u0645/, ordinal:"%d\u0645", week:{dow:6, doy:12}});
  var numbersPast = "nolla yksi kaksi kolme nelj\u00e4 viisi kuusi seitsem\u00e4n kahdeksan yhdeks\u00e4n".split(" "), numbersFuture = ["nolla", "yhden", "kahden", "kolmen", "nelj\u00e4n", "viiden", "kuuden", numbersPast[7], numbersPast[8], numbersPast[9]];
  function translate$2(number, withoutSuffix, key, isFuture) {
    var result = "";
    switch(key) {
      case "s":
        return isFuture ? "muutaman sekunnin" : "muutama sekunti";
      case "ss":
        return isFuture ? "sekunnin" : "sekuntia";
      case "m":
        return isFuture ? "minuutin" : "minuutti";
      case "mm":
        result = isFuture ? "minuutin" : "minuuttia";
        break;
      case "h":
        return isFuture ? "tunnin" : "tunti";
      case "hh":
        result = isFuture ? "tunnin" : "tuntia";
        break;
      case "d":
        return isFuture ? "p\u00e4iv\u00e4n" : "p\u00e4iv\u00e4";
      case "dd":
        result = isFuture ? "p\u00e4iv\u00e4n" : "p\u00e4iv\u00e4\u00e4";
        break;
      case "M":
        return isFuture ? "kuukauden" : "kuukausi";
      case "MM":
        result = isFuture ? "kuukauden" : "kuukautta";
        break;
      case "y":
        return isFuture ? "vuoden" : "vuosi";
      case "yy":
        result = isFuture ? "vuoden" : "vuotta";
        break;
    }
    result = verbalNumber(number, isFuture) + " " + result;
    return result;
  }
  function verbalNumber(number, isFuture) {
    return number < 10 ? isFuture ? numbersFuture[number] : numbersPast[number] : number;
  }
  hooks.defineLocale("fi", {months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\u00e4kuu_hein\u00e4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"), monthsShort:"tammi_helmi_maalis_huhti_touko_kes\u00e4_hein\u00e4_elo_syys_loka_marras_joulu".split("_"), weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"), weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"), weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"), longDateFormat:{LT:"HH.mm", LTS:"HH.mm.ss", L:"DD.MM.YYYY", 
  LL:"Do MMMM[ta] YYYY", LLL:"Do MMMM[ta] YYYY, [klo] HH.mm", LLLL:"dddd, Do MMMM[ta] YYYY, [klo] HH.mm", l:"D.M.YYYY", ll:"Do MMM YYYY", lll:"Do MMM YYYY, [klo] HH.mm", llll:"ddd, Do MMM YYYY, [klo] HH.mm"}, calendar:{sameDay:"[t\u00e4n\u00e4\u00e4n] [klo] LT", nextDay:"[huomenna] [klo] LT", nextWeek:"dddd [klo] LT", lastDay:"[eilen] [klo] LT", lastWeek:"[viime] dddd[na] [klo] LT", sameElse:"L"}, relativeTime:{future:"%s p\u00e4\u00e4st\u00e4", past:"%s sitten", s:translate$2, ss:translate$2, m:translate$2, 
  mm:translate$2, h:translate$2, hh:translate$2, d:translate$2, dd:translate$2, M:translate$2, MM:translate$2, y:translate$2, yy:translate$2}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  hooks.defineLocale("fo", {months:"januar_februar_mars_apr\u00edl_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), weekdays:"sunnudagur_m\u00e1nadagur_t\u00fdsdagur_mikudagur_h\u00f3sdagur_fr\u00edggjadagur_leygardagur".split("_"), weekdaysShort:"sun_m\u00e1n_t\u00fds_mik_h\u00f3s_fr\u00ed_ley".split("_"), weekdaysMin:"su_m\u00e1_t\u00fd_mi_h\u00f3_fr_le".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", 
  L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D. MMMM, YYYY HH:mm"}, calendar:{sameDay:"[\u00cd dag kl.] LT", nextDay:"[\u00cd morgin kl.] LT", nextWeek:"dddd [kl.] LT", lastDay:"[\u00cd gj\u00e1r kl.] LT", lastWeek:"[s\u00ed\u00f0stu] dddd [kl] LT", sameElse:"L"}, relativeTime:{future:"um %s", past:"%s s\u00ed\u00f0ani", s:"f\u00e1 sekund", ss:"%d sekundir", m:"ein minuttur", mm:"%d minuttir", h:"ein t\u00edmi", hh:"%d t\u00edmar", d:"ein dagur", dd:"%d dagar", M:"ein m\u00e1na\u00f0ur", 
  MM:"%d m\u00e1na\u00f0ir", y:"eitt \u00e1r", yy:"%d \u00e1r"}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  hooks.defineLocale("fr-ca", {months:"janvier_f\u00e9vrier_mars_avril_mai_juin_juillet_ao\u00fbt_septembre_octobre_novembre_d\u00e9cembre".split("_"), monthsShort:"janv._f\u00e9vr._mars_avr._mai_juin_juil._ao\u00fbt_sept._oct._nov._d\u00e9c.".split("_"), monthsParseExact:true, weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", 
  LTS:"HH:mm:ss", L:"YYYY-MM-DD", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[Aujourd\u2019hui \u00e0] LT", nextDay:"[Demain \u00e0] LT", nextWeek:"dddd [\u00e0] LT", lastDay:"[Hier \u00e0] LT", lastWeek:"dddd [dernier \u00e0] LT", sameElse:"L"}, relativeTime:{future:"dans %s", past:"il y a %s", s:"quelques secondes", ss:"%d secondes", m:"une minute", mm:"%d minutes", h:"une heure", hh:"%d heures", d:"un jour", dd:"%d jours", M:"un mois", MM:"%d mois", 
  y:"un an", yy:"%d ans"}, dayOfMonthOrdinalParse:/\d{1,2}(er|e)/, ordinal:function(number, period) {
    switch(period) {
      default:
      case "M":
      case "Q":
      case "D":
      case "DDD":
      case "d":
        return number + (number === 1 ? "er" : "e");
      case "w":
      case "W":
        return number + (number === 1 ? "re" : "e");
    }
  }});
  hooks.defineLocale("fr-ch", {months:"janvier_f\u00e9vrier_mars_avril_mai_juin_juillet_ao\u00fbt_septembre_octobre_novembre_d\u00e9cembre".split("_"), monthsShort:"janv._f\u00e9vr._mars_avr._mai_juin_juil._ao\u00fbt_sept._oct._nov._d\u00e9c.".split("_"), monthsParseExact:true, weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", 
  LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[Aujourd\u2019hui \u00e0] LT", nextDay:"[Demain \u00e0] LT", nextWeek:"dddd [\u00e0] LT", lastDay:"[Hier \u00e0] LT", lastWeek:"dddd [dernier \u00e0] LT", sameElse:"L"}, relativeTime:{future:"dans %s", past:"il y a %s", s:"quelques secondes", ss:"%d secondes", m:"une minute", mm:"%d minutes", h:"une heure", hh:"%d heures", d:"un jour", dd:"%d jours", M:"un mois", MM:"%d mois", 
  y:"un an", yy:"%d ans"}, dayOfMonthOrdinalParse:/\d{1,2}(er|e)/, ordinal:function(number, period) {
    switch(period) {
      default:
      case "M":
      case "Q":
      case "D":
      case "DDD":
      case "d":
        return number + (number === 1 ? "er" : "e");
      case "w":
      case "W":
        return number + (number === 1 ? "re" : "e");
    }
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("fr", {months:"janvier_f\u00e9vrier_mars_avril_mai_juin_juillet_ao\u00fbt_septembre_octobre_novembre_d\u00e9cembre".split("_"), monthsShort:"janv._f\u00e9vr._mars_avr._mai_juin_juil._ao\u00fbt_sept._oct._nov._d\u00e9c.".split("_"), monthsParseExact:true, weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", 
  LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[Aujourd\u2019hui \u00e0] LT", nextDay:"[Demain \u00e0] LT", nextWeek:"dddd [\u00e0] LT", lastDay:"[Hier \u00e0] LT", lastWeek:"dddd [dernier \u00e0] LT", sameElse:"L"}, relativeTime:{future:"dans %s", past:"il y a %s", s:"quelques secondes", ss:"%d secondes", m:"une minute", mm:"%d minutes", h:"une heure", hh:"%d heures", d:"un jour", dd:"%d jours", M:"un mois", MM:"%d mois", 
  y:"un an", yy:"%d ans"}, dayOfMonthOrdinalParse:/\d{1,2}(er|)/, ordinal:function(number, period) {
    switch(period) {
      case "D":
        return number + (number === 1 ? "er" : "");
      default:
      case "M":
      case "Q":
      case "DDD":
      case "d":
        return number + (number === 1 ? "er" : "e");
      case "w":
      case "W":
        return number + (number === 1 ? "re" : "e");
    }
  }, week:{dow:1, doy:4}});
  var monthsShortWithDots = "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"), monthsShortWithoutDots = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");
  hooks.defineLocale("fy", {months:"jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"), monthsShort:function(m, format) {
    if (!m) {
      return monthsShortWithDots;
    } else {
      if (/-MMM-/.test(format)) {
        return monthsShortWithoutDots[m.month()];
      } else {
        return monthsShortWithDots[m.month()];
      }
    }
  }, monthsParseExact:true, weekdays:"snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"), weekdaysShort:"si._mo._ti._wo._to._fr._so.".split("_"), weekdaysMin:"Si_Mo_Ti_Wo_To_Fr_So".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD-MM-YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[hjoed om] LT", nextDay:"[moarn om] LT", nextWeek:"dddd [om] LT", lastDay:"[juster om] LT", lastWeek:"[\u00f4fr\u00fbne] dddd [om] LT", 
  sameElse:"L"}, relativeTime:{future:"oer %s", past:"%s lyn", s:"in pear sekonden", ss:"%d sekonden", m:"ien min\u00fat", mm:"%d minuten", h:"ien oere", hh:"%d oeren", d:"ien dei", dd:"%d dagen", M:"ien moanne", MM:"%d moannen", y:"ien jier", yy:"%d jierren"}, dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/, ordinal:function(number) {
    return number + (number === 1 || number === 8 || number >= 20 ? "ste" : "de");
  }, week:{dow:1, doy:4}});
  var months$5 = ["Ean\u00e1ir", "Feabhra", "M\u00e1rta", "Aibre\u00e1n", "Bealtaine", "M\u00e9itheamh", "I\u00fail", "L\u00fanasa", "Me\u00e1n F\u00f3mhair", "Deaireadh F\u00f3mhair", "Samhain", "Nollaig"];
  var monthsShort$4 = ["Ean\u00e1", "Feab", "M\u00e1rt", "Aibr", "Beal", "M\u00e9it", "I\u00fail", "L\u00fana", "Me\u00e1n", "Deai", "Samh", "Noll"];
  var weekdays$1 = ["D\u00e9 Domhnaigh", "D\u00e9 Luain", "D\u00e9 M\u00e1irt", "D\u00e9 C\u00e9adaoin", "D\u00e9ardaoin", "D\u00e9 hAoine", "D\u00e9 Satharn"];
  var weekdaysShort = ["Dom", "Lua", "M\u00e1i", "C\u00e9a", "D\u00e9a", "hAo", "Sat"];
  var weekdaysMin = ["Do", "Lu", "M\u00e1", "Ce", "D\u00e9", "hA", "Sa"];
  hooks.defineLocale("ga", {months:months$5, monthsShort:monthsShort$4, monthsParseExact:true, weekdays:weekdays$1, weekdaysShort:weekdaysShort, weekdaysMin:weekdaysMin, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[Inniu ag] LT", nextDay:"[Am\u00e1rach ag] LT", nextWeek:"dddd [ag] LT", lastDay:"[Inn\u00e9 aig] LT", lastWeek:"dddd [seo caite] [ag] LT", sameElse:"L"}, relativeTime:{future:"i %s", 
  past:"%s \u00f3 shin", s:"c\u00fapla soicind", ss:"%d soicind", m:"n\u00f3im\u00e9ad", mm:"%d n\u00f3im\u00e9ad", h:"uair an chloig", hh:"%d uair an chloig", d:"l\u00e1", dd:"%d l\u00e1", M:"m\u00ed", MM:"%d m\u00ed", y:"bliain", yy:"%d bliain"}, dayOfMonthOrdinalParse:/\d{1,2}(d|na|mh)/, ordinal:function(number) {
    var output = number === 1 ? "d" : number % 10 === 2 ? "na" : "mh";
    return number + output;
  }, week:{dow:1, doy:4}});
  var months$6 = ["Am Faoilleach", "An Gearran", "Am M\u00e0rt", "An Giblean", "An C\u00e8itean", "An t-\u00d2gmhios", "An t-Iuchar", "An L\u00f9nastal", "An t-Sultain", "An D\u00e0mhair", "An t-Samhain", "An D\u00f9bhlachd"];
  var monthsShort$5 = ["Faoi", "Gear", "M\u00e0rt", "Gibl", "C\u00e8it", "\u00d2gmh", "Iuch", "L\u00f9n", "Sult", "D\u00e0mh", "Samh", "D\u00f9bh"];
  var weekdays$2 = ["Did\u00f2mhnaich", "Diluain", "Dim\u00e0irt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"];
  var weekdaysShort$1 = ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"];
  var weekdaysMin$1 = ["D\u00f2", "Lu", "M\u00e0", "Ci", "Ar", "Ha", "Sa"];
  hooks.defineLocale("gd", {months:months$6, monthsShort:monthsShort$5, monthsParseExact:true, weekdays:weekdays$2, weekdaysShort:weekdaysShort$1, weekdaysMin:weekdaysMin$1, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[An-diugh aig] LT", nextDay:"[A-m\u00e0ireach aig] LT", nextWeek:"dddd [aig] LT", lastDay:"[An-d\u00e8 aig] LT", lastWeek:"dddd [seo chaidh] [aig] LT", sameElse:"L"}, relativeTime:{future:"ann an %s", 
  past:"bho chionn %s", s:"beagan diogan", ss:"%d diogan", m:"mionaid", mm:"%d mionaidean", h:"uair", hh:"%d uairean", d:"latha", dd:"%d latha", M:"m\u00ecos", MM:"%d m\u00ecosan", y:"bliadhna", yy:"%d bliadhna"}, dayOfMonthOrdinalParse:/\d{1,2}(d|na|mh)/, ordinal:function(number) {
    var output = number === 1 ? "d" : number % 10 === 2 ? "na" : "mh";
    return number + output;
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("gl", {months:"xaneiro_febreiro_marzo_abril_maio_xu\u00f1o_xullo_agosto_setembro_outubro_novembro_decembro".split("_"), monthsShort:"xan._feb._mar._abr._mai._xu\u00f1._xul._ago._set._out._nov._dec.".split("_"), monthsParseExact:true, weekdays:"domingo_luns_martes_m\u00e9rcores_xoves_venres_s\u00e1bado".split("_"), weekdaysShort:"dom._lun._mar._m\u00e9r._xov._ven._s\u00e1b.".split("_"), weekdaysMin:"do_lu_ma_m\u00e9_xo_ve_s\u00e1".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"H:mm", 
  LTS:"H:mm:ss", L:"DD/MM/YYYY", LL:"D [de] MMMM [de] YYYY", LLL:"D [de] MMMM [de] YYYY H:mm", LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"}, calendar:{sameDay:function() {
    return "[hoxe " + (this.hours() !== 1 ? "\u00e1s" : "\u00e1") + "] LT";
  }, nextDay:function() {
    return "[ma\u00f1\u00e1 " + (this.hours() !== 1 ? "\u00e1s" : "\u00e1") + "] LT";
  }, nextWeek:function() {
    return "dddd [" + (this.hours() !== 1 ? "\u00e1s" : "a") + "] LT";
  }, lastDay:function() {
    return "[onte " + (this.hours() !== 1 ? "\u00e1" : "a") + "] LT";
  }, lastWeek:function() {
    return "[o] dddd [pasado " + (this.hours() !== 1 ? "\u00e1s" : "a") + "] LT";
  }, sameElse:"L"}, relativeTime:{future:function(str) {
    if (str.indexOf("un") === 0) {
      return "n" + str;
    }
    return "en " + str;
  }, past:"hai %s", s:"uns segundos", ss:"%d segundos", m:"un minuto", mm:"%d minutos", h:"unha hora", hh:"%d horas", d:"un d\u00eda", dd:"%d d\u00edas", M:"un mes", MM:"%d meses", y:"un ano", yy:"%d anos"}, dayOfMonthOrdinalParse:/\d{1,2}\u00ba/, ordinal:"%d\u00ba", week:{dow:1, doy:4}});
  function processRelativeTime$4(number, withoutSuffix, key, isFuture) {
    var format = {"s":["thodde secondanim", "thodde second"], "ss":[number + " secondanim", number + " second"], "m":["eka mintan", "ek minute"], "mm":[number + " mintanim", number + " mintam"], "h":["eka voran", "ek vor"], "hh":[number + " voranim", number + " voram"], "d":["eka disan", "ek dis"], "dd":[number + " disanim", number + " dis"], "M":["eka mhoinean", "ek mhoino"], "MM":[number + " mhoineanim", number + " mhoine"], "y":["eka vorsan", "ek voros"], "yy":[number + " vorsanim", number + " vorsam"]};
    return withoutSuffix ? format[key][0] : format[key][1];
  }
  hooks.defineLocale("gom-latn", {months:"Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"), monthsShort:"Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"), monthsParseExact:true, weekdays:"Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"), weekdaysShort:"Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"), weekdaysMin:"Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"A h:mm [vazta]", LTS:"A h:mm:ss [vazta]", 
  L:"DD-MM-YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY A h:mm [vazta]", LLLL:"dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]", llll:"ddd, D MMM YYYY, A h:mm [vazta]"}, calendar:{sameDay:"[Aiz] LT", nextDay:"[Faleam] LT", nextWeek:"[Ieta to] dddd[,] LT", lastDay:"[Kal] LT", lastWeek:"[Fatlo] dddd[,] LT", sameElse:"L"}, relativeTime:{future:"%s", past:"%s adim", s:processRelativeTime$4, ss:processRelativeTime$4, m:processRelativeTime$4, mm:processRelativeTime$4, h:processRelativeTime$4, hh:processRelativeTime$4, 
  d:processRelativeTime$4, dd:processRelativeTime$4, M:processRelativeTime$4, MM:processRelativeTime$4, y:processRelativeTime$4, yy:processRelativeTime$4}, dayOfMonthOrdinalParse:/\d{1,2}(er)/, ordinal:function(number, period) {
    switch(period) {
      case "D":
        return number + "er";
      default:
      case "M":
      case "Q":
      case "DDD":
      case "d":
      case "w":
      case "W":
        return number;
    }
  }, week:{dow:1, doy:4}, meridiemParse:/rati|sokalli|donparam|sanje/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "rati") {
      return hour < 4 ? hour : hour + 12;
    } else {
      if (meridiem === "sokalli") {
        return hour;
      } else {
        if (meridiem === "donparam") {
          return hour > 12 ? hour : hour + 12;
        } else {
          if (meridiem === "sanje") {
            return hour + 12;
          }
        }
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "rati";
    } else {
      if (hour < 12) {
        return "sokalli";
      } else {
        if (hour < 16) {
          return "donparam";
        } else {
          if (hour < 20) {
            return "sanje";
          } else {
            return "rati";
          }
        }
      }
    }
  }});
  var symbolMap$6 = {1:"\u0ae7", 2:"\u0ae8", 3:"\u0ae9", 4:"\u0aea", 5:"\u0aeb", 6:"\u0aec", 7:"\u0aed", 8:"\u0aee", 9:"\u0aef", 0:"\u0ae6"}, numberMap$5 = {"\u0ae7":"1", "\u0ae8":"2", "\u0ae9":"3", "\u0aea":"4", "\u0aeb":"5", "\u0aec":"6", "\u0aed":"7", "\u0aee":"8", "\u0aef":"9", "\u0ae6":"0"};
  hooks.defineLocale("gu", {months:"\u0a9c\u0abe\u0aa8\u0acd\u0aaf\u0ac1\u0a86\u0ab0\u0ac0_\u0aab\u0ac7\u0aac\u0acd\u0ab0\u0ac1\u0a86\u0ab0\u0ac0_\u0aae\u0abe\u0ab0\u0acd\u0a9a_\u0a8f\u0aaa\u0acd\u0ab0\u0abf\u0ab2_\u0aae\u0ac7_\u0a9c\u0ac2\u0aa8_\u0a9c\u0ac1\u0ab2\u0abe\u0a88_\u0a91\u0a97\u0ab8\u0acd\u0a9f_\u0ab8\u0aaa\u0acd\u0a9f\u0ac7\u0aae\u0acd\u0aac\u0ab0_\u0a91\u0a95\u0acd\u0a9f\u0acd\u0aac\u0ab0_\u0aa8\u0ab5\u0ac7\u0aae\u0acd\u0aac\u0ab0_\u0aa1\u0abf\u0ab8\u0ac7\u0aae\u0acd\u0aac\u0ab0".split("_"), 
  monthsShort:"\u0a9c\u0abe\u0aa8\u0acd\u0aaf\u0ac1._\u0aab\u0ac7\u0aac\u0acd\u0ab0\u0ac1._\u0aae\u0abe\u0ab0\u0acd\u0a9a_\u0a8f\u0aaa\u0acd\u0ab0\u0abf._\u0aae\u0ac7_\u0a9c\u0ac2\u0aa8_\u0a9c\u0ac1\u0ab2\u0abe._\u0a91\u0a97._\u0ab8\u0aaa\u0acd\u0a9f\u0ac7._\u0a91\u0a95\u0acd\u0a9f\u0acd._\u0aa8\u0ab5\u0ac7._\u0aa1\u0abf\u0ab8\u0ac7.".split("_"), monthsParseExact:true, weekdays:"\u0ab0\u0ab5\u0abf\u0ab5\u0abe\u0ab0_\u0ab8\u0acb\u0aae\u0ab5\u0abe\u0ab0_\u0aae\u0a82\u0a97\u0ab3\u0ab5\u0abe\u0ab0_\u0aac\u0ac1\u0aa7\u0acd\u0ab5\u0abe\u0ab0_\u0a97\u0ac1\u0ab0\u0ac1\u0ab5\u0abe\u0ab0_\u0ab6\u0ac1\u0a95\u0acd\u0ab0\u0ab5\u0abe\u0ab0_\u0ab6\u0aa8\u0abf\u0ab5\u0abe\u0ab0".split("_"), 
  weekdaysShort:"\u0ab0\u0ab5\u0abf_\u0ab8\u0acb\u0aae_\u0aae\u0a82\u0a97\u0ab3_\u0aac\u0ac1\u0aa7\u0acd_\u0a97\u0ac1\u0ab0\u0ac1_\u0ab6\u0ac1\u0a95\u0acd\u0ab0_\u0ab6\u0aa8\u0abf".split("_"), weekdaysMin:"\u0ab0_\u0ab8\u0acb_\u0aae\u0a82_\u0aac\u0ac1_\u0a97\u0ac1_\u0ab6\u0ac1_\u0ab6".split("_"), longDateFormat:{LT:"A h:mm \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7", LTS:"A h:mm:ss \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY, A h:mm \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7", 
  LLLL:"dddd, D MMMM YYYY, A h:mm \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7"}, calendar:{sameDay:"[\u0a86\u0a9c] LT", nextDay:"[\u0a95\u0abe\u0ab2\u0ac7] LT", nextWeek:"dddd, LT", lastDay:"[\u0a97\u0a87\u0a95\u0abe\u0ab2\u0ac7] LT", lastWeek:"[\u0aaa\u0abe\u0a9b\u0ab2\u0abe] dddd, LT", sameElse:"L"}, relativeTime:{future:"%s \u0aae\u0abe", past:"%s \u0aaa\u0ac7\u0ab9\u0ab2\u0abe", s:"\u0a85\u0aae\u0ac1\u0a95 \u0aaa\u0ab3\u0acb", ss:"%d \u0ab8\u0ac7\u0a95\u0a82\u0aa1", m:"\u0a8f\u0a95 \u0aae\u0abf\u0aa8\u0abf\u0a9f", 
  mm:"%d \u0aae\u0abf\u0aa8\u0abf\u0a9f", h:"\u0a8f\u0a95 \u0a95\u0ab2\u0abe\u0a95", hh:"%d \u0a95\u0ab2\u0abe\u0a95", d:"\u0a8f\u0a95 \u0aa6\u0abf\u0ab5\u0ab8", dd:"%d \u0aa6\u0abf\u0ab5\u0ab8", M:"\u0a8f\u0a95 \u0aae\u0ab9\u0abf\u0aa8\u0acb", MM:"%d \u0aae\u0ab9\u0abf\u0aa8\u0acb", y:"\u0a8f\u0a95 \u0ab5\u0ab0\u0acd\u0ab7", yy:"%d \u0ab5\u0ab0\u0acd\u0ab7"}, preparse:function(string) {
    return string.replace(/[\u0ae7\u0ae8\u0ae9\u0aea\u0aeb\u0aec\u0aed\u0aee\u0aef\u0ae6]/g, function(match) {
      return numberMap$5[match];
    });
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$6[match];
    });
  }, meridiemParse:/\u0ab0\u0abe\u0aa4|\u0aac\u0aaa\u0acb\u0ab0|\u0ab8\u0ab5\u0abe\u0ab0|\u0ab8\u0abe\u0a82\u0a9c/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0ab0\u0abe\u0aa4") {
      return hour < 4 ? hour : hour + 12;
    } else {
      if (meridiem === "\u0ab8\u0ab5\u0abe\u0ab0") {
        return hour;
      } else {
        if (meridiem === "\u0aac\u0aaa\u0acb\u0ab0") {
          return hour >= 10 ? hour : hour + 12;
        } else {
          if (meridiem === "\u0ab8\u0abe\u0a82\u0a9c") {
            return hour + 12;
          }
        }
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u0ab0\u0abe\u0aa4";
    } else {
      if (hour < 10) {
        return "\u0ab8\u0ab5\u0abe\u0ab0";
      } else {
        if (hour < 17) {
          return "\u0aac\u0aaa\u0acb\u0ab0";
        } else {
          if (hour < 20) {
            return "\u0ab8\u0abe\u0a82\u0a9c";
          } else {
            return "\u0ab0\u0abe\u0aa4";
          }
        }
      }
    }
  }, week:{dow:0, doy:6}});
  hooks.defineLocale("he", {months:"\u05d9\u05e0\u05d5\u05d0\u05e8_\u05e4\u05d1\u05e8\u05d5\u05d0\u05e8_\u05de\u05e8\u05e5_\u05d0\u05e4\u05e8\u05d9\u05dc_\u05de\u05d0\u05d9_\u05d9\u05d5\u05e0\u05d9_\u05d9\u05d5\u05dc\u05d9_\u05d0\u05d5\u05d2\u05d5\u05e1\u05d8_\u05e1\u05e4\u05d8\u05de\u05d1\u05e8_\u05d0\u05d5\u05e7\u05d8\u05d5\u05d1\u05e8_\u05e0\u05d5\u05d1\u05de\u05d1\u05e8_\u05d3\u05e6\u05de\u05d1\u05e8".split("_"), monthsShort:"\u05d9\u05e0\u05d5\u05f3_\u05e4\u05d1\u05e8\u05f3_\u05de\u05e8\u05e5_\u05d0\u05e4\u05e8\u05f3_\u05de\u05d0\u05d9_\u05d9\u05d5\u05e0\u05d9_\u05d9\u05d5\u05dc\u05d9_\u05d0\u05d5\u05d2\u05f3_\u05e1\u05e4\u05d8\u05f3_\u05d0\u05d5\u05e7\u05f3_\u05e0\u05d5\u05d1\u05f3_\u05d3\u05e6\u05de\u05f3".split("_"), 
  weekdays:"\u05e8\u05d0\u05e9\u05d5\u05df_\u05e9\u05e0\u05d9_\u05e9\u05dc\u05d9\u05e9\u05d9_\u05e8\u05d1\u05d9\u05e2\u05d9_\u05d7\u05de\u05d9\u05e9\u05d9_\u05e9\u05d9\u05e9\u05d9_\u05e9\u05d1\u05ea".split("_"), weekdaysShort:"\u05d0\u05f3_\u05d1\u05f3_\u05d2\u05f3_\u05d3\u05f3_\u05d4\u05f3_\u05d5\u05f3_\u05e9\u05f3".split("_"), weekdaysMin:"\u05d0_\u05d1_\u05d2_\u05d3_\u05d4_\u05d5_\u05e9".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D [\u05d1]MMMM YYYY", LLL:"D [\u05d1]MMMM YYYY HH:mm", 
  LLLL:"dddd, D [\u05d1]MMMM YYYY HH:mm", l:"D/M/YYYY", ll:"D MMM YYYY", lll:"D MMM YYYY HH:mm", llll:"ddd, D MMM YYYY HH:mm"}, calendar:{sameDay:"[\u05d4\u05d9\u05d5\u05dd \u05d1\u05be]LT", nextDay:"[\u05de\u05d7\u05e8 \u05d1\u05be]LT", nextWeek:"dddd [\u05d1\u05e9\u05e2\u05d4] LT", lastDay:"[\u05d0\u05ea\u05de\u05d5\u05dc \u05d1\u05be]LT", lastWeek:"[\u05d1\u05d9\u05d5\u05dd] dddd [\u05d4\u05d0\u05d7\u05e8\u05d5\u05df \u05d1\u05e9\u05e2\u05d4] LT", sameElse:"L"}, relativeTime:{future:"\u05d1\u05e2\u05d5\u05d3 %s", 
  past:"\u05dc\u05e4\u05e0\u05d9 %s", s:"\u05de\u05e1\u05e4\u05e8 \u05e9\u05e0\u05d9\u05d5\u05ea", ss:"%d \u05e9\u05e0\u05d9\u05d5\u05ea", m:"\u05d3\u05e7\u05d4", mm:"%d \u05d3\u05e7\u05d5\u05ea", h:"\u05e9\u05e2\u05d4", hh:function(number) {
    if (number === 2) {
      return "\u05e9\u05e2\u05ea\u05d9\u05d9\u05dd";
    }
    return number + " \u05e9\u05e2\u05d5\u05ea";
  }, d:"\u05d9\u05d5\u05dd", dd:function(number) {
    if (number === 2) {
      return "\u05d9\u05d5\u05de\u05d9\u05d9\u05dd";
    }
    return number + " \u05d9\u05de\u05d9\u05dd";
  }, M:"\u05d7\u05d5\u05d3\u05e9", MM:function(number) {
    if (number === 2) {
      return "\u05d7\u05d5\u05d3\u05e9\u05d9\u05d9\u05dd";
    }
    return number + " \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd";
  }, y:"\u05e9\u05e0\u05d4", yy:function(number) {
    if (number === 2) {
      return "\u05e9\u05e0\u05ea\u05d9\u05d9\u05dd";
    } else {
      if (number % 10 === 0 && number !== 10) {
        return number + " \u05e9\u05e0\u05d4";
      }
    }
    return number + " \u05e9\u05e0\u05d9\u05dd";
  }}, meridiemParse:/\u05d0\u05d7\u05d4"\u05e6|\u05dc\u05e4\u05e0\u05d4"\u05e6|\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05dc\u05e4\u05e0\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05dc\u05e4\u05e0\u05d5\u05ea \u05d1\u05d5\u05e7\u05e8|\u05d1\u05d1\u05d5\u05e7\u05e8|\u05d1\u05e2\u05e8\u05d1/i, isPM:function(input) {
    return /^(\u05d0\u05d7\u05d4"\u05e6|\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05d1\u05e2\u05e8\u05d1)$/.test(input);
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 5) {
      return "\u05dc\u05e4\u05e0\u05d5\u05ea \u05d1\u05d5\u05e7\u05e8";
    } else {
      if (hour < 10) {
        return "\u05d1\u05d1\u05d5\u05e7\u05e8";
      } else {
        if (hour < 12) {
          return isLower ? '\u05dc\u05e4\u05e0\u05d4"\u05e6' : "\u05dc\u05e4\u05e0\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd";
        } else {
          if (hour < 18) {
            return isLower ? '\u05d0\u05d7\u05d4"\u05e6' : "\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd";
          } else {
            return "\u05d1\u05e2\u05e8\u05d1";
          }
        }
      }
    }
  }});
  var symbolMap$7 = {1:"\u0967", 2:"\u0968", 3:"\u0969", 4:"\u096a", 5:"\u096b", 6:"\u096c", 7:"\u096d", 8:"\u096e", 9:"\u096f", 0:"\u0966"}, numberMap$6 = {"\u0967":"1", "\u0968":"2", "\u0969":"3", "\u096a":"4", "\u096b":"5", "\u096c":"6", "\u096d":"7", "\u096e":"8", "\u096f":"9", "\u0966":"0"};
  hooks.defineLocale("hi", {months:"\u091c\u0928\u0935\u0930\u0940_\u092b\u093c\u0930\u0935\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u0948\u0932_\u092e\u0908_\u091c\u0942\u0928_\u091c\u0941\u0932\u093e\u0908_\u0905\u0917\u0938\u094d\u0924_\u0938\u093f\u0924\u092e\u094d\u092c\u0930_\u0905\u0915\u094d\u091f\u0942\u092c\u0930_\u0928\u0935\u092e\u094d\u092c\u0930_\u0926\u093f\u0938\u092e\u094d\u092c\u0930".split("_"), monthsShort:"\u091c\u0928._\u092b\u093c\u0930._\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u0948._\u092e\u0908_\u091c\u0942\u0928_\u091c\u0941\u0932._\u0905\u0917._\u0938\u093f\u0924._\u0905\u0915\u094d\u091f\u0942._\u0928\u0935._\u0926\u093f\u0938.".split("_"), 
  monthsParseExact:true, weekdays:"\u0930\u0935\u093f\u0935\u093e\u0930_\u0938\u094b\u092e\u0935\u093e\u0930_\u092e\u0902\u0917\u0932\u0935\u093e\u0930_\u092c\u0941\u0927\u0935\u093e\u0930_\u0917\u0941\u0930\u0942\u0935\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930_\u0936\u0928\u093f\u0935\u093e\u0930".split("_"), weekdaysShort:"\u0930\u0935\u093f_\u0938\u094b\u092e_\u092e\u0902\u0917\u0932_\u092c\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094d\u0930_\u0936\u0928\u093f".split("_"), 
  weekdaysMin:"\u0930_\u0938\u094b_\u092e\u0902_\u092c\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"), longDateFormat:{LT:"A h:mm \u092c\u091c\u0947", LTS:"A h:mm:ss \u092c\u091c\u0947", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY, A h:mm \u092c\u091c\u0947", LLLL:"dddd, D MMMM YYYY, A h:mm \u092c\u091c\u0947"}, calendar:{sameDay:"[\u0906\u091c] LT", nextDay:"[\u0915\u0932] LT", nextWeek:"dddd, LT", lastDay:"[\u0915\u0932] LT", lastWeek:"[\u092a\u093f\u091b\u0932\u0947] dddd, LT", sameElse:"L"}, 
  relativeTime:{future:"%s \u092e\u0947\u0902", past:"%s \u092a\u0939\u0932\u0947", s:"\u0915\u0941\u091b \u0939\u0940 \u0915\u094d\u0937\u0923", ss:"%d \u0938\u0947\u0915\u0902\u0921", m:"\u090f\u0915 \u092e\u093f\u0928\u091f", mm:"%d \u092e\u093f\u0928\u091f", h:"\u090f\u0915 \u0918\u0902\u091f\u093e", hh:"%d \u0918\u0902\u091f\u0947", d:"\u090f\u0915 \u0926\u093f\u0928", dd:"%d \u0926\u093f\u0928", M:"\u090f\u0915 \u092e\u0939\u0940\u0928\u0947", MM:"%d \u092e\u0939\u0940\u0928\u0947", y:"\u090f\u0915 \u0935\u0930\u094d\u0937", 
  yy:"%d \u0935\u0930\u094d\u0937"}, preparse:function(string) {
    return string.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g, function(match) {
      return numberMap$6[match];
    });
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$7[match];
    });
  }, meridiemParse:/\u0930\u093e\u0924|\u0938\u0941\u092c\u0939|\u0926\u094b\u092a\u0939\u0930|\u0936\u093e\u092e/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0930\u093e\u0924") {
      return hour < 4 ? hour : hour + 12;
    } else {
      if (meridiem === "\u0938\u0941\u092c\u0939") {
        return hour;
      } else {
        if (meridiem === "\u0926\u094b\u092a\u0939\u0930") {
          return hour >= 10 ? hour : hour + 12;
        } else {
          if (meridiem === "\u0936\u093e\u092e") {
            return hour + 12;
          }
        }
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u0930\u093e\u0924";
    } else {
      if (hour < 10) {
        return "\u0938\u0941\u092c\u0939";
      } else {
        if (hour < 17) {
          return "\u0926\u094b\u092a\u0939\u0930";
        } else {
          if (hour < 20) {
            return "\u0936\u093e\u092e";
          } else {
            return "\u0930\u093e\u0924";
          }
        }
      }
    }
  }, week:{dow:0, doy:6}});
  function translate$3(number, withoutSuffix, key) {
    var result = number + " ";
    switch(key) {
      case "ss":
        if (number === 1) {
          result += "sekunda";
        } else {
          if (number === 2 || number === 3 || number === 4) {
            result += "sekunde";
          } else {
            result += "sekundi";
          }
        }
        return result;
      case "m":
        return withoutSuffix ? "jedna minuta" : "jedne minute";
      case "mm":
        if (number === 1) {
          result += "minuta";
        } else {
          if (number === 2 || number === 3 || number === 4) {
            result += "minute";
          } else {
            result += "minuta";
          }
        }
        return result;
      case "h":
        return withoutSuffix ? "jedan sat" : "jednog sata";
      case "hh":
        if (number === 1) {
          result += "sat";
        } else {
          if (number === 2 || number === 3 || number === 4) {
            result += "sata";
          } else {
            result += "sati";
          }
        }
        return result;
      case "dd":
        if (number === 1) {
          result += "dan";
        } else {
          result += "dana";
        }
        return result;
      case "MM":
        if (number === 1) {
          result += "mjesec";
        } else {
          if (number === 2 || number === 3 || number === 4) {
            result += "mjeseca";
          } else {
            result += "mjeseci";
          }
        }
        return result;
      case "yy":
        if (number === 1) {
          result += "godina";
        } else {
          if (number === 2 || number === 3 || number === 4) {
            result += "godine";
          } else {
            result += "godina";
          }
        }
        return result;
    }
  }
  hooks.defineLocale("hr", {months:{format:"sije\u010dnja_velja\u010de_o\u017eujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"), standalone:"sije\u010danj_velja\u010da_o\u017eujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")}, monthsShort:"sij._velj._o\u017eu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"), monthsParseExact:true, weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota".split("_"), 
  weekdaysShort:"ned._pon._uto._sri._\u010det._pet._sub.".split("_"), weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY H:mm", LLLL:"dddd, D. MMMM YYYY H:mm"}, calendar:{sameDay:"[danas u] LT", nextDay:"[sutra u] LT", nextWeek:function() {
    switch(this.day()) {
      case 0:
        return "[u] [nedjelju] [u] LT";
      case 3:
        return "[u] [srijedu] [u] LT";
      case 6:
        return "[u] [subotu] [u] LT";
      case 1:
      case 2:
      case 4:
      case 5:
        return "[u] dddd [u] LT";
    }
  }, lastDay:"[ju\u010der u] LT", lastWeek:function() {
    switch(this.day()) {
      case 0:
      case 3:
        return "[pro\u0161lu] dddd [u] LT";
      case 6:
        return "[pro\u0161le] [subote] [u] LT";
      case 1:
      case 2:
      case 4:
      case 5:
        return "[pro\u0161li] dddd [u] LT";
    }
  }, sameElse:"L"}, relativeTime:{future:"za %s", past:"prije %s", s:"par sekundi", ss:translate$3, m:translate$3, mm:translate$3, h:translate$3, hh:translate$3, d:"dan", dd:translate$3, M:"mjesec", MM:translate$3, y:"godinu", yy:translate$3}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:7}});
  var weekEndings = "vas\u00e1rnap h\u00e9tf\u0151n kedden szerd\u00e1n cs\u00fct\u00f6rt\u00f6k\u00f6n p\u00e9nteken szombaton".split(" ");
  function translate$4(number, withoutSuffix, key, isFuture) {
    var num = number;
    switch(key) {
      case "s":
        return isFuture || withoutSuffix ? "n\u00e9h\u00e1ny m\u00e1sodperc" : "n\u00e9h\u00e1ny m\u00e1sodperce";
      case "ss":
        return num + (isFuture || withoutSuffix) ? " m\u00e1sodperc" : " m\u00e1sodperce";
      case "m":
        return "egy" + (isFuture || withoutSuffix ? " perc" : " perce");
      case "mm":
        return num + (isFuture || withoutSuffix ? " perc" : " perce");
      case "h":
        return "egy" + (isFuture || withoutSuffix ? " \u00f3ra" : " \u00f3r\u00e1ja");
      case "hh":
        return num + (isFuture || withoutSuffix ? " \u00f3ra" : " \u00f3r\u00e1ja");
      case "d":
        return "egy" + (isFuture || withoutSuffix ? " nap" : " napja");
      case "dd":
        return num + (isFuture || withoutSuffix ? " nap" : " napja");
      case "M":
        return "egy" + (isFuture || withoutSuffix ? " h\u00f3nap" : " h\u00f3napja");
      case "MM":
        return num + (isFuture || withoutSuffix ? " h\u00f3nap" : " h\u00f3napja");
      case "y":
        return "egy" + (isFuture || withoutSuffix ? " \u00e9v" : " \u00e9ve");
      case "yy":
        return num + (isFuture || withoutSuffix ? " \u00e9v" : " \u00e9ve");
    }
    return "";
  }
  function week(isFuture) {
    return (isFuture ? "" : "[m\u00falt] ") + "[" + weekEndings[this.day()] + "] LT[-kor]";
  }
  hooks.defineLocale("hu", {months:"janu\u00e1r_febru\u00e1r_m\u00e1rcius_\u00e1prilis_m\u00e1jus_j\u00fanius_j\u00falius_augusztus_szeptember_okt\u00f3ber_november_december".split("_"), monthsShort:"jan_feb_m\u00e1rc_\u00e1pr_m\u00e1j_j\u00fan_j\u00fal_aug_szept_okt_nov_dec".split("_"), weekdays:"vas\u00e1rnap_h\u00e9tf\u0151_kedd_szerda_cs\u00fct\u00f6rt\u00f6k_p\u00e9ntek_szombat".split("_"), weekdaysShort:"vas_h\u00e9t_kedd_sze_cs\u00fct_p\u00e9n_szo".split("_"), weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"), 
  longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"YYYY.MM.DD.", LL:"YYYY. MMMM D.", LLL:"YYYY. MMMM D. H:mm", LLLL:"YYYY. MMMM D., dddd H:mm"}, meridiemParse:/de|du/i, isPM:function(input) {
    return input.charAt(1).toLowerCase() === "u";
  }, meridiem:function(hours, minutes, isLower) {
    if (hours < 12) {
      return isLower === true ? "de" : "DE";
    } else {
      return isLower === true ? "du" : "DU";
    }
  }, calendar:{sameDay:"[ma] LT[-kor]", nextDay:"[holnap] LT[-kor]", nextWeek:function() {
    return week.call(this, true);
  }, lastDay:"[tegnap] LT[-kor]", lastWeek:function() {
    return week.call(this, false);
  }, sameElse:"L"}, relativeTime:{future:"%s m\u00falva", past:"%s", s:translate$4, ss:translate$4, m:translate$4, mm:translate$4, h:translate$4, hh:translate$4, d:translate$4, dd:translate$4, M:translate$4, MM:translate$4, y:translate$4, yy:translate$4}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  hooks.defineLocale("hy-am", {months:{format:"\u0570\u0578\u0582\u0576\u057e\u0561\u0580\u056b_\u0583\u0565\u057f\u0580\u057e\u0561\u0580\u056b_\u0574\u0561\u0580\u057f\u056b_\u0561\u057a\u0580\u056b\u056c\u056b_\u0574\u0561\u0575\u056b\u057d\u056b_\u0570\u0578\u0582\u0576\u056b\u057d\u056b_\u0570\u0578\u0582\u056c\u056b\u057d\u056b_\u0585\u0563\u0578\u057d\u057f\u0578\u057d\u056b_\u057d\u0565\u057a\u057f\u0565\u0574\u0562\u0565\u0580\u056b_\u0570\u0578\u056f\u057f\u0565\u0574\u0562\u0565\u0580\u056b_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056b_\u0564\u0565\u056f\u057f\u0565\u0574\u0562\u0565\u0580\u056b".split("_"), 
  standalone:"\u0570\u0578\u0582\u0576\u057e\u0561\u0580_\u0583\u0565\u057f\u0580\u057e\u0561\u0580_\u0574\u0561\u0580\u057f_\u0561\u057a\u0580\u056b\u056c_\u0574\u0561\u0575\u056b\u057d_\u0570\u0578\u0582\u0576\u056b\u057d_\u0570\u0578\u0582\u056c\u056b\u057d_\u0585\u0563\u0578\u057d\u057f\u0578\u057d_\u057d\u0565\u057a\u057f\u0565\u0574\u0562\u0565\u0580_\u0570\u0578\u056f\u057f\u0565\u0574\u0562\u0565\u0580_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580_\u0564\u0565\u056f\u057f\u0565\u0574\u0562\u0565\u0580".split("_")}, 
  monthsShort:"\u0570\u0576\u057e_\u0583\u057f\u0580_\u0574\u0580\u057f_\u0561\u057a\u0580_\u0574\u0575\u057d_\u0570\u0576\u057d_\u0570\u056c\u057d_\u0585\u0563\u057d_\u057d\u057a\u057f_\u0570\u056f\u057f_\u0576\u0574\u0562_\u0564\u056f\u057f".split("_"), weekdays:"\u056f\u056b\u0580\u0561\u056f\u056b_\u0565\u0580\u056f\u0578\u0582\u0577\u0561\u0562\u0569\u056b_\u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b_\u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b_\u0570\u056b\u0576\u0563\u0577\u0561\u0562\u0569\u056b_\u0578\u0582\u0580\u0562\u0561\u0569_\u0577\u0561\u0562\u0561\u0569".split("_"), 
  weekdaysShort:"\u056f\u0580\u056f_\u0565\u0580\u056f_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"), weekdaysMin:"\u056f\u0580\u056f_\u0565\u0580\u056f_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY \u0569.", LLL:"D MMMM YYYY \u0569., HH:mm", LLLL:"dddd, D MMMM YYYY \u0569., HH:mm"}, calendar:{sameDay:"[\u0561\u0575\u057d\u0585\u0580] LT", 
  nextDay:"[\u057e\u0561\u0572\u0568] LT", lastDay:"[\u0565\u0580\u0565\u056f] LT", nextWeek:function() {
    return "dddd [\u0585\u0580\u0568 \u056a\u0561\u0574\u0568] LT";
  }, lastWeek:function() {
    return "[\u0561\u0576\u0581\u0561\u056e] dddd [\u0585\u0580\u0568 \u056a\u0561\u0574\u0568] LT";
  }, sameElse:"L"}, relativeTime:{future:"%s \u0570\u0565\u057f\u0578", past:"%s \u0561\u057c\u0561\u057b", s:"\u0574\u056b \u0584\u0561\u0576\u056b \u057e\u0561\u0575\u0580\u056f\u0575\u0561\u0576", ss:"%d \u057e\u0561\u0575\u0580\u056f\u0575\u0561\u0576", m:"\u0580\u0578\u057a\u0565", mm:"%d \u0580\u0578\u057a\u0565", h:"\u056a\u0561\u0574", hh:"%d \u056a\u0561\u0574", d:"\u0585\u0580", dd:"%d \u0585\u0580", M:"\u0561\u0574\u056b\u057d", MM:"%d \u0561\u0574\u056b\u057d", y:"\u057f\u0561\u0580\u056b", 
  yy:"%d \u057f\u0561\u0580\u056b"}, meridiemParse:/\u0563\u056b\u0577\u0565\u0580\u057e\u0561|\u0561\u057c\u0561\u057e\u0578\u057f\u057e\u0561|\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576/, isPM:function(input) {
    return /^(\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576)$/.test(input);
  }, meridiem:function(hour) {
    if (hour < 4) {
      return "\u0563\u056b\u0577\u0565\u0580\u057e\u0561";
    } else {
      if (hour < 12) {
        return "\u0561\u057c\u0561\u057e\u0578\u057f\u057e\u0561";
      } else {
        if (hour < 17) {
          return "\u0581\u0565\u0580\u0565\u056f\u057e\u0561";
        } else {
          return "\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576";
        }
      }
    }
  }, dayOfMonthOrdinalParse:/\d{1,2}|\d{1,2}-(\u056b\u0576|\u0580\u0564)/, ordinal:function(number, period) {
    switch(period) {
      case "DDD":
      case "w":
      case "W":
      case "DDDo":
        if (number === 1) {
          return number + "-\u056b\u0576";
        }
        return number + "-\u0580\u0564";
      default:
        return number;
    }
  }, week:{dow:1, doy:7}});
  hooks.defineLocale("id", {months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"), monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"), weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"), weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"), weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat:{LT:"HH.mm", LTS:"HH.mm.ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY [pukul] HH.mm", LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"}, 
  meridiemParse:/pagi|siang|sore|malam/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "pagi") {
      return hour;
    } else {
      if (meridiem === "siang") {
        return hour >= 11 ? hour : hour + 12;
      } else {
        if (meridiem === "sore" || meridiem === "malam") {
          return hour + 12;
        }
      }
    }
  }, meridiem:function(hours, minutes, isLower) {
    if (hours < 11) {
      return "pagi";
    } else {
      if (hours < 15) {
        return "siang";
      } else {
        if (hours < 19) {
          return "sore";
        } else {
          return "malam";
        }
      }
    }
  }, calendar:{sameDay:"[Hari ini pukul] LT", nextDay:"[Besok pukul] LT", nextWeek:"dddd [pukul] LT", lastDay:"[Kemarin pukul] LT", lastWeek:"dddd [lalu pukul] LT", sameElse:"L"}, relativeTime:{future:"dalam %s", past:"%s yang lalu", s:"beberapa detik", ss:"%d detik", m:"semenit", mm:"%d menit", h:"sejam", hh:"%d jam", d:"sehari", dd:"%d hari", M:"sebulan", MM:"%d bulan", y:"setahun", yy:"%d tahun"}, week:{dow:1, doy:7}});
  function plural$2(n) {
    if (n % 100 === 11) {
      return true;
    } else {
      if (n % 10 === 1) {
        return false;
      }
    }
    return true;
  }
  function translate$5(number, withoutSuffix, key, isFuture) {
    var result = number + " ";
    switch(key) {
      case "s":
        return withoutSuffix || isFuture ? "nokkrar sek\u00fandur" : "nokkrum sek\u00fandum";
      case "ss":
        if (plural$2(number)) {
          return result + (withoutSuffix || isFuture ? "sek\u00fandur" : "sek\u00fandum");
        }
        return result + "sek\u00fanda";
      case "m":
        return withoutSuffix ? "m\u00edn\u00fata" : "m\u00edn\u00fatu";
      case "mm":
        if (plural$2(number)) {
          return result + (withoutSuffix || isFuture ? "m\u00edn\u00fatur" : "m\u00edn\u00fatum");
        } else {
          if (withoutSuffix) {
            return result + "m\u00edn\u00fata";
          }
        }
        return result + "m\u00edn\u00fatu";
      case "hh":
        if (plural$2(number)) {
          return result + (withoutSuffix || isFuture ? "klukkustundir" : "klukkustundum");
        }
        return result + "klukkustund";
      case "d":
        if (withoutSuffix) {
          return "dagur";
        }
        return isFuture ? "dag" : "degi";
      case "dd":
        if (plural$2(number)) {
          if (withoutSuffix) {
            return result + "dagar";
          }
          return result + (isFuture ? "daga" : "d\u00f6gum");
        } else {
          if (withoutSuffix) {
            return result + "dagur";
          }
        }
        return result + (isFuture ? "dag" : "degi");
      case "M":
        if (withoutSuffix) {
          return "m\u00e1nu\u00f0ur";
        }
        return isFuture ? "m\u00e1nu\u00f0" : "m\u00e1nu\u00f0i";
      case "MM":
        if (plural$2(number)) {
          if (withoutSuffix) {
            return result + "m\u00e1nu\u00f0ir";
          }
          return result + (isFuture ? "m\u00e1nu\u00f0i" : "m\u00e1nu\u00f0um");
        } else {
          if (withoutSuffix) {
            return result + "m\u00e1nu\u00f0ur";
          }
        }
        return result + (isFuture ? "m\u00e1nu\u00f0" : "m\u00e1nu\u00f0i");
      case "y":
        return withoutSuffix || isFuture ? "\u00e1r" : "\u00e1ri";
      case "yy":
        if (plural$2(number)) {
          return result + (withoutSuffix || isFuture ? "\u00e1r" : "\u00e1rum");
        }
        return result + (withoutSuffix || isFuture ? "\u00e1r" : "\u00e1ri");
    }
  }
  hooks.defineLocale("is", {months:"jan\u00faar_febr\u00faar_mars_apr\u00edl_ma\u00ed_j\u00fan\u00ed_j\u00fal\u00ed_\u00e1g\u00fast_september_okt\u00f3ber_n\u00f3vember_desember".split("_"), monthsShort:"jan_feb_mar_apr_ma\u00ed_j\u00fan_j\u00fal_\u00e1g\u00fa_sep_okt_n\u00f3v_des".split("_"), weekdays:"sunnudagur_m\u00e1nudagur_\u00feri\u00f0judagur_mi\u00f0vikudagur_fimmtudagur_f\u00f6studagur_laugardagur".split("_"), weekdaysShort:"sun_m\u00e1n_\u00feri_mi\u00f0_fim_f\u00f6s_lau".split("_"), weekdaysMin:"Su_M\u00e1_\u00der_Mi_Fi_F\u00f6_La".split("_"), 
  longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY [kl.] H:mm", LLLL:"dddd, D. MMMM YYYY [kl.] H:mm"}, calendar:{sameDay:"[\u00ed dag kl.] LT", nextDay:"[\u00e1 morgun kl.] LT", nextWeek:"dddd [kl.] LT", lastDay:"[\u00ed g\u00e6r kl.] LT", lastWeek:"[s\u00ed\u00f0asta] dddd [kl.] LT", sameElse:"L"}, relativeTime:{future:"eftir %s", past:"fyrir %s s\u00ed\u00f0an", s:translate$5, ss:translate$5, m:translate$5, mm:translate$5, h:"klukkustund", hh:translate$5, 
  d:translate$5, dd:translate$5, M:translate$5, MM:translate$5, y:translate$5, yy:translate$5}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  hooks.defineLocale("it-ch", {months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"), monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"), weekdays:"domenica_luned\u00ec_marted\u00ec_mercoled\u00ec_gioved\u00ec_venerd\u00ec_sabato".split("_"), weekdaysShort:"dom_lun_mar_mer_gio_ven_sab".split("_"), weekdaysMin:"do_lu_ma_me_gi_ve_sa".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY", 
  LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[Oggi alle] LT", nextDay:"[Domani alle] LT", nextWeek:"dddd [alle] LT", lastDay:"[Ieri alle] LT", lastWeek:function() {
    switch(this.day()) {
      case 0:
        return "[la scorsa] dddd [alle] LT";
      default:
        return "[lo scorso] dddd [alle] LT";
    }
  }, sameElse:"L"}, relativeTime:{future:function(s) {
    return (/^[0-9].+$/.test(s) ? "tra" : "in") + " " + s;
  }, past:"%s fa", s:"alcuni secondi", ss:"%d secondi", m:"un minuto", mm:"%d minuti", h:"un'ora", hh:"%d ore", d:"un giorno", dd:"%d giorni", M:"un mese", MM:"%d mesi", y:"un anno", yy:"%d anni"}, dayOfMonthOrdinalParse:/\d{1,2}\u00ba/, ordinal:"%d\u00ba", week:{dow:1, doy:4}});
  hooks.defineLocale("it", {months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"), monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"), weekdays:"domenica_luned\u00ec_marted\u00ec_mercoled\u00ec_gioved\u00ec_venerd\u00ec_sabato".split("_"), weekdaysShort:"dom_lun_mar_mer_gio_ven_sab".split("_"), weekdaysMin:"do_lu_ma_me_gi_ve_sa".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", 
  LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[Oggi alle] LT", nextDay:"[Domani alle] LT", nextWeek:"dddd [alle] LT", lastDay:"[Ieri alle] LT", lastWeek:function() {
    switch(this.day()) {
      case 0:
        return "[la scorsa] dddd [alle] LT";
      default:
        return "[lo scorso] dddd [alle] LT";
    }
  }, sameElse:"L"}, relativeTime:{future:function(s) {
    return (/^[0-9].+$/.test(s) ? "tra" : "in") + " " + s;
  }, past:"%s fa", s:"alcuni secondi", ss:"%d secondi", m:"un minuto", mm:"%d minuti", h:"un'ora", hh:"%d ore", d:"un giorno", dd:"%d giorni", M:"un mese", MM:"%d mesi", y:"un anno", yy:"%d anni"}, dayOfMonthOrdinalParse:/\d{1,2}\u00ba/, ordinal:"%d\u00ba", week:{dow:1, doy:4}});
  hooks.defineLocale("ja", {months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"), monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), weekdays:"\u65e5\u66dc\u65e5_\u6708\u66dc\u65e5_\u706b\u66dc\u65e5_\u6c34\u66dc\u65e5_\u6728\u66dc\u65e5_\u91d1\u66dc\u65e5_\u571f\u66dc\u65e5".split("_"), weekdaysShort:"\u65e5_\u6708_\u706b_\u6c34_\u6728_\u91d1_\u571f".split("_"), 
  weekdaysMin:"\u65e5_\u6708_\u706b_\u6c34_\u6728_\u91d1_\u571f".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"YYYY/MM/DD", LL:"YYYY\u5e74M\u6708D\u65e5", LLL:"YYYY\u5e74M\u6708D\u65e5 HH:mm", LLLL:"YYYY\u5e74M\u6708D\u65e5 dddd HH:mm", l:"YYYY/MM/DD", ll:"YYYY\u5e74M\u6708D\u65e5", lll:"YYYY\u5e74M\u6708D\u65e5 HH:mm", llll:"YYYY\u5e74M\u6708D\u65e5(ddd) HH:mm"}, meridiemParse:/\u5348\u524d|\u5348\u5f8c/i, isPM:function(input) {
    return input === "\u5348\u5f8c";
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u5348\u524d";
    } else {
      return "\u5348\u5f8c";
    }
  }, calendar:{sameDay:"[\u4eca\u65e5] LT", nextDay:"[\u660e\u65e5] LT", nextWeek:function(now) {
    if (now.week() < this.week()) {
      return "[\u6765\u9031]dddd LT";
    } else {
      return "dddd LT";
    }
  }, lastDay:"[\u6628\u65e5] LT", lastWeek:function(now) {
    if (this.week() < now.week()) {
      return "[\u5148\u9031]dddd LT";
    } else {
      return "dddd LT";
    }
  }, sameElse:"L"}, dayOfMonthOrdinalParse:/\d{1,2}\u65e5/, ordinal:function(number, period) {
    switch(period) {
      case "d":
      case "D":
      case "DDD":
        return number + "\u65e5";
      default:
        return number;
    }
  }, relativeTime:{future:"%s\u5f8c", past:"%s\u524d", s:"\u6570\u79d2", ss:"%d\u79d2", m:"1\u5206", mm:"%d\u5206", h:"1\u6642\u9593", hh:"%d\u6642\u9593", d:"1\u65e5", dd:"%d\u65e5", M:"1\u30f6\u6708", MM:"%d\u30f6\u6708", y:"1\u5e74", yy:"%d\u5e74"}});
  hooks.defineLocale("jv", {months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"), monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"), weekdays:"Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"), weekdaysShort:"Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"), weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"), longDateFormat:{LT:"HH.mm", LTS:"HH.mm.ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY [pukul] HH.mm", LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"}, 
  meridiemParse:/enjing|siyang|sonten|ndalu/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "enjing") {
      return hour;
    } else {
      if (meridiem === "siyang") {
        return hour >= 11 ? hour : hour + 12;
      } else {
        if (meridiem === "sonten" || meridiem === "ndalu") {
          return hour + 12;
        }
      }
    }
  }, meridiem:function(hours, minutes, isLower) {
    if (hours < 11) {
      return "enjing";
    } else {
      if (hours < 15) {
        return "siyang";
      } else {
        if (hours < 19) {
          return "sonten";
        } else {
          return "ndalu";
        }
      }
    }
  }, calendar:{sameDay:"[Dinten puniko pukul] LT", nextDay:"[Mbenjang pukul] LT", nextWeek:"dddd [pukul] LT", lastDay:"[Kala wingi pukul] LT", lastWeek:"dddd [kepengker pukul] LT", sameElse:"L"}, relativeTime:{future:"wonten ing %s", past:"%s ingkang kepengker", s:"sawetawis detik", ss:"%d detik", m:"setunggal menit", mm:"%d menit", h:"setunggal jam", hh:"%d jam", d:"sedinten", dd:"%d dinten", M:"sewulan", MM:"%d wulan", y:"setaun", yy:"%d taun"}, week:{dow:1, doy:7}});
  hooks.defineLocale("ka", {months:{standalone:"\u10d8\u10d0\u10dc\u10d5\u10d0\u10e0\u10d8_\u10d7\u10d4\u10d1\u10d4\u10e0\u10d5\u10d0\u10da\u10d8_\u10db\u10d0\u10e0\u10e2\u10d8_\u10d0\u10de\u10e0\u10d8\u10da\u10d8_\u10db\u10d0\u10d8\u10e1\u10d8_\u10d8\u10d5\u10dc\u10d8\u10e1\u10d8_\u10d8\u10d5\u10da\u10d8\u10e1\u10d8_\u10d0\u10d2\u10d5\u10d8\u10e1\u10e2\u10dd_\u10e1\u10d4\u10e5\u10e2\u10d4\u10db\u10d1\u10d4\u10e0\u10d8_\u10dd\u10e5\u10e2\u10dd\u10db\u10d1\u10d4\u10e0\u10d8_\u10dc\u10dd\u10d4\u10db\u10d1\u10d4\u10e0\u10d8_\u10d3\u10d4\u10d9\u10d4\u10db\u10d1\u10d4\u10e0\u10d8".split("_"), 
  format:"\u10d8\u10d0\u10dc\u10d5\u10d0\u10e0\u10e1_\u10d7\u10d4\u10d1\u10d4\u10e0\u10d5\u10d0\u10da\u10e1_\u10db\u10d0\u10e0\u10e2\u10e1_\u10d0\u10de\u10e0\u10d8\u10da\u10d8\u10e1_\u10db\u10d0\u10d8\u10e1\u10e1_\u10d8\u10d5\u10dc\u10d8\u10e1\u10e1_\u10d8\u10d5\u10da\u10d8\u10e1\u10e1_\u10d0\u10d2\u10d5\u10d8\u10e1\u10e2\u10e1_\u10e1\u10d4\u10e5\u10e2\u10d4\u10db\u10d1\u10d4\u10e0\u10e1_\u10dd\u10e5\u10e2\u10dd\u10db\u10d1\u10d4\u10e0\u10e1_\u10dc\u10dd\u10d4\u10db\u10d1\u10d4\u10e0\u10e1_\u10d3\u10d4\u10d9\u10d4\u10db\u10d1\u10d4\u10e0\u10e1".split("_")}, 
  monthsShort:"\u10d8\u10d0\u10dc_\u10d7\u10d4\u10d1_\u10db\u10d0\u10e0_\u10d0\u10de\u10e0_\u10db\u10d0\u10d8_\u10d8\u10d5\u10dc_\u10d8\u10d5\u10da_\u10d0\u10d2\u10d5_\u10e1\u10d4\u10e5_\u10dd\u10e5\u10e2_\u10dc\u10dd\u10d4_\u10d3\u10d4\u10d9".split("_"), weekdays:{standalone:"\u10d9\u10d5\u10d8\u10e0\u10d0_\u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10d8_\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8".split("_"), 
  format:"\u10d9\u10d5\u10d8\u10e0\u10d0\u10e1_\u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10e1_\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1".split("_"), isFormat:/(\u10ec\u10d8\u10dc\u10d0|\u10e8\u10d4\u10db\u10d3\u10d4\u10d2)/}, weekdaysShort:"\u10d9\u10d5\u10d8_\u10dd\u10e0\u10e8_\u10e1\u10d0\u10db_\u10dd\u10d7\u10ee_\u10ee\u10e3\u10d7_\u10de\u10d0\u10e0_\u10e8\u10d0\u10d1".split("_"), 
  weekdaysMin:"\u10d9\u10d5_\u10dd\u10e0_\u10e1\u10d0_\u10dd\u10d7_\u10ee\u10e3_\u10de\u10d0_\u10e8\u10d0".split("_"), longDateFormat:{LT:"h:mm A", LTS:"h:mm:ss A", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY h:mm A", LLLL:"dddd, D MMMM YYYY h:mm A"}, calendar:{sameDay:"[\u10d3\u10e6\u10d4\u10e1] LT[-\u10d6\u10d4]", nextDay:"[\u10ee\u10d5\u10d0\u10da] LT[-\u10d6\u10d4]", lastDay:"[\u10d2\u10e3\u10e8\u10d8\u10dc] LT[-\u10d6\u10d4]", nextWeek:"[\u10e8\u10d4\u10db\u10d3\u10d4\u10d2] dddd LT[-\u10d6\u10d4]", 
  lastWeek:"[\u10ec\u10d8\u10dc\u10d0] dddd LT-\u10d6\u10d4", sameElse:"L"}, relativeTime:{future:function(s) {
    return /(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10ec\u10d4\u10da\u10d8)/.test(s) ? s.replace(/\u10d8$/, "\u10e8\u10d8") : s + "\u10e8\u10d8";
  }, past:function(s) {
    if (/(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10d3\u10e6\u10d4|\u10d7\u10d5\u10d4)/.test(s)) {
      return s.replace(/(\u10d8|\u10d4)$/, "\u10d8\u10e1 \u10ec\u10d8\u10dc");
    }
    if (/\u10ec\u10d4\u10da\u10d8/.test(s)) {
      return s.replace(/\u10ec\u10d4\u10da\u10d8$/, "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc");
    }
  }, s:"\u10e0\u10d0\u10db\u10d3\u10d4\u10dc\u10d8\u10db\u10d4 \u10ec\u10d0\u10db\u10d8", ss:"%d \u10ec\u10d0\u10db\u10d8", m:"\u10ec\u10e3\u10d7\u10d8", mm:"%d \u10ec\u10e3\u10d7\u10d8", h:"\u10e1\u10d0\u10d0\u10d7\u10d8", hh:"%d \u10e1\u10d0\u10d0\u10d7\u10d8", d:"\u10d3\u10e6\u10d4", dd:"%d \u10d3\u10e6\u10d4", M:"\u10d7\u10d5\u10d4", MM:"%d \u10d7\u10d5\u10d4", y:"\u10ec\u10d4\u10da\u10d8", yy:"%d \u10ec\u10d4\u10da\u10d8"}, dayOfMonthOrdinalParse:/0|1-\u10da\u10d8|\u10db\u10d4-\d{1,2}|\d{1,2}-\u10d4/, 
  ordinal:function(number) {
    if (number === 0) {
      return number;
    }
    if (number === 1) {
      return number + "-\u10da\u10d8";
    }
    if (number < 20 || number <= 100 && number % 20 === 0 || number % 100 === 0) {
      return "\u10db\u10d4-" + number;
    }
    return number + "-\u10d4";
  }, week:{dow:1, doy:7}});
  var suffixes$1 = {0:"-\u0448\u0456", 1:"-\u0448\u0456", 2:"-\u0448\u0456", 3:"-\u0448\u0456", 4:"-\u0448\u0456", 5:"-\u0448\u0456", 6:"-\u0448\u044b", 7:"-\u0448\u0456", 8:"-\u0448\u0456", 9:"-\u0448\u044b", 10:"-\u0448\u044b", 20:"-\u0448\u044b", 30:"-\u0448\u044b", 40:"-\u0448\u044b", 50:"-\u0448\u0456", 60:"-\u0448\u044b", 70:"-\u0448\u0456", 80:"-\u0448\u0456", 90:"-\u0448\u044b", 100:"-\u0448\u0456"};
  hooks.defineLocale("kk", {months:"\u049b\u0430\u04a3\u0442\u0430\u0440_\u0430\u049b\u043f\u0430\u043d_\u043d\u0430\u0443\u0440\u044b\u0437_\u0441\u04d9\u0443\u0456\u0440_\u043c\u0430\u043c\u044b\u0440_\u043c\u0430\u0443\u0441\u044b\u043c_\u0448\u0456\u043b\u0434\u0435_\u0442\u0430\u043c\u044b\u0437_\u049b\u044b\u0440\u043a\u04af\u0439\u0435\u043a_\u049b\u0430\u0437\u0430\u043d_\u049b\u0430\u0440\u0430\u0448\u0430_\u0436\u0435\u043b\u0442\u043e\u049b\u0441\u0430\u043d".split("_"), monthsShort:"\u049b\u0430\u04a3_\u0430\u049b\u043f_\u043d\u0430\u0443_\u0441\u04d9\u0443_\u043c\u0430\u043c_\u043c\u0430\u0443_\u0448\u0456\u043b_\u0442\u0430\u043c_\u049b\u044b\u0440_\u049b\u0430\u0437_\u049b\u0430\u0440_\u0436\u0435\u043b".split("_"), 
  weekdays:"\u0436\u0435\u043a\u0441\u0435\u043d\u0431\u0456_\u0434\u04af\u0439\u0441\u0435\u043d\u0431\u0456_\u0441\u0435\u0439\u0441\u0435\u043d\u0431\u0456_\u0441\u04d9\u0440\u0441\u0435\u043d\u0431\u0456_\u0431\u0435\u0439\u0441\u0435\u043d\u0431\u0456_\u0436\u04b1\u043c\u0430_\u0441\u0435\u043d\u0431\u0456".split("_"), weekdaysShort:"\u0436\u0435\u043a_\u0434\u04af\u0439_\u0441\u0435\u0439_\u0441\u04d9\u0440_\u0431\u0435\u0439_\u0436\u04b1\u043c_\u0441\u0435\u043d".split("_"), weekdaysMin:"\u0436\u043a_\u0434\u0439_\u0441\u0439_\u0441\u0440_\u0431\u0439_\u0436\u043c_\u0441\u043d".split("_"), 
  longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[\u0411\u04af\u0433\u0456\u043d \u0441\u0430\u0493\u0430\u0442] LT", nextDay:"[\u0415\u0440\u0442\u0435\u04a3 \u0441\u0430\u0493\u0430\u0442] LT", nextWeek:"dddd [\u0441\u0430\u0493\u0430\u0442] LT", lastDay:"[\u041a\u0435\u0448\u0435 \u0441\u0430\u0493\u0430\u0442] LT", lastWeek:"[\u04e8\u0442\u043a\u0435\u043d \u0430\u043f\u0442\u0430\u043d\u044b\u04a3] dddd [\u0441\u0430\u0493\u0430\u0442] LT", 
  sameElse:"L"}, relativeTime:{future:"%s \u0456\u0448\u0456\u043d\u0434\u0435", past:"%s \u0431\u04b1\u0440\u044b\u043d", s:"\u0431\u0456\u0440\u043d\u0435\u0448\u0435 \u0441\u0435\u043a\u0443\u043d\u0434", ss:"%d \u0441\u0435\u043a\u0443\u043d\u0434", m:"\u0431\u0456\u0440 \u043c\u0438\u043d\u0443\u0442", mm:"%d \u043c\u0438\u043d\u0443\u0442", h:"\u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442", hh:"%d \u0441\u0430\u0493\u0430\u0442", d:"\u0431\u0456\u0440 \u043a\u04af\u043d", dd:"%d \u043a\u04af\u043d", 
  M:"\u0431\u0456\u0440 \u0430\u0439", MM:"%d \u0430\u0439", y:"\u0431\u0456\u0440 \u0436\u044b\u043b", yy:"%d \u0436\u044b\u043b"}, dayOfMonthOrdinalParse:/\d{1,2}-(\u0448\u0456|\u0448\u044b)/, ordinal:function(number) {
    var a = number % 10, b = number >= 100 ? 100 : null;
    return number + (suffixes$1[number] || suffixes$1[a] || suffixes$1[b]);
  }, week:{dow:1, doy:7}});
  var symbolMap$8 = {1:"\u17e1", 2:"\u17e2", 3:"\u17e3", 4:"\u17e4", 5:"\u17e5", 6:"\u17e6", 7:"\u17e7", 8:"\u17e8", 9:"\u17e9", 0:"\u17e0"}, numberMap$7 = {"\u17e1":"1", "\u17e2":"2", "\u17e3":"3", "\u17e4":"4", "\u17e5":"5", "\u17e6":"6", "\u17e7":"7", "\u17e8":"8", "\u17e9":"9", "\u17e0":"0"};
  hooks.defineLocale("km", {months:"\u1798\u1780\u179a\u17b6_\u1780\u17bb\u1798\u17d2\u1797\u17c8_\u1798\u17b8\u1793\u17b6_\u1798\u17c1\u179f\u17b6_\u17a7\u179f\u1797\u17b6_\u1798\u17b7\u1790\u17bb\u1793\u17b6_\u1780\u1780\u17d2\u1780\u178a\u17b6_\u179f\u17b8\u17a0\u17b6_\u1780\u1789\u17d2\u1789\u17b6_\u178f\u17bb\u179b\u17b6_\u179c\u17b7\u1785\u17d2\u1786\u17b7\u1780\u17b6_\u1792\u17d2\u1793\u17bc".split("_"), monthsShort:"\u1798\u1780\u179a\u17b6_\u1780\u17bb\u1798\u17d2\u1797\u17c8_\u1798\u17b8\u1793\u17b6_\u1798\u17c1\u179f\u17b6_\u17a7\u179f\u1797\u17b6_\u1798\u17b7\u1790\u17bb\u1793\u17b6_\u1780\u1780\u17d2\u1780\u178a\u17b6_\u179f\u17b8\u17a0\u17b6_\u1780\u1789\u17d2\u1789\u17b6_\u178f\u17bb\u179b\u17b6_\u179c\u17b7\u1785\u17d2\u1786\u17b7\u1780\u17b6_\u1792\u17d2\u1793\u17bc".split("_"), 
  weekdays:"\u17a2\u17b6\u1791\u17b7\u178f\u17d2\u1799_\u1785\u17d0\u1793\u17d2\u1791_\u17a2\u1784\u17d2\u1782\u17b6\u179a_\u1796\u17bb\u1792_\u1796\u17d2\u179a\u17a0\u179f\u17d2\u1794\u178f\u17b7\u17cd_\u179f\u17bb\u1780\u17d2\u179a_\u179f\u17c5\u179a\u17cd".split("_"), weekdaysShort:"\u17a2\u17b6_\u1785_\u17a2_\u1796_\u1796\u17d2\u179a_\u179f\u17bb_\u179f".split("_"), weekdaysMin:"\u17a2\u17b6_\u1785_\u17a2_\u1796_\u1796\u17d2\u179a_\u179f\u17bb_\u179f".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", 
  LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, meridiemParse:/\u1796\u17d2\u179a\u17b9\u1780|\u179b\u17d2\u1784\u17b6\u1785/, isPM:function(input) {
    return input === "\u179b\u17d2\u1784\u17b6\u1785";
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u1796\u17d2\u179a\u17b9\u1780";
    } else {
      return "\u179b\u17d2\u1784\u17b6\u1785";
    }
  }, calendar:{sameDay:"[\u1790\u17d2\u1784\u17c3\u1793\u17c1\u17c7 \u1798\u17c9\u17c4\u1784] LT", nextDay:"[\u179f\u17d2\u17a2\u17c2\u1780 \u1798\u17c9\u17c4\u1784] LT", nextWeek:"dddd [\u1798\u17c9\u17c4\u1784] LT", lastDay:"[\u1798\u17d2\u179f\u17b7\u179b\u1798\u17b7\u1789 \u1798\u17c9\u17c4\u1784] LT", lastWeek:"dddd [\u179f\u1794\u17d2\u178f\u17b6\u17a0\u17cd\u1798\u17bb\u1793] [\u1798\u17c9\u17c4\u1784] LT", sameElse:"L"}, relativeTime:{future:"%s\u1791\u17c0\u178f", past:"%s\u1798\u17bb\u1793", 
  s:"\u1794\u17c9\u17bb\u1793\u17d2\u1798\u17b6\u1793\u179c\u17b7\u1793\u17b6\u1791\u17b8", ss:"%d \u179c\u17b7\u1793\u17b6\u1791\u17b8", m:"\u1798\u17bd\u1799\u1793\u17b6\u1791\u17b8", mm:"%d \u1793\u17b6\u1791\u17b8", h:"\u1798\u17bd\u1799\u1798\u17c9\u17c4\u1784", hh:"%d \u1798\u17c9\u17c4\u1784", d:"\u1798\u17bd\u1799\u1790\u17d2\u1784\u17c3", dd:"%d \u1790\u17d2\u1784\u17c3", M:"\u1798\u17bd\u1799\u1781\u17c2", MM:"%d \u1781\u17c2", y:"\u1798\u17bd\u1799\u1786\u17d2\u1793\u17b6\u17c6", yy:"%d \u1786\u17d2\u1793\u17b6\u17c6"}, 
  dayOfMonthOrdinalParse:/\u1791\u17b8\d{1,2}/, ordinal:"\u1791\u17b8%d", preparse:function(string) {
    return string.replace(/[\u17e1\u17e2\u17e3\u17e4\u17e5\u17e6\u17e7\u17e8\u17e9\u17e0]/g, function(match) {
      return numberMap$7[match];
    });
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$8[match];
    });
  }, week:{dow:1, doy:4}});
  var symbolMap$9 = {1:"\u0ce7", 2:"\u0ce8", 3:"\u0ce9", 4:"\u0cea", 5:"\u0ceb", 6:"\u0cec", 7:"\u0ced", 8:"\u0cee", 9:"\u0cef", 0:"\u0ce6"}, numberMap$8 = {"\u0ce7":"1", "\u0ce8":"2", "\u0ce9":"3", "\u0cea":"4", "\u0ceb":"5", "\u0cec":"6", "\u0ced":"7", "\u0cee":"8", "\u0cef":"9", "\u0ce6":"0"};
  hooks.defineLocale("kn", {months:"\u0c9c\u0ca8\u0cb5\u0cb0\u0cbf_\u0cab\u0cc6\u0cac\u0ccd\u0cb0\u0cb5\u0cb0\u0cbf_\u0cae\u0cbe\u0cb0\u0ccd\u0c9a\u0ccd_\u0c8f\u0caa\u0ccd\u0cb0\u0cbf\u0cb2\u0ccd_\u0cae\u0cc6\u0cd5_\u0c9c\u0cc2\u0ca8\u0ccd_\u0c9c\u0cc1\u0cb2\u0cc6\u0cd6_\u0c86\u0c97\u0cb8\u0ccd\u0c9f\u0ccd_\u0cb8\u0cc6\u0caa\u0ccd\u0c9f\u0cc6\u0c82\u0cac\u0cb0\u0ccd_\u0c85\u0c95\u0ccd\u0c9f\u0cc6\u0cc2\u0cd5\u0cac\u0cb0\u0ccd_\u0ca8\u0cb5\u0cc6\u0c82\u0cac\u0cb0\u0ccd_\u0ca1\u0cbf\u0cb8\u0cc6\u0c82\u0cac\u0cb0\u0ccd".split("_"), 
  monthsShort:"\u0c9c\u0ca8_\u0cab\u0cc6\u0cac\u0ccd\u0cb0_\u0cae\u0cbe\u0cb0\u0ccd\u0c9a\u0ccd_\u0c8f\u0caa\u0ccd\u0cb0\u0cbf\u0cb2\u0ccd_\u0cae\u0cc6\u0cd5_\u0c9c\u0cc2\u0ca8\u0ccd_\u0c9c\u0cc1\u0cb2\u0cc6\u0cd6_\u0c86\u0c97\u0cb8\u0ccd\u0c9f\u0ccd_\u0cb8\u0cc6\u0caa\u0ccd\u0c9f\u0cc6\u0c82_\u0c85\u0c95\u0ccd\u0c9f\u0cc6\u0cc2\u0cd5_\u0ca8\u0cb5\u0cc6\u0c82_\u0ca1\u0cbf\u0cb8\u0cc6\u0c82".split("_"), monthsParseExact:true, weekdays:"\u0cad\u0cbe\u0ca8\u0cc1\u0cb5\u0cbe\u0cb0_\u0cb8\u0cc6\u0cc2\u0cd5\u0cae\u0cb5\u0cbe\u0cb0_\u0cae\u0c82\u0c97\u0cb3\u0cb5\u0cbe\u0cb0_\u0cac\u0cc1\u0ca7\u0cb5\u0cbe\u0cb0_\u0c97\u0cc1\u0cb0\u0cc1\u0cb5\u0cbe\u0cb0_\u0cb6\u0cc1\u0c95\u0ccd\u0cb0\u0cb5\u0cbe\u0cb0_\u0cb6\u0ca8\u0cbf\u0cb5\u0cbe\u0cb0".split("_"), 
  weekdaysShort:"\u0cad\u0cbe\u0ca8\u0cc1_\u0cb8\u0cc6\u0cc2\u0cd5\u0cae_\u0cae\u0c82\u0c97\u0cb3_\u0cac\u0cc1\u0ca7_\u0c97\u0cc1\u0cb0\u0cc1_\u0cb6\u0cc1\u0c95\u0ccd\u0cb0_\u0cb6\u0ca8\u0cbf".split("_"), weekdaysMin:"\u0cad\u0cbe_\u0cb8\u0cc6\u0cc2\u0cd5_\u0cae\u0c82_\u0cac\u0cc1_\u0c97\u0cc1_\u0cb6\u0cc1_\u0cb6".split("_"), longDateFormat:{LT:"A h:mm", LTS:"A h:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY, A h:mm", LLLL:"dddd, D MMMM YYYY, A h:mm"}, calendar:{sameDay:"[\u0c87\u0c82\u0ca6\u0cc1] LT", 
  nextDay:"[\u0ca8\u0cbe\u0cb3\u0cc6] LT", nextWeek:"dddd, LT", lastDay:"[\u0ca8\u0cbf\u0ca8\u0ccd\u0ca8\u0cc6] LT", lastWeek:"[\u0c95\u0cc6\u0cc2\u0ca8\u0cc6\u0caf] dddd, LT", sameElse:"L"}, relativeTime:{future:"%s \u0ca8\u0c82\u0ca4\u0cb0", past:"%s \u0cb9\u0cbf\u0c82\u0ca6\u0cc6", s:"\u0c95\u0cc6\u0cb2\u0cb5\u0cc1 \u0c95\u0ccd\u0cb7\u0ca3\u0c97\u0cb3\u0cc1", ss:"%d \u0cb8\u0cc6\u0c95\u0cc6\u0c82\u0ca1\u0cc1\u0c97\u0cb3\u0cc1", m:"\u0c92\u0c82\u0ca6\u0cc1 \u0ca8\u0cbf\u0cae\u0cbf\u0cb7", mm:"%d \u0ca8\u0cbf\u0cae\u0cbf\u0cb7", 
  h:"\u0c92\u0c82\u0ca6\u0cc1 \u0c97\u0c82\u0c9f\u0cc6", hh:"%d \u0c97\u0c82\u0c9f\u0cc6", d:"\u0c92\u0c82\u0ca6\u0cc1 \u0ca6\u0cbf\u0ca8", dd:"%d \u0ca6\u0cbf\u0ca8", M:"\u0c92\u0c82\u0ca6\u0cc1 \u0ca4\u0cbf\u0c82\u0c97\u0cb3\u0cc1", MM:"%d \u0ca4\u0cbf\u0c82\u0c97\u0cb3\u0cc1", y:"\u0c92\u0c82\u0ca6\u0cc1 \u0cb5\u0cb0\u0ccd\u0cb7", yy:"%d \u0cb5\u0cb0\u0ccd\u0cb7"}, preparse:function(string) {
    return string.replace(/[\u0ce7\u0ce8\u0ce9\u0cea\u0ceb\u0cec\u0ced\u0cee\u0cef\u0ce6]/g, function(match) {
      return numberMap$8[match];
    });
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$9[match];
    });
  }, meridiemParse:/\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf|\u0cac\u0cc6\u0cb3\u0cbf\u0c97\u0ccd\u0c97\u0cc6|\u0cae\u0ca7\u0ccd\u0caf\u0cbe\u0cb9\u0ccd\u0ca8|\u0cb8\u0c82\u0c9c\u0cc6/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf") {
      return hour < 4 ? hour : hour + 12;
    } else {
      if (meridiem === "\u0cac\u0cc6\u0cb3\u0cbf\u0c97\u0ccd\u0c97\u0cc6") {
        return hour;
      } else {
        if (meridiem === "\u0cae\u0ca7\u0ccd\u0caf\u0cbe\u0cb9\u0ccd\u0ca8") {
          return hour >= 10 ? hour : hour + 12;
        } else {
          if (meridiem === "\u0cb8\u0c82\u0c9c\u0cc6") {
            return hour + 12;
          }
        }
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf";
    } else {
      if (hour < 10) {
        return "\u0cac\u0cc6\u0cb3\u0cbf\u0c97\u0ccd\u0c97\u0cc6";
      } else {
        if (hour < 17) {
          return "\u0cae\u0ca7\u0ccd\u0caf\u0cbe\u0cb9\u0ccd\u0ca8";
        } else {
          if (hour < 20) {
            return "\u0cb8\u0c82\u0c9c\u0cc6";
          } else {
            return "\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf";
          }
        }
      }
    }
  }, dayOfMonthOrdinalParse:/\d{1,2}(\u0ca8\u0cc6\u0cd5)/, ordinal:function(number) {
    return number + "\u0ca8\u0cc6\u0cd5";
  }, week:{dow:0, doy:6}});
  hooks.defineLocale("ko", {months:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"), monthsShort:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"), weekdays:"\uc77c\uc694\uc77c_\uc6d4\uc694\uc77c_\ud654\uc694\uc77c_\uc218\uc694\uc77c_\ubaa9\uc694\uc77c_\uae08\uc694\uc77c_\ud1a0\uc694\uc77c".split("_"), weekdaysShort:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"), 
  weekdaysMin:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"), longDateFormat:{LT:"A h:mm", LTS:"A h:mm:ss", L:"YYYY.MM.DD.", LL:"YYYY\ub144 MMMM D\uc77c", LLL:"YYYY\ub144 MMMM D\uc77c A h:mm", LLLL:"YYYY\ub144 MMMM D\uc77c dddd A h:mm", l:"YYYY.MM.DD.", ll:"YYYY\ub144 MMMM D\uc77c", lll:"YYYY\ub144 MMMM D\uc77c A h:mm", llll:"YYYY\ub144 MMMM D\uc77c dddd A h:mm"}, calendar:{sameDay:"\uc624\ub298 LT", nextDay:"\ub0b4\uc77c LT", nextWeek:"dddd LT", lastDay:"\uc5b4\uc81c LT", lastWeek:"\uc9c0\ub09c\uc8fc dddd LT", 
  sameElse:"L"}, relativeTime:{future:"%s \ud6c4", past:"%s \uc804", s:"\uba87 \ucd08", ss:"%d\ucd08", m:"1\ubd84", mm:"%d\ubd84", h:"\ud55c \uc2dc\uac04", hh:"%d\uc2dc\uac04", d:"\ud558\ub8e8", dd:"%d\uc77c", M:"\ud55c \ub2ec", MM:"%d\ub2ec", y:"\uc77c \ub144", yy:"%d\ub144"}, dayOfMonthOrdinalParse:/\d{1,2}(\uc77c|\uc6d4|\uc8fc)/, ordinal:function(number, period) {
    switch(period) {
      case "d":
      case "D":
      case "DDD":
        return number + "\uc77c";
      case "M":
        return number + "\uc6d4";
      case "w":
      case "W":
        return number + "\uc8fc";
      default:
        return number;
    }
  }, meridiemParse:/\uc624\uc804|\uc624\ud6c4/, isPM:function(token) {
    return token === "\uc624\ud6c4";
  }, meridiem:function(hour, minute, isUpper) {
    return hour < 12 ? "\uc624\uc804" : "\uc624\ud6c4";
  }});
  var symbolMap$a = {1:"\u0661", 2:"\u0662", 3:"\u0663", 4:"\u0664", 5:"\u0665", 6:"\u0666", 7:"\u0667", 8:"\u0668", 9:"\u0669", 0:"\u0660"}, numberMap$9 = {"\u0661":"1", "\u0662":"2", "\u0663":"3", "\u0664":"4", "\u0665":"5", "\u0666":"6", "\u0667":"7", "\u0668":"8", "\u0669":"9", "\u0660":"0"}, months$7 = ["\u06a9\u0627\u0646\u0648\u0646\u06cc \u062f\u0648\u0648\u06d5\u0645", "\u0634\u0648\u0628\u0627\u062a", "\u0626\u0627\u0632\u0627\u0631", "\u0646\u06cc\u0633\u0627\u0646", "\u0626\u0627\u06cc\u0627\u0631", 
  "\u062d\u0648\u0632\u06d5\u06cc\u0631\u0627\u0646", "\u062a\u06d5\u0645\u0645\u0648\u0632", "\u0626\u0627\u0628", "\u0626\u06d5\u06cc\u0644\u0648\u0648\u0644", "\u062a\u0634\u0631\u06cc\u0646\u06cc \u06cc\u06d5\u0643\u06d5\u0645", "\u062a\u0634\u0631\u06cc\u0646\u06cc \u062f\u0648\u0648\u06d5\u0645", "\u0643\u0627\u0646\u0648\u0646\u06cc \u06cc\u06d5\u06a9\u06d5\u0645"];
  hooks.defineLocale("ku", {months:months$7, monthsShort:months$7, weekdays:"\u06cc\u0647\u200c\u0643\u0634\u0647\u200c\u0645\u0645\u0647\u200c_\u062f\u0648\u0648\u0634\u0647\u200c\u0645\u0645\u0647\u200c_\u0633\u06ce\u0634\u0647\u200c\u0645\u0645\u0647\u200c_\u0686\u0648\u0627\u0631\u0634\u0647\u200c\u0645\u0645\u0647\u200c_\u067e\u06ce\u0646\u062c\u0634\u0647\u200c\u0645\u0645\u0647\u200c_\u0647\u0647\u200c\u06cc\u0646\u06cc_\u0634\u0647\u200c\u0645\u0645\u0647\u200c".split("_"), weekdaysShort:"\u06cc\u0647\u200c\u0643\u0634\u0647\u200c\u0645_\u062f\u0648\u0648\u0634\u0647\u200c\u0645_\u0633\u06ce\u0634\u0647\u200c\u0645_\u0686\u0648\u0627\u0631\u0634\u0647\u200c\u0645_\u067e\u06ce\u0646\u062c\u0634\u0647\u200c\u0645_\u0647\u0647\u200c\u06cc\u0646\u06cc_\u0634\u0647\u200c\u0645\u0645\u0647\u200c".split("_"), 
  weekdaysMin:"\u06cc_\u062f_\u0633_\u0686_\u067e_\u0647_\u0634".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, meridiemParse:/\u0626\u06ce\u0648\u0627\u0631\u0647\u200c|\u0628\u0647\u200c\u06cc\u0627\u0646\u06cc/, isPM:function(input) {
    return /\u0626\u06ce\u0648\u0627\u0631\u0647\u200c/.test(input);
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u0628\u0647\u200c\u06cc\u0627\u0646\u06cc";
    } else {
      return "\u0626\u06ce\u0648\u0627\u0631\u0647\u200c";
    }
  }, calendar:{sameDay:"[\u0626\u0647\u200c\u0645\u0631\u06c6 \u0643\u0627\u062a\u0698\u0645\u06ce\u0631] LT", nextDay:"[\u0628\u0647\u200c\u06cc\u0627\u0646\u06cc \u0643\u0627\u062a\u0698\u0645\u06ce\u0631] LT", nextWeek:"dddd [\u0643\u0627\u062a\u0698\u0645\u06ce\u0631] LT", lastDay:"[\u062f\u0648\u06ce\u0646\u06ce \u0643\u0627\u062a\u0698\u0645\u06ce\u0631] LT", lastWeek:"dddd [\u0643\u0627\u062a\u0698\u0645\u06ce\u0631] LT", sameElse:"L"}, relativeTime:{future:"\u0644\u0647\u200c %s", past:"%s", 
  s:"\u0686\u0647\u200c\u0646\u062f \u0686\u0631\u0643\u0647\u200c\u06cc\u0647\u200c\u0643", ss:"\u0686\u0631\u0643\u0647\u200c %d", m:"\u06cc\u0647\u200c\u0643 \u062e\u0648\u0644\u0647\u200c\u0643", mm:"%d \u062e\u0648\u0644\u0647\u200c\u0643", h:"\u06cc\u0647\u200c\u0643 \u0643\u0627\u062a\u0698\u0645\u06ce\u0631", hh:"%d \u0643\u0627\u062a\u0698\u0645\u06ce\u0631", d:"\u06cc\u0647\u200c\u0643 \u0695\u06c6\u0698", dd:"%d \u0695\u06c6\u0698", M:"\u06cc\u0647\u200c\u0643 \u0645\u0627\u0646\u06af", 
  MM:"%d \u0645\u0627\u0646\u06af", y:"\u06cc\u0647\u200c\u0643 \u0633\u0627\u06b5", yy:"%d \u0633\u0627\u06b5"}, preparse:function(string) {
    return string.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g, function(match) {
      return numberMap$9[match];
    }).replace(/\u060c/g, ",");
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$a[match];
    }).replace(/,/g, "\u060c");
  }, week:{dow:6, doy:12}});
  var suffixes$2 = {0:"-\u0447\u04af", 1:"-\u0447\u0438", 2:"-\u0447\u0438", 3:"-\u0447\u04af", 4:"-\u0447\u04af", 5:"-\u0447\u0438", 6:"-\u0447\u044b", 7:"-\u0447\u0438", 8:"-\u0447\u0438", 9:"-\u0447\u0443", 10:"-\u0447\u0443", 20:"-\u0447\u044b", 30:"-\u0447\u0443", 40:"-\u0447\u044b", 50:"-\u0447\u04af", 60:"-\u0447\u044b", 70:"-\u0447\u0438", 80:"-\u0447\u0438", 90:"-\u0447\u0443", 100:"-\u0447\u04af"};
  hooks.defineLocale("ky", {months:"\u044f\u043d\u0432\u0430\u0440\u044c_\u0444\u0435\u0432\u0440\u0430\u043b\u044c_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b\u044c_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c_\u043e\u043a\u0442\u044f\u0431\u0440\u044c_\u043d\u043e\u044f\u0431\u0440\u044c_\u0434\u0435\u043a\u0430\u0431\u0440\u044c".split("_"), monthsShort:"\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_"), 
  weekdays:"\u0416\u0435\u043a\u0448\u0435\u043c\u0431\u0438_\u0414\u04af\u0439\u0448\u04e9\u043c\u0431\u04af_\u0428\u0435\u0439\u0448\u0435\u043c\u0431\u0438_\u0428\u0430\u0440\u0448\u0435\u043c\u0431\u0438_\u0411\u0435\u0439\u0448\u0435\u043c\u0431\u0438_\u0416\u0443\u043c\u0430_\u0418\u0448\u0435\u043c\u0431\u0438".split("_"), weekdaysShort:"\u0416\u0435\u043a_\u0414\u04af\u0439_\u0428\u0435\u0439_\u0428\u0430\u0440_\u0411\u0435\u0439_\u0416\u0443\u043c_\u0418\u0448\u0435".split("_"), weekdaysMin:"\u0416\u043a_\u0414\u0439_\u0428\u0439_\u0428\u0440_\u0411\u0439_\u0416\u043c_\u0418\u0448".split("_"), 
  longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[\u0411\u04af\u0433\u04af\u043d \u0441\u0430\u0430\u0442] LT", nextDay:"[\u042d\u0440\u0442\u0435\u04a3 \u0441\u0430\u0430\u0442] LT", nextWeek:"dddd [\u0441\u0430\u0430\u0442] LT", lastDay:"[\u041a\u0435\u0447\u044d\u044d \u0441\u0430\u0430\u0442] LT", lastWeek:"[\u04e8\u0442\u043a\u04e9\u043d \u0430\u043f\u0442\u0430\u043d\u044b\u043d] dddd [\u043a\u04af\u043d\u04af] [\u0441\u0430\u0430\u0442] LT", 
  sameElse:"L"}, relativeTime:{future:"%s \u0438\u0447\u0438\u043d\u0434\u0435", past:"%s \u043c\u0443\u0440\u0443\u043d", s:"\u0431\u0438\u0440\u043d\u0435\u0447\u0435 \u0441\u0435\u043a\u0443\u043d\u0434", ss:"%d \u0441\u0435\u043a\u0443\u043d\u0434", m:"\u0431\u0438\u0440 \u043c\u04af\u043d\u04e9\u0442", mm:"%d \u043c\u04af\u043d\u04e9\u0442", h:"\u0431\u0438\u0440 \u0441\u0430\u0430\u0442", hh:"%d \u0441\u0430\u0430\u0442", d:"\u0431\u0438\u0440 \u043a\u04af\u043d", dd:"%d \u043a\u04af\u043d", 
  M:"\u0431\u0438\u0440 \u0430\u0439", MM:"%d \u0430\u0439", y:"\u0431\u0438\u0440 \u0436\u044b\u043b", yy:"%d \u0436\u044b\u043b"}, dayOfMonthOrdinalParse:/\d{1,2}-(\u0447\u0438|\u0447\u044b|\u0447\u04af|\u0447\u0443)/, ordinal:function(number) {
    var a = number % 10, b = number >= 100 ? 100 : null;
    return number + (suffixes$2[number] || suffixes$2[a] || suffixes$2[b]);
  }, week:{dow:1, doy:7}});
  function processRelativeTime$5(number, withoutSuffix, key, isFuture) {
    var format = {"m":["eng Minutt", "enger Minutt"], "h":["eng Stonn", "enger Stonn"], "d":["een Dag", "engem Dag"], "M":["ee Mount", "engem Mount"], "y":["ee Joer", "engem Joer"]};
    return withoutSuffix ? format[key][0] : format[key][1];
  }
  function processFutureTime(string) {
    var number = string.substr(0, string.indexOf(" "));
    if (eifelerRegelAppliesToNumber(number)) {
      return "a " + string;
    }
    return "an " + string;
  }
  function processPastTime(string) {
    var number = string.substr(0, string.indexOf(" "));
    if (eifelerRegelAppliesToNumber(number)) {
      return "viru " + string;
    }
    return "virun " + string;
  }
  function eifelerRegelAppliesToNumber(number) {
    number = parseInt(number, 10);
    if (isNaN(number)) {
      return false;
    }
    if (number < 0) {
      return true;
    } else {
      if (number < 10) {
        if (4 <= number && number <= 7) {
          return true;
        }
        return false;
      } else {
        if (number < 100) {
          var lastDigit = number % 10, firstDigit = number / 10;
          if (lastDigit === 0) {
            return eifelerRegelAppliesToNumber(firstDigit);
          }
          return eifelerRegelAppliesToNumber(lastDigit);
        } else {
          if (number < 10000) {
            while (number >= 10) {
              number = number / 10;
            }
            return eifelerRegelAppliesToNumber(number);
          } else {
            number = number / 1000;
            return eifelerRegelAppliesToNumber(number);
          }
        }
      }
    }
  }
  hooks.defineLocale("lb", {months:"Januar_Februar_M\u00e4erz_Abr\u00ebll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"), monthsParseExact:true, weekdays:"Sonndeg_M\u00e9indeg_D\u00ebnschdeg_M\u00ebttwoch_Donneschdeg_Freideg_Samschdeg".split("_"), weekdaysShort:"So._M\u00e9._D\u00eb._M\u00eb._Do._Fr._Sa.".split("_"), weekdaysMin:"So_M\u00e9_D\u00eb_M\u00eb_Do_Fr_Sa".split("_"), weekdaysParseExact:true, 
  longDateFormat:{LT:"H:mm [Auer]", LTS:"H:mm:ss [Auer]", L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY H:mm [Auer]", LLLL:"dddd, D. MMMM YYYY H:mm [Auer]"}, calendar:{sameDay:"[Haut um] LT", sameElse:"L", nextDay:"[Muer um] LT", nextWeek:"dddd [um] LT", lastDay:"[G\u00ebschter um] LT", lastWeek:function() {
    switch(this.day()) {
      case 2:
      case 4:
        return "[Leschten] dddd [um] LT";
      default:
        return "[Leschte] dddd [um] LT";
    }
  }}, relativeTime:{future:processFutureTime, past:processPastTime, s:"e puer Sekonnen", ss:"%d Sekonnen", m:processRelativeTime$5, mm:"%d Minutten", h:processRelativeTime$5, hh:"%d Stonnen", d:processRelativeTime$5, dd:"%d Deeg", M:processRelativeTime$5, MM:"%d M\u00e9int", y:processRelativeTime$5, yy:"%d Joer"}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  hooks.defineLocale("lo", {months:"\u0ea1\u0eb1\u0e87\u0e81\u0ead\u0e99_\u0e81\u0eb8\u0ea1\u0e9e\u0eb2_\u0ea1\u0eb5\u0e99\u0eb2_\u0ec0\u0ea1\u0eaa\u0eb2_\u0e9e\u0eb6\u0e94\u0eaa\u0eb0\u0e9e\u0eb2_\u0ea1\u0eb4\u0e96\u0eb8\u0e99\u0eb2_\u0e81\u0ecd\u0ea5\u0eb0\u0e81\u0ebb\u0e94_\u0eaa\u0eb4\u0e87\u0eab\u0eb2_\u0e81\u0eb1\u0e99\u0e8d\u0eb2_\u0e95\u0eb8\u0ea5\u0eb2_\u0e9e\u0eb0\u0e88\u0eb4\u0e81_\u0e97\u0eb1\u0e99\u0ea7\u0eb2".split("_"), monthsShort:"\u0ea1\u0eb1\u0e87\u0e81\u0ead\u0e99_\u0e81\u0eb8\u0ea1\u0e9e\u0eb2_\u0ea1\u0eb5\u0e99\u0eb2_\u0ec0\u0ea1\u0eaa\u0eb2_\u0e9e\u0eb6\u0e94\u0eaa\u0eb0\u0e9e\u0eb2_\u0ea1\u0eb4\u0e96\u0eb8\u0e99\u0eb2_\u0e81\u0ecd\u0ea5\u0eb0\u0e81\u0ebb\u0e94_\u0eaa\u0eb4\u0e87\u0eab\u0eb2_\u0e81\u0eb1\u0e99\u0e8d\u0eb2_\u0e95\u0eb8\u0ea5\u0eb2_\u0e9e\u0eb0\u0e88\u0eb4\u0e81_\u0e97\u0eb1\u0e99\u0ea7\u0eb2".split("_"), 
  weekdays:"\u0ead\u0eb2\u0e97\u0eb4\u0e94_\u0e88\u0eb1\u0e99_\u0ead\u0eb1\u0e87\u0e84\u0eb2\u0e99_\u0e9e\u0eb8\u0e94_\u0e9e\u0eb0\u0eab\u0eb1\u0e94_\u0eaa\u0eb8\u0e81_\u0ec0\u0eaa\u0ebb\u0eb2".split("_"), weekdaysShort:"\u0e97\u0eb4\u0e94_\u0e88\u0eb1\u0e99_\u0ead\u0eb1\u0e87\u0e84\u0eb2\u0e99_\u0e9e\u0eb8\u0e94_\u0e9e\u0eb0\u0eab\u0eb1\u0e94_\u0eaa\u0eb8\u0e81_\u0ec0\u0eaa\u0ebb\u0eb2".split("_"), weekdaysMin:"\u0e97_\u0e88_\u0ead\u0e84_\u0e9e_\u0e9e\u0eab_\u0eaa\u0e81_\u0eaa".split("_"), weekdaysParseExact:true, 
  longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"\u0ea7\u0eb1\u0e99dddd D MMMM YYYY HH:mm"}, meridiemParse:/\u0e95\u0ead\u0e99\u0ec0\u0e8a\u0ebb\u0ec9\u0eb2|\u0e95\u0ead\u0e99\u0ec1\u0ea5\u0e87/, isPM:function(input) {
    return input === "\u0e95\u0ead\u0e99\u0ec1\u0ea5\u0e87";
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u0e95\u0ead\u0e99\u0ec0\u0e8a\u0ebb\u0ec9\u0eb2";
    } else {
      return "\u0e95\u0ead\u0e99\u0ec1\u0ea5\u0e87";
    }
  }, calendar:{sameDay:"[\u0ea1\u0eb7\u0ec9\u0e99\u0eb5\u0ec9\u0ec0\u0ea7\u0ea5\u0eb2] LT", nextDay:"[\u0ea1\u0eb7\u0ec9\u0ead\u0eb7\u0ec8\u0e99\u0ec0\u0ea7\u0ea5\u0eb2] LT", nextWeek:"[\u0ea7\u0eb1\u0e99]dddd[\u0edc\u0ec9\u0eb2\u0ec0\u0ea7\u0ea5\u0eb2] LT", lastDay:"[\u0ea1\u0eb7\u0ec9\u0ea7\u0eb2\u0e99\u0e99\u0eb5\u0ec9\u0ec0\u0ea7\u0ea5\u0eb2] LT", lastWeek:"[\u0ea7\u0eb1\u0e99]dddd[\u0ec1\u0ea5\u0ec9\u0ea7\u0e99\u0eb5\u0ec9\u0ec0\u0ea7\u0ea5\u0eb2] LT", sameElse:"L"}, relativeTime:{future:"\u0ead\u0eb5\u0e81 %s", 
  past:"%s\u0e9c\u0ec8\u0eb2\u0e99\u0ea1\u0eb2", s:"\u0e9a\u0ecd\u0ec8\u0ec0\u0e97\u0ebb\u0ec8\u0eb2\u0ec3\u0e94\u0ea7\u0eb4\u0e99\u0eb2\u0e97\u0eb5", ss:"%d \u0ea7\u0eb4\u0e99\u0eb2\u0e97\u0eb5", m:"1 \u0e99\u0eb2\u0e97\u0eb5", mm:"%d \u0e99\u0eb2\u0e97\u0eb5", h:"1 \u0e8a\u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87", hh:"%d \u0e8a\u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87", d:"1 \u0ea1\u0eb7\u0ec9", dd:"%d \u0ea1\u0eb7\u0ec9", M:"1 \u0ec0\u0e94\u0eb7\u0ead\u0e99", MM:"%d \u0ec0\u0e94\u0eb7\u0ead\u0e99", y:"1 \u0e9b\u0eb5", 
  yy:"%d \u0e9b\u0eb5"}, dayOfMonthOrdinalParse:/(\u0e97\u0eb5\u0ec8)\d{1,2}/, ordinal:function(number) {
    return "\u0e97\u0eb5\u0ec8" + number;
  }});
  var units = {"ss":"sekund\u0117_sekund\u017ei\u0173_sekundes", "m":"minut\u0117_minut\u0117s_minut\u0119", "mm":"minut\u0117s_minu\u010di\u0173_minutes", "h":"valanda_valandos_valand\u0105", "hh":"valandos_valand\u0173_valandas", "d":"diena_dienos_dien\u0105", "dd":"dienos_dien\u0173_dienas", "M":"m\u0117nuo_m\u0117nesio_m\u0117nes\u012f", "MM":"m\u0117nesiai_m\u0117nesi\u0173_m\u0117nesius", "y":"metai_met\u0173_metus", "yy":"metai_met\u0173_metus"};
  function translateSeconds(number, withoutSuffix, key, isFuture) {
    if (withoutSuffix) {
      return "kelios sekund\u0117s";
    } else {
      return isFuture ? "keli\u0173 sekund\u017ei\u0173" : "kelias sekundes";
    }
  }
  function translateSingular(number, withoutSuffix, key, isFuture) {
    return withoutSuffix ? forms(key)[0] : isFuture ? forms(key)[1] : forms(key)[2];
  }
  function special(number) {
    return number % 10 === 0 || number > 10 && number < 20;
  }
  function forms(key) {
    return units[key].split("_");
  }
  function translate$6(number, withoutSuffix, key, isFuture) {
    var result = number + " ";
    if (number === 1) {
      return result + translateSingular(number, withoutSuffix, key[0], isFuture);
    } else {
      if (withoutSuffix) {
        return result + (special(number) ? forms(key)[1] : forms(key)[0]);
      } else {
        if (isFuture) {
          return result + forms(key)[1];
        } else {
          return result + (special(number) ? forms(key)[1] : forms(key)[2]);
        }
      }
    }
  }
  hooks.defineLocale("lt", {months:{format:"sausio_vasario_kovo_baland\u017eio_gegu\u017e\u0117s_bir\u017eelio_liepos_rugpj\u016b\u010dio_rugs\u0117jo_spalio_lapkri\u010dio_gruod\u017eio".split("_"), standalone:"sausis_vasaris_kovas_balandis_gegu\u017e\u0117_bir\u017eelis_liepa_rugpj\u016btis_rugs\u0117jis_spalis_lapkritis_gruodis".split("_"), isFormat:/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/}, monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"), weekdays:{format:"sekmadien\u012f_pirmadien\u012f_antradien\u012f_tre\u010diadien\u012f_ketvirtadien\u012f_penktadien\u012f_\u0161e\u0161tadien\u012f".split("_"), 
  standalone:"sekmadienis_pirmadienis_antradienis_tre\u010diadienis_ketvirtadienis_penktadienis_\u0161e\u0161tadienis".split("_"), isFormat:/dddd HH:mm/}, weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_\u0160e\u0161".split("_"), weekdaysMin:"S_P_A_T_K_Pn_\u0160".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"YYYY-MM-DD", LL:"YYYY [m.] MMMM D [d.]", LLL:"YYYY [m.] MMMM D [d.], HH:mm [val.]", LLLL:"YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]", l:"YYYY-MM-DD", ll:"YYYY [m.] MMMM D [d.]", 
  lll:"YYYY [m.] MMMM D [d.], HH:mm [val.]", llll:"YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"}, calendar:{sameDay:"[\u0160iandien] LT", nextDay:"[Rytoj] LT", nextWeek:"dddd LT", lastDay:"[Vakar] LT", lastWeek:"[Pra\u0117jus\u012f] dddd LT", sameElse:"L"}, relativeTime:{future:"po %s", past:"prie\u0161 %s", s:translateSeconds, ss:translate$6, m:translateSingular, mm:translate$6, h:translateSingular, hh:translate$6, d:translateSingular, dd:translate$6, M:translateSingular, MM:translate$6, y:translateSingular, 
  yy:translate$6}, dayOfMonthOrdinalParse:/\d{1,2}-oji/, ordinal:function(number) {
    return number + "-oji";
  }, week:{dow:1, doy:4}});
  var units$1 = {"ss":"sekundes_sekund\u0113m_sekunde_sekundes".split("_"), "m":"min\u016btes_min\u016bt\u0113m_min\u016bte_min\u016btes".split("_"), "mm":"min\u016btes_min\u016bt\u0113m_min\u016bte_min\u016btes".split("_"), "h":"stundas_stund\u0101m_stunda_stundas".split("_"), "hh":"stundas_stund\u0101m_stunda_stundas".split("_"), "d":"dienas_dien\u0101m_diena_dienas".split("_"), "dd":"dienas_dien\u0101m_diena_dienas".split("_"), "M":"m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"), 
  "MM":"m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"), "y":"gada_gadiem_gads_gadi".split("_"), "yy":"gada_gadiem_gads_gadi".split("_")};
  function format$1(forms, number, withoutSuffix) {
    if (withoutSuffix) {
      return number % 10 === 1 && number % 100 !== 11 ? forms[2] : forms[3];
    } else {
      return number % 10 === 1 && number % 100 !== 11 ? forms[0] : forms[1];
    }
  }
  function relativeTimeWithPlural$1(number, withoutSuffix, key) {
    return number + " " + format$1(units$1[key], number, withoutSuffix);
  }
  function relativeTimeWithSingular(number, withoutSuffix, key) {
    return format$1(units$1[key], number, withoutSuffix);
  }
  function relativeSeconds(number, withoutSuffix) {
    return withoutSuffix ? "da\u017eas sekundes" : "da\u017e\u0101m sekund\u0113m";
  }
  hooks.defineLocale("lv", {months:"janv\u0101ris_febru\u0101ris_marts_apr\u012blis_maijs_j\u016bnijs_j\u016blijs_augusts_septembris_oktobris_novembris_decembris".split("_"), monthsShort:"jan_feb_mar_apr_mai_j\u016bn_j\u016bl_aug_sep_okt_nov_dec".split("_"), weekdays:"sv\u0113tdiena_pirmdiena_otrdiena_tre\u0161diena_ceturtdiena_piektdiena_sestdiena".split("_"), weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"), weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", 
  LTS:"HH:mm:ss", L:"DD.MM.YYYY.", LL:"YYYY. [gada] D. MMMM", LLL:"YYYY. [gada] D. MMMM, HH:mm", LLLL:"YYYY. [gada] D. MMMM, dddd, HH:mm"}, calendar:{sameDay:"[\u0160odien pulksten] LT", nextDay:"[R\u012bt pulksten] LT", nextWeek:"dddd [pulksten] LT", lastDay:"[Vakar pulksten] LT", lastWeek:"[Pag\u0101ju\u0161\u0101] dddd [pulksten] LT", sameElse:"L"}, relativeTime:{future:"p\u0113c %s", past:"pirms %s", s:relativeSeconds, ss:relativeTimeWithPlural$1, m:relativeTimeWithSingular, mm:relativeTimeWithPlural$1, 
  h:relativeTimeWithSingular, hh:relativeTimeWithPlural$1, d:relativeTimeWithSingular, dd:relativeTimeWithPlural$1, M:relativeTimeWithSingular, MM:relativeTimeWithPlural$1, y:relativeTimeWithSingular, yy:relativeTimeWithPlural$1}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  var translator = {words:{ss:["sekund", "sekunda", "sekundi"], m:["jedan minut", "jednog minuta"], mm:["minut", "minuta", "minuta"], h:["jedan sat", "jednog sata"], hh:["sat", "sata", "sati"], dd:["dan", "dana", "dana"], MM:["mjesec", "mjeseca", "mjeseci"], yy:["godina", "godine", "godina"]}, correctGrammaticalCase:function(number, wordKey) {
    return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
  }, translate:function(number, withoutSuffix, key) {
    var wordKey = translator.words[key];
    if (key.length === 1) {
      return withoutSuffix ? wordKey[0] : wordKey[1];
    } else {
      return number + " " + translator.correctGrammaticalCase(number, wordKey);
    }
  }};
  hooks.defineLocale("me", {months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"), monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"), monthsParseExact:true, weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota".split("_"), weekdaysShort:"ned._pon._uto._sri._\u010det._pet._sub.".split("_"), weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", 
  L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY H:mm", LLLL:"dddd, D. MMMM YYYY H:mm"}, calendar:{sameDay:"[danas u] LT", nextDay:"[sjutra u] LT", nextWeek:function() {
    switch(this.day()) {
      case 0:
        return "[u] [nedjelju] [u] LT";
      case 3:
        return "[u] [srijedu] [u] LT";
      case 6:
        return "[u] [subotu] [u] LT";
      case 1:
      case 2:
      case 4:
      case 5:
        return "[u] dddd [u] LT";
    }
  }, lastDay:"[ju\u010de u] LT", lastWeek:function() {
    var lastWeekDays = ["[pro\u0161le] [nedjelje] [u] LT", "[pro\u0161log] [ponedjeljka] [u] LT", "[pro\u0161log] [utorka] [u] LT", "[pro\u0161le] [srijede] [u] LT", "[pro\u0161log] [\u010detvrtka] [u] LT", "[pro\u0161log] [petka] [u] LT", "[pro\u0161le] [subote] [u] LT"];
    return lastWeekDays[this.day()];
  }, sameElse:"L"}, relativeTime:{future:"za %s", past:"prije %s", s:"nekoliko sekundi", ss:translator.translate, m:translator.translate, mm:translator.translate, h:translator.translate, hh:translator.translate, d:"dan", dd:translator.translate, M:"mjesec", MM:translator.translate, y:"godinu", yy:translator.translate}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:7}});
  hooks.defineLocale("mi", {months:"Kohi-t\u0101te_Hui-tanguru_Pout\u016b-te-rangi_Paenga-wh\u0101wh\u0101_Haratua_Pipiri_H\u014dngoingoi_Here-turi-k\u014dk\u0101_Mahuru_Whiringa-\u0101-nuku_Whiringa-\u0101-rangi_Hakihea".split("_"), monthsShort:"Kohi_Hui_Pou_Pae_Hara_Pipi_H\u014dngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"), monthsRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i, monthsStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i, monthsShortRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i, 
  monthsShortStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i, weekdays:"R\u0101tapu_Mane_T\u016brei_Wenerei_T\u0101ite_Paraire_H\u0101tarei".split("_"), weekdaysShort:"Ta_Ma_T\u016b_We_T\u0101i_Pa_H\u0101".split("_"), weekdaysMin:"Ta_Ma_T\u016b_We_T\u0101i_Pa_H\u0101".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY [i] HH:mm", LLLL:"dddd, D MMMM YYYY [i] HH:mm"}, calendar:{sameDay:"[i teie mahana, i] LT", nextDay:"[apopo i] LT", nextWeek:"dddd [i] LT", 
  lastDay:"[inanahi i] LT", lastWeek:"dddd [whakamutunga i] LT", sameElse:"L"}, relativeTime:{future:"i roto i %s", past:"%s i mua", s:"te h\u0113kona ruarua", ss:"%d h\u0113kona", m:"he meneti", mm:"%d meneti", h:"te haora", hh:"%d haora", d:"he ra", dd:"%d ra", M:"he marama", MM:"%d marama", y:"he tau", yy:"%d tau"}, dayOfMonthOrdinalParse:/\d{1,2}\u00ba/, ordinal:"%d\u00ba", week:{dow:1, doy:4}});
  hooks.defineLocale("mk", {months:"\u0458\u0430\u043d\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0458_\u0458\u0443\u043d\u0438_\u0458\u0443\u043b\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438_\u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438_\u043d\u043e\u0435\u043c\u0432\u0440\u0438_\u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split("_"), monthsShort:"\u0458\u0430\u043d_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0458_\u0458\u0443\u043d_\u0458\u0443\u043b_\u0430\u0432\u0433_\u0441\u0435\u043f_\u043e\u043a\u0442_\u043d\u043e\u0435_\u0434\u0435\u043a".split("_"), 
  weekdays:"\u043d\u0435\u0434\u0435\u043b\u0430_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u043e\u043a_\u043f\u0435\u0442\u043e\u043a_\u0441\u0430\u0431\u043e\u0442\u0430".split("_"), weekdaysShort:"\u043d\u0435\u0434_\u043f\u043e\u043d_\u0432\u0442\u043e_\u0441\u0440\u0435_\u0447\u0435\u0442_\u043f\u0435\u0442_\u0441\u0430\u0431".split("_"), weekdaysMin:"\u043de_\u043fo_\u0432\u0442_\u0441\u0440_\u0447\u0435_\u043f\u0435_\u0441a".split("_"), 
  longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"D.MM.YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY H:mm", LLLL:"dddd, D MMMM YYYY H:mm"}, calendar:{sameDay:"[\u0414\u0435\u043d\u0435\u0441 \u0432\u043e] LT", nextDay:"[\u0423\u0442\u0440\u0435 \u0432\u043e] LT", nextWeek:"[\u0412\u043e] dddd [\u0432\u043e] LT", lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432\u043e] LT", lastWeek:function() {
    switch(this.day()) {
      case 0:
      case 3:
      case 6:
        return "[\u0418\u0437\u043c\u0438\u043d\u0430\u0442\u0430\u0442\u0430] dddd [\u0432\u043e] LT";
      case 1:
      case 2:
      case 4:
      case 5:
        return "[\u0418\u0437\u043c\u0438\u043d\u0430\u0442\u0438\u043e\u0442] dddd [\u0432\u043e] LT";
    }
  }, sameElse:"L"}, relativeTime:{future:"\u043f\u043e\u0441\u043b\u0435 %s", past:"\u043f\u0440\u0435\u0434 %s", s:"\u043d\u0435\u043a\u043e\u043b\u043a\u0443 \u0441\u0435\u043a\u0443\u043d\u0434\u0438", ss:"%d \u0441\u0435\u043a\u0443\u043d\u0434\u0438", m:"\u043c\u0438\u043d\u0443\u0442\u0430", mm:"%d \u043c\u0438\u043d\u0443\u0442\u0438", h:"\u0447\u0430\u0441", hh:"%d \u0447\u0430\u0441\u0430", d:"\u0434\u0435\u043d", dd:"%d \u0434\u0435\u043d\u0430", M:"\u043c\u0435\u0441\u0435\u0446", MM:"%d \u043c\u0435\u0441\u0435\u0446\u0438", 
  y:"\u0433\u043e\u0434\u0438\u043d\u0430", yy:"%d \u0433\u043e\u0434\u0438\u043d\u0438"}, dayOfMonthOrdinalParse:/\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/, ordinal:function(number) {
    var lastDigit = number % 10, last2Digits = number % 100;
    if (number === 0) {
      return number + "-\u0435\u0432";
    } else {
      if (last2Digits === 0) {
        return number + "-\u0435\u043d";
      } else {
        if (last2Digits > 10 && last2Digits < 20) {
          return number + "-\u0442\u0438";
        } else {
          if (lastDigit === 1) {
            return number + "-\u0432\u0438";
          } else {
            if (lastDigit === 2) {
              return number + "-\u0440\u0438";
            } else {
              if (lastDigit === 7 || lastDigit === 8) {
                return number + "-\u043c\u0438";
              } else {
                return number + "-\u0442\u0438";
              }
            }
          }
        }
      }
    }
  }, week:{dow:1, doy:7}});
  hooks.defineLocale("ml", {months:"\u0d1c\u0d28\u0d41\u0d35\u0d30\u0d3f_\u0d2b\u0d46\u0d2c\u0d4d\u0d30\u0d41\u0d35\u0d30\u0d3f_\u0d2e\u0d3e\u0d7c\u0d1a\u0d4d\u0d1a\u0d4d_\u0d0f\u0d2a\u0d4d\u0d30\u0d3f\u0d7d_\u0d2e\u0d47\u0d2f\u0d4d_\u0d1c\u0d42\u0d7a_\u0d1c\u0d42\u0d32\u0d48_\u0d13\u0d17\u0d38\u0d4d\u0d31\u0d4d\u0d31\u0d4d_\u0d38\u0d46\u0d2a\u0d4d\u0d31\u0d4d\u0d31\u0d02\u0d2c\u0d7c_\u0d12\u0d15\u0d4d\u0d1f\u0d4b\u0d2c\u0d7c_\u0d28\u0d35\u0d02\u0d2c\u0d7c_\u0d21\u0d3f\u0d38\u0d02\u0d2c\u0d7c".split("_"), 
  monthsShort:"\u0d1c\u0d28\u0d41._\u0d2b\u0d46\u0d2c\u0d4d\u0d30\u0d41._\u0d2e\u0d3e\u0d7c._\u0d0f\u0d2a\u0d4d\u0d30\u0d3f._\u0d2e\u0d47\u0d2f\u0d4d_\u0d1c\u0d42\u0d7a_\u0d1c\u0d42\u0d32\u0d48._\u0d13\u0d17._\u0d38\u0d46\u0d2a\u0d4d\u0d31\u0d4d\u0d31._\u0d12\u0d15\u0d4d\u0d1f\u0d4b._\u0d28\u0d35\u0d02._\u0d21\u0d3f\u0d38\u0d02.".split("_"), monthsParseExact:true, weekdays:"\u0d1e\u0d3e\u0d2f\u0d31\u0d3e\u0d34\u0d4d\u0d1a_\u0d24\u0d3f\u0d19\u0d4d\u0d15\u0d33\u0d3e\u0d34\u0d4d\u0d1a_\u0d1a\u0d4a\u0d35\u0d4d\u0d35\u0d3e\u0d34\u0d4d\u0d1a_\u0d2c\u0d41\u0d27\u0d28\u0d3e\u0d34\u0d4d\u0d1a_\u0d35\u0d4d\u0d2f\u0d3e\u0d34\u0d3e\u0d34\u0d4d\u0d1a_\u0d35\u0d46\u0d33\u0d4d\u0d33\u0d3f\u0d2f\u0d3e\u0d34\u0d4d\u0d1a_\u0d36\u0d28\u0d3f\u0d2f\u0d3e\u0d34\u0d4d\u0d1a".split("_"), 
  weekdaysShort:"\u0d1e\u0d3e\u0d2f\u0d7c_\u0d24\u0d3f\u0d19\u0d4d\u0d15\u0d7e_\u0d1a\u0d4a\u0d35\u0d4d\u0d35_\u0d2c\u0d41\u0d27\u0d7b_\u0d35\u0d4d\u0d2f\u0d3e\u0d34\u0d02_\u0d35\u0d46\u0d33\u0d4d\u0d33\u0d3f_\u0d36\u0d28\u0d3f".split("_"), weekdaysMin:"\u0d1e\u0d3e_\u0d24\u0d3f_\u0d1a\u0d4a_\u0d2c\u0d41_\u0d35\u0d4d\u0d2f\u0d3e_\u0d35\u0d46_\u0d36".split("_"), longDateFormat:{LT:"A h:mm -\u0d28\u0d41", LTS:"A h:mm:ss -\u0d28\u0d41", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY, A h:mm -\u0d28\u0d41", 
  LLLL:"dddd, D MMMM YYYY, A h:mm -\u0d28\u0d41"}, calendar:{sameDay:"[\u0d07\u0d28\u0d4d\u0d28\u0d4d] LT", nextDay:"[\u0d28\u0d3e\u0d33\u0d46] LT", nextWeek:"dddd, LT", lastDay:"[\u0d07\u0d28\u0d4d\u0d28\u0d32\u0d46] LT", lastWeek:"[\u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e] dddd, LT", sameElse:"L"}, relativeTime:{future:"%s \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d", past:"%s \u0d2e\u0d41\u0d7b\u0d2a\u0d4d", s:"\u0d05\u0d7d\u0d2a \u0d28\u0d3f\u0d2e\u0d3f\u0d37\u0d19\u0d4d\u0d19\u0d7e", ss:"%d \u0d38\u0d46\u0d15\u0d4d\u0d15\u0d7b\u0d21\u0d4d", 
  m:"\u0d12\u0d30\u0d41 \u0d2e\u0d3f\u0d28\u0d3f\u0d31\u0d4d\u0d31\u0d4d", mm:"%d \u0d2e\u0d3f\u0d28\u0d3f\u0d31\u0d4d\u0d31\u0d4d", h:"\u0d12\u0d30\u0d41 \u0d2e\u0d23\u0d3f\u0d15\u0d4d\u0d15\u0d42\u0d7c", hh:"%d \u0d2e\u0d23\u0d3f\u0d15\u0d4d\u0d15\u0d42\u0d7c", d:"\u0d12\u0d30\u0d41 \u0d26\u0d3f\u0d35\u0d38\u0d02", dd:"%d \u0d26\u0d3f\u0d35\u0d38\u0d02", M:"\u0d12\u0d30\u0d41 \u0d2e\u0d3e\u0d38\u0d02", MM:"%d \u0d2e\u0d3e\u0d38\u0d02", y:"\u0d12\u0d30\u0d41 \u0d35\u0d7c\u0d37\u0d02", yy:"%d \u0d35\u0d7c\u0d37\u0d02"}, 
  meridiemParse:/\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f|\u0d30\u0d3e\u0d35\u0d3f\u0d32\u0d46|\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d|\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02|\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f/i, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f" && hour >= 4 || meridiem === "\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d" || meridiem === "\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02") {
      return hour + 12;
    } else {
      return hour;
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f";
    } else {
      if (hour < 12) {
        return "\u0d30\u0d3e\u0d35\u0d3f\u0d32\u0d46";
      } else {
        if (hour < 17) {
          return "\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d";
        } else {
          if (hour < 20) {
            return "\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02";
          } else {
            return "\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f";
          }
        }
      }
    }
  }});
  function translate$7(number, withoutSuffix, key, isFuture) {
    switch(key) {
      case "s":
        return withoutSuffix ? "\u0445\u044d\u0434\u0445\u044d\u043d \u0441\u0435\u043a\u0443\u043d\u0434" : "\u0445\u044d\u0434\u0445\u044d\u043d \u0441\u0435\u043a\u0443\u043d\u0434\u044b\u043d";
      case "ss":
        return number + (withoutSuffix ? " \u0441\u0435\u043a\u0443\u043d\u0434" : " \u0441\u0435\u043a\u0443\u043d\u0434\u044b\u043d");
      case "m":
      case "mm":
        return number + (withoutSuffix ? " \u043c\u0438\u043d\u0443\u0442" : " \u043c\u0438\u043d\u0443\u0442\u044b\u043d");
      case "h":
      case "hh":
        return number + (withoutSuffix ? " \u0446\u0430\u0433" : " \u0446\u0430\u0433\u0438\u0439\u043d");
      case "d":
      case "dd":
        return number + (withoutSuffix ? " \u04e9\u0434\u04e9\u0440" : " \u04e9\u0434\u0440\u0438\u0439\u043d");
      case "M":
      case "MM":
        return number + (withoutSuffix ? " \u0441\u0430\u0440" : " \u0441\u0430\u0440\u044b\u043d");
      case "y":
      case "yy":
        return number + (withoutSuffix ? " \u0436\u0438\u043b" : " \u0436\u0438\u043b\u0438\u0439\u043d");
      default:
        return number;
    }
  }
  hooks.defineLocale("mn", {months:"\u041d\u044d\u0433\u0434\u04af\u0433\u044d\u044d\u0440 \u0441\u0430\u0440_\u0425\u043e\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0413\u0443\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u04e9\u0440\u04e9\u0432\u0434\u04af\u0433\u044d\u044d\u0440 \u0441\u0430\u0440_\u0422\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0417\u0443\u0440\u0433\u0430\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u043e\u043b\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u041d\u0430\u0439\u043c\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0415\u0441\u0434\u04af\u0433\u044d\u044d\u0440 \u0441\u0430\u0440_\u0410\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043d \u043d\u044d\u0433\u0434\u04af\u0433\u044d\u044d\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043d \u0445\u043e\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440".split("_"), 
  monthsShort:"1 \u0441\u0430\u0440_2 \u0441\u0430\u0440_3 \u0441\u0430\u0440_4 \u0441\u0430\u0440_5 \u0441\u0430\u0440_6 \u0441\u0430\u0440_7 \u0441\u0430\u0440_8 \u0441\u0430\u0440_9 \u0441\u0430\u0440_10 \u0441\u0430\u0440_11 \u0441\u0430\u0440_12 \u0441\u0430\u0440".split("_"), monthsParseExact:true, weekdays:"\u041d\u044f\u043c_\u0414\u0430\u0432\u0430\u0430_\u041c\u044f\u0433\u043c\u0430\u0440_\u041b\u0445\u0430\u0433\u0432\u0430_\u041f\u04af\u0440\u044d\u0432_\u0411\u0430\u0430\u0441\u0430\u043d_\u0411\u044f\u043c\u0431\u0430".split("_"), 
  weekdaysShort:"\u041d\u044f\u043c_\u0414\u0430\u0432_\u041c\u044f\u0433_\u041b\u0445\u0430_\u041f\u04af\u0440_\u0411\u0430\u0430_\u0411\u044f\u043c".split("_"), weekdaysMin:"\u041d\u044f_\u0414\u0430_\u041c\u044f_\u041b\u0445_\u041f\u04af_\u0411\u0430_\u0411\u044f".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"YYYY-MM-DD", LL:"YYYY \u043e\u043d\u044b MMMM\u044b\u043d D", LLL:"YYYY \u043e\u043d\u044b MMMM\u044b\u043d D HH:mm", LLLL:"dddd, YYYY \u043e\u043d\u044b MMMM\u044b\u043d D HH:mm"}, 
  meridiemParse:/\u04ae\u04e8|\u04ae\u0425/i, isPM:function(input) {
    return input === "\u04ae\u0425";
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u04ae\u04e8";
    } else {
      return "\u04ae\u0425";
    }
  }, calendar:{sameDay:"[\u04e8\u043d\u04e9\u04e9\u0434\u04e9\u0440] LT", nextDay:"[\u041c\u0430\u0440\u0433\u0430\u0430\u0448] LT", nextWeek:"[\u0418\u0440\u044d\u0445] dddd LT", lastDay:"[\u04e8\u0447\u0438\u0433\u0434\u04e9\u0440] LT", lastWeek:"[\u04e8\u043d\u0433\u04e9\u0440\u0441\u04e9\u043d] dddd LT", sameElse:"L"}, relativeTime:{future:"%s \u0434\u0430\u0440\u0430\u0430", past:"%s \u04e9\u043c\u043d\u04e9", s:translate$7, ss:translate$7, m:translate$7, mm:translate$7, h:translate$7, hh:translate$7, 
  d:translate$7, dd:translate$7, M:translate$7, MM:translate$7, y:translate$7, yy:translate$7}, dayOfMonthOrdinalParse:/\d{1,2} \u04e9\u0434\u04e9\u0440/, ordinal:function(number, period) {
    switch(period) {
      case "d":
      case "D":
      case "DDD":
        return number + " \u04e9\u0434\u04e9\u0440";
      default:
        return number;
    }
  }});
  var symbolMap$b = {1:"\u0967", 2:"\u0968", 3:"\u0969", 4:"\u096a", 5:"\u096b", 6:"\u096c", 7:"\u096d", 8:"\u096e", 9:"\u096f", 0:"\u0966"}, numberMap$a = {"\u0967":"1", "\u0968":"2", "\u0969":"3", "\u096a":"4", "\u096b":"5", "\u096c":"6", "\u096d":"7", "\u096e":"8", "\u096f":"9", "\u0966":"0"};
  function relativeTimeMr(number, withoutSuffix, string, isFuture) {
    var output = "";
    if (withoutSuffix) {
      switch(string) {
        case "s":
          output = "\u0915\u093e\u0939\u0940 \u0938\u0947\u0915\u0902\u0926";
          break;
        case "ss":
          output = "%d \u0938\u0947\u0915\u0902\u0926";
          break;
        case "m":
          output = "\u090f\u0915 \u092e\u093f\u0928\u093f\u091f";
          break;
        case "mm":
          output = "%d \u092e\u093f\u0928\u093f\u091f\u0947";
          break;
        case "h":
          output = "\u090f\u0915 \u0924\u093e\u0938";
          break;
        case "hh":
          output = "%d \u0924\u093e\u0938";
          break;
        case "d":
          output = "\u090f\u0915 \u0926\u093f\u0935\u0938";
          break;
        case "dd":
          output = "%d \u0926\u093f\u0935\u0938";
          break;
        case "M":
          output = "\u090f\u0915 \u092e\u0939\u093f\u0928\u093e";
          break;
        case "MM":
          output = "%d \u092e\u0939\u093f\u0928\u0947";
          break;
        case "y":
          output = "\u090f\u0915 \u0935\u0930\u094d\u0937";
          break;
        case "yy":
          output = "%d \u0935\u0930\u094d\u0937\u0947";
          break;
      }
    } else {
      switch(string) {
        case "s":
          output = "\u0915\u093e\u0939\u0940 \u0938\u0947\u0915\u0902\u0926\u093e\u0902";
          break;
        case "ss":
          output = "%d \u0938\u0947\u0915\u0902\u0926\u093e\u0902";
          break;
        case "m":
          output = "\u090f\u0915\u093e \u092e\u093f\u0928\u093f\u091f\u093e";
          break;
        case "mm":
          output = "%d \u092e\u093f\u0928\u093f\u091f\u093e\u0902";
          break;
        case "h":
          output = "\u090f\u0915\u093e \u0924\u093e\u0938\u093e";
          break;
        case "hh":
          output = "%d \u0924\u093e\u0938\u093e\u0902";
          break;
        case "d":
          output = "\u090f\u0915\u093e \u0926\u093f\u0935\u0938\u093e";
          break;
        case "dd":
          output = "%d \u0926\u093f\u0935\u0938\u093e\u0902";
          break;
        case "M":
          output = "\u090f\u0915\u093e \u092e\u0939\u093f\u0928\u094d\u092f\u093e";
          break;
        case "MM":
          output = "%d \u092e\u0939\u093f\u0928\u094d\u092f\u093e\u0902";
          break;
        case "y":
          output = "\u090f\u0915\u093e \u0935\u0930\u094d\u0937\u093e";
          break;
        case "yy":
          output = "%d \u0935\u0930\u094d\u0937\u093e\u0902";
          break;
      }
    }
    return output.replace(/%d/i, number);
  }
  hooks.defineLocale("mr", {months:"\u091c\u093e\u0928\u0947\u0935\u093e\u0930\u0940_\u092b\u0947\u092c\u094d\u0930\u0941\u0935\u093e\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u090f\u092a\u094d\u0930\u093f\u0932_\u092e\u0947_\u091c\u0942\u0928_\u091c\u0941\u0932\u0948_\u0911\u0917\u0938\u094d\u091f_\u0938\u092a\u094d\u091f\u0947\u0902\u092c\u0930_\u0911\u0915\u094d\u091f\u094b\u092c\u0930_\u0928\u094b\u0935\u094d\u0939\u0947\u0902\u092c\u0930_\u0921\u093f\u0938\u0947\u0902\u092c\u0930".split("_"), 
  monthsShort:"\u091c\u093e\u0928\u0947._\u092b\u0947\u092c\u094d\u0930\u0941._\u092e\u093e\u0930\u094d\u091a._\u090f\u092a\u094d\u0930\u093f._\u092e\u0947._\u091c\u0942\u0928._\u091c\u0941\u0932\u0948._\u0911\u0917._\u0938\u092a\u094d\u091f\u0947\u0902._\u0911\u0915\u094d\u091f\u094b._\u0928\u094b\u0935\u094d\u0939\u0947\u0902._\u0921\u093f\u0938\u0947\u0902.".split("_"), monthsParseExact:true, weekdays:"\u0930\u0935\u093f\u0935\u093e\u0930_\u0938\u094b\u092e\u0935\u093e\u0930_\u092e\u0902\u0917\u0933\u0935\u093e\u0930_\u092c\u0941\u0927\u0935\u093e\u0930_\u0917\u0941\u0930\u0942\u0935\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930_\u0936\u0928\u093f\u0935\u093e\u0930".split("_"), 
  weekdaysShort:"\u0930\u0935\u093f_\u0938\u094b\u092e_\u092e\u0902\u0917\u0933_\u092c\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094d\u0930_\u0936\u0928\u093f".split("_"), weekdaysMin:"\u0930_\u0938\u094b_\u092e\u0902_\u092c\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"), longDateFormat:{LT:"A h:mm \u0935\u093e\u091c\u0924\u093e", LTS:"A h:mm:ss \u0935\u093e\u091c\u0924\u093e", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY, A h:mm \u0935\u093e\u091c\u0924\u093e", LLLL:"dddd, D MMMM YYYY, A h:mm \u0935\u093e\u091c\u0924\u093e"}, 
  calendar:{sameDay:"[\u0906\u091c] LT", nextDay:"[\u0909\u0926\u094d\u092f\u093e] LT", nextWeek:"dddd, LT", lastDay:"[\u0915\u093e\u0932] LT", lastWeek:"[\u092e\u093e\u0917\u0940\u0932] dddd, LT", sameElse:"L"}, relativeTime:{future:"%s\u092e\u0927\u094d\u092f\u0947", past:"%s\u092a\u0942\u0930\u094d\u0935\u0940", s:relativeTimeMr, ss:relativeTimeMr, m:relativeTimeMr, mm:relativeTimeMr, h:relativeTimeMr, hh:relativeTimeMr, d:relativeTimeMr, dd:relativeTimeMr, M:relativeTimeMr, MM:relativeTimeMr, 
  y:relativeTimeMr, yy:relativeTimeMr}, preparse:function(string) {
    return string.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g, function(match) {
      return numberMap$a[match];
    });
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$b[match];
    });
  }, meridiemParse:/\u0930\u093e\u0924\u094d\u0930\u0940|\u0938\u0915\u093e\u0933\u0940|\u0926\u0941\u092a\u093e\u0930\u0940|\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0930\u093e\u0924\u094d\u0930\u0940") {
      return hour < 4 ? hour : hour + 12;
    } else {
      if (meridiem === "\u0938\u0915\u093e\u0933\u0940") {
        return hour;
      } else {
        if (meridiem === "\u0926\u0941\u092a\u093e\u0930\u0940") {
          return hour >= 10 ? hour : hour + 12;
        } else {
          if (meridiem === "\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940") {
            return hour + 12;
          }
        }
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u0930\u093e\u0924\u094d\u0930\u0940";
    } else {
      if (hour < 10) {
        return "\u0938\u0915\u093e\u0933\u0940";
      } else {
        if (hour < 17) {
          return "\u0926\u0941\u092a\u093e\u0930\u0940";
        } else {
          if (hour < 20) {
            return "\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940";
          } else {
            return "\u0930\u093e\u0924\u094d\u0930\u0940";
          }
        }
      }
    }
  }, week:{dow:0, doy:6}});
  hooks.defineLocale("ms-my", {months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat:{LT:"HH.mm", LTS:"HH.mm.ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY [pukul] HH.mm", LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"}, 
  meridiemParse:/pagi|tengahari|petang|malam/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "pagi") {
      return hour;
    } else {
      if (meridiem === "tengahari") {
        return hour >= 11 ? hour : hour + 12;
      } else {
        if (meridiem === "petang" || meridiem === "malam") {
          return hour + 12;
        }
      }
    }
  }, meridiem:function(hours, minutes, isLower) {
    if (hours < 11) {
      return "pagi";
    } else {
      if (hours < 15) {
        return "tengahari";
      } else {
        if (hours < 19) {
          return "petang";
        } else {
          return "malam";
        }
      }
    }
  }, calendar:{sameDay:"[Hari ini pukul] LT", nextDay:"[Esok pukul] LT", nextWeek:"dddd [pukul] LT", lastDay:"[Kelmarin pukul] LT", lastWeek:"dddd [lepas pukul] LT", sameElse:"L"}, relativeTime:{future:"dalam %s", past:"%s yang lepas", s:"beberapa saat", ss:"%d saat", m:"seminit", mm:"%d minit", h:"sejam", hh:"%d jam", d:"sehari", dd:"%d hari", M:"sebulan", MM:"%d bulan", y:"setahun", yy:"%d tahun"}, week:{dow:1, doy:7}});
  hooks.defineLocale("ms", {months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat:{LT:"HH.mm", LTS:"HH.mm.ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY [pukul] HH.mm", LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"}, 
  meridiemParse:/pagi|tengahari|petang|malam/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "pagi") {
      return hour;
    } else {
      if (meridiem === "tengahari") {
        return hour >= 11 ? hour : hour + 12;
      } else {
        if (meridiem === "petang" || meridiem === "malam") {
          return hour + 12;
        }
      }
    }
  }, meridiem:function(hours, minutes, isLower) {
    if (hours < 11) {
      return "pagi";
    } else {
      if (hours < 15) {
        return "tengahari";
      } else {
        if (hours < 19) {
          return "petang";
        } else {
          return "malam";
        }
      }
    }
  }, calendar:{sameDay:"[Hari ini pukul] LT", nextDay:"[Esok pukul] LT", nextWeek:"dddd [pukul] LT", lastDay:"[Kelmarin pukul] LT", lastWeek:"dddd [lepas pukul] LT", sameElse:"L"}, relativeTime:{future:"dalam %s", past:"%s yang lepas", s:"beberapa saat", ss:"%d saat", m:"seminit", mm:"%d minit", h:"sejam", hh:"%d jam", d:"sehari", dd:"%d hari", M:"sebulan", MM:"%d bulan", y:"setahun", yy:"%d tahun"}, week:{dow:1, doy:7}});
  hooks.defineLocale("mt", {months:"Jannar_Frar_Marzu_April_Mejju_\u0120unju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Di\u010bembru".split("_"), monthsShort:"Jan_Fra_Mar_Apr_Mej_\u0120un_Lul_Aww_Set_Ott_Nov_Di\u010b".split("_"), weekdays:"Il-\u0126add_It-Tnejn_It-Tlieta_L-Erbg\u0127a_Il-\u0126amis_Il-\u0120img\u0127a_Is-Sibt".split("_"), weekdaysShort:"\u0126ad_Tne_Tli_Erb_\u0126am_\u0120im_Sib".split("_"), weekdaysMin:"\u0126a_Tn_Tl_Er_\u0126a_\u0120i_Si".split("_"), longDateFormat:{LT:"HH:mm", 
  LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[Illum fil-]LT", nextDay:"[G\u0127ada fil-]LT", nextWeek:"dddd [fil-]LT", lastDay:"[Il-biera\u0127 fil-]LT", lastWeek:"dddd [li g\u0127adda] [fil-]LT", sameElse:"L"}, relativeTime:{future:"f\u2019 %s", past:"%s ilu", s:"ftit sekondi", ss:"%d sekondi", m:"minuta", mm:"%d minuti", h:"sieg\u0127a", hh:"%d sieg\u0127at", d:"\u0121urnata", dd:"%d \u0121ranet", M:"xahar", MM:"%d xhur", 
  y:"sena", yy:"%d sni"}, dayOfMonthOrdinalParse:/\d{1,2}\u00ba/, ordinal:"%d\u00ba", week:{dow:1, doy:4}});
  var symbolMap$c = {1:"\u1041", 2:"\u1042", 3:"\u1043", 4:"\u1044", 5:"\u1045", 6:"\u1046", 7:"\u1047", 8:"\u1048", 9:"\u1049", 0:"\u1040"}, numberMap$b = {"\u1041":"1", "\u1042":"2", "\u1043":"3", "\u1044":"4", "\u1045":"5", "\u1046":"6", "\u1047":"7", "\u1048":"8", "\u1049":"9", "\u1040":"0"};
  hooks.defineLocale("my", {months:"\u1007\u1014\u103a\u1014\u101d\u102b\u101b\u102e_\u1016\u1031\u1016\u1031\u102c\u103a\u101d\u102b\u101b\u102e_\u1019\u1010\u103a_\u1027\u1015\u103c\u102e_\u1019\u1031_\u1007\u103d\u1014\u103a_\u1007\u1030\u101c\u102d\u102f\u1004\u103a_\u101e\u103c\u1002\u102f\u1010\u103a_\u1005\u1000\u103a\u1010\u1004\u103a\u1018\u102c_\u1021\u1031\u102c\u1000\u103a\u1010\u102d\u102f\u1018\u102c_\u1014\u102d\u102f\u101d\u1004\u103a\u1018\u102c_\u1012\u102e\u1007\u1004\u103a\u1018\u102c".split("_"), 
  monthsShort:"\u1007\u1014\u103a_\u1016\u1031_\u1019\u1010\u103a_\u1015\u103c\u102e_\u1019\u1031_\u1007\u103d\u1014\u103a_\u101c\u102d\u102f\u1004\u103a_\u101e\u103c_\u1005\u1000\u103a_\u1021\u1031\u102c\u1000\u103a_\u1014\u102d\u102f_\u1012\u102e".split("_"), weekdays:"\u1010\u1014\u1004\u103a\u1039\u1002\u1014\u103d\u1031_\u1010\u1014\u1004\u103a\u1039\u101c\u102c_\u1021\u1004\u103a\u1039\u1002\u102b_\u1017\u102f\u1012\u1039\u1013\u101f\u1030\u1038_\u1000\u103c\u102c\u101e\u1015\u1010\u1031\u1038_\u101e\u1031\u102c\u1000\u103c\u102c_\u1005\u1014\u1031".split("_"), 
  weekdaysShort:"\u1014\u103d\u1031_\u101c\u102c_\u1002\u102b_\u101f\u1030\u1038_\u1000\u103c\u102c_\u101e\u1031\u102c_\u1014\u1031".split("_"), weekdaysMin:"\u1014\u103d\u1031_\u101c\u102c_\u1002\u102b_\u101f\u1030\u1038_\u1000\u103c\u102c_\u101e\u1031\u102c_\u1014\u1031".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[\u101a\u1014\u1031.] LT [\u1019\u103e\u102c]", nextDay:"[\u1019\u1014\u1000\u103a\u1016\u103c\u1014\u103a] LT [\u1019\u103e\u102c]", 
  nextWeek:"dddd LT [\u1019\u103e\u102c]", lastDay:"[\u1019\u1014\u1031.\u1000] LT [\u1019\u103e\u102c]", lastWeek:"[\u1015\u103c\u102e\u1038\u1001\u1032\u1037\u101e\u1031\u102c] dddd LT [\u1019\u103e\u102c]", sameElse:"L"}, relativeTime:{future:"\u101c\u102c\u1019\u100a\u103a\u1037 %s \u1019\u103e\u102c", past:"\u101c\u103d\u1014\u103a\u1001\u1032\u1037\u101e\u1031\u102c %s \u1000", s:"\u1005\u1000\u1039\u1000\u1014\u103a.\u1021\u1014\u100a\u103a\u1038\u1004\u101a\u103a", ss:"%d \u1005\u1000\u1039\u1000\u1014\u1037\u103a", 
  m:"\u1010\u1005\u103a\u1019\u102d\u1014\u1005\u103a", mm:"%d \u1019\u102d\u1014\u1005\u103a", h:"\u1010\u1005\u103a\u1014\u102c\u101b\u102e", hh:"%d \u1014\u102c\u101b\u102e", d:"\u1010\u1005\u103a\u101b\u1000\u103a", dd:"%d \u101b\u1000\u103a", M:"\u1010\u1005\u103a\u101c", MM:"%d \u101c", y:"\u1010\u1005\u103a\u1014\u103e\u1005\u103a", yy:"%d \u1014\u103e\u1005\u103a"}, preparse:function(string) {
    return string.replace(/[\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049\u1040]/g, function(match) {
      return numberMap$b[match];
    });
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$c[match];
    });
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("nb", {months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"), monthsParseExact:true, weekdays:"s\u00f8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\u00f8rdag".split("_"), weekdaysShort:"s\u00f8._ma._ti._on._to._fr._l\u00f8.".split("_"), weekdaysMin:"s\u00f8_ma_ti_on_to_fr_l\u00f8".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", 
  LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY [kl.] HH:mm", LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"}, calendar:{sameDay:"[i dag kl.] LT", nextDay:"[i morgen kl.] LT", nextWeek:"dddd [kl.] LT", lastDay:"[i g\u00e5r kl.] LT", lastWeek:"[forrige] dddd [kl.] LT", sameElse:"L"}, relativeTime:{future:"om %s", past:"%s siden", s:"noen sekunder", ss:"%d sekunder", m:"ett minutt", mm:"%d minutter", h:"en time", hh:"%d timer", d:"en dag", dd:"%d dager", M:"en m\u00e5ned", MM:"%d m\u00e5neder", 
  y:"ett \u00e5r", yy:"%d \u00e5r"}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  var symbolMap$d = {1:"\u0967", 2:"\u0968", 3:"\u0969", 4:"\u096a", 5:"\u096b", 6:"\u096c", 7:"\u096d", 8:"\u096e", 9:"\u096f", 0:"\u0966"}, numberMap$c = {"\u0967":"1", "\u0968":"2", "\u0969":"3", "\u096a":"4", "\u096b":"5", "\u096c":"6", "\u096d":"7", "\u096e":"8", "\u096f":"9", "\u0966":"0"};
  hooks.defineLocale("ne", {months:"\u091c\u0928\u0935\u0930\u0940_\u092b\u0947\u092c\u094d\u0930\u0941\u0935\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u093f\u0932_\u092e\u0908_\u091c\u0941\u0928_\u091c\u0941\u0932\u093e\u0908_\u0905\u0917\u0937\u094d\u091f_\u0938\u0947\u092a\u094d\u091f\u0947\u092e\u094d\u092c\u0930_\u0905\u0915\u094d\u091f\u094b\u092c\u0930_\u0928\u094b\u092d\u0947\u092e\u094d\u092c\u0930_\u0921\u093f\u0938\u0947\u092e\u094d\u092c\u0930".split("_"), monthsShort:"\u091c\u0928._\u092b\u0947\u092c\u094d\u0930\u0941._\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u093f._\u092e\u0908_\u091c\u0941\u0928_\u091c\u0941\u0932\u093e\u0908._\u0905\u0917._\u0938\u0947\u092a\u094d\u091f._\u0905\u0915\u094d\u091f\u094b._\u0928\u094b\u092d\u0947._\u0921\u093f\u0938\u0947.".split("_"), 
  monthsParseExact:true, weekdays:"\u0906\u0907\u0924\u092c\u093e\u0930_\u0938\u094b\u092e\u092c\u093e\u0930_\u092e\u0919\u094d\u0917\u0932\u092c\u093e\u0930_\u092c\u0941\u0927\u092c\u093e\u0930_\u092c\u093f\u0939\u093f\u092c\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u092c\u093e\u0930_\u0936\u0928\u093f\u092c\u093e\u0930".split("_"), weekdaysShort:"\u0906\u0907\u0924._\u0938\u094b\u092e._\u092e\u0919\u094d\u0917\u0932._\u092c\u0941\u0927._\u092c\u093f\u0939\u093f._\u0936\u0941\u0915\u094d\u0930._\u0936\u0928\u093f.".split("_"), 
  weekdaysMin:"\u0906._\u0938\u094b._\u092e\u0902._\u092c\u0941._\u092c\u093f._\u0936\u0941._\u0936.".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"A\u0915\u094b h:mm \u092c\u091c\u0947", LTS:"A\u0915\u094b h:mm:ss \u092c\u091c\u0947", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY, A\u0915\u094b h:mm \u092c\u091c\u0947", LLLL:"dddd, D MMMM YYYY, A\u0915\u094b h:mm \u092c\u091c\u0947"}, preparse:function(string) {
    return string.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g, function(match) {
      return numberMap$c[match];
    });
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$d[match];
    });
  }, meridiemParse:/\u0930\u093e\u0924\u093f|\u092c\u093f\u0939\u093e\u0928|\u0926\u093f\u0909\u0901\u0938\u094b|\u0938\u093e\u0901\u091d/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0930\u093e\u0924\u093f") {
      return hour < 4 ? hour : hour + 12;
    } else {
      if (meridiem === "\u092c\u093f\u0939\u093e\u0928") {
        return hour;
      } else {
        if (meridiem === "\u0926\u093f\u0909\u0901\u0938\u094b") {
          return hour >= 10 ? hour : hour + 12;
        } else {
          if (meridiem === "\u0938\u093e\u0901\u091d") {
            return hour + 12;
          }
        }
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 3) {
      return "\u0930\u093e\u0924\u093f";
    } else {
      if (hour < 12) {
        return "\u092c\u093f\u0939\u093e\u0928";
      } else {
        if (hour < 16) {
          return "\u0926\u093f\u0909\u0901\u0938\u094b";
        } else {
          if (hour < 20) {
            return "\u0938\u093e\u0901\u091d";
          } else {
            return "\u0930\u093e\u0924\u093f";
          }
        }
      }
    }
  }, calendar:{sameDay:"[\u0906\u091c] LT", nextDay:"[\u092d\u094b\u0932\u093f] LT", nextWeek:"[\u0906\u0909\u0901\u0926\u094b] dddd[,] LT", lastDay:"[\u0939\u093f\u091c\u094b] LT", lastWeek:"[\u0917\u090f\u0915\u094b] dddd[,] LT", sameElse:"L"}, relativeTime:{future:"%s\u092e\u093e", past:"%s \u0905\u0917\u093e\u0921\u093f", s:"\u0915\u0947\u0939\u0940 \u0915\u094d\u0937\u0923", ss:"%d \u0938\u0947\u0915\u0947\u0923\u094d\u0921", m:"\u090f\u0915 \u092e\u093f\u0928\u0947\u091f", mm:"%d \u092e\u093f\u0928\u0947\u091f", 
  h:"\u090f\u0915 \u0918\u0923\u094d\u091f\u093e", hh:"%d \u0918\u0923\u094d\u091f\u093e", d:"\u090f\u0915 \u0926\u093f\u0928", dd:"%d \u0926\u093f\u0928", M:"\u090f\u0915 \u092e\u0939\u093f\u0928\u093e", MM:"%d \u092e\u0939\u093f\u0928\u093e", y:"\u090f\u0915 \u092c\u0930\u094d\u0937", yy:"%d \u092c\u0930\u094d\u0937"}, week:{dow:0, doy:6}});
  var monthsShortWithDots$1 = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), monthsShortWithoutDots$1 = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
  var monthsParse$4 = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
  var monthsRegex$5 = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
  hooks.defineLocale("nl-be", {months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort:function(m, format) {
    if (!m) {
      return monthsShortWithDots$1;
    } else {
      if (/-MMM-/.test(format)) {
        return monthsShortWithoutDots$1[m.month()];
      } else {
        return monthsShortWithDots$1[m.month()];
      }
    }
  }, monthsRegex:monthsRegex$5, monthsShortRegex:monthsRegex$5, monthsStrictRegex:/^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i, monthsShortStrictRegex:/^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i, monthsParse:monthsParse$4, longMonthsParse:monthsParse$4, shortMonthsParse:monthsParse$4, weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"), 
  weekdaysMin:"zo_ma_di_wo_do_vr_za".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[vandaag om] LT", nextDay:"[morgen om] LT", nextWeek:"dddd [om] LT", lastDay:"[gisteren om] LT", lastWeek:"[afgelopen] dddd [om] LT", sameElse:"L"}, relativeTime:{future:"over %s", past:"%s geleden", s:"een paar seconden", ss:"%d seconden", m:"\u00e9\u00e9n minuut", mm:"%d minuten", 
  h:"\u00e9\u00e9n uur", hh:"%d uur", d:"\u00e9\u00e9n dag", dd:"%d dagen", M:"\u00e9\u00e9n maand", MM:"%d maanden", y:"\u00e9\u00e9n jaar", yy:"%d jaar"}, dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/, ordinal:function(number) {
    return number + (number === 1 || number === 8 || number >= 20 ? "ste" : "de");
  }, week:{dow:1, doy:4}});
  var monthsShortWithDots$2 = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), monthsShortWithoutDots$2 = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
  var monthsParse$5 = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
  var monthsRegex$6 = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
  hooks.defineLocale("nl", {months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort:function(m, format) {
    if (!m) {
      return monthsShortWithDots$2;
    } else {
      if (/-MMM-/.test(format)) {
        return monthsShortWithoutDots$2[m.month()];
      } else {
        return monthsShortWithDots$2[m.month()];
      }
    }
  }, monthsRegex:monthsRegex$6, monthsShortRegex:monthsRegex$6, monthsStrictRegex:/^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i, monthsShortStrictRegex:/^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i, monthsParse:monthsParse$5, longMonthsParse:monthsParse$5, shortMonthsParse:monthsParse$5, weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"), 
  weekdaysMin:"zo_ma_di_wo_do_vr_za".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD-MM-YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[vandaag om] LT", nextDay:"[morgen om] LT", nextWeek:"dddd [om] LT", lastDay:"[gisteren om] LT", lastWeek:"[afgelopen] dddd [om] LT", sameElse:"L"}, relativeTime:{future:"over %s", past:"%s geleden", s:"een paar seconden", ss:"%d seconden", m:"\u00e9\u00e9n minuut", mm:"%d minuten", 
  h:"\u00e9\u00e9n uur", hh:"%d uur", d:"\u00e9\u00e9n dag", dd:"%d dagen", M:"\u00e9\u00e9n maand", MM:"%d maanden", y:"\u00e9\u00e9n jaar", yy:"%d jaar"}, dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/, ordinal:function(number) {
    return number + (number === 1 || number === 8 || number >= 20 ? "ste" : "de");
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("nn", {months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), weekdays:"sundag_m\u00e5ndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"), weekdaysShort:"sun_m\u00e5n_tys_ons_tor_fre_lau".split("_"), weekdaysMin:"su_m\u00e5_ty_on_to_fr_l\u00f8".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY [kl.] H:mm", 
  LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"}, calendar:{sameDay:"[I dag klokka] LT", nextDay:"[I morgon klokka] LT", nextWeek:"dddd [klokka] LT", lastDay:"[I g\u00e5r klokka] LT", lastWeek:"[F\u00f8reg\u00e5ande] dddd [klokka] LT", sameElse:"L"}, relativeTime:{future:"om %s", past:"%s sidan", s:"nokre sekund", ss:"%d sekund", m:"eit minutt", mm:"%d minutt", h:"ein time", hh:"%d timar", d:"ein dag", dd:"%d dagar", M:"ein m\u00e5nad", MM:"%d m\u00e5nader", y:"eit \u00e5r", yy:"%d \u00e5r"}, dayOfMonthOrdinalParse:/\d{1,2}\./, 
  ordinal:"%d.", week:{dow:1, doy:4}});
  var symbolMap$e = {1:"\u0a67", 2:"\u0a68", 3:"\u0a69", 4:"\u0a6a", 5:"\u0a6b", 6:"\u0a6c", 7:"\u0a6d", 8:"\u0a6e", 9:"\u0a6f", 0:"\u0a66"}, numberMap$d = {"\u0a67":"1", "\u0a68":"2", "\u0a69":"3", "\u0a6a":"4", "\u0a6b":"5", "\u0a6c":"6", "\u0a6d":"7", "\u0a6e":"8", "\u0a6f":"9", "\u0a66":"0"};
  hooks.defineLocale("pa-in", {months:"\u0a1c\u0a28\u0a35\u0a30\u0a40_\u0a2b\u0a3c\u0a30\u0a35\u0a30\u0a40_\u0a2e\u0a3e\u0a30\u0a1a_\u0a05\u0a2a\u0a4d\u0a30\u0a48\u0a32_\u0a2e\u0a08_\u0a1c\u0a42\u0a28_\u0a1c\u0a41\u0a32\u0a3e\u0a08_\u0a05\u0a17\u0a38\u0a24_\u0a38\u0a24\u0a70\u0a2c\u0a30_\u0a05\u0a15\u0a24\u0a42\u0a2c\u0a30_\u0a28\u0a35\u0a70\u0a2c\u0a30_\u0a26\u0a38\u0a70\u0a2c\u0a30".split("_"), monthsShort:"\u0a1c\u0a28\u0a35\u0a30\u0a40_\u0a2b\u0a3c\u0a30\u0a35\u0a30\u0a40_\u0a2e\u0a3e\u0a30\u0a1a_\u0a05\u0a2a\u0a4d\u0a30\u0a48\u0a32_\u0a2e\u0a08_\u0a1c\u0a42\u0a28_\u0a1c\u0a41\u0a32\u0a3e\u0a08_\u0a05\u0a17\u0a38\u0a24_\u0a38\u0a24\u0a70\u0a2c\u0a30_\u0a05\u0a15\u0a24\u0a42\u0a2c\u0a30_\u0a28\u0a35\u0a70\u0a2c\u0a30_\u0a26\u0a38\u0a70\u0a2c\u0a30".split("_"), 
  weekdays:"\u0a10\u0a24\u0a35\u0a3e\u0a30_\u0a38\u0a4b\u0a2e\u0a35\u0a3e\u0a30_\u0a2e\u0a70\u0a17\u0a32\u0a35\u0a3e\u0a30_\u0a2c\u0a41\u0a27\u0a35\u0a3e\u0a30_\u0a35\u0a40\u0a30\u0a35\u0a3e\u0a30_\u0a38\u0a3c\u0a41\u0a71\u0a15\u0a30\u0a35\u0a3e\u0a30_\u0a38\u0a3c\u0a28\u0a40\u0a1a\u0a30\u0a35\u0a3e\u0a30".split("_"), weekdaysShort:"\u0a10\u0a24_\u0a38\u0a4b\u0a2e_\u0a2e\u0a70\u0a17\u0a32_\u0a2c\u0a41\u0a27_\u0a35\u0a40\u0a30_\u0a38\u0a3c\u0a41\u0a15\u0a30_\u0a38\u0a3c\u0a28\u0a40".split("_"), weekdaysMin:"\u0a10\u0a24_\u0a38\u0a4b\u0a2e_\u0a2e\u0a70\u0a17\u0a32_\u0a2c\u0a41\u0a27_\u0a35\u0a40\u0a30_\u0a38\u0a3c\u0a41\u0a15\u0a30_\u0a38\u0a3c\u0a28\u0a40".split("_"), 
  longDateFormat:{LT:"A h:mm \u0a35\u0a1c\u0a47", LTS:"A h:mm:ss \u0a35\u0a1c\u0a47", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY, A h:mm \u0a35\u0a1c\u0a47", LLLL:"dddd, D MMMM YYYY, A h:mm \u0a35\u0a1c\u0a47"}, calendar:{sameDay:"[\u0a05\u0a1c] LT", nextDay:"[\u0a15\u0a32] LT", nextWeek:"[\u0a05\u0a17\u0a32\u0a3e] dddd, LT", lastDay:"[\u0a15\u0a32] LT", lastWeek:"[\u0a2a\u0a3f\u0a1b\u0a32\u0a47] dddd, LT", sameElse:"L"}, relativeTime:{future:"%s \u0a35\u0a3f\u0a71\u0a1a", past:"%s \u0a2a\u0a3f\u0a1b\u0a32\u0a47", 
  s:"\u0a15\u0a41\u0a1d \u0a38\u0a15\u0a3f\u0a70\u0a1f", ss:"%d \u0a38\u0a15\u0a3f\u0a70\u0a1f", m:"\u0a07\u0a15 \u0a2e\u0a3f\u0a70\u0a1f", mm:"%d \u0a2e\u0a3f\u0a70\u0a1f", h:"\u0a07\u0a71\u0a15 \u0a18\u0a70\u0a1f\u0a3e", hh:"%d \u0a18\u0a70\u0a1f\u0a47", d:"\u0a07\u0a71\u0a15 \u0a26\u0a3f\u0a28", dd:"%d \u0a26\u0a3f\u0a28", M:"\u0a07\u0a71\u0a15 \u0a2e\u0a39\u0a40\u0a28\u0a3e", MM:"%d \u0a2e\u0a39\u0a40\u0a28\u0a47", y:"\u0a07\u0a71\u0a15 \u0a38\u0a3e\u0a32", yy:"%d \u0a38\u0a3e\u0a32"}, preparse:function(string) {
    return string.replace(/[\u0a67\u0a68\u0a69\u0a6a\u0a6b\u0a6c\u0a6d\u0a6e\u0a6f\u0a66]/g, function(match) {
      return numberMap$d[match];
    });
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$e[match];
    });
  }, meridiemParse:/\u0a30\u0a3e\u0a24|\u0a38\u0a35\u0a47\u0a30|\u0a26\u0a41\u0a2a\u0a39\u0a3f\u0a30|\u0a38\u0a3c\u0a3e\u0a2e/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0a30\u0a3e\u0a24") {
      return hour < 4 ? hour : hour + 12;
    } else {
      if (meridiem === "\u0a38\u0a35\u0a47\u0a30") {
        return hour;
      } else {
        if (meridiem === "\u0a26\u0a41\u0a2a\u0a39\u0a3f\u0a30") {
          return hour >= 10 ? hour : hour + 12;
        } else {
          if (meridiem === "\u0a38\u0a3c\u0a3e\u0a2e") {
            return hour + 12;
          }
        }
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u0a30\u0a3e\u0a24";
    } else {
      if (hour < 10) {
        return "\u0a38\u0a35\u0a47\u0a30";
      } else {
        if (hour < 17) {
          return "\u0a26\u0a41\u0a2a\u0a39\u0a3f\u0a30";
        } else {
          if (hour < 20) {
            return "\u0a38\u0a3c\u0a3e\u0a2e";
          } else {
            return "\u0a30\u0a3e\u0a24";
          }
        }
      }
    }
  }, week:{dow:0, doy:6}});
  var monthsNominative = "stycze\u0144_luty_marzec_kwiecie\u0144_maj_czerwiec_lipiec_sierpie\u0144_wrzesie\u0144_pa\u017adziernik_listopad_grudzie\u0144".split("_"), monthsSubjective = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze\u015bnia_pa\u017adziernika_listopada_grudnia".split("_");
  function plural$3(n) {
    return n % 10 < 5 && n % 10 > 1 && ~~(n / 10) % 10 !== 1;
  }
  function translate$8(number, withoutSuffix, key) {
    var result = number + " ";
    switch(key) {
      case "ss":
        return result + (plural$3(number) ? "sekundy" : "sekund");
      case "m":
        return withoutSuffix ? "minuta" : "minut\u0119";
      case "mm":
        return result + (plural$3(number) ? "minuty" : "minut");
      case "h":
        return withoutSuffix ? "godzina" : "godzin\u0119";
      case "hh":
        return result + (plural$3(number) ? "godziny" : "godzin");
      case "MM":
        return result + (plural$3(number) ? "miesi\u0105ce" : "miesi\u0119cy");
      case "yy":
        return result + (plural$3(number) ? "lata" : "lat");
    }
  }
  hooks.defineLocale("pl", {months:function(momentToFormat, format) {
    if (!momentToFormat) {
      return monthsNominative;
    } else {
      if (format === "") {
        return "(" + monthsSubjective[momentToFormat.month()] + "|" + monthsNominative[momentToFormat.month()] + ")";
      } else {
        if (/D MMMM/.test(format)) {
          return monthsSubjective[momentToFormat.month()];
        } else {
          return monthsNominative[momentToFormat.month()];
        }
      }
    }
  }, monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa\u017a_lis_gru".split("_"), weekdays:"niedziela_poniedzia\u0142ek_wtorek_\u015broda_czwartek_pi\u0105tek_sobota".split("_"), weekdaysShort:"ndz_pon_wt_\u015br_czw_pt_sob".split("_"), weekdaysMin:"Nd_Pn_Wt_\u015ar_Cz_Pt_So".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[Dzi\u015b o] LT", nextDay:"[Jutro o] LT", nextWeek:function() {
    switch(this.day()) {
      case 0:
        return "[W niedziel\u0119 o] LT";
      case 2:
        return "[We wtorek o] LT";
      case 3:
        return "[W \u015brod\u0119 o] LT";
      case 6:
        return "[W sobot\u0119 o] LT";
      default:
        return "[W] dddd [o] LT";
    }
  }, lastDay:"[Wczoraj o] LT", lastWeek:function() {
    switch(this.day()) {
      case 0:
        return "[W zesz\u0142\u0105 niedziel\u0119 o] LT";
      case 3:
        return "[W zesz\u0142\u0105 \u015brod\u0119 o] LT";
      case 6:
        return "[W zesz\u0142\u0105 sobot\u0119 o] LT";
      default:
        return "[W zesz\u0142y] dddd [o] LT";
    }
  }, sameElse:"L"}, relativeTime:{future:"za %s", past:"%s temu", s:"kilka sekund", ss:translate$8, m:translate$8, mm:translate$8, h:translate$8, hh:translate$8, d:"1 dzie\u0144", dd:"%d dni", M:"miesi\u0105c", MM:translate$8, y:"rok", yy:translate$8}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  hooks.defineLocale("pt-br", {months:"Janeiro_Fevereiro_Mar\u00e7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"), monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"), weekdays:"Domingo_Segunda-feira_Ter\u00e7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\u00e1bado".split("_"), weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_S\u00e1b".split("_"), weekdaysMin:"Do_2\u00aa_3\u00aa_4\u00aa_5\u00aa_6\u00aa_S\u00e1".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", 
  LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D [de] MMMM [de] YYYY", LLL:"D [de] MMMM [de] YYYY [\u00e0s] HH:mm", LLLL:"dddd, D [de] MMMM [de] YYYY [\u00e0s] HH:mm"}, calendar:{sameDay:"[Hoje \u00e0s] LT", nextDay:"[Amanh\u00e3 \u00e0s] LT", nextWeek:"dddd [\u00e0s] LT", lastDay:"[Ontem \u00e0s] LT", lastWeek:function() {
    return this.day() === 0 || this.day() === 6 ? "[\u00daltimo] dddd [\u00e0s] LT" : "[\u00daltima] dddd [\u00e0s] LT";
  }, sameElse:"L"}, relativeTime:{future:"em %s", past:"h\u00e1 %s", s:"poucos segundos", ss:"%d segundos", m:"um minuto", mm:"%d minutos", h:"uma hora", hh:"%d horas", d:"um dia", dd:"%d dias", M:"um m\u00eas", MM:"%d meses", y:"um ano", yy:"%d anos"}, dayOfMonthOrdinalParse:/\d{1,2}\u00ba/, ordinal:"%d\u00ba"});
  hooks.defineLocale("pt", {months:"Janeiro_Fevereiro_Mar\u00e7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"), monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"), weekdays:"Domingo_Segunda-feira_Ter\u00e7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\u00e1bado".split("_"), weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_S\u00e1b".split("_"), weekdaysMin:"Do_2\u00aa_3\u00aa_4\u00aa_5\u00aa_6\u00aa_S\u00e1".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", 
  LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D [de] MMMM [de] YYYY", LLL:"D [de] MMMM [de] YYYY HH:mm", LLLL:"dddd, D [de] MMMM [de] YYYY HH:mm"}, calendar:{sameDay:"[Hoje \u00e0s] LT", nextDay:"[Amanh\u00e3 \u00e0s] LT", nextWeek:"dddd [\u00e0s] LT", lastDay:"[Ontem \u00e0s] LT", lastWeek:function() {
    return this.day() === 0 || this.day() === 6 ? "[\u00daltimo] dddd [\u00e0s] LT" : "[\u00daltima] dddd [\u00e0s] LT";
  }, sameElse:"L"}, relativeTime:{future:"em %s", past:"h\u00e1 %s", s:"segundos", ss:"%d segundos", m:"um minuto", mm:"%d minutos", h:"uma hora", hh:"%d horas", d:"um dia", dd:"%d dias", M:"um m\u00eas", MM:"%d meses", y:"um ano", yy:"%d anos"}, dayOfMonthOrdinalParse:/\d{1,2}\u00ba/, ordinal:"%d\u00ba", week:{dow:1, doy:4}});
  function relativeTimeWithPlural$2(number, withoutSuffix, key) {
    var format = {"ss":"secunde", "mm":"minute", "hh":"ore", "dd":"zile", "MM":"luni", "yy":"ani"}, separator = " ";
    if (number % 100 >= 20 || number >= 100 && number % 100 === 0) {
      separator = " de ";
    }
    return number + separator + format[key];
  }
  hooks.defineLocale("ro", {months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"), monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"), monthsParseExact:true, weekdays:"duminic\u0103_luni_mar\u021bi_miercuri_joi_vineri_s\u00e2mb\u0103t\u0103".split("_"), weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_S\u00e2m".split("_"), weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_S\u00e2".split("_"), longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", 
  L:"DD.MM.YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY H:mm", LLLL:"dddd, D MMMM YYYY H:mm"}, calendar:{sameDay:"[azi la] LT", nextDay:"[m\u00e2ine la] LT", nextWeek:"dddd [la] LT", lastDay:"[ieri la] LT", lastWeek:"[fosta] dddd [la] LT", sameElse:"L"}, relativeTime:{future:"peste %s", past:"%s \u00een urm\u0103", s:"c\u00e2teva secunde", ss:relativeTimeWithPlural$2, m:"un minut", mm:relativeTimeWithPlural$2, h:"o or\u0103", hh:relativeTimeWithPlural$2, d:"o zi", dd:relativeTimeWithPlural$2, M:"o lun\u0103", 
  MM:relativeTimeWithPlural$2, y:"un an", yy:relativeTimeWithPlural$2}, week:{dow:1, doy:7}});
  function plural$4(word, num) {
    var forms = word.split("_");
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
  }
  function relativeTimeWithPlural$3(number, withoutSuffix, key) {
    var format = {"ss":withoutSuffix ? "\u0441\u0435\u043a\u0443\u043d\u0434\u0430_\u0441\u0435\u043a\u0443\u043d\u0434\u044b_\u0441\u0435\u043a\u0443\u043d\u0434" : "\u0441\u0435\u043a\u0443\u043d\u0434\u0443_\u0441\u0435\u043a\u0443\u043d\u0434\u044b_\u0441\u0435\u043a\u0443\u043d\u0434", "mm":withoutSuffix ? "\u043c\u0438\u043d\u0443\u0442\u0430_\u043c\u0438\u043d\u0443\u0442\u044b_\u043c\u0438\u043d\u0443\u0442" : "\u043c\u0438\u043d\u0443\u0442\u0443_\u043c\u0438\u043d\u0443\u0442\u044b_\u043c\u0438\u043d\u0443\u0442", 
    "hh":"\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043e\u0432", "dd":"\u0434\u0435\u043d\u044c_\u0434\u043d\u044f_\u0434\u043d\u0435\u0439", "MM":"\u043c\u0435\u0441\u044f\u0446_\u043c\u0435\u0441\u044f\u0446\u0430_\u043c\u0435\u0441\u044f\u0446\u0435\u0432", "yy":"\u0433\u043e\u0434_\u0433\u043e\u0434\u0430_\u043b\u0435\u0442"};
    if (key === "m") {
      return withoutSuffix ? "\u043c\u0438\u043d\u0443\u0442\u0430" : "\u043c\u0438\u043d\u0443\u0442\u0443";
    } else {
      return number + " " + plural$4(format[key], +number);
    }
  }
  var monthsParse$6 = [/^\u044f\u043d\u0432/i, /^\u0444\u0435\u0432/i, /^\u043c\u0430\u0440/i, /^\u0430\u043f\u0440/i, /^\u043c\u0430[\u0439\u044f]/i, /^\u0438\u044e\u043d/i, /^\u0438\u044e\u043b/i, /^\u0430\u0432\u0433/i, /^\u0441\u0435\u043d/i, /^\u043e\u043a\u0442/i, /^\u043d\u043e\u044f/i, /^\u0434\u0435\u043a/i];
  hooks.defineLocale("ru", {months:{format:"\u044f\u043d\u0432\u0430\u0440\u044f_\u0444\u0435\u0432\u0440\u0430\u043b\u044f_\u043c\u0430\u0440\u0442\u0430_\u0430\u043f\u0440\u0435\u043b\u044f_\u043c\u0430\u044f_\u0438\u044e\u043d\u044f_\u0438\u044e\u043b\u044f_\u0430\u0432\u0433\u0443\u0441\u0442\u0430_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f_\u043e\u043a\u0442\u044f\u0431\u0440\u044f_\u043d\u043e\u044f\u0431\u0440\u044f_\u0434\u0435\u043a\u0430\u0431\u0440\u044f".split("_"), standalone:"\u044f\u043d\u0432\u0430\u0440\u044c_\u0444\u0435\u0432\u0440\u0430\u043b\u044c_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b\u044c_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c_\u043e\u043a\u0442\u044f\u0431\u0440\u044c_\u043d\u043e\u044f\u0431\u0440\u044c_\u0434\u0435\u043a\u0430\u0431\u0440\u044c".split("_")}, 
  monthsShort:{format:"\u044f\u043d\u0432._\u0444\u0435\u0432\u0440._\u043c\u0430\u0440._\u0430\u043f\u0440._\u043c\u0430\u044f_\u0438\u044e\u043d\u044f_\u0438\u044e\u043b\u044f_\u0430\u0432\u0433._\u0441\u0435\u043d\u0442._\u043e\u043a\u0442._\u043d\u043e\u044f\u0431._\u0434\u0435\u043a.".split("_"), standalone:"\u044f\u043d\u0432._\u0444\u0435\u0432\u0440._\u043c\u0430\u0440\u0442_\u0430\u043f\u0440._\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433._\u0441\u0435\u043d\u0442._\u043e\u043a\u0442._\u043d\u043e\u044f\u0431._\u0434\u0435\u043a.".split("_")}, 
  weekdays:{standalone:"\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043f\u044f\u0442\u043d\u0438\u0446\u0430_\u0441\u0443\u0431\u0431\u043e\u0442\u0430".split("_"), format:"\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043f\u044f\u0442\u043d\u0438\u0446\u0443_\u0441\u0443\u0431\u0431\u043e\u0442\u0443".split("_"), 
  isFormat:/\[ ?[\u0412\u0432] ?(?:\u043f\u0440\u043e\u0448\u043b\u0443\u044e|\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e|\u044d\u0442\u0443)? ?\] ?dddd/}, weekdaysShort:"\u0432\u0441_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"), weekdaysMin:"\u0432\u0441_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"), monthsParse:monthsParse$6, longMonthsParse:monthsParse$6, shortMonthsParse:monthsParse$6, monthsRegex:/^(\u044f\u043d\u0432\u0430\u0440[\u044c\u044f]|\u044f\u043d\u0432\.?|\u0444\u0435\u0432\u0440\u0430\u043b[\u044c\u044f]|\u0444\u0435\u0432\u0440?\.?|\u043c\u0430\u0440\u0442\u0430?|\u043c\u0430\u0440\.?|\u0430\u043f\u0440\u0435\u043b[\u044c\u044f]|\u0430\u043f\u0440\.?|\u043c\u0430[\u0439\u044f]|\u0438\u044e\u043d[\u044c\u044f]|\u0438\u044e\u043d\.?|\u0438\u044e\u043b[\u044c\u044f]|\u0438\u044e\u043b\.?|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0430\u0432\u0433\.?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044c\u044f]|\u0441\u0435\u043d\u0442?\.?|\u043e\u043a\u0442\u044f\u0431\u0440[\u044c\u044f]|\u043e\u043a\u0442\.?|\u043d\u043e\u044f\u0431\u0440[\u044c\u044f]|\u043d\u043e\u044f\u0431?\.?|\u0434\u0435\u043a\u0430\u0431\u0440[\u044c\u044f]|\u0434\u0435\u043a\.?)/i, 
  monthsShortRegex:/^(\u044f\u043d\u0432\u0430\u0440[\u044c\u044f]|\u044f\u043d\u0432\.?|\u0444\u0435\u0432\u0440\u0430\u043b[\u044c\u044f]|\u0444\u0435\u0432\u0440?\.?|\u043c\u0430\u0440\u0442\u0430?|\u043c\u0430\u0440\.?|\u0430\u043f\u0440\u0435\u043b[\u044c\u044f]|\u0430\u043f\u0440\.?|\u043c\u0430[\u0439\u044f]|\u0438\u044e\u043d[\u044c\u044f]|\u0438\u044e\u043d\.?|\u0438\u044e\u043b[\u044c\u044f]|\u0438\u044e\u043b\.?|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0430\u0432\u0433\.?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044c\u044f]|\u0441\u0435\u043d\u0442?\.?|\u043e\u043a\u0442\u044f\u0431\u0440[\u044c\u044f]|\u043e\u043a\u0442\.?|\u043d\u043e\u044f\u0431\u0440[\u044c\u044f]|\u043d\u043e\u044f\u0431?\.?|\u0434\u0435\u043a\u0430\u0431\u0440[\u044c\u044f]|\u0434\u0435\u043a\.?)/i, 
  monthsStrictRegex:/^(\u044f\u043d\u0432\u0430\u0440[\u044f\u044c]|\u0444\u0435\u0432\u0440\u0430\u043b[\u044f\u044c]|\u043c\u0430\u0440\u0442\u0430?|\u0430\u043f\u0440\u0435\u043b[\u044f\u044c]|\u043c\u0430[\u044f\u0439]|\u0438\u044e\u043d[\u044f\u044c]|\u0438\u044e\u043b[\u044f\u044c]|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044f\u044c]|\u043e\u043a\u0442\u044f\u0431\u0440[\u044f\u044c]|\u043d\u043e\u044f\u0431\u0440[\u044f\u044c]|\u0434\u0435\u043a\u0430\u0431\u0440[\u044f\u044c])/i, 
  monthsShortStrictRegex:/^(\u044f\u043d\u0432\.|\u0444\u0435\u0432\u0440?\.|\u043c\u0430\u0440[\u0442.]|\u0430\u043f\u0440\.|\u043c\u0430[\u044f\u0439]|\u0438\u044e\u043d[\u044c\u044f.]|\u0438\u044e\u043b[\u044c\u044f.]|\u0430\u0432\u0433\.|\u0441\u0435\u043d\u0442?\.|\u043e\u043a\u0442\.|\u043d\u043e\u044f\u0431?\.|\u0434\u0435\u043a\.)/i, longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY \u0433.", LLL:"D MMMM YYYY \u0433., H:mm", LLLL:"dddd, D MMMM YYYY \u0433., H:mm"}, 
  calendar:{sameDay:"[\u0421\u0435\u0433\u043e\u0434\u043d\u044f, \u0432] LT", nextDay:"[\u0417\u0430\u0432\u0442\u0440\u0430, \u0432] LT", lastDay:"[\u0412\u0447\u0435\u0440\u0430, \u0432] LT", nextWeek:function(now) {
    if (now.week() !== this.week()) {
      switch(this.day()) {
        case 0:
          return "[\u0412 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u0435] dddd, [\u0432] LT";
        case 1:
        case 2:
        case 4:
          return "[\u0412 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439] dddd, [\u0432] LT";
        case 3:
        case 5:
        case 6:
          return "[\u0412 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e] dddd, [\u0432] LT";
      }
    } else {
      if (this.day() === 2) {
        return "[\u0412\u043e] dddd, [\u0432] LT";
      } else {
        return "[\u0412] dddd, [\u0432] LT";
      }
    }
  }, lastWeek:function(now) {
    if (now.week() !== this.week()) {
      switch(this.day()) {
        case 0:
          return "[\u0412 \u043f\u0440\u043e\u0448\u043b\u043e\u0435] dddd, [\u0432] LT";
        case 1:
        case 2:
        case 4:
          return "[\u0412 \u043f\u0440\u043e\u0448\u043b\u044b\u0439] dddd, [\u0432] LT";
        case 3:
        case 5:
        case 6:
          return "[\u0412 \u043f\u0440\u043e\u0448\u043b\u0443\u044e] dddd, [\u0432] LT";
      }
    } else {
      if (this.day() === 2) {
        return "[\u0412\u043e] dddd, [\u0432] LT";
      } else {
        return "[\u0412] dddd, [\u0432] LT";
      }
    }
  }, sameElse:"L"}, relativeTime:{future:"\u0447\u0435\u0440\u0435\u0437 %s", past:"%s \u043d\u0430\u0437\u0430\u0434", s:"\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434", ss:relativeTimeWithPlural$3, m:relativeTimeWithPlural$3, mm:relativeTimeWithPlural$3, h:"\u0447\u0430\u0441", hh:relativeTimeWithPlural$3, d:"\u0434\u0435\u043d\u044c", dd:relativeTimeWithPlural$3, M:"\u043c\u0435\u0441\u044f\u0446", MM:relativeTimeWithPlural$3, y:"\u0433\u043e\u0434", 
  yy:relativeTimeWithPlural$3}, meridiemParse:/\u043d\u043e\u0447\u0438|\u0443\u0442\u0440\u0430|\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430/i, isPM:function(input) {
    return /^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430)$/.test(input);
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u043d\u043e\u0447\u0438";
    } else {
      if (hour < 12) {
        return "\u0443\u0442\u0440\u0430";
      } else {
        if (hour < 17) {
          return "\u0434\u043d\u044f";
        } else {
          return "\u0432\u0435\u0447\u0435\u0440\u0430";
        }
      }
    }
  }, dayOfMonthOrdinalParse:/\d{1,2}-(\u0439|\u0433\u043e|\u044f)/, ordinal:function(number, period) {
    switch(period) {
      case "M":
      case "d":
      case "DDD":
        return number + "-\u0439";
      case "D":
        return number + "-\u0433\u043e";
      case "w":
      case "W":
        return number + "-\u044f";
      default:
        return number;
    }
  }, week:{dow:1, doy:4}});
  var months$8 = ["\u062c\u0646\u0648\u0631\u064a", "\u0641\u064a\u0628\u0631\u0648\u0631\u064a", "\u0645\u0627\u0631\u0686", "\u0627\u067e\u0631\u064a\u0644", "\u0645\u0626\u064a", "\u062c\u0648\u0646", "\u062c\u0648\u0644\u0627\u0621\u0650", "\u0622\u06af\u0633\u067d", "\u0633\u064a\u067e\u067d\u0645\u0628\u0631", "\u0622\u06aa\u067d\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u068a\u0633\u0645\u0628\u0631"];
  var days$1 = ["\u0622\u0686\u0631", "\u0633\u0648\u0645\u0631", "\u0627\u06b1\u0627\u0631\u0648", "\u0627\u0631\u0628\u0639", "\u062e\u0645\u064a\u0633", "\u062c\u0645\u0639", "\u0687\u0646\u0687\u0631"];
  hooks.defineLocale("sd", {months:months$8, monthsShort:months$8, weekdays:days$1, weekdaysShort:days$1, weekdaysMin:days$1, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd\u060c D MMMM YYYY HH:mm"}, meridiemParse:/\u0635\u0628\u062d|\u0634\u0627\u0645/, isPM:function(input) {
    return "\u0634\u0627\u0645" === input;
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u0635\u0628\u062d";
    }
    return "\u0634\u0627\u0645";
  }, calendar:{sameDay:"[\u0627\u0684] LT", nextDay:"[\u0633\u0680\u0627\u06bb\u064a] LT", nextWeek:"dddd [\u0627\u06b3\u064a\u0646 \u0647\u0641\u062a\u064a \u062a\u064a] LT", lastDay:"[\u06aa\u0627\u0644\u0647\u0647] LT", lastWeek:"[\u06af\u0632\u0631\u064a\u0644 \u0647\u0641\u062a\u064a] dddd [\u062a\u064a] LT", sameElse:"L"}, relativeTime:{future:"%s \u067e\u0648\u0621", past:"%s \u0627\u06b3", s:"\u0686\u0646\u062f \u0633\u064a\u06aa\u0646\u068a", ss:"%d \u0633\u064a\u06aa\u0646\u068a", m:"\u0647\u06aa \u0645\u0646\u067d", 
  mm:"%d \u0645\u0646\u067d", h:"\u0647\u06aa \u06aa\u0644\u0627\u06aa", hh:"%d \u06aa\u0644\u0627\u06aa", d:"\u0647\u06aa \u068f\u064a\u0646\u0647\u0646", dd:"%d \u068f\u064a\u0646\u0647\u0646", M:"\u0647\u06aa \u0645\u0647\u064a\u0646\u0648", MM:"%d \u0645\u0647\u064a\u0646\u0627", y:"\u0647\u06aa \u0633\u0627\u0644", yy:"%d \u0633\u0627\u0644"}, preparse:function(string) {
    return string.replace(/\u060c/g, ",");
  }, postformat:function(string) {
    return string.replace(/,/g, "\u060c");
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("se", {months:"o\u0111\u0111ajagem\u00e1nnu_guovvam\u00e1nnu_njuk\u010dam\u00e1nnu_cuo\u014bom\u00e1nnu_miessem\u00e1nnu_geassem\u00e1nnu_suoidnem\u00e1nnu_borgem\u00e1nnu_\u010dak\u010dam\u00e1nnu_golggotm\u00e1nnu_sk\u00e1bmam\u00e1nnu_juovlam\u00e1nnu".split("_"), monthsShort:"o\u0111\u0111j_guov_njuk_cuo_mies_geas_suoi_borg_\u010dak\u010d_golg_sk\u00e1b_juov".split("_"), weekdays:"sotnabeaivi_vuoss\u00e1rga_ma\u014b\u014beb\u00e1rga_gaskavahkku_duorastat_bearjadat_l\u00e1vvardat".split("_"), 
  weekdaysShort:"sotn_vuos_ma\u014b_gask_duor_bear_l\u00e1v".split("_"), weekdaysMin:"s_v_m_g_d_b_L".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"MMMM D. [b.] YYYY", LLL:"MMMM D. [b.] YYYY [ti.] HH:mm", LLLL:"dddd, MMMM D. [b.] YYYY [ti.] HH:mm"}, calendar:{sameDay:"[otne ti] LT", nextDay:"[ihttin ti] LT", nextWeek:"dddd [ti] LT", lastDay:"[ikte ti] LT", lastWeek:"[ovddit] dddd [ti] LT", sameElse:"L"}, relativeTime:{future:"%s gea\u017ees", past:"ma\u014bit %s", s:"moadde sekunddat", 
  ss:"%d sekunddat", m:"okta minuhta", mm:"%d minuhtat", h:"okta diimmu", hh:"%d diimmut", d:"okta beaivi", dd:"%d beaivvit", M:"okta m\u00e1nnu", MM:"%d m\u00e1nut", y:"okta jahki", yy:"%d jagit"}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  hooks.defineLocale("si", {months:"\u0da2\u0db1\u0dc0\u0dcf\u0dbb\u0dd2_\u0db4\u0dd9\u0db6\u0dbb\u0dc0\u0dcf\u0dbb\u0dd2_\u0db8\u0dcf\u0dbb\u0dca\u0dad\u0dd4_\u0d85\u0db4\u0dca\u200d\u0dbb\u0dda\u0dbd\u0dca_\u0db8\u0dd0\u0dba\u0dd2_\u0da2\u0dd6\u0db1\u0dd2_\u0da2\u0dd6\u0dbd\u0dd2_\u0d85\u0d9c\u0ddd\u0dc3\u0dca\u0dad\u0dd4_\u0dc3\u0dd0\u0db4\u0dca\u0dad\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca_\u0d94\u0d9a\u0dca\u0dad\u0ddd\u0db6\u0dbb\u0dca_\u0db1\u0ddc\u0dc0\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca_\u0daf\u0dd9\u0dc3\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca".split("_"), 
  monthsShort:"\u0da2\u0db1_\u0db4\u0dd9\u0db6_\u0db8\u0dcf\u0dbb\u0dca_\u0d85\u0db4\u0dca_\u0db8\u0dd0\u0dba\u0dd2_\u0da2\u0dd6\u0db1\u0dd2_\u0da2\u0dd6\u0dbd\u0dd2_\u0d85\u0d9c\u0ddd_\u0dc3\u0dd0\u0db4\u0dca_\u0d94\u0d9a\u0dca_\u0db1\u0ddc\u0dc0\u0dd0_\u0daf\u0dd9\u0dc3\u0dd0".split("_"), weekdays:"\u0d89\u0dbb\u0dd2\u0daf\u0dcf_\u0dc3\u0db3\u0dd4\u0daf\u0dcf_\u0d85\u0d9f\u0dc4\u0dbb\u0dd4\u0dc0\u0dcf\u0daf\u0dcf_\u0db6\u0daf\u0dcf\u0daf\u0dcf_\u0db6\u0dca\u200d\u0dbb\u0dc4\u0dc3\u0dca\u0db4\u0dad\u0dd2\u0db1\u0dca\u0daf\u0dcf_\u0dc3\u0dd2\u0d9a\u0dd4\u0dbb\u0dcf\u0daf\u0dcf_\u0dc3\u0dd9\u0db1\u0dc3\u0dd4\u0dbb\u0dcf\u0daf\u0dcf".split("_"), 
  weekdaysShort:"\u0d89\u0dbb\u0dd2_\u0dc3\u0db3\u0dd4_\u0d85\u0d9f_\u0db6\u0daf\u0dcf_\u0db6\u0dca\u200d\u0dbb\u0dc4_\u0dc3\u0dd2\u0d9a\u0dd4_\u0dc3\u0dd9\u0db1".split("_"), weekdaysMin:"\u0d89_\u0dc3_\u0d85_\u0db6_\u0db6\u0dca\u200d\u0dbb_\u0dc3\u0dd2_\u0dc3\u0dd9".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"a h:mm", LTS:"a h:mm:ss", L:"YYYY/MM/DD", LL:"YYYY MMMM D", LLL:"YYYY MMMM D, a h:mm", LLLL:"YYYY MMMM D [\u0dc0\u0dd0\u0db1\u0dd2] dddd, a h:mm:ss"}, calendar:{sameDay:"[\u0d85\u0daf] LT[\u0da7]", 
  nextDay:"[\u0dc4\u0dd9\u0da7] LT[\u0da7]", nextWeek:"dddd LT[\u0da7]", lastDay:"[\u0d8a\u0dba\u0dda] LT[\u0da7]", lastWeek:"[\u0db4\u0dc3\u0dd4\u0d9c\u0dd2\u0dba] dddd LT[\u0da7]", sameElse:"L"}, relativeTime:{future:"%s\u0d9a\u0dd2\u0db1\u0dca", past:"%s\u0d9a\u0da7 \u0db4\u0dd9\u0dbb", s:"\u0dad\u0dad\u0dca\u0db4\u0dbb \u0d9a\u0dd2\u0dc4\u0dd2\u0db4\u0dba", ss:"\u0dad\u0dad\u0dca\u0db4\u0dbb %d", m:"\u0db8\u0dd2\u0db1\u0dd2\u0dad\u0dca\u0dad\u0dd4\u0dc0", mm:"\u0db8\u0dd2\u0db1\u0dd2\u0dad\u0dca\u0dad\u0dd4 %d", 
  h:"\u0db4\u0dd0\u0dba", hh:"\u0db4\u0dd0\u0dba %d", d:"\u0daf\u0dd2\u0db1\u0dba", dd:"\u0daf\u0dd2\u0db1 %d", M:"\u0db8\u0dcf\u0dc3\u0dba", MM:"\u0db8\u0dcf\u0dc3 %d", y:"\u0dc0\u0dc3\u0dbb", yy:"\u0dc0\u0dc3\u0dbb %d"}, dayOfMonthOrdinalParse:/\d{1,2} \u0dc0\u0dd0\u0db1\u0dd2/, ordinal:function(number) {
    return number + " \u0dc0\u0dd0\u0db1\u0dd2";
  }, meridiemParse:/\u0db4\u0dd9\u0dbb \u0dc0\u0dbb\u0dd4|\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4|\u0db4\u0dd9.\u0dc0|\u0db4.\u0dc0./, isPM:function(input) {
    return input === "\u0db4.\u0dc0." || input === "\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4";
  }, meridiem:function(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? "\u0db4.\u0dc0." : "\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4";
    } else {
      return isLower ? "\u0db4\u0dd9.\u0dc0." : "\u0db4\u0dd9\u0dbb \u0dc0\u0dbb\u0dd4";
    }
  }});
  var months$9 = "janu\u00e1r_febru\u00e1r_marec_apr\u00edl_m\u00e1j_j\u00fan_j\u00fal_august_september_okt\u00f3ber_november_december".split("_"), monthsShort$6 = "jan_feb_mar_apr_m\u00e1j_j\u00fan_j\u00fal_aug_sep_okt_nov_dec".split("_");
  function plural$5(n) {
    return n > 1 && n < 5;
  }
  function translate$9(number, withoutSuffix, key, isFuture) {
    var result = number + " ";
    switch(key) {
      case "s":
        return withoutSuffix || isFuture ? "p\u00e1r sek\u00fand" : "p\u00e1r sekundami";
      case "ss":
        if (withoutSuffix || isFuture) {
          return result + (plural$5(number) ? "sekundy" : "sek\u00fand");
        } else {
          return result + "sekundami";
        }
        break;
      case "m":
        return withoutSuffix ? "min\u00fata" : isFuture ? "min\u00fatu" : "min\u00fatou";
      case "mm":
        if (withoutSuffix || isFuture) {
          return result + (plural$5(number) ? "min\u00faty" : "min\u00fat");
        } else {
          return result + "min\u00fatami";
        }
        break;
      case "h":
        return withoutSuffix ? "hodina" : isFuture ? "hodinu" : "hodinou";
      case "hh":
        if (withoutSuffix || isFuture) {
          return result + (plural$5(number) ? "hodiny" : "hod\u00edn");
        } else {
          return result + "hodinami";
        }
        break;
      case "d":
        return withoutSuffix || isFuture ? "de\u0148" : "d\u0148om";
      case "dd":
        if (withoutSuffix || isFuture) {
          return result + (plural$5(number) ? "dni" : "dn\u00ed");
        } else {
          return result + "d\u0148ami";
        }
        break;
      case "M":
        return withoutSuffix || isFuture ? "mesiac" : "mesiacom";
      case "MM":
        if (withoutSuffix || isFuture) {
          return result + (plural$5(number) ? "mesiace" : "mesiacov");
        } else {
          return result + "mesiacmi";
        }
        break;
      case "y":
        return withoutSuffix || isFuture ? "rok" : "rokom";
      case "yy":
        if (withoutSuffix || isFuture) {
          return result + (plural$5(number) ? "roky" : "rokov");
        } else {
          return result + "rokmi";
        }
        break;
    }
  }
  hooks.defineLocale("sk", {months:months$9, monthsShort:monthsShort$6, weekdays:"nede\u013ea_pondelok_utorok_streda_\u0161tvrtok_piatok_sobota".split("_"), weekdaysShort:"ne_po_ut_st_\u0161t_pi_so".split("_"), weekdaysMin:"ne_po_ut_st_\u0161t_pi_so".split("_"), longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY H:mm", LLLL:"dddd D. MMMM YYYY H:mm"}, calendar:{sameDay:"[dnes o] LT", nextDay:"[zajtra o] LT", nextWeek:function() {
    switch(this.day()) {
      case 0:
        return "[v nede\u013eu o] LT";
      case 1:
      case 2:
        return "[v] dddd [o] LT";
      case 3:
        return "[v stredu o] LT";
      case 4:
        return "[vo \u0161tvrtok o] LT";
      case 5:
        return "[v piatok o] LT";
      case 6:
        return "[v sobotu o] LT";
    }
  }, lastDay:"[v\u010dera o] LT", lastWeek:function() {
    switch(this.day()) {
      case 0:
        return "[minul\u00fa nede\u013eu o] LT";
      case 1:
      case 2:
        return "[minul\u00fd] dddd [o] LT";
      case 3:
        return "[minul\u00fa stredu o] LT";
      case 4:
      case 5:
        return "[minul\u00fd] dddd [o] LT";
      case 6:
        return "[minul\u00fa sobotu o] LT";
    }
  }, sameElse:"L"}, relativeTime:{future:"za %s", past:"pred %s", s:translate$9, ss:translate$9, m:translate$9, mm:translate$9, h:translate$9, hh:translate$9, d:translate$9, dd:translate$9, M:translate$9, MM:translate$9, y:translate$9, yy:translate$9}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  function processRelativeTime$6(number, withoutSuffix, key, isFuture) {
    var result = number + " ";
    switch(key) {
      case "s":
        return withoutSuffix || isFuture ? "nekaj sekund" : "nekaj sekundami";
      case "ss":
        if (number === 1) {
          result += withoutSuffix ? "sekundo" : "sekundi";
        } else {
          if (number === 2) {
            result += withoutSuffix || isFuture ? "sekundi" : "sekundah";
          } else {
            if (number < 5) {
              result += withoutSuffix || isFuture ? "sekunde" : "sekundah";
            } else {
              result += "sekund";
            }
          }
        }
        return result;
      case "m":
        return withoutSuffix ? "ena minuta" : "eno minuto";
      case "mm":
        if (number === 1) {
          result += withoutSuffix ? "minuta" : "minuto";
        } else {
          if (number === 2) {
            result += withoutSuffix || isFuture ? "minuti" : "minutama";
          } else {
            if (number < 5) {
              result += withoutSuffix || isFuture ? "minute" : "minutami";
            } else {
              result += withoutSuffix || isFuture ? "minut" : "minutami";
            }
          }
        }
        return result;
      case "h":
        return withoutSuffix ? "ena ura" : "eno uro";
      case "hh":
        if (number === 1) {
          result += withoutSuffix ? "ura" : "uro";
        } else {
          if (number === 2) {
            result += withoutSuffix || isFuture ? "uri" : "urama";
          } else {
            if (number < 5) {
              result += withoutSuffix || isFuture ? "ure" : "urami";
            } else {
              result += withoutSuffix || isFuture ? "ur" : "urami";
            }
          }
        }
        return result;
      case "d":
        return withoutSuffix || isFuture ? "en dan" : "enim dnem";
      case "dd":
        if (number === 1) {
          result += withoutSuffix || isFuture ? "dan" : "dnem";
        } else {
          if (number === 2) {
            result += withoutSuffix || isFuture ? "dni" : "dnevoma";
          } else {
            result += withoutSuffix || isFuture ? "dni" : "dnevi";
          }
        }
        return result;
      case "M":
        return withoutSuffix || isFuture ? "en mesec" : "enim mesecem";
      case "MM":
        if (number === 1) {
          result += withoutSuffix || isFuture ? "mesec" : "mesecem";
        } else {
          if (number === 2) {
            result += withoutSuffix || isFuture ? "meseca" : "mesecema";
          } else {
            if (number < 5) {
              result += withoutSuffix || isFuture ? "mesece" : "meseci";
            } else {
              result += withoutSuffix || isFuture ? "mesecev" : "meseci";
            }
          }
        }
        return result;
      case "y":
        return withoutSuffix || isFuture ? "eno leto" : "enim letom";
      case "yy":
        if (number === 1) {
          result += withoutSuffix || isFuture ? "leto" : "letom";
        } else {
          if (number === 2) {
            result += withoutSuffix || isFuture ? "leti" : "letoma";
          } else {
            if (number < 5) {
              result += withoutSuffix || isFuture ? "leta" : "leti";
            } else {
              result += withoutSuffix || isFuture ? "let" : "leti";
            }
          }
        }
        return result;
    }
  }
  hooks.defineLocale("sl", {months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"), monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"), monthsParseExact:true, weekdays:"nedelja_ponedeljek_torek_sreda_\u010detrtek_petek_sobota".split("_"), weekdaysShort:"ned._pon._tor._sre._\u010det._pet._sob.".split("_"), weekdaysMin:"ne_po_to_sr_\u010de_pe_so".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", 
  L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY H:mm", LLLL:"dddd, D. MMMM YYYY H:mm"}, calendar:{sameDay:"[danes ob] LT", nextDay:"[jutri ob] LT", nextWeek:function() {
    switch(this.day()) {
      case 0:
        return "[v] [nedeljo] [ob] LT";
      case 3:
        return "[v] [sredo] [ob] LT";
      case 6:
        return "[v] [soboto] [ob] LT";
      case 1:
      case 2:
      case 4:
      case 5:
        return "[v] dddd [ob] LT";
    }
  }, lastDay:"[v\u010deraj ob] LT", lastWeek:function() {
    switch(this.day()) {
      case 0:
        return "[prej\u0161njo] [nedeljo] [ob] LT";
      case 3:
        return "[prej\u0161njo] [sredo] [ob] LT";
      case 6:
        return "[prej\u0161njo] [soboto] [ob] LT";
      case 1:
      case 2:
      case 4:
      case 5:
        return "[prej\u0161nji] dddd [ob] LT";
    }
  }, sameElse:"L"}, relativeTime:{future:"\u010dez %s", past:"pred %s", s:processRelativeTime$6, ss:processRelativeTime$6, m:processRelativeTime$6, mm:processRelativeTime$6, h:processRelativeTime$6, hh:processRelativeTime$6, d:processRelativeTime$6, dd:processRelativeTime$6, M:processRelativeTime$6, MM:processRelativeTime$6, y:processRelativeTime$6, yy:processRelativeTime$6}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:7}});
  hooks.defineLocale("sq", {months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_N\u00ebntor_Dhjetor".split("_"), monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_N\u00ebn_Dhj".split("_"), weekdays:"E Diel_E H\u00ebn\u00eb_E Mart\u00eb_E M\u00ebrkur\u00eb_E Enjte_E Premte_E Shtun\u00eb".split("_"), weekdaysShort:"Die_H\u00ebn_Mar_M\u00ebr_Enj_Pre_Sht".split("_"), weekdaysMin:"D_H_Ma_M\u00eb_E_P_Sh".split("_"), weekdaysParseExact:true, meridiemParse:/PD|MD/, isPM:function(input) {
    return input.charAt(0) === "M";
  }, meridiem:function(hours, minutes, isLower) {
    return hours < 12 ? "PD" : "MD";
  }, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[Sot n\u00eb] LT", nextDay:"[Nes\u00ebr n\u00eb] LT", nextWeek:"dddd [n\u00eb] LT", lastDay:"[Dje n\u00eb] LT", lastWeek:"dddd [e kaluar n\u00eb] LT", sameElse:"L"}, relativeTime:{future:"n\u00eb %s", past:"%s m\u00eb par\u00eb", s:"disa sekonda", ss:"%d sekonda", m:"nj\u00eb minut\u00eb", mm:"%d minuta", h:"nj\u00eb or\u00eb", hh:"%d or\u00eb", 
  d:"nj\u00eb dit\u00eb", dd:"%d dit\u00eb", M:"nj\u00eb muaj", MM:"%d muaj", y:"nj\u00eb vit", yy:"%d vite"}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  var translator$1 = {words:{ss:["\u0441\u0435\u043a\u0443\u043d\u0434\u0430", "\u0441\u0435\u043a\u0443\u043d\u0434\u0435", "\u0441\u0435\u043a\u0443\u043d\u0434\u0438"], m:["\u0458\u0435\u0434\u0430\u043d \u043c\u0438\u043d\u0443\u0442", "\u0458\u0435\u0434\u043d\u0435 \u043c\u0438\u043d\u0443\u0442\u0435"], mm:["\u043c\u0438\u043d\u0443\u0442", "\u043c\u0438\u043d\u0443\u0442\u0435", "\u043c\u0438\u043d\u0443\u0442\u0430"], h:["\u0458\u0435\u0434\u0430\u043d \u0441\u0430\u0442", "\u0458\u0435\u0434\u043d\u043e\u0433 \u0441\u0430\u0442\u0430"], 
  hh:["\u0441\u0430\u0442", "\u0441\u0430\u0442\u0430", "\u0441\u0430\u0442\u0438"], dd:["\u0434\u0430\u043d", "\u0434\u0430\u043d\u0430", "\u0434\u0430\u043d\u0430"], MM:["\u043c\u0435\u0441\u0435\u0446", "\u043c\u0435\u0441\u0435\u0446\u0430", "\u043c\u0435\u0441\u0435\u0446\u0438"], yy:["\u0433\u043e\u0434\u0438\u043d\u0430", "\u0433\u043e\u0434\u0438\u043d\u0435", "\u0433\u043e\u0434\u0438\u043d\u0430"]}, correctGrammaticalCase:function(number, wordKey) {
    return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
  }, translate:function(number, withoutSuffix, key) {
    var wordKey = translator$1.words[key];
    if (key.length === 1) {
      return withoutSuffix ? wordKey[0] : wordKey[1];
    } else {
      return number + " " + translator$1.correctGrammaticalCase(number, wordKey);
    }
  }};
  hooks.defineLocale("sr-cyrl", {months:"\u0458\u0430\u043d\u0443\u0430\u0440_\u0444\u0435\u0431\u0440\u0443\u0430\u0440_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0458_\u0458\u0443\u043d_\u0458\u0443\u043b_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0431\u0430\u0440_\u043e\u043a\u0442\u043e\u0431\u0430\u0440_\u043d\u043e\u0432\u0435\u043c\u0431\u0430\u0440_\u0434\u0435\u0446\u0435\u043c\u0431\u0430\u0440".split("_"), monthsShort:"\u0458\u0430\u043d._\u0444\u0435\u0431._\u043c\u0430\u0440._\u0430\u043f\u0440._\u043c\u0430\u0458_\u0458\u0443\u043d_\u0458\u0443\u043b_\u0430\u0432\u0433._\u0441\u0435\u043f._\u043e\u043a\u0442._\u043d\u043e\u0432._\u0434\u0435\u0446.".split("_"), 
  monthsParseExact:true, weekdays:"\u043d\u0435\u0434\u0435\u0459\u0430_\u043f\u043e\u043d\u0435\u0434\u0435\u0459\u0430\u043a_\u0443\u0442\u043e\u0440\u0430\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u0430\u043a_\u043f\u0435\u0442\u0430\u043a_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"), weekdaysShort:"\u043d\u0435\u0434._\u043f\u043e\u043d._\u0443\u0442\u043e._\u0441\u0440\u0435._\u0447\u0435\u0442._\u043f\u0435\u0442._\u0441\u0443\u0431.".split("_"), weekdaysMin:"\u043d\u0435_\u043f\u043e_\u0443\u0442_\u0441\u0440_\u0447\u0435_\u043f\u0435_\u0441\u0443".split("_"), 
  weekdaysParseExact:true, longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY H:mm", LLLL:"dddd, D. MMMM YYYY H:mm"}, calendar:{sameDay:"[\u0434\u0430\u043d\u0430\u0441 \u0443] LT", nextDay:"[\u0441\u0443\u0442\u0440\u0430 \u0443] LT", nextWeek:function() {
    switch(this.day()) {
      case 0:
        return "[\u0443] [\u043d\u0435\u0434\u0435\u0459\u0443] [\u0443] LT";
      case 3:
        return "[\u0443] [\u0441\u0440\u0435\u0434\u0443] [\u0443] LT";
      case 6:
        return "[\u0443] [\u0441\u0443\u0431\u043e\u0442\u0443] [\u0443] LT";
      case 1:
      case 2:
      case 4:
      case 5:
        return "[\u0443] dddd [\u0443] LT";
    }
  }, lastDay:"[\u0458\u0443\u0447\u0435 \u0443] LT", lastWeek:function() {
    var lastWeekDays = ["[\u043f\u0440\u043e\u0448\u043b\u0435] [\u043d\u0435\u0434\u0435\u0459\u0435] [\u0443] LT", "[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u043f\u043e\u043d\u0435\u0434\u0435\u0459\u043a\u0430] [\u0443] LT", "[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u0443\u0442\u043e\u0440\u043a\u0430] [\u0443] LT", "[\u043f\u0440\u043e\u0448\u043b\u0435] [\u0441\u0440\u0435\u0434\u0435] [\u0443] LT", "[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u0447\u0435\u0442\u0432\u0440\u0442\u043a\u0430] [\u0443] LT", 
    "[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u043f\u0435\u0442\u043a\u0430] [\u0443] LT", "[\u043f\u0440\u043e\u0448\u043b\u0435] [\u0441\u0443\u0431\u043e\u0442\u0435] [\u0443] LT"];
    return lastWeekDays[this.day()];
  }, sameElse:"L"}, relativeTime:{future:"\u0437\u0430 %s", past:"\u043f\u0440\u0435 %s", s:"\u043d\u0435\u043a\u043e\u043b\u0438\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434\u0438", ss:translator$1.translate, m:translator$1.translate, mm:translator$1.translate, h:translator$1.translate, hh:translator$1.translate, d:"\u0434\u0430\u043d", dd:translator$1.translate, M:"\u043c\u0435\u0441\u0435\u0446", MM:translator$1.translate, y:"\u0433\u043e\u0434\u0438\u043d\u0443", yy:translator$1.translate}, 
  dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:7}});
  var translator$2 = {words:{ss:["sekunda", "sekunde", "sekundi"], m:["jedan minut", "jedne minute"], mm:["minut", "minute", "minuta"], h:["jedan sat", "jednog sata"], hh:["sat", "sata", "sati"], dd:["dan", "dana", "dana"], MM:["mesec", "meseca", "meseci"], yy:["godina", "godine", "godina"]}, correctGrammaticalCase:function(number, wordKey) {
    return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
  }, translate:function(number, withoutSuffix, key) {
    var wordKey = translator$2.words[key];
    if (key.length === 1) {
      return withoutSuffix ? wordKey[0] : wordKey[1];
    } else {
      return number + " " + translator$2.correctGrammaticalCase(number, wordKey);
    }
  }};
  hooks.defineLocale("sr", {months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"), monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"), monthsParseExact:true, weekdays:"nedelja_ponedeljak_utorak_sreda_\u010detvrtak_petak_subota".split("_"), weekdaysShort:"ned._pon._uto._sre._\u010det._pet._sub.".split("_"), weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", 
  L:"DD.MM.YYYY", LL:"D. MMMM YYYY", LLL:"D. MMMM YYYY H:mm", LLLL:"dddd, D. MMMM YYYY H:mm"}, calendar:{sameDay:"[danas u] LT", nextDay:"[sutra u] LT", nextWeek:function() {
    switch(this.day()) {
      case 0:
        return "[u] [nedelju] [u] LT";
      case 3:
        return "[u] [sredu] [u] LT";
      case 6:
        return "[u] [subotu] [u] LT";
      case 1:
      case 2:
      case 4:
      case 5:
        return "[u] dddd [u] LT";
    }
  }, lastDay:"[ju\u010de u] LT", lastWeek:function() {
    var lastWeekDays = ["[pro\u0161le] [nedelje] [u] LT", "[pro\u0161log] [ponedeljka] [u] LT", "[pro\u0161log] [utorka] [u] LT", "[pro\u0161le] [srede] [u] LT", "[pro\u0161log] [\u010detvrtka] [u] LT", "[pro\u0161log] [petka] [u] LT", "[pro\u0161le] [subote] [u] LT"];
    return lastWeekDays[this.day()];
  }, sameElse:"L"}, relativeTime:{future:"za %s", past:"pre %s", s:"nekoliko sekundi", ss:translator$2.translate, m:translator$2.translate, mm:translator$2.translate, h:translator$2.translate, hh:translator$2.translate, d:"dan", dd:translator$2.translate, M:"mesec", MM:translator$2.translate, y:"godinu", yy:translator$2.translate}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:7}});
  hooks.defineLocale("ss", {months:"Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"), monthsShort:"Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"), weekdays:"Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"), weekdaysShort:"Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"), weekdaysMin:"Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"h:mm A", LTS:"h:mm:ss A", 
  L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY h:mm A", LLLL:"dddd, D MMMM YYYY h:mm A"}, calendar:{sameDay:"[Namuhla nga] LT", nextDay:"[Kusasa nga] LT", nextWeek:"dddd [nga] LT", lastDay:"[Itolo nga] LT", lastWeek:"dddd [leliphelile] [nga] LT", sameElse:"L"}, relativeTime:{future:"nga %s", past:"wenteka nga %s", s:"emizuzwana lomcane", ss:"%d mzuzwana", m:"umzuzu", mm:"%d emizuzu", h:"lihora", hh:"%d emahora", d:"lilanga", dd:"%d emalanga", M:"inyanga", MM:"%d tinyanga", y:"umnyaka", yy:"%d iminyaka"}, 
  meridiemParse:/ekuseni|emini|entsambama|ebusuku/, meridiem:function(hours, minutes, isLower) {
    if (hours < 11) {
      return "ekuseni";
    } else {
      if (hours < 15) {
        return "emini";
      } else {
        if (hours < 19) {
          return "entsambama";
        } else {
          return "ebusuku";
        }
      }
    }
  }, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "ekuseni") {
      return hour;
    } else {
      if (meridiem === "emini") {
        return hour >= 11 ? hour : hour + 12;
      } else {
        if (meridiem === "entsambama" || meridiem === "ebusuku") {
          if (hour === 0) {
            return 0;
          }
          return hour + 12;
        }
      }
    }
  }, dayOfMonthOrdinalParse:/\d{1,2}/, ordinal:"%d", week:{dow:1, doy:4}});
  hooks.defineLocale("sv", {months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"), monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekdays:"s\u00f6ndag_m\u00e5ndag_tisdag_onsdag_torsdag_fredag_l\u00f6rdag".split("_"), weekdaysShort:"s\u00f6n_m\u00e5n_tis_ons_tor_fre_l\u00f6r".split("_"), weekdaysMin:"s\u00f6_m\u00e5_ti_on_to_fr_l\u00f6".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"YYYY-MM-DD", LL:"D MMMM YYYY", 
  LLL:"D MMMM YYYY [kl.] HH:mm", LLLL:"dddd D MMMM YYYY [kl.] HH:mm", lll:"D MMM YYYY HH:mm", llll:"ddd D MMM YYYY HH:mm"}, calendar:{sameDay:"[Idag] LT", nextDay:"[Imorgon] LT", lastDay:"[Ig\u00e5r] LT", nextWeek:"[P\u00e5] dddd LT", lastWeek:"[I] dddd[s] LT", sameElse:"L"}, relativeTime:{future:"om %s", past:"f\u00f6r %s sedan", s:"n\u00e5gra sekunder", ss:"%d sekunder", m:"en minut", mm:"%d minuter", h:"en timme", hh:"%d timmar", d:"en dag", dd:"%d dagar", M:"en m\u00e5nad", MM:"%d m\u00e5nader", 
  y:"ett \u00e5r", yy:"%d \u00e5r"}, dayOfMonthOrdinalParse:/\d{1,2}(e|a)/, ordinal:function(number) {
    var b = number % 10, output = ~~(number % 100 / 10) === 1 ? "e" : b === 1 ? "a" : b === 2 ? "a" : b === 3 ? "e" : "e";
    return number + output;
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("sw", {months:"Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"), monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"), weekdays:"Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"), weekdaysShort:"Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"), weekdaysMin:"J2_J3_J4_J5_Al_Ij_J1".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", 
  LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[leo saa] LT", nextDay:"[kesho saa] LT", nextWeek:"[wiki ijayo] dddd [saat] LT", lastDay:"[jana] LT", lastWeek:"[wiki iliyopita] dddd [saat] LT", sameElse:"L"}, relativeTime:{future:"%s baadaye", past:"tokea %s", s:"hivi punde", ss:"sekunde %d", m:"dakika moja", mm:"dakika %d", h:"saa limoja", hh:"masaa %d", d:"siku moja", dd:"masiku %d", M:"mwezi mmoja", MM:"miezi %d", y:"mwaka mmoja", yy:"miaka %d"}, week:{dow:1, doy:7}});
  var symbolMap$f = {1:"\u0be7", 2:"\u0be8", 3:"\u0be9", 4:"\u0bea", 5:"\u0beb", 6:"\u0bec", 7:"\u0bed", 8:"\u0bee", 9:"\u0bef", 0:"\u0be6"}, numberMap$e = {"\u0be7":"1", "\u0be8":"2", "\u0be9":"3", "\u0bea":"4", "\u0beb":"5", "\u0bec":"6", "\u0bed":"7", "\u0bee":"8", "\u0bef":"9", "\u0be6":"0"};
  hooks.defineLocale("ta", {months:"\u0b9c\u0ba9\u0bb5\u0bb0\u0bbf_\u0baa\u0bbf\u0baa\u0bcd\u0bb0\u0bb5\u0bb0\u0bbf_\u0bae\u0bbe\u0bb0\u0bcd\u0b9a\u0bcd_\u0b8f\u0baa\u0bcd\u0bb0\u0bb2\u0bcd_\u0bae\u0bc7_\u0b9c\u0bc2\u0ba9\u0bcd_\u0b9c\u0bc2\u0bb2\u0bc8_\u0b86\u0b95\u0bb8\u0bcd\u0b9f\u0bcd_\u0b9a\u0bc6\u0baa\u0bcd\u0b9f\u0bc6\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b85\u0b95\u0bcd\u0b9f\u0bc7\u0bbe\u0baa\u0bb0\u0bcd_\u0ba8\u0bb5\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b9f\u0bbf\u0b9a\u0bae\u0bcd\u0baa\u0bb0\u0bcd".split("_"), 
  monthsShort:"\u0b9c\u0ba9\u0bb5\u0bb0\u0bbf_\u0baa\u0bbf\u0baa\u0bcd\u0bb0\u0bb5\u0bb0\u0bbf_\u0bae\u0bbe\u0bb0\u0bcd\u0b9a\u0bcd_\u0b8f\u0baa\u0bcd\u0bb0\u0bb2\u0bcd_\u0bae\u0bc7_\u0b9c\u0bc2\u0ba9\u0bcd_\u0b9c\u0bc2\u0bb2\u0bc8_\u0b86\u0b95\u0bb8\u0bcd\u0b9f\u0bcd_\u0b9a\u0bc6\u0baa\u0bcd\u0b9f\u0bc6\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b85\u0b95\u0bcd\u0b9f\u0bc7\u0bbe\u0baa\u0bb0\u0bcd_\u0ba8\u0bb5\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b9f\u0bbf\u0b9a\u0bae\u0bcd\u0baa\u0bb0\u0bcd".split("_"), weekdays:"\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bcd\u0bb1\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0ba4\u0bbf\u0b99\u0bcd\u0b95\u0b9f\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0b9a\u0bc6\u0bb5\u0bcd\u0bb5\u0bbe\u0baf\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0baa\u0bc1\u0ba4\u0ba9\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0bb5\u0bbf\u0baf\u0bbe\u0bb4\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0bb5\u0bc6\u0bb3\u0bcd\u0bb3\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0b9a\u0ba9\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8".split("_"), 
  weekdaysShort:"\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1_\u0ba4\u0bbf\u0b99\u0bcd\u0b95\u0bb3\u0bcd_\u0b9a\u0bc6\u0bb5\u0bcd\u0bb5\u0bbe\u0baf\u0bcd_\u0baa\u0bc1\u0ba4\u0ba9\u0bcd_\u0bb5\u0bbf\u0baf\u0bbe\u0bb4\u0ba9\u0bcd_\u0bb5\u0bc6\u0bb3\u0bcd\u0bb3\u0bbf_\u0b9a\u0ba9\u0bbf".split("_"), weekdaysMin:"\u0b9e\u0bbe_\u0ba4\u0bbf_\u0b9a\u0bc6_\u0baa\u0bc1_\u0bb5\u0bbf_\u0bb5\u0bc6_\u0b9a".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY, HH:mm", 
  LLLL:"dddd, D MMMM YYYY, HH:mm"}, calendar:{sameDay:"[\u0b87\u0ba9\u0bcd\u0bb1\u0bc1] LT", nextDay:"[\u0ba8\u0bbe\u0bb3\u0bc8] LT", nextWeek:"dddd, LT", lastDay:"[\u0ba8\u0bc7\u0bb1\u0bcd\u0bb1\u0bc1] LT", lastWeek:"[\u0b95\u0b9f\u0ba8\u0bcd\u0ba4 \u0bb5\u0bbe\u0bb0\u0bae\u0bcd] dddd, LT", sameElse:"L"}, relativeTime:{future:"%s \u0b87\u0bb2\u0bcd", past:"%s \u0bae\u0bc1\u0ba9\u0bcd", s:"\u0b92\u0bb0\u0bc1 \u0b9a\u0bbf\u0bb2 \u0bb5\u0bbf\u0ba8\u0bbe\u0b9f\u0bbf\u0b95\u0bb3\u0bcd", ss:"%d \u0bb5\u0bbf\u0ba8\u0bbe\u0b9f\u0bbf\u0b95\u0bb3\u0bcd", 
  m:"\u0b92\u0bb0\u0bc1 \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0bae\u0bcd", mm:"%d \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bcd", h:"\u0b92\u0bb0\u0bc1 \u0bae\u0ba3\u0bbf \u0ba8\u0bc7\u0bb0\u0bae\u0bcd", hh:"%d \u0bae\u0ba3\u0bbf \u0ba8\u0bc7\u0bb0\u0bae\u0bcd", d:"\u0b92\u0bb0\u0bc1 \u0ba8\u0bbe\u0bb3\u0bcd", dd:"%d \u0ba8\u0bbe\u0b9f\u0bcd\u0b95\u0bb3\u0bcd", M:"\u0b92\u0bb0\u0bc1 \u0bae\u0bbe\u0ba4\u0bae\u0bcd", MM:"%d \u0bae\u0bbe\u0ba4\u0b99\u0bcd\u0b95\u0bb3\u0bcd", y:"\u0b92\u0bb0\u0bc1 \u0bb5\u0bb0\u0bc1\u0b9f\u0bae\u0bcd", 
  yy:"%d \u0b86\u0ba3\u0bcd\u0b9f\u0bc1\u0b95\u0bb3\u0bcd"}, dayOfMonthOrdinalParse:/\d{1,2}\u0bb5\u0ba4\u0bc1/, ordinal:function(number) {
    return number + "\u0bb5\u0ba4\u0bc1";
  }, preparse:function(string) {
    return string.replace(/[\u0be7\u0be8\u0be9\u0bea\u0beb\u0bec\u0bed\u0bee\u0bef\u0be6]/g, function(match) {
      return numberMap$e[match];
    });
  }, postformat:function(string) {
    return string.replace(/\d/g, function(match) {
      return symbolMap$f[match];
    });
  }, meridiemParse:/\u0baf\u0bbe\u0bae\u0bae\u0bcd|\u0bb5\u0bc8\u0b95\u0bb1\u0bc8|\u0b95\u0bbe\u0bb2\u0bc8|\u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd|\u0b8e\u0bb1\u0bcd\u0baa\u0bbe\u0b9f\u0bc1|\u0bae\u0bbe\u0bb2\u0bc8/, meridiem:function(hour, minute, isLower) {
    if (hour < 2) {
      return " \u0baf\u0bbe\u0bae\u0bae\u0bcd";
    } else {
      if (hour < 6) {
        return " \u0bb5\u0bc8\u0b95\u0bb1\u0bc8";
      } else {
        if (hour < 10) {
          return " \u0b95\u0bbe\u0bb2\u0bc8";
        } else {
          if (hour < 14) {
            return " \u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd";
          } else {
            if (hour < 18) {
              return " \u0b8e\u0bb1\u0bcd\u0baa\u0bbe\u0b9f\u0bc1";
            } else {
              if (hour < 22) {
                return " \u0bae\u0bbe\u0bb2\u0bc8";
              } else {
                return " \u0baf\u0bbe\u0bae\u0bae\u0bcd";
              }
            }
          }
        }
      }
    }
  }, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0baf\u0bbe\u0bae\u0bae\u0bcd") {
      return hour < 2 ? hour : hour + 12;
    } else {
      if (meridiem === "\u0bb5\u0bc8\u0b95\u0bb1\u0bc8" || meridiem === "\u0b95\u0bbe\u0bb2\u0bc8") {
        return hour;
      } else {
        if (meridiem === "\u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd") {
          return hour >= 10 ? hour : hour + 12;
        } else {
          return hour + 12;
        }
      }
    }
  }, week:{dow:0, doy:6}});
  hooks.defineLocale("te", {months:"\u0c1c\u0c28\u0c35\u0c30\u0c3f_\u0c2b\u0c3f\u0c2c\u0c4d\u0c30\u0c35\u0c30\u0c3f_\u0c2e\u0c3e\u0c30\u0c4d\u0c1a\u0c3f_\u0c0f\u0c2a\u0c4d\u0c30\u0c3f\u0c32\u0c4d_\u0c2e\u0c47_\u0c1c\u0c42\u0c28\u0c4d_\u0c1c\u0c41\u0c32\u0c48_\u0c06\u0c17\u0c38\u0c4d\u0c1f\u0c41_\u0c38\u0c46\u0c2a\u0c4d\u0c1f\u0c46\u0c02\u0c2c\u0c30\u0c4d_\u0c05\u0c15\u0c4d\u0c1f\u0c4b\u0c2c\u0c30\u0c4d_\u0c28\u0c35\u0c02\u0c2c\u0c30\u0c4d_\u0c21\u0c3f\u0c38\u0c46\u0c02\u0c2c\u0c30\u0c4d".split("_"), 
  monthsShort:"\u0c1c\u0c28._\u0c2b\u0c3f\u0c2c\u0c4d\u0c30._\u0c2e\u0c3e\u0c30\u0c4d\u0c1a\u0c3f_\u0c0f\u0c2a\u0c4d\u0c30\u0c3f._\u0c2e\u0c47_\u0c1c\u0c42\u0c28\u0c4d_\u0c1c\u0c41\u0c32\u0c48_\u0c06\u0c17._\u0c38\u0c46\u0c2a\u0c4d._\u0c05\u0c15\u0c4d\u0c1f\u0c4b._\u0c28\u0c35._\u0c21\u0c3f\u0c38\u0c46.".split("_"), monthsParseExact:true, weekdays:"\u0c06\u0c26\u0c3f\u0c35\u0c3e\u0c30\u0c02_\u0c38\u0c4b\u0c2e\u0c35\u0c3e\u0c30\u0c02_\u0c2e\u0c02\u0c17\u0c33\u0c35\u0c3e\u0c30\u0c02_\u0c2c\u0c41\u0c27\u0c35\u0c3e\u0c30\u0c02_\u0c17\u0c41\u0c30\u0c41\u0c35\u0c3e\u0c30\u0c02_\u0c36\u0c41\u0c15\u0c4d\u0c30\u0c35\u0c3e\u0c30\u0c02_\u0c36\u0c28\u0c3f\u0c35\u0c3e\u0c30\u0c02".split("_"), 
  weekdaysShort:"\u0c06\u0c26\u0c3f_\u0c38\u0c4b\u0c2e_\u0c2e\u0c02\u0c17\u0c33_\u0c2c\u0c41\u0c27_\u0c17\u0c41\u0c30\u0c41_\u0c36\u0c41\u0c15\u0c4d\u0c30_\u0c36\u0c28\u0c3f".split("_"), weekdaysMin:"\u0c06_\u0c38\u0c4b_\u0c2e\u0c02_\u0c2c\u0c41_\u0c17\u0c41_\u0c36\u0c41_\u0c36".split("_"), longDateFormat:{LT:"A h:mm", LTS:"A h:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY, A h:mm", LLLL:"dddd, D MMMM YYYY, A h:mm"}, calendar:{sameDay:"[\u0c28\u0c47\u0c21\u0c41] LT", nextDay:"[\u0c30\u0c47\u0c2a\u0c41] LT", 
  nextWeek:"dddd, LT", lastDay:"[\u0c28\u0c3f\u0c28\u0c4d\u0c28] LT", lastWeek:"[\u0c17\u0c24] dddd, LT", sameElse:"L"}, relativeTime:{future:"%s \u0c32\u0c4b", past:"%s \u0c15\u0c4d\u0c30\u0c3f\u0c24\u0c02", s:"\u0c15\u0c4a\u0c28\u0c4d\u0c28\u0c3f \u0c15\u0c4d\u0c37\u0c23\u0c3e\u0c32\u0c41", ss:"%d \u0c38\u0c46\u0c15\u0c28\u0c4d\u0c32\u0c41", m:"\u0c12\u0c15 \u0c28\u0c3f\u0c2e\u0c3f\u0c37\u0c02", mm:"%d \u0c28\u0c3f\u0c2e\u0c3f\u0c37\u0c3e\u0c32\u0c41", h:"\u0c12\u0c15 \u0c17\u0c02\u0c1f", hh:"%d \u0c17\u0c02\u0c1f\u0c32\u0c41", 
  d:"\u0c12\u0c15 \u0c30\u0c4b\u0c1c\u0c41", dd:"%d \u0c30\u0c4b\u0c1c\u0c41\u0c32\u0c41", M:"\u0c12\u0c15 \u0c28\u0c46\u0c32", MM:"%d \u0c28\u0c46\u0c32\u0c32\u0c41", y:"\u0c12\u0c15 \u0c38\u0c02\u0c35\u0c24\u0c4d\u0c38\u0c30\u0c02", yy:"%d \u0c38\u0c02\u0c35\u0c24\u0c4d\u0c38\u0c30\u0c3e\u0c32\u0c41"}, dayOfMonthOrdinalParse:/\d{1,2}\u0c35/, ordinal:"%d\u0c35", meridiemParse:/\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f|\u0c09\u0c26\u0c2f\u0c02|\u0c2e\u0c27\u0c4d\u0c2f\u0c3e\u0c39\u0c4d\u0c28\u0c02|\u0c38\u0c3e\u0c2f\u0c02\u0c24\u0c4d\u0c30\u0c02/, 
  meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f") {
      return hour < 4 ? hour : hour + 12;
    } else {
      if (meridiem === "\u0c09\u0c26\u0c2f\u0c02") {
        return hour;
      } else {
        if (meridiem === "\u0c2e\u0c27\u0c4d\u0c2f\u0c3e\u0c39\u0c4d\u0c28\u0c02") {
          return hour >= 10 ? hour : hour + 12;
        } else {
          if (meridiem === "\u0c38\u0c3e\u0c2f\u0c02\u0c24\u0c4d\u0c30\u0c02") {
            return hour + 12;
          }
        }
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f";
    } else {
      if (hour < 10) {
        return "\u0c09\u0c26\u0c2f\u0c02";
      } else {
        if (hour < 17) {
          return "\u0c2e\u0c27\u0c4d\u0c2f\u0c3e\u0c39\u0c4d\u0c28\u0c02";
        } else {
          if (hour < 20) {
            return "\u0c38\u0c3e\u0c2f\u0c02\u0c24\u0c4d\u0c30\u0c02";
          } else {
            return "\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f";
          }
        }
      }
    }
  }, week:{dow:0, doy:6}});
  hooks.defineLocale("tet", {months:"Janeiru_Fevereiru_Marsu_Abril_Maiu_Ju\u00f1u_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"), monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"), weekdays:"Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"), weekdaysShort:"Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"), weekdaysMin:"Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, 
  calendar:{sameDay:"[Ohin iha] LT", nextDay:"[Aban iha] LT", nextWeek:"dddd [iha] LT", lastDay:"[Horiseik iha] LT", lastWeek:"dddd [semana kotuk] [iha] LT", sameElse:"L"}, relativeTime:{future:"iha %s", past:"%s liuba", s:"minutu balun", ss:"minutu %d", m:"minutu ida", mm:"minutu %d", h:"oras ida", hh:"oras %d", d:"loron ida", dd:"loron %d", M:"fulan ida", MM:"fulan %d", y:"tinan ida", yy:"tinan %d"}, dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/, ordinal:function(number) {
    var b = number % 10, output = ~~(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }, week:{dow:1, doy:4}});
  var suffixes$3 = {0:"-\u0443\u043c", 1:"-\u0443\u043c", 2:"-\u044e\u043c", 3:"-\u044e\u043c", 4:"-\u0443\u043c", 5:"-\u0443\u043c", 6:"-\u0443\u043c", 7:"-\u0443\u043c", 8:"-\u0443\u043c", 9:"-\u0443\u043c", 10:"-\u0443\u043c", 12:"-\u0443\u043c", 13:"-\u0443\u043c", 20:"-\u0443\u043c", 30:"-\u044e\u043c", 40:"-\u0443\u043c", 50:"-\u0443\u043c", 60:"-\u0443\u043c", 70:"-\u0443\u043c", 80:"-\u0443\u043c", 90:"-\u0443\u043c", 100:"-\u0443\u043c"};
  hooks.defineLocale("tg", {months:"\u044f\u043d\u0432\u0430\u0440_\u0444\u0435\u0432\u0440\u0430\u043b_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440_\u043e\u043a\u0442\u044f\u0431\u0440_\u043d\u043e\u044f\u0431\u0440_\u0434\u0435\u043a\u0430\u0431\u0440".split("_"), monthsShort:"\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_"), 
  weekdays:"\u044f\u043a\u0448\u0430\u043d\u0431\u0435_\u0434\u0443\u0448\u0430\u043d\u0431\u0435_\u0441\u0435\u0448\u0430\u043d\u0431\u0435_\u0447\u043e\u0440\u0448\u0430\u043d\u0431\u0435_\u043f\u0430\u043d\u04b7\u0448\u0430\u043d\u0431\u0435_\u04b7\u0443\u043c\u044a\u0430_\u0448\u0430\u043d\u0431\u0435".split("_"), weekdaysShort:"\u044f\u0448\u0431_\u0434\u0448\u0431_\u0441\u0448\u0431_\u0447\u0448\u0431_\u043f\u0448\u0431_\u04b7\u0443\u043c_\u0448\u043d\u0431".split("_"), weekdaysMin:"\u044f\u0448_\u0434\u0448_\u0441\u0448_\u0447\u0448_\u043f\u0448_\u04b7\u043c_\u0448\u0431".split("_"), 
  longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[\u0418\u043c\u0440\u04ef\u0437 \u0441\u043e\u0430\u0442\u0438] LT", nextDay:"[\u041f\u0430\u0433\u043e\u04b3 \u0441\u043e\u0430\u0442\u0438] LT", lastDay:"[\u0414\u0438\u0440\u04ef\u0437 \u0441\u043e\u0430\u0442\u0438] LT", nextWeek:"dddd[\u0438] [\u04b3\u0430\u0444\u0442\u0430\u0438 \u043e\u044f\u043d\u0434\u0430 \u0441\u043e\u0430\u0442\u0438] LT", 
  lastWeek:"dddd[\u0438] [\u04b3\u0430\u0444\u0442\u0430\u0438 \u0433\u0443\u0437\u0430\u0448\u0442\u0430 \u0441\u043e\u0430\u0442\u0438] LT", sameElse:"L"}, relativeTime:{future:"\u0431\u0430\u044a\u0434\u0438 %s", past:"%s \u043f\u0435\u0448", s:"\u044f\u043a\u0447\u0430\u043d\u0434 \u0441\u043e\u043d\u0438\u044f", m:"\u044f\u043a \u0434\u0430\u049b\u0438\u049b\u0430", mm:"%d \u0434\u0430\u049b\u0438\u049b\u0430", h:"\u044f\u043a \u0441\u043e\u0430\u0442", hh:"%d \u0441\u043e\u0430\u0442", d:"\u044f\u043a \u0440\u04ef\u0437", 
  dd:"%d \u0440\u04ef\u0437", M:"\u044f\u043a \u043c\u043e\u04b3", MM:"%d \u043c\u043e\u04b3", y:"\u044f\u043a \u0441\u043e\u043b", yy:"%d \u0441\u043e\u043b"}, meridiemParse:/\u0448\u0430\u0431|\u0441\u0443\u0431\u04b3|\u0440\u04ef\u0437|\u0431\u0435\u0433\u043e\u04b3/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0448\u0430\u0431") {
      return hour < 4 ? hour : hour + 12;
    } else {
      if (meridiem === "\u0441\u0443\u0431\u04b3") {
        return hour;
      } else {
        if (meridiem === "\u0440\u04ef\u0437") {
          return hour >= 11 ? hour : hour + 12;
        } else {
          if (meridiem === "\u0431\u0435\u0433\u043e\u04b3") {
            return hour + 12;
          }
        }
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u0448\u0430\u0431";
    } else {
      if (hour < 11) {
        return "\u0441\u0443\u0431\u04b3";
      } else {
        if (hour < 16) {
          return "\u0440\u04ef\u0437";
        } else {
          if (hour < 19) {
            return "\u0431\u0435\u0433\u043e\u04b3";
          } else {
            return "\u0448\u0430\u0431";
          }
        }
      }
    }
  }, dayOfMonthOrdinalParse:/\d{1,2}-(\u0443\u043c|\u044e\u043c)/, ordinal:function(number) {
    var a = number % 10, b = number >= 100 ? 100 : null;
    return number + (suffixes$3[number] || suffixes$3[a] || suffixes$3[b]);
  }, week:{dow:1, doy:7}});
  hooks.defineLocale("th", {months:"\u0e21\u0e01\u0e23\u0e32\u0e04\u0e21_\u0e01\u0e38\u0e21\u0e20\u0e32\u0e1e\u0e31\u0e19\u0e18\u0e4c_\u0e21\u0e35\u0e19\u0e32\u0e04\u0e21_\u0e40\u0e21\u0e29\u0e32\u0e22\u0e19_\u0e1e\u0e24\u0e29\u0e20\u0e32\u0e04\u0e21_\u0e21\u0e34\u0e16\u0e38\u0e19\u0e32\u0e22\u0e19_\u0e01\u0e23\u0e01\u0e0e\u0e32\u0e04\u0e21_\u0e2a\u0e34\u0e07\u0e2b\u0e32\u0e04\u0e21_\u0e01\u0e31\u0e19\u0e22\u0e32\u0e22\u0e19_\u0e15\u0e38\u0e25\u0e32\u0e04\u0e21_\u0e1e\u0e24\u0e28\u0e08\u0e34\u0e01\u0e32\u0e22\u0e19_\u0e18\u0e31\u0e19\u0e27\u0e32\u0e04\u0e21".split("_"), 
  monthsShort:"\u0e21.\u0e04._\u0e01.\u0e1e._\u0e21\u0e35.\u0e04._\u0e40\u0e21.\u0e22._\u0e1e.\u0e04._\u0e21\u0e34.\u0e22._\u0e01.\u0e04._\u0e2a.\u0e04._\u0e01.\u0e22._\u0e15.\u0e04._\u0e1e.\u0e22._\u0e18.\u0e04.".split("_"), monthsParseExact:true, weekdays:"\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c_\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c_\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23_\u0e1e\u0e38\u0e18_\u0e1e\u0e24\u0e2b\u0e31\u0e2a\u0e1a\u0e14\u0e35_\u0e28\u0e38\u0e01\u0e23\u0e4c_\u0e40\u0e2a\u0e32\u0e23\u0e4c".split("_"), 
  weekdaysShort:"\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c_\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c_\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23_\u0e1e\u0e38\u0e18_\u0e1e\u0e24\u0e2b\u0e31\u0e2a_\u0e28\u0e38\u0e01\u0e23\u0e4c_\u0e40\u0e2a\u0e32\u0e23\u0e4c".split("_"), weekdaysMin:"\u0e2d\u0e32._\u0e08._\u0e2d._\u0e1e._\u0e1e\u0e24._\u0e28._\u0e2a.".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"H:mm", LTS:"H:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY \u0e40\u0e27\u0e25\u0e32 H:mm", 
  LLLL:"\u0e27\u0e31\u0e19dddd\u0e17\u0e35\u0e48 D MMMM YYYY \u0e40\u0e27\u0e25\u0e32 H:mm"}, meridiemParse:/\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07|\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07/, isPM:function(input) {
    return input === "\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07";
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07";
    } else {
      return "\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07";
    }
  }, calendar:{sameDay:"[\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT", nextDay:"[\u0e1e\u0e23\u0e38\u0e48\u0e07\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT", nextWeek:"dddd[\u0e2b\u0e19\u0e49\u0e32 \u0e40\u0e27\u0e25\u0e32] LT", lastDay:"[\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e27\u0e32\u0e19\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT", lastWeek:"[\u0e27\u0e31\u0e19]dddd[\u0e17\u0e35\u0e48\u0e41\u0e25\u0e49\u0e27 \u0e40\u0e27\u0e25\u0e32] LT", sameElse:"L"}, relativeTime:{future:"\u0e2d\u0e35\u0e01 %s", 
  past:"%s\u0e17\u0e35\u0e48\u0e41\u0e25\u0e49\u0e27", s:"\u0e44\u0e21\u0e48\u0e01\u0e35\u0e48\u0e27\u0e34\u0e19\u0e32\u0e17\u0e35", ss:"%d \u0e27\u0e34\u0e19\u0e32\u0e17\u0e35", m:"1 \u0e19\u0e32\u0e17\u0e35", mm:"%d \u0e19\u0e32\u0e17\u0e35", h:"1 \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07", hh:"%d \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07", d:"1 \u0e27\u0e31\u0e19", dd:"%d \u0e27\u0e31\u0e19", M:"1 \u0e40\u0e14\u0e37\u0e2d\u0e19", MM:"%d \u0e40\u0e14\u0e37\u0e2d\u0e19", y:"1 \u0e1b\u0e35", yy:"%d \u0e1b\u0e35"}});
  hooks.defineLocale("tl-ph", {months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"), monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"), weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"), weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"), weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"MM/D/YYYY", LL:"MMMM D, YYYY", LLL:"MMMM D, YYYY HH:mm", LLLL:"dddd, MMMM DD, YYYY HH:mm"}, 
  calendar:{sameDay:"LT [ngayong araw]", nextDay:"[Bukas ng] LT", nextWeek:"LT [sa susunod na] dddd", lastDay:"LT [kahapon]", lastWeek:"LT [noong nakaraang] dddd", sameElse:"L"}, relativeTime:{future:"sa loob ng %s", past:"%s ang nakalipas", s:"ilang segundo", ss:"%d segundo", m:"isang minuto", mm:"%d minuto", h:"isang oras", hh:"%d oras", d:"isang araw", dd:"%d araw", M:"isang buwan", MM:"%d buwan", y:"isang taon", yy:"%d taon"}, dayOfMonthOrdinalParse:/\d{1,2}/, ordinal:function(number) {
    return number;
  }, week:{dow:1, doy:4}});
  var numbersNouns = "pagh_wa\u2019_cha\u2019_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");
  function translateFuture(output) {
    var time = output;
    time = output.indexOf("jaj") !== -1 ? time.slice(0, -3) + "leS" : output.indexOf("jar") !== -1 ? time.slice(0, -3) + "waQ" : output.indexOf("DIS") !== -1 ? time.slice(0, -3) + "nem" : time + " pIq";
    return time;
  }
  function translatePast(output) {
    var time = output;
    time = output.indexOf("jaj") !== -1 ? time.slice(0, -3) + "Hu\u2019" : output.indexOf("jar") !== -1 ? time.slice(0, -3) + "wen" : output.indexOf("DIS") !== -1 ? time.slice(0, -3) + "ben" : time + " ret";
    return time;
  }
  function translate$a(number, withoutSuffix, string, isFuture) {
    var numberNoun = numberAsNoun(number);
    switch(string) {
      case "ss":
        return numberNoun + " lup";
      case "mm":
        return numberNoun + " tup";
      case "hh":
        return numberNoun + " rep";
      case "dd":
        return numberNoun + " jaj";
      case "MM":
        return numberNoun + " jar";
      case "yy":
        return numberNoun + " DIS";
    }
  }
  function numberAsNoun(number) {
    var hundred = Math.floor(number % 1000 / 100), ten = Math.floor(number % 100 / 10), one = number % 10, word = "";
    if (hundred > 0) {
      word += numbersNouns[hundred] + "vatlh";
    }
    if (ten > 0) {
      word += (word !== "" ? " " : "") + numbersNouns[ten] + "maH";
    }
    if (one > 0) {
      word += (word !== "" ? " " : "") + numbersNouns[one];
    }
    return word === "" ? "pagh" : word;
  }
  hooks.defineLocale("tlh", {months:"tera\u2019 jar wa\u2019_tera\u2019 jar cha\u2019_tera\u2019 jar wej_tera\u2019 jar loS_tera\u2019 jar vagh_tera\u2019 jar jav_tera\u2019 jar Soch_tera\u2019 jar chorgh_tera\u2019 jar Hut_tera\u2019 jar wa\u2019maH_tera\u2019 jar wa\u2019maH wa\u2019_tera\u2019 jar wa\u2019maH cha\u2019".split("_"), monthsShort:"jar wa\u2019_jar cha\u2019_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa\u2019maH_jar wa\u2019maH wa\u2019_jar wa\u2019maH cha\u2019".split("_"), 
  monthsParseExact:true, weekdays:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), weekdaysShort:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), weekdaysMin:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[DaHjaj] LT", nextDay:"[wa\u2019leS] LT", nextWeek:"LLL", lastDay:"[wa\u2019Hu\u2019] LT", 
  lastWeek:"LLL", sameElse:"L"}, relativeTime:{future:translateFuture, past:translatePast, s:"puS lup", ss:translate$a, m:"wa\u2019 tup", mm:translate$a, h:"wa\u2019 rep", hh:translate$a, d:"wa\u2019 jaj", dd:translate$a, M:"wa\u2019 jar", MM:translate$a, y:"wa\u2019 DIS", yy:translate$a}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  var suffixes$4 = {1:"'inci", 5:"'inci", 8:"'inci", 70:"'inci", 80:"'inci", 2:"'nci", 7:"'nci", 20:"'nci", 50:"'nci", 3:"'\u00fcnc\u00fc", 4:"'\u00fcnc\u00fc", 100:"'\u00fcnc\u00fc", 6:"'nc\u0131", 9:"'uncu", 10:"'uncu", 30:"'uncu", 60:"'\u0131nc\u0131", 90:"'\u0131nc\u0131"};
  hooks.defineLocale("tr", {months:"Ocak_\u015eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011fustos_Eyl\u00fcl_Ekim_Kas\u0131m_Aral\u0131k".split("_"), monthsShort:"Oca_\u015eub_Mar_Nis_May_Haz_Tem_A\u011fu_Eyl_Eki_Kas_Ara".split("_"), weekdays:"Pazar_Pazartesi_Sal\u0131_\u00c7ar\u015famba_Per\u015fembe_Cuma_Cumartesi".split("_"), weekdaysShort:"Paz_Pts_Sal_\u00c7ar_Per_Cum_Cts".split("_"), weekdaysMin:"Pz_Pt_Sa_\u00c7a_Pe_Cu_Ct".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", 
  LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[bug\u00fcn saat] LT", nextDay:"[yar\u0131n saat] LT", nextWeek:"[gelecek] dddd [saat] LT", lastDay:"[d\u00fcn] LT", lastWeek:"[ge\u00e7en] dddd [saat] LT", sameElse:"L"}, relativeTime:{future:"%s sonra", past:"%s \u00f6nce", s:"birka\u00e7 saniye", ss:"%d saniye", m:"bir dakika", mm:"%d dakika", h:"bir saat", hh:"%d saat", d:"bir g\u00fcn", dd:"%d g\u00fcn", M:"bir ay", MM:"%d ay", y:"bir y\u0131l", 
  yy:"%d y\u0131l"}, ordinal:function(number, period) {
    switch(period) {
      case "d":
      case "D":
      case "Do":
      case "DD":
        return number;
      default:
        if (number === 0) {
          return number + "'\u0131nc\u0131";
        }
        var a = number % 10, b = number % 100 - a, c = number >= 100 ? 100 : null;
        return number + (suffixes$4[a] || suffixes$4[b] || suffixes$4[c]);
    }
  }, week:{dow:1, doy:7}});
  hooks.defineLocale("tzl", {months:"Januar_Fevraglh_Mar\u00e7_Avr\u00efu_Mai_G\u00fcn_Julia_Guscht_Setemvar_Listop\u00e4ts_Noemvar_Zecemvar".split("_"), monthsShort:"Jan_Fev_Mar_Avr_Mai_G\u00fcn_Jul_Gus_Set_Lis_Noe_Zec".split("_"), weekdays:"S\u00faladi_L\u00fane\u00e7i_Maitzi_M\u00e1rcuri_Xh\u00faadi_Vi\u00e9ner\u00e7i_S\u00e1turi".split("_"), weekdaysShort:"S\u00fal_L\u00fan_Mai_M\u00e1r_Xh\u00fa_Vi\u00e9_S\u00e1t".split("_"), weekdaysMin:"S\u00fa_L\u00fa_Ma_M\u00e1_Xh_Vi_S\u00e1".split("_"), 
  longDateFormat:{LT:"HH.mm", LTS:"HH.mm.ss", L:"DD.MM.YYYY", LL:"D. MMMM [dallas] YYYY", LLL:"D. MMMM [dallas] YYYY HH.mm", LLLL:"dddd, [li] D. MMMM [dallas] YYYY HH.mm"}, meridiemParse:/d'o|d'a/i, isPM:function(input) {
    return "d'o" === input.toLowerCase();
  }, meridiem:function(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? "d'o" : "D'O";
    } else {
      return isLower ? "d'a" : "D'A";
    }
  }, calendar:{sameDay:"[oxhi \u00e0] LT", nextDay:"[dem\u00e0 \u00e0] LT", nextWeek:"dddd [\u00e0] LT", lastDay:"[ieiri \u00e0] LT", lastWeek:"[s\u00fcr el] dddd [lasteu \u00e0] LT", sameElse:"L"}, relativeTime:{future:"osprei %s", past:"ja%s", s:processRelativeTime$7, ss:processRelativeTime$7, m:processRelativeTime$7, mm:processRelativeTime$7, h:processRelativeTime$7, hh:processRelativeTime$7, d:processRelativeTime$7, dd:processRelativeTime$7, M:processRelativeTime$7, MM:processRelativeTime$7, 
  y:processRelativeTime$7, yy:processRelativeTime$7}, dayOfMonthOrdinalParse:/\d{1,2}\./, ordinal:"%d.", week:{dow:1, doy:4}});
  function processRelativeTime$7(number, withoutSuffix, key, isFuture) {
    var format = {"s":["viensas secunds", "'iensas secunds"], "ss":[number + " secunds", "" + number + " secunds"], "m":["'n m\u00edut", "'iens m\u00edut"], "mm":[number + " m\u00eduts", "" + number + " m\u00eduts"], "h":["'n \u00feora", "'iensa \u00feora"], "hh":[number + " \u00feoras", "" + number + " \u00feoras"], "d":["'n ziua", "'iensa ziua"], "dd":[number + " ziuas", "" + number + " ziuas"], "M":["'n mes", "'iens mes"], "MM":[number + " mesen", "" + number + " mesen"], "y":["'n ar", "'iens ar"], 
    "yy":[number + " ars", "" + number + " ars"]};
    return isFuture ? format[key][0] : withoutSuffix ? format[key][0] : format[key][1];
  }
  hooks.defineLocale("tzm-latn", {months:"innayr_br\u02e4ayr\u02e4_mar\u02e4s\u02e4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02e4wbr\u02e4_nwwanbir_dwjnbir".split("_"), monthsShort:"innayr_br\u02e4ayr\u02e4_mar\u02e4s\u02e4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02e4wbr\u02e4_nwwanbir_dwjnbir".split("_"), weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"), weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"), weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"), 
  longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[asdkh g] LT", nextDay:"[aska g] LT", nextWeek:"dddd [g] LT", lastDay:"[assant g] LT", lastWeek:"dddd [g] LT", sameElse:"L"}, relativeTime:{future:"dadkh s yan %s", past:"yan %s", s:"imik", ss:"%d imik", m:"minu\u1e0d", mm:"%d minu\u1e0d", h:"sa\u025ba", hh:"%d tassa\u025bin", d:"ass", dd:"%d ossan", M:"ayowr", MM:"%d iyyirn", y:"asgas", yy:"%d isgasn"}, 
  week:{dow:6, doy:12}});
  hooks.defineLocale("tzm", {months:"\u2d49\u2d4f\u2d4f\u2d30\u2d62\u2d54_\u2d31\u2d55\u2d30\u2d62\u2d55_\u2d4e\u2d30\u2d55\u2d5a_\u2d49\u2d31\u2d54\u2d49\u2d54_\u2d4e\u2d30\u2d62\u2d62\u2d53_\u2d62\u2d53\u2d4f\u2d62\u2d53_\u2d62\u2d53\u2d4d\u2d62\u2d53\u2d63_\u2d56\u2d53\u2d5b\u2d5c_\u2d5b\u2d53\u2d5c\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d3d\u2d5f\u2d53\u2d31\u2d55_\u2d4f\u2d53\u2d61\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d37\u2d53\u2d4a\u2d4f\u2d31\u2d49\u2d54".split("_"), monthsShort:"\u2d49\u2d4f\u2d4f\u2d30\u2d62\u2d54_\u2d31\u2d55\u2d30\u2d62\u2d55_\u2d4e\u2d30\u2d55\u2d5a_\u2d49\u2d31\u2d54\u2d49\u2d54_\u2d4e\u2d30\u2d62\u2d62\u2d53_\u2d62\u2d53\u2d4f\u2d62\u2d53_\u2d62\u2d53\u2d4d\u2d62\u2d53\u2d63_\u2d56\u2d53\u2d5b\u2d5c_\u2d5b\u2d53\u2d5c\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d3d\u2d5f\u2d53\u2d31\u2d55_\u2d4f\u2d53\u2d61\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d37\u2d53\u2d4a\u2d4f\u2d31\u2d49\u2d54".split("_"), 
  weekdays:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"), weekdaysShort:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"), 
  weekdaysMin:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd D MMMM YYYY HH:mm"}, calendar:{sameDay:"[\u2d30\u2d59\u2d37\u2d45 \u2d34] LT", nextDay:"[\u2d30\u2d59\u2d3d\u2d30 \u2d34] LT", 
  nextWeek:"dddd [\u2d34] LT", lastDay:"[\u2d30\u2d5a\u2d30\u2d4f\u2d5c \u2d34] LT", lastWeek:"dddd [\u2d34] LT", sameElse:"L"}, relativeTime:{future:"\u2d37\u2d30\u2d37\u2d45 \u2d59 \u2d62\u2d30\u2d4f %s", past:"\u2d62\u2d30\u2d4f %s", s:"\u2d49\u2d4e\u2d49\u2d3d", ss:"%d \u2d49\u2d4e\u2d49\u2d3d", m:"\u2d4e\u2d49\u2d4f\u2d53\u2d3a", mm:"%d \u2d4e\u2d49\u2d4f\u2d53\u2d3a", h:"\u2d59\u2d30\u2d44\u2d30", hh:"%d \u2d5c\u2d30\u2d59\u2d59\u2d30\u2d44\u2d49\u2d4f", d:"\u2d30\u2d59\u2d59", dd:"%d o\u2d59\u2d59\u2d30\u2d4f", 
  M:"\u2d30\u2d62o\u2d53\u2d54", MM:"%d \u2d49\u2d62\u2d62\u2d49\u2d54\u2d4f", y:"\u2d30\u2d59\u2d33\u2d30\u2d59", yy:"%d \u2d49\u2d59\u2d33\u2d30\u2d59\u2d4f"}, week:{dow:6, doy:12}});
  hooks.defineLocale("ug-cn", {months:"\u064a\u0627\u0646\u06cb\u0627\u0631_\u0641\u06d0\u06cb\u0631\u0627\u0644_\u0645\u0627\u0631\u062a_\u0626\u0627\u067e\u0631\u06d0\u0644_\u0645\u0627\u064a_\u0626\u0649\u064a\u06c7\u0646_\u0626\u0649\u064a\u06c7\u0644_\u0626\u0627\u06cb\u063a\u06c7\u0633\u062a_\u0633\u06d0\u0646\u062a\u06d5\u0628\u0649\u0631_\u0626\u06c6\u0643\u062a\u06d5\u0628\u0649\u0631_\u0646\u0648\u064a\u0627\u0628\u0649\u0631_\u062f\u06d0\u0643\u0627\u0628\u0649\u0631".split("_"), monthsShort:"\u064a\u0627\u0646\u06cb\u0627\u0631_\u0641\u06d0\u06cb\u0631\u0627\u0644_\u0645\u0627\u0631\u062a_\u0626\u0627\u067e\u0631\u06d0\u0644_\u0645\u0627\u064a_\u0626\u0649\u064a\u06c7\u0646_\u0626\u0649\u064a\u06c7\u0644_\u0626\u0627\u06cb\u063a\u06c7\u0633\u062a_\u0633\u06d0\u0646\u062a\u06d5\u0628\u0649\u0631_\u0626\u06c6\u0643\u062a\u06d5\u0628\u0649\u0631_\u0646\u0648\u064a\u0627\u0628\u0649\u0631_\u062f\u06d0\u0643\u0627\u0628\u0649\u0631".split("_"), 
  weekdays:"\u064a\u06d5\u0643\u0634\u06d5\u0646\u0628\u06d5_\u062f\u06c8\u0634\u06d5\u0646\u0628\u06d5_\u0633\u06d5\u064a\u0634\u06d5\u0646\u0628\u06d5_\u0686\u0627\u0631\u0634\u06d5\u0646\u0628\u06d5_\u067e\u06d5\u064a\u0634\u06d5\u0646\u0628\u06d5_\u062c\u06c8\u0645\u06d5_\u0634\u06d5\u0646\u0628\u06d5".split("_"), weekdaysShort:"\u064a\u06d5_\u062f\u06c8_\u0633\u06d5_\u0686\u0627_\u067e\u06d5_\u062c\u06c8_\u0634\u06d5".split("_"), weekdaysMin:"\u064a\u06d5_\u062f\u06c8_\u0633\u06d5_\u0686\u0627_\u067e\u06d5_\u062c\u06c8_\u0634\u06d5".split("_"), 
  longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"YYYY-MM-DD", LL:"YYYY-\u064a\u0649\u0644\u0649M-\u0626\u0627\u064a\u0646\u0649\u06adD-\u0643\u06c8\u0646\u0649", LLL:"YYYY-\u064a\u0649\u0644\u0649M-\u0626\u0627\u064a\u0646\u0649\u06adD-\u0643\u06c8\u0646\u0649\u060c HH:mm", LLLL:"dddd\u060c YYYY-\u064a\u0649\u0644\u0649M-\u0626\u0627\u064a\u0646\u0649\u06adD-\u0643\u06c8\u0646\u0649\u060c HH:mm"}, meridiemParse:/\u064a\u06d0\u0631\u0649\u0645 \u0643\u06d0\u0686\u06d5|\u0633\u06d5\u06be\u06d5\u0631|\u0686\u06c8\u0634\u062a\u0649\u0646 \u0628\u06c7\u0631\u06c7\u0646|\u0686\u06c8\u0634|\u0686\u06c8\u0634\u062a\u0649\u0646 \u0643\u06d0\u064a\u0649\u0646|\u0643\u06d5\u0686/, 
  meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u064a\u06d0\u0631\u0649\u0645 \u0643\u06d0\u0686\u06d5" || meridiem === "\u0633\u06d5\u06be\u06d5\u0631" || meridiem === "\u0686\u06c8\u0634\u062a\u0649\u0646 \u0628\u06c7\u0631\u06c7\u0646") {
      return hour;
    } else {
      if (meridiem === "\u0686\u06c8\u0634\u062a\u0649\u0646 \u0643\u06d0\u064a\u0649\u0646" || meridiem === "\u0643\u06d5\u0686") {
        return hour + 12;
      } else {
        return hour >= 11 ? hour : hour + 12;
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    var hm = hour * 100 + minute;
    if (hm < 600) {
      return "\u064a\u06d0\u0631\u0649\u0645 \u0643\u06d0\u0686\u06d5";
    } else {
      if (hm < 900) {
        return "\u0633\u06d5\u06be\u06d5\u0631";
      } else {
        if (hm < 1130) {
          return "\u0686\u06c8\u0634\u062a\u0649\u0646 \u0628\u06c7\u0631\u06c7\u0646";
        } else {
          if (hm < 1230) {
            return "\u0686\u06c8\u0634";
          } else {
            if (hm < 1800) {
              return "\u0686\u06c8\u0634\u062a\u0649\u0646 \u0643\u06d0\u064a\u0649\u0646";
            } else {
              return "\u0643\u06d5\u0686";
            }
          }
        }
      }
    }
  }, calendar:{sameDay:"[\u0628\u06c8\u06af\u06c8\u0646 \u0633\u0627\u0626\u06d5\u062a] LT", nextDay:"[\u0626\u06d5\u062a\u06d5 \u0633\u0627\u0626\u06d5\u062a] LT", nextWeek:"[\u0643\u06d0\u0644\u06d5\u0631\u0643\u0649] dddd [\u0633\u0627\u0626\u06d5\u062a] LT", lastDay:"[\u062a\u06c6\u0646\u06c8\u06af\u06c8\u0646] LT", lastWeek:"[\u0626\u0627\u0644\u062f\u0649\u0646\u0642\u0649] dddd [\u0633\u0627\u0626\u06d5\u062a] LT", sameElse:"L"}, relativeTime:{future:"%s \u0643\u06d0\u064a\u0649\u0646", past:"%s \u0628\u06c7\u0631\u06c7\u0646", 
  s:"\u0646\u06d5\u0686\u0686\u06d5 \u0633\u06d0\u0643\u0648\u0646\u062a", ss:"%d \u0633\u06d0\u0643\u0648\u0646\u062a", m:"\u0628\u0649\u0631 \u0645\u0649\u0646\u06c7\u062a", mm:"%d \u0645\u0649\u0646\u06c7\u062a", h:"\u0628\u0649\u0631 \u0633\u0627\u0626\u06d5\u062a", hh:"%d \u0633\u0627\u0626\u06d5\u062a", d:"\u0628\u0649\u0631 \u0643\u06c8\u0646", dd:"%d \u0643\u06c8\u0646", M:"\u0628\u0649\u0631 \u0626\u0627\u064a", MM:"%d \u0626\u0627\u064a", y:"\u0628\u0649\u0631 \u064a\u0649\u0644", yy:"%d \u064a\u0649\u0644"}, 
  dayOfMonthOrdinalParse:/\d{1,2}(-\u0643\u06c8\u0646\u0649|-\u0626\u0627\u064a|-\u06be\u06d5\u067e\u062a\u06d5)/, ordinal:function(number, period) {
    switch(period) {
      case "d":
      case "D":
      case "DDD":
        return number + "-\u0643\u06c8\u0646\u0649";
      case "w":
      case "W":
        return number + "-\u06be\u06d5\u067e\u062a\u06d5";
      default:
        return number;
    }
  }, preparse:function(string) {
    return string.replace(/\u060c/g, ",");
  }, postformat:function(string) {
    return string.replace(/,/g, "\u060c");
  }, week:{dow:1, doy:7}});
  function plural$6(word, num) {
    var forms = word.split("_");
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
  }
  function relativeTimeWithPlural$4(number, withoutSuffix, key) {
    var format = {"ss":withoutSuffix ? "\u0441\u0435\u043a\u0443\u043d\u0434\u0430_\u0441\u0435\u043a\u0443\u043d\u0434\u0438_\u0441\u0435\u043a\u0443\u043d\u0434" : "\u0441\u0435\u043a\u0443\u043d\u0434\u0443_\u0441\u0435\u043a\u0443\u043d\u0434\u0438_\u0441\u0435\u043a\u0443\u043d\u0434", "mm":withoutSuffix ? "\u0445\u0432\u0438\u043b\u0438\u043d\u0430_\u0445\u0432\u0438\u043b\u0438\u043d\u0438_\u0445\u0432\u0438\u043b\u0438\u043d" : "\u0445\u0432\u0438\u043b\u0438\u043d\u0443_\u0445\u0432\u0438\u043b\u0438\u043d\u0438_\u0445\u0432\u0438\u043b\u0438\u043d", 
    "hh":withoutSuffix ? "\u0433\u043e\u0434\u0438\u043d\u0430_\u0433\u043e\u0434\u0438\u043d\u0438_\u0433\u043e\u0434\u0438\u043d" : "\u0433\u043e\u0434\u0438\u043d\u0443_\u0433\u043e\u0434\u0438\u043d\u0438_\u0433\u043e\u0434\u0438\u043d", "dd":"\u0434\u0435\u043d\u044c_\u0434\u043d\u0456_\u0434\u043d\u0456\u0432", "MM":"\u043c\u0456\u0441\u044f\u0446\u044c_\u043c\u0456\u0441\u044f\u0446\u0456_\u043c\u0456\u0441\u044f\u0446\u0456\u0432", "yy":"\u0440\u0456\u043a_\u0440\u043e\u043a\u0438_\u0440\u043e\u043a\u0456\u0432"};
    if (key === "m") {
      return withoutSuffix ? "\u0445\u0432\u0438\u043b\u0438\u043d\u0430" : "\u0445\u0432\u0438\u043b\u0438\u043d\u0443";
    } else {
      if (key === "h") {
        return withoutSuffix ? "\u0433\u043e\u0434\u0438\u043d\u0430" : "\u0433\u043e\u0434\u0438\u043d\u0443";
      } else {
        return number + " " + plural$6(format[key], +number);
      }
    }
  }
  function weekdaysCaseReplace(m, format) {
    var weekdays = {"nominative":"\u043d\u0435\u0434\u0456\u043b\u044f_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a_\u0432\u0456\u0432\u0442\u043e\u0440\u043e\u043a_\u0441\u0435\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u044f_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"), "accusative":"\u043d\u0435\u0434\u0456\u043b\u044e_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a_\u0432\u0456\u0432\u0442\u043e\u0440\u043e\u043a_\u0441\u0435\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u044e_\u0441\u0443\u0431\u043e\u0442\u0443".split("_"), 
    "genitive":"\u043d\u0435\u0434\u0456\u043b\u0456_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043a\u0430_\u0432\u0456\u0432\u0442\u043e\u0440\u043a\u0430_\u0441\u0435\u0440\u0435\u0434\u0438_\u0447\u0435\u0442\u0432\u0435\u0440\u0433\u0430_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u0456_\u0441\u0443\u0431\u043e\u0442\u0438".split("_")};
    if (m === true) {
      return weekdays["nominative"].slice(1, 7).concat(weekdays["nominative"].slice(0, 1));
    }
    if (!m) {
      return weekdays["nominative"];
    }
    var nounCase = /(\[[\u0412\u0432\u0423\u0443]\]) ?dddd/.test(format) ? "accusative" : /\[?(?:\u043c\u0438\u043d\u0443\u043b\u043e\u0457|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u043e\u0457)? ?\] ?dddd/.test(format) ? "genitive" : "nominative";
    return weekdays[nounCase][m.day()];
  }
  function processHoursFunction(str) {
    return function() {
      return str + "\u043e" + (this.hours() === 11 ? "\u0431" : "") + "] LT";
    };
  }
  hooks.defineLocale("uk", {months:{"format":"\u0441\u0456\u0447\u043d\u044f_\u043b\u044e\u0442\u043e\u0433\u043e_\u0431\u0435\u0440\u0435\u0437\u043d\u044f_\u043a\u0432\u0456\u0442\u043d\u044f_\u0442\u0440\u0430\u0432\u043d\u044f_\u0447\u0435\u0440\u0432\u043d\u044f_\u043b\u0438\u043f\u043d\u044f_\u0441\u0435\u0440\u043f\u043d\u044f_\u0432\u0435\u0440\u0435\u0441\u043d\u044f_\u0436\u043e\u0432\u0442\u043d\u044f_\u043b\u0438\u0441\u0442\u043e\u043f\u0430\u0434\u0430_\u0433\u0440\u0443\u0434\u043d\u044f".split("_"), 
  "standalone":"\u0441\u0456\u0447\u0435\u043d\u044c_\u043b\u044e\u0442\u0438\u0439_\u0431\u0435\u0440\u0435\u0437\u0435\u043d\u044c_\u043a\u0432\u0456\u0442\u0435\u043d\u044c_\u0442\u0440\u0430\u0432\u0435\u043d\u044c_\u0447\u0435\u0440\u0432\u0435\u043d\u044c_\u043b\u0438\u043f\u0435\u043d\u044c_\u0441\u0435\u0440\u043f\u0435\u043d\u044c_\u0432\u0435\u0440\u0435\u0441\u0435\u043d\u044c_\u0436\u043e\u0432\u0442\u0435\u043d\u044c_\u043b\u0438\u0441\u0442\u043e\u043f\u0430\u0434_\u0433\u0440\u0443\u0434\u0435\u043d\u044c".split("_")}, 
  monthsShort:"\u0441\u0456\u0447_\u043b\u044e\u0442_\u0431\u0435\u0440_\u043a\u0432\u0456\u0442_\u0442\u0440\u0430\u0432_\u0447\u0435\u0440\u0432_\u043b\u0438\u043f_\u0441\u0435\u0440\u043f_\u0432\u0435\u0440_\u0436\u043e\u0432\u0442_\u043b\u0438\u0441\u0442_\u0433\u0440\u0443\u0434".split("_"), weekdays:weekdaysCaseReplace, weekdaysShort:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"), weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"), 
  longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD.MM.YYYY", LL:"D MMMM YYYY \u0440.", LLL:"D MMMM YYYY \u0440., HH:mm", LLLL:"dddd, D MMMM YYYY \u0440., HH:mm"}, calendar:{sameDay:processHoursFunction("[\u0421\u044c\u043e\u0433\u043e\u0434\u043d\u0456 "), nextDay:processHoursFunction("[\u0417\u0430\u0432\u0442\u0440\u0430 "), lastDay:processHoursFunction("[\u0412\u0447\u043e\u0440\u0430 "), nextWeek:processHoursFunction("[\u0423] dddd ["), lastWeek:function() {
    switch(this.day()) {
      case 0:
      case 3:
      case 5:
      case 6:
        return processHoursFunction("[\u041c\u0438\u043d\u0443\u043b\u043e\u0457] dddd [").call(this);
      case 1:
      case 2:
      case 4:
        return processHoursFunction("[\u041c\u0438\u043d\u0443\u043b\u043e\u0433\u043e] dddd [").call(this);
    }
  }, sameElse:"L"}, relativeTime:{future:"\u0437\u0430 %s", past:"%s \u0442\u043e\u043c\u0443", s:"\u0434\u0435\u043a\u0456\u043b\u044c\u043a\u0430 \u0441\u0435\u043a\u0443\u043d\u0434", ss:relativeTimeWithPlural$4, m:relativeTimeWithPlural$4, mm:relativeTimeWithPlural$4, h:"\u0433\u043e\u0434\u0438\u043d\u0443", hh:relativeTimeWithPlural$4, d:"\u0434\u0435\u043d\u044c", dd:relativeTimeWithPlural$4, M:"\u043c\u0456\u0441\u044f\u0446\u044c", MM:relativeTimeWithPlural$4, y:"\u0440\u0456\u043a", yy:relativeTimeWithPlural$4}, 
  meridiemParse:/\u043d\u043e\u0447\u0456|\u0440\u0430\u043d\u043a\u0443|\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430/, isPM:function(input) {
    return /^(\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430)$/.test(input);
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 4) {
      return "\u043d\u043e\u0447\u0456";
    } else {
      if (hour < 12) {
        return "\u0440\u0430\u043d\u043a\u0443";
      } else {
        if (hour < 17) {
          return "\u0434\u043d\u044f";
        } else {
          return "\u0432\u0435\u0447\u043e\u0440\u0430";
        }
      }
    }
  }, dayOfMonthOrdinalParse:/\d{1,2}-(\u0439|\u0433\u043e)/, ordinal:function(number, period) {
    switch(period) {
      case "M":
      case "d":
      case "DDD":
      case "w":
      case "W":
        return number + "-\u0439";
      case "D":
        return number + "-\u0433\u043e";
      default:
        return number;
    }
  }, week:{dow:1, doy:7}});
  var months$a = ["\u062c\u0646\u0648\u0631\u06cc", "\u0641\u0631\u0648\u0631\u06cc", "\u0645\u0627\u0631\u0686", "\u0627\u067e\u0631\u06cc\u0644", "\u0645\u0626\u06cc", "\u062c\u0648\u0646", "\u062c\u0648\u0644\u0627\u0626\u06cc", "\u0627\u06af\u0633\u062a", "\u0633\u062a\u0645\u0628\u0631", "\u0627\u06a9\u062a\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062f\u0633\u0645\u0628\u0631"];
  var days$2 = ["\u0627\u062a\u0648\u0627\u0631", "\u067e\u06cc\u0631", "\u0645\u0646\u06af\u0644", "\u0628\u062f\u06be", "\u062c\u0645\u0639\u0631\u0627\u062a", "\u062c\u0645\u0639\u06c1", "\u06c1\u0641\u062a\u06c1"];
  hooks.defineLocale("ur", {months:months$a, monthsShort:months$a, weekdays:days$2, weekdaysShort:days$2, weekdaysMin:days$2, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd\u060c D MMMM YYYY HH:mm"}, meridiemParse:/\u0635\u0628\u062d|\u0634\u0627\u0645/, isPM:function(input) {
    return "\u0634\u0627\u0645" === input;
  }, meridiem:function(hour, minute, isLower) {
    if (hour < 12) {
      return "\u0635\u0628\u062d";
    }
    return "\u0634\u0627\u0645";
  }, calendar:{sameDay:"[\u0622\u062c \u0628\u0648\u0642\u062a] LT", nextDay:"[\u06a9\u0644 \u0628\u0648\u0642\u062a] LT", nextWeek:"dddd [\u0628\u0648\u0642\u062a] LT", lastDay:"[\u06af\u0630\u0634\u062a\u06c1 \u0631\u0648\u0632 \u0628\u0648\u0642\u062a] LT", lastWeek:"[\u06af\u0630\u0634\u062a\u06c1] dddd [\u0628\u0648\u0642\u062a] LT", sameElse:"L"}, relativeTime:{future:"%s \u0628\u0639\u062f", past:"%s \u0642\u0628\u0644", s:"\u0686\u0646\u062f \u0633\u06cc\u06a9\u0646\u0688", ss:"%d \u0633\u06cc\u06a9\u0646\u0688", 
  m:"\u0627\u06cc\u06a9 \u0645\u0646\u0679", mm:"%d \u0645\u0646\u0679", h:"\u0627\u06cc\u06a9 \u06af\u06be\u0646\u0679\u06c1", hh:"%d \u06af\u06be\u0646\u0679\u06d2", d:"\u0627\u06cc\u06a9 \u062f\u0646", dd:"%d \u062f\u0646", M:"\u0627\u06cc\u06a9 \u0645\u0627\u06c1", MM:"%d \u0645\u0627\u06c1", y:"\u0627\u06cc\u06a9 \u0633\u0627\u0644", yy:"%d \u0633\u0627\u0644"}, preparse:function(string) {
    return string.replace(/\u060c/g, ",");
  }, postformat:function(string) {
    return string.replace(/,/g, "\u060c");
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("uz-latn", {months:"Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"), monthsShort:"Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"), weekdays:"Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"), weekdaysShort:"Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"), weekdaysMin:"Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", 
  LLLL:"D MMMM YYYY, dddd HH:mm"}, calendar:{sameDay:"[Bugun soat] LT [da]", nextDay:"[Ertaga] LT [da]", nextWeek:"dddd [kuni soat] LT [da]", lastDay:"[Kecha soat] LT [da]", lastWeek:"[O'tgan] dddd [kuni soat] LT [da]", sameElse:"L"}, relativeTime:{future:"Yaqin %s ichida", past:"Bir necha %s oldin", s:"soniya", ss:"%d soniya", m:"bir daqiqa", mm:"%d daqiqa", h:"bir soat", hh:"%d soat", d:"bir kun", dd:"%d kun", M:"bir oy", MM:"%d oy", y:"bir yil", yy:"%d yil"}, week:{dow:1, doy:7}});
  hooks.defineLocale("uz", {months:"\u044f\u043d\u0432\u0430\u0440_\u0444\u0435\u0432\u0440\u0430\u043b_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440_\u043e\u043a\u0442\u044f\u0431\u0440_\u043d\u043e\u044f\u0431\u0440_\u0434\u0435\u043a\u0430\u0431\u0440".split("_"), monthsShort:"\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_"), 
  weekdays:"\u042f\u043a\u0448\u0430\u043d\u0431\u0430_\u0414\u0443\u0448\u0430\u043d\u0431\u0430_\u0421\u0435\u0448\u0430\u043d\u0431\u0430_\u0427\u043e\u0440\u0448\u0430\u043d\u0431\u0430_\u041f\u0430\u0439\u0448\u0430\u043d\u0431\u0430_\u0416\u0443\u043c\u0430_\u0428\u0430\u043d\u0431\u0430".split("_"), weekdaysShort:"\u042f\u043a\u0448_\u0414\u0443\u0448_\u0421\u0435\u0448_\u0427\u043e\u0440_\u041f\u0430\u0439_\u0416\u0443\u043c_\u0428\u0430\u043d".split("_"), weekdaysMin:"\u042f\u043a_\u0414\u0443_\u0421\u0435_\u0427\u043e_\u041f\u0430_\u0416\u0443_\u0428\u0430".split("_"), 
  longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"D MMMM YYYY, dddd HH:mm"}, calendar:{sameDay:"[\u0411\u0443\u0433\u0443\u043d \u0441\u043e\u0430\u0442] LT [\u0434\u0430]", nextDay:"[\u042d\u0440\u0442\u0430\u0433\u0430] LT [\u0434\u0430]", nextWeek:"dddd [\u043a\u0443\u043d\u0438 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]", lastDay:"[\u041a\u0435\u0447\u0430 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]", lastWeek:"[\u0423\u0442\u0433\u0430\u043d] dddd [\u043a\u0443\u043d\u0438 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]", 
  sameElse:"L"}, relativeTime:{future:"\u042f\u043a\u0438\u043d %s \u0438\u0447\u0438\u0434\u0430", past:"\u0411\u0438\u0440 \u043d\u0435\u0447\u0430 %s \u043e\u043b\u0434\u0438\u043d", s:"\u0444\u0443\u0440\u0441\u0430\u0442", ss:"%d \u0444\u0443\u0440\u0441\u0430\u0442", m:"\u0431\u0438\u0440 \u0434\u0430\u043a\u0438\u043a\u0430", mm:"%d \u0434\u0430\u043a\u0438\u043a\u0430", h:"\u0431\u0438\u0440 \u0441\u043e\u0430\u0442", hh:"%d \u0441\u043e\u0430\u0442", d:"\u0431\u0438\u0440 \u043a\u0443\u043d", 
  dd:"%d \u043a\u0443\u043d", M:"\u0431\u0438\u0440 \u043e\u0439", MM:"%d \u043e\u0439", y:"\u0431\u0438\u0440 \u0439\u0438\u043b", yy:"%d \u0439\u0438\u043b"}, week:{dow:1, doy:7}});
  hooks.defineLocale("vi", {months:"th\u00e1ng 1_th\u00e1ng 2_th\u00e1ng 3_th\u00e1ng 4_th\u00e1ng 5_th\u00e1ng 6_th\u00e1ng 7_th\u00e1ng 8_th\u00e1ng 9_th\u00e1ng 10_th\u00e1ng 11_th\u00e1ng 12".split("_"), monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"), monthsParseExact:true, weekdays:"ch\u1ee7 nh\u1eadt_th\u1ee9 hai_th\u1ee9 ba_th\u1ee9 t\u01b0_th\u1ee9 n\u0103m_th\u1ee9 s\u00e1u_th\u1ee9 b\u1ea3y".split("_"), weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"), 
  weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"), weekdaysParseExact:true, meridiemParse:/sa|ch/i, isPM:function(input) {
    return /^ch$/i.test(input);
  }, meridiem:function(hours, minutes, isLower) {
    if (hours < 12) {
      return isLower ? "sa" : "SA";
    } else {
      return isLower ? "ch" : "CH";
    }
  }, longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"DD/MM/YYYY", LL:"D MMMM [n\u0103m] YYYY", LLL:"D MMMM [n\u0103m] YYYY HH:mm", LLLL:"dddd, D MMMM [n\u0103m] YYYY HH:mm", l:"DD/M/YYYY", ll:"D MMM YYYY", lll:"D MMM YYYY HH:mm", llll:"ddd, D MMM YYYY HH:mm"}, calendar:{sameDay:"[H\u00f4m nay l\u00fac] LT", nextDay:"[Ng\u00e0y mai l\u00fac] LT", nextWeek:"dddd [tu\u1ea7n t\u1edbi l\u00fac] LT", lastDay:"[H\u00f4m qua l\u00fac] LT", lastWeek:"dddd [tu\u1ea7n r\u1ed3i l\u00fac] LT", sameElse:"L"}, relativeTime:{future:"%s t\u1edbi", 
  past:"%s tr\u01b0\u1edbc", s:"v\u00e0i gi\u00e2y", ss:"%d gi\u00e2y", m:"m\u1ed9t ph\u00fat", mm:"%d ph\u00fat", h:"m\u1ed9t gi\u1edd", hh:"%d gi\u1edd", d:"m\u1ed9t ng\u00e0y", dd:"%d ng\u00e0y", M:"m\u1ed9t th\u00e1ng", MM:"%d th\u00e1ng", y:"m\u1ed9t n\u0103m", yy:"%d n\u0103m"}, dayOfMonthOrdinalParse:/\d{1,2}/, ordinal:function(number) {
    return number;
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("x-pseudo", {months:"J~\u00e1\u00f1\u00fa\u00e1~r\u00fd_F~\u00e9br\u00fa~\u00e1r\u00fd_~M\u00e1rc~h_\u00c1p~r\u00edl_~M\u00e1\u00fd_~J\u00fa\u00f1\u00e9~_J\u00fal~\u00fd_\u00c1\u00fa~g\u00fast~_S\u00e9p~t\u00e9mb~\u00e9r_\u00d3~ct\u00f3b~\u00e9r_\u00d1~\u00f3v\u00e9m~b\u00e9r_~D\u00e9c\u00e9~mb\u00e9r".split("_"), monthsShort:"J~\u00e1\u00f1_~F\u00e9b_~M\u00e1r_~\u00c1pr_~M\u00e1\u00fd_~J\u00fa\u00f1_~J\u00fal_~\u00c1\u00fag_~S\u00e9p_~\u00d3ct_~\u00d1\u00f3v_~D\u00e9c".split("_"), 
  monthsParseExact:true, weekdays:"S~\u00fa\u00f1d\u00e1~\u00fd_M\u00f3~\u00f1d\u00e1\u00fd~_T\u00fa\u00e9~sd\u00e1\u00fd~_W\u00e9d~\u00f1\u00e9sd~\u00e1\u00fd_T~h\u00fars~d\u00e1\u00fd_~Fr\u00edd~\u00e1\u00fd_S~\u00e1t\u00far~d\u00e1\u00fd".split("_"), weekdaysShort:"S~\u00fa\u00f1_~M\u00f3\u00f1_~T\u00fa\u00e9_~W\u00e9d_~Th\u00fa_~Fr\u00ed_~S\u00e1t".split("_"), weekdaysMin:"S~\u00fa_M\u00f3~_T\u00fa_~W\u00e9_T~h_Fr~_S\u00e1".split("_"), weekdaysParseExact:true, longDateFormat:{LT:"HH:mm", L:"DD/MM/YYYY", 
  LL:"D MMMM YYYY", LLL:"D MMMM YYYY HH:mm", LLLL:"dddd, D MMMM YYYY HH:mm"}, calendar:{sameDay:"[T~\u00f3d\u00e1~\u00fd \u00e1t] LT", nextDay:"[T~\u00f3m\u00f3~rr\u00f3~w \u00e1t] LT", nextWeek:"dddd [\u00e1t] LT", lastDay:"[\u00dd~\u00e9st~\u00e9rd\u00e1~\u00fd \u00e1t] LT", lastWeek:"[L~\u00e1st] dddd [\u00e1t] LT", sameElse:"L"}, relativeTime:{future:"\u00ed~\u00f1 %s", past:"%s \u00e1~g\u00f3", s:"\u00e1 ~f\u00e9w ~s\u00e9c\u00f3~\u00f1ds", ss:"%d s~\u00e9c\u00f3\u00f1~ds", m:"\u00e1 ~m\u00ed\u00f1~\u00fat\u00e9", 
  mm:"%d m~\u00ed\u00f1\u00fa~t\u00e9s", h:"\u00e1~\u00f1 h\u00f3~\u00far", hh:"%d h~\u00f3\u00fars", d:"\u00e1 ~d\u00e1\u00fd", dd:"%d d~\u00e1\u00fds", M:"\u00e1 ~m\u00f3\u00f1~th", MM:"%d m~\u00f3\u00f1t~hs", y:"\u00e1 ~\u00fd\u00e9\u00e1r", yy:"%d \u00fd~\u00e9\u00e1rs"}, dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/, ordinal:function(number) {
    var b = number % 10, output = ~~(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }, week:{dow:1, doy:4}});
  hooks.defineLocale("yo", {months:"S\u1eb9\u0301r\u1eb9\u0301_E\u0300re\u0300le\u0300_\u1eb8r\u1eb9\u0300na\u0300_I\u0300gbe\u0301_E\u0300bibi_O\u0300ku\u0300du_Ag\u1eb9mo_O\u0300gu\u0301n_Owewe_\u1ecc\u0300wa\u0300ra\u0300_Be\u0301lu\u0301_\u1ecc\u0300p\u1eb9\u0300\u0300".split("_"), monthsShort:"S\u1eb9\u0301r_E\u0300rl_\u1eb8rn_I\u0300gb_E\u0300bi_O\u0300ku\u0300_Ag\u1eb9_O\u0300gu\u0301_Owe_\u1ecc\u0300wa\u0300_Be\u0301l_\u1ecc\u0300p\u1eb9\u0300\u0300".split("_"), weekdays:"A\u0300i\u0300ku\u0301_Aje\u0301_I\u0300s\u1eb9\u0301gun_\u1eccj\u1ecd\u0301ru\u0301_\u1eccj\u1ecd\u0301b\u1ecd_\u1eb8ti\u0300_A\u0300ba\u0301m\u1eb9\u0301ta".split("_"), 
  weekdaysShort:"A\u0300i\u0300k_Aje\u0301_I\u0300s\u1eb9\u0301_\u1eccjr_\u1eccjb_\u1eb8ti\u0300_A\u0300ba\u0301".split("_"), weekdaysMin:"A\u0300i\u0300_Aj_I\u0300s_\u1eccr_\u1eccb_\u1eb8t_A\u0300b".split("_"), longDateFormat:{LT:"h:mm A", LTS:"h:mm:ss A", L:"DD/MM/YYYY", LL:"D MMMM YYYY", LLL:"D MMMM YYYY h:mm A", LLLL:"dddd, D MMMM YYYY h:mm A"}, calendar:{sameDay:"[O\u0300ni\u0300 ni] LT", nextDay:"[\u1ecc\u0300la ni] LT", nextWeek:"dddd [\u1eccs\u1eb9\u0300 to\u0301n'b\u1ecd] [ni] LT", lastDay:"[A\u0300na ni] LT", 
  lastWeek:"dddd [\u1eccs\u1eb9\u0300 to\u0301l\u1ecd\u0301] [ni] LT", sameElse:"L"}, relativeTime:{future:"ni\u0301 %s", past:"%s k\u1ecdja\u0301", s:"i\u0300s\u1eb9ju\u0301 aaya\u0301 die", ss:"aaya\u0301 %d", m:"i\u0300s\u1eb9ju\u0301 kan", mm:"i\u0300s\u1eb9ju\u0301 %d", h:"wa\u0301kati kan", hh:"wa\u0301kati %d", d:"\u1ecdj\u1ecd\u0301 kan", dd:"\u1ecdj\u1ecd\u0301 %d", M:"osu\u0300 kan", MM:"osu\u0300 %d", y:"\u1ecddu\u0301n kan", yy:"\u1ecddu\u0301n %d"}, dayOfMonthOrdinalParse:/\u1ecdj\u1ecd\u0301\s\d{1,2}/, 
  ordinal:"\u1ecdj\u1ecd\u0301 %d", week:{dow:1, doy:4}});
  hooks.defineLocale("zh-cn", {months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"), monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"), 
  weekdaysShort:"\u5468\u65e5_\u5468\u4e00_\u5468\u4e8c_\u5468\u4e09_\u5468\u56db_\u5468\u4e94_\u5468\u516d".split("_"), weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"YYYY/MM/DD", LL:"YYYY\u5e74M\u6708D\u65e5", LLL:"YYYY\u5e74M\u6708D\u65e5Ah\u70b9mm\u5206", LLLL:"YYYY\u5e74M\u6708D\u65e5ddddAh\u70b9mm\u5206", l:"YYYY/M/D", ll:"YYYY\u5e74M\u6708D\u65e5", lll:"YYYY\u5e74M\u6708D\u65e5 HH:mm", llll:"YYYY\u5e74M\u6708D\u65e5dddd HH:mm"}, 
  meridiemParse:/\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/, meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u51cc\u6668" || meridiem === "\u65e9\u4e0a" || meridiem === "\u4e0a\u5348") {
      return hour;
    } else {
      if (meridiem === "\u4e0b\u5348" || meridiem === "\u665a\u4e0a") {
        return hour + 12;
      } else {
        return hour >= 11 ? hour : hour + 12;
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    var hm = hour * 100 + minute;
    if (hm < 600) {
      return "\u51cc\u6668";
    } else {
      if (hm < 900) {
        return "\u65e9\u4e0a";
      } else {
        if (hm < 1130) {
          return "\u4e0a\u5348";
        } else {
          if (hm < 1230) {
            return "\u4e2d\u5348";
          } else {
            if (hm < 1800) {
              return "\u4e0b\u5348";
            } else {
              return "\u665a\u4e0a";
            }
          }
        }
      }
    }
  }, calendar:{sameDay:"[\u4eca\u5929]LT", nextDay:"[\u660e\u5929]LT", nextWeek:"[\u4e0b]ddddLT", lastDay:"[\u6628\u5929]LT", lastWeek:"[\u4e0a]ddddLT", sameElse:"L"}, dayOfMonthOrdinalParse:/\d{1,2}(\u65e5|\u6708|\u5468)/, ordinal:function(number, period) {
    switch(period) {
      case "d":
      case "D":
      case "DDD":
        return number + "\u65e5";
      case "M":
        return number + "\u6708";
      case "w":
      case "W":
        return number + "\u5468";
      default:
        return number;
    }
  }, relativeTime:{future:"%s\u5185", past:"%s\u524d", s:"\u51e0\u79d2", ss:"%d \u79d2", m:"1 \u5206\u949f", mm:"%d \u5206\u949f", h:"1 \u5c0f\u65f6", hh:"%d \u5c0f\u65f6", d:"1 \u5929", dd:"%d \u5929", M:"1 \u4e2a\u6708", MM:"%d \u4e2a\u6708", y:"1 \u5e74", yy:"%d \u5e74"}, week:{dow:1, doy:4}});
  hooks.defineLocale("zh-hk", {months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"), monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"), 
  weekdaysShort:"\u9031\u65e5_\u9031\u4e00_\u9031\u4e8c_\u9031\u4e09_\u9031\u56db_\u9031\u4e94_\u9031\u516d".split("_"), weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"YYYY/MM/DD", LL:"YYYY\u5e74M\u6708D\u65e5", LLL:"YYYY\u5e74M\u6708D\u65e5 HH:mm", LLLL:"YYYY\u5e74M\u6708D\u65e5dddd HH:mm", l:"YYYY/M/D", ll:"YYYY\u5e74M\u6708D\u65e5", lll:"YYYY\u5e74M\u6708D\u65e5 HH:mm", llll:"YYYY\u5e74M\u6708D\u65e5dddd HH:mm"}, meridiemParse:/\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/, 
  meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u51cc\u6668" || meridiem === "\u65e9\u4e0a" || meridiem === "\u4e0a\u5348") {
      return hour;
    } else {
      if (meridiem === "\u4e2d\u5348") {
        return hour >= 11 ? hour : hour + 12;
      } else {
        if (meridiem === "\u4e0b\u5348" || meridiem === "\u665a\u4e0a") {
          return hour + 12;
        }
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    var hm = hour * 100 + minute;
    if (hm < 600) {
      return "\u51cc\u6668";
    } else {
      if (hm < 900) {
        return "\u65e9\u4e0a";
      } else {
        if (hm < 1130) {
          return "\u4e0a\u5348";
        } else {
          if (hm < 1230) {
            return "\u4e2d\u5348";
          } else {
            if (hm < 1800) {
              return "\u4e0b\u5348";
            } else {
              return "\u665a\u4e0a";
            }
          }
        }
      }
    }
  }, calendar:{sameDay:"[\u4eca\u5929]LT", nextDay:"[\u660e\u5929]LT", nextWeek:"[\u4e0b]ddddLT", lastDay:"[\u6628\u5929]LT", lastWeek:"[\u4e0a]ddddLT", sameElse:"L"}, dayOfMonthOrdinalParse:/\d{1,2}(\u65e5|\u6708|\u9031)/, ordinal:function(number, period) {
    switch(period) {
      case "d":
      case "D":
      case "DDD":
        return number + "\u65e5";
      case "M":
        return number + "\u6708";
      case "w":
      case "W":
        return number + "\u9031";
      default:
        return number;
    }
  }, relativeTime:{future:"%s\u5167", past:"%s\u524d", s:"\u5e7e\u79d2", ss:"%d \u79d2", m:"1 \u5206\u9418", mm:"%d \u5206\u9418", h:"1 \u5c0f\u6642", hh:"%d \u5c0f\u6642", d:"1 \u5929", dd:"%d \u5929", M:"1 \u500b\u6708", MM:"%d \u500b\u6708", y:"1 \u5e74", yy:"%d \u5e74"}});
  hooks.defineLocale("zh-tw", {months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"), monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"), 
  weekdaysShort:"\u9031\u65e5_\u9031\u4e00_\u9031\u4e8c_\u9031\u4e09_\u9031\u56db_\u9031\u4e94_\u9031\u516d".split("_"), weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"), longDateFormat:{LT:"HH:mm", LTS:"HH:mm:ss", L:"YYYY/MM/DD", LL:"YYYY\u5e74M\u6708D\u65e5", LLL:"YYYY\u5e74M\u6708D\u65e5 HH:mm", LLLL:"YYYY\u5e74M\u6708D\u65e5dddd HH:mm", l:"YYYY/M/D", ll:"YYYY\u5e74M\u6708D\u65e5", lll:"YYYY\u5e74M\u6708D\u65e5 HH:mm", llll:"YYYY\u5e74M\u6708D\u65e5dddd HH:mm"}, meridiemParse:/\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/, 
  meridiemHour:function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u51cc\u6668" || meridiem === "\u65e9\u4e0a" || meridiem === "\u4e0a\u5348") {
      return hour;
    } else {
      if (meridiem === "\u4e2d\u5348") {
        return hour >= 11 ? hour : hour + 12;
      } else {
        if (meridiem === "\u4e0b\u5348" || meridiem === "\u665a\u4e0a") {
          return hour + 12;
        }
      }
    }
  }, meridiem:function(hour, minute, isLower) {
    var hm = hour * 100 + minute;
    if (hm < 600) {
      return "\u51cc\u6668";
    } else {
      if (hm < 900) {
        return "\u65e9\u4e0a";
      } else {
        if (hm < 1130) {
          return "\u4e0a\u5348";
        } else {
          if (hm < 1230) {
            return "\u4e2d\u5348";
          } else {
            if (hm < 1800) {
              return "\u4e0b\u5348";
            } else {
              return "\u665a\u4e0a";
            }
          }
        }
      }
    }
  }, calendar:{sameDay:"[\u4eca\u5929] LT", nextDay:"[\u660e\u5929] LT", nextWeek:"[\u4e0b]dddd LT", lastDay:"[\u6628\u5929] LT", lastWeek:"[\u4e0a]dddd LT", sameElse:"L"}, dayOfMonthOrdinalParse:/\d{1,2}(\u65e5|\u6708|\u9031)/, ordinal:function(number, period) {
    switch(period) {
      case "d":
      case "D":
      case "DDD":
        return number + "\u65e5";
      case "M":
        return number + "\u6708";
      case "w":
      case "W":
        return number + "\u9031";
      default:
        return number;
    }
  }, relativeTime:{future:"%s\u5167", past:"%s\u524d", s:"\u5e7e\u79d2", ss:"%d \u79d2", m:"1 \u5206\u9418", mm:"%d \u5206\u9418", h:"1 \u5c0f\u6642", hh:"%d \u5c0f\u6642", d:"1 \u5929", dd:"%d \u5929", M:"1 \u500b\u6708", MM:"%d \u500b\u6708", y:"1 \u5e74", yy:"%d \u5e74"}});
  hooks.locale("en");
  return hooks;
}();
(function(moment) {
  var VERSION = "0.5.25", zones = {}, links = {}, names = {}, guesses = {}, cachedGuess;
  if (!moment || typeof moment.version !== "string") {
    logError("Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/");
  }
  var momentVersion = moment.version.split("."), major = +momentVersion[0], minor = +momentVersion[1];
  if (major < 2 || major === 2 && minor < 6) {
    logError("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + moment.version + ". See momentjs.com");
  }
  function charCodeToInt(charCode) {
    if (charCode > 96) {
      return charCode - 87;
    } else {
      if (charCode > 64) {
        return charCode - 29;
      }
    }
    return charCode - 48;
  }
  function unpackBase60(string) {
    var i = 0, parts = string.split("."), whole = parts[0], fractional = parts[1] || "", multiplier = 1, num, out = 0, sign = 1;
    if (string.charCodeAt(0) === 45) {
      i = 1;
      sign = -1;
    }
    for (i; i < whole.length; i++) {
      num = charCodeToInt(whole.charCodeAt(i));
      out = 60 * out + num;
    }
    for (i = 0; i < fractional.length; i++) {
      multiplier = multiplier / 60;
      num = charCodeToInt(fractional.charCodeAt(i));
      out += num * multiplier;
    }
    return out * sign;
  }
  function arrayToInt(array) {
    for (var i = 0; i < array.length; i++) {
      array[i] = unpackBase60(array[i]);
    }
  }
  function intToUntil(array, length) {
    for (var i = 0; i < length; i++) {
      array[i] = Math.round((array[i - 1] || 0) + array[i] * 60000);
    }
    array[length - 1] = Infinity;
  }
  function mapIndices(source, indices) {
    var out = [], i;
    for (i = 0; i < indices.length; i++) {
      out[i] = source[indices[i]];
    }
    return out;
  }
  function unpack(string) {
    var data = string.split("|"), offsets = data[2].split(" "), indices = data[3].split(""), untils = data[4].split(" ");
    arrayToInt(offsets);
    arrayToInt(indices);
    arrayToInt(untils);
    intToUntil(untils, indices.length);
    return {name:data[0], abbrs:mapIndices(data[1].split(" "), indices), offsets:mapIndices(offsets, indices), untils:untils, population:data[5] | 0};
  }
  function Zone(packedString) {
    if (packedString) {
      this._set(unpack(packedString));
    }
  }
  Zone.prototype = {_set:function(unpacked) {
    this.name = unpacked.name;
    this.abbrs = unpacked.abbrs;
    this.untils = unpacked.untils;
    this.offsets = unpacked.offsets;
    this.population = unpacked.population;
  }, _index:function(timestamp) {
    var target = +timestamp, untils = this.untils, i;
    for (i = 0; i < untils.length; i++) {
      if (target < untils[i]) {
        return i;
      }
    }
  }, parse:function(timestamp) {
    var target = +timestamp, offsets = this.offsets, untils = this.untils, max = untils.length - 1, offset, offsetNext, offsetPrev, i;
    for (i = 0; i < max; i++) {
      offset = offsets[i];
      offsetNext = offsets[i + 1];
      offsetPrev = offsets[i ? i - 1 : i];
      if (offset < offsetNext && tz.moveAmbiguousForward) {
        offset = offsetNext;
      } else {
        if (offset > offsetPrev && tz.moveInvalidForward) {
          offset = offsetPrev;
        }
      }
      if (target < untils[i] - offset * 60000) {
        return offsets[i];
      }
    }
    return offsets[max];
  }, abbr:function(mom) {
    return this.abbrs[this._index(mom)];
  }, offset:function(mom) {
    logError("zone.offset has been deprecated in favor of zone.utcOffset");
    return this.offsets[this._index(mom)];
  }, utcOffset:function(mom) {
    return this.offsets[this._index(mom)];
  }};
  function OffsetAt(at) {
    var timeString = at.toTimeString();
    var abbr = timeString.match(/\([a-z ]+\)/i);
    if (abbr && abbr[0]) {
      abbr = abbr[0].match(/[A-Z]/g);
      abbr = abbr ? abbr.join("") : undefined;
    } else {
      abbr = timeString.match(/[A-Z]{3,5}/g);
      abbr = abbr ? abbr[0] : undefined;
    }
    if (abbr === "GMT") {
      abbr = undefined;
    }
    this.at = +at;
    this.abbr = abbr;
    this.offset = at.getTimezoneOffset();
  }
  function ZoneScore(zone) {
    this.zone = zone;
    this.offsetScore = 0;
    this.abbrScore = 0;
  }
  ZoneScore.prototype.scoreOffsetAt = function(offsetAt) {
    this.offsetScore += Math.abs(this.zone.utcOffset(offsetAt.at) - offsetAt.offset);
    if (this.zone.abbr(offsetAt.at).replace(/[^A-Z]/g, "") !== offsetAt.abbr) {
      this.abbrScore++;
    }
  };
  function findChange(low, high) {
    var mid, diff;
    while (diff = ((high.at - low.at) / 12e4 | 0) * 6e4) {
      mid = new OffsetAt(new Date(low.at + diff));
      if (mid.offset === low.offset) {
        low = mid;
      } else {
        high = mid;
      }
    }
    return low;
  }
  function userOffsets() {
    var startYear = (new Date).getFullYear() - 2, last = new OffsetAt(new Date(startYear, 0, 1)), offsets = [last], change, next, i;
    for (i = 1; i < 48; i++) {
      next = new OffsetAt(new Date(startYear, i, 1));
      if (next.offset !== last.offset) {
        change = findChange(last, next);
        offsets.push(change);
        offsets.push(new OffsetAt(new Date(change.at + 6e4)));
      }
      last = next;
    }
    for (i = 0; i < 4; i++) {
      offsets.push(new OffsetAt(new Date(startYear + i, 0, 1)));
      offsets.push(new OffsetAt(new Date(startYear + i, 6, 1)));
    }
    return offsets;
  }
  function sortZoneScores(a, b) {
    if (a.offsetScore !== b.offsetScore) {
      return a.offsetScore - b.offsetScore;
    }
    if (a.abbrScore !== b.abbrScore) {
      return a.abbrScore - b.abbrScore;
    }
    return b.zone.population - a.zone.population;
  }
  function addToGuesses(name, offsets) {
    var i, offset;
    arrayToInt(offsets);
    for (i = 0; i < offsets.length; i++) {
      offset = offsets[i];
      guesses[offset] = guesses[offset] || {};
      guesses[offset][name] = true;
    }
  }
  function guessesForUserOffsets(offsets) {
    var offsetsLength = offsets.length, filteredGuesses = {}, out = [], i, j, guessesOffset;
    for (i = 0; i < offsetsLength; i++) {
      guessesOffset = guesses[offsets[i].offset] || {};
      for (j in guessesOffset) {
        if (guessesOffset.hasOwnProperty(j)) {
          filteredGuesses[j] = true;
        }
      }
    }
    for (i in filteredGuesses) {
      if (filteredGuesses.hasOwnProperty(i)) {
        out.push(names[i]);
      }
    }
    return out;
  }
  function rebuildGuess() {
    try {
      var intlName = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (intlName && intlName.length > 3) {
        var name = names[normalizeName(intlName)];
        if (name) {
          return name;
        }
        logError("Moment Timezone found " + intlName + " from the Intl api, but did not have that data loaded.");
      }
    } catch (e) {
    }
    var offsets = userOffsets(), offsetsLength = offsets.length, guesses = guessesForUserOffsets(offsets), zoneScores = [], zoneScore, i, j;
    for (i = 0; i < guesses.length; i++) {
      zoneScore = new ZoneScore(getZone(guesses[i]), offsetsLength);
      for (j = 0; j < offsetsLength; j++) {
        zoneScore.scoreOffsetAt(offsets[j]);
      }
      zoneScores.push(zoneScore);
    }
    zoneScores.sort(sortZoneScores);
    return zoneScores.length > 0 ? zoneScores[0].zone.name : undefined;
  }
  function guess(ignoreCache) {
    if (!cachedGuess || ignoreCache) {
      cachedGuess = rebuildGuess();
    }
    return cachedGuess;
  }
  function normalizeName(name) {
    return (name || "").toLowerCase().replace(/\//g, "_");
  }
  function addZone(packed) {
    var i, name, split, normalized;
    if (typeof packed === "string") {
      packed = [packed];
    }
    for (i = 0; i < packed.length; i++) {
      split = packed[i].split("|");
      name = split[0];
      normalized = normalizeName(name);
      zones[normalized] = packed[i];
      names[normalized] = name;
      addToGuesses(normalized, split[2].split(" "));
    }
  }
  function getZone(name, caller) {
    name = normalizeName(name);
    var zone = zones[name];
    var link;
    if (zone instanceof Zone) {
      return zone;
    }
    if (typeof zone === "string") {
      zone = new Zone(zone);
      zones[name] = zone;
      return zone;
    }
    if (links[name] && caller !== getZone && (link = getZone(links[name], getZone))) {
      zone = zones[name] = new Zone;
      zone._set(link);
      zone.name = names[name];
      return zone;
    }
    return null;
  }
  function getNames() {
    var i, out = [];
    for (i in names) {
      if (names.hasOwnProperty(i) && (zones[i] || zones[links[i]]) && names[i]) {
        out.push(names[i]);
      }
    }
    return out.sort();
  }
  function addLink(aliases) {
    var i, alias, normal0, normal1;
    if (typeof aliases === "string") {
      aliases = [aliases];
    }
    for (i = 0; i < aliases.length; i++) {
      alias = aliases[i].split("|");
      normal0 = normalizeName(alias[0]);
      normal1 = normalizeName(alias[1]);
      links[normal0] = normal1;
      names[normal0] = alias[0];
      links[normal1] = normal0;
      names[normal1] = alias[1];
    }
  }
  function loadData(data) {
    addZone(data.zones);
    addLink(data.links);
    tz.dataVersion = data.version;
  }
  function zoneExists(name) {
    if (!zoneExists.didShowError) {
      zoneExists.didShowError = true;
      logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')");
    }
    return !!getZone(name);
  }
  function needsOffset(m) {
    var isUnixTimestamp = m._f === "X" || m._f === "x";
    return !!(m._a && m._tzm === undefined && !isUnixTimestamp);
  }
  function logError(message) {
    if (typeof console !== "undefined" && typeof console.error === "function") {
      console.error(message);
    }
  }
  function tz(input) {
    var args = Array.prototype.slice.call(arguments, 0, -1), name = arguments[arguments.length - 1], zone = getZone(name), out = moment.utc.apply(null, args);
    if (zone && !moment.isMoment(input) && needsOffset(out)) {
      out.add(zone.parse(out), "minutes");
    }
    out.tz(name);
    return out;
  }
  tz.version = VERSION;
  tz.dataVersion = "";
  tz._zones = zones;
  tz._links = links;
  tz._names = names;
  tz.add = addZone;
  tz.link = addLink;
  tz.load = loadData;
  tz.zone = getZone;
  tz.zoneExists = zoneExists;
  tz.guess = guess;
  tz.names = getNames;
  tz.Zone = Zone;
  tz.unpack = unpack;
  tz.unpackBase60 = unpackBase60;
  tz.needsOffset = needsOffset;
  tz.moveInvalidForward = true;
  tz.moveAmbiguousForward = false;
  var fn = moment.fn;
  moment.tz = tz;
  moment.defaultZone = null;
  moment.updateOffset = function(mom, keepTime) {
    var zone = moment.defaultZone, offset;
    if (mom._z === undefined) {
      if (zone && needsOffset(mom) && !mom._isUTC) {
        mom._d = moment.utc(mom._a)._d;
        mom.utc().add(zone.parse(mom), "minutes");
      }
      mom._z = zone;
    }
    if (mom._z) {
      offset = mom._z.utcOffset(mom);
      if (Math.abs(offset) < 16) {
        offset = offset / 60;
      }
      if (mom.utcOffset !== undefined) {
        var z = mom._z;
        mom.utcOffset(-offset, keepTime);
        mom._z = z;
      } else {
        mom.zone(offset, keepTime);
      }
    }
  };
  fn.tz = function(name, keepTime) {
    if (name) {
      if (typeof name !== "string") {
        throw new Error("Time zone name must be a string, got " + name + " [" + typeof name + "]");
      }
      this._z = getZone(name);
      if (this._z) {
        moment.updateOffset(this, keepTime);
      } else {
        logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/.");
      }
      return this;
    }
    if (this._z) {
      return this._z.name;
    }
  };
  function abbrWrap(old) {
    return function() {
      if (this._z) {
        return this._z.abbr(this);
      }
      return old.call(this);
    };
  }
  function resetZoneWrap(old) {
    return function() {
      this._z = null;
      return old.apply(this, arguments);
    };
  }
  function resetZoneWrap2(old) {
    return function() {
      if (arguments.length > 0) {
        this._z = null;
      }
      return old.apply(this, arguments);
    };
  }
  fn.zoneName = abbrWrap(fn.zoneName);
  fn.zoneAbbr = abbrWrap(fn.zoneAbbr);
  fn.utc = resetZoneWrap(fn.utc);
  fn.local = resetZoneWrap(fn.local);
  fn.utcOffset = resetZoneWrap2(fn.utcOffset);
  moment.tz.setDefault = function(name) {
    if (major < 2 || major === 2 && minor < 9) {
      logError("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + moment.version + ".");
    }
    moment.defaultZone = name ? getZone(name) : null;
    return moment;
  };
  var momentProperties = moment.momentProperties;
  if (Object.prototype.toString.call(momentProperties) === "[object Array]") {
    momentProperties.push("_z");
    momentProperties.push("_a");
  } else {
    if (momentProperties) {
      momentProperties._z = null;
    }
  }
  loadData({"version":"2019a", "zones":["Africa/Abidjan|GMT|0|0||48e5", "Africa/Nairobi|EAT|-30|0||47e5", "Africa/Algiers|WET WEST CET CEST|0 -10 -10 -20|01012320102|3bX0 11A0 dDd0 17b0 11B0 1cN0 2Dy0 1cN0 1fB0 1cL0|26e5", "Africa/Lagos|WAT|-10|0||17e6", "Africa/Bissau|-01 GMT|10 0|01|cap0|39e4", "Africa/Maputo|CAT|-20|0||26e5", "Africa/Cairo|EET EEST|-20 -30|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|LX0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1WL0 rd0 1Rz0 wp0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1qL0 Xd0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1ny0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 WL0 1qN0 Rb0 1wp0 On0 1zd0 Lz0 1EN0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6", 
  "Africa/Casablanca|+00 +01|0 -10|01010101010101010101010101010101010101010101010101010101010101010101010|aS00 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4mn0 SyN0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 e00 28M0 e00 2600 gM0 2600|32e5", "Africa/Ceuta|WET WEST CET CEST|0 -10 -10 -20|0101010102323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|aS00 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4VB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|85e3", 
  "Africa/El_Aaiun|-01 +00 +01|10 0 -10|01212121212121212121212121212121212121212121212121212121212121212121|fi10 6L0 AL0 1Nd0 XX0 1Cp0 pz0 1cBB0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 e00 28M0 e00 2600 gM0 2600|20e4", "Africa/Johannesburg|SAST|-20|0||84e5", "Africa/Juba|CAT CAST EAT|-20 -30 -30|0101010101010101010101010101010102|LW0 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0", 
  "Africa/Khartoum|CAT CAST EAT|-20 -30 -30|01010101010101010101010101010101020|LW0 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0 HjL0|51e5", "Africa/Monrovia|MMT GMT|I.u 0|01|4SoI.u|11e5", "Africa/Ndjamena|WAT WAST|-10 -20|010|nNb0 Wn0|13e5", "Africa/Sao_Tome|GMT WAT|0 -10|010|1UQN0 2q00", "Africa/Tripoli|EET CET CEST|-20 -10 -20|0121212121212121210120120|tda0 A10 1db0 1cN0 1db0 1dd0 1db0 1eN0 1bb0 1e10 1cL0 1c10 1db0 1dd0 1db0 1cN0 1db0 1q10 fAn0 1ep0 1db0 AKq0 TA0 1o00|11e5", 
  "Africa/Tunis|CET CEST|-10 -20|0101010101010101010|hOn0 WM0 1rA0 11c0 nwo0 Ko0 1cM0 1cM0 1rA0 10M0 zuM0 10N0 1aN0 1qM0 WM0 1qM0 11A0 1o00|20e5", "Africa/Windhoek|SAST CAT WAT|-20 -20 -10|01212121212121212121212121212121212121212121212121|Ndy0 9Io0 16P0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|32e4", "America/Adak|BST BDT AHST HST HDT|b0 a0 a0 a0 90|0101010101010101010101010101234343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|Kd0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326", 
  "America/Anchorage|AHST AHDT YST AKST AKDT|a0 90 90 90 80|0101010101010101010101010101234343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|Kc0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4", 
  "America/Puerto_Rico|AST|40|0||24e5", "America/Araguaina|-03 -02|30 20|01010101010101010101010101010|CxD0 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 ny10 Lz0|14e4", "America/Argentina/Buenos_Aires|-03 -02|30 20|01010101010101010|9Rf0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 A4p0 uL0 1qN0 WL0", "America/Argentina/Catamarca|-03 -02 -04|30 20 40|01010101210102010|9Rf0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 7B0 8zb0 uL0", 
  "America/Argentina/Cordoba|-03 -02 -04|30 20 40|01010101210101010|9Rf0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0 1qN0 WL0", "America/Argentina/Jujuy|-03 -02 -04|30 20 40|010101202101010|9Rf0 Db0 zvd0 Bz0 1tB0 TX0 1ze0 TX0 1ld0 WK0 1wp0 TX0 A4p0 uL0", "America/Argentina/La_Rioja|-03 -02 -04|30 20 40|010101012010102010|9Rf0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0", "America/Argentina/Mendoza|-03 -02 -04|30 20 40|01010120202102010|9Rf0 Db0 zvd0 Bz0 1tB0 TX0 1u20 SL0 1vd0 Tb0 1wp0 TW0 ri10 Op0 7TX0 uL0", 
  "America/Argentina/Rio_Gallegos|-03 -02 -04|30 20 40|01010101010102010|9Rf0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0", "America/Argentina/Salta|-03 -02 -04|30 20 40|010101012101010|9Rf0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0", "America/Argentina/San_Juan|-03 -02 -04|30 20 40|010101012010102010|9Rf0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rld0 m10 8lb0 uL0", "America/Argentina/San_Luis|-03 -02 -04|30 20 40|010101202020102020|9Rf0 Db0 zvd0 Bz0 1tB0 XX0 1q20 SL0 AN0 vDb0 m10 8lb0 8L0 jd0 1qN0 WL0 1qN0", 
  "America/Argentina/Tucuman|-03 -02 -04|30 20 40|0101010121010201010|9Rf0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 4N0 8BX0 uL0 1qN0 WL0", "America/Argentina/Ushuaia|-03 -02 -04|30 20 40|01010101010102010|9Rf0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rkN0 8p0 8zb0 uL0", "America/Asuncion|-04 -03|40 30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|6FE0 3CL0 3Dd0 10L0 1pB0 10n0 1pB0 10n0 1pB0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1lB0 14n0 1dd0 1cL0 1fd0 WL0 1rd0 1aL0 1dB0 Xz0 1qp0 Xb0 1qN0 10L0 1rB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 WN0 1qL0 11B0 1nX0 1ip0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 TX0 1tB0 19X0 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0|28e5", 
  "America/Panama|EST|50|0||15e5", "America/Bahia_Banderas|PST MST MDT CDT CST|80 70 60 50 60|012121212121212121212121212121343434343434343434343434343434343434343434|80 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0|84e3", 
  "America/Bahia|-03 -02|30 20|010101010101010101010101010101010101010|CxD0 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 l5B0 Rb0|27e5", "America/Barbados|AST ADT|40 30|010101010|i7G0 IL0 1ip0 17b0 1ip0 17b0 1ld0 13b0|28e4", "America/Belem|-03 -02|30 20|0101010|CxD0 Rb0 1tB0 IL0 1Fd0 FX0|20e5", "America/Belize|CST CDT|60 50|01010|9xG0 qn0 lxB0 mn0|57e3", "America/Boa_Vista|-04 -03|40 30|01010101010|CxE0 Rb0 1tB0 IL0 1Fd0 FX0 smp0 WL0 1tB0 2L0|62e2", 
  "America/Bogota|-05 -04|50 40|010|Snh0 2en0|90e5", "America/Boise|MST MDT|70 60|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K90 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 Dd0 1Kn0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e4", 
  "America/Cambridge_Bay|MST MDT CST CDT EST|70 60 60 50 50|01010101010101010101010101010101010101012342101010101010101010101010101010101010101010101010101010101010|p7J0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11A0 1nX0 2K0 WQ0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e2", 
  "America/Campo_Grande|-04 -03|40 30|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|CxE0 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0 1HB0 FX0 1HB0 IL0 1HB0 FX0 1HB0 IL0 1EN0 FX0 1HB0 FX0 1HB0 IL0 1EN0 IL0 1HB0 FX0 1HB0 FX0 1HB0 FX0 1HB0|77e4", 
  "America/Cancun|CST EST EDT CDT|60 50 40 50|012121230303030303030303030303030303030301|t9G0 yLB0 1lb0 14p0 1lb0 14p0 Lz0 xB0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4", "America/Caracas|-04 -0430|40 4u|010|1wmv0 kqo0|29e5", "America/Cayenne|-03|30|0||58e3", "America/Chicago|CST CDT|60 50|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K80 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5", 
  "America/Chihuahua|CST CDT MDT MST|60 50 60 70|01010232323232323232323232323232323232323232323232323232323232323232323|13Vk0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0|81e4", "America/Costa_Rica|CST CDT|60 50|010101010|mgS0 Db0 1Kp0 Db0 pRB0 15b0 1kp0 mL0|12e5", 
  "America/Phoenix|MST|70|0||42e5", "America/Cuiaba|-04 -03|40 30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|CxE0 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 4a10 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0 1HB0 FX0 1HB0 IL0 1HB0 FX0 1HB0 IL0 1EN0 FX0 1HB0 FX0 1HB0 IL0 1EN0 IL0 1HB0 FX0 1HB0 FX0 1HB0 FX0 1HB0|54e4", 
  "America/Danmarkshavn|-03 -02 GMT|30 20 0|0101010101010101010101010101010102|oXh0 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 DC0|8", "America/Dawson_Creek|PST PDT MST|80 70 70|0101012|Ka0 1cL0 1cN0 1fz0 1cN0 ML0|12e3", "America/Dawson|YST PST PDT|90 80 70|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|9ix0 fNd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|13e2", 
  "America/Denver|MST MDT|70 60|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K90 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5", 
  "America/Detroit|EST EDT|50 40|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|85H0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e5", 
  "America/Edmonton|MST MDT|70 60|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|5E90 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|10e5", 
  "America/Eirunepe|-05 -04|50 40|01010101010|CxF0 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0 yTd0 d5X0|31e3", "America/El_Salvador|CST CDT|60 50|01010|Gcu0 WL0 1qN0 WL0|11e5", "America/Tijuana|PST PDT|80 70|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|fmy0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|20e5", 
  "America/Fort_Nelson|PST PDT MST|80 70 70|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010102|Ka0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2", 
  "America/Fort_Wayne|EST EDT|50 40|01010101010101010101010101010101010101010101010101010|K70 1cL0 1qhd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Fortaleza|-03 -02|30 20|01010101010101010|CxD0 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 5z0 2mN0 On0|34e5", "America/Glace_Bay|AST ADT|40 30|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|5E60 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3", 
  "America/Godthab|-03 -02|30 20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|oXh0 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|17e3", 
  "America/Goose_Bay|AST ADT ADDT|40 30 20|010101010101010101010101010101010101020101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K60 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2", 
  "America/Grand_Turk|EST EDT AST|50 40 40|01010101010101010101010101010101010101010101010101010101010101010101010101210101010101010101010101010|mG70 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 5Ip0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2", 
  "America/Guatemala|CST CDT|60 50|010101010|9tG0 An0 mtd0 Nz0 ifB0 17b0 zDB0 11z0|13e5", "America/Guayaquil|-05 -04|50 40|010|TKR0 rz0|27e5", "America/Guyana|-0345 -03 -04|3J 30 40|012|dyPJ Bxbf|80e4", "America/Halifax|AST ADT|40 30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K60 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4", 
  "America/Havana|CST CDT|50 40|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K50 1cL0 1cN0 1fz0 1cN0 14n0 1ld0 14L0 1kN0 15b0 1kp0 1cL0 1cN0 1fz0 1a10 1fz0 1fB0 11z0 14p0 1nX0 11B0 1nX0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 1a10 1in0 1a10 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 17c0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 11A0 6i00 Rc0 1wo0 U00 1tA0 Rc0 1wo0 U00 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5", 
  "America/Hermosillo|PST MST MDT|80 70 60|01212121|80 13Vd0 1lb0 14p0 1lb0 14p0 1lb0|64e4", "America/Indiana/Knox|CST CDT EST|60 50 50|01010101010101010101010101010101010101010101210101010101010101010101010101010101010101010101010|K80 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 z8o0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", 
  "America/Indiana/Marengo|EST EDT CDT|50 40 50|010101010201010101010101010101010101010101010101010101010101010|K70 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1e6p0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Petersburg|CST CDT EST EDT|60 50 50 40|0101010101010101210123232323232323232323232323232323232323232323232|K80 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 19co0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", 
  "America/Indiana/Tell_City|EST EDT CDT CST|50 40 50 60|01023232323232323232323232323232323232323232323232323|K70 1cL0 1qhd0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Vevay|EST EDT|50 40|010101010101010101010101010101010101010101010101010101010|K70 1cL0 1cN0 1fz0 1cN0 1cL0 1lnd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", 
  "America/Indiana/Vincennes|EST EDT CDT CST|50 40 50 60|01023201010101010101010101010101010101010101010101010|K70 1cL0 1qhd0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Winamac|EST EDT CDT CST|50 40 50 60|01023101010101010101010101010101010101010101010101010|K70 1cL0 1qhd0 1o00 Rd0 1za0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", 
  "America/Inuvik|PST MST MDT|80 70 60|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|mGa0 2pz0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|35e2", 
  "America/Iqaluit|EST EDT CST CDT|50 40 60 50|0101010101010101010101010101010101010101230101010101010101010101010101010101010101010101010101010101010|p7H0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|67e2", 
  "America/Jamaica|EST EDT|50 40|010101010101010101010|9Kv0 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0|94e4", "America/Juneau|PST PDT YDT YST AKST AKDT|80 70 80 90 90 80|0101010101010101010102010101345454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|Ka0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cM0 1cM0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|33e3", 
  "America/Kentucky/Louisville|EST EDT CDT|50 40 50|010101010201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K70 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", 
  "America/Kentucky/Monticello|CST CDT EST EDT|60 50 50 40|010101010101010101010101010101010101010101010101010101010101012323232323232323232323232323232323232323232323232323232323232|K80 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", 
  "America/La_Paz|-04|40|0||19e5", "America/Lima|-05 -04|50 40|010101010|CVF0 zX0 1O10 zX0 6Gp0 zX0 98p0 zX0|11e6", "America/Los_Angeles|PST PDT|80 70|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|Ka0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6", 
  "America/Maceio|-03 -02|30 20|0101010101010101010|CxD0 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 8Q10 WL0 1tB0 5z0 2mN0 On0|93e4", "America/Managua|CST EST CDT|60 50 50|010202010102020|86u0 4mn0 9Up0 Dz0 1K10 Dz0 s3F0 1KH0 DB0 9In0 k8p0 19X0 1o30 11y0|22e5", "America/Manaus|-04 -03|40 30|010101010|CxE0 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0|19e5", "America/Martinique|AST ADT|40 30|010|oXg0 19X0|39e4", "America/Matamoros|CST CDT|60 50|0101010101010101010101010101010101010101010101010101010101010101010101010|IqU0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|45e4", 
  "America/Mazatlan|PST MST MDT|80 70 60|012121212121212121212121212121212121212121212121212121212121212121212121|80 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0|44e4", "America/Menominee|EST CDT CST|50 50 60|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|85H0 1cM0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|85e2", 
  "America/Merida|CST EST CDT|60 50 50|0102020202020202020202020202020202020202020202020202020202020202020202020|t9G0 2hz0 wu30 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0|11e5", "America/Metlakatla|PST PDT AKST AKDT|80 70 90 80|0101010101010101010101010101023232302323232323232323232323232|Ka0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1hU10 Rd0 1zb0 Op0 1zb0 Op0 1zb0 uM0 jB0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2", 
  "America/Mexico_City|CST CDT|60 50|01010101010101010101010101010101010101010101010101010101010101010101010|13Vk0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0|20e6", "America/Miquelon|AST -03 -02|40 30 20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|p9g0 gQ10 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2", 
  "America/Moncton|AST ADT|40 30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K60 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14n1 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 ReX 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|64e3", 
  "America/Monterrey|CST CDT|60 50|0101010101010101010101010101010101010101010101010101010101010101010101010|IqU0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0|41e5", "America/Montevideo|-03 -02 -0130 -0230|30 20 1u 2u|0101023010101010101010101010101010101010101010101010|JD0 jX0 4vB0 xz0 3Cp0 mmu 1a10 IMu Db0 4c10 uL0 1Nd0 An0 1SN0 uL0 mp0 28L0 iPB0 un0 1SN0 xz0 1zd0 Lz0 1zd0 Rb0 1zd0 On0 1wp0 Rb0 s8p0 1fB0 1ip0 11z0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5", 
  "America/Toronto|EST EDT|50 40|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K70 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e5", 
  "America/New_York|EST EDT|50 40|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K70 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6", 
  "America/Nipigon|EST EDT|50 40|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|avj0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|16e2", 
  "America/Nome|BST BDT YST AKST AKDT|b0 a0 90 90 80|0101010101010101010101010101234343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|Kd0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cl0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|38e2", 
  "America/Noronha|-02 -01|20 10|01010101010101010|CxC0 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|30e2", "America/North_Dakota/Beulah|MST MDT CST CDT|70 60 60 50|010101010101010101010101010101010101010101010101010101010101010101010101010101010123232323232323232323232323232323232323232|K90 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", 
  "America/North_Dakota/Center|MST MDT CST CDT|70 60 60 50|010101010101010101010101010101010101010101010123232323232323232323232323232323232323232323232323232323232323232323232323232|K90 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", 
  "America/North_Dakota/New_Salem|MST MDT CST CDT|70 60 60 50|010101010101010101010101010101010101010101010101010101010101010101012323232323232323232323232323232323232323232323232323232|K90 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", 
  "America/Ojinaga|CST CDT MDT MST|60 50 60 70|01010232323232323232323232323232323232323232323232323232323232323232323|13Vk0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3", "America/Pangnirtung|AST ADT EDT EST CST CDT|40 30 40 50 60 50|0101010101010101010101010101010232323232453232323232323232323232323232323232323232323232323232323232323|p7G0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1o00 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2", 
  "America/Paramaribo|-0330 -03|3u 30|01|zSPu|24e4", "America/Port-au-Prince|EST EDT|50 40|01010101010101010101010101010101010101010101010101010101010101010101010|wu50 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14q0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 i6n0 1nX0 11B0 1nX0 d430 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 3iN0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5", 
  "America/Rio_Branco|-05 -04|50 40|010101010|CxF0 Rb0 1tB0 IL0 1Fd0 FX0 NBd0 d5X0|31e4", "America/Porto_Velho|-04 -03|40 30|0101010|CxE0 Rb0 1tB0 IL0 1Fd0 FX0|37e4", "America/Punta_Arenas|-03 -04|30 40|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|yP0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0", 
  "America/Rainy_River|CST CDT|60 50|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|avk0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|842", 
  "America/Rankin_Inlet|CST CDT EST|60 50 50|0101010101010101010101010101010101010101012101010101010101010101010101010101010101010101010101010101010|p7I0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e2", 
  "America/Recife|-03 -02|30 20|01010101010101010|CxD0 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|33e5", "America/Regina|CST|60|0||19e4", "America/Resolute|CST CDT EST|60 50 50|0101010101010101010101010101010101010101012101010101012101010101010101010101010101010101010101010101010|p7I0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|229", 
  "America/Santarem|-04 -03|40 30|01010101|CxE0 Rb0 1tB0 IL0 1Fd0 FX0 NBd0|21e4", "America/Santiago|-03 -04|30 40|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|yP0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0|62e5", 
  "America/Santo_Domingo|-0430 EST AST|4u 50 40|0101010101212|ksu 1Cou yLu 1RAu wLu 1QMu xzu 1Q0u xXu 1PAu 13jB0 e00|29e5", "America/Sao_Paulo|-03 -02|30 20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|CxD0 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0 1HB0 FX0 1HB0 IL0 1HB0 FX0 1HB0 IL0 1EN0 FX0 1HB0 FX0 1HB0 IL0 1EN0 IL0 1HB0 FX0 1HB0 FX0 1HB0 FX0 1HB0|20e6", 
  "America/Scoresbysund|-02 -01 +00|20 10 0|0102121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|oXg0 1a00 1cK0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|452", 
  "America/Sitka|PST PDT YST AKST AKDT|80 70 90 90 80|0101010101010101010101010101234343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|Ka0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|90e2", 
  "America/St_Johns|NST NDT NDDT|3u 2u 1u|010101010101010101010101010101010101020101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K5u 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4", 
  "America/Swift_Current|MST CST|70 60|01|5E90|16e3", "America/Tegucigalpa|CST CDT|60 50|0101010|Gcu0 WL0 1qN0 WL0 GRd0 AL0|11e5", "America/Thule|AST ADT|40 30|010101010101010101010101010101010101010101010101010101010101010101010101010101010|PHG0 1cL0 1cN0 1cL0 1fB0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|656", 
  "America/Thunder_Bay|EST EDT|50 40|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K70 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4", 
  "America/Vancouver|PST PDT|80 70|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|Ka0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5", 
  "America/Whitehorse|PST PDT|80 70|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|p7K0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3", 
  "America/Winnipeg|CST CDT|60 50|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|K80 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|66e4", 
  "America/Yakutat|YST YDT AKST AKDT|90 80 90 80|0101010101010101010101010101023232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|Kb0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cn0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|642", 
  "America/Yellowknife|MST MDT|70 60|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|p7J0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3", 
  "Antarctica/Casey|+08 +11|-80 -b0|0101010|1ARS0 T90 40P0 KL0 blz0 3m10|10", "Antarctica/Davis|+07 +05|-70 -50|01010|1ART0 VB0 3Wn0 KN0|70", "Pacific/Port_Moresby|+10|-a0|0||25e4", "Antarctica/Macquarie|AEDT AEST +11|-b0 -a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010102|qg0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0|1", 
  "Antarctica/Mawson|+06 +05|-60 -50|01|1ARU0|60", "Pacific/Auckland|NZST NZDT|-c0 -d0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|bKC0 IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00|14e5", 
  "Antarctica/Palmer|-03 -02 -04|30 20 40|01020202020202020202020202020202020202020202020202020202020202020202020|9Rf0 Db0 jsN0 14N0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|40", "Antarctica/Rothera|-00 -03|0 30|01|gOo0|130", 
  "Asia/Riyadh|+03|-30|0||57e5", "Antarctica/Troll|-00 +00 +02|0 0 -20|012121212121212121212121212121212121212121212121212121|1puo0 hd0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|40", "Asia/Urumqi|+06|-60|0||32e5", "Europe/Berlin|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|oXd0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|41e5", 
  "Asia/Almaty|+06 +07 +05|-60 -70 -50|0101010101010101010102010101010101010101010101010|rn60 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|15e5", "Asia/Amman|EET EEST|-20 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|8kK0 KL0 1oN0 11b0 1oN0 11b0 1pd0 1dz0 1cp0 11b0 1op0 11b0 fO10 1db0 1e10 1cL0 1cN0 1cL0 1cN0 1fz0 1pd0 10n0 1ld0 14n0 1hB0 15b0 1ip0 19X0 1cN0 1cL0 1cN0 17b0 1ld0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1So0 y00 1fc0 1dc0 1co0 1dc0 1cM0 1cM0 1cM0 1o00 11A0 1lc0 17c0 1cM0 1cM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|25e5", 
  "Asia/Anadyr|+13 +14 +12 +11|-d0 -e0 -c0 -b0|010202020202020202023202020202020202020202020202020202020232|rmX0 1db0 2q10 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|13e3", "Asia/Aqtau|+05 +06 +04|-50 -60 -40|0101010101010101010201010120202020202020202020|sAj0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|15e4", 
  "Asia/Aqtobe|+05 +06 +04|-50 -60 -40|01010101010101010102010101010101010101010101010|rn70 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|27e4", "Asia/Ashgabat|+05 +06 +04|-50 -60 -40|01010101010101010101020|rn70 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0|41e4", "Asia/Atyrau|+05 +06 +04|-50 -60 -40|010101010101010101020101010101010102020202020|sAj0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 2sp0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0", 
  "Asia/Baghdad|+03 +04|-30 -40|01010101010101010101010101010101010101010101010101010|u190 11b0 1cp0 1dz0 1dd0 1db0 1cN0 1cp0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1de0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0|66e5", "Asia/Qatar|+04 +03|-40 -30|01|5QI0|96e4", "Asia/Baku|+04 +05 +03|-40 -50 -30|010101010101010101010201010101010101010101010101010101010101010|rn80 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 9Je0 1o00 11z0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|27e5", 
  "Asia/Bangkok|+07|-70|0||15e6", "Asia/Barnaul|+07 +08 +06|-70 -80 -60|01010101010101010101020101010102020202020202020202020202020202020|rn50 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 p90 LE0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0", "Asia/Beirut|EET EEST|-20 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|61a0 En0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1op0 11b0 dA10 17b0 1iN0 17b0 1iN0 17b0 1iN0 17b0 1vB0 SL0 1mp0 13z0 1iN0 17b0 1iN0 17b0 1jd0 12n0 1a10 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0|22e5", 
  "Asia/Bishkek|+06 +07 +05|-60 -70 -50|0101010101010101010102020202020202020202020202020|rn60 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2e00 1tX0 17b0 1ip0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1cPu 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0|87e4", "Asia/Brunei|+08|-80|0||42e4", "Asia/Kolkata|IST|-5u|0||15e6", "Asia/Chita|+09 +10 +08|-90 -a0 -80|0101010101010101010102010101010101010101010101010101010101010120|rn30 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3re0|33e4", 
  "Asia/Choibalsan|+07 +08 +10 +09|-70 -80 -a0 -90|012323232323232323232323232323232323232323232313131|jsF0 cKn0 1da0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 3Db0 h1f0 1cJ0 1cP0 1cJ0|38e3", "Asia/Shanghai|CST CDT|-80 -90|0101010101010|DKG0 Rb0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6", "Asia/Colombo|+0530 +0630 +06|-5u -6u -60|0120|14giu 11zu n3cu|22e5", 
  "Asia/Dhaka|+06 +07|-60 -70|010|1A5R0 1i00|16e6", "Asia/Damascus|EET EEST|-20 -30|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|M00 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 Nb0 1AN0 Nb0 bcp0 19X0 1gp0 19X0 3ld0 1xX0 Vd0 1Bz0 Sp0 1vX0 10p0 1dz0 1cN0 1cL0 1db0 1db0 1g10 1an0 1ap0 1db0 1fd0 1db0 1cN0 1db0 1dd0 1db0 1cp0 1dz0 1c10 1dX0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 19z0 1fB0 1qL0 11B0 1on0 Wp0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0|26e5", 
  "Asia/Dili|+09 +08|-90 -80|010|fpr0 Xld0|19e4", "Asia/Dubai|+04|-40|0||39e5", "Asia/Dushanbe|+06 +07 +05|-60 -70 -50|0101010101010101010102|rn60 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2hB0|76e4", "Asia/Famagusta|EET EEST +03|-20 -30 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101012010101010101010101010101010|cPa0 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 15U0 2Ks0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00", 
  "Asia/Gaza|IST IDT EET EEST|-20 -30 -20 -30|010101010101010101010101010101023232323232323232323232323232323232323232323232323232323232323232323232|aXa0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 11z0 1o10 14o0 1lA1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0|18e5", 
  "Asia/Hebron|IST IDT EET EEST|-20 -30 -20 -30|01010101010101010101010101010102323232323232323232323232323232323232323232323232323232323232323232323232|aXa0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 12L0 1mN0 14o0 1lc0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0|25e4", 
  "Asia/Ho_Chi_Minh|+08 +07|-80 -70|01|dfs0|90e5", "Asia/Hong_Kong|HKT HKST|-80 -90|01010101010101010|H7u 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|73e5", "Asia/Hovd|+06 +07 +08|-60 -70 -80|01212121212121212121212121212121212121212121212121|jsG0 cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|81e3", 
  "Asia/Irkutsk|+08 +09 +07|-80 -90 -70|010101010101010101010201010101010101010101010101010101010101010|rn40 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4", "Europe/Istanbul|EET EEST +04 +03|-20 -30 -40 -30|01010101010101010123232323231010101010101010101010101010101010101010101010101010101010101013|MK0 11z0 1o10 11z0 1qN0 11z0 1ze0 11B0 WM0 1qO0 WI0 1nX0 1rB0 10L0 11B0 1in0 17d0 1in0 2pX0 19E0 1fU0 16Q0 1iI0 16Q0 1iI0 1Vd0 pb0 3Kp0 14o0 1de0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1a00 1fA0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WO0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 15w0|13e6", 
  "Asia/Jakarta|WIB|-70|0||31e6", "Asia/Jayapura|WIT|-90|0||26e4", "Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|aXa0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 1hB0 1dX0 1ep0 1aL0 1eN0 17X0 1nf0 11z0 1tB0 19W0 1e10 17b0 1ep0 1gL0 18N0 1fz0 1eN0 17b0 1gq0 1gn0 19d0 1dz0 1c10 17X0 1hB0 1gn0 19d0 1dz0 1c10 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0|81e4", 
  "Asia/Kabul|+0430|-4u|0||46e5", "Asia/Kamchatka|+12 +13 +11|-c0 -d0 -b0|0101010101010101010102010101010101010101010101010101010101020|rn00 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|18e4", "Asia/Karachi|+05 PKT PKST|-50 -50 -60|01212121|2Xv0 1fy00 1cL0 dK10 11b0 1610 1jX0|24e6", 
  "Asia/Kathmandu|+0530 +0545|-5u -5J|01|CVuu|12e5", "Asia/Khandyga|+09 +10 +08 +11|-90 -a0 -80 -b0|01010101010101010101020101010101010101010101010131313131313131310|rn30 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 qK0 yN0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|66e2", "Asia/Krasnoyarsk|+07 +08 +06|-70 -80 -60|010101010101010101010201010101010101010101010101010101010101010|rn50 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|10e5", 
  "Asia/Kuala_Lumpur|+0730 +08|-7u -80|01|td4u|71e5", "Asia/Macau|CST CDT|-80 -90|01010101010101010|H7u 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|57e4", "Asia/Magadan|+11 +12 +10|-b0 -c0 -a0|0101010101010101010102010101010101010101010101010101010101010120|rn10 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Cq0|95e3", 
  "Asia/Makassar|WITA|-80|0||15e5", "Asia/Manila|PST PDT|-80 -90|010|k0E0 1db0|24e6", "Asia/Nicosia|EET EEST|-20 -30|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|cPa0 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|32e4", 
  "Asia/Novokuznetsk|+07 +08 +06|-70 -80 -60|0101010101010101010102010101010101010101010101010101010101020|rn50 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|55e4", "Asia/Novosibirsk|+07 +08 +06|-70 -80 -60|01010101010101010101020101020202020202020202020202020202020202020|rn50 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 ml0 Os0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 4eN0|15e5", 
  "Asia/Omsk|+06 +07 +05|-60 -70 -50|010101010101010101010201010101010101010101010101010101010101010|rn60 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|12e5", "Asia/Oral|+05 +06 +04|-50 -60 -40|010101010101010202020202020202020202020202020|rn70 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 1cM0 IM0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|27e4", 
  "Asia/Pontianak|WITA WIB|-80 -70|01|HNs0|23e4", "Asia/Pyongyang|KST KST|-90 -8u|010|1P4D0 6BA0|29e5", "Asia/Qostanay|+05 +06 +04|-50 -60 -40|0101010101010101010201010101010101010101010101|rn70 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0", "Asia/Qyzylorda|+05 +06|-50 -60|010101010101010101010101010101010101010101010|rn70 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 3ao0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 zQl0|73e4", 
  "Asia/Rangoon|+0630|-6u|0||48e5", "Asia/Sakhalin|+11 +12 +10|-b0 -c0 -a0|010101010101010101010201010101010202020202020202020202020202020|rn10 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 2pB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|58e4", "Asia/Samarkand|+05 +06|-50 -60|010101010101010101010|rn70 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|36e4", 
  "Asia/Seoul|KST KDT|-90 -a0|01010|Gf50 11A0 1o00 11A0|23e6", "Asia/Srednekolymsk|+11 +12 +10|-b0 -c0 -a0|010101010101010101010201010101010101010101010101010101010101010|rn10 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|35e2", "Asia/Taipei|CST CDT|-80 -90|0101010|akg0 1db0 1cN0 1db0 97B0 AL0|74e5", 
  "Asia/Tashkent|+06 +07 +05|-60 -70 -50|0101010101010101010102|rn60 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0|23e5", "Asia/Tbilisi|+04 +05 +03|-40 -50 -30|01010101010101010101020202010101010101010101020|rn80 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cK0 1cL0 1cN0 1cL0 1cN0 2pz0 1cL0 1fB0 3Nz0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 An0 Os0 WM0|11e5", "Asia/Tehran|+0330 +04 +05 +0430|-3u -40 -50 -4u|0121030303030303030303030303030303030303030303030303030303030303030303030303030303030|j4ku TXu 1pz0 sN0 vAu 1cL0 1dB0 1en0 pNB0 UL0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 64p0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0|14e6", 
  "Asia/Thimphu|+0530 +06|-5u -60|01|HcGu|79e3", "Asia/Tokyo|JST|-90|0||38e6", "Asia/Tomsk|+07 +08 +06|-70 -80 -60|01010101010101010101020101010101010101010101020202020202020202020|rn50 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 co0 1bB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Qp0|10e5", "Asia/Ulaanbaatar|+07 +08 +09|-70 -80 -90|01212121212121212121212121212121212121212121212121|jsF0 cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|12e5", 
  "Asia/Ust-Nera|+09 +12 +11 +10|-90 -c0 -b0 -a0|0121212121212121212123212121212121212121212121212121212121212123|rn30 1d90 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|65e2", "Asia/Vladivostok|+10 +11 +09|-a0 -b0 -90|010101010101010101010201010101010101010101010101010101010101010|rn20 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4", 
  "Asia/Yakutsk|+09 +10 +08|-90 -a0 -80|010101010101010101010201010101010101010101010101010101010101010|rn30 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|28e4", "Asia/Yekaterinburg|+05 +06 +04|-50 -60 -40|010101010101010101010201010101010101010101010101010101010101010|rn70 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|14e5", 
  "Asia/Yerevan|+04 +05 +03|-40 -50 -30|01010101010101010101020202020101010101010101010101010101010|rn80 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 4RX0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|13e5", "Atlantic/Azores|-01 +00 WET|10 0 0|0101010101010101010101010101010121010101010101010101010101010101010101010101010101010101010101010101010101010|hAN0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|25e4", 
  "Atlantic/Bermuda|AST ADT|40 30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|avi0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e3", 
  "Atlantic/Canary|WET WEST|0 -10|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|oXc0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|54e4", 
  "Atlantic/Cape_Verde|-02 -01|20 10|01|elE0|50e4", "Atlantic/Faroe|WET WEST|0 -10|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|rm10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|49e3", 
  "Atlantic/Madeira|WET WEST|0 -10|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hAM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|27e4", 
  "Atlantic/South_Georgia|-02|20|0||30", "Atlantic/Stanley|-04 -03 -02|40 30 20|01212101010101010101010101010101010101010101010101010101|wrg0 WL0 1qL0 U10 1tz0 2mN0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 U10 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qN0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 U10 1tz0 U10 1tz0 U10|21e2", "Australia/Sydney|AEST AEDT|-a0 -b0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|4r40 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|40e5", 
  "Australia/Adelaide|ACST ACDT|-9u -au|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|4r4u LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 WM0 1qM0 Rc0 1zc0 U00 1tA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|11e5", 
  "Australia/Brisbane|AEST AEDT|-a0 -b0|010101010|4r40 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0|20e5", "Australia/Broken_Hill|ACST ACDT|-9u -au|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|4r4u LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|18e3", 
  "Australia/Currie|AEST AEDT|-a0 -b0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|4r40 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|746", 
  "Australia/Darwin|ACST|-9u|0||12e4", "Australia/Eucla|+0845 +0945|-8J -9J|0101010101010|bHRf Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|368", "Australia/Hobart|AEDT AEST|-b0 -a0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|qg0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|21e4", 
  "Australia/Lord_Howe|AEST +1030 +1130 +11|-a0 -au -bu -b0|01212121213131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313|raC0 1zdu Rb0 1zd0 On0 1zd0 On0 1zd0 On0 1zd0 TXu 1qMu WLu 1tAu WLu 1tAu TXu 1tAu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 11Au 1nXu 1qMu 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu 11zu 1o0u WLu 1qMu 14nu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu|347", 
  "Australia/Lindeman|AEST AEDT|-a0 -b0|0101010101010|4r40 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0|10", "Australia/Melbourne|AEST AEDT|-a0 -b0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|4r40 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1qM0 11A0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|39e5", 
  "Australia/Perth|AWST AWDT|-80 -90|0101010101010|bHS0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|18e5", "Europe/Brussels|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|21e5", 
  "Pacific/Easter|-06 -07 -05|60 70 50|010101010101010101010101020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202020202|yP0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 2pA0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0|30e2", 
  "EET|EET EEST|-20 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00", 
  "Europe/Dublin|IST GMT|-10 0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|4re0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|12e5", 
  "Etc/GMT-1|+01|-10|0|", "Pacific/Guadalcanal|+11|-b0|0||11e4", "Pacific/Tarawa|+12|-c0|0||29e3", "Etc/GMT-13|+13|-d0|0|", "Etc/GMT-14|+14|-e0|0|", "Etc/GMT-2|+02|-20|0|", "Indian/Maldives|+05|-50|0||35e4", "Pacific/Palau|+09|-90|0||21e3", "Etc/GMT+1|-01|10|0|", "Pacific/Tahiti|-10|a0|0||18e4", "Etc/GMT+11|-11|b0|0|", "Etc/GMT+12|-12|c0|0|", "Etc/GMT+5|-05|50|0|", "Etc/GMT+6|-06|60|0|", "Etc/GMT+7|-07|70|0|", "Etc/GMT+8|-08|80|0|", "Pacific/Gambier|-09|90|0||125", "Etc/UTC|UTC|0|0|", "Europe/Andorra|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|B7d0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|79e3", 
  "Europe/Astrakhan|+04 +05 +03|-40 -50 -30|0101010101010101020202020202020202020202020202020202020202020|rn80 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|10e5", "Europe/Athens|EET EEST|-20 -30|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|cOK0 1vc0 SO0 1cM0 1a00 1ao0 1fc0 1a10 1fG0 1cg0 1dX0 1bX0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|35e5", 
  "Europe/London|BST GMT|-10 0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|4re0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|10e6", 
  "Europe/Belgrade|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|wdd0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|12e5", 
  "Europe/Prague|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|muN0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|13e5", 
  "Europe/Bucharest|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|mRa0 On0 1fA0 1a10 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|19e5", 
  "Europe/Budapest|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|oXc0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|17e5", 
  "Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|rm10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|38e4", 
  "Europe/Chisinau|MSK MSD EEST EET|-30 -40 -30 -20|010101010101010101012323232323232323232323232323232323232323232323232323232323232323232323232323232323|rn90 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 gL0 WO0 1cM0 1cM0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11D0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|67e4", 
  "Europe/Gibraltar|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|tLB0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|30e3", 
  "Europe/Helsinki|EET EEST|-20 -30|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|rm00 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|12e5", 
  "Europe/Kaliningrad|MSK MSD EEST EET +03|-30 -40 -30 -20 -30|010101010101010102323232323232323232323232323232323232323232343|rn90 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|44e4", "Europe/Kiev|MSK MSD EEST EET|-30 -40 -30 -20|0101010101010101010123232323232323232323232323232323232323232323232323232323232323232323232323232323|rn90 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|34e5", 
  "Europe/Kirov|+04 +05 +03|-40 -50 -30|010101010101010102020202020202020202020202020202020202020202|rn80 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|48e4", "Europe/Lisbon|CET WET WEST CEST|-10 0 -10 -20|01212121212121212121212121212121203030302121212121212121212121212121212121212121212121212121212121212121212121|go00 1cM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|27e5", 
  "Europe/Madrid|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|apy0 1a10 1fz0 1a10 19X0 1cN0 1fz0 1a10 1fC0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|62e5", 
  "Europe/Malta|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|XX0 LA0 1zc0 Oo0 1C00 Oo0 1co0 1cM0 1lA0 Xc0 1qq0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1iN0 19z0 1fB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|42e4", 
  "Europe/Minsk|MSK MSD EEST EET +03|-30 -40 -30 -20 -30|010101010101010101023232323232323232323232323232323232323234|rn90 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 3Fc0 1cN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0|19e5", "Europe/Paris|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|fbc0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|11e6", 
  "Europe/Moscow|MSK MSD EEST EET MSK|-30 -40 -30 -20 -40|0101010101010101010102301010101010101010101010101010101010101040|rn90 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|16e6", "Europe/Riga|MSK MSD EEST EET|-30 -40 -30 -20|010101010101010102323232323232323232323232323232323232323232323232323232323232323232323232323232323|rn90 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1o00 11A0 1o00 11A0 1qM0 3oo0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|64e4", 
  "Europe/Rome|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|XX0 LA0 1zc0 Oo0 1C00 Oo0 1C00 LA0 1zc0 Oo0 1C00 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1zc0 Oo0 1fC0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|39e5", 
  "Europe/Samara|+04 +05 +03|-40 -50 -30|01010101010101010202010101010101010101010101010101010101020|rn80 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2y10 14m0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|12e5", "Europe/Saratov|+04 +05 +03|-40 -50 -30|0101010101010102020202020202020202020202020202020202020202020|rn80 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 5810", 
  "Europe/Simferopol|MSK MSD EET EEST MSK|-30 -40 -20 -30 -40|0101010101010101010232323101010323232323232323232323232323232323240|rn90 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 4eL0 1cL0 1cN0 1cL0 1cN0 dX0 WL0 1cN0 1cL0 1fB0 1o30 11B0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4", "Europe/Sofia|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|muJ0 1dd0 1fb0 1ap0 1fb0 1a20 1fy0 1a30 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|12e5", 
  "Europe/Tallinn|MSK MSD EEST EET|-30 -40 -30 -20|0101010101010101023232323232323232323232323232323232323232323232323232323232323232323232323232323|rn90 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o10 11A0 1qM0 5QM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|41e4", 
  "Europe/Tirane|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|axz0 10n0 1op0 11z0 1pd0 11z0 1qN0 WL0 1qp0 Xb0 1qp0 Xb0 1qp0 11z0 1lB0 11z0 1qN0 11z0 1iN0 16n0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|42e4", 
  "Europe/Ulyanovsk|+04 +05 +03 +02|-40 -50 -30 -20|010101010101010102023202020202020202020202020202020202020202020|rn80 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|13e5", "Europe/Uzhgorod|MSK MSD CET EET EEST|-30 -40 -10 -20 -30|010101010101010101023434343434343434343434343434343434343434343434343434343434343434343434343434343|rn90 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 1Nf0 2pw0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|11e4", 
  "Europe/Vienna|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|oXb0 19X0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|18e5", 
  "Europe/Vilnius|MSK MSD EEST EET CEST CET|-30 -40 -30 -20 -20 -10|01010101010101010232323232323232323454323232323232323232323232323232323232323232323232323232323|rn90 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11B0 1o00 11A0 1qM0 8io0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|54e4", 
  "Europe/Volgograd|+04 +05 +03|-40 -50 -30|0101010101010102020202020202020202020202020202020202020202020|rn80 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 9Jd0|10e5", "Europe/Warsaw|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDA0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|17e5", 
  "Europe/Zaporozhye|MSK MSD EEST EET|-30 -40 -30 -20|01010101010101010101023232323232323232323232323232323232323232323232323232323232323232323232323232323|rn90 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cK0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|77e4", 
  "Pacific/Honolulu|HST|a0|0||37e4", "Indian/Chagos|+05 +06|-50 -60|01|13ij0|30e2", "Indian/Mauritius|+04 +05|-40 -50|01010|v5U0 14L0 12kr0 11z0|15e4", "Pacific/Kwajalein|-12 +12|c0 -c0|01|Vxo0|14e3", "MET|MET MEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00", 
  "Pacific/Chatham|+1245 +1345|-cJ -dJ|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|bKC0 IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00|600", 
  "Pacific/Apia|-11 -10 +14 +13|b0 a0 -e0 -d0|0101232323232323232323232323232323232323232|1Dbn0 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00|37e3", "Pacific/Bougainville|+10 +11|-a0 -b0|01|1NwE0|18e4", "Pacific/Efate|+11 +12|-b0 -c0|010101010101010101010|xpN0 1cL0 1oN0 10L0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 Lz0 1Nd0 An0|66e3", 
  "Pacific/Enderbury|-12 -11 +13|c0 b0 -d0|012|nIc0 B7X0|1", "Pacific/Fakaofo|-11 +13|b0 -d0|01|1Gfn0|483", "Pacific/Fiji|+12 +13|-c0 -d0|010101010101010101010101010101010101010101010101|1ace0 LA0 1EM0 IM0 nJc0 LA0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 1VA0|88e4", "Pacific/Galapagos|-05 -06|50 60|0101|CVF0 gNd0 rz0|25e3", "Pacific/Guam|GST GDT ChST|-a0 -b0 -a0|010101010102|JQ0 Rb0 1wp0 Rb0 5xd0 rX0 5sN0 zb1 1C0X On0 ULb0|17e4", 
  "Pacific/Kiritimati|-1040 -10 +14|aE a0 -e0|012|nIaE B7Xk|51e2", "Pacific/Kosrae|+12 +11|-c0 -b0|01|1aAA0|66e2", "Pacific/Marquesas|-0930|9u|0||86e2", "Pacific/Pago_Pago|SST|b0|0||37e2", "Pacific/Nauru|+1130 +12|-bu -c0|01|maCu|10e3", "Pacific/Niue|-1130 -11|bu b0|01|libu|12e2", "Pacific/Norfolk|+1130 +1230 +11|-bu -cu -b0|0102|bHOu On0 1COp0|25e4", "Pacific/Noumea|+11 +12|-b0 -c0|0101010|jhp0 xX0 1PB0 yn0 HeP0 Ao0|98e3", "Pacific/Pitcairn|-0830 -08|8u 80|01|18Vku|56", "Pacific/Rarotonga|-1030 -0930 -10|au 9u a0|012121212121212121212121212|lyWu IL0 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu|13e3", 
  "Pacific/Tongatapu|+13 +14|-d0 -e0|010101010|1csd0 15A0 1wo0 xz0 1Q10 xz0 zWN0 s00|75e3", "WET|WET WEST|0 -10|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00"], 
  "links":["Africa/Abidjan|Africa/Accra", "Africa/Abidjan|Africa/Bamako", "Africa/Abidjan|Africa/Banjul", "Africa/Abidjan|Africa/Conakry", "Africa/Abidjan|Africa/Dakar", "Africa/Abidjan|Africa/Freetown", "Africa/Abidjan|Africa/Lome", "Africa/Abidjan|Africa/Nouakchott", "Africa/Abidjan|Africa/Ouagadougou", "Africa/Abidjan|Africa/Timbuktu", "Africa/Abidjan|Atlantic/Reykjavik", "Africa/Abidjan|Atlantic/St_Helena", "Africa/Abidjan|Etc/GMT", "Africa/Abidjan|Etc/GMT+0", "Africa/Abidjan|Etc/GMT-0", "Africa/Abidjan|Etc/GMT0", 
  "Africa/Abidjan|Etc/Greenwich", "Africa/Abidjan|GMT", "Africa/Abidjan|GMT+0", "Africa/Abidjan|GMT-0", "Africa/Abidjan|GMT0", "Africa/Abidjan|Greenwich", "Africa/Abidjan|Iceland", "Africa/Cairo|Egypt", "Africa/Johannesburg|Africa/Maseru", "Africa/Johannesburg|Africa/Mbabane", "Africa/Lagos|Africa/Bangui", "Africa/Lagos|Africa/Brazzaville", "Africa/Lagos|Africa/Douala", "Africa/Lagos|Africa/Kinshasa", "Africa/Lagos|Africa/Libreville", "Africa/Lagos|Africa/Luanda", "Africa/Lagos|Africa/Malabo", "Africa/Lagos|Africa/Niamey", 
  "Africa/Lagos|Africa/Porto-Novo", "Africa/Maputo|Africa/Blantyre", "Africa/Maputo|Africa/Bujumbura", "Africa/Maputo|Africa/Gaborone", "Africa/Maputo|Africa/Harare", "Africa/Maputo|Africa/Kigali", "Africa/Maputo|Africa/Lubumbashi", "Africa/Maputo|Africa/Lusaka", "Africa/Nairobi|Africa/Addis_Ababa", "Africa/Nairobi|Africa/Asmara", "Africa/Nairobi|Africa/Asmera", "Africa/Nairobi|Africa/Dar_es_Salaam", "Africa/Nairobi|Africa/Djibouti", "Africa/Nairobi|Africa/Kampala", "Africa/Nairobi|Africa/Mogadishu", 
  "Africa/Nairobi|Indian/Antananarivo", "Africa/Nairobi|Indian/Comoro", "Africa/Nairobi|Indian/Mayotte", "Africa/Tripoli|Libya", "America/Adak|America/Atka", "America/Adak|US/Aleutian", "America/Anchorage|US/Alaska", "America/Argentina/Buenos_Aires|America/Buenos_Aires", "America/Argentina/Catamarca|America/Argentina/ComodRivadavia", "America/Argentina/Catamarca|America/Catamarca", "America/Argentina/Cordoba|America/Cordoba", "America/Argentina/Cordoba|America/Rosario", "America/Argentina/Jujuy|America/Jujuy", 
  "America/Argentina/Mendoza|America/Mendoza", "America/Cayenne|Etc/GMT+3", "America/Chicago|CST6CDT", "America/Chicago|US/Central", "America/Denver|America/Shiprock", "America/Denver|MST7MDT", "America/Denver|Navajo", "America/Denver|US/Mountain", "America/Detroit|US/Michigan", "America/Edmonton|Canada/Mountain", "America/Fort_Wayne|America/Indiana/Indianapolis", "America/Fort_Wayne|America/Indianapolis", "America/Fort_Wayne|US/East-Indiana", "America/Halifax|Canada/Atlantic", "America/Havana|Cuba", 
  "America/Indiana/Knox|America/Knox_IN", "America/Indiana/Knox|US/Indiana-Starke", "America/Jamaica|Jamaica", "America/Kentucky/Louisville|America/Louisville", "America/La_Paz|Etc/GMT+4", "America/Los_Angeles|PST8PDT", "America/Los_Angeles|US/Pacific", "America/Los_Angeles|US/Pacific-New", "America/Manaus|Brazil/West", "America/Mazatlan|Mexico/BajaSur", "America/Mexico_City|Mexico/General", "America/New_York|EST5EDT", "America/New_York|US/Eastern", "America/Noronha|Brazil/DeNoronha", "America/Panama|America/Atikokan", 
  "America/Panama|America/Cayman", "America/Panama|America/Coral_Harbour", "America/Panama|EST", "America/Phoenix|America/Creston", "America/Phoenix|MST", "America/Phoenix|US/Arizona", "America/Puerto_Rico|America/Anguilla", "America/Puerto_Rico|America/Antigua", "America/Puerto_Rico|America/Aruba", "America/Puerto_Rico|America/Blanc-Sablon", "America/Puerto_Rico|America/Curacao", "America/Puerto_Rico|America/Dominica", "America/Puerto_Rico|America/Grenada", "America/Puerto_Rico|America/Guadeloupe", 
  "America/Puerto_Rico|America/Kralendijk", "America/Puerto_Rico|America/Lower_Princes", "America/Puerto_Rico|America/Marigot", "America/Puerto_Rico|America/Montserrat", "America/Puerto_Rico|America/Port_of_Spain", "America/Puerto_Rico|America/St_Barthelemy", "America/Puerto_Rico|America/St_Kitts", "America/Puerto_Rico|America/St_Lucia", "America/Puerto_Rico|America/St_Thomas", "America/Puerto_Rico|America/St_Vincent", "America/Puerto_Rico|America/Tortola", "America/Puerto_Rico|America/Virgin", "America/Regina|Canada/Saskatchewan", 
  "America/Rio_Branco|America/Porto_Acre", "America/Rio_Branco|Brazil/Acre", "America/Santiago|Chile/Continental", "America/Sao_Paulo|Brazil/East", "America/St_Johns|Canada/Newfoundland", "America/Tijuana|America/Ensenada", "America/Tijuana|America/Santa_Isabel", "America/Tijuana|Mexico/BajaNorte", "America/Toronto|America/Montreal", "America/Toronto|America/Nassau", "America/Toronto|Canada/Eastern", "America/Vancouver|Canada/Pacific", "America/Whitehorse|Canada/Yukon", "America/Winnipeg|Canada/Central", 
  "Asia/Ashgabat|Asia/Ashkhabad", "Asia/Bangkok|Asia/Phnom_Penh", "Asia/Bangkok|Asia/Vientiane", "Asia/Bangkok|Etc/GMT-7", "Asia/Bangkok|Indian/Christmas", "Asia/Brunei|Asia/Kuching", "Asia/Brunei|Etc/GMT-8", "Asia/Dhaka|Asia/Dacca", "Asia/Dubai|Asia/Muscat", "Asia/Dubai|Etc/GMT-4", "Asia/Dubai|Indian/Mahe", "Asia/Dubai|Indian/Reunion", "Asia/Ho_Chi_Minh|Asia/Saigon", "Asia/Hong_Kong|Hongkong", "Asia/Jerusalem|Asia/Tel_Aviv", "Asia/Jerusalem|Israel", "Asia/Kathmandu|Asia/Katmandu", "Asia/Kolkata|Asia/Calcutta", 
  "Asia/Kuala_Lumpur|Asia/Singapore", "Asia/Kuala_Lumpur|Singapore", "Asia/Macau|Asia/Macao", "Asia/Makassar|Asia/Ujung_Pandang", "Asia/Nicosia|Europe/Nicosia", "Asia/Qatar|Asia/Bahrain", "Asia/Rangoon|Asia/Yangon", "Asia/Rangoon|Indian/Cocos", "Asia/Riyadh|Antarctica/Syowa", "Asia/Riyadh|Asia/Aden", "Asia/Riyadh|Asia/Kuwait", "Asia/Riyadh|Etc/GMT-3", "Asia/Seoul|ROK", "Asia/Shanghai|Asia/Chongqing", "Asia/Shanghai|Asia/Chungking", "Asia/Shanghai|Asia/Harbin", "Asia/Shanghai|PRC", "Asia/Taipei|ROC", 
  "Asia/Tehran|Iran", "Asia/Thimphu|Asia/Thimbu", "Asia/Tokyo|Japan", "Asia/Ulaanbaatar|Asia/Ulan_Bator", "Asia/Urumqi|Antarctica/Vostok", "Asia/Urumqi|Asia/Kashgar", "Asia/Urumqi|Etc/GMT-6", "Atlantic/Faroe|Atlantic/Faeroe", "Atlantic/South_Georgia|Etc/GMT+2", "Australia/Adelaide|Australia/South", "Australia/Brisbane|Australia/Queensland", "Australia/Broken_Hill|Australia/Yancowinna", "Australia/Darwin|Australia/North", "Australia/Hobart|Australia/Tasmania", "Australia/Lord_Howe|Australia/LHI", 
  "Australia/Melbourne|Australia/Victoria", "Australia/Perth|Australia/West", "Australia/Sydney|Australia/ACT", "Australia/Sydney|Australia/Canberra", "Australia/Sydney|Australia/NSW", "Etc/UTC|Etc/UCT", "Etc/UTC|Etc/Universal", "Etc/UTC|Etc/Zulu", "Etc/UTC|UCT", "Etc/UTC|UTC", "Etc/UTC|Universal", "Etc/UTC|Zulu", "Europe/Belgrade|Europe/Ljubljana", "Europe/Belgrade|Europe/Podgorica", "Europe/Belgrade|Europe/Sarajevo", "Europe/Belgrade|Europe/Skopje", "Europe/Belgrade|Europe/Zagreb", "Europe/Berlin|Arctic/Longyearbyen", 
  "Europe/Berlin|Atlantic/Jan_Mayen", "Europe/Berlin|Europe/Copenhagen", "Europe/Berlin|Europe/Oslo", "Europe/Berlin|Europe/Stockholm", "Europe/Brussels|CET", "Europe/Brussels|Europe/Amsterdam", "Europe/Brussels|Europe/Luxembourg", "Europe/Chisinau|Europe/Tiraspol", "Europe/Dublin|Eire", "Europe/Helsinki|Europe/Mariehamn", "Europe/Istanbul|Asia/Istanbul", "Europe/Istanbul|Turkey", "Europe/Lisbon|Portugal", "Europe/London|Europe/Belfast", "Europe/London|Europe/Guernsey", "Europe/London|Europe/Isle_of_Man", 
  "Europe/London|Europe/Jersey", "Europe/London|GB", "Europe/London|GB-Eire", "Europe/Moscow|W-SU", "Europe/Paris|Europe/Monaco", "Europe/Prague|Europe/Bratislava", "Europe/Rome|Europe/San_Marino", "Europe/Rome|Europe/Vatican", "Europe/Warsaw|Poland", "Europe/Zurich|Europe/Busingen", "Europe/Zurich|Europe/Vaduz", "Indian/Maldives|Etc/GMT-5", "Indian/Maldives|Indian/Kerguelen", "Pacific/Auckland|Antarctica/McMurdo", "Pacific/Auckland|Antarctica/South_Pole", "Pacific/Auckland|NZ", "Pacific/Chatham|NZ-CHAT", 
  "Pacific/Easter|Chile/EasterIsland", "Pacific/Gambier|Etc/GMT+9", "Pacific/Guadalcanal|Etc/GMT-11", "Pacific/Guadalcanal|Pacific/Pohnpei", "Pacific/Guadalcanal|Pacific/Ponape", "Pacific/Guam|Pacific/Saipan", "Pacific/Honolulu|HST", "Pacific/Honolulu|Pacific/Johnston", "Pacific/Honolulu|US/Hawaii", "Pacific/Kwajalein|Kwajalein", "Pacific/Pago_Pago|Pacific/Midway", "Pacific/Pago_Pago|Pacific/Samoa", "Pacific/Pago_Pago|US/Samoa", "Pacific/Palau|Etc/GMT-9", "Pacific/Port_Moresby|Antarctica/DumontDUrville", 
  "Pacific/Port_Moresby|Etc/GMT-10", "Pacific/Port_Moresby|Pacific/Chuuk", "Pacific/Port_Moresby|Pacific/Truk", "Pacific/Port_Moresby|Pacific/Yap", "Pacific/Tahiti|Etc/GMT+10", "Pacific/Tarawa|Etc/GMT-12", "Pacific/Tarawa|Pacific/Funafuti", "Pacific/Tarawa|Pacific/Majuro", "Pacific/Tarawa|Pacific/Wake", "Pacific/Tarawa|Pacific/Wallis"]});
  return moment;
})(abv.moment);
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
    if (true === this.__isEmptyData()) {
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
    if (true === this.__isEmptyData()) {
      this.__skip = true;
      return;
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
    if (true === this.__isEmptyData()) {
      return;
    }
    var pattern = new RegExp(this.__pattern);
    if (false === pattern.test(this.data)) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    if (true === this.__isEmptyData()) {
      this.__skip = true;
      return;
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
    if (true === this.__isEmptyData()) {
      return;
    }
    var regexp = new RegExp(this.pattern);
    if (this.match !== regexp.test(this.data)) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    if (true === this.__isEmptyData()) {
      this.__skip = true;
      return;
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
    if (true === this.__isEmptyData()) {
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
    if (true === this.__isEmptyData()) {
      this.__skip = true;
      return;
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
    if (true === this.__isEmptyData()) {
      this.__skip = true;
      return;
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
    if (true === this.__isEmptyData()) {
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
    if (true === this.__isEmptyData()) {
      this.__skip = true;
      return;
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
    if (true === this.__isEmptyData()) {
      this.__skip = true;
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
    if (true === this.__isEmptyData()) {
      this.__skip = true;
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
Object.assign(abv, function() {
  var DateValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.message = this.__options.message || "This value is not a valid date.";
    this.format = this.__options.format || "YYYY-MM-DD";
    this.__setName("DateValidator");
  };
  DateValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  DateValidator.prototype.constructor = DateValidator;
  Object.defineProperty(DateValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(DateValidator.prototype, {__validate:function() {
    if (this.data !== this.__moment(this.data, this.format).format(this.format)) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    if (true === this.__isEmptyData()) {
      this.__skip = true;
      return;
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
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {DateValidator:DateValidator};
}());
Object.assign(abv, function() {
  var DateTimeValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}', format:'type:{"type":"string"}'}, lang, internal);
    this.message = this.__options.message || "This value is not a valid datetime.";
    this.format = this.__options.format || "YYYY-MM-DD HH:mm:ss";
    this.__setName("DateTimeValidator");
  };
  DateTimeValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  DateTimeValidator.prototype.constructor = DateTimeValidator;
  Object.defineProperty(DateTimeValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(DateTimeValidator.prototype, {__validate:function() {
    var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"date-string"}', true);
    if (null !== errorMessage) {
      this.__setErrorMessage(errorMessage, {});
      return;
    }
    if (this.data !== this.__moment(this.data, this.format).format(this.format)) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    if (true === this.__isEmptyData()) {
      this.__skip = true;
      return;
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
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {DateTimeValidator:DateTimeValidator};
}());
Object.assign(abv, function() {
  var TimeValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.message = this.__options.message || "This value is not a valid time.";
    this.format = this.__options.format || "HH:mm:ss";
    this.__setName("TimeValidator");
  };
  TimeValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  TimeValidator.prototype.constructor = TimeValidator;
  Object.defineProperty(TimeValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(TimeValidator.prototype, {__validate:function() {
    if (this.data !== this.__moment(this.data, this.format).format(this.format)) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    if (true === this.__isEmptyData()) {
      this.__skip = true;
      return;
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
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {TimeValidator:TimeValidator};
}());
Object.assign(abv, function() {
  var TimezoneValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {message:'length:{"min":3,"max":255}'}, lang, internal);
    this.message = this.__options.message || "This value is not a valid timezone.";
    this.__setName("TimezoneValidator");
  };
  TimezoneValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  TimezoneValidator.prototype.constructor = TimezoneValidator;
  Object.defineProperty(TimezoneValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(TimezoneValidator.prototype, {__validate:function() {
    var zone = this.__moment.tz.zone(this.data);
    if (null === zone) {
      this.__setErrorMessage(this.message, this.__messageParameters());
      return;
    }
  }, __beforeValidate:function() {
    if (true === this.__isEmptyData()) {
      this.__skip = true;
      return;
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
  }, __messageParameters:function() {
    return {"value":this.data};
  }});
  return {TimezoneValidator:TimezoneValidator};
}());
Object.assign(abv, function() {
  var ChoiceValidator = function(data, options, lang, internal) {
    abv.AbstractValidator.call(this, data, options, {callback:'type:{"type":["string","array","callable"],"any":true}', choices:'type:{"type":"array"}', max:'type:{"type":"numeric"}', maxMessage:'length:{"min":3,"max":255}', min:'type:{"type":"numeric"}', minMessage:'length:{"min":3,"max":255}', multiple:'type:{"type":"bool"}', multipleMessage:'length:{"min":3,"max":255}'}, lang, internal);
    this.callback = this.__options.callback;
    this.choices = this.__options.choices;
    this.max = this.__options.max;
    this.maxMessage = this.__options.maxMessage || "You must select at most %%limit%% choices.";
    this.message = this.__options.message || "The value you selected is not a valid choice.";
    this.min = this.__options.min;
    this.minMessage = this.__options.minMessage || "You must select at least %%limit%% choices.";
    this.multiple = true === this.__options.multiple;
    this.multipleMessage = this.__options.multipleMessage || "One or more of the given values is invalid.";
    this.__currentInvalidDataItem = null;
    this.__setName("ChoiceValidator");
  };
  ChoiceValidator.prototype = Object.create(abv.AbstractValidator.prototype);
  ChoiceValidator.prototype.constructor = ChoiceValidator;
  Object.defineProperty(ChoiceValidator.prototype, "name", {get:function() {
    return this.__getName();
  }});
  Object.assign(ChoiceValidator.prototype, {__validate:function() {
    if (true === this.multiple) {
      for (var key in this.value) {
        if (!this.value.hasOwnProperty(key)) {
          continue;
        }
        if (false === this.choices.includes(this.value[key])) {
          this.__currentInvalidDataItem = this.value[key];
          this.__setErrorMessage(this.multipleMessage, this.__multipleMessageParameters());
          return;
        }
      }
      var count = this.data.length;
      if (this.min && count < this.min) {
        this.__setErrorMessage(this.minMessage, this.__minMessageParameters());
        return;
      }
      if (this.max && count > this.max) {
        this.__setErrorMessage(this.maxMessage, this.__maxMessageParameters());
        return;
      }
    } else {
      if (false === this.choices.includes(this.data)) {
        this.__setErrorMessage(this.message, this.__messageParameters());
        return;
      }
    }
  }, __beforeValidate:function() {
    if (false === abv.isType("array", this.choices) && "undefined" === typeof this.callback) {
      throw new Error('Either "choices" or "callback" must be specified on constraint Choice');
    }
    if (true === this.__isEmptyData()) {
      this.__skip = true;
      return;
    }
    if (true === this.multiple && false === abv.isType("array", this.data)) {
      this.__setErrorMessage(abv.sprintf("Expected argument of type '%s', '%s' given", "Array", abv.getType(this.data)));
      this.__skip = true;
      return;
    }
    if (this.callback) {
      try {
        this.choices = this.callback.call();
      } catch (e) {
        throw new Error("The Choice constraint expects a valid callback");
      }
    }
  }, __multipleMessageParameters:function() {
    return {"value":this.__currentInvalidDataItem};
  }, __minMessageParameters:function() {
    return {"limit":this.min, "choices":JSON.stringify(this.choices), "value":JSON.stringify(this.data)};
  }, __maxMessageParameters:function() {
    return {"limit":this.max, "choices":JSON.stringify(this.choices), "value":JSON.stringify(this.data)};
  }, __messageParameters:function() {
    return {"value":JSON.stringify(this.data)};
  }});
  return {ChoiceValidator:ChoiceValidator};
}());


return abv;
}));

