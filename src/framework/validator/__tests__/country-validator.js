'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('country', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'country')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'country')).toBe(toBe);
        });

        test('DZ', () => {
            expect(abv.isValidWithErrorMessage('DZ', 'country')).toBe(toBe);
        });

        test('VA', () => {
            expect(abv.isValidWithErrorMessage('VA', 'country')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('en', () => {
            expect(abv.isValidWithErrorMessage('en', 'country')).toBe("This value is not a valid country.");
        });

        test('fr', () => {
            expect(abv.isValidWithErrorMessage('fr', 'country')).toBe("This value is not a valid country.");
        });

        test('fr_FR', () => {
            expect(abv.isValidWithErrorMessage('fr_FR', 'country')).toBe("This value is not a valid country.");
        });

        test('ar-dz', () => {
            expect(abv.isValidWithErrorMessage('ar-dz', 'country')).toBe("This value is not a valid country.");
        });

        test('en-nz', () => {
            expect(abv.isValidWithErrorMessage('en-nz', 'country')).toBe("This value is not a valid country.");
        });

        test('en-NZ', () => {
            expect(abv.isValidWithErrorMessage('en-NZ', 'country')).toBe("This value is not a valid country.");
        });

        test('America/New_York', () => {
            expect(abv.isValidWithErrorMessage('America/New_York', 'country')).toBe("This value is not a valid country.");
        });

        test('Europe/Paris', () => {
            expect(abv.isValidWithErrorMessage('Europe/Paris', 'country')).toBe("This value is not a valid country.");
        });

        test('Europe/Kiev', () => {
            expect(abv.isValidWithErrorMessage('Europe/Kiev', 'country')).toBe("This value is not a valid country.");
        });

        test('-60', () => {
            expect(abv.isValidWithErrorMessage('-60', 'country')).toBe("This value is not a valid country.");
        });

        test('+0100', () => {
            expect(abv.isValidWithErrorMessage('+0100', 'country')).toBe("This value is not a valid country.");
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'country')).toBe("This value is not a valid country.");
        });

        test('Not Empty String', () => {
            expect(abv.isValidWithErrorMessage('lorem ipsum', 'country')).toBe("This value is not a valid country.");
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'country')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'country')).toBe("This value should be of type scalar.");
        });
    });
});