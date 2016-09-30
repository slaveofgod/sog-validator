/**
 * Validates that a value is not equal to another value, defined in the options.
 * To force that a value is equal, see EqualTo.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class NotEqualToValidator extends Validator {
    constructor() {
        super(arguments);

        var value = arguments[0]['value'];
        var message = arguments[0]['message'];

        this.configuring();

        this.setMessage('message', message);

        if(this.isEmpty(value)){
            throw new Error('Either option "value" must be given');
        }

        this.setParameter('value', value);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value should not be equal to {{ compared_value }}.',
        });

        this.setDefaultParameters({
            'value': ''
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        if(data == this.getParameter('value')){
            var message = this.getMessage('message');
            this.addError(message.format({compared_value: this.getParameter('value')}));
        }
    }
}

module.exports = NotEqualToValidator;