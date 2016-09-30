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
var isPregMatch = require('./lib/Constraints/Functions/isPregMatch');
var isIp = require('./lib/Constraints/Functions/isIp');
var isUuid = require('./lib/Constraints/Functions/isUuid');

/**
 * Number Constraints
 */
var isRange = require('./lib/Constraints/Functions/isRange');
var isEqualTo = require('./lib/Constraints/Functions/isEqualTo');
var isNotEqualTo = require('./lib/Constraints/Functions/isNotEqualTo');
var isIdenticalTo = require('./lib/Constraints/Functions/isIdenticalTo');
var isNotIdenticalTo = require('./lib/Constraints/Functions/isNotIdenticalTo');
var isLessThan = require('./lib/Constraints/Functions/isLessThan');
var isLessThanOrEqual = require('./lib/Constraints/Functions/isLessThanOrEqual');
var isGreaterThan = require('./lib/Constraints/Functions/isGreaterThan');
var isGreaterThanOrEqual = require('./lib/Constraints/Functions/isGreaterThanOrEqual');

/**
 * Date Constraints
 */
var isDateFormat = require('./lib/Constraints/Functions/isDateFormat');
var isDateTimeFormat = require('./lib/Constraints/Functions/isDateTimeFormat');
var isTimeFormat = require('./lib/Constraints/Functions/isTimeFormat');

/**
 * Collection Constraints
 */
//@todo: ChoiceValidator
var isCount = require('./lib/Constraints/Functions/isCount');
//@todo: UniqueEntityValidator
var isLanguage = require('./lib/Constraints/Functions/isLanguage');
var isLocale = require('./lib/Constraints/Functions/isLocale');
var isCountry = require('./lib/Constraints/Functions/isCountry');

/**
 * File Constraints
 */
//@todo: FileValidator
//@todo: ImageValidator

/**
 * Financial and other Number Constraints
 */
//@todo: BicValidator
//@todo: CardSchemeValidator
//@todo: CurrencyValidator
//@todo: LuhnValidator
//@todo: IbanValidator
//@todo: IsbnValidator
//@todo: IssnValidator

/**
 * Other Constraints
 */
//@todo: CallbackValidator
//@todo: CustomValidator
//@todo: AllValidator



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
    'isIp': isIp,
    'isEqualTo': isEqualTo,
    'isNotEqualTo': isNotEqualTo,
    'isIdenticalTo': isIdenticalTo,
    'isNotIdenticalTo': isNotIdenticalTo,
    'isLessThan': isLessThan,
    'isLessThanOrEqual': isLessThanOrEqual,
    'isGreaterThan': isGreaterThan,
    'isGreaterThanOrEqual': isGreaterThanOrEqual,
    'isLanguage': isLanguage,
    'isLocale': isLocale,
    'isCountry': isCountry,
    'isPregMatch': isPregMatch,
    'isUuid': isUuid,
    'isRange': isRange,
    'isDateFormat': isDateFormat,
    'isDateTimeFormat': isDateTimeFormat,
    'isTimeFormat': isTimeFormat,
    'isCount': isCount
};