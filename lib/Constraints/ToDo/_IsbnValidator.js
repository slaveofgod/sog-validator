/**
 * This constraint validates that an International Standard Book Number (ISBN) is either a valid ISBN-10 or a valid ISBN-13.
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
