/**
 * Validates that a particular field (or fields) in a Doctrine entity is (are) unique.
 * This is commonly used, for example, to prevent a new user to register using an email address that already exists in the system.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

export default class extends Validator {
    constructor({
        message = null,
        fields = null,
        repositoryData = null,
        ignoreNull = null
    }) {
        super(arguments);

        this.configuring();

        this.setMessage('message', message);

        // checking fields
        if(this.isEmpty(fields)){
            throw new Error('At least one field has to be specified.');
        }else if(Object.prototype.toString.call(fields) !== '[object Array]') {
            throw new Error(`Invalid "fields" type. Expected argument of type \"Array\", \"${typeof fields}\" given`);
        }

        // checking repositoryData
        if(this.isEmpty(repositoryData)){
            throw new Error('Either option "repositoryData" must be given');
        }else if(Object.prototype.toString.call(repositoryData) !== '[object Array]') {
            throw new Error(`Invalid "repositoryData" type. Expected argument of type \"Array\", \"${typeof repositoryData}\" given`);
        }

        this.setParameter('fields', fields);
        this.setParameter('repositoryData', repositoryData);
        this.setParameter('ignoreNull', ignoreNull);
    }

    configuring() {
        this.setDefaultMessages({
            message: 'This value is already used.'
        });

        this.setDefaultParameters({
            fields: [],
            repositoryData: [],
            ignoreNull: true
        });
    }

    validate(data) {
        let message = this.getMessage('message');
        let repositoryData = this.getParameter('repositoryData');
        let fields = this.getParameter('fields');

        if (null === data || '' === data) {
            return ;
        }

        if(Object.prototype.toString.call(data) !== '[object Object]') {
            throw new Error(`Invalid "data" type. Expected type \"Array Object\", \"${typeof data}\" given`);
        }

        for (var fieldKey in fields){
            if(data[fields[fieldKey]] === undefined){
                throw new Error(`Invalid "data". It does not contain all checked fields`);
            }
        }

        for (var rdKey in repositoryData){
            let data1 = '';
            let data2 = '';
            for (var fieldKey in fields){
                data1 += repositoryData[rdKey][fields[fieldKey]];
                data2 += data[fields[fieldKey]];
            }

            if(data1 == data2){
                this.addError(message.format({value: data}));
                return;
            }
        }
    }
}
