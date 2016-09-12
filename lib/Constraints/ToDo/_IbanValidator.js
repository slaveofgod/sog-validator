/**
 * This constraint is used to ensure that a bank account number has the proper format of an International Bank Account Number (IBAN).
 * IBAN is an internationally agreed means of identifying bank accounts across national borders with a reduced risk of propagating transcription errors.
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
