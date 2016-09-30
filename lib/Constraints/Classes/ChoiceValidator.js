/**
 * This constraint is used to ensure that the given value is one of a given set of valid choices.
 * It can also be used to validate that each item in an array of items is one of those valid choices
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 * @todo: callback
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class ChoiceValidator extends Validator {
    constructor() {
        super(arguments);

        var choices = arguments[0]['choices'];
        var callback = arguments[0]['callback'];
        var multiple = arguments[0]['multiple'];
        var min = arguments[0]['min'];
        var max = arguments[0]['max'];
        var message = arguments[0]['message'];
        var multipleMessage = arguments[0]['multipleMessage'];
        var minMessage = arguments[0]['minMessage'];
        var maxMessage = arguments[0]['maxMessage'];
        var strict = arguments[0]['strict'];

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

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        if(this.isEmpty(data)){
            return ;
        }

        if(this.getParameter('multiple') && Object.prototype.toString.call(data) !== '[object Array]'){
            if(this.getEnvironment() == 'dev') {
                throw new Error(`Expected argument of type \"array\", \"${typeof data}\" given`);
            }else{
                this.addError(`Expected argument of type \"array\", \"${typeof data}\" given`);

                return;
            }
        }

        if(this.getParameter('multiple')){
            for (var dataKey in data){

                if(!this.inArray(data[dataKey], this.getParameter('choices'), this.getParameter('strict'))){
                    this.addError(this.getMessage('multipleMessage'));

                    return ;
                }
            }

            var count = data.length;

            if(count < this.getParameter('min')){
                var message = this.getMessage('minMessage');
                this.addError(message.format({limit: this.getParameter('min')}));

                return ;
            }

            if(count > this.getParameter('max')){
                var message = this.getMessage('maxMessage');
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

module.exports = ChoiceValidator;
