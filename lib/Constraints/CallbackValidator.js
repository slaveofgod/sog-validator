/**
 * The purpose of the Callback constraint is to create completely custom validation rules and to assign any validation errors to specific fields on your object.
 * If you're using validation with forms, this means that you can make these custom errors display next to a specific field, instead of simply at the top of your form.
 *
 * This process works by specifying one or more callback methods, each of which will be called during the validation process.
 * Each of those methods can do anything, including creating and assigning validation errors.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

export default class extends Validator {
    constructor({
        callback = null,
        parameters = null
    }) {
        super(arguments);

        this.configuring();

        if(callback == null || typeof callback != 'function'){
            throw new Error('Parameter "callback" should be function');
        }

        this.setParameter('callback', callback);
        this.setParameter('parameters', parameters);
    }

    configuring() {
        this.setDefaultParameters({
            'callback': null,
            'parameters': null
        });
    }

    validate(data) {
        this.resetErrors();

        let _function = this.getParameter('callback');
        let _result = _function(data, this.getParameter('parameters'));

        if(_result != null){
            this.addError(_result);
        }
    }
}
