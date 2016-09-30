/**
 * Validates that a value is a valid URL string.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 * @todo: checkDNS, dnsMessage, protocols
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class UrlValidator extends Validator {
    constructor() {
        super(arguments);

        var message = arguments[0]['message'];
        var dnsMessage = arguments[0]['dnsMessage'];
        var protocols = arguments[0]['protocols'];
        var checkDNS = arguments[0]['checkDNS'];

        this.configuring();

        this.setMessage('message', message);
        this.setMessage('dnsMessage', dnsMessage);

        this.setParameter('protocols', protocols);
        this.setParameter('checkDNS', checkDNS);
    }

    configuring() {
        this.setDefaultMessages({
            'message': 'This value is not a valid URL.',
            'dnsMessage': 'The host could not be resolved.',
        });

        this.setDefaultParameters({
            'protocols': ['http', 'https'],
            'checkDNS': false,
        });
    }

    /**
     * https://mathiasbynens.be/demo/url-regex
     */
    validate(data, errorType) {
        errorType = (errorType == null) ? 'array' : errorType;
        this.setErrorType(errorType);
        this.resetErrors();

        if(/^([a-z][a-z0-9\*\-\.]*):\/\/(?:(?:(?:[\w\.\-\+!$&'\(\)*\+,;=]|%[0-9a-f]{2})+:)*(?:[\w\.\-\+%!$&'\(\)*\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\-\.]|%[0-9a-f]{2})+|(?:\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\]))(?::[0-9]+)?(?:[\/|\?](?:[\w#!:\.\?\+=&@!$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})*)?$/i.test(data) == false){
            this.addError(this.getMessage('message'));
        }
    }
}

module.exports = UrlValidator;