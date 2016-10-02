/**
 * Validates that a value is a valid International Standard Serial Number (ISSN).
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 * 0028-0836
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class IssnValidator extends Validator {
    constructor() {
        super(arguments);

        var message = arguments[0]['message'];
        var caseSensitive = arguments[0]['caseSensitive'];
        var requireHyphen = arguments[0]['requireHyphen'];

        this.configuring();

        this.setMessage('message', message);

        this.setParameter('caseSensitive', caseSensitive);
        this.setParameter('requireHyphen', requireHyphen);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value is not a valid ISSN.'
        });

        this.setDefaultParameters({
            'caseSensitive': false,
            'requireHyphen': false
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

        if(!(typeof data == 'string')){
            if(this.getEnvironment() == 'dev') {
                throw new Error(`Expected data of type \"string\", \"${typeof data}\" given`);
            }else{
                this.addError(`Expected data of type \"string\", \"${typeof data}\" given`);

                return;
            }
        }

        var canonical = data;

        // 1234-567X
        //     ^
        if (!this.isEmpty(canonical[4]) && '-' === canonical[4]) {
            // remove hyphen
            canonical = canonical.substr(0, 4) + canonical.substr(5);
        } else if (this.getParameter('requireHyphen')) {
            // MISSING_HYPHEN_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        var length = canonical.length;

        if (length < 8) {
            // TOO_SHORT_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        if (length > 8) {
            // TOO_LONG_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        // 1234567X
        // ^^^^^^^ digits only
        if (!this.ctype_digit(canonical.substr(0, 7))) {
            // INVALID_CHARACTERS_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        // 1234567X
        //        ^ digit, x or X
        if (!this.ctype_digit(canonical[7]) && 'x' !== canonical[7] && 'X' !== canonical[7]) {
            // INVALID_CHARACTERS_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        // 1234567X
        //        ^ case-sensitive?
        if (this.getParameter('caseSensitive') && 'x' === canonical[7]) {
            // INVALID_CASE_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        // Calculate a checksum. "X" equals 10.
        var checkSum = 'X' === (canonical[7] || 'x' === canonical[7]) ? 10 : (canonical[7] * 1);

        for (var i = 0; i < 7; ++i) {
            // Multiply the first digit by 8, the second by 7, etc.
            checkSum += (8 - i) * canonical[i];
        }

        if (0 !== checkSum % 11) {
            // CHECKSUM_FAILED_ERROR
            this.addError(message.format({value: data}));
            return;
        }
    }
}

module.exports = IssnValidator;
