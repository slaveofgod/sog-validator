Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.NotInValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must <code>not be included</code> in the given list of values.</p>
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
     * <p>Defined aliases: ['<code>not_in</code>', '<code>not-in</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NotInValidator("Bob", [
     *   "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
     *   "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
     *   "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
     *   "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
     * ]);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.NotInValidator#choices
     * @type {Array}
     * @description
     * <p>A required option - this is the array of options that should be considered in the valid set.</p>
     * <p>The input value will be matched against this array.</p>
     */

    var NotInValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            choices: optionRules.choices || 'required|type:{"type":"array"}',
        }, lang, internal);

        this.message = this.__options.message || 'The selected %%attribute%% is invalid.';
        this.choices = this.__options.choices;
        this.min = 1;

        this.name = 'NotInValidator';
    };
    NotInValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    NotInValidator.prototype.constructor = NotInValidator;

    Object.defineProperty(NotInValidator.prototype, 'alias', {
        get: function () {
            return [
                'not_in',
                'not-in'
            ];
        }
    });

    Object.defineProperty(NotInValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'choices',
                    'type': 'array'
                },
            ];
        }
    });

    Object.assign(NotInValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.NotInValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            var status = sogv.isValid(this.data, {'choice': {
                "choices": this.choices,
                "min": this.min
            }}, true);

            if(true === status) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.NotInValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Cancel validation if data is empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            // Convert data to string
            try {
                if ('undefined' !== typeof this.data) {
                    this.data = this.data.toString();
                }
            } catch (e) {
                this.__setErrorMessage('This value ' + this.data + ' could not be converted to string.');
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.NotInValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
         */
        __messageParameters: function () {
            return {
                'attribute': 'value'
            }
        }
    });

    return {
        NotInValidator: NotInValidator
    };
}());

sogv.registerValidator(sogv.NotInValidator);