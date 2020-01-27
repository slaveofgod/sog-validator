'use strict';

const abv = require('../../build/output/sog-validator');

describe('ipv6', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'ipv6')).toBe(toBe);
        });

        test('127.0.0.1', () => {
            expect(abv.isValidWithErrorMessage('127.0.0.1', 'ipv6')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('Lorem ipsum', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'ipv6')).toBe("The value must be a valid IPv6 address.");
        })

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'ipv6')).toBe("The value must be a valid IPv6 address.");
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'ipv6')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'ipv6')).toBe("This value should be of type scalar.");
        });
    });
});