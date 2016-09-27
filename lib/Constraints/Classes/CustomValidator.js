/**
 * Validates that a value is equal to another value, defined in the options.
 * To force that a value is not equal, see NotEqualTo.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './ValidatorAbstract';
var Validator = require('./ValidatorAbstract');

class CustomValidator extends Validator {
    constructor() {
        super(arguments);

        var rules = arguments[0]['rules'];
        var message = arguments[0]['message'];

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

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        if (null === data || '' === data) {
            return ;
        }

        var message = this.getMessage('message');
        var rules = this.getParameter('rules');

        for (var ruleKey in rules){
            var rule = rules[ruleKey];
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

module.exports = CustomValidator;
