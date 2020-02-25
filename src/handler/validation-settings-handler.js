/**
 * @namespace
 * @name sogv.ValidationSettingsHandler
 * @description
 * <p>Validation settings handler.</p>
 * <p>This handler provides different types of validation settings parsers (validator's name and settings).</p>
 * @example
 * var validators = sogv.ValidationSettingsHandler.parse('required|email:{"mode":"html5"}');
 */
sogv.ValidationSettingsHandler = {
    /**
     * @function
     * @name sogv.ValidationSettingsHandler#parse
     * @description Prepare validation settings
     * @param {String|JSON|Object} settings Validation settings
     * @returns {Object} Processed settings
     */
    parse: function (settings) {
        var validators = settings;
        if ('string' === typeof settings) {
            var splitted = settings.split('|');
            validators = {};

            for (var i = 0; i < splitted.length; i ++) {
                this.__parseSingle(validators, splitted[i]);
            }
        }

        return validators;
    },

    /**
     * @private
     * @function
     * @name sogv.ValidationSettingsHandler#__parseSingle
     * @description Prepare validation settings
     * @param {Object} validators The list of validators
     * @param {String} settings Validation settings
     */
    __parseSingle: function (validators, settings) {
        var validator = settings.substring(0, settings.indexOf(':'));
        var options = {};

        if ('' === validator) {
            validator = settings;
        } else {
            var settingsString = settings.substring(settings.indexOf(':') + 1);

            if('' !== settingsString) {
                // if (/^[\],:{}\s]*$/.test(settingsString.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                if (/^(\[|\{).+$/.test(settingsString)) {
                    options = JSON.parse(settingsString);
                } else {
                    var __options = settingsString.split(',');
                    var __validator = sogv.makeValidator(null, validator, {}, {}, this.lang, true);
                    for (var i = 0; i < __validator.options.length; i++) {
                        options[__validator.options[i].name] = sogv.convertToType(__options[i], __validator.options[i].type);
                    }
                }
            }
        }

        validators[validator] = options;
    }
};