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