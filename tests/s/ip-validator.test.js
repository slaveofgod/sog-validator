'use strict';

const sogv = require('../../build/output/sog-validator');

describe('ip', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'ip')).toBe(toBe);
        });

        test('127.0.0.1', () => {
            expect(sogv.isValidWithErrorMessage('127.0.0.1', 'ip')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('Lorem ipsum', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'ip')).toBe("This is not a valid IP address.");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'ip')).toBe("This is not a valid IP address.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'ip')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'ip')).toBe("This value should be of type scalar.");
        });
    });
});