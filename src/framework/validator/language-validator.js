Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.LanguageValidator
     * @extends abv.AbstractValidator
     * @classdesc
     * Validates that a value is a valid language Unicode language identifier (e.g. fr or ar-dz).
     * <br />
     * Available languages:
     * <ul>
     *     <li>en</li>
     *     <li>af</li>
     *     <li>ar-dz</li>
     *     <li>ar-kw</li>
     *     <li>ar-ly</li>
     *     <li>ar-ma</li>
     *     <li>ar-sa</li>
     *     <li>ar-tn</li>
     *     <li>ar</li>
     *     <li>az</li>
     *     <li>be</li>
     *     <li>bg</li>
     *     <li>bm</li>
     *     <li>bn</li>
     *     <li>bo</li>
     *     <li>br</li>
     *     <li>bs</li>
     *     <li>ca</li>
     *     <li>cs</li>
     *     <li>cv</li>
     *     <li>cy</li>
     *     <li>da</li>
     *     <li>de-at</li>
     *     <li>de-ch</li>
     *     <li>de</li>
     *     <li>dv</li>
     *     <li>el</li>
     *     <li>en-SG</li>
     *     <li>en-au</li>
     *     <li>en-ca</li>
     *     <li>en-gb</li>
     *     <li>en-ie</li>
     *     <li>en-il</li>
     *     <li>en-nz</li>
     *     <li>eo</li>
     *     <li>es-do</li>
     *     <li>es-us</li>
     *     <li>es</li>
     *     <li>et</li>
     *     <li>eu</li>
     *     <li>fa</li>
     *     <li>fi</li>
     *     <li>fo</li>
     *     <li>fr-ca</li>
     *     <li>fr-ch</li>
     *     <li>fr</li>
     *     <li>fy</li>
     *     <li>ga</li>
     *     <li>gd</li>
     *     <li>gl</li>
     *     <li>gom-latn</li>
     *     <li>gu</li>
     *     <li>he</li>
     *     <li>hi</li>
     *     <li>hr</li>
     *     <li>hu</li>
     *     <li>hy-am</li>
     *     <li>id</li>
     *     <li>is</li>
     *     <li>it-ch</li>
     *     <li>it</li>
     *     <li>ja</li>
     *     <li>jv</li>
     *     <li>ka</li>
     *     <li>kk</li>
     *     <li>km</li>
     *     <li>kn</li>
     *     <li>ko</li>
     *     <li>ku</li>
     *     <li>ky</li>
     *     <li>lb</li>
     *     <li>lo</li>
     *     <li>lt</li>
     *     <li>lv</li>
     *     <li>me</li>
     *     <li>mi</li>
     *     <li>mk</li>
     *     <li>ml</li>
     *     <li>mn</li>
     *     <li>mr</li>
     *     <li>ms-my</li>
     *     <li>ms</li>
     *     <li>mt</li>
     *     <li>my</li>
     *     <li>nb</li>
     *     <li>ne</li>
     *     <li>nl-be</li>
     *     <li>nl</li>
     *     <li>nn</li>
     *     <li>pa-in</li>
     *     <li>pl</li>
     *     <li>pt-br</li>
     *     <li>pt</li>
     *     <li>ro</li>
     *     <li>ru</li>
     *     <li>sd</li>
     *     <li>se</li>
     *     <li>si</li>
     *     <li>sk</li>
     *     <li>sl</li>
     *     <li>sq</li>
     *     <li>sr-cyrl</li>
     *     <li>sr</li>
     *     <li>ss</li>
     *     <li>sv</li>
     *     <li>sw</li>
     *     <li>ta</li>
     *     <li>te</li>
     *     <li>tet</li>
     *     <li>tg</li>
     *     <li>th</li>
     *     <li>tl-ph</li>
     *     <li>tlh</li>
     *     <li>tr</li>
     *     <li>tzl</li>
     *     <li>tzm-latn</li>
     *     <li>tzm</li>
     *     <li>ug-cn</li>
     *     <li>uk</li>
     *     <li>ur</li>
     *     <li>uz-latn</li>
     *     <li>uz</li>
     *     <li>vi</li>
     *     <li>x-pseudo</li>
     *     <li>yo</li>
     *     <li>zh-cn</li>
     *     <li>zh-hk</li>
     *     <li>zh-tw</li>
     * </ul>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.LanguageValidator(data);
     * if (false === validator.isValid()) {
     *      validator.messages().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.LanguageValidator#message
     * @type {String}
     * @description
     * This message is shown if the string is not a valid language code.
     * Default: "This value is not a valid language."
     * You can use the following parameters in this message:
     * <table>
     *     <thead>
     *         <tr>
     *             <th>Parameter</th>
     *             <th>Description</th>
     *         </tr>
     *     </thead>
     *     <tbody>
     *         <tr>
     *             <td>%%value%%</td>
     *             <td>The current (invalid) value</td>
     *         </tr>
     *     </tbody>
     * </table>
     */

    var LanguageValidator = function (data, options, lang, internal) {
        abv.AbstractValidator.call(this, data, options,{
            message: 'length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid language.';

        this.name = 'LanguageValidator';
    };
    LanguageValidator.prototype = Object.create(abv.AbstractValidator.prototype);
    LanguageValidator.prototype.constructor = LanguageValidator;

    Object.defineProperty(LanguageValidator.prototype, 'alias', {
        get: function () {
            return 'language';
        }
    });

    Object.assign(LanguageValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.LanguageValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            var locales = this.__moment.locales();
            if (false === locales.includes(this.data.toLowerCase())) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.EmailValidator#__beforeValidate
         * @description Execute before validation is running
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = abv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            try {
                if ('undefined' !== typeof this.data) {
                    this.data = this.data.toString();
                }
            } catch (e) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.LanguageValidator#__messageParameters
         * @description Returned parameters for error message which needs to be replaced
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': this.data
            }
        }
    });

    return {
        LanguageValidator: LanguageValidator
    };
}());

abv.registry(abv.LanguageValidator);