/**
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

/**
 * Basic Constraints
 * These are the basic constraints: use them to assert very basic things about the value of properties or the return value of methods on your object.
 */
//export { default as NotBlankValidator } from './lib/Constraints/Classes/NotBlankValidator';
var NotBlankValidator = require('./lib/Constraints/Classes/NotBlankValidator');

//export { default as BlankValidator } from './lib/Constraints/Classes/BlankValidator';
var BlankValidator = require('./lib/Constraints/Classes/BlankValidator');

//export { default as NotNullValidator } from './lib/Constraints/Classes/NotNullValidator';
var NotNullValidator = require('./lib/Constraints/Classes/NotNullValidator');

//export { default as IsNullValidator } from './lib/Constraints/Classes/IsNullValidator';
var IsNullValidator = require('./lib/Constraints/Classes/IsNullValidator');

//export { default as IsTrueValidator } from './lib/Constraints/Classes/IsTrueValidator';
var IsTrueValidator = require('./lib/Constraints/Classes/IsTrueValidator');

//export { default as IsFalseValidator } from './lib/Constraints/Classes/IsFalseValidator';
var IsFalseValidator = require('./lib/Constraints/Classes/IsFalseValidator');

//export { default as TypeValidator } from './lib/Constraints/Classes/TypeValidator';
var TypeValidator = require('./lib/Constraints/Classes/TypeValidator');

/**
 * String Constraints
 */
//export { default as EmailValidator } from/ './lib/Constraints/Classes/EmailValidator';
var EmailValidator = require('./lib/Constraints/Classes/EmailValidator');

//export { default as LengthValidator } from './lib/Constraints/Classes/LengthValidator';
var LengthValidator = require('./lib/Constraints/Classes/LengthValidator');

//export { default as UrlValidator } from './lib/Constraints/Classes/UrlValidator';
var UrlValidator = require('./lib/Constraints/Classes/UrlValidator');

//export { default as RegexValidator } from './lib/Constraints/Classes/RegexValidator';
var RegexValidator = require('./lib/Constraints/Classes/RegexValidator');

//export { default as IpValidator } from './lib/Constraints/Classes/IpValidator';
var IpValidator = require('./lib/Constraints/Classes/IpValidator');

//export { default as UuidValidator } from './lib/Constraints/Classes/UuidValidator';
var UuidValidator = require('./lib/Constraints/Classes/UuidValidator');

/**
 * Number Constraints
 */
//export { default as RangeValidator } from './lib/Constraints/Classes/RangeValidator';
var RangeValidator = require('./lib/Constraints/Classes/RangeValidator');

/**
 * Comparison Constraints
 */
//export { default as EqualToValidator } from './lib/Constraints/Classes/EqualToValidator';
var EqualToValidator = require('./lib/Constraints/Classes/EqualToValidator');

//export { default as NotEqualToValidator } from './lib/Constraints/Classes/NotEqualToValidator';
var NotEqualToValidator = require('./lib/Constraints/Classes/NotEqualToValidator');

//export { default as IdenticalToValidator } from './lib/Constraints/Classes/IdenticalToValidator';
var IdenticalToValidator = require('./lib/Constraints/Classes/IdenticalToValidator');

//export { default as NotIdenticalToValidator } from './lib/Constraints/Classes/NotIdenticalToValidator';
var NotIdenticalToValidator = require('./lib/Constraints/Classes/NotIdenticalToValidator');

//export { default as LessThanValidator } from './lib/Constraints/Classes/LessThanValidator';
var LessThanValidator = require('./lib/Constraints/Classes/LessThanValidator');

//export { default as LessThanOrEqualValidator } from './lib/Constraints/Classes/LessThanOrEqualValidator';
var LessThanOrEqualValidator = require('./lib/Constraints/Classes/LessThanOrEqualValidator');

