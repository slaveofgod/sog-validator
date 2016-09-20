/**
 * Validates that a value is exactly equal to null.
 * To force that a property is simply blank (blank string or null), see the Blank constraint.
 * To ensure that a property is not null, see NotNull.
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
            'message': 'This value should be null.',
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        if(data !== null){
            this.addError(this.getMessage('message'));
        }
    }
}
