'use strict';

const abv = require('../../build/output/bob-validator');

describe('language', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'language')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'language')).toBe(toBe);
        });

        test('en', () => {
            expect(abv.isValidWithErrorMessage('en', 'language')).toBe(toBe);
        });

        test('fr', () => {
            expect(abv.isValidWithErrorMessage('fr', 'language')).toBe(toBe);
        });

        test('ar-dz', () => {
            expect(abv.isValidWithErrorMessage('ar-dz', 'language')).toBe(toBe);
        });

        test('en-nz', () => {
            expect(abv.isValidWithErrorMessage('en-nz', 'language')).toBe(toBe);
        });

        test('en-NZ', () => {
            expect(abv.isValidWithErrorMessage('en-NZ', 'language')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('America/New_York', () => {
            expect(abv.isValidWithErrorMessage('America/New_York', 'language')).toBe("This value is not a valid language.");
        });

        test('Europe/Paris', () => {
            expect(abv.isValidWithErrorMessage('Europe/Paris', 'language')).toBe("This value is not a valid language.");
        });

        test('Europe/Kiev', () => {
            expect(abv.isValidWithErrorMessage('Europe/Kiev', 'language')).toBe("This value is not a valid language.");
        });

        test('-60', () => {
            expect(abv.isValidWithErrorMessage('-60', 'language')).toBe("This value is not a valid language.");
        });

        test('+0100', () => {
            expect(abv.isValidWithErrorMessage('+0100', 'language')).toBe("This value is not a valid language.");
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'language')).toBe("This value is not a valid language.");
        });

        test('Not Empty String', () => {
            expect(abv.isValidWithErrorMessage('lorem ipsum', 'language')).toBe("This value is not a valid language.");
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'language')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'language')).toBe("This value should be of type scalar.");
        });
    });
});