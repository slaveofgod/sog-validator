Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IsTrueValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is true.</p>
     * <p>Specifically, this checks if the value is exactly <code>true</code>, exactly the integer <code>1</code>, or exactly the string <code>"1"</code>.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.IsTrueValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.IsTrueValidator#message
     * @type {String}
     * @description
     * <p>This message is shown if the underlying data is not true.</p>
     * <p>Default: "<code>This value should be true.</code>"</p>
     * <p>You can use the following parameters in this message:</p>
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td><code>%%value%%</code></td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var IsTrueValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be true.';

        this.name = 'IsTrueValidator';
    };
    IsTrueValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    IsTrueValidator.prototype.constructor = IsTrueValidator;

    Object.defineProperty(IsTrueValidator.prototype, 'alias', {
        get: function () {
            return ['is-true', 'true'];
        }
    });

    Object.assign(IsTrueValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IsTrueValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (
                true !== this.data
                && 1 !== this.data
                && '1' !== this.data
            ) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.IsTrueValidator#__messageParameters
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
        IsTrueValidator: IsTrueValidator
    };
}());

abv.registry(abv.IsTrueValidator);