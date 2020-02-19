'use strict';

const sogv = require('../../build/output/sog-validator');

describe('timezone', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'timezone')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'timezone')).toBe(toBe);
        });

        test('America/New_York', () => {
            expect(sogv.isValidWithErrorMessage('America/New_York', 'timezone')).toBe(toBe);
        });

        test('Europe/Paris', () => {
            expect(sogv.isValidWithErrorMessage('Europe/Paris', 'timezone')).toBe(toBe);
        });

        test('Europe/Kiev', () => {
            expect(sogv.isValidWithErrorMessage('Europe/Kiev', 'timezone')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {

        test('-60', () => {
            expect(sogv.isValidWithErrorMessage('-60', 'timezone')).toBe("This value is not a valid timezone.");
        });

        test('+0100', () => {
            expect(sogv.isValidWithErrorMessage('+0100', 'timezone')).toBe("This value is not a valid timezone.");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'timezone')).toBe("This value is not a valid timezone.");
        });

        test('Not Empty String', () => {
            expect(sogv.isValidWithErrorMessage('lorem ipsum', 'timezone')).toBe("This value is not a valid timezone.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'timezone')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'timezone')).toBe("This value should be of type scalar.");
        });
    });
});