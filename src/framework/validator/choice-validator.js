Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.ChoiceValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is blank - meaning equal to an empty string or <code class="notranslate">null</code>.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.ChoiceValidator(["Liam", "Noah", "William", "James"], {
     *     'choice': {
     *         "choices": [
     *             "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
     *             "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
     *             "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
     *             "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
     *         ],
     *         "multiple": true,
     *         "min": 5
     *     }
     * });
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.ChoiceValidator#callback
     * @type {String|Array|Closure}
     * @description This is a callback method that can be used instead of the choices option to return the choices array.
     */

    /**
     * @name abv.ChoiceValidator#choices
     * @type {Array}
     * @description
     * A required option (unless callback is specified) - this is the array of options that should be considered in the valid set.
     * The input value will be matched against this array.
     */

    /**
     * @name abv.ChoiceValidator#max
     * @type {Integer}
     * @description
     * If the multiple option is true, then you can use the max option to force no more than XX number of values to be selected.
     * For example, if max is 3, but the input array contains 4 valid items, the validation will fail.
     */

    /**
     * @name abv.ChoiceValidator#maxMessage
     * @type {String}
     * @description
     * This is the validation error message that's displayed when the user chooses too many options per the max option.
     * Default: "You must select at most {{ limit }} choices."
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
     *             <td>%%limit%%</td>
     *             <td>Max count of selected options</td>
     *         </tr>
     *         <tr>
     *             <td>%%choices%%</td>
     *             <td>A comma-separated list of available choices</td>
     *         </tr>
     *         <tr>
     *             <td>%%value%%</td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name abv.ChoiceValidator#message
     * @type {String}
     * @description
     * This is the message that you will receive if the multiple option is set to false and the underlying value is not in the valid array of choices.
     * Default: "The value you selected is not a valid choice."
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

    /**
     * @name abv.ChoiceValidator#min
     * @type {Integer}
     * @description
     * If the multiple option is true, then you can use the min option to force at least XX number of values to be selected.
     * For example, if min is 3, but the input array only contains 2 valid items, the validation will fail.
     */

    /**
     * @name abv.ChoiceValidator#minMessage
     * @type {String}
     * @description
     * This is the validation error message that's displayed when the user chooses too few choices per the min option.
     * Default: "You must select at least {{ limit }} choices."
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
     *             <td>%%limit%%</td>
     *             <td>Min count of selected options</td>
     *         </tr>
     *         <tr>
     *             <td>%%choices%%</td>
     *             <td>A comma-separated list of available choices</td>
     *         </tr>
     *         <tr>
     *             <td>%%value%%</td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name abv.ChoiceValidator#multiple
     * @type {Boolean}
     * @description
     * If this option is true, the input value is expected to be an array instead of a single, scalar value.
     * The constraint will check that each value of the input array can be found in the array of valid choices.
     * If even one of the input values cannot be found, the validation will fail.
     * Default: false
     */

    /**
     * @name abv.ChoiceValidator#multipleMessage
     * @type {String}
     * @description
     * This is the message that you will receive if the multiple option is set to true and one of the values on the underlying array being checked is not in the array of valid choices.
     * Default: "One or more of the given values is invalid."
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

    var ChoiceValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            callback: 'type:{"type":["string","array","callable"],"any":true}',
            choices: 'type:{"type":"array"}',
            max: 'type:{"type":"numeric"}',
            maxMessage: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            min: 'type:{"type":"numeric"}',
            minMessage: 'type:{"type":"string"}|length:{"min":3,"max":255}',
            multiple: 'type:{"type":"bool"}',
            multipleMessage: 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.callback = this.__options.callback;
        this.choices = this.__options.choices;
        this.max = this.__options.max;
        this.maxMessage = this.__options.maxMessage || 'You must select at most %%limit%% choices.';
        this.message = this.__options.message || 'The value you selected is not a valid choice.';
        this.min = this.__options.min;
        this.minMessage = this.__options.minMessage || 'You must select at least %%limit%% choices.';
        this.multiple = (true === this.__options.multiple);
        this.multipleMessage = this.__options.multipleMessage || 'One or more of the given values is invalid.';

        this.__currentInvalidDataItem = null;

        this.name = 'ChoiceValidator';
    };
    ChoiceValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    ChoiceValidator.prototype.constructor = ChoiceValidator;

    Object.defineProperty(ChoiceValidator.prototype, 'alias', {
        get: function () {
            return 'choice';
        }
    });

    Object.assign(ChoiceValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.ChoiceValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            if (true === this.multiple) {
                for (var key in this.value) {
                    if (!this.value.hasOwnProperty(key)) continue;
                    if(false === this.choices.includes(this.value[key])) {
                        this.__currentInvalidDataItem = this.value[key];
                        this.__setErrorMessage(this.multipleMessage, this.__multipleMessageParameters());
                        return ;
                    }
                }

                var count = this.data.length;

                if (this.min && count < this.min) {
                    this.__setErrorMessage(this.minMessage, this.__minMessageParameters());
                    return ;
                }

                if (this.max && count > this.max) {
                    this.__setErrorMessage(this.maxMessage, this.__maxMessageParameters());
                    return ;
                }
            } else if (false === this.choices.includes(this.data)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.ChoiceValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            if (false === abv.isType('array', this.choices) && 'undefined' === typeof this.callback) {
                throw new Error('Either "choices" or "callback" must be specified on constraint Choice');
            }

            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            if (true === this.multiple && false === abv.isType('array', this.data)) {
                this.__setErrorMessage(abv.sprintf("Expected argument of type '%s', '%s' given", 'Array', abv.getType(this.data)));
                this.__skip = true;
                return ;
            }

            if (this.callback) {
                try {
                    this.choices = this.callback.call();
                } catch (e) {
                    throw new Error('The Choice constraint expects a valid callback');
                }
            }
        },

        /**
         * @private
         * @function
         * @name abv.ChoiceValidator#__multipleMessageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __multipleMessageParameters: function () {
            return {
                'value': this.__currentInvalidDataItem
            }
        },

        /**
         * @private
         * @function
         * @name abv.ChoiceValidator#__minMessageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __minMessageParameters: function () {
            return {
                'limit': this.min,
                'choices': JSON.stringify(this.choices),
                'value': JSON.stringify(this.data)
            }
        },

        /**
         * @private
         * @function
         * @name abv.ChoiceValidator#__maxMessageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __maxMessageParameters: function () {
            return {
                'limit': this.max,
                'choices': JSON.stringify(this.choices),
                'value': JSON.stringify(this.data)
            }
        },

        /**
         * @private
         * @function
         * @name abv.ChoiceValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': JSON.stringify(this.data)
            }
        }
    });

    return {
        ChoiceValidator: ChoiceValidator
    };
}());

abv.registry(abv.ChoiceValidator);