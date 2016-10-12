/**
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import ObjectExecutionContext from './ObjectExecutionContext';
var ObjectExecutionContext = require('./ObjectExecutionContext');

//import {
//    NotBlankValidator, BlankValidator, NotNullValidator, IsNullValidator, IsTrueValidator, IsFalseValidator, TypeValidator, EmailValidator, LengthValidator, UrlValidator, RegexValidator, IpValidator,
//    UuidValidator, RangeValidator, EqualToValidator, NotEqualToValidator, IdenticalToValidator, NotIdenticalToValidator, LessThanValidator, LessThanOrEqualValidator, GreaterThanValidator,
//    GreaterThanOrEqualValidator, DateValidator, DateTimeValidator, TimeValidator, ChoiceValidator, CountValidator, UniqueEntityValidator, LanguageValidator, LocaleValidator, CountryValidator,
//    BicValidator, CardSchemeValidator, CurrencyValidator, LuhnValidator, IbanValidator, IsbnValidator, IssnValidator, CallbackValidator, CustomValidator, AllValidator
//} from 'bob-validator';

var NotBlankValidator = require('../Constraints/Classes/NotBlankValidator');
var BlankValidator = require('../Constraints/Classes/BlankValidator');
var NotNullValidator = require('../Constraints/Classes/NotNullValidator');
var IsNullValidator = require('../Constraints/Classes/IsNullValidator');
var IsTrueValidator = require('../Constraints/Classes/IsTrueValidator');
var IsFalseValidator = require('../Constraints/Classes/IsFalseValidator');
var TypeValidator = require('../Constraints/Classes/TypeValidator');
var EmailValidator = require('../Constraints/Classes/EmailValidator');
var LengthValidator = require('../Constraints/Classes/LengthValidator');
var UrlValidator = require('../Constraints/Classes/UrlValidator');
var RegexValidator = require('../Constraints/Classes/RegexValidator');
var IpValidator = require('../Constraints/Classes/IpValidator');
var UuidValidator = require('../Constraints/Classes/UuidValidator');
var RangeValidator = require('../Constraints/Classes/RangeValidator');
var EqualToValidator = require('../Constraints/Classes/EqualToValidator');
var NotEqualToValidator = require('../Constraints/Classes/NotEqualToValidator');
var IdenticalToValidator = require('../Constraints/Classes/IdenticalToValidator');
var NotIdenticalToValidator = require('../Constraints/Classes/NotIdenticalToValidator');
var LessThanValidator = require('../Constraints/Classes/LessThanValidator');
var LessThanOrEqualValidator = require('../Constraints/Classes/LessThanOrEqualValidator');
var GreaterThanValidator = require('../Constraints/Classes/GreaterThanValidator');
var GreaterThanOrEqualValidator = require('../Constraints/Classes/GreaterThanOrEqualValidator');
var DateValidator = require('../Constraints/Classes/DateValidator');
var DateTimeValidator = require('../Constraints/Classes/DateTimeValidator');
var TimeValidator = require('../Constraints/Classes/TimeValidator');
var ChoiceValidator = require('../Constraints/Classes/ChoiceValidator');
var CountValidator = require('../Constraints/Classes/CountValidator');
var UniqueEntityValidator = require('../Constraints/Classes/UniqueEntityValidator');
var LanguageValidator = require('../Constraints/Classes/LanguageValidator');
var LocaleValidator = require('../Constraints/Classes/LocaleValidator');
var CountryValidator = require('../Constraints/Classes/CountryValidator');
var BicValidator = require('../Constraints/Classes/BicValidator');
var CardSchemeValidator = require('../Constraints/Classes/CardSchemeValidator');
var CurrencyValidator = require('../Constraints/Classes/CurrencyValidator');
var LuhnValidator = require('../Constraints/Classes/LuhnValidator');
var IbanValidator = require('../Constraints/Classes/IbanValidator');
var IsbnValidator = require('../Constraints/Classes/IsbnValidator');
var IssnValidator = require('../Constraints/Classes/IssnValidator');
var CallbackValidator = require('../Constraints/Classes/CallbackValidator');
var CustomValidator = require('../Constraints/Classes/CustomValidator');
var AllValidator = require('../Constraints/Classes/AllValidator');

class SchemaExecutionContext {
    constructor() {
        var data = arguments[0]['data'];
        var schema = arguments[0]['schema'];

        this._data = data;
        this._schema = schema;
        this._errors = [];
        this._errorCount = 0;
        this._environment = 'prod';

        this._validator = null;
    }

    validate(errorType) {
        errorType = (errorType == null) ? 'array' : errorType;

        var validators = [];

        for (var schemaKey in this._schema){
            var validator = this.clone(this._schema[schemaKey]);
            var rules = [];
            for (var ruleKey in this._schema[schemaKey]['rules']){
                rules.push(this.generateValidator(ruleKey, this._schema[schemaKey]['rules'][ruleKey]));
            }

            validator['rules'] = rules;

            validators[schemaKey] = [];
            validators[schemaKey] = validator;
        }

        this._validator = new ObjectExecutionContext({data: this._data, validators: validators});
        this._validator.setEnvironment(this.getEnvironment());
        this._validator.validate(errorType);
    }

    setEnvironment(environment) {
        if (null === environment || '' === environment) {
            return ;
        }

        this._environment = environment;
    }

    getEnvironment(environment) {
        return this._environment;
    }

    isInvalid() {
        return this._validator.isInvalid();
    }

    isValid() {
        return this._validator.isValid();
    }

    getErrors() {
        return this._validator._errors;
    }

    isEmpty(val){
        return this._validator.isEmpty(val);
    }

    addError(key, errors, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;

        this._validator.addError(key, errors, errorType);
    }

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }

        return copy;
    }

    generateValidator(key, value) {
        if(Object.prototype.toString.call(value) !== '[object Object]') {
            value = {};
        }

        switch(key){
            case 'NotBlank':
                return new NotBlankValidator(value);
                break;
            case 'Blank':
                return new BlankValidator(value);
                break;
            case 'NotNull':
                return new NotNullValidator(value);
                break;
            case 'IsNull':
                return new IsNullValidator(value);
                break;
            case 'IsTrue':
                return new IsTrueValidator(value);
                break;
            case 'IsFalse':
                return new IsFalseValidator(value);
                break;
            case 'Type':
                return new TypeValidator(value);
                break;
            case 'Email':
                return new EmailValidator(value);
                break;
            case 'Length':
                return new LengthValidator(value);
                break;
            case 'Url':
                return new UrlValidator(value);
                break;
            case 'Regex':
                return new RegexValidator(value);
                break;
            case 'Ip':
                return new IpValidator(value);
                break;
            case 'Uuid':
                return new UuidValidator(value);
                break;
            case 'Range':
                return new RangeValidator(value);
                break;
            case 'EqualTo':
                return new EqualToValidator(value);
                break;
            case 'NotEqualTo':
                return new NotEqualToValidator(value);
                break;
            case 'IdenticalTo':
                return new IdenticalToValidator(value);
                break;
            case 'NotIdenticalTo':
                return new NotIdenticalToValidator(value);
                break;
            case 'LessThan':
                return new LessThanValidator(value);
                break;
            case 'LessThanOrEqual':
                return new LessThanOrEqualValidator(value);
                break;
            case 'GreaterThan':
                return new GreaterThanValidator(value);
                break;
            case 'GreaterThanOrEqual':
                return new GreaterThanOrEqualValidator(value);
                break;
            case 'Date':
                return new DateValidator(value);
                break;
            case 'DateTime':
                return new DateTimeValidator(value);
                break;
            case 'Time':
                return new TimeValidator(value);
                break;
            case 'Choice':
                return new ChoiceValidator(value);
                break;
            case 'Count':
                return new CountValidator(value);
                break;
            case 'UniqueEntity':
                return new UniqueEntityValidator(value);
                break;
            case 'Language':
                return new LanguageValidator(value);
                break;
            case 'Locale':
                return new LocaleValidator(value);
                break;
            case 'Country':
                return new CountryValidator(value);
                break;
            case 'Bic':
                return new BicValidator(value);
                break;
            case 'CardScheme':
                return new CardSchemeValidator(value);
                break;
            case 'Currency':
                return new CurrencyValidator(value);
                break;
            case 'Luhn':
                return new LuhnValidator(value);
                break;
            case 'Iban':
                return new IbanValidator(value);
                break;
            case 'Isbn':
                return new IsbnValidator(value);
                break;
            case 'Issn':
                return new IssnValidator(value);
                break;
            case 'Callback':
                return new CallbackValidator(value);
                break;
            case 'Custom':
                var rules = [];

                for (var ruleKey in value['rules']){
                    rules.push(this.generateValidator(ruleKey, value['rules'][ruleKey]));
                }

                value['rules'] = rules;

                return new CustomValidator(value);
                break;
            case 'All':
                return new AllValidator(value);
                break;
            default:
                throw new Error(`Unsupported validator \"${key}\"`);
                break;
        }
    }
}

//export default SchemaExecutionContext;
module.exports = SchemaExecutionContext;