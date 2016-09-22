/**
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

/**
 * Basic Constraints
 * These are the basic constraints: use them to assert very basic things about the value of properties or the return value of methods on your object.
 */
export { default as NotBlankValidator } from './lib/Constraints/NotBlankValidator';
let NotBlankValidator = require('./lib/Constraints/NotBlankValidator');

export { default as BlankValidator } from './lib/Constraints/BlankValidator';
let BlankValidator = require('./lib/Constraints/BlankValidator');

export { default as NotNullValidator } from './lib/Constraints/NotNullValidator';
let NotNullValidator = require('./lib/Constraints/NotNullValidator');

export { default as IsNullValidator } from './lib/Constraints/IsNullValidator';
let IsNullValidator = require('./lib/Constraints/IsNullValidator');

export { default as IsTrueValidator } from './lib/Constraints/IsTrueValidator';
let IsTrueValidator = require('./lib/Constraints/IsTrueValidator');

export { default as IsFalseValidator } from './lib/Constraints/IsFalseValidator';
let IsFalseValidator = require('./lib/Constraints/IsFalseValidator');

export { default as TypeValidator } from './lib/Constraints/TypeValidator';
let TypeValidator = require('./lib/Constraints/TypeValidator');

/**
 * String Constraints
 */
export { default as EmailValidator } from './lib/Constraints/EmailValidator';
let EmailValidator = require('./lib/Constraints/EmailValidator');

export { default as LengthValidator } from './lib/Constraints/LengthValidator';
let LengthValidator = require('./lib/Constraints/LengthValidator');

export { default as UrlValidator } from './lib/Constraints/UrlValidator';
let UrlValidator = require('./lib/Constraints/UrlValidator');

export { default as RegexValidator } from './lib/Constraints/RegexValidator';
let RegexValidator = require('./lib/Constraints/RegexValidator');

export { default as IpValidator } from './lib/Constraints/IpValidator';
let IpValidator = require('./lib/Constraints/IpValidator');

export { default as UuidValidator } from './lib/Constraints/UuidValidator';
let UuidValidator = require('./lib/Constraints/UuidValidator');

/**
 * Number Constraints
 */
export { default as RangeValidator } from './lib/Constraints/RangeValidator';
let RangeValidator = require('./lib/Constraints/RangeValidator');

/**
 * Comparison Constraints
 */
export { default as EqualToValidator } from './lib/Constraints/EqualToValidator';
let EqualToValidator = require('./lib/Constraints/EqualToValidator');

export { default as NotEqualToValidator } from './lib/Constraints/NotEqualToValidator';
let NotEqualToValidator = require('./lib/Constraints/NotEqualToValidator');

export { default as IdenticalToValidator } from './lib/Constraints/IdenticalToValidator';
let IdenticalToValidator = require('./lib/Constraints/IdenticalToValidator');

export { default as NotIdenticalToValidator } from './lib/Constraints/NotIdenticalToValidator';
let NotIdenticalToValidator = require('./lib/Constraints/NotIdenticalToValidator');

export { default as LessThanValidator } from './lib/Constraints/LessThanValidator';
let LessThanValidator = require('./lib/Constraints/LessThanValidator');

export { default as LessThanOrEqualValidator } from './lib/Constraints/LessThanOrEqualValidator';
let LessThanOrEqualValidator = require('./lib/Constraints/LessThanOrEqualValidator');

export { default as GreaterThanValidator } from './lib/Constraints/GreaterThanValidator';
let GreaterThanValidator = require('./lib/Constraints/GreaterThanValidator');

export { default as GreaterThanOrEqualValidator } from './lib/Constraints/GreaterThanOrEqualValidator';
let GreaterThanOrEqualValidator = require('./lib/Constraints/GreaterThanOrEqualValidator');

/**
 * Date Constraints
 */
export { default as DateValidator } from './lib/Constraints/DateValidator';
let DateValidator = require('./lib/Constraints/DateValidator');

export { default as DateTimeValidator } from './lib/Constraints/DateTimeValidator';
let DateTimeValidator = require('./lib/Constraints/DateTimeValidator');

