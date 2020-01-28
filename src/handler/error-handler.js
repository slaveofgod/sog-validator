Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.ErrorHandler
     * @classdesc This service provides handling of all error messages
     * @description Create a new error handler.
     * @param {Object} options The setting options.
     */

    // PROPERTIES

    /**
     * @name sogv.RegexValidator#lang
     * @type {String}
     * @description Language of messages.
     */

    var ErrorHandler = function (options) {
        this.lang = options.lang || 'en';

        this.__translator = new sogv.I18n(this.lang);
        this.__internal = (true === options.internal);
        this.__messages = [];

        this.name = 'ErrorHandler';
    };

    Object.assign(ErrorHandler.prototype, {
        /**
         * @function
         * @name sogv.ErrorHandler#has
         * @description Check if messages exist
         * @return {Boolean} Status
         */
        has: function () {
            return (this.count() > 0);
        },

        /**
         * @function
         * @name sogv.ErrorHandler#add
         * @description Add new message
         * @param {String} message Message text
         * @param {Object} parameters Message parameters
         */
        add: function (message, parameters) {
            this.__messages.push({
                message: message,
                parameters: parameters
            });
        },

        /**
         * @function
         * @name sogv.ErrorHandler#get
         * @description Get message by position
         * @param {Integer} position Message position
         * @return {String} Message
         */
        get: function (position) {
            var pos = position || 0;
            var message = this.__messages[pos];

            if ('undefined' !== typeof message) {
                return this.__translator.translate(message.message, message.parameters);
            }

            return null;
        },

        /**
         * @function
         * @name sogv.ErrorHandler#first
         * @description Get first message
         * @return {String} Message
         */
        first: function () {
            return this.get(0);
        },

        /**
         * @function
         * @name sogv.ErrorHandler#count
         * @description Count of messages
         * @return {String} Count
         */
        count: function () {
            return this.__messages.length;
        },
    });

    return {
        ErrorHandler: ErrorHandler
    };
}());