Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IsFalseValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is false. Specifically, this checks to see if the value is exactly <code class="notranslate">false</code>, exactly the integer <code class="notranslate">0</code>, or exactly the string <code class="notranslate">"0"</code>.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.IsFalseValidator(data);
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.IsFalseValidator#message
     * @type {String}
     * @description This message is shown if the underlying data is not false. Default: "This value should be false."
     * You can use the following parameters in this message:
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td>%%value%%</td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var IsFalseValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be false.';

        this.name = 'IsFalseValidator';
    };
    IsFalseValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    IsFalseValidator.prototype.constructor = IsFalseValidator;

    Object.defineProperty(IsFalseValidator.prototype, 'alias', {
        get: function () {
            return ['is-false', 'false'];
        }
    });

    Object.assign(IsFalseValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IsFalseValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (
                false !== this.data
                && 0 !== this.data
                && '0' !== this.data
            ) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.IsFalseValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': this.data
            }
        }
    });

    return {
        IsFalseValidator: IsFalseValidator
    };
}());

abv.registry(abv.IsFalseValidator);