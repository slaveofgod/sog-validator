# sog-validator

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![DeepScan grade][deepscan-image]][deepscan-url]

Data validation engine.

##### This is the powerest library which provides the best way to validate any type of data.

## Navigation

 * [Installation and Usage](#installation-and-usage)
 * [Available Validation Rules](#available-validation-rules)
   * [Basic Constraints](#basic-constraints)
   * [String Constraints](#string-constraints)
   * [Comparison Constraints](#comparison-constraints)
   * [Number Constraints](#number-constraints)
   * [Date Constraints](#date-constraints)
   * [Choice Constraints](#choice-constraints)
   * [File Constraints](#file-constraints)
   * [Financial and other Number Constraints](#financial-and-other-number-constraints)
   * [Other Constraints](#other-constraints)

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
 
#### Choice Constraints

 * [Choice](#choice)
 * [Not In](#not-in)
 * [In](#in)
 * [Language](#language)
 * [Locale](#locale)
 * [Country](#country)
 
#### File Constraints

 * [File](#file)
 * [Image](#image)

#### Financial and other Number Constraints

 * [Bic](#bic)
 * [Card Scheme](#card-scheme)
 * [Currency](#currency)
 * [Luhn](#luhn)
 * [Iban](#iban)
 * [Isbn](#isbn)
 * [Issn](#issn)

#### Other Constraints

 * [Count](#count)

---

##### Accepted

_aliases_: `accepted`

The field under validation must be `yes`, `on`, `1`, or `true`. This is useful for validating "Terms of Service" acceptance.

[⬆ navigation](#navigation)

---

##### Not Blank

_aliases_: `not-blank`, `not-empty`, `filled`

Validates that a value is `not blank` - meaning not equal to a blank string, a blank array, false or null (null behavior is configurable). The field under validation must not be empty when it is present.

[⬆ navigation](#navigation)

---

##### Blank

_aliases_: `blank`, `empty`

Validates that a value is blank - meaning equal to an `empty string` or `null`.

[⬆ navigation](#navigation)

---

##### Not Null

_aliases_: `not-null`, `required`, `present`

Validates that a value is not strictly equal to `null`.

[⬆ navigation](#navigation)

---

##### Is Null

_aliases_: `is-null`, `nullable`

Validates that a value is exactly equal to `null`.

[⬆ navigation](#navigation)

---

##### Is True

_aliases_: `is-true`, `true`

Validates that a value is true. Specifically, this checks if the value is exactly `true`, exactly the integer `1`, or exactly the string "`1`".

[⬆ navigation](#navigation)

---

##### Is False

_aliases_: `is-false`, `false`

Validates that a value is false. Specifically, this checks to see if the value is exactly false, exactly the integer 0, or exactly the string "0".

[⬆ navigation](#navigation)

---

##### Alpha Dash

_aliases_: `alpha_dash`, `alpha-dash`

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

[⬆ navigation](#navigation)

---

##### Array

_aliases_: `array`, `arr`

The field under validation must be an array.

[⬆ navigation](#navigation)

---

##### Boolean

_aliases_: `boolean`, `bool`

The field under validation must be able to be cast as a boolean. Accepted input are true, false, 1, 0, "1", and "0".

[⬆ navigation](#navigation)

---

##### Callable

_aliases_: `callable`

Verify that the contents of a variable can be called as a function.

[⬆ navigation](#navigation)

---

##### Float

_aliases_: `float`

The field under validation must be a float.

[⬆ navigation](#navigation)

---

##### Double

_aliases_: `double`

The field under validation must be a double.

[⬆ navigation](#navigation)

---

##### Integer

_aliases_: `int`, `integer`

The field under validation must be an integer.

[⬆ navigation](#navigation)

---

##### Iterable

_aliases_: `iterable`

Verify that the contents of a variable is an iterable value.

[⬆ navigation](#navigation)

---

##### Null

_aliases_: `null`

The field under validation must be a NULL.

[⬆ navigation](#navigation)

---

##### Numeric

_aliases_: `numeric`, `num`

The field under validation must be a number or a numeric string.

[⬆ navigation](#navigation)

---

##### Object

_aliases_: `object`

The field under validation must be an object.

[⬆ navigation](#navigation)

---

##### Real

_aliases_: `real`

Finds whether the type of a variable is real.

[⬆ navigation](#navigation)

---

##### Scalar

_aliases_: `scalar`

Finds whether a variable is a scalar. Scalar variables are those containing an integer, float, string or boolean.

[⬆ navigation](#navigation)

---
##### String

_aliases_: `string`, `str`

The field under validation must be a string.

[⬆ navigation](#navigation)

---

##### Alnum

_aliases_: `alnum`, `alpha-num`, `alpha_num`

Check for alphanumeric character(s).

[⬆ navigation](#navigation)

---

##### Alpha

_aliases_: `alpha`

Check for alphabetic character(s).

[⬆ navigation](#navigation)

---

##### Cntrl

_aliases_: `cntrl`

Check for control character(s).

[⬆ navigation](#navigation)

---

##### Digit

_aliases_: `digit`

Check for numeric character(s).

[⬆ navigation](#navigation)

---

##### Graph

_aliases_: `graph`

Check for any printable character(s) except space.

[⬆ navigation](#navigation)

---

##### Lower

_aliases_: `lower`

Check for lowercase character(s).

[⬆ navigation](#navigation)

---

##### Print

_aliases_: `print`

Check for printable character(s).

[⬆ navigation](#navigation)

---

##### Punct

_aliases_: `punct`

Check for any printable character which is not whitespace or an alphanumeric character.

[⬆ navigation](#navigation)

---

##### Space

_aliases_: `space`

Check for whitespace character(s).

[⬆ navigation](#navigation)

---

##### Upper

_aliases_: `upper`

Check for uppercase character(s).

[⬆ navigation](#navigation)

---

##### Xdigit

_aliases_: `xdigit`

Check for character(s) representing a hexadecimal digit.

[⬆ navigation](#navigation)

---

##### Email

_aliases_: `email`

_usage_: `email:mode`

_available modes_:
 * `loose` - A simple regular expression. Allows all values with an "`@`" symbol in, and a "`.`" in the second host part of the email address.
 * `html5` - This matches the pattern used for the `HTML5` email input element.

Validates that a value is a valid email address.

[⬆ navigation](#navigation)

---

##### Length

_aliases_: `length`, `len`

_usage_: `length:min,max`

Validates that a given string length is between some `minimum` and `maximum` value.

[⬆ navigation](#navigation)

---

##### Url

_aliases_: `url`

Validates that a value is a valid URL string.

[⬆ navigation](#navigation)

---

##### Regular Expression

_aliases_: `regex`

_usage_: `regex:pattern,match`

_options_:
 * `pattern` - This required option is the regular expression pattern that the input will be matched against.
 * `match` - If `true` (or not set), this validator will pass if the given string matches the given pattern regular expression. However, when this option is set to `false`, the opposite will occur: validation will pass only if the given string does not match the pattern regular expression. Default: `true`.

Validates that a value matches a regular expression.

[⬆ navigation](#navigation)

---

##### Ip

_aliases_: `ip`

Validates that a value is a valid IP address.

[⬆ navigation](#navigation)

---

##### IPv4

_aliases_: `ipv4`

The field under validation must be an `IPv4` address.

[⬆ navigation](#navigation)

---

##### IPv6

_aliases_: `ipv6`

The field under validation must be an `IPv6` address.

[⬆ navigation](#navigation)

---

##### Json

_aliases_: `json`

Validates that a value has valid `JSON` syntax.

[⬆ navigation](#navigation)

---

##### Uuid

_aliases_: `uuid`

_usage_: `uuid:versions`

_options_:
 * `versions` - This is optional parameter. This option can be used to only allow specific UUID versions. Valid versions are 1 - 5. Default: [1, 2, 3, 4, 5].

The field under validation must be a valid RFC 4122 (version 1, 3, 4, or 5) universally unique identifier (UUID).

[⬆ navigation](#navigation)

---

##### Ends With

_aliases_: `ends_with`, `ends-with`, `ends`

_usage_: `ends-with:foo;bar;...`

_options_:
 * `ends` - The option is required. The list of ends. One of the "`end`" needs to be the end of the passed value.

The field under validation must end with one of the given values.

[⬆ navigation](#navigation)

---

##### Starts With

_aliases_: `starts_with`, `starts-with`, `starts`

_usage_: `starts_with:foo;bar;...`

_options_:
 * `starts` - The option is required. The list of starts. One of the "`start`" needs to be the end of the passed value.

The field under validation must start with one of the given values.

[⬆ navigation](#navigation)

---

##### Equal To

_aliases_: `equal-to`, `equal`, `same`, `et`

_usage_: `equal-to:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `object`.

Validates that a value is equal to another value, defined in the options. This constraint compares using `==`, so `3` and "`3`" are considered equal. 

[⬆ navigation](#navigation)

---

##### Not Equal To

_aliases_: `not-equal-to`, `not-equal`, `net`

_usage_: `not-equal-to:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `object`.

Validates that a value is not equal to another value, defined in the options. This constraint compares using `!=`, so `3` and "`3`" are considered equal.

[⬆ navigation](#navigation)

---

##### Identical To

_aliases_: `identical-to`, `identical`, `it`

_usage_: `identical-to:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `object`.

Validates that a value is identical to another value, defined in the options. This constraint compares using `===`, so `3` and "`3`" are not considered equal.

[⬆ navigation](#navigation)

---

##### Not Identical To

_aliases_: `not-identical-to`, `not-identical`, `nit`

_usage_: `not-identical-to:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `object`.

Validates that a value is not identical to another value, defined in the options. This constraint compares using `!==`, so `3` and "`3`" are considered not equal.

[⬆ navigation](#navigation)

---

##### Less Than

_aliases_: `less_than`, `less-than`, `less`

_usage_: `less_than:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `date object`.

Validates that a value is less than another value, defined in the options.

[⬆ navigation](#navigation)

---

##### Less Than Or Equal

_aliases_: `less_than_or_equal`, `less-than-or-equal`, `max`

_usage_: `less_than_or_equal:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `date object`.

Validates that a value is less than or equal to another value, defined in the options.

[⬆ navigation](#navigation)

---

##### Greater Than

_aliases_: `greater_than`, `greater-than`, `greater`

_usage_: `greater_than:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `date object`.

Validates that a value is greater than another value, defined in the options.

[⬆ navigation](#navigation)

---

##### Greater Than Or Equal

_aliases_: `greater_than_or_equal`, `greater-than-or-equal`, `min`

_usage_: `greater_than_or_equal:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `string`, `number` or `date object`.

Validates that a value is greater than or equal to another value, defined in the options.

[⬆ navigation](#navigation)

---

##### Range

_aliases_: `range`

_usage_: `range:min,max`

Validates that a given number or Date object is between some `minimum` and `maximum`.

[⬆ navigation](#navigation)

---

##### Between

_aliases_: `between`

_usage_: `between:min,max`

The field under validation must have a size between the given `min` and `max`. `Strings`, `numerics`, `arrays` and `dates` are evaluated in the same fashion as the size rule.

[⬆ navigation](#navigation)

---

##### Digits Between

_aliases_: `digits_between`, `digits-between`

_usage_: `digits_between:min,max`

The field under validation must be `numeric` and must have a length between the given `min` and `max`.

[⬆ navigation](#navigation)

---

##### Divisible By

_aliases_: `divisible-by`

_usage_: `divisible-by:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. It can be a `number` or `date object`.

Validates that a value is divisible by another value, defined in the options.

[⬆ navigation](#navigation)

---

##### Unique

_aliases_: `unique`

Validates that all the elements of the given collection are `unique` (none of them is present more than once). Elements are compared strictly, so '`7`' and `7` are considered different elements (a string and an integer, respectively). It can be a `string` or `array`.

[⬆ navigation](#navigation)

---

##### Digits

_aliases_: `digits`

_usage_: `digits:length`

_options_:
 * `length` - This option is required. It defines the exact count of digits.

The field under validation must be `numeric` and must have an exact `length` of value.

[⬆ navigation](#navigation)

---

##### Distinct

_aliases_: `distinct`

When working with `arrays`, the field under validation must not have any duplicate values.

[⬆ navigation](#navigation)

---

##### Size

_aliases_: `size`

_usage_: `size:value`

_options_:
 * `value` - This option is required. It defines the value to compare to.

The field under validation must have a size matching the given value. For `string` data, value corresponds to the number of characters. For `numeric` data, value corresponds to a given integer value. For an `array`, size corresponds to the count of the array.

[⬆ navigation](#navigation)

---

##### After (Date)

_aliases_: `after`

_usage_: `after:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. The data type could be `string`, `number` or `date`.

The field under validation must be a value after a given date.

[⬆ navigation](#navigation)

---

##### After Or Equal (Date)

_aliases_: `after_or_equal`, `after-or-equal`, `aoe`

_usage_: `after_or_equal:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. The data type could be `string`, `number` or `date`.

The field under validation must be a value after or equal to the given date.

[⬆ navigation](#navigation)

---

##### Before (Date)

_aliases_: `before`

_usage_: `before:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. The data type could be `string`, `number` or `date`.

The field under validation must be a value before a given date.

[⬆ navigation](#navigation)

---

##### Before Or Equal (Date)

_aliases_: `before_or_equal`, `before-or-equal`, `boe`

_usage_: `before_or_equal:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. The data type could be `string`, `number` or `date`.

The field under validation must be a value before or equal to the given date.

[⬆ navigation](#navigation)

---

##### Date Equals

_aliases_: `date_equals`, `date-equals`, `aoe`

_usage_: `date_equals:value`

_options_:
 * `value` - This option is required. It defines the value to compare to. The data type could be `string`, `number` or `date`.

The field under validation must be `equal` to the given `date`.

[⬆ navigation](#navigation)

---

##### Positive

_aliases_: `positive`

Validates that a value is a `positive` number. Zero is neither positive nor negative, so you must use `Positive Or Zero` if you want to allow zero as value.

[⬆ navigation](#navigation)

---

##### Positive Or Zero

_aliases_: `positive`

Validates that a value is a `positive` number or equal to `zero`.

[⬆ navigation](#navigation)

---

##### Negative

_aliases_: `negative`

Validates that a value is a `negative` number. Zero is neither positive nor negative, so you must use `Negative Or Zero` if you want to allow zero as value.

[⬆ navigation](#navigation)

---

##### Negative Or Zero

_aliases_: `negative-or-zero`, `noz`

Validates that a value is a `negative` number or equal to `zero`.

[⬆ navigation](#navigation)

---

##### Date

_aliases_: `date`

Validates that a value is a valid `date`, meaning a string (or an object that can be cast into a string) that follows a valid `YYYY-MM-DD` format.

[⬆ navigation](#navigation)

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

[⬆ navigation](#navigation)

---

##### Time

_aliases_: `time`

Validates that a value is a valid `time`, meaning a string (or an object that can be cast into a string) that follows a valid `HH:mm:ss` format.

[⬆ navigation](#navigation)

---

##### Timezone

_aliases_: `timezone`, `tz`

Validates that a value is a valid timezone identifier (e.g. `Europe/Paris`). [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

[⬆ navigation](#navigation)

---

##### Choice

_aliases_: `choice`

_usage_: `choice:foo;bar;...,min,max,multiple`

_options_:
 * `choices` - A required option (unless callback is specified) - this is the array of options that should be considered in the valid set. The input value will be matched against this array.
 * `min` - If the multiple option is true, then you can use the min option to force at least XX number of values to be selected. For example, if min is 3, but the input array only contains 2 valid items, the validation will fail.
 * `max` - If the multiple option is true, then you can use the max option to force no more than XX number of values to be selected. For example, if max is 3, but the input array contains 4 valid items, the validation will fail.
 * `multiple` - If this option is true, the input value is expected to be an array instead of a single, scalar value. The constraint will check that each value of the input array can be found in the array of valid choices. If even one of the input values cannot be found, the validation will fail. Default: false.

This constraint is used to ensure that the given value is one of a given set of valid choices. It can also be used to validate that each item in an array of items is one of those valid choices.

[⬆ navigation](#navigation)

---

##### Not In

_aliases_: `not_in`, `not-in`

_usage_: `not_in:foo;bar;...`

_options_:
 * `choices` - A required option - this is the array of options that should be considered in the valid set. The input value will be matched against this array.

The field under validation must not be included in the given list of values.

[⬆ navigation](#navigation)

---

##### In

_aliases_: `in`

_usage_: `in:foo;bar;...`

_options_:
 * `choices` - A required option - The field under validation must be included in the given list of values. The input value will be matched against this array.

The field under validation must be included in the given list of values.

[⬆ navigation](#navigation)

---

##### Language

_aliases_: `language`, `lang`

Validates that a value is a valid language Unicode language identifier (e.g. `fr` or `ar-dz`).

[⬆ navigation](#navigation)

---

##### Locale

_aliases_: `locale`

Validates that a value is a valid locale. The "`value`" for each locale is any of the [ICU format locale IDs](http://userguide.icu-project.org/locale). For example, the two letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code (e.g. `fr`), or the language code followed by an underscore (`_`) and the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) country code (e.g. fr_FR for French/France). The given locale values are canonicalized before validating them to avoid issues with wrong uppercase/lowercase values and to remove unneeded elements (e.g. `FR-fr.utf8` will be validated as `fr_FR`).

[⬆ navigation](#navigation)

---

##### Country

_aliases_: `country`

Validates that a value is a valid [3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes/ISO) `country code`.

[⬆ navigation](#navigation)

---

##### File

_aliases_: `file`

Under development ...

[⬆ navigation](#navigation)

---

##### Image

_aliases_: `image`

Under development ...

[⬆ navigation](#navigation)

---

##### Bic

_aliases_: `bic`

_usage_: `bic:iban`

_options_:
 * `iban` - An IBAN value to validate that the BIC is associated with it. Default: null.

This constraint is used to ensure that a value has the proper format of a [Business Identifier Code (BIC)](https://en.wikipedia.org/wiki/Business_Identifier_Code). `BIC` is an internationally agreed means to uniquely identify both financial and non-financial institutions. You may also check that the `BIC` is associated with a given `IBAN`.

[⬆ navigation](#navigation)

---

##### Card Scheme

_aliases_: `card-scheme`, `cs`

_usage_: `card-scheme:schemes`

_options_:
 * `schemes` - This option is required and represents the name of the number scheme used to validate the credit card number, it can either be a string or an array. Valid values are: `AMEX`, `CHINA_UNIONPAY`, `DINERS`, `DISCOVER`, `INSTAPAYMENT`, `JCB`, `LASER`, `MAESTRO`, `MASTERCARD`, `MIR`, `UATP`, `VISA`

This constraint ensures that a credit card number is valid for a given credit card company. It can be used to validate the number before trying to initiate a payment through a payment gateway.

[⬆ navigation](#navigation)

---

##### Currency

_aliases_: `currency`

Validates that a value is a valid [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) `currency` name.

[⬆ navigation](#navigation)

---

##### Luhn

_aliases_: `luhn`

This constraint is used to ensure that a `credit card` number passes the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm). It is useful as a first step to validating a credit card: before communicating with a payment gateway.

[⬆ navigation](#navigation)

---

##### Iban

_aliases_: `iban`

This constraint is used to ensure that a bank account number has the proper format of an [International Bank Account Number (IBAN)](https://en.wikipedia.org/wiki/International_Bank_Account_Number). `IBAN` is an internationally agreed means of identifying bank accounts across national borders with a reduced risk of propagating transcription errors.

[⬆ navigation](#navigation)

---

##### Isbn

_aliases_: `isbn`

This constraint validates that an [International Standard Book Number (ISBN)](https://en.wikipedia.org/wiki/Isbn) is either a valid `ISBN-10` or a valid `ISBN-13`.

[⬆ navigation](#navigation)

---

##### Issn

_aliases_: `issn`

_usage_: `issn:caseSensitive,requireHyphen`

_options_:
 * `caseSensitive` - This is optional parameter. The validator will allow `ISSN` values to end with a lower case '`x`' by default. When switching this to `true`, the validator requires an upper case '`X`'. Default: `false`.

 * `requireHyphen` - This is optional parameter. The validator will allow non hyphenated `ISSN` values by default. When switching this to `true`, the validator requires a hyphenated `ISSN` value. Default: `false`.

Validates that a value is a valid [International Standard Serial Number (ISSN)](https://en.wikipedia.org/wiki/Issn).

[⬆ navigation](#navigation)

---

##### Count

_aliases_: `count`

_usage_: `count:min,max`

_options_:
 * `min` - This option is the "`min`" count value. Validation will fail if the given collection elements count is less than this min value. This option is required when the max option is not defined.
 * `max` - This option is the "`max`" count value. Validation will fail if the given collection elements count is greater than this max value. This option is required when the min option is not defined.

Validates that a given collection's (i.e. an array or an object that implements Countable) element `count` is `between` some `minimum` and `maximum` value.

[⬆ navigation](#navigation)

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