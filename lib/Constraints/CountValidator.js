/**
 * Validates that a given collection's (i.e. an array or an object that implements Countable) element count is between some minimum and maximum value.
 * @todo object's element count
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

export default class extends Validator {
    constructor({
        min = null,
        max = null,
        minMessage = null,
        maxMessage = null,
        exactMessage = null,
    }) {
        super(arguments);

        this.configuring();

        this.setMessage('minMessage', minMessage);
        this.setMessage('maxMessage', maxMessage);
        this.setMessage('exactMessage', exactMessage);

        if(this.isEmpty(min) || this.isEmpty(max)){
            throw new Error('Either option "min" and "max" must be given');
        }

        if(
            this.isEmpty(min) == false
            && (min * 1) != min
        ){
            throw new Error(`Invalid "min" type. Expected argument of type \"number\", \"${typeof min}\" given`);
        }

        if(
            this.isEmpty(max) == false
            && (max * 1) != max
        ){
            throw new Error(`Invalid "max" type. Expected argument of type \"number\", \"${typeof max}\" given`);
        }

        this.setParameter('min', min);
        this.setParameter('max', max);
    }

    configuring() {
        this.setDefaultMessages({
            'minMessage': 'This collection should contain {{ limit }} elements or more.',
            'maxMessage': 'This collection should contain {{ limit }} elements or less.',
            'exactMessage': 'This collection should contain exactly {{ limit }} elements.',
        });

        this.setDefaultParameters({
            'min': 0,
            'max': 10000,
        });
    }

    validate(data) {
        this.resetErrors();

        if(Object.prototype.toString.call(data) !== '[object Array]') {
            throw new Error(`Invalid "data" type. Expected type \"Array\", \"${typeof data}\" given`);
        }

        if(
            this.getParameter('min') == this.getParameter('max')
            && data.length != this.getParameter('min')
        ){
            let message = this.getMessage('exactMessage');
            this.addError(message.format({limit: this.getParameter('min')}));
        }else if(data.length < this.getParameter('min')){
            let message = this.getMessage('minMessage');
            this.addError(message.format({limit: this.getParameter('min')}));
        }else if(data.length > this.getParameter('max')){
            let message = this.getMessage('maxMessage');
            this.addError(message.format({limit: this.getParameter('max')}));
        }
    }
}
