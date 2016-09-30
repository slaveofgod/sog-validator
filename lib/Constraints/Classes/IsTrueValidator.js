/**
 * Validates that a value is true.
 * Specifically, this checks to see if the value is exactly true, exactly the integer 1, or exactly the string "1".
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class IsTrueValidator extends Validator {
    constructor() {
        super(arguments);

        var message = arguments[0]['message'];

        this.configuring();

        this.setMessage('message', message);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value should be true.',
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        if (null === data) {
            return;
        }

        if(true !== data && 1 !== data && '1' !== data){
            this.addError(this.getMessage('message'));
        }
    }
}
module.exports = IsTrueValidator;
