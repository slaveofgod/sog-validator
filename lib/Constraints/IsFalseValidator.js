/**
 * Validates that a value is false.
 * Specifically, this checks to see if the value is exactly false, exactly the integer 0, or exactly the string "0".
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
            'message': 'This value should be false.',
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        if(null === data || false === data || 0 === data || '0' === data){
            return;
        }

        this.addError(this.getMessage('message'));
    }
}
