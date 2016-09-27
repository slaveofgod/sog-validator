/**
 * Validates that a value is greater than another value, defined in the options.
 * To force that a value is greater than or equal to another value, see GreaterThanOrEqual.
 * To force a value is less than another value, see LessThan.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './ThanValidatorAbstract';
var Validator = require('./ThanValidatorAbstract');

class GreaterThanValidator extends Validator {
    constructor() {
        super({value, message});

        var value = arguments[0]['value'];
        var message = arguments[0]['message'];

        this.configuring();

        this.setMessage('message', message);

        this.setParameter('value', value);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value should be greater than {{ compared_value }}.',
        });

        this.setDefaultParameters({
            'value': null
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();
        this.checkData(data);

        if(data <= this.getParameter('value')){
            var message = this.getMessage('message');
            this.addError(message.format({compared_value: this.getParameter('value')}));
        }
    }
}

module.exports = GreaterThanValidator;
