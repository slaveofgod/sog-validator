'use strict';

const sogv = require('../../build/output/sog-validator');

describe('ipv6', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'ipv6')).toBe(toBe);
        });

        test('127.0.0.1', () => {
            expect(sogv.isValidWithErrorMessage('127.0.0.1', 'ipv6')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('Lorem ipsum', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'ipv6')).toBe("The value must be a valid IPv6 address.");
        })

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'ipv6')).toBe("The value must be a valid IPv6 address.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'ipv6')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'ipv6')).toBe("This value should be of type scalar.");
        });
    });
});