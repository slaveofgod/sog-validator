/**
 * This constraint ensures that a credit card number is valid for a given credit card company.
 * It can be used to validate the number before trying to initiate a payment through a payment gateway.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './ValidatorAbstract';
let Validator = require('./ValidatorAbstract');

class CardSchemeValidator extends Validator {
    constructor({
        message = null,
        schemes = null
    }) {
        super(arguments);

        this.configuring();

        this.setMessage('message', message);

        if(
            !this.isEmpty(schemes)
            && Object.prototype.toString.call(schemes) !== '[object Array]'
        ){
            throw new Error(`Invalid "schemes" type. Expected type \"Array\", \"${typeof schemes}\" given`);
        }else if(
            !this.isEmpty(schemes)
            && Object.prototype.toString.call(schemes) === '[object Array]'
        ){
            for (var schemeKey in schemes){
                if(!this.inArray(schemes[schemeKey], this.getParameter('schemes'), false)){
                    throw new Error(`Invalid "schemes" variant \"${schemes[schemeKey]}\".`);
                }
            }
        }

        this.setParameter('schemes', schemes);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'Unsupported card type or invalid card number.'
        });

        this.setDefaultParameters({
            'schemes': ['AMEX', 'CHINA_UNIONPAY', 'DINERS', 'DISCOVER', 'INSTAPAYMENT', 'JCB', 'LASER', 'MAESTRO', 'MASTERCARD', 'VISA']
        });

        this.schemes = {
            // American Express card numbers start with 34 or 37 and have 15 digits.
            'AMEX': [
                /^3[47][0-9]{13}$/,
            ],
            // China UnionPay cards start with 62 and have between 16 and 19 digits.
            // Please note that these cards do not follow Luhn Algorithm as a checksum.
            'CHINA_UNIONPAY': [
                /^62[0-9]{14,17}$/,
            ],
            // Diners Club card numbers begin with 300 through 305, 36 or 38. All have 14 digits.
            // There are Diners Club cards that begin with 5 and have 16 digits.
            // These are a joint venture between Diners Club and MasterCard, and should be processed like a MasterCard.
            'DINERS': [
                /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            ],
            // Discover card numbers begin with 6011, 622126 through 622925, 644 through 649 or 65.
            // All have 16 digits.
            'DISCOVER': [
                /^6011[0-9]{12}$/,
                /^64[4-9][0-9]{13}$/,
                /^65[0-9]{14}$/,
                /^622(12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|91[0-9]|92[0-5])[0-9]{10}$/,
            ],
            // InstaPayment cards begin with 637 through 639 and have 16 digits.
            'INSTAPAYMENT': [
                /^63[7-9][0-9]{13}$/,
            ],
            // JCB cards beginning with 2131 or 1800 have 15 digits.
            // JCB cards beginning with 35 have 16 digits.
            'JCB': [
                /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
            ],
            // Laser cards begin with either 6304, 6706, 6709 or 6771 and have between 16 and 19 digits.
            'LASER': [
                /^(6304|670[69]|6771)[0-9]{12,15}$/,
            ],
            // Maestro international cards begin with 675900..675999 and have between 12 and 19 digits.
            // Maestro UK cards begin with either 500000..509999 or 560000..699999 and have between 12 and 19 digits.
            'MAESTRO': [
                /^(6759[0-9]{2})[0-9]{6,13}$/,
                /^(50[0-9]{4})[0-9]{6,13}$/,
                /^5[6-9][0-9]{10,17}$/,
                /^6[0-9]{11,18}$/,
            ],
            // All MasterCard numbers start with the numbers 51 through 55. All have 16 digits.
            // October 2016 MasterCard numbers can also start with 222100 through 272099.
            'MASTERCARD': [
                /^5[1-5][0-9]{14}$/,
                /^2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12})$/,
            ],
            // All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13.
            'VISA': [
                /^4([0-9]{12}|[0-9]{15})$/,
            ]
        };
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        let message = this.getMessage('message');

        if (null === data || '' === data) {
            return ;
        }

        if (!this.is_numeric(data)) {
            // NOT_NUMERIC_ERROR
            this.addError(message.format({value: data}));
            return ;
        }

        let schemes = this.getParameter('schemes');
        for (var schemeKey in schemes){
            let rules = this.schemes[schemes[schemeKey]];
            for (var ruleKey in rules){
                if(rules[ruleKey].test(data)){
                    return ;
                }
            }
        }

        // INVALID_FORMAT_ERROR
        this.addError(message.format({value: data}));
    }

    is_numeric(input) {
       return (input - 0) == input && input.length > 0;
    }
}

module.exports = CardSchemeValidator;
