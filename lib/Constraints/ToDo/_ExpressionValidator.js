/**
 * This constraint allows you to use an expression for more complex, dynamic validation.
 * See Basic Usage for an example. See Callback for a different constraint that gives you similar flexibility.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './ValidatorAbstract';
let Validator = require('./ValidatorAbstract');

class ExpressionValidator extends Validator {
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

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        throw new Error(`Validator is not implemented`);
    }
}

module.exports = ExpressionValidator;