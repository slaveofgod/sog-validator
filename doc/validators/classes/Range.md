# Range
Validates that a given number is *between* some minimum and maximum number or date.

[**Homepage**][homepage-url]

### Navigation

* [Installation](#installation)
* [Basic Usage](#basic-usage)
* [Date Ranges](#date-ranges)
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

**Single Usage**

```javascript
var _v = require('bob-validator');

let RangeValidator = _v.RangeValidator;
```

**ES6:**
```javascript
import {
    // ...
    RangeValidator
} from 'bob-validator';
```

```javascript
// Import ...

let _validator = new RangeValidator({
    'min': 1,
    'max': 100,
    'minMessage': 'This value should be {{ limit }} or more.',
    'maxMessage': 'This value should be {{ limit }} or less.',
    'invalidMessage': 'This value should be a valid number.'
});

let data = 10;

_validator.validate(data);

if(!_validator.isValid()) {
    let errors = _validator.getErrors();
}
```

**Multi Usage**

```javascript
var _v = require('bob-validator');

let RangeValidator = _v.RangeValidator;
let AllValidator = _v.AllValidator;
```

**ES6:**
```javascript
import {
    // ...
    RangeValidator,
    AllValidator
} from 'bob-validator';
```

```javascript
// Import ...

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new RangeValidator({
                'min': 1,
                'max': 100,
                'minMessage': 'This value should be {{ limit }} or more.',
                'maxMessage': 'This value should be {{ limit }} or less.',
                'invalidMessage': 'This value should be a valid number.'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 10
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

#### Date Ranges

**Single Usage**

```javascript
var _v = require('bob-validator');

let RangeValidator = _v.RangeValidator;
```

**ES6:**
```javascript
import {
    // ...
    RangeValidator
} from 'bob-validator';
```

```javascript
// Import ...

let _validator = new RangeValidator({
    'min': new Date(2015, 0, 1, 0, 0, 0, 0),
    'max': new Date(2017, 0, 1, 0, 0, 0, 0),
    'minMessage': 'This value should be {{ limit }} or more.',
    'maxMessage': 'This value should be {{ limit }} or less.',
    'invalidMessage': 'This value should be a valid number.'
});

let data = new Date(2016, 0, 1, 0, 0, 0, 0); 

_validator.validate(data);

if(!_validator.isValid()) {
    let errors = _validator.getErrors();
}
```

**Multi Usage**

```javascript
var _v = require('bob-validator');

let RangeValidator = _v.RangeValidator;
let AllValidator = _v.AllValidator;
```

**ES6:**
```javascript
import {
    // ...
    RangeValidator,
    AllValidator
} from 'bob-validator';
```

```javascript
// Import ...

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new RangeValidator({
                'min': new Date(2015, 0, 1, 0, 0, 0, 0),
                'max': new Date(2017, 0, 1, 0, 0, 0, 0),
                'minMessage': 'This value should be {{ limit }} or more.',
                'maxMessage': 'This value should be {{ limit }} or less.',
                'invalidMessage': 'This value should be a valid number.'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: new Date(2016, 0, 1, 0, 0, 0, 0)
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

#### Options
##### min
**type**: `integer` or `Date`

This required option is the "min" value. Validation will fail if the given value is **less** than this min value.

##### max
**type**: `integer` or `Date`

This required option is the "max" value. Validation will fail if the given value is **greater** than this max value.

##### minMessage
**type**: `string` **default**: `This value should be {{ limit }} or more.`

The message that will be shown if the underlying value is less than the `min` option.

##### maxMessage
**type**: `string` **default**: `This value should be {{ limit }} or less.`

The message that will be shown if the underlying value is more than the max option.

##### invalidMessage
**type**: `string` **default**: `This value should be a valid number.`

The message that will be shown if the underlying value is not a number.

[⬆ back to top](#navigation)

---------------

## Supported Constraints
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


[documentation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#documentation
[homepage-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md
[notblank-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/NotBlank.md
[blank-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Blank.md
[notnull-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/NotNull.md
[isnull-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/IsNull.md
[istrue-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/IsTrue.md
[isfalse-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/IsFalse.md
[type-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Type.md
[email-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Email.md
[length-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Length.md
[url-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Url.md
[regex-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Regex.md
[ip-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Ip.md
[uuid-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Uuid.md
[range-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Range.md
[equalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/EqualTo.md
[notequalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/NotEqualTo.md
[identicalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/IdenticalTo.md
[notidenticalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/NotIdenticalTo.md
[lessthan-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/LessThan.md
[lessthanorequal-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/LessThanOrEqual.md
[greaterthan-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/GreaterThan.md
[greaterthanorequal-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/GreaterThanOrEqual.md
[date-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Date.md
[datetime-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/DateTime.md
[time-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Time.md
[choice-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Choice.md
[collection-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Collection.md
[count-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Count.md
[uniqueentity-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/UniqueEntity.md
[language-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Language.md
[locale-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Locale.md
[country-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Country.md
[file-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/File.md
[image-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Image.md
[bic-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Bic.md
[cardscheme-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/CardScheme.md
[currency-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Currency.md
[luhn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Luhn.md
[iban-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Iban.md
[isbn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Isbn.md
[issn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Issn.md
[callback-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Callback.md
[expression-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Expression.md
[all-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/All.md
[userpassword-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/UserPassword.md
[valid-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Valid.md
[custom-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/classes/Custom.md