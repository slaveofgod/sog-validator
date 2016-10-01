/**
 * This constraint is used to ensure that a bank account number has the proper format of an International Bank Account Number (IBAN).
 * IBAN is an internationally agreed means of identifying bank accounts across national borders with a reduced risk of propagating transcription errors.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class IbanValidator extends Validator {
    constructor() {
        super(arguments);

        var message = arguments[0]['message'];

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

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        var message = this.getMessage('message');

        if (null === data || '' === data) {
            return ;
        }

        if(!(typeof data == 'string')){
            if(this.getEnvironment() == 'dev') {
                throw new Error(`Expected data of type \"string\", \"${typeof data}\" given`);
            }else{
                this.addError(`Expected data of type \"string\", \"${typeof data}\" given`);

                return;
            }
        }

        // Remove spaces and convert to uppercase
        var canonicalized = data.toUpperCase().replace(/\s+/g, '');

        // The IBAN must contain only digits and characters...
        if (!this.ctype_alnum(canonicalized)) {
            // INVALID_CHARACTERS_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        // ...start with a two-letter country code
        var countryCode = canonicalized.substr(0, 2);

        if (!this.ctype_alpha(countryCode)) {
            // INVALID_COUNTRY_CODE_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        // ...have a format available
        if(!(countryCode in this.formats)){
            // NOT_SUPPORTED_COUNTRY_CODE_ERROR
            this.addError(message.format({value: data}));
            return;
        }

        // ...and have a valid format
        if(!this.formats[countryCode].test(canonicalized)){
            // INVALID_FORMAT_ERROR
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
        var checkSum = this.toBigInt(canonicalized);

        // Do a modulo-97 operation on the large integer
        // We cannot use JS's modulo operator, so we calculate the
        // modulo step-wisely instead
        if (1 !== this.bigModulo97(checkSum)) {
            // CHECKSUM_FAILED_ERROR
            this.addError(message.format({value: data}));
            return;
        }
    }

    toBigInt(str) {
        var chars = this.str_split(str);
        var bigInt = '';

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
        var parts = this.str_split(bigInt, 7);
        var rest = 0;

        for (var partKey in parts){
            rest = (rest+parts[partKey]) % 97;
        }

        return rest;
    }
}

module.exports = IbanValidator;
