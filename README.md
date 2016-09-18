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

* [NotBlank](#notblank)
* [Blank](#blank)
* [NotNull](#notnull)
* [IsNull](#isnull)
* [IsTrue](#istrue)
* [IsFalse](#isfalse)
* [Type](#type)

#### String Constraints

* [Email](#email)
* [Length](#length)
* [Url](#url)
* [Regex](#regex)
* [Ip](#ip)
* [Uuid](#uuid)

#### Number Constraints

* [Range](#range)

#### Comparison Constraints

* [EqualTo](#equalto)
* [NotEqualTo](#notequalto)
* [IdenticalTo](#identicalto)
* [NotIdenticalTo](#notidenticalto)
* [LessThan](#lessthan)
* [LessThanOrEqual](#lessthanorequal)
* [GreaterThan](#greaterthan)
* [GreaterThanOrEqual](#greaterthanorequal)

#### Date Constraints

* [Date](#date)
* [DateTime](#datetime)
* [Time](#time)

#### Collection Constraints

* [Choice](#choice)
* [Collection](#collection) `(not implemented)`
* [Count](#count)
* [UniqueEntity](#uniqueentity)
* [Language](#language)
* [Locale](#locale)
* [Country](#country)

#### File Constraints

* [File](#file) `(not implemented)`
* [Image](#image) `(not implemented)`

#### Financial and other Number Constraints

* [Bic](#bic)
* [CardScheme](#cardscheme)
* [Currency](#currency)
* [Luhn](#luhn)
* [Iban](#iban)
* [Isbn](#isbn)
* [Issn](#issn)

#### Other Constraints

* [Callback](#callback)
* [Expression](#expression) `(not implemented)`
* [All](#all) `(not implemented)`
* [UserPassword](#userpassword) `(not implemented)`
* [Valid](#valid) `(not implemented)`


## NotBlank
Validates that a value is not blank, defined as not strictly `false`, not equal to a blank string and also not equal to `null`. To force that a value is simply not equal to `null`, see the [NotNull](#notnull) constraint.

```javascript
import {
    // ...
    NotBlankValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new NotBlankValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value should not be blank.`

This is the message that will be shown if the value is blank.

[Go to documentation](#documentation)

------

## Blank
Validates that a value is blank, defined as equal to a blank string or equal to `null`. To force that a value strictly be equal to `null`, see the [IsNull](#isnull) constraint. To force that a value is not blank, see [NotBlank](#notblank).

```javascript
import {
    // ...
    BlankValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new BlankValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value should be blank.`

This is the message that will be shown if the value is not blank.

[Go to documentation](#documentation)

------

## NotNull
Validates that a value is not strictly equal to `null`. To ensure that a value is simply not blank (not a blank string), see the [NotBlank](#notblank) constraint.

```javascript
import {
    // ...
    NotNullValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new NotNullValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value should not be null.`

This is the message that will be shown if the value is `null`.

[Go to documentation](#documentation)

------
## IsNull
Validates that a value is exactly equal to `null`. To force that a property is simply blank (blank string or `null`), see the [Blank](#blank) constraint. To ensure that a property is not null, see [NotNull](#notnull).

Also see [NotNull](#notnull).

```javascript
import {
    // ...
    IsNullValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new IsNullValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value should be null.`

This is the message that will be shown if the value is not `null`.

[Go to documentation](#documentation)

------

## IsTrue

Validates that a value is `true`. Specifically, this checks to see if the value is exactly `true`, exactly the integer `1`, or exactly the string "`1`".

Also see [IsFalse](#isfalse).

```javascript
import {
    // ...
    IsTrueValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new IsTrueValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value should be true.`

This message is shown if the underlying data is not true.

[Go to documentation](#documentation)

------

## IsFalse

Validates that a value is `false`. Specifically, this checks to see if the value is exactly `false`, exactly the integer `0`, or exactly the string "`0`".

Also see [IsTrue](#istrue).

```javascript
import {
    // ...
    IsFalseValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new IsFalseValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value should be false.`

This message is shown if the underlying data is not false.

[Go to documentation](#documentation)

------

## Type

Validates that a value is of a specific data type. For example, if a variable should be an `array`, you can use this constraint with the array type option to validate this.

```javascript
import {
    // ...
    TypeValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new TypeValidator({
                'type': 'integer',
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### type
**type**: `string`
* `array`
* `bool`
* ~~`callable`~~ `(not implemented)`
* `float`
* `double`
* `int`
* `integer`
* ~~`long`~~ `(not implemented)`
* `null`
* `numeric`
* `object`
* ~~`real`~~ `(not implemented)`
* ~~`resource`~~ `(not implemented)`
* `scalar`
* `string`
* ~~`alnum`~~ `(not implemented)`
* ~~`alpha`~~ `(not implemented)`
* ~~`cntrl`~~ `(not implemented)`
* ~~`digit`~~ `(not implemented)`
* ~~`graph`~~ `(not implemented)`
* ~~`lower`~~ `(not implemented)`
* ~~`print`~~ `(not implemented)`
* ~~`punct`~~ `(not implemented)`
* ~~`space`~~ `(not implemented)`
* ~~`upper`~~ `(not implemented)`
* ~~`xdigit`~~ `(not implemented)`

##### message
**type**: `string` **default**: `This value should be of type {{ type }}.`

The message if the underlying data is not of the given type.

[Go to documentation](#documentation)

------

## Email
Validates that a value is a valid email address. The underlying value is cast to a string before being validated.

```javascript
import {
    // ...
    EmailValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new EmailValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value is not a valid email address.`

This message is shown if the underlying data is not a valid email address.

##### ~~strict~~ `(not implemented)`
~~**type**: `string` **default**: `false`~~

##### ~~checkMX~~ `(not implemented)`
~~**type**: `string` **default**: `false`~~

##### ~~checkHost~~ `(not implemented)`
~~**type**: `string` **default**: `false`~~

[Go to documentation](#documentation)

------

## Length
Validates that a given string length is between some minimum and maximum value.

```javascript
import {
    // ...
    LengthValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new LengthValidator({
                'min': 1,
                'max': 50,
                'minMessage': 'Your min error message',
                'maxMessage': 'Your max error message',
                'exactMessage': 'Your exact error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### min
**type**: `integer`

This required option is the "min" length value. Validation will fail if the given value's length is `less` than this min value.

It is important to notice that NULL values and empty strings are considered valid no matter if the constraint required a minimum length. Validators are triggered only if the value is not blank.

##### max
**type**: `integer`

This required option is the "max" length value. Validation will fail if the given value's length is `greater` than this max value.

##### ~~charset~~ `(not implemented)`
~~**type**: `string` **default**: `UTF-8`~~

##### minMessage
**type**: `string` **default**: `This value is too short. It should have {{ limit }} characters or more.`

The message that will be shown if the underlying value's length is less than the min option.

##### maxMessage
**type**: `string` **default**: `This value is too long. It should have {{ limit }} characters or less.`

The message that will be shown if the underlying value's length is more than the max option.

##### exactMessage
**type**: `string` **default**: `This value should have exactly {{ limit }} characters.`

The message that will be shown if min and max values are equal and the underlying value's length is not exactly this value.

##### ~~charsetMessage~~ `(not implemented)`
~~**type**: `string` **default**: `This value does not match the expected {{ charset }} charset.`~~

[Go to documentation](#documentation)

------

## Url
Validates that a value is a valid URL string.

```javascript
import {
    // ...
    UrlValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new UrlValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value is not a valid URL.`

This message is shown if the URL is invalid.

##### ~~protocols~~ `(not implemented)`
~~**type**: `array` **default**: `['http', 'https']`~~

~~The protocols considered to be valid for the URL. For example, if you also consider the ftp:// type URLs to be valid, redefine the protocols array, listing http, https, and also ftp.~~

##### ~~checkDNS~~ `(not implemented)`
~~**type**: `boolean` **default**: `false`~~

~~By default, this constraint just validates the syntax of the given URL. If you also need to check whether the associated host exists, set the `checkDNS` option to `true`.~~

##### ~~dnsMessage~~ `(not implemented)`
~~**type**: `string` **default**: `The host could not be resolved.`~~

~~This message is shown when the `checkDNS` option is set to `true` and the DNS check failed.~~

[Go to documentation](#documentation)

------

## Regex
Validates that a value matches a regular expression.

```javascript
import {
    // ...
    RegexValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new RegexValidator({
                'message': 'Your error message',
                'pattern': /^.+\@\S+\.\S+$/
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value is not valid.`

This is the message that will be shown if this validator fails.

##### pattern
**type**: `string`

This required option is the regular expression pattern that the input will be matched against.

[Go to documentation](#documentation)

------

## Ip
Validates that a value is a valid IP address. ~~By default, this will validate the value as IPv4, but a number of different options exist to validate as IPv6 and many other combinations.~~

```javascript
import {
    // ...
    IpValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new IpValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This is not a valid IP address.`

This message is shown if the string is not a valid IP address.

##### ~~version~~ `(not implemented)`
~~**type**: `string` **default**: `4`~~

~~This determines exactly how the IP address is validated and can take one of a variety of different values:~~

~~**All ranges**~~

* `4` ~~Validates for IPv4 addresses~~
* `6` ~~Validates for IPv6 addresses~~
* `all` ~~Validates all IP formats~~

~~**No private ranges**~~

* `4_no_priv` ~~Validates for IPv4 but without private IP ranges~~
* `6_no_priv` ~~Validates for IPv6 but without private IP ranges~~
* `all_no_priv` ~~Validates for all IP formats but without private IP ranges~~ 

~~**No reserved ranges**~~

* `4_no_res` ~~Validates for IPv4 but without reserved IP ranges~~
* `6_no_res` ~~Validates for IPv6 but without reserved IP ranges~~
* `all_no_res` ~~Validates for all IP formats but without reserved IP ranges~~ 

~~**Only public ranges**~~

* `4_public` ~~Validates for IPv4 but without private and reserved ranges~~
* `6_public` ~~Validates for IPv6 but without private and reserved ranges~~
* `all_public` ~~Validates for all IP formats but without private and reserved ranges~~

[Go to documentation](#documentation)

------

## Uuid
Validates that a value is a valid [Universally unique identifier (UUID)](https://en.wikipedia.org/wiki/Universally_unique_identifier) per [RFC 4122](https://tools.ietf.org/html/rfc4122). By default, this will validate the format according to the RFC's guidelines, but this can be relaxed to accept non-standard UUIDs that other systems (like PostgreSQL) accept. UUID versions can also be restricted using a whitelist.

```javascript
import {
    // ...
    UuidValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new UuidValidator({
                'message': 'Your error message',
                'versions': [1,2,3,4,5],
                'strict': true
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 216f-ff40-98d9-11e3-a5e2-0800-200c-9a66
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This is not a valid UUID.`

This message is shown if the string is not a valid UUID.

##### strict
**type**: `boolean` **default**: `true`

If this option is set to `true` the constraint will check if the UUID is formatted per the RFC's input format rules: `216fff40-98d9-11e3-a5e2-0800200c9a66`. Setting this to `false` will allow alternate input formats like:

* `216f-ff40-98d9-11e3-a5e2-0800-200c-9a66`
* `{216fff40-98d9-11e3-a5e2-0800200c9a66}`
* `216fff4098d911e3a5e20800200c9a66`

##### versions
**type**: `int[]` **default**: `[1,2,3,4,5]`

This option can be used to only allow specific [UUID versions](http://en.wikipedia.org/wiki/Universally_unique_identifier#Variants_and_versions). Valid versions are 1 - 5. All five versions are allowed by default.

[Go to documentation](#documentation)

------

## Range
Validates that a given number is *between* some minimum and maximum number.

**Basic Usage**
```javascript
import {
    // ...
    RangeValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new RangeValidator({
                'min': 1,
                'min': 100,
                'minMessage': 'Your min error message',
                'maxMessage': 'Your max error message',
                'invalidMessage': 'Your invalid message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 10
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

**Date Ranges**
```javascript
import {
    // ...
    RangeValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new RangeValidator({
                'min': new Date(2015, 0, 1, 0, 0, 0, 0),
                'max': new Date(2017, 0, 1, 0, 0, 0, 0),
                'minMessage': 'Your min error message',
                'maxMessage': 'Your max error message',
                'invalidMessage': 'Your invalid message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: new Date(2016, 0, 1, 0, 0, 0, 0)
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

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

[Go to documentation](#documentation)

------

## EqualTo
Validates that a value is equal to another value, defined in the options. To force that a value is *not* equal, see [NotEqualTo](#notequalto).

This constraint compares using `==`, so `3` and "`3`" are considered equal. Use [IdenticalTo](#identicalto) to compare with `===`.

```javascript
import {
    // ...
    EqualToValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new EqualToValidator({
                'value': 100,
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 100
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### value
**type**: `mixed`

This option is required. It defines the value to compare to. It can be a string, number or object.

##### message
**type**: `string` **default**: `This value should be equal to {{ compared_value }}.`

This is the message that will be shown if the value is not equal.

[Go to documentation](#documentation)

------

## NotEqualTo
Validates that a value is not equal to another value, defined in the options. To force that a value is equal, see [EqualTo](#equalto).

This constraint compares using `!=`, so `3` and "`3`" are considered equal. Use [NotIdenticalTo](#notidenticalto) to compare with `!==`.

```javascript
import {
    // ...
    NotEqualToValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new NotEqualToValidator({
                'value': 100,
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 85
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### value
**type**: `mixed`

This option is required. It defines the value to compare to. It can be a string, number or object.

##### message
**type**: `string` **default**: `This value should not be equal to {{ compared_value }}.`

This is the message that will be shown if the value is equal.

[Go to documentation](#documentation)

------

## IdenticalTo
Validates that a value is identical to another value, defined in the options. To force that a value is *not* identical, see [NotIdenticalTo](#notidenticalto).

This constraint compares using `===`, so `3` and "`3`" are not considered equal. Use [EqualTo](#equalto) to compare with `==`.

```javascript
import {
    // ...
    IdenticalToValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new IdenticalToValidator({
                'value': 100,
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 100
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### value
**type**: `mixed`

This option is required. It defines the value to compare to. It can be a string, number or object.

##### message
**type**: `string` **default**: `This value should be identical to {{ compared_value_type }} {{ compared_value }}.`

This is the message that will be shown if the value is not identical.

[Go to documentation](#documentation)

------

## NotIdenticalTo
Validates that a value is **not** identical to another value, defined in the options. To force that a value is identical, see [IdenticalTo](#identicalto).

This constraint compares using `!==,` so `3` and "`3`" are considered not equal. Use [NotEqualTo](#notequalto) to compare with `!=`.

```javascript
import {
    // ...
    NotIdenticalToValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new NotIdenticalToValidator({
                'value': 100,
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 85
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### value
**type**: `mixed`

This option is required. It defines the value to compare to. It can be a string, number or object.

##### message
**type**: `string` **default**: `This value should not be identical to {{ compared_value_type }} {{ compared_value }}.`

This is the message that will be shown if the value is identical.

[Go to documentation](#documentation)

------

## LessThan
Validates that a value is less than another value, defined in the options. To force that a value is less than or equal to another value, see [LessThanOrEqual](#lessthanorequal). To force a value is greater than another value, see [GreaterThan](#greaterthan).

**Basic Usage**
```javascript
import {
    // ...
    LessThanValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new LessThanValidator({
                'value': 100,
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 85
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

**Comparing Dates**
```javascript
import {
    // ...
    LessThanValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new LessThanValidator({
                'value': new Date(2016, 0, 1, 0, 0, 0, 0),
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: new Date(2015, 0, 1, 0, 0, 0, 0)
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### value
**type**: `mixed`

This option is required. It defines the value to compare to. It can be a string, number or object.

##### message
**type**: `string` **default**: `This value should be less than {{ compared_value }}.`

This is the message that will be shown if the value is not less than the comparison value.


[Go to documentation](#documentation)

------

## LessThanOrEqual
Validates that a value is less than or equal to another value, defined in the options. To force that a value is less than another value, see [LessThan](#lessthan).

**Basic Usage**
```javascript
import {
    // ...
    LessThanOrEqualValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new LessThanOrEqualValidator({
                'value': 100,
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 100
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

**Comparing Dates**
```javascript
import {
    // ...
    LessThanOrEqualValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new LessThanOrEqualValidator({
                'value': new Date(2016, 0, 1, 0, 0, 0, 0),
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: new Date(2016, 0, 1, 0, 0, 0, 0)
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### value
**type**: `mixed`

This option is required. It defines the value to compare to. It can be a string, number or object.

##### message
**type**: `string` **default**: `This value should be less than or equal to {{ compared_value }}.`

This is the message that will be shown if the value is not less than or equal to the comparison value.

[Go to documentation](#documentation)

------

## GreaterThan
Validates that a value is greater than another value, defined in the options. To force that a value is greater than or equal to another value, see [GreaterThanOrEqual](#greaterthanorEqual). To force a value is less than another value, see [LessThan](#lessthan).

**Basic Usage**
```javascript
import {
    // ...
    GreaterThanValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new GreaterThanValidator({
                'value': 100,
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 185
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

**Comparing Dates**
```javascript
import {
    // ...
    GreaterThanValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new GreaterThanValidator({
                'value': new Date(2015, 0, 1, 0, 0, 0, 0),
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: new Date(2016, 0, 1, 0, 0, 0, 0)
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### value
**type**: `mixed`

This option is required. It defines the value to compare to. It can be a string, number or object.

##### message
**type**: `string` **default**: `This value should be greater than {{ compared_value }}.`

This is the message that will be shown if the value is not greater than the comparison value.

[Go to documentation](#documentation)

------

## GreaterThanOrEqual
Validates that a value is greater than or equal to another value, defined in the options. To force that a value is greater than another value, see [GreaterThan](#greaterthan).

**Basic Usage**
```javascript
import {
    // ...
    GreaterThanOrEqualValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new GreaterThanOrEqualValidator({
                'value': 100,
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 100
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

**Comparing Dates**
```javascript
import {
    // ...
    GreaterThanOrEqualValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new GreaterThanOrEqualValidator({
                'value': new Date(2016, 0, 1, 0, 0, 0, 0),
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: new Date(2016, 0, 1, 0, 0, 0, 0)
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### value
**type**: `mixed`

This option is required. It defines the value to compare to. It can be a string, number or object.

##### message
**type**: `string` **default**: `This value should be greater than or equal to {{ compared_value }}.`

This is the message that will be shown if the value is not greater than or equal to the comparison value.

[Go to documentation](#documentation)

------

## Date
Validates that a value is a valid date, meaning either a `Date` object ~~or a string (or an object that can be cast into a string)~~ that follows a valid format.

```javascript
import {
    // ...
    DateValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new DateValidator({
                'format': 'YYYY-MM-DD',
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 2015-11-25
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### format
**type**: `string` **default**: `YYYY-MM-DD`

This option allows to validate a custom date format.

##### message
**type**: `string` **default**: `This value is not a valid date.`

This message is shown if the underlying data is not a valid date.

[Go to documentation](#documentation)

------

## DateTime
Validates that a value is a valid "datetime", meaning either a `Date` object ~~or a string (or an object that can be cast into a string)~~ that follows a specific format.

```javascript
import {
    // ...
    DateTimeValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new DateTimeValidator({
                'format': 'YYYY-MM-DD HH:mm:ss',
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 2015-11-25 22:16:35
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### format
**type**: `string` **default**: `YYYY-MM-DD HH:mm:ss`

This option allows to validate a custom date format.

##### message
**type**: `string` **default**: `This value is not a valid datetime.`

This message is shown if the underlying data is not a valid datetime.

[Go to documentation](#documentation)

------

## Time
Validates that a value is a valid time, meaning either a `Date` object ~~or a string (or an object that can be cast into a string)~~ that follows a valid format.

```javascript
import {
    // ...
    TimeValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new TimeValidator({
                'format': 'HH:mm:ss',
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 22:16:35
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### format
**type**: `string` **default**: `HH:mm:ss`

This option allows to validate a custom date format.

##### message
**type**: `string` **default**: `This value is not a valid time.`

This message is shown if the underlying data is not a valid time.

[Go to documentation](#documentation)

------

## Choice
This constraint is used to ensure that the given value is one of a given set of *valid* choices. It can also be used to validate that each item in an array of items is one of those valid choices.

**Basic Usage**
```javascript
import {
    // ...
    ChoiceValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new ChoiceValidator({
                'choices': [1111, 'aaaaa', 3333, '123a'],
                'multiple': false,
                'message': 'Your error message',
                'strict': true
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 'aaaaa'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

**Multiple Usage**
```javascript
import {
    // ...
    ChoiceValidator,
    ObjectExecutionContext
} from 'bob-validator';

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
                'message': 'Your error message',
                'multipleMessage': 'Your multiple error message',
                'minMessage': 'Your min error message',
                'maxMessage': 'Your max error message',
                'strict': true
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: [1111, '123a']
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

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

[Go to documentation](#documentation)

------

## Collection
Not implemented

[Go to documentation](#documentation)

------

## Count
Validates that a given collection's (i.e. an array ~~or an object that implements Countable~~) element count is *between* some minimum and maximum value.

```javascript
import {
    // ...
    CountValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new CountValidator({
                'min': 1,
                'max': 10,
                'minMessage': 'Your min error message',
                'maxMessage': 'Your max error message',
                'exactMessage': 'Your  exacterror message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' Example: [1111, 2222, 'aaaa', 'bbbb']
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### min
**type**: `integer`

This required option is the "`min`" count value. Validation will fail if the given collection elements count is **less** than this min value.

##### max
**type**: `integer`

This required option is the "`max`" count value. Validation will fail if the given collection elements count is **greater** than this max value.

##### minMessage
**type**: `string` **default**: `This collection should contain {{ limit }} elements or more.`

The message that will be shown if the underlying collection elements count is less than the `min` option.

##### maxMessage
**type**: `string` **default**: `This collection should contain {{ limit }} elements or less.`

The message that will be shown if the underlying collection elements count is more than the `max` option.

##### exactMessage
**type**: `string` **default**: `This collection should contain exactly {{ limit }} elements.`

The message that will be shown if `min` and `max` values are **equal** and the underlying collection elements count is not exactly this value.

[Go to documentation](#documentation)

------

## UniqueEntity
Validates that a particular field (or fields) in entity is (are) unique. This is commonly used, for example, to prevent a new user to register using an email address that already exists in the system.

```javascript
import {
    // ...
    UniqueEntityValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new UniqueEntityValidator({
                'message': 'Your error message',
                'fields': ['first_name', 'email'],
                'repositoryData':[
                    {"id":1,"first_name":"Diana","last_name":"Simmons","email":"dsimmons0@google.com"},
                    {"id":2,"first_name":"Earl","last_name":"Hunt","email":"ehunt1@wp.com"},
                    {"id":3,"first_name":"Kathy","last_name":"Day","email":"kday2@dagondesign.com"},
                    {"id":4,"first_name":"Andrew","last_name":"Gilbert","email":"agilbert3@ft.com"},
                    {"id":5,"first_name":"Matthew","last_name":"Watkins","email":"mwatkins4@freewebs.com"},
                    {"id":6,"first_name":"Phillip","last_name":"Burke","email":"pburke5@unc.edu"},
                    {"id":7,"first_name":"Ashley","last_name":"James","email":"ajames6@oaic.gov.au"},
                    {"id":8,"first_name":"Roger","last_name":"Franklin","email":"rfranklin7@phpbb.com"},
                    {"id":9,"first_name":"Randy","last_name":"Shaw","email":"rshaw8@google.fr"},
                    {"id":10,"first_name":"Marie","last_name":"Perez","email":"mperez9@mozilla.org"},
                    {"id":11,"first_name":"Jennifer","last_name":"Kennedy","email":"jkennedya@sciencedaily.com"},
                    {"id":12,"first_name":"Carol","last_name":"Butler","email":"cbutlerb@mac.com"},
                    {"id":13,"first_name":"Angela","last_name":"Morrison","email":"amorrisonc@cbsnews.com"},
                    {"id":14,"first_name":"Stephanie","last_name":"Mitchell","email":"smitchelld@free.fr"},
                    {"id":15,"first_name":"Henry","last_name":"Ramos","email":"hramose@ibm.com"}
                ],
                'ignoreNull': true
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: {"id":16,"first_name":"Tammy","last_name":"Montgomery","email":"tmontgomeryf@tinyurl.com"}
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value is already used.`

The message that's displayed when this constraint fails.

##### fields
**type**: `array`

This required option is the field (or list of fields) on which this entity should be unique. For example, if you specified both the `email` and `name` field in a single `UniqueEntity` constraint, then it would enforce that the combination value is unique (e.g. two users could have the same email, as long as they don't have the same name also).

If you need to require two fields to be individually unique (e.g. a unique `email` and a unique `username`), you use two `UniqueEntity` entries, each with a single field.

##### ~~ignoreNull~~ `(not implemented)`
~~**type**: `boolean` **default**: `true`~~

~~If this option is set to `true`, then the constraint will allow multiple entities to have a `null` value for a field without failing validation. If set to `false`, only one `null` value is allowed - if a second entity also has a `null` value, validation would fail.~~

##### repositoryData
**type**: `array`

This required option is data source for comparing.

[Go to documentation](#documentation)

------

## Language
Validates that a value is a valid language *Unicode language identifier* (e.g. `fr` or `zh-Hant`).

```javascript
import {
    // ...
    LanguageValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new LanguageValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: en_gb
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value is not a valid language.`

This message is shown if the string is not a valid language code.

[Go to documentation](#documentation)

------

## Locale
Validates that a value is a valid locale.

The "value" for each locale is either the two letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) *language* code (e.g. `fr`), or the language code followed by an underscore (`_`), then the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) *country* code (e.g. `fr_FR` for French/France).

```javascript
import {
    // ...
    LocaleValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new LocaleValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: cy_GB
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value is not a valid locale.`

This message is shown if the string is not a valid locale.

[Go to documentation](#documentation)

------

## Country
Validates that a value is a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) country code.

```javascript
import {
    // ...
    CountryValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new CountryValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: US
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value is not a valid country.`

This message is shown if the string is not a valid country code.

[Go to documentation](#documentation)

------

## File
Not implemented

[Go to documentation](#documentation)

------

## Image
Not implemented

[Go to documentation](#documentation)

------

## Bic
This constraint is used to ensure that a value has the proper format of a [Business Identifier Code (BIC)](https://en.wikipedia.org/wiki/ISO_9362). BIC is an internationally agreed means to uniquely identify both financial and non-financial institutions.

```javascript
import {
    // ...
    BicValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new BicValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: DABAIE2D
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This is not a valid Business Identifier Code (BIC).`

The default message supplied when the value does not pass the BIC check.

[Go to documentation](#documentation)

------

## CardScheme
This constraint ensures that a credit card number is valid for a given credit card company. It can be used to validate the number before trying to initiate a payment through a payment gateway.

```javascript
import {
    // ...
    CardSchemeValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new CardSchemeValidator({
                'schemes': [
                    'AMEX',
                    'CHINA_UNIONPAY',
                    'DINERS',
                    'DISCOVER',
                    'INSTAPAYMENT',
                    'JCB',
                    'LASER',
                    'MAESTRO',
                    'MASTERCARD',
                    'VISA'
                ],
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 4111111111111111 (Visa)
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `Unsupported card type or invalid card number.`

The message shown when the value does not pass the `CardScheme` check.

##### schemes
**type**: `array`

This option is required and represents the name of the number scheme used to validate the credit card number. Valid values are:

* `AMEX`
* `CHINA_UNIONPAY`
* `DINERS`
* `DISCOVER`
* `INSTAPAYMENT`
* `JCB`
* `LASER`
* `MAESTRO`
* `MASTERCARD`
* `VISA`

For more information about the used schemes, see [Wikipedia: Issuer identification number (IIN)](https://en.wikipedia.org/wiki/Payment_card_number#Issuer_identification_number_.28IIN.29).

[Go to documentation](#documentation)

------

## Currency
Validates that a value is a valid [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency name.

```javascript
import {
    // ...
    CurrencyValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new CurrencyValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: USD
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value is not a valid currency.`

This is the message that will be shown if the value is not a valid currency.

[Go to documentation](#documentation)

------

## Luhn
This constraint is used to ensure that a credit card number passes the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm). It is useful as a first step to validating a credit card: before communicating with a payment gateway.

```javascript
import {
    // ...
    LuhnValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new LuhnValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 79927398714
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `Invalid card number.`

The default message supplied when the value does not pass the Luhn check.

[Go to documentation](#documentation)

------

## Iban
This constraint is used to ensure that a bank account number has the proper format of an [International Bank Account Number (IBAN)](https://en.wikipedia.org/wiki/International_Bank_Account_Number). IBAN is an internationally agreed means of identifying bank accounts across national borders with a reduced risk of propagating transcription errors.

```javascript
import {
    // ...
    IbanValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new IbanValidator({
                'message': 'Your error message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 'GB29 NWBK 6016 1331 9268 19'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This is not a valid International Bank Account Number (IBAN).`

The default message supplied when the value does not pass the Iban check.

[Go to documentation](#documentation)

------

## Isbn
This constraint validates that an [International Standard Book Number (ISBN)](https://en.wikipedia.org/wiki/International_Standard_Book_Number) is either a valid ISBN-10 or a valid ISBN-13.

```javascript
import {
    // ...
    IsbnValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new IsbnValidator({
                'isbn10Message': 'Your error isbn10 message', 
                'isbn13Message': 'Your error isbn13 message',
                'bothIsbnMessage': 'Your error both isbn message'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: (ISBN-13: '978-1-56619-909-4', ISBN-10: '1-56619-909-3')
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### type
**type**: `string` **default**: `null`

The type of ISBN to validate against. Valid values are `isbn10`, `isbn13` and `null` to accept any kind of ISBN.

##### message
**type**: `string` **default**: `null`

The message that will be shown if the value is not valid. If not `null`, this message has priority over all the other messages.

##### isbn10Message
**type**: `string` **default**: `This value is not a valid ISBN-10.`

The message that will be shown if the *type* option is `isbn10` and the given value does not pass the ISBN-10 check.

##### isbn13Message
**type**: `string` **default**: `This value is not a valid ISBN-13.`

The message that will be shown if the *type* option is `isbn13` and the given value does not pass the ISBN-13 check.

##### bothIsbnMessage
**type**: `string` **default**: `This value is neither a valid ISBN-10 nor a valid ISBN-13.`

The message that will be shown if the *type* option is `null` and the given value does not pass any of the ISBN checks.

[Go to documentation](#documentation)

------

## Issn
Validates that a value is a valid [International Standard Serial Number (ISSN)](https://en.wikipedia.org/wiki/International_Standard_Serial_Number).

```javascript
import {
    // ...
    IssnValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new IssnValidator({
                'message': 'Your error message', 
                'caseSensitive': false,
                'requireHyphen': false
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: '0028-0836'
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### message
**type**: `string` **default**: `This value is not a valid ISSN.`

The message shown if the given value is not a valid ISSN.

##### caseSensitive
**type**: `boolean` **default**: `false`

The validator will allow ISSN values to end with a lower case 'x' by default. When switching this to `true`, the validator requires an upper case 'X'.

##### requireHyphen
**type**: `boolean` **default**: `false`

The validator will allow non hyphenated ISSN values by default. When switching this to `true`, the validator requires a hyphenated ISSN value.

[Go to documentation](#documentation)

------

## Callback

The purpose of the Callback constraint is to create completely custom validation rules and to assign any validation errors to specific fields on your object. This process works by specifying one or more callback methods, each of which will be called during the validation process. Each of those methods can do anything, including creating and assigning validation errors.

```javascript
import {
    // ...
    CallbackValidator,
    ObjectExecutionContext
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new CallbackValidator({
                'callback': function(value, parameters){
                    if(value < parameters['min']){
                        return false;
                    }

                    if(value > parameters['max']){
                        return false;
                    }

                    return true;
                },
                'parameters': {'min': 100, 'max': 200},
                'message': 'This value should be between {{ min }} and {{ max }}.'
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 158
};

let _oec = new ObjectExecutionContext({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

#### Options
##### callback
**type**: `function`

This required option is the "`function`" that will executed.

##### parameters
**type**: `array` **default**: `null`

This option is the "`parameters`" that will argument for executed function.

##### message
**type**: `string`

The message that will be shown if function return false. This option is required.

[Go to documentation](#documentation)

------

## Expression
Not implemented

[Go to documentation](#documentation)

------

## All
Not implemented

[Go to documentation](#documentation)

------

## UserPassword
Not implemented

[Go to documentation](#documentation)

------

## Valid
Not implemented

[Go to documentation](#documentation)

------

