/**
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

class ValidationError {
    constructor() {
        this._errors = [];
        this._errorCount = 0;
    }

    addError(errorMessage) {
        this._errors.push(errorMessage);
        this._errorCount ++;
    }

    getErrors() {
        return this._errors;
    }

    getError() {
        if(this._errors[0] !== undefined){
            return this._errors[0];
        } else {
            return null;
        }
    }

    getErrorCount() {
        return this._errorCount;
    }
}

//export default ValidationError;
module.exports = ValidationError;