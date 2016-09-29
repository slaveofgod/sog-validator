/**
 * Validates that a value is a valid "datetime", meaning either a DateTime object or a string (or an object that can be cast into a string) that follows a specific format.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './ValidatorAbstract';
var Validator = require('./ValidatorAbstract');

/**
 * http://momentjs.com/
 */
var moment = require('moment');
//import moment from 'moment';

class DateTimeValidator extends Validator {
    constructor() {
        super(arguments);

        var format = arguments[0]['format'];
        var message = arguments[0]['message'];

        this.configuring();

        if(
            this.isEmpty(format) == false
            && !this.isDateTimeFormatValid(format)
        ){
            throw new Error(`Invalid datetime: format or required tokens (available tokens: [${this.DateTimeTokens.join(", ")}])`);
        }

        this.setMessage('message', message);

        this.setParameter('format', format);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value is not a valid datetime.',
        });

        this.setDefaultParameters({
            'format': 'YYYY-MM-DD HH:mm:ss',
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        if((['string'].indexOf(typeof data) < 0)) {
            this.addError(`Invalid "data" type. Expected type \"String\", \"${typeof data}\" given`);
        }

        if(!moment(data, this.getParameter('format'), true).isValid()){
            this.addError(this.getMessage('message'));
        }
    }
}

module.exports = DateTimeValidator;