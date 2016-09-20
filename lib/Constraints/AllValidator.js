/**
 * When applied to an array, this constraint allows you to apply a collection of constraints to each element of the array.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';
import ObjectExecutionContext from '../Context/ObjectExecutionContext';

export default class extends Validator {
    constructor({
        validators = null,
        validationType = null,
        errorType = null
    }) {
        super(arguments);

        this.configuring();

        if(this.isEmpty(validators)){
            throw new Error('Either option "validators" must be given');
        }else if(Object.prototype.toString.call(validators) !== '[object Object]'){
            throw new Error(`Expected argument of type \"Array Object\", \"${typeof validators}\" given`);
        }

        this.setParameter('validators', validators);
        this.setParameter('validationType', validationType);
        this.setParameter('errorType', errorType);
    }

    configuring() {
        this.setDefaultParameters({
            'validators': [],
            'validationType': 'object', //[object, schema]
            'errorType': 'array' // [array, object]
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        if(this.isEmpty(data)){
            return ;
        }

        if(Object.prototype.toString.call(data) !== '[object Object]'){
            throw new Error(`Expected argument of type \"Array Object\", \"${typeof data}\" given`);
        }

        switch(this.getParameter('validationType')){
            case 'object':
                let _oec = new ObjectExecutionContext({data: data, validators: this.getParameter('validators')});
                _oec.validate(this.getParameter('errorType'));

                if(_oec.isInvalid()) {
                    this.setErrors(_oec.getErrors());
                }

                break;
            default:
                throw new Error('Unsupported type');
                break;
        }
    }
}
