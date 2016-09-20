/**
 * Validates that a value is a valid "datetime", meaning either a DateTime object or a string (or an object that can be cast into a string) that follows a specific format.
 *
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

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        if(!moment(data, this.getParameter('format'), true).isValid()){
            this.addError(this.getMessage('message'));
        }
    }
}
