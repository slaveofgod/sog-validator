/**
 * Validates that a value is less than another value, defined in the options.
 * To force that a value is less than or equal to another value, see LessThanOrEqual.
 * To force a value is greater than another value, see GreaterThan.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class AbstractThanValidator extends Validator {
    constructor() {
        super(arguments);

        var value = arguments[0]['value'];
        var message = arguments[0]['message'];

        if(this.isEmpty(value)){
            throw new Error('Either option "value" must be given');
        }

        if(
            ((value * 1) != value)
            && (['integer', 'int', 'numeric', 'float', 'double', 'scalar', 'number'].indexOf(typeof value) < 0)
            && !(value instanceof Date)
        ) {
            throw new Error(`Invalid "value" type. Expected argument of type \"number\" or \"Date\" , \"${typeof value}\" given`);
        }
    }

    checkData(data) {
        if(
            ((data * 1) != data)
            && (['integer', 'int', 'numeric', 'float', 'double', 'scalar', 'number'].indexOf(typeof data) < 0)
            && !(data instanceof Date)
        ) {
            if(this.getEnvironment() == 'dev') {
                throw new Error(`Invalid "data" type. Expected type \"number\" or \"Date\" , \"${typeof data}\" given`);
            }else{
                this.addError(`Invalid "data" type. Expected type \"number\" or \"Date\" , \"${typeof data}\" given`);

                return;
            }
        }

        if(
            ((this.getParameter('value') instanceof Date) && !(data instanceof Date))
            || (!(this.getParameter('value') instanceof Date) && (data instanceof Date))
        ){
            if(this.getEnvironment() == 'dev') {
                throw new Error('Compare value and data must be the same type');
            }else{
                this.addError('Compare value and data must be the same type');

                return;
            }
        }
    }
}

//export default AbstractThanValidator;
module.exports = AbstractThanValidator;
