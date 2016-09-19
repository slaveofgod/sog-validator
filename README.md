# bob-validator

A library of validators

Install the library with:
```sh
$ npm install bob-validator
```

[Read Documentation](#documentation)

# Example
```javascript
import {
    LengthValidator,
    EmailValidator,
    TypeValidator,
    EqualToValidator,
    NotEqualToValidator,
    IdenticalToValidator,
    NotIdenticalToValidator,
    UrlValidator,
    RegexValidator,
    RangeValidator,
    NotBlankValidator,
    BlankValidator,
    NotNullValidator,
    IsNullValidator,
    IsFalseValidator,
    IsTrueValidator,
    DateTimeValidator,
    DateValidator,
    TimeValidator,
    LessThanValidator,
    LessThanOrEqualValidator,
    IpValidator,
    CallbackValidator,
    GreaterThanValidator,
    GreaterThanOrEqualValidator,
    CountValidator,
    ChoiceValidator,
    UuidValidator,
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
    UniqueEntityValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    firstName: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new LengthValidator({'min': 1, 'max': 10}),
            new TypeValidator({'type': 'integer'})
        ],
    },
    lastName: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new LengthValidator({'min': 1, 'max': 10}),
            new TypeValidator({'type': 'integer'})
        ],
    },
    email: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new EmailValidator({})
        ],
    },
    birthday: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new DateValidator({'format': 'DD.MM.YYYY'})
        ],
    },
    address1: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new LengthValidator({'min': 10, 'max': 255}),
        ],
    },
    city: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new LengthValidator({'min': 2, 'max': 255}),
        ],
    },
    state: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new LengthValidator({'min': 2, 'max': 255}),
        ],
    },
    postCode: {
        isRequired: true,
        rules: [
            new NotBlankValidator({}),
            new LengthValidator({'min': 1, 'max': 5}),
        ],
    },
    // ...
};

let data = {
    firstName: 'Leo',
    lastName: 'Lane',
    email: 'leo.lane38@example.com',
    birthday: '03.07.1977',
    address1: '2177 wyndham ln',
    city: 'Boca Raton',
    state: 'Florida',
    postCode: '25486',
};

let _OEC = new ObjectExecutionContext({data: data, validators: validators});
_OEC.validate();
if(!_OEC.isValid()) {
    let error = _OEC.getErrors();
}
```
# Documentation
#### Basic Constraints

These are the basic constraints: use them to assert very basic things about the value of properties or the return value of methods on your object.

* [NotBlank][notblank-url]
* [Blank][blank-url]
* [NotNull][notnull-url]
* [IsNull][isnull-url]
* [IsTrue][istrue-url]
* [IsFalse][isfalse-url]
* [Type][type-url]

#### String Constraints

* [Email][email-url]
* [Length][length-url]
* [Url][url-url]
* [Regex][regex-url]
* [Ip][ip-url]
* [Uuid][uuid-url]

#### Number Constraints

* [Range][range-url]

#### Comparison Constraints

* [EqualTo][equalto-url]
* [NotEqualTo][notequalto-url]
* [IdenticalTo][identicalto-url]
* [NotIdenticalTo][notidenticalto-url]
* [LessThan][lessthan-url]
* [LessThanOrEqual][lessthanorequal-url]
* [GreaterThan][greaterthan-url]
* [GreaterThanOrEqual][greaterthanorequal-url]

#### Date Constraints

* [Date][date-url]
* [DateTime][datetime-url]
* [Time][time-url]

#### Collection Constraints

* [Choice][choice-url]
* [Collection][collection-url] `(not implemented)`
* [Count][count-url]
* [UniqueEntity][uniqueentity-url]
* [Language][language-url]
* [Locale][locale-url]
* [Country][country-url]

#### File Constraints

* [File][file-url] `(not implemented)`
* [Image][image-url] `(not implemented)`

#### Financial and other Number Constraints

* [Bic][bic-url]
* [CardScheme][cardscheme-url]
* [Currency][currency-url]
* [Luhn][luhn-url]
* [Iban][iban-url]
* [Isbn][isbn-url]
* [Issn][issn-url]

#### Other Constraints

* [Callback][callback-url]
* [Expression][expression-url] `(not implemented)`
* [All][all-url]
* [UserPassword][userpassword-url] `(not implemented)`
* [Valid][valid-url] `(not implemented)`
* [Custom][custom-url] `(not implemented)`


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

