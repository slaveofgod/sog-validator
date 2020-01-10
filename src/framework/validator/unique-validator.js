Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.UniqueValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * Validates that all the elements of the given collection are unique (none of them is present more than once).
     * Elements are compared strictly, so '7' and 7 are considered different elements (a string and an integer, respectively).
     * It can be a string or array.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.UniqueValidator(data);
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.UniqueValidator#message
     * @type {String}
     * @description
     * This is the message that will be shown if at least one element is repeated in the collection.
     * Defaults to "This collection should contain only unique elements."
     * You can use the following parameters in this message:
     * <table>
     *     <tr>
     *         <td><b>Parameter</b></td>
     *         <td><b>Description</b></td>
     *     </tr>
     *     <tr>
     *         <td>%%value%%</td>
     *         <td>The repeated value</td>
     *     </tr>
     * </table>
     */

    var UniqueValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This collection should contain only unique elements.';

        // Repeated elements
        this.__repeated = [];

        this.__setName('UniqueValidator');
    };
    UniqueValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    UniqueValidator.prototype.constructor = UniqueValidator;

    Object.defineProperty(UniqueValidator.prototype, 'name', {
        get: function () {
            return this.__getName();
        }
    });

    Object.assign(UniqueValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.UniqueValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            // Check if empty
            if ('undefined' === typeof this.data || null === this.data || '' === this.data) {
                return ;
            }

            if (
                true === abv.isType('string', this.data)
                || true === abv.isType('array', this.data)
            ) {
                this.__validateArray();
            } else if (true === abv.isType('object', this.data)) {
                this.__validateObject();
            }

            if (this.__repeated.length > 0) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.UniqueValidator#__validateArray
         * @description Validate array data
         */
        __validateArray: function () {
            var counter = {};

            for (var i = 0; i < this.data.length; i ++) {
                var key = (typeof this.data[i]) + " '" + this.data[i] + "'";
                if ('undefined' === typeof counter[key]) {
                    counter[key] = 0;
                }

                counter[key] ++;

                if (
                    false === this.__repeated.includes(key)
                    && counter[key] > 1
                ) {
                    this.__repeated.push(key);
                }
            }
        },

        /**
         * @private
         * @function
         * @name abv.UniqueValidator#__validateObject
         * @description Validate object data
         */
        __validateObject: function () {
            console.log(1111111);
        },

        /**
         * @private
         * @function
         * @name abv.UniqueValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if value is scalar
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"iterable"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.UniqueValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': JSON.stringify(this.__repeated)
            }
        }
    });

    return {
        UniqueValidator: UniqueValidator
    };
}());