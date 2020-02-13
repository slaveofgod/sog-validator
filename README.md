# sog-validator

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![DeepScan grade][deepscan-image]][deepscan-url]

Data validation engine.

##### This is the powerest library which provides the best way to validate any type of data.

 * [Installation and Usage](#installation-and-usage)
 * [Available Validation Rules](#available-validation-rules)

## Installation and Usage

### Server-side usage

Install the library with `npm install sog-validator`

#### No ES6
```javascript
var sogv = require('sog-validator');

var validationEngine = new sogv.Application({
    lang: 'en'
});

var form = validationEngine.make({
    first_name: 'required|string|length:min,max',
    last_lame: 'required|string|length:min,max',
    email: 'required|email',
    birthday: 'required|date',
    creditCard: 'required|string|card-scheme:VISA;MASTERCARD',
    ip: 'required|string|ip',
    locale: 'required|string|locale',
    country: 'required|string|country',
    language: 'required|string|language',
    homepage: 'required|string|url'
}, {
    first_name: 'Leo',
    last_lame: 'Lane',
    email: 'leo.lane38@example.com',
    birthday: '1977-03-07',
    creditCard: '4111111111111111',
    ip: '8.8.8.8',
    locale: 'cy_GB',
    country: 'US',
    language: 'en_gb',
    homepage: 'https://github.com//slaveofgod/sog-validator'
});

if (false === form.isValid()) {
    if (false === form.get('name').isValid()) {
        form.get('name').errors().first();
    }
    // ...
}
```

#### ES6
```javascript
import sogv from 'sog-validator';
```

### Client-side usage

The library can be loaded either as a standalone script.

```html
<script type="text/javascript" src="build/output/sog-validator.min.js"></script>
<script type="text/javascript">
var validationEngine = new sogv.Application({
    lang: 'en'
});

var form = validationEngine.make({
    first_name: 'required|string|length:min,max',
    last_lame: 'required|string|length:min,max',
    email: 'required|email',
    birthday: 'required|date',
    creditCard: 'required|string|card-scheme:VISA;MASTERCARD',
    ip: 'required|string|ip',
    locale: 'required|string|locale',
    country: 'required|string|country',
    language: 'required|string|language',
    homepage: 'required|string|url'
}, {
    first_name: 'Leo',
    last_lame: 'Lane',
    email: 'leo.lane38@example.com',
    birthday: '1977-03-07',
    creditCard: '4111111111111111',
    ip: '8.8.8.8',
    locale: 'cy_GB',
    country: 'US',
    language: 'en_gb',
    homepage: 'https://github.com//slaveofgod/sog-validator'
});
     *
if (false === form.isValid()) {
    if (false === form.get('name').isValid()) {
        form.get('name').errors().first();
    }
    // ...
}
</script>
```

### Single usage
```html
<script type="text/javascript" src="build/output/sog-validator.min.js"></script>
<script type="text/javascript">

// Validation status only
if (false === sogv.isValid('leo.lane38@example.com', 'required|email')) {
    // do something with invalid data
}

// Validation status and error message (returns message if data invalid or null if valid)
var message = sogv.isValidWithErrorMessage('leo.lane38@example.com', 'required|email');
if (null !== message) {
    // do something with invalid data
}
</script>
```

## Available Validation Rules
Below is a list of all available validation rules and their function:

#### Basic Constraints
These are the basic constraints: use them to assert very basic things about the value of properties or the return value of methods on your object.
 * [Accepted](#accepted)
 * [Not Blank](#not-blank)
 * [Blank](#blank)
 * [Not Null](#not-null)
 * [Is Null](#is-null)
 * [Is True](#is-true)
 * [Alpha Dash](#alpha-dash)
 * [Array](#array)
 * [Boolean](#boolean)
 * [Callable](#callable)
 * [Float](#float)
 * [Double](#double)
 * [Integer](#integer)
 * [Iterable](#iterable)
 * [Null](#null)
 * [Numeric](#numeric)
 * [Object](#object)
 * [Real](#real)
 * [Scalar](#scalar)
 * [String](#string)
 * [Alnum](#alnum)
 * [Alpha](#alpha)
 * [Cntrl](#cntrl)
 * [Digit](#digit)
 * [Graph](#graph)
 * [Lower](#lower)
 * [Print](#print)
 * [Punct](#punct)
 * [Space](#space)
 * [Upper](#upper)
 * [Xdigit](#xdigit)
 
#### String Constraints

 * [Email](#email)
 * [Length](#length)
 * [Url](#url)
 * [Regular Expression](#regular-expression)
 * [Ip](#ip)
 * [IPv4](#ipv4)
 * [IPv6](#ipv6)
 * [Json](#json)
 * [Uuid](#uuid)
 * [Ends With](#ends-with)
 * [Starts With](#starts-with)
 
#### Comparison Constraints

 * [Equal To](#equal-to)
 * [Not Equal To](#not-equal-to)
 * [Identical To](#identical-to)
 * [Not Identical To](#not-identical-to)
 * [Less Than](#less-than)
 * [Less Than Or Equal](#less-than-or-equal)
 * [Greater Than](#greater-than)
 * [Greater Than Or Equal](#greater-than-or-equal)
 * [Range](#range)
 * [Between](#between)
 * [Digits Between](#digits-between)
 * [Divisible By](#divisible-by)
 * [Unique](#unique)
 * [Digits](#digits)
 * [Distinct](#distinct)
 * [Size](#size)
 * [After (Date)](#after-date)
 * [After Or Equal (Date)](#after-or-equal-date)
 * [Before (Date)](#before-date)
 * [Before Or Equal (Date)](#before-or-equal-date)
 * [Date Equals](#date-equals)
 
#### Number Constraints

 * [Positive](#positive)
 * [Positive Or Zero](#positive-or-zero)
 * [Negativeaaa](#negative)
 * [Negative Or Zero](#negative-or-zero)
 
#### Date Constraints

 * [Date](#date)
 * [Date Time, Date Format](#date-time-date-format)
 * [Time](#time)
 * [Timezone](#timezone)

---

##### Accepted

_aliases_: `accepted`

The field under validation must be `yes`, `on`, `1`, or `true`. This is useful for validating "Terms of Service" acceptance.

[⬆ validation rules](#available-validation-rules)

---

##### Not Blank

_aliases_: `not-blank`, `not-empty`, `filled`

Validates that a value is `not blank` - meaning not equal to a blank string, a blank array, false or null (null behavior is configurable). The field under validation must not be empty when it is present.

[⬆ validation rules](#available-validation-rules)

---

##### Blank

_aliases_: `blank`, `empty`

Validates that a value is blank - meaning equal to an `empty string` or `null`.

[⬆ validation rules](#available-validation-rules)

---

##### Not Null

_aliases_: `not-null`, `required`, `present`

Validates that a value is not strictly equal to `null`.

[⬆ validation rules](#available-validation-rules)

---

##### Is Null

_aliases_: `is-null`, `nullable`

Validates that a value is exactly equal to `null`.

[⬆ validation rules](#available-validation-rules)

---

##### Is True

_aliases_: `is-true`, `true`

Validates that a value is true. Specifically, this checks if the value is exactly `true`, exactly the integer `1`, or exactly the string "`1`".

[⬆ validation rules](#available-validation-rules)

---

##### Is False

_aliases_: `is-false`, `false`

Validates that a value is false. Specifically, this checks to see if the value is exactly false, exactly the integer 0, or exactly the string "0".

[⬆ validation rules](#available-validation-rules)

---

##### Alpha Dash

_aliases_: `alpha_dash`, `alpha-dash`

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

[⬆ validation rules](#available-validation-rules)

---

##### Array

_aliases_: `array`, `arr`

The field under validation must be an array.

[⬆ validation rules](#available-validation-rules)

---

##### Boolean

_aliases_: `boolean`, `bool`

The field under validation must be able to be cast as a boolean. Accepted input are true, false, 1, 0, "1", and "0".

[⬆ validation rules](#available-validation-rules)

---

##### Callable

_aliases_: `callable`

Verify that the contents of a variable can be called as a function.

[⬆ validation rules](#available-validation-rules)

---

##### Float

_aliases_: `float`

The field under validation must be a float.

[⬆ validation rules](#available-validation-rules)

---

##### Double

_aliases_: `double`

The field under validation must be a double.

[⬆ validation rules](#available-validation-rules)

---

##### Integer

_aliases_: `int`, `integer`

The field under validation must be an integer.

[⬆ validation rules](#available-validation-rules)

---

##### Iterable

_aliases_: `iterable`

Verify that the contents of a variable is an iterable value.

[⬆ validation rules](#available-validation-rules)

---

##### Null

_aliases_: `null`

The field under validation must be a NULL.

[⬆ validation rules](#available-validation-rules)

---

##### Numeric

_aliases_: `numeric`, `num`

The field under validation must be a number or a numeric string.

[⬆ validation rules](#available-validation-rules)

---

##### Object

_aliases_: `object`

The field under validation must be an object.

[⬆ validation rules](#available-validation-rules)

---

##### Real

_aliases_: `real`

Finds whether the type of a variable is real.

[⬆ validation rules](#available-validation-rules)

---

##### Scalar

_aliases_: `scalar`

Finds whether a variable is a scalar. Scalar variables are those containing an integer, float, string or boolean.

[⬆ validation rules](#available-validation-rules)

---
##### String

_aliases_: `string`, `str`

The field under validation must be a string.

[⬆ validation rules](#available-validation-rules)

---

##### Alnum

_aliases_: `alnum`, `alpha-num`, `alpha_num`

Check for alphanumeric character(s).

[⬆ validation rules](#available-validation-rules)

---

##### Alpha

_aliases_: `alpha`

Check for alphabetic character(s).

[⬆ validation rules](#available-validation-rules)

---

##### Cntrl

_aliases_: `cntrl`

Check for control character(s).

[⬆ validation rules](#available-validation-rules)

---

##### Digit

_aliases_: `digit`

Check for numeric character(s).

[⬆ validation rules](#available-validation-rules)

---

##### Graph

_aliases_: `graph`

Check for any printable character(s) except space.

[⬆ validation rules](#available-validation-rules)

---

##### Lower

_aliases_: `lower`

Check for lowercase character(s).

[⬆ validation rules](#available-validation-rules)

---

##### Print

_aliases_: `print`

Check for printable character(s).

[⬆ validation rules](#available-validation-rules)

---

##### Punct

_aliases_: `punct`

Check for any printable character which is not whitespace or an alphanumeric character.

[⬆ validation rules](#available-validation-rules)

---

##### Space

_aliases_: `space`

Check for whitespace character(s).

[⬆ validation rules](#available-validation-rules)

---

##### Upper

_aliases_: `upper`

Check for uppercase character(s).

[⬆ validation rules](#available-validation-rules)

---

##### Xdigit

_aliases_: `xdigit`

Check for character(s) representing a hexadecimal digit.

[⬆ validation rules](#available-validation-rules)

---

##### Email

_aliases_: `email`

_usage_: `email:mode`

_available modes_:
 * `loose` - A simple regular expression. Allows all values with an "`@`" symbol in, and a "`.`" in the second host part of the email address.
 * `html5` - This matches the pattern used for the `HTML5` email input element.

Validates that a value is a valid email address.

[⬆ validation rules](#available-validation-rules)

---

##### Length

_aliases_: `length`, `len`

_usage_: `length:min,max`

Validates that a given string length is between some `minimum` and `maximum` value.

[⬆ validation rules](#available-validation-rules)

---

##### Url

_aliases_: `url`

Validates that a value is a valid URL string.

[⬆ validation rules](#available-validation-rules)

---

##### Regular Expression

_aliases_: `regex`

_usage_: `regex:pattern,match`

_options_:
 * `pattern` - This required option is the regular expression pattern that the input will be matched against.
 * `match` - If `true` (or not set), this validator will pass if the given string matches the given pattern regular expression. However, when this option is set to `false`, the opposite will occur: validation will pass only if the given string does not match the pattern regular expression. Default: `true`.

Validates that a value matches a regular expression.

[⬆ validation rules](#available-validation-rules)

---

##### Ip

_aliases_: `ip`

Validates that a value is a valid IP address.

[⬆ validation rules](#available-validation-rules)

---

##### IPv4

_aliases_: `ipv4`

The field under validation must be an `IPv4` address.

[⬆ validation rules](#available-validation-rules)

---

##### IPv6

_aliases_: `ipv6`

The field under validation must be an `IPv6` address.

[⬆ validation rules](#available-validation-rules)

---

##### Json

_aliases_: `json`

Validates that a value has valid `JSON` syntax.

[⬆ validation rules](#available-validation-rules)

---

##### Uuid

_aliases_: `uuid`

_usage_: `uuid:versions`

_options_:
 * `versions` - This is optional parameter. This option can be used to only allow specific UUID versions. Valid versions are 1 - 5. Default: [1, 2, 3, 4, 5].

The field under validation must be a valid RFC 4122 (version 1, 3, 4, or 5) universally unique identifier (UUID).

[⬆ validation rules](#available-validation-rules)

---

##### Ends With

_aliases_: `ends_with`, `ends-with`, `ends`

_usage_: `ends-with:foo;bar;...`

_options_:
 * `ends` - The option is required. The list of ends. One of the "`end`" needs to be the end of the passed value.

The field under validation must end with one of the given values.

[⬆ validation rules](#available-validation-rules)

---

##### Starts With

_aliases_: `starts_with`, `starts-with`, `starts`

_usage_: `starts_with:foo;bar;...`

_options_:
 * `starts` - The option is required. The list of starts. One of the "`start`" needs to be the end of the passed value.

The field under validation must start with one of the given values.

[⬆ validation rules](#available-validation-rules)

---

##### Equal To

_aliases_: `equal-to`, `equal`, `same`, `et`

_usage_: `equal-to:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `object`.

Validates that a value is equal to another value, defined in the options. This constraint compares using `==`, so `3` and "`3`" are considered equal. 

[⬆ validation rules](#available-validation-rules)

---

##### Not Equal To

_aliases_: `not-equal-to`, `not-equal`, `net`

_usage_: `not-equal-to:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `object`.

Validates that a value is not equal to another value, defined in the options. This constraint compares using `!=`, so `3` and "`3`" are considered equal.

[⬆ validation rules](#available-validation-rules)

---

##### Identical To

_aliases_: `identical-to`, `identical`, `it`

_usage_: `identical-to:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `object`.

Validates that a value is identical to another value, defined in the options. This constraint compares using `===`, so `3` and "`3`" are not considered equal.

[⬆ validation rules](#available-validation-rules)

---

##### Not Identical To

_aliases_: `not-identical-to`, `not-identical`, `nit`

_usage_: `not-identical-to:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `object`.

Validates that a value is not identical to another value, defined in the options. This constraint compares using `!==`, so `3` and "`3`" are considered not equal.

[⬆ validation rules](#available-validation-rules)

---

##### Less Than

_aliases_: `less_than`, `less-than`, `less`

_usage_: `less_than:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `date object`.

Validates that a value is less than another value, defined in the options.

[⬆ validation rules](#available-validation-rules)

---

##### Less Than Or Equal

_aliases_: `less_than_or_equal`, `less-than-or-equal`, `max`

_usage_: `less_than_or_equal:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `date object`.

Validates that a value is less than or equal to another value, defined in the options.

[⬆ validation rules](#available-validation-rules)

---

##### Greater Than

_aliases_: `greater_than`, `greater-than`, `greater`

_usage_: `greater_than:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `date object`.

Validates that a value is greater than another value, defined in the options.

[⬆ validation rules](#available-validation-rules)

---

##### Greater Than Or Equal

_aliases_: `greater_than_or_equal`, `greater-than-or-equal`, `min`

_usage_: `greater_than_or_equal:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `date object`.

Validates that a value is greater than or equal to another value, defined in the options.

[⬆ validation rules](#available-validation-rules)

---

##### Range

_aliases_: `range`

_usage_: `range:min,max`

Validates that a given number or Date object is between some `minimum` and `maximum`.

[⬆ validation rules](#available-validation-rules)

---

##### Between

_aliases_: `between`

_usage_: `between:min,max`

The field under validation must have a size between the given `min` and `max`. `Strings`, `numerics`, `arrays` and `dates` are evaluated in the same fashion as the size rule.

[⬆ validation rules](#available-validation-rules)

---

##### Digits Between

_aliases_: `digits_between`, `digits-between`

_usage_: `digits_between:min,max`

The field under validation must be `numeric` and must have a length between the given `min` and `max`.

[⬆ validation rules](#available-validation-rules)

---

##### Divisible By

_aliases_: `divisible-by`

_usage_: `divisible-by:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `number` or `date object`.

Validates that a value is divisible by another value, defined in the options.

[⬆ validation rules](#available-validation-rules)

---

##### Unique

_aliases_: `unique`

Validates that all the elements of the given collection are `unique` (none of them is present more than once). Elements are compared strictly, so '`7`' and `7` are considered different elements (a string and an integer, respectively). It can be a `string` or `array`.

[⬆ validation rules](#available-validation-rules)

---

##### Digits

_aliases_: `digits`

_usage_: `digits:length`

_options_:
 * `length` - This option is required. It defines the exact count of digits.

The field under validation must be `numeric` and must have an exact `length` of value.

[⬆ validation rules](#available-validation-rules)

---

##### Distinct

_aliases_: `distinct`

When working with `arrays`, the field under validation must not have any duplicate values.

[⬆ validation rules](#available-validation-rules)

---

##### Size

_aliases_: `size`

_usage_: `size:value`

_options_:
 * `value` - This option is required. It defines the value to compare to.

The field under validation must have a size matching the given value. For `string` data, value corresponds to the number of characters. For `numeric` data, value corresponds to a given integer value. For an `array`, size corresponds to the count of the array.

[⬆ validation rules](#available-validation-rules)

---

##### After (Date)

_aliases_: `after`

_usage_: `after:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. The data type could be `string`, `number` or `date`.

The field under validation must be a value after a given date.

[⬆ validation rules](#available-validation-rules)

---

##### After Or Equal (Date)

_aliases_: `after_or_equal`, `after-or-equal`, `aoe`

_usage_: `after_or_equal:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. The data type could be `string`, `number` or `date`.

The field under validation must be a value after or equal to the given date.

[⬆ validation rules](#available-validation-rules)

---

##### Before (Date)

_aliases_: `before`

_usage_: `before:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. The data type could be `string`, `number` or `date`.

The field under validation must be a value before a given date.

[⬆ validation rules](#available-validation-rules)

---

##### Before Or Equal (Date)

_aliases_: `before_or_equal`, `before-or-equal`, `boe`

_usage_: `before_or_equal:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. The data type could be `string`, `number` or `date`.

The field under validation must be a value before or equal to the given date.

[⬆ validation rules](#available-validation-rules)

---

##### Date Equals

_aliases_: `date_equals`, `date-equals`, `aoe`

_usage_: `date_equals:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. The data type could be `string`, `number` or `date`.

The field under validation must be `equal` to the given `date`.

[⬆ validation rules](#available-validation-rules)

---

##### Positive

_aliases_: `positive`

Validates that a value is a `positive` number. Zero is neither positive nor negative, so you must use `Positive Or Zero` if you want to allow zero as value.

[⬆ validation rules](#available-validation-rules)

---

##### Positive Or Zero

_aliases_: `positive`

Validates that a value is a `positive` number or equal to `zero`.

[⬆ validation rules](#available-validation-rules)

---

##### Negative

_aliases_: `negative`

Validates that a value is a `negative` number. Zero is neither positive nor negative, so you must use `Negative Or Zero` if you want to allow zero as value.

[⬆ validation rules](#available-validation-rules)

---

##### Negative Or Zero

_aliases_: `negative-or-zero`, `noz`

Validates that a value is a `negative` number or equal to `zero`.

[⬆ validation rules](#available-validation-rules)

---

##### Date

_aliases_: `date`

Validates that a value is a valid `date`, meaning a string (or an object that can be cast into a string) that follows a valid `YYYY-MM-DD` format.

[⬆ validation rules](#available-validation-rules)

---

##### Date Time, Date Format

_aliases_: `date-time`, `date_format`, `date-format`

_usage_: `date_format:format`

_options_:
 * `format` - This option allows to validate a custom date format. Default: "`YYYY-MM-DD HH:mm:ss`"

Validates that a value is a valid `date`, meaning a string (or an object that can be cast into a string) that follows a valid `YYYY-MM-DD` format.

#### Year, month, and day tokens

_Tokens are case-sensitive._

Input | Example | Description
----- | ------- | -------------
`YYYY` | `2014` | 4 or 2 digit year
`YY` | `14` | 2 digit year
`Y` | `-25` | Year with any number of digits and sign
`Q` | `1..4` | Quarter of year. Sets month to first month in quarter.
`M MM` | `1..12` | Month number
`MMM MMMM` | `Jan..December` | Month name in locale that is specified
`D DD` | `1..31` | Day of month
`Do` | `1st..31st` | Day of month with ordinal
`DDD DDDD` | `1..365` | Day of year
`X` | `1410715640.579` | Unix timestamp
`x` | `1410715640579` | Unix ms timestamp

#### Week year, week, and weekday tokens

_Tokens are case-sensitive._

Input | Example | Description
----- | ------- | -------------
`gggg` | `2014` | Locale 4 digit week year
`gg` | `14` | Locale 2 digit week year
`w ww` | `1..53` | Locale week of year
`e` | `0..6` | Locale day of week
`ddd dddd` | `Mon...Sunday` | Day name in locale that is specified
`GGGG` | `2014` | ISO 4 digit week year
`GG` | `14` | ISO 2 digit week year
`W WW` | `1..53` | ISO week of year
`E` | `1..7` | ISO day of week

#### Locale aware formats

_Tokens are case-sensitive._

Input | Example | Description
----- | ------- | -------------
`L` | `04/09/1986` | Date (in local format)
`LL` | `September 4 1986` | Month name, day of month, year
`LLL` | `September 4 1986 8:30 PM` | Month name, day of month, year, time
`LLLL` | `Thursday, September 4 1986 8:30 PM` | Day of week, month name, day of month, year, time
`LT` | `08:30 PM` | Time (without seconds)
`LTS` | `08:30:00 PM` | Time (with seconds)

#### Hour, minute, second, millisecond, and offset tokens

_Tokens are case-sensitive._

Input | Example | Description
----- | ------- | -------------
`H HH` | `0..23` | Hours (24 hour time)
`h hh` | `1..12` | Hours (12 hour time used with `a A`.)
`k kk` | `1..24` | Hours (24 hour time from 1 to 24)
`a A` | `am pm` | Post or ante meridiem (Note the one character `a p` are also considered valid)
`m mm` | `0..59` | Minutes
`s ss` | `0..59` | Seconds
`S SS SSS` | `0..999` | Fractional seconds
`Z ZZ` | `+12:00` | Offset from UTC as `+-HH:mm`, `+-HHmm`, or `Z`

[⬆ validation rules](#available-validation-rules)

---

##### Time

_aliases_: `time`

Validates that a value is a valid `time`, meaning a string (or an object that can be cast into a string) that follows a valid `HH:mm:ss` format.

[⬆ validation rules](#available-validation-rules)

---

##### Timezone

_aliases_: `timezone`, `tz`

Validates that a value is a valid timezone identifier (e.g. `Europe/Paris`). [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

[⬆ validation rules](#available-validation-rules)

---

[npm-url]: https://npmjs.org/package/sog-validator
[npm-image]: http://img.shields.io/npm/v/sog-validator.svg

[travis-url]: https://travis-ci.org/slaveofgod/sog-validator
[travis-image]: http://img.shields.io/travis/slaveofgod/sog-validator.svg

[coveralls-url]: https://coveralls.io/r/slaveofgod/sog-validator
[coveralls-image]: http://img.shields.io/coveralls/slaveofgod/sog-validator/master.svg

[deepscan-url]: https://deepscan.io/dashboard#view=project&tid=7185&pid=9318&bid=119438
[deepscan-image]: https://deepscan.io/api/teams/7185/projects/9318/branches/119438/badge/grade.svg

[downloads-image]: http://img.shields.io/npm/dm/sog-validator.svg