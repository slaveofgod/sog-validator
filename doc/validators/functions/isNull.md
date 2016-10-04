# isNull
Validates that a value is exactly equal to `null`. To force that a property is simply blank (blank string or `null`), see the [isBlank][is-blank-url] constraint. To ensure that a property is not null, see [isNotNull][is-notnull-url].

Also see [isNotNull][is-notnull-url].

[**Homepage**][documentation-url]

### Navigation

* [Example](#example)
* [Documentation](#documentation)
* [Installation][installation-url]

---------------

#### Example

```javascript
var _v = require('bob-validator');

var data = null;

if(_v.func.isNull(data)){
    // Some code ...
}
```

[⬆ back to top](#navigation)

---------------

## Documentation

[⬆ back to top](#navigation)

[documentation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#documentation
[installation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#installation-and-using