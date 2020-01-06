Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AllValidator
     * @extends abv.AbstractValidator
     * @classdesc Validates that a value is valid according to list of validation rules.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} rules Validation rules.
     * @param {Object} options The setting options.
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
        this.__setName('AllValidator');

        this.__configure();
    };
    AllValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    AllValidator.prototype.constructor = AllValidator;

    Object.assign(AllValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AllValidator#configure
         * @description Configure validator
         */
        __configure: function () {
            var validationRules = this.rules;
            if ('string' === typeof this.rules) {
                var validationRules = abv.parseRulesFromJsonFormat(this.rules);
            }

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
            var validator = abv.createValidator(this.data, name, options, this.lang, this.__internal);

            this.__validatorCollection.push(validator);
        },

        /**
         * @private
         * @function
         * @name abv.AllValidator#validate
         * @description Validate data
         */
        validate: function () {
            for (var key in this.__validatorCollection) {
                if (!this.__validatorCollection.hasOwnProperty(key)) continue;

                if (false === this.__validatorCollection[key].isValid()) {
                    this.__setErrorMessage(this.__validatorCollection[key].errorMessage());
                    break ;
                }
            }
        }
    });

    return {
        AllValidator: AllValidator
    };
}());