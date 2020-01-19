abv.I18nResource = [];

/**
 * @namespace
 * @name abv.I18nHandler
 * @description I18n handler
 */
abv.I18nHandler = {

    /**
     * @function
     * @name abv.I18nHandler#add
     * @description Add new message or messages to global collection for specific language.
     * @param {String} lang The current language
     * @param {Array} messages Message or messages
     * @example
     * abv.I18nHandler.add('fr', [{
     *     "source": "The value you selected is not a valid choice.",
     *     "target": "Cette valeur doit être l'un des choix proposés."
     * }]);
     *
     * // The first part of the message: "You must select at least %%limit%% choice." - this is the singular form
     * // The second part of the message: "You must select at least %%limit%% choices." - this is the plural form
     * // The form depends on value of "%%limit%%". If value "1", "0" or "-1" - singular form, otherwise - plural form
     * abv.I18nHandler.add('fr', [{
     *     "source": "You must select at least %%limit%% choice.|You must select at least %%limit%% choices.",
     *     "target": "Vous devez sélectionner au moins %%limit%% choix.|Vous devez sélectionner au moins %%limit%% choix."
     * }]);
     */
    add: function (lang, messages) {
        var validationEngine = new abv.Application();
        var form = validationEngine.make({
            lang: 'required|language',
            messages: 'required|type:{"type":"iterable"}',
        }, {
            lang: lang,
            messages: messages,
        });

        var error = form.isValidWithErrorMessage();
        if (null !== error) {
            throw new Error(error);
        }


        for (var i = 0; i < messages.length; i ++) {
            var message = messages[i];

            if ('undefined' === typeof abv.I18nResource[lang]) {
                abv.I18nResource[lang] = [];
            }

            abv.I18nResource[lang].push(message);
        }
    },

    /**
     * @function
     * @name abv.I18nHandler#get
     * @description Get translated message for specific language by origin message.
     * @param {String} lang The current language
     * @param {String} sourceMessage The source message
     * @returns {String|Null} The translated message
     */
    get: function (lang, sourceMessage) {
        var resource = abv.I18nResource[lang];

        for (var i = 0; i < resource.length; i ++) {
            if (
                sourceMessage === resource[i]['source']
                || resource[i]['source'].includes(sourceMessage)
            ) {
                return resource[i]['target'];
            }
        }

        return null;
    },

    /**
     * @function
     * @name abv.I18nHandler#prepare
     * @description Prepare message
     * @param {String} message Message text
     * @param {Object} parameters Message parameters
     * @returns {String} Processed message
     */
    prepare: function (message, parameters) {
        parameters = parameters || {};

        for (var key in parameters) {
            if (!parameters.hasOwnProperty(key)) continue;

            message = message.replace("%%" + key + "%%", parameters[key]);
        }

        return message;
    }
};