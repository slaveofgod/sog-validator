/**
 * Validates that a value is blank, defined as equal to a blank string or equal to null.
 * To force that a value strictly be equal to null, see the IsNull constraint.
 * To force that a value is not blank, see NotBlank.
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
            'message': 'This value should be blank.',
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        if(!this.isEmpty(data)){
            this.addError(this.getMessage('message'));
        }
    }
}
