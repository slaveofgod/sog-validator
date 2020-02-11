Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.DateTimeValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is a valid "<code>datetime</code>", meaning a string (or an object that can be cast into a string) that follows a specific format.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>date-time</code>', '<code>date_format</code>', '<code>date-format</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DateTimeValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name sogv.DateTimeValidator#message
     * @type {String}
     * @description
     * <p>This message is shown if the underlying data is not a valid datetime.</p>
     * <p>Default: "This value is not a valid datetime."</p>
     * <p>You can use the following parameters in this message:</p>
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td><code>%%value%%</code></td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    /**
     * @name sogv.DateTimeValidator#format
     * @type {String}
     * @description
     * <p>This option allows to validate a custom date format.</p>
     * <p>Default: "<code>YYYY-MM-DD HH:mm:ss</code>"</p>
     * <p><h2>Year, month, and day tokens</h2></p>
     * <p><i>Tokens are case-sensitive.</i></p>
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Input</th>
     *             <th>Example</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td><code>YYYY</code></td>
     *             <td><code>2014</code></td>
     *             <td>4 or 2 digit year</td>
     *         </tr>
     *         <tr>
     *             <td><code>YY</code></td>
     *             <td><code>14</code></td>
     *             <td>2 digit year</td>
     *         </tr>
     *         <tr>
     *             <td><code>Y</code></td>
     *             <td><code>-25</code></td>
     *             <td>Year with any number of digits and sign</td>
     *         </tr>
     *         <tr>
     *             <td><code>Q</code></td>
     *             <td><code>1..4</code></td>
     *             <td>Quarter of year. Sets month to first month in quarter.</td>
     *         </tr>
     *         <tr>
     *             <td><code>M MM</code></td>
     *             <td><code>1..12</code></td>
     *             <td>Month number</td>
     *         </tr>
     *         <tr>
     *             <td><code>MMM MMMM</code></td>
     *             <td><code>Jan..December</code></td>
     *             <td>Month name in locale that is specified</td>
     *         </tr>
     *         <tr>
     *             <td><code>D DD</code></td>
     *             <td><code>1..31</code></td>
     *             <td>Day of month</td>
     *         </tr>
     *         <tr>
     *             <td><code>Do</code></td>
     *             <td><code>1st..31st</code></td>
     *             <td>Day of month with ordinal</td>
     *         </tr>
     *         <tr>
     *             <td><code>DDD DDDD</code></td>
     *             <td><code>1..365</code></td>
     *             <td>Day of year</td>
     *         </tr>
     *         <tr>
     *             <td><code>X</code></td>
     *             <td><code>1410715640.579</code></td>
     *             <td>Unix timestamp</td>
     *         </tr>
     *         <tr>
     *             <td><code>x</code></td>
     *             <td><code>1410715640579</code></td>
     *             <td>Unix ms timestamp</td>
     *         </tr>
     *     </tbody>
     * </table>
     * <p><h2>Week year, week, and weekday tokens</h2></p>
     * <p><i>Tokens are case-sensitive.</i></p>
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Input</th>
     *             <th>Example</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td><code>gggg</code></td>
     *             <td><code>2014</code></td>
     *             <td>Locale 4 digit week year</td>
     *         </tr>
     *         <tr>
     *             <td><code>gg</code>
     *             </td><td><code>14</code></td>
     *             <td>Locale 2 digit week year</td>
     *         </tr>
     *         <tr>
     *             <td><code>w ww</code></td>
     *             <td><code>1..53</code></td>
     *             <td>Locale week of year</td>
     *         </tr>
     *         <tr>
     *             <td><code>e</code></td>
     *             <td><code>0..6</code></td>
     *             <td>Locale day of week</td>
     *         </tr>
     *         <tr>
     *             <td><code>ddd dddd</code></td>
     *             <td><code>Mon...Sunday</code></td>
     *             <td>Day name in locale that is specified</td>
     *         </tr>
     *         <tr>
     *             <td><code>GGGG</code></td>
     *             <td><code>2014</code></td>
     *             <td>ISO 4 digit week year</td>
     *         </tr>
     *         <tr>
     *             <td><code>GG</code></td>
     *             <td><code>14</code></td>
     *             <td>ISO 2 digit week year</td>
     *         </tr>
     *         <tr>
     *             <td><code>W WW</code></td>
     *             <td><code>1..53</code></td>
     *             <td>ISO week of year</td>
     *         </tr>
     *         <tr>
     *             <td><code>E</code></td>
     *             <td><code>1..7</code></td>
     *             <td>ISO day of week</td>
     *         </tr>
     *     </tbody>
     * </table>
     * <p><h2>Locale aware formats</h2></p>
     * <p><i>Tokens are case-sensitive.</i></p>
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Input</th>
     *             <th>Example</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td><code>L</code></td>
     *             <td><code>04/09/1986</code></td>
     *             <td>Date (in local format)</td>
     *         </tr>
     *         <tr>
     *             <td><code>LL</code></td>
     *             <td><code>September 4 1986</code></td>
     *             <td>Month name, day of month, year</td>
     *         </tr>
     *         <tr>
     *             <td><code>LLL</code></td>
     *             <td><code>September 4 1986 8:30 PM</code></td>
     *             <td>Month name, day of month, year, time</td>
     *         </tr>
     *         <tr>
     *             <td><code>LLLL</code></td>
     *             <td><code>Thursday, September 4 1986 8:30 PM</code></td>
     *             <td>Day of week, month name, day of month, year, time</td>
     *         </tr>
     *         <tr>
     *             <td><code>LT</code></td>
     *             <td><code>08:30 PM</code></td>
     *             <td>Time (without seconds)</td>
     *         </tr>
     *         <tr>
     *             <td><code>LTS</code></td>
     *             <td><code>08:30:00 PM</code></td>
     *             <td>Time (with seconds)</td>
     *         </tr>
     *     </tbody>
     * </table>
     * <p><h2>Hour, minute, second, millisecond, and offset tokens</h2></p>
     * <p><i>Tokens are case-sensitive.</i></p>
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Input</th>
     *             <th>Example</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td><code>H HH</code></td>
     *             <td><code>0..23</code></td>
     *             <td>Hours (24 hour time)</td>
     *         </tr>
     *         <tr>
     *             <td><code>h hh</code></td>
     *             <td><code>1..12</code></td>
     *             <td>Hours (12 hour time used with <code>a A</code>.)</td>
     *         </tr>
     *         <tr>
     *             <td><code>k kk</code></td>
     *             <td><code>1..24</code></td>
     *             <td>Hours (24 hour time from 1 to 24)</td>
     *         </tr>
     *         <tr>
     *             <td><code>a A</code></td>
     *             <td><code>am pm</code></td>
     *             <td>Post or ante meridiem (Note the one character <code>a p</code> are also considered valid)</td>
     *         </tr>
     *         <tr>
     *             <td><code>m mm</code></td>
     *             <td><code>0..59</code></td>
     *             <td>Minutes</td>
     *         </tr>
     *         <tr>
     *             <td><code>s ss</code></td>
     *             <td><code>0..59</code></td>
     *             <td>Seconds</td>
     *         </tr>
     *         <tr>
     *             <td><code>S SS SSS</code></td>
     *             <td><code>0..999</code></td>
     *             <td>Fractional seconds</td>
     *         </tr>
     *         <tr>
     *             <td><code>Z ZZ</code></td>
     *             <td><code>+12:00</code></td>
     *             <td>Offset from UTC as <code>+-HH:mm</code>, <code>+-HHmm</code>, or <code>Z</code></td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var DateTimeValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}',
            format: optionRules.format || 'type:{"type":"string"}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid datetime.';
        this.format = this.__options.format || 'YYYY-MM-DD HH:mm:ss';

        this.name = 'DateTimeValidator';
    };
    DateTimeValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    DateTimeValidator.prototype.constructor = DateTimeValidator;

    Object.defineProperty(DateTimeValidator.prototype, 'alias', {
        get: function () {
            return [
                'date-time',
                'date_format',
                'date-format'
            ];
        }
    });

    Object.defineProperty(DateTimeValidator.prototype, 'options', {
        get: function () {
            return [
                {
                    'name': 'format',
                    'type': 'string'
                }
            ];
        }
    });

    Object.assign(DateTimeValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.DateTimeValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            // Check if value is date
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"date-string"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            if (this.data !== this.__moment(this.data, this.format).format(this.format)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.DateTimeValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            // Convert data to string
            try {
                if ('undefined' !== typeof this.data) {
                    this.data = this.data.toString();
                }
            } catch (e) {
                this.__setErrorMessage('This value ' + this.data + ' could not be converted to string.');
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.DateTimeValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': this.__moment(this.data).format(this.format)
            }
        }
    });

    return {
        DateTimeValidator: DateTimeValidator
    };
}());

sogv.registry(sogv.DateTimeValidator);