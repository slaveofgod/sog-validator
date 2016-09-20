/**
 * This constraint is used when the underlying data is a collection (i.e. an array or an object that implements Traversable and ArrayAccess), but you'd like to validate different keys of that collection in different ways.
 * For example, you might validate the email key using the Email constraint and the inventory key of the collection with the Range constraint.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './Validator';

export default class extends Validator {
    constructor({
    }) {
        super(arguments);

        this.configuring();
    }

    configuring() {
        this.setDefaultMessages({
        });

        this.setDefaultParameters({
        });
    }

    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        throw new Error(`Validator is not implemented`);
    }
}