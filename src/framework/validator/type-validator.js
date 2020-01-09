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
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.TypeValidator(data, {type: 'array'});
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

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
     * @name abv.TypeValidator#any
     * @type {Boolean}
     * @description
     * If true, one of data type needs to be valid, otherwise passed data should be valid for all types.
     * Defaults to false
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

    var TypeValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            type: 'type:{"type":"stringOrArray"}',
            message: 'length:{"min":3,"max":255}',
            any: 'type:{"type":"boolean"}'
        }, lang, internal);

        this.type = this.__options.type || 'string';
        this.message = this.__options.message || 'This value should be of type %%type%%.';
        this.any = (true === this.__options.any);

        this.__setName('TypeValidator');
        this.__invalidType = null;
    };
    TypeValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    TypeValidator.prototype.constructor = TypeValidator;

    Object.defineProperty(TypeValidator.prototype, 'name', {
        get: function () {
            return this.__getName();
        }
    });

    Object.assign(TypeValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.TypeValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if ('undefined' === typeof this.data) {
                return ;
            }

            var types = this.type;
            if ('string' === typeof this.type) {
                types = [this.type];
            }

            if (true === this.any) {
                this.__validateAnyTypes(types);
            } else {
                this.__validateAllTypes(types);
            }
        },

        /**
         * @private
         * @function
         * @name abv.TypeValidator#__validateAllTypes
         * @param {Array} types Types
         * @description Check if all types is valid for the data
         */
        __validateAllTypes: function (types) {
            for (var key in types) {
                if (!types.hasOwnProperty(key)) continue;

                if (false === abv.isType(types[key], this.data)) {
                    this.__invalidType = types[key];
                    this.__setErrorMessage(this.message, this.__messageParameters());
                    return ;
                }
            }

            return ;
        },

        /**
         * @private
         * @function
         * @name abv.TypeValidator#__validateAnyTypes
         * @param {Array} types Types
         * @description Check if at least one of the types is valid for the data
         */
        __validateAnyTypes: function (types) {
            for (var key in types) {
                if (!types.hasOwnProperty(key)) continue;

                if (true === abv.isType(types[key], this.data)) {
                    return ;
                }
            }

            this.__invalidType = types[key];
            this.__setErrorMessage(this.message, this.__messageParameters());

            return ;
        },

        /**
         * @private
         * @function
         * @name abv.TypeValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
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