//export { default as GreaterThanValidator } from './lib/Constraints/Classes/GreaterThanValidator';
var GreaterThanValidator = require('./lib/Constraints/Classes/GreaterThanValidator');

//export { default as GreaterThanOrEqualValidator } from './lib/Constraints/Classes/GreaterThanOrEqualValidator';
var GreaterThanOrEqualValidator = require('./lib/Constraints/Classes/GreaterThanOrEqualValidator');

/**
 * Date Constraints
 */
//export { default as DateValidator } from './lib/Constraints/Classes/DateValidator';
var DateValidator = require('./lib/Constraints/Classes/DateValidator');

//export { default as DateTimeValidator } from './lib/Constraints/Classes/DateTimeValidator';
var DateTimeValidator = require('./lib/Constraints/Classes/DateTimeValidator');

//export { default as TimeValidator } from './lib/Constraints/Classes/TimeValidator';
var TimeValidator = require('./lib/Constraints/Classes/TimeValidator');

/**
 * Collection Constraints
 */
//export { default as ChoiceValidator } from './lib/Constraints/Classes/ChoiceValidator';
var ChoiceValidator = require('./lib/Constraints/Classes/ChoiceValidator');

//export { default as CollectionValidator } from './lib/Constraints/Classes/CollectionValidator';
//var CollectionValidator = require('./lib/Constraints/Classes/CollectionValidator');

//export { default as CountValidator } from './lib/Constraints/Classes/CountValidator';
var CountValidator = require('./lib/Constraints/Classes/CountValidator');

//export { default as UniqueEntityValidator } from './lib/Constraints/Classes/UniqueEntityValidator';
var UniqueEntityValidator = require('./lib/Constraints/Classes/UniqueEntityValidator');

//export { default as LanguageValidator } from './lib/Constraints/Classes/LanguageValidator';
var LanguageValidator = require('./lib/Constraints/Classes/LanguageValidator');

//export { default as LocaleValidator } from './lib/Constraints/Classes/LocaleValidator';
var LocaleValidator = require('./lib/Constraints/Classes/LocaleValidator');

//export { default as CountryValidator } from './lib/Constraints/Classes/CountryValidator';
var CountryValidator = require('./lib/Constraints/Classes/CountryValidator');

/**
 * File Constraints
 */
//export { default as FileValidator } from './lib/Constraints/Classes/FileValidator';
//var FileValidator = require('./lib/Constraints/Classes/FileValidator');

//export { default as ImageValidator } from './lib/Constraints/Classes/ImageValidator';
//var ImageValidator = require('./lib/Constraints/Classes/ImageValidator');

/**
 * Financial and other Number Constraints
 */
//export { default as BicValidator } from './lib/Constraints/Classes/BicValidator';
var BicValidator = require('./lib/Constraints/Classes/BicValidator');

//export { default as CardSchemeValidator } from './lib/Constraints/Classes/CardSchemeValidator';
var CardSchemeValidator = require('./lib/Constraints/Classes/CardSchemeValidator');

//export { default as CurrencyValidator } from './lib/Constraints/Classes/CurrencyValidator';
var CurrencyValidator = require('./lib/Constraints/Classes/CurrencyValidator');

//export { default as LuhnValidator } from './lib/Constraints/Classes/LuhnValidator';
var LuhnValidator = require('./lib/Constraints/Classes/LuhnValidator');

//export { default as IbanValidator } from './lib/Constraints/Classes/IbanValidator';
var IbanValidator = require('./lib/Constraints/Classes/IbanValidator');

//export { default as IsbnValidator } from './lib/Constraints/Classes/IsbnValidator';
var IsbnValidator = require('./lib/Constraints/Classes/IsbnValidator');

//export { default as IssnValidator } from './lib/Constraints/Classes/IssnValidator';
var IssnValidator = require('./lib/Constraints/Classes/IssnValidator');


/**
 * Other Constraints
 */
