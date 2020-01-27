Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.InValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be <code>included</code> in the given list of values.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.InValidator("Liam", [
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
     * @name abv.ChoiceValidator#choices
     * @type {Array}
     * @description
     * <p>A required option - this is the array of options that should be considered in the valid set.</p>
     * <p>The input value will be matched against this array.</p>
     */

    var InValidator = function (data, options, optionRules, lang, internal) {
        abv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            choices: optionRules.choices || 'required|type:{"type":"array"}',
        }, lang, internal);

        this.message = this.__options.message || 'The selected %%attribute%% is invalid.';
        this.choices = this.__options.choices;
        this.min = 1;

        this.name = 'InValidator';
    };
    InValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    InValidator.prototype.constructor = InValidator;

    Object.defineProperty(InValidator.prototype, 'alias', {
        get: function () {
            return [
                'in'
            ];
        }
    });

    Object.defineProperty(InValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'choices',
                    'type': 'array'
                },
            ];
        }
    });

    Object.assign(InValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.InValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            var status = abv.isValid(this.data, {'choice': {
                "choices": this.choices,
                "min": this.min
            }}, true);

            if(false === status) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.InValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
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
         * @name abv.InValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value'
            }
        }
    });

    return {
        InValidator: InValidator
    };
}());

abv.registry(abv.InValidator);