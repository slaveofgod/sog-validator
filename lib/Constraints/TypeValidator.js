/**
 * Validates that a value is of a specific data type. For example, if a variable should be an array, you can use this constraint with the array type option to validate this.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

export default class extends Validator {

    constructor({
        type = 'integer',
        message = null
    }) {
        super(arguments);

        this.configuring();

        if (this.types.indexOf(type) == -1){
            throw new Error(`Data type \"${type}\" does not exist`);
        }

        this.setMessage('message', message);

        this.setParameter('type', type);
    }

    configuring() {
        this.types = [
            'array', 'bool', 'boolean', 'float', 'double', 'int', 'integer', 'null', 'numeric', 'object', 'scalar', 'string',
            'callable', 'real', 'resource', 'long', 'alnum', 'alpha', 'cntrl', 'digit', 'graph', 'lower', 'print', 'punct', 'space', 'upper', 'xdigit' /* todo */
        ];

        this.setDefaultMessages({
            'message': 'This value should be of type {{ type }}.',
        });

        this.setDefaultParameters({
            'type': 'integer',
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        let message = this.getMessage('message');

        switch(this.getParameter('type')){
            case 'integer':
            case 'int':
                if(data != parseInt(data, 10)){ /* return (Number(n) === n && n % 1 === 0) */
                    this.addError(message.format({type: this.getParameter('type')}));
                }
                break;
            case 'array':
                if(!data.isArray){
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
                if(typeof data !== 'object'){
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

            default:
                let type = this.getParameter('type');
                throw new Error(`Data type \"${type}\" exist but does not supported (coming soon)`);
                break;
        }
    }
}
