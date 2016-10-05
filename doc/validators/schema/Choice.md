# Choice
This constraint is used to ensure that the given value is one of a given set of *valid* choices. It can also be used to validate that each item in an array of items is one of those valid choices.

[**Homepage**][documentation-schema-url]

### Navigation

* [Installation](#installation)
* [Basic Usage](#basic-usage)
* [Multiple Usage](#multiple-usage)
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

let schema = {
    // ...
    fieldName: {
        isRequired: true,
        rules: {
            // ...
            Choice: {
                'choices': [1111, 'aaaaa', 3333, '123a'],
                'multiple': false,
                'message': 'The value you selected is not a valid choice.',
                'strict': true
            }
        }
    }
};

let data = {
    // ...
    fieldName: 'aaaaa'
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

#### Multiple Usage

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

let schema = {
    // ...
    fieldName: {
        isRequired: true,
        rules: {
            // ...
            Choice: {
                'choices': [1111, 'aaaaa', 3333, '123a'],
                'multiple': true,
                'min': 1,
                'max': 10,
                'message': 'The value you selected is not a valid choice.',
                'multipleMessage': 'One or more of the given values is invalid.',
                'minMessage': 'You must select at least {{ limit }} choices.',
                'maxMessage': 'You must select at most {{ limit }} choices.',
                'strict': true
            }
        }
    }
};

let data = {
    // ...
    fieldName: [1111, '123a']
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
##### choices
**type**: `array`

A required option ~~(unless callback is specified)~~ - this is the array of options that should be considered in the valid set. The input value will be matched against this array.

##### ~~callback~~ `(not implemented)`
~~**type**: `string|array|Closure`~~

~~This is a callback method that can be used instead of the choices option to return the choices array.~~

##### multiple
**type**: `boolean` **default**: `false`

If this option is true, the input value is expected to be an array instead of a single, scalar value. The constraint will check that each value of the input array can be found in the array of valid choices. If even one of the input values cannot be found, the validation will fail.

##### min
**type**: `integer`

If the `multiple` option is true, then you can use the `min` option to force at least XX number of values to be selected. For example, if `min` is 3, but the input array only contains 2 valid items, the validation will fail.

##### max
**type**: `integer`

If the `multiple` option is true, then you can use the `max` option to force no more than XX number of values to be selected. For example, if `max` is 3, but the input array contains 4 valid items, the validation will fail.

##### message
**type**: `string` **default**: `The value you selected is not a valid choice.`

This is the message that you will receive if the `multiple` option is set to `false` and the underlying value is not in the valid array of choices.

##### multipleMessage
**type**: `string` **default**: `One or more of the given values is invalid.`

This is the message that you will receive if the `multiple` option is set to `true` and one of the values on the underlying array being checked is not in the array of valid choices.

##### minMessage
**type**: `string` **default**: `You must select at least {{ limit }} choices.`

This is the validation error message that's displayed when the user chooses too few choices per the `min` option.

##### maxMessage
**type**: `string` **default**: `You must select at most {{ limit }} choices.`

This is the validation error message that's displayed when the user chooses too many options per the `max` option.

##### strict
**type**: `boolean` **default**: `false`

If true, the validator will also check the type of the input value.

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
[homepage-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md
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