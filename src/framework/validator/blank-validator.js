Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.BlankValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is blank - meaning equal to an empty string or <code class="notranslate">null</code>.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.BlankValidator(data);
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.BlankValidator#message
     * @type {String}
     * @description This is the message that will be shown if the value is not blank. Default: "This value should be blank."
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

    var BlankValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value should be blank.';

        this.name = 'BlankValidator';
    };
    BlankValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    BlankValidator.prototype.constructor = BlankValidator;

    Object.defineProperty(BlankValidator.prototype, 'alias', {
        get: function () {
            return 'blank';
        }
    });

    Object.assign(BlankValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.BlankValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (
                '' !== this.data
                && null !== this.data
            ) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.BlankValidator#__messageParameters
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
        BlankValidator: BlankValidator
    };
}());

abv.registry(abv.BlankValidator);