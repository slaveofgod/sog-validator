/**
 * This constraint is used to enable validation on objects that are embedded as properties on an object being validated.
 * This allows you to validate an object and all sub-objects associated with it.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

export default class extends Validator {
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
