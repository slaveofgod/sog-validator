/**
 * This constraint is used to ensure that a bank account number has the proper format of an International Bank Account Number (IBAN).
 * IBAN is an internationally agreed means of identifying bank accounts across national borders with a reduced risk of propagating transcription errors.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

// only run when the substr() function is broken
if ('ab'.substr(-1) != 'b') {
  /**
   *  Get the substring of a string
   *  @param  {integer}  start   where to start the substring
   *  @param  {integer}  length  how many characters to return
   *  @return {string}
   */
  String.prototype.substr = function(substr) {
    return function(start, length) {
      // call the original method
      return substr.call(this,
      	// did we get a negative start, calculate how much it is from the beginning of the string
        // adjust the start parameter for negative value
        start < 0 ? this.length + start : start,
        length)
    }
  }(String.prototype.substr);
}

export default class extends Validator {
    constructor({
        message = null
    }) {
        super(arguments);

        this.configuring();

        this.setMessage('message', message);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This is not a valid International Bank Account Number (IBAN).'
        });

        this.formats = {
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
            'BL': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Saint Barthelemy
            'BR': /^BR\d{2}\d{8}\d{5}\d{10}[A-Z][\dA-Z]$/, // Brazil
            'CG': /^CG\d{2}\d{23}$/, // Congo
            'CH': /^CH\d{2}\d{5}[\dA-Z]{12}$/, // Switzerland
            'CI': /^CI\d{2}[A-Z]{1}\d{23}$/, // Ivory Coast
            'CM': /^CM\d{2}\d{23}$/, // Cameron
            'CR': /^CR\d{2}\d{3}\d{14}$/, // Costa Rica
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
            'UA': /^UA\d{2}[A-Z]{6}[\dA-Z]{19}$/, // Ukraine
            'VG': /^VG\d{2}[A-Z]{4}\d{16}$/, // Virgin Islands, British
            'WF': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/, // Wallis and Futuna Islands
            'XK': /^XK\d{2}\d{4}\d{10}\d{2}$/, // Republic of Kosovo
            'YT': /^FR\d{2}\d{5}\d{5}[\dA-Z]{11}\d{2}$/ // Mayotte
        };
    }

    validate(data) {
        let message = this.getMessage('message');

        if (null === data || '' === data) {
            return ;
        }

        // Remove spaces and convert to uppercase
        let canonicalized = data.toUpperCase().replace(/\s+/g, '');

        // The IBAN must contain only digits and characters...
        if (!this.ctype_alnum(canonicalized)) {
            // INVALID_CHARACTERS_ERROR
            console.log('INVALID_CHARACTERS_ERROR');
            this.addError(message.format({value: data}));
            return;
        }

        // ...start with a two-letter country code
        let countryCode = canonicalized.substr(0, 2);

        if (!this.ctype_alpha(countryCode)) {
            // INVALID_COUNTRY_CODE_ERROR
            console.log('INVALID_COUNTRY_CODE_ERROR');
            this.addError(message.format({value: data}));
            return;
        }

        // ...have a format available
        if(!(countryCode in this.formats)){
            // NOT_SUPPORTED_COUNTRY_CODE_ERROR
            console.log('NOT_SUPPORTED_COUNTRY_CODE_ERROR');
            this.addError(message.format({value: data}));
            return;
        }

        // ...and have a valid format
        if(!this.formats[countryCode].test(canonicalized)){
            // INVALID_FORMAT_ERROR
            console.log('INVALID_FORMAT_ERROR');
            this.addError(message.format({value: data}));
            return;
        }

        // Move the first four characters to the end
        // e.g. CH93 0076 2011 6238 5295 7
        //   -> 0076 2011 6238 5295 7 CH93
        canonicalized = canonicalized.substr(4) + canonicalized.substr(0, 4);

        // Convert all remaining letters to their ordinals
        // The result is an integer, which is too large for JS's int
        // data type, so we store it in a string instead.
        // e.g. 0076 2011 6238 5295 7 CH93
        //   -> 0076 2011 6238 5295 7 121893
        let checkSum = this.toBigInt(canonicalized);

        // Do a modulo-97 operation on the large integer
        // We cannot use JS's modulo operator, so we calculate the
        // modulo step-wisely instead
        if (1 !== this.bigModulo97(checkSum)) {
            // CHECKSUM_FAILED_ERROR
            console.log('CHECKSUM_FAILED_ERROR');
            this.addError(message.format({value: data}));
            return;
        }
    }

    /**
     *  Check for alphanumeric character(s)
     *  @param  {string}    str             The tested string.
     *  @return {boolean}
     */
    ctype_alnum(str) {
        return /^[A-Za-z0-9]+$/.test(str);
    }

    /**
     *  Check for alphabetic character(s)
     *  @param  {string}    str             The tested string.
     *  @return {boolean}
     */
    ctype_alpha(str) {
        return /^[A-Za-z]+$/.test(str);
    }

    /**
     *  Check for uppercase character(s)
     *  @param  {string}    str             The tested string.
     *  @return {boolean}
     */
    ctype_upper(str) {
        return /^[A-Z]+$/.test(str);
    }

    /**
     *  Convert a string to an array
     *  @param  {string}    str             The input string.
     *  @param  {integer}   split_length    Maximum length of the chunk.
     *  @return {array}
     */
    str_split(str, split_length = 1) {
        str = str + '';
        let res = [];
        res[0] = '';
        let key = 0;
        let iterator = 0;
        for (var strKey in str){
            if(!str.hasOwnProperty(strKey)){
                continue;
            }

            if(iterator == split_length){
                iterator = 0;
                key ++;
                res[key] = '';
            }

            res[key] += str[strKey];

            iterator ++;
        }

        return res;
    }

    ord (string) {
        //  discuss at: http://locutus.io/php/ord/
        // original by: Kevin van Zonneveld (http://kvz.io)
        // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        // improved by: Brett Zamir (http://brett-zamir.me)
        //    input by: incidence
        //   example 1: ord('K')
        //   returns 1: 75
        //   example 2: ord('\uD800\uDC00'); // surrogate pair to create a single Unicode character
        //   returns 2: 65536

        var str = string + '';
        var code = str.charCodeAt(0);

        if (code >= 0xD800 && code <= 0xDBFF) {
            // High surrogate (could change last hex to 0xDB7F to treat
            // high private surrogates as single characters)
            var hi = code;
            if (str.length === 1) {
                // This is just a high surrogate with no following low surrogate,
                // so we return its value;
                return code;
                // we could also throw an error as it is not a complete character,
                // but someone may want to know
            }
            var low = str.charCodeAt(1);
            return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
        }
        if (code >= 0xDC00 && code <= 0xDFFF) {
            // Low surrogate
            // This is just a low surrogate with no preceding high surrogate,
            // so we return its value;
            return code;
            // we could also throw an error as it is not a complete character,
            // but someone may want to know
        }

        return code;
    }

    toBigInt(str) {
        let chars = this.str_split(str);
        let bigInt = '';

        for (var charKey in chars){
            // Convert uppercase characters to ordinals, starting with 10 for "A"
            if (this.ctype_upper(chars[charKey])) {
                bigInt += (this.ord(chars[charKey]) - 55);

                continue;
            }

            // Simply append digits
            bigInt += chars[charKey];
        }

        return bigInt;
    }

    bigModulo97(bigInt) {
        let parts = this.str_split(bigInt, 7);
        let rest = 0;

        for (var partKey in parts){
            rest = (rest+parts[partKey]) % 97;
        }

        return rest;
    }
}
