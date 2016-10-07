/**
 * Validates that a value is of a specific data type. For example, if a variable should be an array, you can use this constraint with the array type option to validate this.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractTypeValidator';
var Validator = require('./AbstractTypeValidator');

class TypeValidator extends Validator {

    constructor() {
        super(arguments);

        var type = arguments[0]['type'];
        if(type == null){
            type = 'integer';
        }
        var message = arguments[0]['message'];

        this.configuring();

        if (this.types.indexOf(type) == -1){
            throw new Error(`Unsupported type \"${type}\"`);
        }

        this.setMessage('message', message);

        this.setParameter('type', type);
    }

    configuring() {
        this.types = [
            'array', 'bool', 'boolean', 'float', 'double', 'int', 'integer', 'null', 'numeric', 'object', 'scalar', 'string', 'callable', 'long',
            'real', 'resource', 'alnum', 'alpha', 'cntrl', 'digit', 'graph', 'lower', 'print', 'punct', 'space', 'upper', 'xdigit' /* todo */
        ];

        this.setDefaultMessages({
            'message': 'This value should be of type {{ type }}.',
        });

        this.setDefaultParameters({
            'type': 'integer',
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        var message = this.getMessage('message');
        var type = this.getParameter('type');

        switch(type){
            case 'integer':
            case 'int':
            case 'long':
                if(data != parseInt(data, 10)){ /* return (Number(n) === n && n % 1 === 0) */
                    this.addError(message.format({type: this.getParameter('type')}));
                }
                break;
            case 'array':
                if(Object.prototype.toString.call(data) !== '[object Array]'){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
                break;
            case 'bool':
            case 'boolean':
                if(typeof data !== 'boolean'){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
                break;
            case 'string':
                if(typeof data !== 'string'){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
                break;
            case 'numeric':
                if((!isNaN(parseFloat(data)) && isFinite(data)) == false){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
                break;
            case 'float':
            case 'double':
                if((Number(data) === data && data % 1 !== 0) == false){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
                break;
            case 'object':
                //if(typeof data !== 'object'){
                if(Object.prototype.toString.call(data) !== '[object Object]'){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
                break;
            case 'null':
                if(data != null){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
                break;
            case 'scalar':
                if((/string|number|boolean/).test(typeof data) == false){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
                break;
            case 'callable':
                if(this.is_callable(data) == false){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
            break;

            default:
                if(this.getEnvironment() == 'dev') {
                    throw new Error(`Data type \"${type}\" exist, but does not supported (coming soon)`);
                }else{
                    this.addError(`Data type \"${type}\" exist, but does not supported (coming soon)`);

                    return;
                }
                break;
        }
    }
}

module.exports = TypeValidator;
