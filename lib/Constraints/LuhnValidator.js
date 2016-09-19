/**
 * This constraint is used to ensure that a credit card number passes the Luhn algorithm.
 * It is useful as a first step to validating a credit card: before communicating with a payment gateway
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

export default class extends Validator {
    constructor({
        message = null
    }) {
        super(arguments);

        this.configuring();

        this.setMessage('message', message);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'Invalid card number.'
        });
    }

    validate(data) {
        this.resetErrors();

        let message = this.getMessage('message');

        if (null === data || '' === data) {
            return ;
        }

        if (!this.ctype_digit(data)) {
            // INVALID_CHARACTERS_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        let checkSum = 0;
        let length = data.length;

        // Starting with the last digit and walking left, add every second
        // digit to the check sum
        // e.g. 7  9  9  2  7  3  9  8  7  1  3
        //      ^     ^     ^     ^     ^     ^
        //    = 7  +  9  +  7  +  9  +  7  +  3
        for (let i = length - 1; i >= 0; i -= 2) {
            checkSum += (data[i] * 1);
        }


        // Starting with the second last digit and walking left, double every
        // second digit and add it to the check sum
        // For doubles greater than 9, sum the individual digits
        // e.g. 7  9  9  2  7  3  9  8  7  1  3
        //         ^     ^     ^     ^     ^
        //    =    1+8 + 4  +  6  +  1+6 + 2
        for (let i = length - 2; i >= 0; i -= 2) {
            checkSum += this.array_sum(this.str_split(data[i] * 2));
        }

        if (0 === checkSum || 0 !== checkSum % 10) {
            // CHECKSUM_FAILED_ERROR
            this.addError(message.format({value: data}));
        }
    }
}
