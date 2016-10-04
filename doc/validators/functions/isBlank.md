# isBlank
Validates that a value is blank, defined as equal to a blank string or equal to `null`. To force that a value strictly be equal to `null`, see the [isNull][is-null-url] constraint. To force that a value is not blank, see [isNotBlank][is-notblank-url].

[**Homepage**][documentation-url]

### Navigation

* [Example](#example)
* [Documentation](#documentation)
* [Installation][installation-url]

---------------

#### Example

```javascript
var _v = require('bob-validator');

var data = '';

if(_v.func.isBlank(data)){
    // Some code ...
}
```

[⬆ back to top](#navigation)

---------------

## Documentation

[⬆ back to top](#navigation)

[documentation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#documentation
[installation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#installation-and-using