/**
 * Validates that a value is a valid URL string.
 *
 * @author Alexey Bob <alexey.bob@gmail.com>
 * @todo: checkDNS, dnsMessage, protocols
 */
'use strict';

import Validator from './ValidatorAbstract';

export default class extends Validator {
    constructor({
        message = null,
        dnsMessage = null,
        protocols = null,
        checkDNS = false
    }) {
        super(arguments);

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
    validate(data, errorType = 'array') {
        this.setErrorType(errorType);
        this.resetErrors();

        if(/^([a-z][a-z0-9\*\-\.]*):\/\/(?:(?:(?:[\w\.\-\+!$&'\(\)*\+,;=]|%[0-9a-f]{2})+:)*(?:[\w\.\-\+%!$&'\(\)*\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\-\.]|%[0-9a-f]{2})+|(?:\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\]))(?::[0-9]+)?(?:[\/|\?](?:[\w#!:\.\?\+=&@!$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})*)?$/i.test(data) == false){
            this.addError(this.getMessage('message'));
        }
    }
}
