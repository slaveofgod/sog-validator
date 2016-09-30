/**
 * Validates that a value matches a regular expression.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class RegexValidator extends Validator {
    constructor() {
        super(arguments);

        var pattern = arguments[0]['pattern'];
        var message = arguments[0]['message'];

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

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        var pattern = this.getParameter('pattern');

        if(pattern.test(data) == false){
            this.addError(this.getMessage('message'));
        }
    }
}

module.exports = RegexValidator;