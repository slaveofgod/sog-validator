/**
 * This constraint is used to ensure that a credit card number passes the Luhn algorithm.
 * It is useful as a first step to validating a credit card: before communicating with a payment gateway
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class LuhnValidator extends Validator {
    constructor() {
        super(arguments);

        var message = arguments[0]['message'];

        this.configuring();

        this.setMessage('message', message);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'Invalid card number.'
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        var message = this.getMessage('message');

        if (null === data || '' === data) {
            return ;
        }

        if (!this.ctype_digit(data)) {
            // INVALID_CHARACTERS_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        var checkSum = 0;
        var length = data.length;

        // Starting with the last digit and walking left, add every second
        // digit to the check sum
        // e.g. 7  9  9  2  7  3  9  8  7  1  3
        //      ^     ^     ^     ^     ^     ^
        //    = 7  +  9  +  7  +  9  +  7  +  3
        for (var i = length - 1; i >= 0; i -= 2) {
            checkSum += (data[i] * 1);
        }


        // Starting with the second last digit and walking left, double every
        // second digit and add it to the check sum
        // For doubles greater than 9, sum the individual digits
        // e.g. 7  9  9  2  7  3  9  8  7  1  3
        //         ^     ^     ^     ^     ^
        //    =    1+8 + 4  +  6  +  1+6 + 2
        for (var i = length - 2; i >= 0; i -= 2) {
            checkSum += this.array_sum(this.str_split(data[i] * 2));
        }

        if (0 === checkSum || 0 !== checkSum % 10) {
            // CHECKSUM_FAILED_ERROR
            this.addError(message.format({value: data}));
        }
    }
}

module.exports = LuhnValidator;
