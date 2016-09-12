/**
 * Validates that a value is not identical to another value, defined in the options.
 * To force that a value is identical, see IdenticalTo.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

export default class extends Validator {
    constructor({
        value = null,
        message = null
    }) {
        super(arguments);

        this.configuring();

        this.setMessage('message', message);

        if(this.isEmpty(value)){
            throw new Error('Either option "value" must be given');
        }

        this.setParameter('value', value);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value should not be identical to {{ compared_value_type }} {{ compared_value }}.',
        });

        this.setDefaultParameters({
            'value': ''
        });
    }

    validate(data) {
        this.resetErrors();

        if(data === this.getParameter('value')){
            let message = this.getMessage('message');
            this.addError(message.format({compared_value: this.getParameter('value'), compared_value_type: typeof this.getParameter('value')}));
        }
    }
}
