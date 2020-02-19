'use strict';

const sogv = require('../../build/output/sog-validator');

describe('language', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'language')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'language')).toBe(toBe);
        });

        test('en', () => {
            expect(sogv.isValidWithErrorMessage('en', 'language')).toBe(toBe);
        });

        test('fr', () => {
            expect(sogv.isValidWithErrorMessage('fr', 'language')).toBe(toBe);
        });

        test('ar-dz', () => {
            expect(sogv.isValidWithErrorMessage('ar-dz', 'language')).toBe(toBe);
        });

        test('en-nz', () => {
            expect(sogv.isValidWithErrorMessage('en-nz', 'language')).toBe(toBe);
        });

        test('en-NZ', () => {
            expect(sogv.isValidWithErrorMessage('en-NZ', 'language')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('America/New_York', () => {
            expect(sogv.isValidWithErrorMessage('America/New_York', 'language')).toBe("This value is not a valid language.");
        });

        test('Europe/Paris', () => {
            expect(sogv.isValidWithErrorMessage('Europe/Paris', 'language')).toBe("This value is not a valid language.");
        });

        test('Europe/Kiev', () => {
            expect(sogv.isValidWithErrorMessage('Europe/Kiev', 'language')).toBe("This value is not a valid language.");
        });

        test('-60', () => {
            expect(sogv.isValidWithErrorMessage('-60', 'language')).toBe("This value is not a valid language.");
        });

        test('+0100', () => {
            expect(sogv.isValidWithErrorMessage('+0100', 'language')).toBe("This value is not a valid language.");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'language')).toBe("This value is not a valid language.");
        });

        test('Not Empty String', () => {
            expect(sogv.isValidWithErrorMessage('lorem ipsum', 'language')).toBe("This value is not a valid language.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'language')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'language')).toBe("This value should be of type scalar.");
        });
    });
});