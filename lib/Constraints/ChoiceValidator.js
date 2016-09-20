/**
 * This constraint is used to ensure that the given value is one of a given set of valid choices.
 * It can also be used to validate that each item in an array of items is one of those valid choices
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 * @todo: callback
 */
'use strict';

import Validator from './ValidatorAbstract';

export default class extends Validator {
    constructor({
        choices = null,
        callback = null,
        multiple = null,
        min = null,
        max = null,
        message = null,
        multipleMessage = null,
        minMessage = null,
        maxMessage = null,
        strict = false
    }) {
        super(arguments);

        this.configuring();

        if(this.isEmpty(choices)){
            throw new Error('Either option "choices" must be given');
        }

        if(Object.prototype.toString.call(choices) !== '[object Array]') {
            throw new Error('Option "choices" must be array');
        }

        this.setMessage('message', message);
        this.setMessage('multipleMessage', multipleMessage);
        this.setMessage('minMessage', minMessage);
        this.setMessage('maxMessage', maxMessage);

        this.setParameter('choices', choices);
        this.setParameter('callback', callback);
        this.setParameter('multiple', multiple);
        this.setParameter('min', min);
        this.setParameter('max', max);
        this.setParameter('strict', strict);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'The value you selected is not a valid choice.',
            'multipleMessage': 'One or more of the given values is invalid.',
            'minMessage': 'You must select at least {{ limit }} choices.',
            'maxMessage': 'You must select at most {{ limit }} choices.',
        });

        this.setDefaultParameters({
            'choices': [],
            'callback': null,
            'multiple': false,
            'min': 0,
            'max': 10000,
            'strict': false
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        if(this.isEmpty(data)){
            return ;
        }

        if(this.getParameter('multiple') && Object.prototype.toString.call(data) !== '[object Array]'){
            throw new Error(`Expected argument of type \"array\", \"${typeof data}\" given`);
        }

        if(this.getParameter('multiple')){
            for (var dataKey in data){

                if(!this.inArray(data[dataKey], this.getParameter('choices'), this.getParameter('strict'))){
                    this.addError(this.getMessage('multipleMessage'));

                    return ;
                }
            }

            let count = data.length;

            if(count < this.getParameter('min')){
                let message = this.getMessage('minMessage');
                this.addError(message.format({limit: this.getParameter('min')}));

                return ;
            }

            if(count > this.getParameter('max')){
                let message = this.getMessage('maxMessage');
                this.addError(message.format({limit: this.getParameter('max')}));

                return ;
            }
        }else{
            if(!this.inArray(data, this.getParameter('choices'), this.getParameter('strict'))){
                this.addError(this.getMessage('message'));

                return ;
            }
        }
    }
}
