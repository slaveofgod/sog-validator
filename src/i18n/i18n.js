abv.I18nResource = [];

Object.assign(abv, (function () {

    /**
     * @constructor
     * @name abv.I18n
     * @classdesc Handles translation. Responsible for the translation. Can also handle plural forms.
     * @property {String} lang The current language. This parameter is required.
     * @example
     * var translator = new abv.I18n('en');
     * var translatedMessage = translator.getText(message);
     */

    // PROPERTIES

    /**
     * @name abv.Application#lang
     * @type {String}
     * @description The language used for translation. Defaults to 'en' ({@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes|List of ISO 639-1 codes}).
     * @example
     * // Set the language for the application
     * this.app.lang = 'en';
     */

    var I18n = function (lang) {

        this.lang = lang || 'en';

        if ('undefined' === typeof abv.I18nResource[this.lang]) {
            throw new Error('Current language "' + this.lang + '" does not supported');
        }
    };

    Object.assign(I18n.prototype, {
        /**
         * @function
         * @name abv.I18n#getText
         * @description Returns the translation.
         * @param {String} message The message which need to be translated
         * @param {Object} parameters The message parameters
         * @returns {String} Translated and processed message
         */
        getText: function (message, parameters) {
            var translation = this.__find(message);
            if (null === translation) {
                translation = message;
            }

            // Processing plural or singular forms
            if (translation.includes('|')) {
                var translations = translation.split('|');
                if (
                    0 === parameters.limit
                    || 1 === parameters.limit
                    || - 1 === parameters.limit
                ) {
                    translation = translations[0];
                } else {
                    translation = translations[1];
                }
            }

            return this.__prepare(translation, parameters);
        },

        /**
         * @private
         * @function
         * @name abv.I18n#__find
         * @description Translate message
         * @param {String} message Message text
         * @returns {String|Null} Translated message
         */
        __find: function (message) {
            var resource = abv.I18nResource[this.lang];

            for (var i = 0; i < resource.length; i ++) {
                if (
                    message === resource[i]['source']
                    || resource[i]['source'].includes(message)
                ) {
                    return resource[i]['target'];
                }
            }

            return null;
        },

        /**
         * @private
         * @function
         * @name abv.I18n#__prepare
         * @description Prepare message
         * @param {String} message Message text
         * @param {Object} parameters Message parameters
         * @returns {String} Processed message
         */
        __prepare: function (message, parameters) {
            parameters = parameters || {};

            for (var key in parameters) {
                if (!parameters.hasOwnProperty(key)) continue;

                message = message.replace("%%" + key + "%%", parameters[key]);
            }

            return message;
        }
    });

    return {
        I18n: I18n
    };
}()));