//export { default as CallbackValidator } from './lib/Constraints/Classes/CallbackValidator';
var CallbackValidator = require('./lib/Constraints/Classes/CallbackValidator');

//export { default as ExpressionValidator } from './lib/Constraints/Classes/ExpressionValidator';
//var ExpressionValidator = require('./lib/Constraints/Classes/ExpressionValidator');

//export { default as AllValidator } from './lib/Constraints/Classes/AllValidator';
var AllValidator = require('./lib/Constraints/Classes/AllValidator');

//export { default as UserPasswordValidator } from './lib/Constraints/Classes/UserPasswordValidator';
//var UserPasswordValidator = require('./lib/Constraints/Classes/UserPasswordValidator');

//export { default as ValidValidator } from './lib/Constraints/Classes/ValidValidator';
//var ValidValidator = require('./lib/Constraints/Classes/ValidValidator');

//export { default as CustomValidator } from './lib/Constraints/Classes/CustomValidator';
var CustomValidator = require('./lib/Constraints/Classes/CustomValidator');


/**
 * Execution Context
 */
//export { default as ObjectExecutionContext } from './lib/Context/ObjectExecutionContext';
var ObjectExecutionContext = require('./lib/Context/ObjectExecutionContext');

//export { default as SchemaExecutionContext } from './lib/Context/SchemaExecutionContext';
var SchemaExecutionContext = require('./lib/Context/SchemaExecutionContext');

/**
 * Functions
 */
var func = require('./functions');

module.exports = {
    'NotBlankValidator': NotBlankValidator,
    'BlankValidator': BlankValidator,
    'NotNullValidator': NotNullValidator,
    'IsNullValidator': IsNullValidator,
    'IsTrueValidator': IsTrueValidator,
    'IsFalseValidator': IsFalseValidator,
    'TypeValidator': TypeValidator,
    'EmailValidator': EmailValidator,
    'LengthValidator': LengthValidator,
    'UrlValidator': UrlValidator,
    'RegexValidator': RegexValidator,
    'IpValidator': IpValidator,
    'UuidValidator': UuidValidator,
    'RangeValidator': RangeValidator,
    'EqualToValidator': EqualToValidator,
    'NotEqualToValidator': NotEqualToValidator,
    'IdenticalToValidator': IdenticalToValidator,
    'NotIdenticalToValidator': NotIdenticalToValidator,
    'LessThanValidator': LessThanValidator,
    'LessThanOrEqualValidator': LessThanOrEqualValidator,
    'GreaterThanValidator': GreaterThanValidator,
    'GreaterThanOrEqualValidator': GreaterThanOrEqualValidator,
    'DateValidator': DateValidator,
    'DateTimeValidator': DateTimeValidator,
    'TimeValidator': TimeValidator,
    'ChoiceValidator': ChoiceValidator,
    //'CollectionValidator': CollectionValidator,
    'CountValidator': CountValidator,
    'UniqueEntityValidator': UniqueEntityValidator,
    'LanguageValidator': LanguageValidator,
    'LocaleValidator': LocaleValidator,
    'CountryValidator': CountryValidator,
    //'FileValidator': FileValidator,
    //'ImageValidator': ImageValidator,
    'BicValidator': BicValidator,
    'CardSchemeValidator': CardSchemeValidator,
    'CurrencyValidator': CurrencyValidator,
    'LuhnValidator': LuhnValidator,
    'IbanValidator': IbanValidator,
    'IsbnValidator': IsbnValidator,
    'IssnValidator': IssnValidator,
    'CallbackValidator': CallbackValidator,
    //'ExpressionValidator': ExpressionValidator,
    'AllValidator': AllValidator,
    //'UserPasswordValidator': UserPasswordValidator,
    //'ValidValidator': ValidValidator,
    'CustomValidator': CustomValidator,

    'ObjectExecutionContext': ObjectExecutionContext,
    'SchemaExecutionContext': SchemaExecutionContext,

    'func': func
};