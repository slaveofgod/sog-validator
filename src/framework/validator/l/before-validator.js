Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.BeforeValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be a value before a given <code>date</code>.</p>
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
     * <p>Defined aliases: ['<code>before</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.BeforeValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.BeforeValidator#value
     * @type {*}
     * @description
     * <p>This option is required.</p>
     * <p>It defines the value to compare to.</p>
     * <p>The data type could be <code>string</code>, <code>number</code> or <code>date</code>.<p>
     */

    var BeforeValidator = function (data, options, optionRules, lang, internal) {
        sogv.LessThanValidator.call(this, data, {
            message: "The %%attribute%% must be a date before %%date%%.",
            value: options.value
        }, {
            value: 'required|type:{"type":["date","date-string"],"any":true}'
        }, lang, internal);

        this.name = 'BeforeValidator';
    };
    BeforeValidator.prototype = Object.create(sogv.LessThanValidator.prototype);
    BeforeValidator.prototype.constructor = BeforeValidator;

    Object.defineProperty(BeforeValidator.prototype, 'alias', {
        get: function () {
            return [
                'before'
            ];
        }
    });

    Object.defineProperty(BeforeValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'date-string'
                }
            ];
        }
    });

    Object.assign(BeforeValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.BeforeValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters.
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'date': this.data
            }
        }
    });

    return {
        BeforeValidator: BeforeValidator
    };
}());

sogv.registerValidator(sogv.BeforeValidator);