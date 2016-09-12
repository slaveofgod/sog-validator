/**
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

class ExecutionContext {
    constructor({
        data = null,
        validators = null
    }) {
        this._data = data;
        this._validators = validators;
        this._errors = [];
        this._errorCount = 0;
    }

    validate() {
        for (var dataKey in this._data){
            if (
                this._data.hasOwnProperty(dataKey)
                && this._validators[dataKey] !== undefined
            ) {
                if(this._validators[dataKey].isRequired == false && this.isEmpty(this._data[dataKey])){
                    continue;
                }

                for (var ruleKey in this._validators[dataKey].rules){
                    this._validators[dataKey].rules[ruleKey].validate(this._data[dataKey]);
                    if(this._validators[dataKey].rules[ruleKey].isInvalid()){
                        this.addError(dataKey, this._validators[dataKey].rules[ruleKey].getErrors());
                    }
                }
            }
        }
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

    addError(key, errors) {
        if (typeof(this._errors[key]) === 'undefined') {
            this._errors[key] = [];
        }

        for (var ruleKey in errors){
            this._errors[key].push(errors[ruleKey]);
            this._errorCount ++;
        }
    }
}

export default ExecutionContext;