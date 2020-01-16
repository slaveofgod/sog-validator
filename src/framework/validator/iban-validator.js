Object.assign(abv, function () {
    'use strict';

    /**
     * @constructor
     * @name abv.IbanValidator
     * @extends abv.AbstractComparisonValidator
     * @classdesc
     * This constraint is used to ensure that a bank account number has the proper format of an {@link https://en.wikipedia.org/wiki/International_Bank_Account_Number|International Bank Account Number (IBAN)}.
     * IBAN is an internationally agreed means of identifying bank accounts across national borders with a reduced risk of propagating transcription errors.
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {String} lang The language used by the application. Default: 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @example
     * var validator = new abv.IbanValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */

    // PROPERTIES

    /**
     * @name abv.IbanValidator#message
     * @type {String}
     * @description
     * The default message supplied when the value does not pass the IBAN check.
     * Default: "This is not a valid International Bank Account Number (IBAN)."
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

    var IbanValidator = function (data, options, lang, internal) {
        abv.AbstractComparisonValidator.call(this, data, options,{
            message: 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This is not a valid International Bank Account Number (IBAN).';

        this.__formats = {
            'AD': /^AD\d{2}\d{4}\d{4}[\dA-Z]{12}$/, // Andorra
            'AE': /^AE\d{2}\d{3}\d{16}$/, // United Arab Emirates
            'AL': /^AL\d{2}\d{8}[\dA-Z]{16}$/, // Albania
            'AO': /^AO\d{2}\d{21}$/, // Angola
            'AT': /^AT\d{2}\d{5}\d{11}$/, // Austria
            'AX': /^FI\d{2}\d{6}\d{7}\d{1}$/, // Aland Islands
            'AZ': /^AZ\d{2}[A-Z]{4}[\dA-Z]{20}$/, // Azerbaijan
            'BA': /^BA\d{2}\d{3}\d{3}\d{8}\d{2}$/, // Bosnia and Herzegovina
            'BE': /^BE\d{2}\d{3}\d{7}\d{2}$/, // Belgium
            'BF': /^BF\d{2}\d{23}$/, // Burkina Faso
            'BG': /^BG\d{2}[A-Z]{4}\d{4}\d{2}[\dA-Z]{8}$/, // Bulgaria
            'BH': /^BH\d{2}[A-Z]{4}[\dA-Z]{14}$/, // Bahrain
            'BI': /^BI\d{2}\d{12}$/, // Burundi
            'BJ': /^BJ\d{2}[A-Z]{1}\d{23}$/, // Benin
            'BY': /^BY\d{2}[\dA-Z]{4}\d{4}[\dA-Z]{16}$/, // Belarus - https://bank.codes/iban/structure/belarus/
            'BL': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Saint Barthelemy
            'BR': /^BR\d{2}\d{8}\d{5}\d{10}[A-Z][\dA-Z]$/, // Brazil
            'CG': /^CG\d{2}\d{23}$/, // Congo
            'CH': /^CH\d{2}\d{5}[\dA-Z]{12}$/, // Switzerland
            'CI': /^CI\d{2}[A-Z]{1}\d{23}$/, // Ivory Coast
            'CM': /^CM\d{2}\d{23}$/, // Cameron
            'CR': /^CR\d{2}0\d{3}\d{14}$/, // Costa Rica
            'CV': /^CV\d{2}\d{21}$/, // Cape Verde
            'CY': /^CY\d{2}\d{3}\d{5}[\dA-Z]{16}$/, // Cyprus
            'CZ': /^CZ\d{2}\d{20}$/, // Czech Republic
            'DE': /^DE\d{2}\d{8}\d{10}$/, // Germany
            'DO': /^DO\d{2}[\dA-Z]{4}\d{20}$/, // Dominican Republic
            'DK': /^DK\d{2}\d{4}\d{10}$/, // Denmark
            'DZ': /^DZ\d{2}\d{20}$/, // Algeria
            'EE': /^EE\d{2}\d{2}\d{2}\d{11}\d{1}$/, // Estonia
            'ES': /^ES\d{2}\d{4}\d{4}\d{1}\d{1}\d{10}$/, // Spain (also includes Canary Islands, Ceuta and Melilla)
            'FI': /^FI\d{2}\d{6}\d{7}\d{1}$/, // Finland
            'FO': /^FO\d{2}\d{4}\d{9}\d{1}$/, // Faroe Islands
            'FR': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // France
            'GF': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // French Guyana
            'GB': /^GB\d{2}[A-Z]{4}\d{6}\d{8}$/, // United Kingdom of Great Britain and Northern Ireland
            'GE': /^GE\d{2}[A-Z]{2}\d{16}$/, // Georgia
            'GI': /^GI\d{2}[A-Z]{4}[\dA-Z]{15}$/, // Gibraltar
            'GL': /^GL\d{2}\d{4}\d{9}\d{1}$/, // Greenland
            'GP': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Guadeloupe
            'GR': /^GR\d{2}\d{3}\d{4}[\dA-Z]{16}$/, // Greece
            'GT': /^GT\d{2}[\dA-Z]{4}[\dA-Z]{20}$/, // Guatemala
            'HR': /^HR\d{2}\d{7}\d{10}$/, // Croatia
            'HU': /^HU\d{2}\d{3}\d{4}\d{1}\d{15}\d{1}$/, // Hungary
            'IE': /^IE\d{2}[A-Z]{4}\d{6}\d{8}$/, // Ireland
            'IL': /^IL\d{2}\d{3}\d{3}\d{13}$/, // Israel
            'IR': /^IR\d{2}\d{22}$/, // Iran
            'IS': /^IS\d{2}\d{4}\d{2}\d{6}\d{10}$/, // Iceland
            'IT': /^IT\d{2}[A-Z]{1}\d{5}\d{5}[\dA-Z]{12}$/, // Italy
            'JO': /^JO\d{2}[A-Z]{4}\d{4}[\dA-Z]{18}$/, // Jordan
            'KW': /^KW\d{2}[A-Z]{4}\d{22}$/, // KUWAIT
            'KZ': /^KZ\d{2}\d{3}[\dA-Z]{13}$/, // Kazakhstan
            'LB': /^LB\d{2}\d{4}[\dA-Z]{20}$/, // LEBANON
            'LI': /^LI\d{2}\d{5}[\dA-Z]{12}$/, // Liechtenstein (Principality of)
            'LT': /^LT\d{2}\d{5}\d{11}$/, // Lithuania
            'LU': /^LU\d{2}\d{3}[\dA-Z]{13}$/, // Luxembourg
            'LV': /^LV\d{2}[A-Z]{4}[\dA-Z]{13}$/, // Latvia
            'MC': /^MC\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Monaco
            'MD': /^MD\d{2}[\dA-Z]{2}[\dA-Z]{18}$/, // Moldova
            'ME': /^ME\d{2}\d{3}\d{13}\d{2}$/, // Montenegro
            'MF': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Saint Martin (French part)
            'MG': /^MG\d{2}\d{23}$/, // Madagascar
            'MK': /^MK\d{2}\d{3}[\dA-Z]{10}\d{2}$/, // Macedonia, Former Yugoslav Republic of
            'ML': /^ML\d{2}[A-Z]{1}\d{23}$/, // Mali
            'MQ': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Martinique
            'MR': /^MR13\d{5}\d{5}\d{11}\d{2}$/, // Mauritania
            'MT': /^MT\d{2}[A-Z]{4}\d{5}[\dA-Z]{18}$/, // Malta
            'MU': /^MU\d{2}[A-Z]{4}\d{2}\d{2}\d{12}\d{3}[A-Z]{3}$/, // Mauritius
            'MZ': /^MZ\d{2}\d{21}$/, // Mozambique
            'NC': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // New Caledonia
            'NL': /^NL\d{2}[A-Z]{4}\d{10}$/, // The Netherlands
            'NO': /^NO\d{2}\d{4}\d{6}\d{1}$/, // Norway
            'PF': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // French Polynesia
            'PK': /^PK\d{2}[A-Z]{4}[\dA-Z]{16}$/, // Pakistan
            'PL': /^PL\d{2}\d{8}\d{16}$/, // Poland
            'PM': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Saint Pierre et Miquelon
            'PS': /^PS\d{2}[A-Z]{4}[\dA-Z]{21}$/, // Palestine, State of
            'PT': /^PT\d{2}\d{4}\d{4}\d{11}\d{2}$/, // Portugal (plus Azores and Madeira)
            'QA': /^QA\d{2}[A-Z]{4}[\dA-Z]{21}$/, // Qatar
            'RE': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Reunion
            'RO': /^RO\d{2}[A-Z]{4}[\dA-Z]{16}$/, // Romania
            'RS': /^RS\d{2}\d{3}\d{13}\d{2}$/, // Serbia
            'SA': /^SA\d{2}\d{2}[\dA-Z]{18}$/, // Saudi Arabia
            'SE': /^SE\d{2}\d{3}\d{16}\d{1}$/, // Sweden
            'SI': /^SI\d{2}\d{5}\d{8}\d{2}$/, // Slovenia
            'SK': /^SK\d{2}\d{4}\d{6}\d{10}$/, // Slovak Republic
            'SM': /^SM\d{2}[A-Z]{1}\d{5}\d{5}[\dA-Z]{12}$/, // San Marino
            'SN': /^SN\d{2}[A-Z]{1}\d{23}$/, // Senegal
            'TF': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // French Southern Territories
            'TL': /^TL\d{2}\d{3}\d{14}\d{2}$/, // Timor-Leste
            'TN': /^TN59\d{2}\d{3}\d{13}\d{2}$/, // Tunisia
            'TR': /^TR\d{2}\d{5}[\dA-Z]{1}[\dA-Z]{16}$/, // Turkey
            'UA': /^UA\d{2}\d{6}[\dA-Z]{19}$/, // Ukraine
            'VA': /^VA\d{2}\d{3}\d{15}$/, // Vatican City State
            'VG': /^VG\d{2}[A-Z]{4}\d{16}$/, // Virgin Islands, British
            'WF': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Wallis and Futuna Islands
            'XK': /^XK\d{2}\d{4}\d{10}\d{2}$/, // Republic of Kosovo
            'YT': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Mayotte
        };

        this.name = 'IbanValidator';
    };
    IbanValidator.prototype = Object.create(abv.AbstractComparisonValidator.prototype);
    IbanValidator.prototype.constructor = IbanValidator;

    Object.defineProperty(IbanValidator.prototype, 'alias', {
        get: function () {
            return 'iban';
        }
    });

    Object.assign(IbanValidator.prototype, {
        /**
         * @private
         * @function
         * @name abv.IbanValidator#__validate
         * @description Validate data
         */
        __validate: function () {
            // Remove spaces and convert to uppercase
            var canonicalized = this.data.split(' ').join('');

            // The IBAN must contain only digits and characters...
            if (false === abv.isType('alnum', canonicalized)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // ...start with a two-letter country code
            var countryCode = canonicalized.substr(0, 2);
            if (false === abv.isType('alpha', countryCode)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // ...have a format available
            if ('undefined' === typeof this.__formats[countryCode]) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // ...and have a valid format
            if (false === this.__formats[countryCode].test(canonicalized)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }

            // Move the first four characters to the end
            // e.g. CH93 0076 2011 6238 5295 7
            //   -> 0076 2011 6238 5295 7 CH93
            canonicalized = canonicalized.substr(4) + canonicalized.substr(0, 4);
            // Convert all remaining letters to their ordinals
            // The result is an integer, which is too large for PHP's int
            // data type, so we store it in a string instead.
            // e.g. 0076 2011 6238 5295 7 CH93
            //   -> 0076 2011 6238 5295 7 121893
            var checkSum = this.__toBigInt(canonicalized);
            // Do a modulo-97 operation on the large integer
            // We cannot use PHP's modulo operator, so we calculate the
            // modulo step-wisely instead
            if (1 !== this.__bigModulo97(checkSum)) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name abv.IbanValidator#__toBigInt
         * @description To big int
         * @param {String} string
         * @returns {Number}
         */
        __toBigInt: function (string) {
            var chars = abv.str_split(string);
            var bigInt = '';

            for (var i = 0; i < chars.length; i ++) {
                // Convert uppercase characters to ordinals, starting with 10 for "A"
                if (true === abv.isType('upper', chars[i])) {
                    bigInt += (abv.ord(chars[i]) - 55);
                    continue;
                }
                // Simply append digits
                bigInt += chars[i];
            }

            return bigInt;
        },

        /**
         * @private
         * @function
         * @name abv.IbanValidator#__bigModulo97
         * @description Big modulo 97
         * @param {String} bigInt
         * @returns {Number}
         */
        __bigModulo97: function (bigInt) {
            var parts = abv.str_split(bigInt, 7);
            var rest = 0;

            for (var i = 0; i < parts.length; i ++) {
                rest = (rest + parts[i]) % 97;
            }

            return rest;
        },

        /**
         * @private
         * @function
         * @name abv.IbanValidator#__beforeValidate
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
         * @name abv.IbanValidator#__messageParameters
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
        IbanValidator: IbanValidator
    };
}());

abv.registry(abv.IbanValidator);