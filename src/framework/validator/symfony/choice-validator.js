Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.ChoiceValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is <code>blank</code> - meaning equal to an empty <code>string</code> or <code>null</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>choice</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ChoiceValidator(["Liam", "Noah", "William", "James"], {
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
     * @name sogv.ChoiceValidator#callback
     * @type {String|Array|Closure}
     * @description This is a callback method that can be used instead of the choices option to return the choices array.
     */

    /**
     * @name sogv.ChoiceValidator#choices
     * @type {Array}
     * @description
     * <p>A required option (unless callback is specified) - this is the array of options that should be considered in the valid set.</p>
     * <p>The input value will be matched against this array.</p>
     */

    /**
     * @name sogv.ChoiceValidator#max
     * @type {Integer}
     * @description
     * <p>If the multiple option is true, then you can use the max option to force no more than XX number of values to be selected.</p>
     * <p>For example, if max is 3, but the input array contains 4 valid items, the validation will fail.</p>
     */

    /**
     * @name sogv.ChoiceValidator#maxMessage
     * @type {String}
     * @description
     * <p>This is the validation error message that's displayed when the user chooses too many options per the max option.</p>
     * <p>Default: "<code>You must select at most {{ limit }} choices.</code>"</p>
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
     *             <td><code>%%limit%%</code></td>
     *             <td>Max count of selected options</td>
     *         </tr>
     *         <tr>
     *             <td><code>%%choices%%</code></td>
     *             <td>A comma-separated list of available choices</td>
     *         </tr>
     *         <tr>
     *             <td><code>%%value%%</code></td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name sogv.ChoiceValidator#message
     * @type {String}
     * @description
     * <p>This is the message that you will receive if the multiple option is set to false and the underlying value is not in the valid array of choices.</p>
     * <p>Default: "<code>The value you selected is not a valid choice.</code>"</p>
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

    /**
     * @name sogv.ChoiceValidator#min
     * @type {Integer}
     * @description
     * If the multiple option is true, then you can use the min option to force at least XX number of values to be selected.
     * For example, if min is 3, but the input array only contains 2 valid items, the validation will fail.
     */

    /**
     * @name sogv.ChoiceValidator#minMessage
     * @type {String}
     * @description
     * <p>This is the validation error message that's displayed when the user chooses too few choices per the min option.</p>
     * <p>Default: "<code>You must select at least {{ limit }} choices.</code>"</p>
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
     *             <td><code>%%limit%%</code></td>
     *             <td>Min count of selected options</td>
     *         </tr>
     *         <tr>
     *             <td><code>%%choices%%</code></td>
     *             <td>A comma-separated list of available choices</td>
     *         </tr>
     *         <tr>
     *             <td><code>%%value%%</code></td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name sogv.ChoiceValidator#multiple
     * @type {Boolean}
     * @description
     * If this option is true, the input value is expected to be an array instead of a single, scalar value.
     * The constraint will check that each value of the input array can be found in the array of valid choices.
     * If even one of the input values cannot be found, the validation will fail.
     * Default: <code>false</code>
     */

    /**
     * @name sogv.ChoiceValidator#multipleMessage
     * @type {String}
     * @description
     * <p>This is the message that you will receive if the multiple option is set to true and one of the values on the underlying array being checked is not in the array of valid choices.</p>
     * <p>Default: "<code>One or more of the given values is invalid.</code>"</p>
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

    var ChoiceValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            callback: optionRules.callback || 'type:{"type":["string","array","callable"],"any":true}',
            choices: optionRules.choices || 'type:{"type":"array"}',
            max: optionRules.max || 'type:{"type":"numeric"}',
            maxMessage: optionRules.maxMessage || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            min: optionRules.min || 'type:{"type":"numeric"}',
            minMessage: optionRules.minMessage || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            multiple: optionRules.multiple || 'type:{"type":"bool"}',
            multipleMessage: optionRules.multipleMessage || 'type:{"type":"string"}|length:{"min":3,"max":255}'
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
    ChoiceValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    ChoiceValidator.prototype.constructor = ChoiceValidator;

    Object.defineProperty(ChoiceValidator.prototype, 'alias', {
        get: function () {
            return [
                'choice'
            ];
        }
    });

    Object.defineProperty(ChoiceValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'max',
                    'type': 'numeric'
                }, {
                    'name': 'min',
                    'type': 'numeric'
                }, {
                    'name': 'multiple',
                    'type': 'boolean'
                }, {
                    'name': 'choices',
                    'type': 'array'
                },
            ];
        }
    });

    Object.assign(ChoiceValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.ChoiceValidator#__validate
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
         * @name sogv.ChoiceValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            if (false === sogv.isType('array', this.choices) && 'undefined' === typeof this.callback) {
                throw new Error('Either "choices" or "callback" must be specified on constraint Choice');
            }

            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            if (true === this.multiple && false === sogv.isType('array', this.data)) {
                this.__setErrorMessage(sogv.sprintf("Expected argument of type '%s', '%s' given", 'Array', sogv.getType(this.data)));
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
         * @name sogv.ChoiceValidator#__multipleMessageParameters
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
         * @name sogv.ChoiceValidator#__minMessageParameters
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
         * @name sogv.ChoiceValidator#__maxMessageParameters
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
         * @name sogv.ChoiceValidator#__messageParameters
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

sogv.registry(sogv.ChoiceValidator);