Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AllValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is valid according to list of validation rules.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} rules Validation rules.
     * @param {Object} options The setting options.
     * @example
     * var rules = 'required|email';
     * var data = 'iamtheslaveofgod@gmail.com'
     * var validator = new abv.AllValidator(data, rules, {
     *      lang: 'en'
     * });
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.AllValidator#rules
     * @type {String}
     * @description Validation rules.
     */

    var AllValidator = function (data, rules, options) {
        abv.AbstractValidator.call(this, data, options, null,
            ((options && options['lang']) ? options['lang'] : null),
            (options && true === options['internal'])
        );

        this.rules = rules;

        this.__validatorCollection = [];

        this.name = 'AllValidator';

        this.__configure();
    };
    AllValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    AllValidator.prototype.constructor = AllValidator;

    Object.defineProperty(AllValidator.prototype, 'alias', {
        get: function () {
            return 'all';
        }
    });

    Object.defineProperty(AllValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(AllValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AllValidator#configure
         * @description Configure validator
         */
        __configure: function () {
            var validationRules = abv.ValidationSettingsHandler.parse(this.rules);
            for (var key in validationRules) {
                if (!validationRules.hasOwnProperty(key)) continue;

                this.add(key, validationRules[key]);
            }
        },

        /**
         * @function
         * @name abv.AllValidator#add
         * @description Add new validator
         * @param {String} name The validator name
         * @param {Object} options The validation settings
         */
        add: function (name, options) {
            var validator = abv.makeValidator(this.data, name, options, {}, this.lang, this.__internal);

            this.__validatorCollection.push(validator);
        },

        /**
         * @private
         * @function
         * @name abv.AllValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            for (var key in this.__validatorCollection) {
                if (!this.__validatorCollection.hasOwnProperty(key)) continue;

                if (false === this.__validatorCollection[key].isValid()) {
                    this.__setErrorMessage(this.__validatorCollection[key].errors().first());
                    break ;
                }
            }
        }
    });

    return {
        AllValidator: AllValidator
    };
}());