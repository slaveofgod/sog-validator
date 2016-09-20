/**
 * Validates that a value is a valid date, meaning either a Date object *or a string (or an object that can be cast into a string)* that follows a valid format.
 *
 * @todo: or a string (or an object that can be cast into a string)
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

/**
 * http://momentjs.com/
 */
//var moment = require('moment');
import moment from 'moment';

export default class extends Validator {
    constructor({
        format = null,
        message = null
    }) {
        super(arguments);

        this.configuring();

        this.setMessage('message', message);

        if(
            this.isEmpty(format) == false
            && !this.isDateFormatValid('ymd', format)
        ){
            throw new Error(`Invalid format (available: [${this.YearMonthDayTokens.join(", ")}])`);
        }

        this.setParameter('format', format);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value is not a valid date.',
        });

        this.setDefaultParameters({
            'format': 'YYYY-MM-DD',
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        if(!moment(data, this.getParameter('format'), true).isValid()){
            this.addError(this.getMessage('message'));
        }
    }
}