export { default as TimeValidator } from './lib/Constraints/TimeValidator';
let TimeValidator = require('./lib/Constraints/TimeValidator');

/**
 * Collection Constraints
 */
export { default as ChoiceValidator } from './lib/Constraints/ChoiceValidator';
let ChoiceValidator = require('./lib/Constraints/ChoiceValidator');

//export { default as CollectionValidator } from './lib/Constraints/CollectionValidator';
//let CollectionValidator = require('./lib/Constraints/CollectionValidator');

export { default as CountValidator } from './lib/Constraints/CountValidator';
let CountValidator = require('./lib/Constraints/CountValidator');

export { default as UniqueEntityValidator } from './lib/Constraints/UniqueEntityValidator';
let UniqueEntityValidator = require('./lib/Constraints/UniqueEntityValidator');

export { default as LanguageValidator } from './lib/Constraints/LanguageValidator';
let LanguageValidator = require('./lib/Constraints/LanguageValidator');

export { default as LocaleValidator } from './lib/Constraints/LocaleValidator';
let LocaleValidator = require('./lib/Constraints/LocaleValidator');

export { default as CountryValidator } from './lib/Constraints/CountryValidator';
let CountryValidator = require('./lib/Constraints/CountryValidator');

/**
 * File Constraints
 */
//export { default as FileValidator } from './lib/Constraints/FileValidator';
//let FileValidator = require('./lib/Constraints/FileValidator');

//export { default as ImageValidator } from './lib/Constraints/ImageValidator';
//let ImageValidator = require('./lib/Constraints/ImageValidator');

/**
 * Financial and other Number Constraints
 */
export { default as BicValidator } from './lib/Constraints/BicValidator';
let BicValidator = require('./lib/Constraints/BicValidator');

export { default as CardSchemeValidator } from './lib/Constraints/CardSchemeValidator';
let CardSchemeValidator = require('./lib/Constraints/CardSchemeValidator');

export { default as CurrencyValidator } from './lib/Constraints/CurrencyValidator';
let CurrencyValidator = require('./lib/Constraints/CurrencyValidator');

export { default as LuhnValidator } from './lib/Constraints/LuhnValidator';
let LuhnValidator = require('./lib/Constraints/LuhnValidator');

export { default as IbanValidator } from './lib/Constraints/IbanValidator';
let IbanValidator = require('./lib/Constraints/IbanValidator');

export { default as IsbnValidator } from './lib/Constraints/IsbnValidator';
let IsbnValidator = require('./lib/Constraints/IsbnValidator');

export { default as IssnValidator } from './lib/Constraints/IssnValidator';
let IssnValidator = require('./lib/Constraints/IssnValidator');


/**
 * Other Constraints
 */
export { default as CallbackValidator } from './lib/Constraints/CallbackValidator';
let CallbackValidator = require('./lib/Constraints/CallbackValidator');

//export { default as ExpressionValidator } from './lib/Constraints/ExpressionValidator';
//let ExpressionValidator = require('./lib/Constraints/ExpressionValidator');

export { default as AllValidator } from './lib/Constraints/AllValidator';
let AllValidator = require('./lib/Constraints/AllValidator');

//export { default as UserPasswordValidator } from './lib/Constraints/UserPasswordValidator';
//let UserPasswordValidator = require('./lib/Constraints/UserPasswordValidator');

//export { default as ValidValidator } from './lib/Constraints/ValidValidator';
//let ValidValidator = require('./lib/Constraints/ValidValidator');

export { default as CustomValidator } from './lib/Constraints/CustomValidator';
let CustomValidator = require('./lib/Constraints/CustomValidator');


/**
 * Execution Context
 */
export { default as ObjectExecutionContext } from './lib/Context/ObjectExecutionContext';
let ObjectExecutionContext = require('./lib/Context/ObjectExecutionContext');

export { default as SchemaExecutionContext } from './lib/Context/SchemaExecutionContext';
let SchemaExecutionContext = require('./lib/Context/SchemaExecutionContext');



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
    'SchemaExecutionContext': SchemaExecutionContext
};