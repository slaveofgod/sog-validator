/**
 * Validates that a given number is between some minimum and maximum number.
 * Validates that a given date is between some minimum and maximum date.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './ValidatorAbstract';
var Validator = require('./ValidatorAbstract');

class RangeValidator extends Validator {
    constructor() {
        super(arguments);

        var min = arguments[0]['min'];
        var max = arguments[0]['max'];
        var minMessage = arguments[0]['minMessage'];
        var maxMessage = arguments[0]['maxMessage'];
        var invalidMessage = arguments[0]['invalidMessage'];

        this.configuring();

        this.setMessage('minMessage', minMessage);
        this.setMessage('maxMessage', maxMessage);
        this.setMessage('invalidMessage', invalidMessage);

        if(this.isEmpty(min) || this.isEmpty(max)){
            throw new Error('Either option "min" and "max" must be given');
        }

        if(
            this.isEmpty(min) == false
            && (
                ['integer', 'int', 'numeric', 'float', 'double', 'scalar', 'number'].indexOf(typeof min) < 0
                && !(min instanceof Date)
            )
        ){
            throw new Error(`Invalid "min" type. Expected argument of type \"number\" or \"Date\", \"${typeof min}\" given`);
        }

        if(
            this.isEmpty(max) == false
            && (
                ['integer', 'int', 'numeric', 'float', 'double', 'scalar', 'number'].indexOf(typeof max) < 0
                && !(max instanceof Date)
            )
        ){
            throw new Error(`Invalid "max" type. Expected argument of type \"number\" or \"Date\", \"${typeof max}\" given`);
        }

        if(
            ((min instanceof Date) && !(max instanceof Date))
            || ((max instanceof Date) && !(min instanceof Date))
        ){
            throw new Error('Option "min" and "max"  must be the same type');
        }

        this.setParameter('min', min);
        this.setParameter('max', max);
    }

    configuring() {
        this.setDefaultMessages({
            'minMessage': 'This value should be {{ limit }} or more.',
            'maxMessage': 'This value should be {{ limit }} or less.',
            'invalidMessage': 'This value should be a valid number.',
        });

        this.setDefaultParameters({
            'min': 0,
            'max': 100000,
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        if(
            ['integer', 'int', 'numeric', 'float', 'double', 'scalar', 'number'].indexOf(typeof data) < 0
            && !(data instanceof Date)
        ){
            if(data != (data * 1)){
                this.addError(this.getMessage('invalidMessage'));
                return;
            }

            data = (data * 1);
        }

        if(['integer', 'int', 'numeric', 'float', 'double', 'scalar', 'number'].indexOf(typeof data) >= 0){
            if(data < this.getParameter('min')){
                var message = this.getMessage('minMessage');
                this.addError(message.format({limit: this.getParameter('min')}));
            }else if(data > this.getParameter('max')){
                var message = this.getMessage('maxMessage');
                this.addError(message.format({limit: this.getParameter('max')}));
            }
        }else if(data instanceof Date){
            if(
                !(this.getParameter('min') instanceof Date)
                || !(this.getParameter('max') instanceof Date)
            ){
                if(this.getEnvironment() == 'dev') {
                    throw new Error('Invalid "min" or "max" parameter type');
                }else{
                    this.addError('Invalid "min" or "max" parameter type');

                    return;
                }
            }

            if(data < this.getParameter('min')){
                var message = this.getMessage('minMessage');
                this.addError(message.format({limit: this.getParameter('min').toString()}));
            }else if(data > this.getParameter('max')){
                var message = this.getMessage('maxMessage');
                this.addError(message.format({limit: this.getParameter('max').toString()}));
            }
        }else{
            this.addError(this.getMessage('invalidMessage'));
        }
    }
}

module.exports = RangeValidator;
