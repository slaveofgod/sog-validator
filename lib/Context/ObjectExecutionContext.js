/**
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import ValidationError from './ValidationError';
var ValidationError = require('./ValidationError');

class ObjectExecutionContext {
    constructor() {
        var data = arguments[0]['data'];
        var validators = arguments[0]['validators'];

        this._data = data;
        this._validators = validators;
        this._errors = [];
        this._errorCount = 0;
        this._environment = 'prod';
    }

    validate(errorType) {
        errorType = (errorType == null) ? 'array' : errorType;

        for (var dataKey in this._data){
            if (
                this._data.hasOwnProperty(dataKey)
                && this._validators[dataKey] !== undefined
            ) {
                if(this._validators[dataKey].isRequired == false && this.isEmpty(this._data[dataKey])){
                    continue;
                }

                for (var ruleKey in this._validators[dataKey].rules){
                    this._validators[dataKey].rules[ruleKey].setEnvironment(this.getEnvironment());
                    this._validators[dataKey].rules[ruleKey].validate(this._data[dataKey], errorType);
                    if(this._validators[dataKey].rules[ruleKey].isInvalid()){
                        this.addError(dataKey, this._validators[dataKey].rules[ruleKey].getErrors(), errorType);

                        break;
                    }
                }
            }
        }
    }

    setEnvironment(environment) {
        if (null === environment || '' === environment) {
            return ;
        }

        this._environment = environment;
    }

    getEnvironment(environment) {
        return this._environment;
    }

    isInvalid() {
        return (this._errorCount > 0) ? true : false;
    }

    isValid() {
        return (this._errorCount <= 0) ? true : false;
    }

    getErrors() {
        return this._errors;
    }

    isEmpty(val){
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }

    addError(key, errors, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;

        switch(errorType){
            case 'array':
                if (typeof(this._errors[key]) === 'undefined') {
                    this._errors[key] = [];
                }

                for (var ruleKey in errors){
                    this._errors[key].push(errors[ruleKey]);
                    this._errorCount ++;
                }

                break;

            case 'object':
                if (typeof(this._errors[key]) === 'undefined') {
                    this._errors[key] = new ValidationError();
                }

                errors = errors.getErrors();
                for (var ruleKey in errors){
                    this._errors[key].addError(errors[ruleKey]);
                    this._errorCount ++;
                }

                break;
        }
    }
}

//export default ObjectExecutionContext;
module.exports = ObjectExecutionContext;