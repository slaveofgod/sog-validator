/**
 * This constraint validates that an International Standard Book Number (ISBN) is either a valid ISBN-10 or a valid ISBN-13.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 *
 * ISBN-13: 978-1-56619-909-4
 * ISBN-10: 1-56619-909-3
 */
'use strict';

//import Validator from './ValidatorAbstract';
let Validator = require('./ValidatorAbstract');

class IsbnValidator extends Validator {
    constructor({
        type = null,
        message = null,
        isbn10Message = null,
        isbn13Message = null,
        bothIsbnMessage = null
    }) {
        super(arguments);

        this.configuring();

        this.setParameter('type', type);

        this.setMessage('message', message);
        this.setMessage('isbn10Message', isbn10Message);
        this.setMessage('isbn13Message', isbn13Message);
        this.setMessage('bothIsbnMessage', bothIsbnMessage);
    }

    configuring() {
        this.setDefaultMessages({
            'message': null,
            'isbn10Message': 'This value is not a valid ISBN-10.',
            'isbn13Message': 'This value is not a valid ISBN-13.',
            'bothIsbnMessage': 'This value is neither a valid ISBN-10 nor a valid ISBN-13.'
        });

        this.setDefaultParameters({
            'type': null
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        if (null === data || '' === data) {
            return ;
        }

        let canonical = data.replace(/[-]+/g, '');
        let code = null;
        let message = null;

        // Explicitly validate against ISBN-10
        if ('isbn10' === this.getParameter('type')) {
            if (true !== (code = this.validateIsbn10(canonical))) {
                message = this._getMessage(this.getParameter('type'));
                this.addError(message.format({value: data}));
                return;
            }

            return;
        }

        // Explicitly validate against ISBN-13
        if ('isbn13' === this.getParameter('type')) {
            if (true !== (code = this.validateIsbn13(canonical))) {
                message = this._getMessage(this.getParameter('type'));
                this.addError(message.format({value: data}));
                return;
            }

            return;
        }

        // Try both ISBNs

        // First, try ISBN-10
        code = this.validateIsbn10(canonical);

        // The ISBN can only be an ISBN-13 if the value was too long for ISBN-10
        if ('TOO_LONG_ERROR' === code) {
            // Try ISBN-13 now
            code = this.validateIsbn13(canonical);

            // If too short, this means we have 11 or 12 digits
            if ('TOO_SHORT_ERROR' === code) {
                code = 'TYPE_NOT_RECOGNIZED_ERROR';
            }
        }

        if (true !== code) {
            message = this._getMessage(this.getParameter('type'));
            this.addError(message.format({value: data}));
        }
    }

    validateIsbn10(isbn) {
        // Choose an algorithm so that ERROR_INVALID_CHARACTERS is preferred
        // over ERROR_TOO_SHORT/ERROR_TOO_LONG
        // Otherwise "0-45122-5244" passes, but "0-45122_5244" reports
        // "too long"

        // Error priority:
        // 1. ERROR_INVALID_CHARACTERS
        // 2. ERROR_TOO_SHORT/ERROR_TOO_LONG
        // 3. ERROR_CHECKSUM_FAILED

        let checkSum = 0;

        let i = 0;
        for (i = 0; i < 10; ++i) {
            // If we test the length before the loop, we get an ERROR_TOO_SHORT
            // when actually an ERROR_INVALID_CHARACTERS is wanted, e.g. for
            // "0-45122_5244" (typo)
            if (this.isEmpty(isbn[i])) {
                return 'TOO_SHORT_ERROR';
            }

            let digit = null;
            if ('X' === isbn[i]) {
                digit = 10;
            } else if (this.ctype_digit(isbn[i])) {
                digit = isbn[i];
            } else {
                return 'INVALID_CHARACTERS_ERROR';
            }

            checkSum += digit * (10 - i);
        }

        if (!this.isEmpty(isbn[i])) {
            return 'TOO_LONG_ERROR';
        }

        return 0 === checkSum % 11 ? true : 'CHECKSUM_FAILED_ERROR';
    }

    validateIsbn13(isbn) {
        // Error priority:
        // 1. ERROR_INVALID_CHARACTERS
        // 2. ERROR_TOO_SHORT/ERROR_TOO_LONG
        // 3. ERROR_CHECKSUM_FAILED

        if (!this.ctype_digit(isbn)) {
            return 'INVALID_CHARACTERS_ERROR';
        }

        let length = isbn.length;

        if (length < 13) {
            return 'TOO_SHORT_ERROR';
        }

        if (length > 13) {
            return 'TOO_LONG_ERROR';
        }

        let checkSum = 0;

        let i = 0;
        for (i = 0; i < 13; i += 2) {
            checkSum += isbn[i];
        }

        for (i = 1; i < 12; i += 2) {
            checkSum += isbn[i] * 3;
        }

        return 0 === checkSum % 10 ? true : 'CHECKSUM_FAILED_ERROR';
    }

    _getMessage(type = null) {
        if (null !== this.getMessage('message')) {
            return this.getMessage('message');
        } else if ('isbn10' === type) {
            return this.getMessage('isbn10Message');
        } else if ('isbn13' === type) {
            return this.getMessage('isbn13Message');
        }

        return this.getMessage('bothIsbnMessage');
    }
}

module.exports = IsbnValidator;