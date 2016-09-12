/**
 * When applied to an array (or Traversable object), this constraint allows you to apply a collection of constraints to each element of the array.
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
