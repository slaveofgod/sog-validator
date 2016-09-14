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
    ...
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
* [UniqueEntity](#uniqueentity) `(not implemented)`
* [Language](#language)
* [Locale](#locale)
* [Country](#country)

#### File Constraints

* [File](#file) `(not implemented)`
* [Image](#image) `(not implemented)`

#### Financial and other Number Constraints

* [Bic](#bic)
* [CardScheme](#cardscheme)
* [Currency](#currency) `(not implemented)`
* [Luhn](#luhn) `(not implemented)`
* [Iban](#iban) `(not implemented)`
* [Isbn](#isbn) `(not implemented)`
* [Issn](#issn) `(not implemented)`

#### Other Constraints

* [Callback](#callback)
* [Expression](#expression) `(not implemented)`
* [All](#all) `(not implemented)`
* [UserPassword](#userpassword) `(not implemented)`
* [Valid](#valid) `(not implemented)`


## NotBlank
Validates that a value is not blank, defined as not strictly `false`, not equal to a blank string and also not equal to `null`. To force that a value is simply not equal to `null`, see the [NotNull](#notnull) constraint.

```javascript
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new NotBlankValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new BlankValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new NotNullValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new IsNullValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new IsTrueValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new IsFalseValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new TypeValidator({
                'type': 'integer',
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new EmailValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new LengthValidator({
                'min': 1,
                'max': 50,
                'minMessage': 'Your min error message',
                'maxMessage': 'Your max error message',
                'exactMessage': 'Your exact error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new UrlValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new RegexValidator({
                'message': 'Your error message',
                'pattern': /^.+\@\S+\.\S+$/
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new IpValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new UuidValidator({
                'message': 'Your error message',
                'versions': [1,2,3,4,5],
                'strict': true
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new RangeValidator({
                'min': 1,
                'min': 100,
                'minMessage': 'Your min error message',
                'maxMessage': 'Your max error message',
                'invalidMessage': 'Your invalid message'
            })
            ...
        ],
    },
    ...
```

**Date Ranges**
```javascript
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new RangeValidator({
                'min': new Date(2015, 0, 1, 0, 0, 0, 0),
                'max': new Date(2017, 0, 1, 0, 0, 0, 0),
                'minMessage': 'Your min error message',
                'maxMessage': 'Your max error message',
                'invalidMessage': 'Your invalid message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new EqualToValidator({
                'value': 100,
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new NotEqualToValidator({
                'value': 100,
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new IdenticalToValidator({
                'value': 100,
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new NotIdenticalToValidator({
                'value': 100,
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new LessThanValidator({
                'value': 100,
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
```

**Comparing Dates**
```javascript
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new LessThanValidator({
                'value': new Date(2016, 0, 1, 0, 0, 0, 0),
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new LessThanOrEqualValidator({
                'value': 100,
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
```

**Comparing Dates**
```javascript
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new LessThanOrEqualValidator({
                'value': new Date(2016, 0, 1, 0, 0, 0, 0),
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new GreaterThanValidator({
                'value': 100,
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
```

**Comparing Dates**
```javascript
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new GreaterThanValidator({
                'value': new Date(2016, 0, 1, 0, 0, 0, 0),
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new GreaterThanOrEqualValidator({
                'value': 100,
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
```

**Comparing Dates**
```javascript
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new GreaterThanOrEqualValidator({
                'value': new Date(2016, 0, 1, 0, 0, 0, 0),
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new DateValidator({
                'format': 'YYYY-MM-DD',
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new DateTimeValidator({
                'format': 'YYYY-MM-DD HH:mm:ss',
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new TimeValidator({
                'format': 'HH:mm:ss',
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new ChoiceValidator({
                'choices': [1111, 'aaaaa', 3333, '123a'],
                'multiple': false,
                'message': 'Your error message',
                'strict': true
            })
            ...
        ],
    },
    ...
```

**Multiple Usage**
```javascript
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
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
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new CountValidator({
                'min': 1,
                'max': 10,
                'minMessage': 'Your min error message',
                'maxMessage': 'Your max error message',
                'exactMessage': 'Your  exacterror message'
            })
            ...
        ],
    },
    ...
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
Not implemented

[Go to documentation](#documentation)

------

## Language
Validates that a value is a valid language *Unicode language identifier* (e.g. `fr` or `zh-Hant`).

```javascript
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new LanguageValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new LocaleValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new CountryValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
            new BicValidator({
                'message': 'Your error message'
            })
            ...
        ],
    },
    ...
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
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
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
            ...
        ],
    },
    ...
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
Not implemented

[Go to documentation](#documentation)

------

## Luhn
Not implemented

[Go to documentation](#documentation)

------

## Iban
Not implemented

[Go to documentation](#documentation)

------

## Isbn
Not implemented

[Go to documentation](#documentation)

------

## Issn
Not implemented

[Go to documentation](#documentation)

------

## Callback

The purpose of the Callback constraint is to create completely custom validation rules and to assign any validation errors to specific fields on your object. This process works by specifying one or more callback methods, each of which will be called during the validation process. Each of those methods can do anything, including creating and assigning validation errors.

```javascript
    ...
    fieldName: {
        isRequired: true,
        rules: [
            ...
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
            ...
        ],
    },
    ...
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