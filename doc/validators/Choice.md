## Choice
This constraint is used to ensure that the given value is one of a given set of *valid* choices. It can also be used to validate that each item in an array of items is one of those valid choices.

**Basic Usage**
```javascript
import {
    // ...
    ChoiceValidator,
    AllValidator
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new ChoiceValidator({
                'choices': [1111, 'aaaaa', 3333, '123a'],
                'multiple': false,
                'message': 'Your error message',
                'strict': true
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: 'aaaaa'
};

let _oec = new AllValidator({data: data, validators: validators});
_oec.validate();
if(!_oec.isValid()) {
    let errors = _oec.getErrors();
}
```

**Multiple Usage**
```javascript
import {
    // ...
    ChoiceValidator,
    AllValidator
} from 'bob-validator';

let validators = {
    // ...
    fieldName: {
        isRequired: true,
        rules: [
            // ...
            new ChoiceValidator({
                'choices': [1111, 'aaaaa', 3333, '123a'],
                'multiple': true,
                'min': 1,
                'max': 10,
                'message': 'Your error message',
                'multipleMessage': 'Your multiple error message',
                'minMessage': 'Your min error message',
                'maxMessage': 'Your max error message',
                'strict': true
            })
        ]
    }
};

let data = {
    // ...
    fieldName: 'Some data ...' // Example: [1111, '123a']
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
##### choices
**type**: `array`

A required option ~~(unless callback is specified)~~ - this is the array of options that should be considered in the valid set. The input value will be matched against this array.

##### ~~callback~~ `(not implemented)`
~~**type**: `string|array|Closure`~~

~~This is a callback method that can be used instead of the choices option to return the choices array.~~

##### multiple
**type**: `boolean` **default**: `false`

If this option is true, the input value is expected to be an array instead of a single, scalar value. The constraint will check that each value of the input array can be found in the array of valid choices. If even one of the input values cannot be found, the validation will fail.

##### min
**type**: `integer`

If the `multiple` option is true, then you can use the `min` option to force at least XX number of values to be selected. For example, if `min` is 3, but the input array only contains 2 valid items, the validation will fail.

##### max
**type**: `integer`

If the `multiple` option is true, then you can use the `max` option to force no more than XX number of values to be selected. For example, if `max` is 3, but the input array contains 4 valid items, the validation will fail.

##### message
**type**: `string` **default**: `The value you selected is not a valid choice.`

This is the message that you will receive if the `multiple` option is set to `false` and the underlying value is not in the valid array of choices.

##### multipleMessage
**type**: `string` **default**: `One or more of the given values is invalid.`

This is the message that you will receive if the `multiple` option is set to `true` and one of the values on the underlying array being checked is not in the array of valid choices.

##### minMessage
**type**: `string` **default**: `You must select at least {{ limit }} choices.`

This is the validation error message that's displayed when the user chooses too few choices per the `min` option.

##### maxMessage
**type**: `string` **default**: `You must select at most {{ limit }} choices.`

This is the validation error message that's displayed when the user chooses too many options per the `max` option.

##### strict
**type**: `boolean` **default**: `false`

If true, the validator will also check the type of the input value.

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