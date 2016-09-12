/**
 * Validates that a value is a valid locale.
 * The "value" for each locale is either the two letter ISO 639-1 language code (e.g. fr), or the language code followed by an underscore (_), then the ISO 3166-1 alpha-2 country code (e.g. fr_FR for French/France).
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
