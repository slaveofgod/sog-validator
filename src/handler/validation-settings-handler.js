/**
 * @namespace
 * @name abv.ValidationSettingsHandler
 * @description
 * <p>Validation settings handler.</p>
 * <p>This handler provides different types of validation settings parsers (validator's name and settings).</p>
 * @example
 * var validators = abv.ValidationSettingsHandler.parse('required|email:{"mode":"html5"}');
 */
abv.ValidationSettingsHandler = {
    /**
     * @function
     * @name abv.ValidationSettingsHandler#parse
     * @description Prepare validation settings
     * @param {String|JSON|Object} settings Validation settings
     * @returns {Object} Processed settings
     */
    parse: function (settings) {
        var validators = settings;
        if ('string' === typeof settings) {
            validators = this.__parseJsonFormat(settings);
        }

        return validators;
    },

    /**
     * @private
     * @function
     * @name abv.ValidationSettingsHandler#__parseStringFormat
     * @description Parse validation settings from string (Laravel format)
     * @param {String} settings Validation settings in string format
     * @returns {Object} The roles in array format
     */
    __parseLaravelFormat: function (settings) {
        var splitted = settings.split('|');
        var validators = {};

        for (var key in splitted) {
            if (!splitted.hasOwnProperty(key)) continue;

            var rule = splitted[key];
            var validator = rule.substring(0, rule.indexOf(';'));
            var options = {};

            if ('' === validator) {
                validator = rule;
            } else {
                rule.substring(rule.indexOf(';') + 1).split(',').map(function (element) {
                    var option = element.split(':');
                    options[option[0]] = option[1];
                });
            }

            validators[validator] = options;
        }

        return validators;
    },

    /**
     * @private
     * @function
     * @name abv.ValidationSettingsHandler#__parseJsonFormat
     * @description Parse validation settings from string (JSON format)
     * @param {String} settings Validation settings in string format
     * @returns {Object} The roles in array format
     */
    __parseJsonFormat: function (settings) {
        var splitted = settings.split('|');
        var validators = {};

        for (var key in splitted) {
            if (!splitted.hasOwnProperty(key)) continue;

            var rule = splitted[key];
            var validator = rule.substring(0, rule.indexOf(':'));
            var options = {};

            if ('' === validator) {
                validator = rule;
            } else {
                var settingsString = rule.substring(rule.indexOf(':') + 1);
                try {
                    options = JSON.parse(settingsString);
                } catch (e) {
                    throw new Error('Invalid JSON: "' + settingsString + '"');
                }
            }

            validators[validator] = options;
        }

        return validators;
    },
};