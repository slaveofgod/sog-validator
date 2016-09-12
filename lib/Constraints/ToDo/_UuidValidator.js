/**
 * Validates that a value is a valid Universally unique identifier (UUID) per RFC 4122.
 * By default, this will validate the format according to the RFC's guidelines, but this can be relaxed to accept non-standard UUIDs that other systems (like PostgreSQL) accept.
 * UUID versions can also be restricted using a whitelist.
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
