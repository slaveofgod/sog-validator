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
        rules = null,
        message = null
    }) {
        super(arguments);

        this.configuring();

        if(this.isEmpty(rules)){
            throw new Error('Either option "rules" must be given');
        }else if(Object.prototype.toString.call(rules) !== '[object Array]'){
            throw new Error(`Expected argument of type \"Array\", \"${typeof rules}\" given`);
        }

        this.setParameter('rules', rules);

        this.setMessage('message', message);
    }

    configuring() {
        this.setDefaultParameters({
            'rules': []
        });

        this.setDefaultMessages({
            'message': null
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        if (null === data || '' === data) {
            return ;
        }

        let message = this.getMessage('message');
        let rules = this.getParameter('rules');

        for (var ruleKey in rules){
            let rule = rules[ruleKey];
            rule.validate(data, errorType);
            if(!rule.isValid()) {
                if(message !== null) {
                    this.addError(message.format({value: data}));
                } else {
                    this.setErrors(rule.getErrors());
                }
                break;
            }
        }
    }
}
