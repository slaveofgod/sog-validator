# isIdenticalTo
Validates that a value is identical to another value, defined in the options. To force that a value is *not* identical, see [isNotIdenticalTo][is-notidenticalto-url]. This constraint compares using `===`, so `3` and "`3`" are not considered equal. Use [isEqualTo][is-equalto-url] to compare with `==`.

[**Homepage**][homepage-url]

### Navigation

* [Installation and Using](#installation-and-using)
* [Options](#options)
* [Supported Constraints](#supported-constraints)

---------------

#### Installation and Using

Install the library with:
```sh
$ npm install bob-validator
```

##### Example

```javascript
var _v = require('bob-validator');

var data = 10;

if(_v.func.isIdenticalTo(data, {'value': 10})){
    // Some code ...
}
```

[⬆ back to top](#navigation)

---------------

#### Options
##### value
**type**: `mixed`

This option is required. It defines the value to compare to. It can be a string, number or object.

[⬆ back to top](#navigation)

---------------

## Supported Constraints

##### Basic Constraints

These are the basic constraints: use them to assert very basic things about the value of properties or the return value of methods on your object.

* **[isNotBlank][is-notblank-url](data)** - Validates that a value is not blank, defined as not strictly `false`, not equal to a blank string and also not equal to `null`. To force that a value is simply not equal to `null`, see the [isNotNull][is-notnull-url] constraint.
* **[isBlank][is-blank-url](data)** - Validates that a value is blank, defined as equal to a blank string or equal to `null`. To force that a value strictly be equal to `null`, see the [isNull][is-null-url] constraint. To force that a value is not blank, see [isNotBlank][is-notblank-url].
* **[isNotNull][is-notnull-url](data)** - Validates that a value is not strictly equal to `null`. To ensure that a value is simply not blank (not a blank string), see the [isNotBlank][is-notblank-url] constraint.
* **[isNull][is-null-url](data)** - Validates that a value is exactly equal to `null`. To force that a property is simply blank (blank string or `null`), see the [isBlank][is-blank-url] constraint. To ensure that a property is not null, see [isNotNull][is-notnull-url].
* **[isTrue][is-true-url](data)** - Validates that a value is `true`. Specifically, this checks to see if the value is exactly `true`, exactly the integer `1`, or exactly the string "`1`".
* **[isFalse][is-false-url](data)** - Validates that a value is `false`. Specifically, this checks to see if the value is exactly `false`, exactly the integer `0`, or exactly the string "`0`".
* **[isArray][is-array-url](data)** - Validates that a value is `array` data type.
* **[isBool][is-bool-url](data)** - Validates that a value is `boolean` data type.
* **[isFloat][is-float-url](data)** - Validates that a value is `float` data type.
* **[isDouble][is-double-url](data)** - Validates that a value is `double` data type.
* **[isInt][is-int-url](data)** - Validates that a value is `integer` data type.
* **[isNumeric][is-numeric-url](data)** - Validates that a value is `numeric` data type.
* **[isObject][is-object-url](data)** - Validates that a value is `object` data type.
* **[isScalar][is-scalar-url](data)** - Validates that a value is `scalar` data type.
* **[isString][is-string-url](data)** - Validates that a value is `string` data type.
* **[isCallable][is-callable-url](data)** - isCallable Validates that a value is `callable` data type. Verify that the contents of a variable can be called as a function.
* **[isLong][is-long-url](data)** - Validates that a value is `long` data type. Alias of [isInt][is-int-url].

##### String Constraints

* **[isEmail][is-email-url](data)** - Validates that a value is a valid email address. The underlying value is cast to a string before being validated.
* **[isLength][is-length-url](data, options)** - Validates that a given string length is between some minimum and maximum value. Required options: {'`min`': 1, '`max`': 100}.
* **[isUrl][is-url-url](data)** - Validates that a value is a valid URL string.
* **[isPregMatch][is-pregmatch-url](data)** - Validates that a value matches a regular expression. Required options: {'`pattern`': /^.+\@\S+\.\S+$/}.
* **[isIp][is-ip-url](data)** - Validates that a value is a valid IP address.
* **[isUuid][is-uuid-url](data, options)** - Validates that a value is a valid [Universally unique identifier (UUID)](https://en.wikipedia.org/wiki/Universally_unique_identifier) per [RFC 4122](https://tools.ietf.org/html/rfc4122). By default, this will validate the format according to the RFC's guidelines, but this can be relaxed to accept non-standard UUIDs that other systems (like PostgreSQL) accept. UUID versions can also be restricted using a whitelist. Optional options: {'`versions`': [1,2,3,4,5], '`strict`': false}.

##### Number Constraints

* **[isRange][is-range-url](data)** - Validates that a given number is *between* some minimum and maximum number or date. Required options: {'`min`': 1, '`max`': 100} or {'`min`': new Date(2015, 0, 1, 0, 0, 0, 0), '`max`': new Date(2017, 0, 1, 0, 0, 0, 0)}.

##### Comparison Constraints

* **[isEqualTo][is-equalto-url](data, options)** - Validates that a value is equal to another value, defined in the options. To force that a value is *not* equal, see [isNotEqualTo][is-notequalto-url]. This constraint compares using `==`, so `3` and "`3`" are considered equal. Use [isIdenticalTo][is-identicalto-url] to compare with `===`. Required options: {'`value`': 100}.
* **[isNotEqualTo][is-notequalto-url](data, options)** - Validates that a value is not equal to another value, defined in the options. To force that a value is equal, see [isEqualTo][is-equalto-url]. This constraint compares using `!=`, so `3` and "`3`" are considered equal. Use [isNotIdenticalTo][is-notidenticalto-url] to compare with `!==`. Required options: {'`value`': 100}.
* **[isIdenticalTo][is-identicalto-url](data, options)** - Validates that a value is identical to another value, defined in the options. To force that a value is *not* identical, see [isNotIdenticalTo][is-notidenticalto-url]. This constraint compares using `===`, so `3` and "`3`" are not considered equal. Use [isEqualTo][is-equalto-url] to compare with `==`. Required options: {'`value`': 100}.
* **[isNotIdenticalTo][is-notidenticalto-url](data, options)** - Validates that a value is **not** identical to another value, defined in the options. To force that a value is identical, see [isIdenticalTo][is-identicalto-url]. This constraint compares using `!==,` so `3` and "`3`" are considered not equal. Use [isNotEqualTo][is-notequalto-url] to compare with `!=`. Required options: {'`value`': 100}.
* **[isLessThan][is-lessthan-url](data, options)** - Validates that a value is less than another value, defined in the options. To force that a value is less than or equal to another value, see [isLessThanOrEqual][is-lessthanorequal-url]. To force a value is greater than another value, see [isGreaterThan][is-greaterthan-url]. Required options: {'`value`': 100}.
* **[isLessThanOrEqual][is-lessthanorequal-url](data, options)** - Validates that a value is less than or equal to another value, defined in the options. To force that a value is less than another value, see [isLessThan][is-lessthan-url]. Required options: {'`value`': 100}.
* **[isGreaterThan][is-greaterthan-url](data, options)** - Validates that a value is greater than another value, defined in the options. To force that a value is greater than or equal to another value, see [isGreaterThanOrEqual][is-greaterthanorequal-url]. To force a value is less than another value, see [isLessThan][is-lessthan-url]. Required options: {'`value`': 100}.
* **[isGreaterThanOrEqual][is-greaterthanorequal-url](data, options)** - Validates that a value is greater than or equal to another value, defined in the options. To force that a value is greater than another value, see [isGreaterThan][is-greaterthan-url]. Required options: {'`value`': 100}.

##### Date Constraints

* **[isDateFormat][is-dateformat-url](data, options)** - Validates that a value is a valid date. Required options: {'`format`': 'YYYY-MM-DD'}.
* **[isDateTimeFormat][is-datetimeformat-url](data, options)** - Validates that a value is a valid datetime. Required options: {'`format`': 'YYYY-MM-DD HH:mm:ss'}.
* **[isTimeFormat][is-timeformat-url](data, options)**- Validates that a value is a valid time. Required options: {'`format`': 'HH:mm:ss'}.

##### Collection Constraints

* **[isIn][is-in-url](data, options)** - This constraint is used to ensure that the given value is one of a given set of *valid* choices. Required options: {'`choices`': [1111, 'aaaaa', 3333, '123a'], '`strict`': false}.
* **[isInMultiple][is-inmultiple-url](data, options)** - This constraint is used to ensure that the given value is one of a given set of *valid* choices. It can also be used to validate that each item in an array of items is one of those valid choices. Required options: {'`choices`': [1111, 'aaaaa', 3333, '123a'], '`strict`': false, '`min`': 1, '`max`': 10,}.
* **[isCount][is-count-url](data, options)** - Validates that a given collection's (i.e. an array) element count is *between* some minimum and maximum value. Required options: {'`min`': 1, '`max`': 10}.
* **[isUniqueEntity][is-uniqueentity-url](data, options)** - Validates that a particular field (or fields) in entity is (are) unique. This is commonly used, for example, to prevent a new user to register using an email address that already exists in the system. Required options: {'`fields`': ['first_name', 'email'], 'repositoryData':[{"id":1,"first_name":"Diana","last_name":"Simmons","email":"dsimmons0@google.com"}, {"id":2,"first_name":"Earl","last_name":"Hunt","email":"ehunt1@wp.com"}]}.
* **[isLanguage][is-language-url](data)** - Validates that a value is a valid language *Unicode language identifier* (e.g. `fr` or `zh-Hant`).
* **[isLocale][is-locale-url](data)** - Validates that a value is a valid locale. The "value" for each locale is either the two letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) *language* code (e.g. `fr`), or the language code followed by an underscore (`_`), then the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) *country* code (e.g. `fr_FR` for French/France).
* **[isCountry][is-country-url](data)** - Validates that a value is a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) country code.

##### Financial and other Number Constraints

* **[isBic][is-bic-url](data)** - This constraint is used to ensure that a value has the proper format of a [Business Identifier Code (BIC)](https://en.wikipedia.org/wiki/ISO_9362). BIC is an internationally agreed means to uniquely identify both financial and non-financial institutions.
* **[isCardScheme][is-cardscheme-url](data, options)** - This constraint ensures that a credit card number is valid for a given credit card company. It can be used to validate the number before trying to initiate a payment through a payment gateway. Required options: {'`schemes`': ['AMEX', 'CHINA_UNIONPAY', 'DINERS', 'DISCOVER', 'INSTAPAYMENT', 'JCB', 'LASER', 'MAESTRO', 'MASTERCARD', 'VISA']}.
* **[isCurrency][is-currency-url](data)** - Validates that a value is a valid [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency name.
* **[isLuhn][is-luhn-url](data)** - This constraint is used to ensure that a credit card number passes the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm). It is useful as a first step to validating a credit card: before communicating with a payment gateway.
* **[isIban][is-iban-url](data)** - This constraint is used to ensure that a bank account number has the proper format of an [International Bank Account Number (IBAN)](https://en.wikipedia.org/wiki/International_Bank_Account_Number). IBAN is an internationally agreed means of identifying bank accounts across national borders with a reduced risk of propagating transcription errors.
* **[isIsbn][is-isbn-url](data, options)** - This constraint validates that an [International Standard Book Number (ISBN)](https://en.wikipedia.org/wiki/International_Standard_Book_Number) is either a valid ISBN-10 or a valid ISBN-13. Optional options: {'`type`': 'isbn10'}.
* **[isIssn][is-issn-url](data, options)** - Validates that a value is a valid [International Standard Serial Number (ISSN)](https://en.wikipedia.org/wiki/International_Standard_Serial_Number). Optional options: {'`caseSensitive`': false, '`requireHyphen`': false}.


[⬆ back to top](#navigation)

[documentation-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md#documentation
[homepage-url]: https://github.com/alexeybob/bob-validator/blob/master/README.md
[is-notblank-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isNotBlank.md
[is-blank-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isBlank.md
[is-notnull-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isNotNull.md
[is-null-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isNull.md
[is-true-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isTrue.md
[is-false-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isFalse.md
[is-array-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isArray.md
[is-bool-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isBool.md
[is-float-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isFloat.md
[is-double-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isDouble.md
[is-int-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isInt.md
[is-numeric-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isNumeric.md
[is-object-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isObject.md
[is-scalar-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isScalar.md
[is-string-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isString.md
[is-callable-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isCallable.md
[is-long-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isLong.md
[is-email-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isEmail.md
[is-length-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isLength.md
[is-url-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isUrl.md
[is-pregmatch-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isPregMatch.md
[is-ip-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isIp.md
[is-uuid-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isUuid.md
[is-range-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isRange.md
[is-equalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isEqualTo.md
[is-notequalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isNotEqualTo.md
[is-identicalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isIdenticalTo.md
[is-notidenticalto-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isNotIdenticalTo.md
[is-lessthan-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isLessThan.md
[is-lessthanorequal-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isLessThanOrEqual.md
[is-greaterthan-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isGreaterThan.md
[is-greaterthanorequal-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isGreaterThanOrEqual.md
[is-dateformat-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isDateFormat.md
[is-datetimeformat-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isDateTimeFormat.md
[is-timeformat-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isTimeFormat.md
[is-in-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isIn.md
[is-inmultiple-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isInMultiple.md
[is-count-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isCount.md
[is-uniqueentity-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isUniqueEntity.md
[is-language-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isLanguage.md
[is-locale-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isLocale.md
[is-country-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isCountry.md
[is-bic-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isBic.md
[is-cardscheme-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isCardScheme.md
[is-currency-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isCurrency.md
[is-luhn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isLuhn.md
[is-iban-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isIban.md
[is-isbn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isIsbn.md
[is-issn-url]: https://github.com/alexeybob/bob-validator/blob/master/doc/validators/functions/isIssn.md