/**
 * Validates that a value is a valid Universally unique identifier (UUID) per RFC 4122.
 * By default, this will validate the format according to the RFC's guidelines, but this can be relaxed to accept non-standard UUIDs that other systems (like PostgreSQL) accept.
 * UUID versions can also be restricted using a whitelist.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class UuidValidator extends Validator {
    constructor() {
        super(arguments);

        var message = arguments[0]['message'];
        var strict = arguments[0]['strict'];
        var versions = arguments[0]['versions'];

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
        this.consts = {};

        // The strict pattern matches UUIDs like this:
        // xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx

        // Roughly speaking:
        // x = any hexadecimal character
        // M = any allowed version {1..5}
        // N = any allowed variant {8, 9, a, b}

        this.consts['STRICT_LENGTH'] = 36;
        this.consts['STRICT_FIRST_HYPHEN_POSITION'] = 8;
        this.consts['STRICT_LAST_HYPHEN_POSITION'] = 23;
        this.consts['STRICT_VERSION_POSITION'] = 14;
        this.consts['STRICT_VARIANT_POSITION'] = 19;

        // The loose pattern validates similar yet non-compliant UUIDs.
        // Hyphens are completely optional. If present, they should only appear
        // between every fourth character:
        // xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx
        // xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxx-xxxx
        // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        // The value can also be wrapped with characters like []{}:
        // {xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx}

        // Neither the version nor the variant is validated by this pattern.

        this.consts['LOOSE_MAX_LENGTH'] = 39;
        this.consts['LOOSE_FIRST_HYPHEN_POSITION'] = 4;

        // Possible versions defined by RFC 4122

        this.consts['V1_MAC'] = 1;
        this.consts['V2_DCE'] = 2;
        this.consts['V3_MD5'] = 3;
        this.consts['V4_RANDOM'] = 4;
        this.consts['V5_SHA1'] = 5;

        this.setDefaultMessages({
            'message': 'This is not a valid UUID.',
        });

        this.setDefaultParameters({
            'strict': true,
            'versions': [this.consts['V1_MAC'], this.consts['V2_DCE'], this.consts['V3_MD5'], this.consts['V4_RANDOM'], this.consts['V5_SHA1']]
        });
    }

    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

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
        var message = this.getMessage('message');

        // Error priority:
        // 1. ERROR_INVALID_CHARACTERS
        // 2. ERROR_INVALID_HYPHEN_PLACEMENT
        // 3. ERROR_TOO_SHORT/ERROR_TOO_LONG
        // 4. ERROR_INVALID_VERSION
        // 5. ERROR_INVALID_VARIANT

        // Position of the next expected hyphen
        var h = this.consts['STRICT_FIRST_HYPHEN_POSITION'];

        var i = 0;
        for (i = 0; i < this.consts['STRICT_LENGTH']; ++i) {
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
                if (h < this.consts['STRICT_LAST_HYPHEN_POSITION']) {
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
        if(!this.inArray(data[this.consts['STRICT_VERSION_POSITION']], this.getParameter('versions'), false)){
            // INVALID_VERSION_ERROR
            this.addError(message.format({value: data}));
        }

        // Check variant - first two bits must equal "10"
        //   0b10xx
        // & 0b1100 (12)
        // = 0b1000 (8)
        if ((this.hexdec(data[this.consts['STRICT_VARIANT_POSITION']]) & 12) !== 8) {
            // INVALID_VARIANT_ERROR
            this.addError(message.format({value: data}));
        }
    }

    validateLoose(data) {
        var message = this.getMessage('message');

        // Error priority:
        // 1. ERROR_INVALID_CHARACTERS
        // 2. ERROR_INVALID_HYPHEN_PLACEMENT
        // 3. ERROR_TOO_SHORT/ERROR_TOO_LONG

        // Trim any wrapping characters like [] or {} used by some legacy systems
        var trimmed = this.trim(data, '[]{}');

        // Position of the next expected hyphen
        var h = this.consts['LOOSE_FIRST_HYPHEN_POSITION'];

        // Expected length
        var l = this.consts['LOOSE_MAX_LENGTH'];

        var i;
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
}

module.exports = UuidValidator;