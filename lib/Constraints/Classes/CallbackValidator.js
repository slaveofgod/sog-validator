/**
 * The purpose of the Callback constraint is to create completely custom validation rules and to assign any validation errors to specific fields on your object.
 *
 * This process works by specifying one or more callback methods, each of which will be called during the validation process.
 * Each of those methods can do anything, including creating and assigning validation errors.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class CallbackValidator extends Validator {
    constructor() {
        super(arguments);

        var message = arguments[0]['message'];
        var callback = arguments[0]['callback'];
        var parameters = arguments[0]['parameters'];

        this.configuring();

        if(this.isEmpty(message)){
            throw new Error('Either option "message" must be given');
        }

        this.setMessage('message', message);

        if(callback == null || typeof callback != 'function'){
            throw new Error('Parameter "callback" should be function');
        }

        this.setParameter('callback', callback);
        this.setParameter('parameters', parameters);
    }

    configuring() {
        this.setDefaultMessages({
            'message': null,
        });

        this.setDefaultParameters({
            'callback': null,
            'parameters': null
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        if (null === data || '' === data) {
            return ;
        }

        var _function = this.getParameter('callback');
        var _result = _function(data, this.getParameter('parameters'));

        if(_result == false){
            var message = this.getMessage('message');
            this.addError(message.format(this.getParameter('parameters')));
        }
    }
}

module.exports = CallbackValidator;
