/**
 * Validates that a given string length is between some minimum and maximum value.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 * @todo charset, charsetMessage
 */
'use strict';

//import Validator from './ValidatorAbstract';
let Validator = require('./ValidatorAbstract');

class LengthValidator extends Validator {
    constructor({
        min = null,
        max = null,
        charset = null,
        minMessage = null,
        maxMessage = null,
        exactMessage = null,
        charsetMessage = null
    }) {
        super(arguments);

        this.configuring();

        this.setMessage('minMessage', minMessage);
        this.setMessage('maxMessage', maxMessage);
        this.setMessage('exactMessage', exactMessage);
        this.setMessage('charsetMessage', charsetMessage);

        if(this.isEmpty(min) || this.isEmpty(max)){
            throw new Error('Either option "min" and "max" must be given');
        }

        if(
            this.isEmpty(min) == false
            && (['integer', 'int', 'number'].indexOf(typeof (min * 1)) < 0)
        ){
            throw new Error(`Invalid "min" type. Expected argument of type \"integer\", \"${typeof min}\" given`);
        }

        if(
            this.isEmpty(max) == false
            && (['integer', 'int', 'number'].indexOf(typeof (max * 1)) < 0)
        ){
            throw new Error(`Invalid "max" type. Expected argument of type \"integer\", \"${typeof max}\" given`);
        }

        this.setParameter('min', min);
        this.setParameter('max', max);
        this.setParameter('charset', charset);
    }

    configuring() {
        this.setDefaultMessages({
            'minMessage': 'This value is too short. It should have {{ limit }} characters or more.',
            'maxMessage': 'This value is too long. It should have {{ limit }} characters or less.',
            'exactMessage': 'This value should have exactly {{ limit }} characters.',
            'charsetMessage': 'This value does not match the expected {{ charset }} charset.',
        });

        this.setDefaultParameters({
            'min': 1,
            'max': 65535,
            'charset': 'UTF-8'
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

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

module.exports = LengthValidator;
