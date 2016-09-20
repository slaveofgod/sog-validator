/**
 * This constraint is used to ensure that a value has the proper format of a Business Identifier Code (BIC).
 * BIC is an internationally agreed means to uniquely identify both financial and non-financial institutions.
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
            'message': 'This is not a valid Business Identifier Code (BIC).'
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        let message = this.getMessage('message');

        if (null === data || '' === data) {
            return ;
        }

        let canonicalize = data.replace(/\s+/g, '');

        // the bic must be either 8 or 11 characters long
        if (!this.inArray(canonicalize.length, [8, 11], false)) {
            // INVALID_LENGTH_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        // must contain alphanumeric values only
        if (!this.ctype_alnum(canonicalize)) {
            // INVALID_CHARACTERS_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        // first 4 letters must be alphabetic (bank code)
        if (!this.ctype_alpha(canonicalize.substr(0, 4))) {
            // INVALID_BANK_CODE_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        // next 2 letters must be alphabetic (country code)
        if (!this.ctype_alpha(canonicalize.substr(4, 2))) {
            // INVALID_COUNTRY_CODE_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        // should contain uppercase characters only
        if (canonicalize.toUpperCase() !== canonicalize) {
            // INVALID_CASE_ERROR
            this.addError(message.format({value: data}));
            return;
        }
    }
}
