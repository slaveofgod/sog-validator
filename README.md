# sog-validator

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![DeepScan grade][deepscan-image]][deepscan-url]

A library of validators

**This library validates any data.**

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
  first_name: 'required|string|length:{"min":2,"max":255}',
  last_lame: 'required|string|length:{"min":2,"max":255}',
  email: 'required|email',
  birthday: 'required|date',
  creditCard: 'required|string|card-scheme:{"schemes":["VISA"]}',
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
  first_name: 'required|string|length:{"min":2,"max":255}',
  last_lame: 'required|string|length:{"min":2,"max":255}',
  email: 'required|email',
  birthday: 'required|date',
  creditCard: 'required|string|card-scheme:{"schemes":["VISA"]}',
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

### Available Validation Rules
In progress ...


[npm-url]: https://npmjs.org/package/sog-validator
[npm-image]: http://img.shields.io/npm/v/sog-validator.svg

[travis-url]: https://travis-ci.org/slaveofgod/sog-validator
[travis-image]: http://img.shields.io/travis/slaveofgod/sog-validator.svg

[coveralls-url]: https://coveralls.io/r/slaveofgod/sog-validator
[coveralls-image]: http://img.shields.io/coveralls/slaveofgod/sog-validator/master.svg

[deepscan-url]: https://deepscan.io/dashboard#view=project&tid=7185&pid=9318&bid=119438
[deepscan-image]: https://deepscan.io/api/teams/7185/projects/9318/branches/119438/badge/grade.svg

[downloads-image]: http://img.shields.io/npm/dm/sog-validator.svg