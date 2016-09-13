/**
 * Validates that a value is a valid Universally unique identifier (UUID) per RFC 4122.
 * By default, this will validate the format according to the RFC's guidelines, but this can be relaxed to accept non-standard UUIDs that other systems (like PostgreSQL) accept.
 * UUID versions can also be restricted using a whitelist.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import Validator from './ValidatorAbstract';

// The strict pattern matches UUIDs like this:
// xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx

// Roughly speaking:
// x = any hexadecimal character
// M = any allowed version {1..5}
// N = any allowed variant {8, 9, a, b}

const STRICT_LENGTH = 36;
const STRICT_FIRST_HYPHEN_POSITION = 8;
const STRICT_LAST_HYPHEN_POSITION = 23;
const STRICT_VERSION_POSITION = 14;
const STRICT_VARIANT_POSITION = 19;

// The loose pattern validates similar yet non-compliant UUIDs.
// Hyphens are completely optional. If present, they should only appear
// between every fourth character:
// xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx
// xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxx-xxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// The value can also be wrapped with characters like []{}:
// {xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx}

// Neither the version nor the variant is validated by this pattern.

const LOOSE_MAX_LENGTH = 39;
const LOOSE_FIRST_HYPHEN_POSITION = 4;

// Possible versions defined by RFC 4122

const V1_MAC = 1;
const V2_DCE = 2;
const V3_MD5 = 3;
const V4_RANDOM = 4;
const V5_SHA1 = 5;

export default class extends Validator {
    constructor({
        message = null,
        strict = null,
        versions = null
    }) {
        super(arguments);

        this.configuring();

        this.setMessage('message', message);

        this.setParameter('strict', strict);

        if(
            !this.isEmpty(versions)
            && Object.prototype.toString.call(versions) !== '[object Array]'
        ){
            throw new Error(`Invalid "versions" type. Expected type \"Array\", \"${typeof versions}\" given`);
        }else if(
            !this.isEmpty(versions)
            && Object.prototype.toString.call(versions) === '[object Array]'
        ){
            for (var versionKey in versions){
                if(!this.inArray(versions[versionKey], this.getParameter('versions'), false)){
                    throw new Error(`Invalid "versions" variant \"${versions[versionKey]}\".`);
                }
            }
        }

        this.setParameter('versions', versions);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This is not a valid UUID.',
        });

        this.setDefaultParameters({
            'strict': true,
            'versions': [V1_MAC, V2_DCE, V3_MD5, V4_RANDOM, V5_SHA1]
        });
    }

    validate(data) {
        if (null === data || '' === data) {
            return ;
        }

        if(typeof data !== 'string'){
            this.addError(this.getMessage('message'));
            return ;
        }

        if(this.getParameter('strict') == true){
            this.validateStrict(data);
            return ;
        }

        this.validateLoose(data);
    }

    validateStrict(data) {
        let message = this.getMessage('message');

        // Error priority:
        // 1. ERROR_INVALID_CHARACTERS
        // 2. ERROR_INVALID_HYPHEN_PLACEMENT
        // 3. ERROR_TOO_SHORT/ERROR_TOO_LONG
        // 4. ERROR_INVALID_VERSION
        // 5. ERROR_INVALID_VARIANT

        // Position of the next expected hyphen
        let h = STRICT_FIRST_HYPHEN_POSITION;

        let i = 0;
        for (i = 0; i < STRICT_LENGTH; ++i) {
            // Check length
            if (this.isEmpty(data[i])) {
                // TOO_SHORT_ERROR
                this.addError(message.format({value: data}));

                return;
            }

            // Check hyphen placement
            // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
            //         ^    ^    ^    ^
            if ('-' === data[i]) {
                if (i !== h) {
                    // INVALID_HYPHEN_PLACEMENT_ERROR
                    this.addError(message.format({value: data}));
                    return;
                }

                // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
                //                        ^
                if (h < STRICT_LAST_HYPHEN_POSITION) {
                    h += 5;
                }

                continue;
            }

            // Check characters
            if (!this.ctype_xdigit(data[i])) {
                // INVALID_CHARACTERS_ERROR
                this.addError(message.format({value: data}));
                return;
            }

            // Missing hyphen
            if (i === h) {
                // INVALID_HYPHEN_PLACEMENT_ERROR
                this.addError(message.format({value: data}));
                return;
            }
        }

        // Check length again
        if (!this.isEmpty(data[i])) {
            // TOO_LONG_ERROR
            this.addError(message.format({value: data}));
        }

        // Check version
        if(!this.inArray(data[STRICT_VERSION_POSITION], this.getParameter('versions'), false)){
            // INVALID_VERSION_ERROR
            this.addError(message.format({value: data}));
        }

        // Check variant - first two bits must equal "10"
        //   0b10xx
        // & 0b1100 (12)
        // = 0b1000 (8)
        if ((this.hexdec(data[STRICT_VARIANT_POSITION]) & 12) !== 8) {
            // INVALID_VARIANT_ERROR
            this.addError(message.format({value: data}));
        }
    }

    validateLoose(data) {
        let message = this.getMessage('message');

        // Error priority:
        // 1. ERROR_INVALID_CHARACTERS
        // 2. ERROR_INVALID_HYPHEN_PLACEMENT
        // 3. ERROR_TOO_SHORT/ERROR_TOO_LONG

        // Trim any wrapping characters like [] or {} used by some legacy systems
        let trimmed = this.trim(data, '[]{}');

        // Position of the next expected hyphen
        let h = LOOSE_FIRST_HYPHEN_POSITION;

        // Expected length
        let l = LOOSE_MAX_LENGTH;

        let i;
        for (i = 0; i < l; ++i) {
            // Check length
            if (this.isEmpty(trimmed[i])) {
                // TOO_SHORT_ERROR
                this.addError(message.format({value: data}));
                return;
            }

            // Hyphens must occur every fifth position
            // xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx
            //     ^    ^    ^    ^    ^    ^    ^
            if ('-' === trimmed[i]) {
                if (i !== h) {
                    // INVALID_HYPHEN_PLACEMENT_ERROR
                    this.addError(message.format({value: data}));
                    return;
                }

                h += 5;

                continue;
            }

            // Missing hyphens are ignored
            if (i === h) {
                h += 4;
                --l;
            }

            // Check characters
            if (!this.ctype_xdigit(trimmed[i])) {
                // INVALID_CHARACTERS_ERROR
                this.addError(message.format({value: data}));
                return;
            }
        }

        // Check length again
        if (!this.isEmpty(trimmed[i])) {
            // TOO_LONG_ERROR
            this.addError(message.format({value: data}));
        }
    }

    ctype_xdigit(number) {
        return /^[0-9A-Fa-f]$/.test(number);
    }

    hexdec(string) {
      string = (string + '').replace(/[^a-f0-9]/gi, '')

      return parseInt(string, 16)
    }

    trim(string, character_mask) {
        let whitespace = [' ', '\n', '\r', '\t', '\f', '\x0b', '\xa0', '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006', '\u2007', '\u2008', '\u2009', '\u200a', '\u200b', '\u2028', '\u2029', '\u3000'].join('');

        let l = 0;
        let i = 0;
        string += '';

        if(character_mask){
            for (var characterKey in character_mask){
                if(character_mask.hasOwnProperty(characterKey)){
                    let exp = '\\' + character_mask[characterKey];
                    string = string.replace(new RegExp(exp, 'g'), '');
                }
            }
        }

        l = string.length;
        for (i = 0; i < l; i++) {
            if (whitespace.indexOf(string.charAt(i)) === -1) {
                string = string.substring(i);
                break;
            }
        }

        l = string.length;
        for (i = l - 1; i >= 0; i--) {
            if (whitespace.indexOf(string.charAt(i)) === -1) {
                string = string.substring(0, i + 1);
                break;
            }
        }

        return whitespace.indexOf(string.charAt(0)) === -1 ? string : '';
    }
}
