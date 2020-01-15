Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.ErrorCollection
     * @classdesc Collecting all messages
     * @description Create a new error collection.
     * @param {Object} options The setting options.
     */

    // PROPERTIES

    /**
     * @name abv.RegexValidator#lang
     * @type {String}
     * @description Language of messages.
     */

    var ErrorCollection = function (options) {
        this.lang = options.lang || 'en';

        this.__messages = [];
    };

    Object.defineProperty(ErrorCollection.prototype, 'alias', {
        get: function () {
            return 'ErrorCollection';
        }
    });

    Object.assign(ErrorCollection.prototype, {
        /**
         * @function
         * @name abv.ErrorCollection#has
         * @description Check if messages exist
         * @return {Boolean} Status
         */
        has: function () {
            return (this.count() > 0);
        },

        /**
         * @function
         * @name abv.ErrorCollection#add
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
         * @name abv.ErrorCollection#get
         * @description Get message by position
         * @param {Integer} position Message position
         * @return {String} Message
         */
        get: function (position) {
            var pos = position || 0;
            var message = this.__messages[pos];

            if (undefined !== typeof message) {
                return this.__prepare(message.message, message.parameters);
            }

            return null;
        },

        /**
         * @function
         * @name abv.ErrorCollection#first
         * @description Get first message
         * @return {String} Message
         */
        first: function () {
            return this.get(0);
        },

        /**
         * @function
         * @name abv.ErrorCollection#count
         * @description Count of messages
         * @return {String} Count
         */
        count: function () {
            return this.__messages.length;
        },

        /**
         * @private
         * @function
         * @name abv.ErrorCollection#prepare
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
        ErrorCollection: ErrorCollection
    };
}());