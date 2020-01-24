Object.assign(abv, (function () {

    /**
     * @constructor
     * @name abv.I18n
     * @classdesc
     * <p>Handles translation. Responsible for the translation. Can also handle plural forms.</p>
     * @param {String} lang The current language. This parameter is required.
     * @example
     * var translator = new abv.I18n(lang);
     * var translatedMessage = translator.getText(message, parameters);
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