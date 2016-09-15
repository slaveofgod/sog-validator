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

    ctype_digit(number) {
        return /^[0-9]+$/.test(number);
    }

    /**
     *  Convert a string to an array
     *  @param  {string}    str             The input string.
     *  @param  {integer}   split_length    Maximum length of the chunk.
     *  @return {array}
     */
    str_split(str, split_length = 1) {
        str = str + '';
        let res = [];
        res[0] = '';
        let key = 0;
        let iterator = 0;
        for (var strKey in str){
            if(!str.hasOwnProperty(strKey)){
                continue;
            }

            if(iterator == split_length){
                iterator = 0;
                key ++;
                res[key] = '';
            }

            res[key] += str[strKey];

            iterator ++;
        }

        return res;
    }

    /**
     *  Calculate the sum of values in an array
     *  @param  {array}     arr     The input array.
     *  @return {numeric}
     */
    array_sum(arr) {
        let sum = 0;

        for (var arrKey in arr){
            sum += (arr[arrKey] * 1);
        }

        return sum;
    }
}
