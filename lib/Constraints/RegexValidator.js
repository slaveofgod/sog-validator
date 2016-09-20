/**
 * Validates that a value matches a regular expression.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

export default class extends Validator {
    constructor({
        pattern = null,
        message = null
    }) {
        super(arguments);

        this.configuring();

        if(this.isEmpty(pattern)){
            throw new Error('Either option "pattern" must be given');
        }

        this.setMessage('message', message);

        this.setParameter('pattern', pattern);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value is not valid.',
        });

        this.setDefaultParameters({
            'pattern': null,
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        let pattern = this.getParameter('pattern');

        if(pattern.test(data) == false){
            this.addError(this.getMessage('message'));
        }
    }
}
