## Callback

The purpose of the Callback constraint is to create completely custom validation rules and to assign any validation errors to specific fields on your object. This process works by specifying one or more callback methods, each of which will be called during the validation process. Each of those methods can do anything, including creating and assigning validation errors.

```javascript
import {
    // ...
    CallbackValidator,
    AllValidator
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
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
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 158
};

let _oec = new AllValidator({
    validators: validators,
    validationType: 'object',
    errorType: 'array'
});
_oec.validate(data);
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
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

[Go to documentation][documentation-url]


[documentation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#documentation
[notblank-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/NotBlank.md
[blank-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Blank.md
[notnull-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/NotNull.md
[isnull-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/IsNull.md
[istrue-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/IsTrue.md
[isfalse-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/IsFalse.md
[type-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Type.md
[email-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Email.md
[length-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Length.md
[url-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Url.md
[regex-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Regex.md
[ip-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Ip.md
[uuid-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Uuid.md
[range-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Range.md
[equalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/EqualTo.md
[notequalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/NotEqualTo.md
[identicalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/IdenticalTo.md
[notidenticalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/NotIdenticalTo.md
[lessthan-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/LessThan.md
[lessthanorequal-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/LessThanOrEqual.md
[greaterthan-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/GreaterThan.md
[greaterthanorequal-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/GreaterThanOrEqual.md
[date-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Date.md
[datetime-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/DateTime.md
[time-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Time.md
[choice-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Choice.md
[collection-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Collection.md
[count-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Count.md
[uniqueentity-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/UniqueEntity.md
[language-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Language.md
[locale-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Locale.md
[country-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Country.md
[file-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/File.md
[image-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Image.md
[bic-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Bic.md
[cardscheme-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/CardScheme.md
[currency-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Currency.md
[luhn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Luhn.md
[iban-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Iban.md
[isbn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Isbn.md
[issn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Issn.md
[callback-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Callback.md
[expression-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Expression.md
[all-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/All.md
[userpassword-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/UserPassword.md
[valid-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Valid.md
[custom-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/Custom.md