'use strict';

const abv = require('../../build/output/sog-validator');

describe('ip', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'ip')).toBe(toBe);
        });

        test('127.0.0.1', () => {
            expect(abv.isValidWithErrorMessage('127.0.0.1', 'ip')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('Lorem ipsum', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'ip')).toBe("This is not a valid IP address.");
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'ip')).toBe("This is not a valid IP address.");
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'ip')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'ip')).toBe("This value should be of type scalar.");
        });
    });
});