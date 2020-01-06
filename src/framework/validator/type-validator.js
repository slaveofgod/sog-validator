Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.TypeValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is of a specific data type.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @example
     * var validator = new abv.TypeValidator(data, {type: 'array'});
     * if (false === validator.isValid()) {
     *      validator.errorMessage();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.TypeValidator#data
     * @type {*}
     * @description Data that needs to be validated.
     */

    /**
     * @name abv.TypeValidator#lang
     * @type {String}
     * @description Language of error messages.
     */

    /**
     * @name abv.TypeValidator#type
     * @type {String|Array}
     * @description This required option defines the type or collection of types allowed for the given value.
     * The following types are available:
     * <ul>
     *     <li><b>array</b> - Finds whether a variable is an array</li>
     *     <li><b>bool</b>, <b>boolean</b> - Finds out whether a variable is a boolean</li>
     *     <li><b>callable</b> - Verify that the contents of a variable can be called as a function</li>
     *     <li><b>float</b> - Finds whether the type of a variable is float</li>
     *     <li><b>double</b> - Finds whether the type of a variable is double</li>
     *     <li><b>int</b>, <b>integer</b> - Find whether the type of a variable is integer</li>
     *     <li><b>iterable</b> - Verify that the contents of a variable is an iterable value</li>
     *     <li><b>null</b> - Finds whether a variable is NULL</li>
     *     <li><b>numeric</b> - Finds whether a variable is a number or a numeric string</li>
     *     <li><b>object</b> - Finds whether a variable is an object</li>
     *     <li><b>real</b> - Finds whether the type of a variable is real</li>
     *     <li><b>scalar</b> - Finds whether a variable is a scalar. <i>Scalar variables are those containing an integer, float, string or boolean.</i></li>
     *     <li><b>string</b> - Find whether the type of a variable is string</li>
     *     <li><b>alnum</b> - Check for alphanumeric character(s)</li>
     *     <li><b>alpha</b> - Check for alphabetic character(s)</li>
     *     <li><b>digit</b> - Check for numeric character(s)</li>
     *     <li><b>graph</b> - Check for any printable character(s) except space</li>
     *     <li><b>lower</b> - Check for lowercase character(s)</li>
     *     <li><b>print</b> - Check for printable character(s)</li>
     *     <li><b>punct</b> - Check for any printable character which is not whitespace or an alphanumeric character</li>
     *     <li><b>space</b> - Check for whitespace character(s)</li>
     *     <li><b>upper</b> - Check for uppercase character(s)</li>
     *     <li><b>xdigit</b> - Check for character(s) representing a hexadecimal digit</li>
     * </b></li>
     */

    /**
     * @name abv.TypeValidator#message
     * @type {String}
     * @description The message if the underlying data is not of the given type. Defaults to "This value should be of type %%type%%."
     * You can use the following parameters in this message:
     * <table>
     *     <tr>
     *         <td><b>Parameter</b></td>
     *         <td><b>Description</b></td>
     *     </tr>
     *     <tr>
     *         <td>%%type%%</td>
     *         <td>The expected type</td>
     *     </tr>
     *     <tr>
     *         <td>%%value%%</td>
     *         <td>The current (invalid) value</td>
     *     </tr>
     * </table>
     */

    var TypeValidator = function (data, options, lang) {
        abv.AbstractValidator.call(this);

        options = options || {};

        this.data = data;
        this.lang = lang || 'en';

        this.type = options.type || 'String';
        this.message = options.message || 'This value should be of type %%type%%.';

        this.__name = 'TypeValidator';
        this.__invalidType = null;
    };
    TypeValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    TypeValidator.prototype.constructor = TypeValidator;

    Object.assign(TypeValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.TypeValidator#validate
         * @description Validate data
         */
        validate: function () {
            if ('undefined' === typeof this.data) {
                return;
            }

            var types = this.type;
            if ('string' === typeof this.type) {
                types = [this.type];
            }

            for (var key in types) {
                if (!types.hasOwnProperty(key)) continue;

                if (false === abv.isType(types[key], this.data)) {
                    this.__invalidType = types[key];
                    this.__setErrorMessage(this.message, this.messageParameters());
                    break;
                }
            }
        },

        /**
         * @private
         * @function
         * @name abv.TypeValidator#messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        messageParameters: function () {
            return {
                'type': this.__invalidType,
                'value': this.data
            }
        }
    });

    return {
        TypeValidator: TypeValidator
    };
}());