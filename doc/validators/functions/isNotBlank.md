# isNotBlank
Validates that a value is not blank, defined as not strictly `false`, not equal to a blank string and also not equal to `null`. To force that a value is simply not equal to `null`, see the [isNotNull][is-notnull-url] constraint.

[**Homepage**][documentation-url]

### Navigation

* [Example](#example)
* [Documentation](#documentation)
* [Installation][installation-url]

---------------

#### Example

```javascript
var _v = require('bob-validator');

var data = 'Some data ...';

if(_v.func.isNotBlank('email@domain.com')){
    // Some code ...
}
```

[⬆ back to top](#navigation)

---------------

## Documentation

[⬆ back to top](#navigation)

[documentation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#documentation
[installation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#installation-and-using