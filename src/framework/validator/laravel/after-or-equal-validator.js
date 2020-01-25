Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.AfterOrEqualValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * <p>The field under validation must be a value <code>after</code> or <code>equal</code> to the given <code>date</code>.</p>
     * <p>For more information, see the after rule.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.AfterOrEqualValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.AfterOrEqualValidator#value
     * @type {*}
     * @description
     * <p>This option is required.<p>
     * <p>It defines the value to compare to.<p>
     * <p>The data type could be <code>string</code>, <code>number</code> or <code>date</code>.<p>
     */

    var AfterOrEqualValidator = function (data, options, optionRules, lang, internal) {
        abv.GreaterThanOrEqualValidator.call(this, data, {
            message: "The %%attribute%% must be a date after or equal to %%date%%.",
            value: options.value
        }, {
            value: 'required|type:{"type":["date","date-string"],"any":true}'
        }, lang, internal);

        this.name = 'AfterOrEqualValidator';
    };
    AfterOrEqualValidator.prototype = Object.create(abv.GreaterThanOrEqualValidator.prototype);
    AfterOrEqualValidator.prototype.constructor = AfterOrEqualValidator;

    Object.defineProperty(AfterOrEqualValidator.prototype, 'alias', {
        get: function () {
            return [
                'after_or_equal',
                'after-or-equal'
            ];
        }
    });

    Object.defineProperty(AfterOrEqualValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'value',
                    'type': 'date'
                }
            ];
        }
    });

    Object.assign(AfterOrEqualValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.AfterOrEqualValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'attribute': 'value',
                'date': this.data
            }
        }
    });

    return {
        AfterOrEqualValidator: AfterOrEqualValidator
    };
}());

abv.registry(abv.AfterOrEqualValidator);