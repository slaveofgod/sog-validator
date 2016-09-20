/**
 * The Image constraint works exactly like the File constraint, except that its mimeTypes and mimeTypesMessage options are automatically setup to work for image files specifically.
 * Additionally it has options so you can validate against the width and height of the image.
 * See the File constraint for the bulk of the documentation on this constraint.
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
