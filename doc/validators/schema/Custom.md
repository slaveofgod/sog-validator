# Custom
This constraint is used to ensure that the given value valid with many conditions. You can configure your own constraint using any count existing constraints.

[**Homepage**][documentation-schema-url]

### Navigation

* [Installation](#installation)
* [Basic Usage](#basic-usage)
* [Options](#options)
* [Supported Constraints](#supported-constraints)

---------------

#### Installation

Install the library with:
```sh
$ npm install bob-validator
```

---------------

#### Basic Usage

```javascript
var _v = require('bob-validator');

let AllValidator = _v.AllValidator;
```

**ES6:**
```javascript
import {
    // ...
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
    message: 'Invalid credit card'
};

let schema = {
    // ...
    fieldName: {
        isRequired: true,
        rules: {
            // ...
            Custom: CreditCard
        }
    }
};

let data = {
    // ...
    fieldName: '4111111111111111'
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

#### Options
##### validators
**type**: `array`

This required option is the array of validation constraints that you want to apply.

##### message
**type**: `string` **default**: `null`

The message shown if the given value is not a valid. If `message` is `null`, will be used `validators` `message`

[⬆ back to top](#navigation)

---------------

## Supported Constraints
##### Basic Constraints

These are the basic constraints: use them to assert very basic things about the value of properties or the return value of methods on your object.

* [NotBlank][notblank-schema-url]
* [Blank][blank-schema-url]
* [NotNull][notnull-schema-url]
* [IsNull][isnull-schema-url]
* [IsTrue][istrue-schema-url]
* [IsFalse][isfalse-schema-url]
* [Type][type-schema-url]

##### String Constraints

* [Email][email-schema-url]
* [Length][length-schema-url]
* [Url][url-schema-url]
* [Regex][regex-schema-url]
* [Ip][ip-schema-url]
* [Uuid][uuid-schema-url]

##### Number Constraints

* [Range][range-schema-url]

##### Comparison Constraints

* [EqualTo][equalto-schema-url]
* [NotEqualTo][notequalto-schema-url]
* [IdenticalTo][identicalto-schema-url]
* [NotIdenticalTo][notidenticalto-schema-url]
* [LessThan][lessthan-schema-url]
* [LessThanOrEqual][lessthanorequal-schema-url]
* [GreaterThan][greaterthan-schema-url]
* [GreaterThanOrEqual][greaterthanorequal-schema-url]

##### Date Constraints

* [Date][date-schema-url]
* [DateTime][datetime-schema-url]
* [Time][time-schema-url]

##### Collection Constraints

* [Choice][choice-schema-url]
* [Collection][collection-schema-url] `(not implemented)`
* [Count][count-schema-url]
* [UniqueEntity][uniqueentity-schema-url]
* [Language][language-schema-url]
* [Locale][locale-schema-url]
* [Country][country-schema-url]

##### File Constraints

* [File][file-schema-url] `(not implemented)`
* [Image][image-schema-url] `(not implemented)`

##### Financial and other Number Constraints

* [Bic][bic-schema-url]
* [CardScheme][cardscheme-schema-url]
* [Currency][currency-schema-url]
* [Luhn][luhn-schema-url]
* [Iban][iban-schema-url]
* [Isbn][isbn-schema-url]
* [Issn][issn-schema-url]

##### Other Constraints

* [Callback][callback-schema-url]
* [Expression][expression-schema-url] `(not implemented)`
* [All][all-schema-url]
* [UserPassword][userpassword-schema-url] `(not implemented)`
* [Valid][valid-schema-url] `(not implemented)`
* [Custom][custom-schema-url]

[⬆ back to top](#navigation)


[documentation-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#documentation
[installation-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#installation-and-using
[notblank-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/NotBlank.md
[blank-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Blank.md
[notnull-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/NotNull.md
[isnull-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/IsNull.md
[istrue-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/IsTrue.md
[isfalse-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/IsFalse.md
[type-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Type.md
[email-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Email.md
[length-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Length.md
[url-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Url.md
[regex-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Regex.md
[ip-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Ip.md
[uuid-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Uuid.md
[range-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Range.md
[equalto-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/EqualTo.md
[notequalto-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/NotEqualTo.md
[identicalto-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/IdenticalTo.md
[notidenticalto-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/NotIdenticalTo.md
[lessthan-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/LessThan.md
[lessthanorequal-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/LessThanOrEqual.md
[greaterthan-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/GreaterThan.md
[greaterthanorequal-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/GreaterThanOrEqual.md
[date-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Date.md
[datetime-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/DateTime.md
[time-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Time.md
[choice-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Choice.md
[collection-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Collection.md
[count-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Count.md
[uniqueentity-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/UniqueEntity.md
[language-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Language.md
[locale-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Locale.md
[country-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Country.md
[file-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/File.md
[image-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Image.md
[bic-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Bic.md
[cardscheme-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/CardScheme.md
[currency-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Currency.md
[luhn-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Luhn.md
[iban-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Iban.md
[isbn-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Isbn.md
[issn-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Issn.md
[callback-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Callback.md
[expression-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Expression.md
[all-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/All.md
[userpassword-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/UserPassword.md
[valid-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Valid.md
[custom-schema-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/schema/Custom.md