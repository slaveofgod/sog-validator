/**
 * Validates that a value is equal to another value, defined in the options.
 * To force that a value is not equal, see NotEqualTo.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

export default class extends Validator {
    constructor({
        validators = null,
        message = null
    }) {
        super(arguments);

        this.configuring();

        if(this.isEmpty(validators)){
            throw new Error('Either option "validators" must be given');
        }else if(Object.prototype.toString.call(validators) !== '[object Array]'){
            throw new Error(`Expected argument of type \"Array\", \"${typeof validators}\" given`);
        }

        this.setParameter('validators', validators);

        this.setMessage('message', message);
    }

    configuring() {
        this.setDefaultParameters({
            'validators': []
        });

        this.setDefaultMessages({
            'message': null
        });
    }

    validate(data) {
        this.resetErrors();

        if (null === data || '' === data) {
            return ;
        }

        let message = this.getMessage('message');
        let validators = this.getParameter('validators');

        for (var validatorKey in validators){
            let validator = validators[validatorKey];
            validator.validate(data);
            if(!validator.isValid()) {
                if(message !== null) {
                    this.addError(message.format({value: data}));
                } else {
                    this.setErrors(validator.getErrors());
                }
                break;
            }
        }
    }
}
