/**
 * Validates that a value is not blank, defined as not strictly false, not equal to a blank string and also not equal to null.
 * To force that a value is simply not equal to null, see the NotNull constraint.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './ValidatorAbstract';
var Validator = require('./ValidatorAbstract');

class NotBlankValidator extends Validator {
    constructor() {
        super(arguments);

        var message = arguments[0]['message'];

        this.configuring();

        this.setMessage('message', message);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value should not be blank.',
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;

        this.setErrorType(errorType);
        this.resetErrors();

        if(this.isEmpty(data)){
            this.addError(this.getMessage('message'));
        }
    }
}

module.exports = NotBlankValidator;
