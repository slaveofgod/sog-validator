'use strict';

const sogv = require('../../build/output/sog-validator');

describe('country', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'country')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'country')).toBe(toBe);
        });

        test('DZ', () => {
            expect(sogv.isValidWithErrorMessage('DZ', 'country')).toBe(toBe);
        });

        test('VA', () => {
            expect(sogv.isValidWithErrorMessage('VA', 'country')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('en', () => {
            expect(sogv.isValidWithErrorMessage('en', 'country')).toBe("This value is not a valid country.");
        });

        test('fr', () => {
            expect(sogv.isValidWithErrorMessage('fr', 'country')).toBe("This value is not a valid country.");
        });

        test('fr_FR', () => {
            expect(sogv.isValidWithErrorMessage('fr_FR', 'country')).toBe("This value is not a valid country.");
        });

        test('ar-dz', () => {
            expect(sogv.isValidWithErrorMessage('ar-dz', 'country')).toBe("This value is not a valid country.");
        });

        test('en-nz', () => {
            expect(sogv.isValidWithErrorMessage('en-nz', 'country')).toBe("This value is not a valid country.");
        });

        test('en-NZ', () => {
            expect(sogv.isValidWithErrorMessage('en-NZ', 'country')).toBe("This value is not a valid country.");
        });

        test('America/New_York', () => {
            expect(sogv.isValidWithErrorMessage('America/New_York', 'country')).toBe("This value is not a valid country.");
        });

        test('Europe/Paris', () => {
            expect(sogv.isValidWithErrorMessage('Europe/Paris', 'country')).toBe("This value is not a valid country.");
        });

        test('Europe/Kiev', () => {
            expect(sogv.isValidWithErrorMessage('Europe/Kiev', 'country')).toBe("This value is not a valid country.");
        });

        test('-60', () => {
            expect(sogv.isValidWithErrorMessage('-60', 'country')).toBe("This value is not a valid country.");
        });

        test('+0100', () => {
            expect(sogv.isValidWithErrorMessage('+0100', 'country')).toBe("This value is not a valid country.");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'country')).toBe("This value is not a valid country.");
        });

        test('Not Empty String', () => {
            expect(sogv.isValidWithErrorMessage('lorem ipsum', 'country')).toBe("This value is not a valid country.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'country')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'country')).toBe("This value should be of type scalar.");
        });
    });
});