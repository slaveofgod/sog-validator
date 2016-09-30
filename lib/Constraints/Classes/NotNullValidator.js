/**
 * Validates that a value is not strictly equal to null.
 * To ensure that a value is simply not blank (not a blank string), see the NotBlank constraint.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class NotNullValidator extends Validator {
    constructor() {
        super(arguments);

        var message = arguments[0]['message'];

        this.configuring();

        this.setMessage('message', message);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value should not be null.',
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        if(data === null){
            this.addError(this.getMessage('message'));
        }
    }
}

module.exports = NotNullValidator;
