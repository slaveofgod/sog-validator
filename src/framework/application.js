Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.Application
     * @classdesc A sogv.Application represents and manages your Validation application.
     * @description Create a new Application.
     * @param {Object} options The setting options
     * @example
     * var validationEngine = new sogv.Application({
     *     lang: 'en'
     * });
     *
     * var form = validationEngine.make({
     *   first_name: 'Leo',
     *   last_lame: 'Lane',
     *   email: 'leo.lane38@example.com',
     *   birthday: '1977-03-07',
     *   creditCard: '4111111111111111',
     *   ip: '8.8.8.8',
     *   locale: 'cy_GB',
     *   country: 'US',
     *   language: 'en_gb',
     *   homepage: 'https://github.com//slaveofgod/sog-validator'
     * }, {
     *   first_name: 'required|string|length:{"min":2,"max":255}',
     *   last_lame: 'required|string|length:{"min":2,"max":255}',
     *   email: 'required|email',
     *   birthday: 'required|date',
     *   creditCard: 'required|string|card-scheme:{"schemes":["VISA"]}',
     *   ip: 'required|string|ip',
     *   locale: 'required|string|locale',
     *   country: 'required|string|country',
     *   language: 'required|string|language',
     *   homepage: 'required|string|url'
     * });
     *
     * if (false === form.isValid()) {
     *     if (false === form.get('name').isValid()) {
     *         form.get('name').errors().first();
     *     }
     *     // ...
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.Application#lang
     * @type {String}
     * @description
     * <p>The language used by the application.</p>
     * <p>Defaults to 'en' ({@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes|List of ISO 639-1 codes}).</p>
     * @example
     * // Set the language for the application
     * this.app.lang = 'en';
     */

    /**
     * @name sogv.Application#internal
     * @type {Boolean}
     * @description If this parameter is true, it means, that validation called from core.
     */

    var Application = function (options) {

        options = options || {};

        this.lang = options.lang || 'en';
        this.internal = (true === options.internal);

        /**
         * @private
         * @static
         * @type {sogv.Application|Undefined}
         * @name sogv.app
         * @description Gets the current application, if any.
         */
        sogv.app = this;

        this.name = 'Application';
    };
    Application.prototype.constructor = Application;

    Object.defineProperty(Application.prototype, 'alias', {
        get: function () {
            return 'Application';
        }
    });

    Object.assign(Application.prototype, {
        /**
         * @function
         * @name sogv.Application#make
         * @description Create validators for all the fields
         * @param {Object} data The data which needs to be validated
         * @param {Object} rules The validation rules
         * @returns {sogv.ValidatorHandler}
         */
        make: function (data, rules) {
            var validators = new sogv.ValidatorHandler();

            for (var key in rules) {
                if (!rules.hasOwnProperty(key)) continue;

                validators.add(key, new sogv.AllValidator(data[key], rules[key], {
                    lang: this.lang,
                    internal: this.internal
                }));
            }

            return validators;
        },

        /**
         * @function
         * @name sogv.Application#makeSingle
         * @description Create single validator
         * @param {*} data The data which needs to be validated
         * @param {String} rules The validation rules
         * @example
         * var validationEngine = new sogv.Application({
         *     lang: 'en'
         * });
         *
         * validator = validationEngine.makeSingle(
         *     'leo.lane38@example.com',
         *     'required|email'
         * );
         *
         * if (false === validator.isValid()) {
         *     validator.errors().first();
         * }
         * @returns {Object} Validator object
         */
        makeSingle: function (data, rules) {
            var validator =  new sogv.AllValidator(data, rules, {
                lang: this.lang,
                internal: this.internal
            });

            return validator;
        }
    });

    return {
        Application: Application
    };
}());
