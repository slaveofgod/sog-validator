Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.Application
     * @classdesc A abv.Application represents and manages your Validation application.
     * @description Create a new Application.
     * @param {Object} options
     * @example
     * var validationEngine = new abv.Application({
     *     lang: 'en'
     * });
     *
     * var form = validationEngine.make({
     *   name: 'required',
     *   name: 'required',
     *   email: 'required|email',
     *   birthday: 'required',
     *   creditCard: 'required',
     *   ip: 'required',
     *   locale: 'required',
     *   country: 'required',
     *   language: 'required',
     *   homepage: 'required'
     * }, {
     *   name: 'Leo Lane',
     *   email: 'leo.lane38@example.com',
     *   birthday: '03.07.1977',
     *   creditCard: '4111111111111111',
     *   ip: '8.8.8.8',
     *   locale: 'cy_GB',
     *   country: 'US',
     *   language: 'en_gb',
     *   homepage: 'https://github.com//slaveofgod/sog-validator'
     * });
     *
     * if (false === form.get('name').isValid()) {
     *   form.get('name').errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.Application#lang
     * @type {String}
     * @description
     * <p>The language used by the application.</p>
     * <p>Defaults to 'en' ({@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes|List of ISO 639-1 codes}).</p>
     * @example
     * // Set the language for the application
     * this.app.lang = 'en';
     */

    /**
     * @name abv.Application#internal
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
         * @type {abv.Application|Undefined}
         * @name abv.app
         * @description Gets the current application, if any.
         */
        abv.app = this;

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
         * @name abv.Application#make
         * @description Create validators for all the fields
         * @param {Object} data The data which needs to be validated
         * @param {Object} rules The validation rules
         * @returns {abv.ValidatorHandler}
         */
        make: function (data, rules) {
            var validators = new abv.ValidatorHandler();

            for (var key in rules) {
                if (!rules.hasOwnProperty(key)) continue;

                validators.add(key, new abv.AllValidator(data[key], rules[key], {
                    lang: this.lang,
                    internal: this.internal
                }));
            }

            return validators;
        },

        /**
         * @function
         * @name abv.Application#makeSingle
         * @description Create single validator
         * @param {*} data The data which needs to be validated
         * @param {String} rules The validation rules
         * @example
         * var validationEngine = new abv.Application({
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
            var validator =  new abv.AllValidator(data, rules, {
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
