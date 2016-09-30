/**
 * This validates that an input value is equal to the current authenticated user's password.
 * This is useful in a form where a user can change their password, but needs to enter their old password for security.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class UserPasswordValidator extends Validator {
    constructor({
    }) {
        super(arguments);

        this.configuring();
    }

    configuring() {
        this.setDefaultMessages({
        });

        this.setDefaultParameters({
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        throw new Error(`Validator is not implemented`);
    }
}

module.exports = UserPasswordValidator;
