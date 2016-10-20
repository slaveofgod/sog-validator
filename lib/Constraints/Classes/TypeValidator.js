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
            'array', 'bool', 'boolean', 'float', 'double', 'int', 'integer', 'null', 'numeric', 'object', 'scalar', 'string', 'callable', 'long', 'real', 'alnum', 'alpha', 'digit', 'lower', 'space', 'upper', 'xdigit',
            'resource', 'cntrl', 'graph', 'print', 'punct' /* todo */
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
                // if((Number(data) !== data && data % 1 !== 0)){ /* return (Number(n) === n && n % 1 === 0) */
                if(data != parseInt(data, 10)){
                // if(data.toString() != parseInt(data, 10).toString()){ // @todo: if value == null
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
            case 'real':
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
            case 'alnum': /* @TODO: for all locales */
                if(/^[A-Za-z0-9]+$/.test(data) == false){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
            break;
            case 'alpha': /* @TODO: for all locales */
                if(/^[A-Za-z]+$/.test(data) == false){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
            break;
            case 'digit':
                if(/^[0-9]+$/.test(data) == false){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
            break;
            case 'lower': /* @TODO: for all locales */
                if(/^[a-z]+$/.test(data) == false){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
            break;
            /**
             * https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_Expressions
             * [ \f\n\r\t\v​\u00A0\u1680​\u180e\u2000​\u2001\u2002​\u2003\u2004​\u2005\u2006​\u2007\u2008​\u2009\u200a​\u2028\u2029​\u2028\u2029​\u202f\u205f​\u3000]
             */
            case 'space':
                if(/^[\s]+$/.test(data) == false){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
            break;
            case 'upper': /* @TODO: for all locales */
                if(/^[A-Z]+$/.test(data) == false){
                    this.addError(message.format({type: this.getParameter('type')}));
                }
            break;
            case 'xdigit':
                if(/^[0-9A-Fa-f]+$/.test(data) == false){
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
