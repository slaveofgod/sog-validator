/**
 * Validates that a value is a valid email address. The underlying value is cast to a string before being validated.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 * @todo: strict, checkMX, checkHost
 */
'use strict';

//import Validator from './ValidatorAbstract';
var Validator = require('./ValidatorAbstract');

class EmailValidator extends Validator {
    constructor() {
        super(arguments);

        var strict = arguments[0]['strict'];
        var checkMX = arguments[0]['checkMX'];
        var checkHost = arguments[0]['checkHost'];
        var message = arguments[0]['message'];

        this.configuring();

        this.setMessage('message', message);

        this.setParameter('strict', strict);
        this.setParameter('checkMX', checkMX);
        this.setParameter('checkHost', checkHost);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value is not a valid email address.',
        });

        this.setDefaultParameters({
            'strict': false,
            'checkMX': false,
            'checkHost': false,
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        //if(/^.+\@\S+\.\S+$/.test(data) == false){
        if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data) == false){
            this.addError(this.getMessage('message'));
        }
    }
}

module.exports = EmailValidator;
