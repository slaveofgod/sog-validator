## NotIdenticalTo
Validates that a value is **not** identical to another value, defined in the options. To force that a value is identical, see [IdenticalTo][identicalto-url].

This constraint compares using `!==,` so `3` and "`3`" are considered not equal. Use [NotEqualTo][notequalto-url] to compare with `!=`.

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

[Go to documentation][documentation-url]