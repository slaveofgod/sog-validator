# sog-validator

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![DeepScan grade][deepscan-image]][deepscan-url]

A library of validators

#####This library validates any data.#####

[Completed documentation is here!!!](https://github.com/slaveofgod/sog-validator/tree/master/docs)

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

##### Accepted

_aliases_: `accepted`

The field under validation must be `yes`, `on`, `1`, or `true`. This is useful for validating "Terms of Service" acceptance.

---

##### Not Blank

_aliases_: `not-blank`, `not-empty`, `filled`

Validates that a value is `not blank` - meaning not equal to a blank string, a blank array, false or null (null behavior is configurable). The field under validation must not be empty when it is present.

---

##### Blank

_aliases_: `blank`, `empty`

Validates that a value is blank - meaning equal to an `empty string` or `null`.

---

##### Not Null

_aliases_: `not-null`, `required`, `present`

Validates that a value is not strictly equal to `null`.

---

##### Is Null

_aliases_: `is-null`, `nullable`

Validates that a value is exactly equal to `null`.

---

##### Is True

_aliases_: `is-true`, `true`

Validates that a value is true. Specifically, this checks if the value is exactly `true`, exactly the integer `1`, or exactly the string "`1`".

---

##### Is False

_aliases_: `is-false`, `false`

Validates that a value is false. Specifically, this checks to see if the value is exactly false, exactly the integer 0, or exactly the string "0".

---

##### Alpha Dash

_aliases_: `alpha_dash`, `alpha-dash`

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

---

##### Array

_aliases_: `array`, `arr`

The field under validation must be an array.

---

##### Boolean

_aliases_: `boolean`, `bool`

The field under validation must be able to be cast as a boolean. Accepted input are true, false, 1, 0, "1", and "0".


---

##### Callable

_aliases_: `callable`

Verify that the contents of a variable can be called as a function.

---

##### Float

_aliases_: `float`

The field under validation must be a float.

---

##### Double

_aliases_: `double`

The field under validation must be a double.

---

##### Integer

_aliases_: `int`, `integer`

The field under validation must be an integer.

---

##### Iterable

_aliases_: `iterable`

Verify that the contents of a variable is an iterable value.

---

##### Null

_aliases_: `null`

The field under validation must be a NULL.

---

##### Numeric

_aliases_: `numeric`, `num`

The field under validation must be a number or a numeric string.

---

##### Object

_aliases_: `object`

The field under validation must be an object.

---

##### Real

_aliases_: `real`

Finds whether the type of a variable is real.

---

##### Scalar

_aliases_: `scalar`

Finds whether a variable is a scalar. Scalar variables are those containing an integer, float, string or boolean.

---
##### String

_aliases_: `string`, `str`

The field under validation must be a string.

---

##### Alnum

_aliases_: `alnum`, `alpha-num`, `alpha_num`

Check for alphanumeric character(s).

---

##### Alpha

_aliases_: `alpha`

Check for alphabetic character(s).

---

##### Cntrl

_aliases_: `cntrl`

Check for control character(s).

---

##### Digit

_aliases_: `digit`

Check for numeric character(s).

---

##### Graph

_aliases_: `graph`

Check for any printable character(s) except space.

---

##### Lower

_aliases_: `lower`

Check for lowercase character(s).

---

##### Print

_aliases_: `print`

Check for printable character(s).

---

##### Punct

_aliases_: `punct`

Check for any printable character which is not whitespace or an alphanumeric character.

---

##### Space

_aliases_: `space`

Check for whitespace character(s).

---

##### Upper

_aliases_: `upper`

Check for uppercase character(s).

---

##### Xdigit

_aliases_: `xdigit`

Check for character(s) representing a hexadecimal digit.

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