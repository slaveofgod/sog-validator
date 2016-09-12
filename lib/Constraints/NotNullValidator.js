/**
 * Validates that a value is not strictly equal to null.
 * To ensure that a value is simply not blank (not a blank string), see the NotBlank constraint.
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
            'message': 'This value should not be null.',
        });
    }

    validate(data) {
        this.resetErrors();

        if(data === null){
            this.addError(this.getMessage('message'));
        }
    }
}
