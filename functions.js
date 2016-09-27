/**
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

/**
 * Basic Constraints
 * These are the basic constraints: use them to assert very basic things about the value of properties or the return value of methods on your object.
 */
var isNotBlank = require('./lib/Constraints/Functions/isNotBlank');
var isBlank = require('./lib/Constraints/Functions/isBlank');
var isNotNull = require('./lib/Constraints/Functions/isNotNull');
var isNull = require('./lib/Constraints/Functions/isNull');
var isTrue = require('./lib/Constraints/Functions/isTrue');
var isFalse = require('./lib/Constraints/Functions/isFalse');
var isArray = require('./lib/Constraints/Functions/isArray');
var isBool = require('./lib/Constraints/Functions/isBool');
var isFloat = require('./lib/Constraints/Functions/isFloat');
var isDouble = require('./lib/Constraints/Functions/isDouble');
var isInt = require('./lib/Constraints/Functions/isInt');
var isNumeric = require('./lib/Constraints/Functions/isNumeric');
var isObject = require('./lib/Constraints/Functions/isObject');
var isScalar = require('./lib/Constraints/Functions/isScalar');
var isString = require('./lib/Constraints/Functions/isString');

/**
 * String Constraints
 */
var isEmail = require('./lib/Constraints/Functions/isEmail');
var isLength = require('./lib/Constraints/Functions/isLength');
var isUrl = require('./lib/Constraints/Functions/isUrl');
//@todo: Regex
var isIp = require('./lib/Constraints/Functions/isIp');



module.exports = {
    'isNotBlank': isNotBlank,
    'isBlank': isBlank,
    'isNotNull': isNotNull,
    'isNull': isNull,
    'isTrue': isTrue,
    'isFalse': isFalse,
    'isArray': isArray,
    'isBool': isBool,
    'isFloat': isFloat,
    'isDouble': isDouble,
    'isInt': isInt,
    'isNumeric': isNumeric,
    'isObject': isObject,
    'isScalar': isScalar,
    'isString': isString,

    'isEmail': isEmail,
    'isLength': isLength,
    'isUrl': isUrl,
    'isIp': isIp
};