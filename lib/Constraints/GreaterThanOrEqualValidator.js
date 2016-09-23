/**
 * Validates that a value is greater than or equal to another value, defined in the options.
 * To force that a value is greater than another value, see GreaterThan.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './ThanValidatorAbstract';
let Validator = require('./ThanValidatorAbstract');

class GreaterThanOrEqualValidator extends Validator {
    constructor({
        value = null,
        message = null
    }) {
        super({value, message});

        this.configuring();

        this.setMessage('message', message);

        this.setParameter('value', value);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value should be greater than or equal to {{ compared_value }}.',
        });

        this.setDefaultParameters({
            'value': null
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();
        this.checkData(data);

        if(data < this.getParameter('value')){
            let message = this.getMessage('message');
            this.addError(message.format({compared_value: this.getParameter('value')}));
        }
    }
}

module.exports = GreaterThanOrEqualValidator;
