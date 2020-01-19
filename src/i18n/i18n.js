Object.assign(abv, (function () {

    /**
     * @constructor
     * @name abv.I18n
     * @classdesc Handles translation. Responsible for the translation. Can also handle plural forms.
     * @property {String} lang The current language. This parameter is required.
     * @example
     * var translator = new abv.I18n(language);
     * var translatedMessage = translator.getText(message, parameters);
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
    };

    Object.assign(I18n.prototype, {
        /**
         * @function
         * @name abv.I18n#translate
         * @description Returns the translation.
         * @param {String} message The message which need to be translated
         * @param {Object} parameters The message parameters
         * @returns {String} Translated and processed message
         */
        translate: function (message, parameters) {
            var translation = abv.I18nHandler.get(this.lang, message);
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

            return abv.I18nHandler.prepare(translation, parameters);
        }
    });

    return {
        I18n: I18n
    };
}()));