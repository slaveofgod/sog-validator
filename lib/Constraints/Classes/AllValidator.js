/**
 * When applied to an array, this constraint allows you to apply a collection of constraints to each element of the array.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

//import ObjectExecutionContext from '../../Context/ObjectExecutionContext';
//import SchemaExecutionContext from '../../Context/SchemaExecutionContext';
var ObjectExecutionContext = require('../../Context/ObjectExecutionContext');
var SchemaExecutionContext = require('../../Context/SchemaExecutionContext');

class AllValidator extends Validator {
    constructor() {
        super(arguments);

        var validators = arguments[0]['validators'];
        var validationType = arguments[0]['validationType'];
        var errorType = arguments[0]['errorType']
        var environment = arguments[0]['environment']

        this.configuring();

        if(this.isEmpty(validators)){
            throw new Error('Either option "validators" must be given');
        }else if(Object.prototype.toString.call(validators) !== '[object Object]'){
            throw new Error(`Expected argument of type \"Array Object\", \"${typeof validators}\" given`);
        }

        this.setParameter('validators', validators);
        this.setParameter('validationType', validationType);
        this.setParameter('errorType', errorType);
        this.setParameter('environment', environment);
    }

    configuring() {
        this.setDefaultParameters({
            'validators': [],
            'validationType': 'object', //[object, schema]
            'errorType': 'array', // [array, object]
            'environment': 'prod' // [prod, dev]
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;

        this.setErrorType(errorType);
        this.resetErrors();

        if(this.isEmpty(data)){
            return ;
        }

        if(Object.prototype.toString.call(data) !== '[object Object]'){
            if(this.getParameter('environment') == 'dev') {
                throw new Error(`Expected argument of type \"Array Object\", \"${typeof data}\" given`);
            }else{
                this.addError(`Expected argument of type \"Array Object\", \"${typeof data}\" given`);

                return;
            }
        }

        var _oec = null;
        var _validationType = this.getParameter('validationType');
        switch(_validationType){
            case 'object':
                _oec = new ObjectExecutionContext({data: data, validators: this.getParameter('validators')});
                _oec.setEnvironment(this.getParameter('environment'));
                _oec.validate(this.getParameter('errorType'));

                if(_oec.isInvalid()) {
                    this.setErrors(_oec.getErrors());
                }

                break;
            case 'schema':
                _oec = new SchemaExecutionContext({data: data, schema: this.getParameter('validators')});
                _oec.setEnvironment(this.getParameter('environment'));
                _oec.validate(this.getParameter('errorType'));


                if(_oec.isInvalid()) {
                    this.setErrors(_oec.getErrors());
                }

                break;
            default:
                if(this.getParameter('environment') == 'dev') {
                    throw new Error(`Unsupported type \"${_validationType}\"`);
                }else{
                    this.addError(`Unsupported type \"${_validationType}\"`);

                    return;
                }
                break;
        }
    }
}

module.exports = AllValidator;
