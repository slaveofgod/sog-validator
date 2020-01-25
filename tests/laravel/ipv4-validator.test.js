'use strict';

const abv = require('../../build/output/bob-validator');

describe('ipv4', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'ipv4')).toBe(toBe);
        });

        test('127.0.0.1', () => {
            expect(abv.isValidWithErrorMessage('127.0.0.1', 'ipv4')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('Lorem ipsum', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'ipv4')).toBe("The value must be a valid IPv4 address.");
        })

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'ipv4')).toBe("The value must be a valid IPv4 address.");
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'ipv4')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'ipv4')).toBe("This value should be of type scalar.");
        });
    });
});