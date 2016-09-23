# bob-validator

A library of validators

### Server-side usage

Install the library with:
```sh
$ npm install bob-validator
```

#### Using:

```javascript
var _v = require('bob-validator');
```

##### ES6
```javascript
import {
    // ...
    NotBlankValidator
} from 'bob-validator';
```

### Navigation

* [Basic Usage Example](#basic-usage-example)
* [Schema Usage Example](#schema-usage-example)
* [Documentation](#documentation)

---------------

#### Basic Usage Example

```javascript
var _v = require('bob-validator');

let NotBlankValidator = _v.NotBlankValidator;
let BlankValidator = _v.BlankValidator;
let NotNullValidator = _v.NotNullValidator;
let IsNullValidator = _v.IsNullValidator;
let IsTrueValidator = _v.IsTrueValidator;
let IsFalseValidator = _v.IsFalseValidator;
let TypeValidator = _v.TypeValidator;
let EmailValidator = _v.EmailValidator;
let LengthValidator = _v.LengthValidator;
let UrlValidator = _v.UrlValidator;
let RegexValidator = _v.RegexValidator;
let IpValidator = _v.IpValidator;
let UuidValidator = _v.UuidValidator;
let RangeValidator = _v.RangeValidator;
let EqualToValidator = _v.EqualToValidator;
let NotEqualToValidator = _v.NotEqualToValidator;
let IdenticalToValidator = _v.IdenticalToValidator;
let NotIdenticalToValidator = _v.NotIdenticalToValidator;
let LessThanValidator = _v.LessThanValidator;
let LessThanOrEqualValidator = _v.LessThanOrEqualValidator;
let GreaterThanValidator = _v.GreaterThanValidator;
let GreaterThanOrEqualValidator = _v.GreaterThanOrEqualValidator;
let DateValidator = _v.DateValidator;
let DateTimeValidator = _v.DateTimeValidator;
let TimeValidator = _v.TimeValidator;
let ChoiceValidator = _v.ChoiceValidator;
let CountValidator = _v.CountValidator;
let UniqueEntityValidator = _v.UniqueEntityValidator;
let LanguageValidator = _v.LanguageValidator;
let LocaleValidator = _v.LocaleValidator;
let CountryValidator = _v.CountryValidator;
let BicValidator = _v.BicValidator;
let CardSchemeValidator = _v.CardSchemeValidator;
let CurrencyValidator = _v.CurrencyValidator;
let LuhnValidator = _v.LuhnValidator;
let IbanValidator = _v.IbanValidator;
let IsbnValidator = _v.IsbnValidator;
let IssnValidator = _v.IssnValidator;
let CallbackValidator = _v.CallbackValidator;
let AllValidator = _v.AllValidator;
let CustomValidator = _v.CustomValidator;
```

##### ES6
```javascript
import {
    NotBlankValidator,
    BlankValidator,
    NotNullValidator,
    IsNullValidator,
    IsTrueValidator,
    IsFalseValidator,
    TypeValidator,
    EmailValidator,
    LengthValidator,
    UrlValidator,
    RegexValidator,
    IpValidator,
    UuidValidator,
    RangeValidator,
    EqualToValidator,
    NotEqualToValidator,
    IdenticalToValidator,
    NotIdenticalToValidator,
    essThanValidator,
    LessThanOrEqualValidator,
    GreaterThanValidator,
    GreaterThanOrEqualValidator,
    DateValidator,
    DateTimeValidator,
    TimeValidator,
    ChoiceValidator,
    CountValidator,
    UniqueEntityValidator,
    LanguageValidator,
    LocaleValidator,
    CountryValidator,
    BicValidator,
    CardSchemeValidator,
    CurrencyValidator,
    LuhnValidator,
    IbanValidator,
    IsbnValidator,
    IssnValidator,
    CallbackValidator,
    CustomValidator,
    AllValidator
} from 'bob-validator';
```

```javascript
// Import ...

let CreditCardValidator = new CustomValidator({
    rules: [
        new NotBlankValidator({}),
        new LengthValidator({'min': 11, 'max': 19}),
        new CardSchemeValidator({'schemes': ['AMEX', 'CHINA_UNIONPAY', 'DINERS', 'DISCOVER', 'INSTAPAYMENT', 'JCB', 'LASER', 'MAESTRO', 'MASTERCARD', 'VISA']})
    ],
    message: 'Your error message'
});

let validators = {
    name: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new LengthValidator({'min': 2, 'max': 255})
        ]
    },
    email: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new EmailValidator({})
        ]
    },
    birthday: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new DateValidator({'format': 'DD.MM.YYYY'})
        ]
    },
    creditCard: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            CreditCardValidator
        ]
    },
    ip: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new IpValidator({})
        ]
    },
    locale: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new LocaleValidator({})
        ]
    },
    country: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new CountryValidator({})
        ]
    },
    language: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new LanguageValidator({})
        ]
    },
    homepage: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new UrlValidator({})
        ]
    }
};

let data = {
    name: 'Leo Lane',
    email: 'leo.lane38@example.com',
    birthday: '03.07.1977',
    creditCard: '4111111111111111',
    ip: '8.8.8.8',
    locale: 'cy_GB',
    country: 'US',
    language: 'en_gb',
    homepage: 'https://github.com/alexeybob/bob-validator'
};

let _oec = new AllValidator({
    validators: validators,
    validationType: 'object',
    errorType: 'array'
});
_oec.validate(data);

if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

[⬆ back to top](#navigation)

---------------

#### Schema Usage Example

```javascript
var _v = require('bob-validator');

let AllValidator = _v.AllValidator;
```

##### ES6
```javascript
import {
    AllValidator
} from 'bob-validator';
```

```javascript
// Import ...

let CreditCard = {
    rules: {
        NotBlank: {},
        Length: {
            'min': 11,
            'max': 19
        },
        CardScheme: {
            'schemes': ['AMEX', 'CHINA_UNIONPAY', 'DINERS', 'DISCOVER', 'INSTAPAYMENT', 'JCB', 'LASER', 'MAESTRO', 'MASTERCARD', 'VISA']
        }
    },
    message: 'Your error message'
};

let schema = {
    name: {
        isRequired: true,
        rules: {
            NotBlank: {},
            Length: {
                'min': 2,
                'max': 255
            }
        }
    },
    email: {
        isRequired: true,
        rules: {
            NotBlank: {},
            Email: {}
        }
    },
    birthday: {
        isRequired: true,
        rules: {
            NotBlank: {},
            Date: {
                'format': 'DD.MM.YYYY'
            }
        }
    },
    creditCard: {
        isRequired: true,
        rules: {
            NotBlank: {},
            Custom: CreditCard
        }
    },
    ip: {
        isRequired: true,
        rules: {
            NotBlank: {},
            Ip: {}
        }
    },
    locale: {
        isRequired: true,
        rules: {
            NotBlank: {},
            Locale: {}
        }
    },
    country: {
        isRequired: true,
        rules: {
            NotBlank: {},
            Country: {}
        }
    },
    language: {
        isRequired: true,
        rules: {
            NotBlank: {},
            Language: {}
        }
    },
    homepage: {
        isRequired: true,
        rules: {
            NotBlank: {},
            Url: {}
        }
    }
};

let data = {
    name: 'Leo Lane',
    email: 'leo.lane38@example.com',
    birthday: '03.07.1977',
    creditCard: '4111111111111111',
    ip: '8.8.8.8',
    locale: 'cy_GB',
    country: 'US',
    language: 'en_gb',
    homepage: 'https://github.com/alexeybob/bob-validator'
};

let _oec = new AllValidator({
    validators: schema,
    validationType: 'schema',
    errorType: 'array'
});
_oec.validate(data);

if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

[⬆ back to top](#navigation)

---------------

## Documentation

##### Basic Constraints

These are the basic constraints: use them to assert very basic things about the value of properties or the return value of methods on your object.

* [NotBlank][notblank-url]
* [Blank][blank-url]
* [NotNull][notnull-url]
* [IsNull][isnull-url]
* [IsTrue][istrue-url]
* [IsFalse][isfalse-url]
* [Type][type-url]

##### String Constraints

* [Email][email-url]
* [Length][length-url]
* [Url][url-url]
* [Regex][regex-url]
* [Ip][ip-url]
* [Uuid][uuid-url]

##### Number Constraints

* [Range][range-url]

##### Comparison Constraints

* [EqualTo][equalto-url]
* [NotEqualTo][notequalto-url]
* [IdenticalTo][identicalto-url]
* [NotIdenticalTo][notidenticalto-url]
* [LessThan][lessthan-url]
* [LessThanOrEqual][lessthanorequal-url]
* [GreaterThan][greaterthan-url]
* [GreaterThanOrEqual][greaterthanorequal-url]

##### Date Constraints

* [Date][date-url]
* [DateTime][datetime-url]
* [Time][time-url]

##### Collection Constraints

* [Choice][choice-url]
* [Collection][collection-url] `(not implemented)`
* [Count][count-url]
* [UniqueEntity][uniqueentity-url]
* [Language][language-url]
* [Locale][locale-url]
* [Country][country-url]

##### File Constraints

* [File][file-url] `(not implemented)`
* [Image][image-url] `(not implemented)`

##### Financial and other Number Constraints

* [Bic][bic-url]
* [CardScheme][cardscheme-url]
* [Currency][currency-url]
* [Luhn][luhn-url]
* [Iban][iban-url]
* [Isbn][isbn-url]
* [Issn][issn-url]

##### Other Constraints

* [Callback][callback-url]
* [Expression][expression-url] `(not implemented)`
* [All][all-url]
* [UserPassword][userpassword-url] `(not implemented)`
* [Valid][valid-url] `(not implemented)`
* [Custom][custom-url]

[⬆ back to top](#navigation)

[documentation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md
[notblank-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/NotBlank.md
[blank-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Blank.md
[notnull-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/NotNull.md
[isnull-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/IsNull.md
[istrue-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/IsTrue.md
[isfalse-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/IsFalse.md
[type-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Type.md
[email-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Email.md
[length-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Length.md
[url-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Url.md
[regex-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Regex.md
[ip-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Ip.md
[uuid-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Uuid.md
[range-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Range.md
[equalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/EqualTo.md
[notequalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/NotEqualTo.md
[identicalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/IdenticalTo.md
[notidenticalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/NotIdenticalTo.md
[lessthan-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/LessThan.md
[lessthanorequal-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/LessThanOrEqual.md
[greaterthan-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/GreaterThan.md
[greaterthanorequal-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/GreaterThanOrEqual.md
[date-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Date.md
[datetime-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/DateTime.md
[time-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Time.md
[choice-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Choice.md
[collection-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Collection.md
[count-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Count.md
[uniqueentity-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/UniqueEntity.md
[language-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Language.md
[locale-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Locale.md
[country-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Country.md
[file-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/File.md
[image-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Image.md
[bic-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Bic.md
[cardscheme-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/CardScheme.md
[currency-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Currency.md
[luhn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Luhn.md
[iban-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Iban.md
[isbn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Isbn.md
[issn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Issn.md
[callback-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Callback.md
[expression-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Expression.md
[all-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/All.md
[userpassword-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/UserPassword.md
[valid-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Valid.md
[custom-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Custom.md

