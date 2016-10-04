# Choice
This constraint is used to ensure that the given value is one of a given set of *valid* choices. It can also be used to validate that each item in an array of items is one of those valid choices.

[**Homepage**][documentation-url]

### Navigation

* [Basic Usage](#basic-usage)
* [Multiple Usage](#multiple-usage)
* [Options](#options)
* [Documentation](#documentation)
* [Installation][installation-url]

---------------

#### Basic Usage

**Single Usage**

```javascript
var _v = require('bob-validator');

let ChoiceValidator = _v.ChoiceValidator;
```

**ES6:**
```javascript
import {
    // ...
    ChoiceValidator
} from 'bob-validator';
```

```javascript
// Import ...

let _validator = new ChoiceValidator({
    'choices': [1111, 'aaaaa', 3333, '123a'],
    'multiple': false,
    'message': 'The value you selected is not a valid choice.',
    'strict': true
});

let data = 'aaaaa';

_validator.validate(data);

if(!_validator.isValid()) {
    let errors = _validator.getErrors();
}
```

**Multi Usage**

```javascript
var _v = require('bob-validator');

let ChoiceValidator = _v.ChoiceValidator;
let AllValidator = _v.AllValidator;
```

**ES6:**
```javascript
import {
    // ...
    ChoiceValidator,
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
            new ChoiceValidator({
                'choices': [1111, 'aaaaa', 3333, '123a'],
                'multiple': false,
                'message': 'The value you selected is not a valid choice.',
                'strict': true
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'aaaaa'
};

let _oec = new AllValidator({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

**Schema Usage**

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

**Single Usage**

```javascript
var _v = require('bob-validator');

let ChoiceValidator = _v.ChoiceValidator;
```

**ES6:**
```javascript
import {
    // ...
    ChoiceValidator
} from 'bob-validator';
```

```javascript
// Import ...

let _validator = new ChoiceValidator({
    'choices': [1111, 'aaaaa', 3333, '123a'],
    'multiple': true,
    'min': 1,
    'max': 10,
    'message': 'The value you selected is not a valid choice.',
    'multipleMessage': 'One or more of the given values is invalid.',
    'minMessage': 'You must select at least {{ limit }} choices.',
    'maxMessage': 'You must select at most {{ limit }} choices.',
    'strict': true
});

let data = [1111, '123a'];

_validator.validate(data);

if(!_validator.isValid()) {
    let errors = _validator.getErrors();
}
```

**Multi Usage**

```javascript
var _v = require('bob-validator');

let ChoiceValidator = _v.ChoiceValidator;
let AllValidator = _v.AllValidator;
```

**ES6:**
```javascript
import {
    // ...
    ChoiceValidator,
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
            new ChoiceValidator({
                'choices': [1111, 'aaaaa', 3333, '123a'],
                'multiple': true,
                'min': 1,
                'max': 10,
                'message': 'The value you selected is not a valid choice.',
                'multipleMessage': 'One or more of the given values is invalid.',
                'minMessage': 'You must select at least {{ limit }} choices.',
                'maxMessage': 'You must select at most {{ limit }} choices.',
                'strict': true
            })
        ]
    }
};

let data = {
    // ...
    fieldName: [1111, '123a']
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

**Schema Usage**

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


[documentation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#documentation
[installation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#installation-and-using
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