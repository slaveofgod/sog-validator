/**
 * Validates that a value is a valid "file", which can be one of the following:
 * - A string (or object with a __toString() method) path to an existing file;
 * - A valid File object (including objects of class UploadedFile).
 * This constraint is commonly used in forms with the FileType form field.
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

    validate(data) {
        throw new Error(`Validator is not implemented`);
    }
}
