Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.TypeValidator
     * @extends abv.ValidatorExtension
     * @classdesc Validates that a value is of a specific data type.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
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
     *     <li>array</li>
     *     <li>bool</li>
     *     <li>boolean</li>
     *     <li>callable</li>
     *     <li>float</li>
     *     <li>double</li>
     *     <li>int</li>
     *     <li>integer</li>
     *     <li>iterable</li>
     *     <li>null</li>
     *     <li>numeric</li>
     *     <li>object</li>
     *     <li>real</li>
     *     <li>scalar</li>
     *     <li>string</li>
     *     <li>alnum</li>
     *     <li>alpha</li>
     *     <li>digit</li>
     *     <li>graph</li>
     *     <li>lower</li>
     *     <li>print</li>
     *     <li>punct</li>
     *     <li>space</li>
     *     <li>upper</li>
     *     <li>xdigit</li>
     * </li>
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
        abv.ValidatorExtension.call(this);

        options = options || {};

        this.data = data;
        this.lang = lang || 'en';

        this.type = options.type || 'String';
        this.message = options.message || 'This value should be of type %%type%%.';

        this.__name = 'TypeValidator';
        this.__invalidType = null;
        this.__isValid = true;
        this.__errorMessage = null;
    };
    TypeValidator.prototype = Object.create(abv.ValidatorExtension.prototype);
    TypeValidator.prototype.constructor = TypeValidator;

    Object.assign(TypeValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.TypeValidator#validate
         * @description Validate data
         */
        validate: function () {
            var types = this.type.split('%');

            for (var key in types) {
                if (!types.hasOwnProperty(key)) continue;

                if (false === abv.isType(types[key], this.data)) {
                    this.__isValid = false;
                    this.__invalidType = types[key];
                    this.__errorMessage = this.prepareMessage(this.message, this.messageParameters());

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