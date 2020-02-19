'use strict';

const sogv = require('../../build/output/sog-validator');

describe('locale', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'locale')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'locale')).toBe(toBe);
        });

        test('en', () => {
            expect(sogv.isValidWithErrorMessage('en', 'locale')).toBe(toBe);
        });

        test('fr', () => {
            expect(sogv.isValidWithErrorMessage('fr', 'locale')).toBe(toBe);
        });

        test('fr_FR', () => {
            expect(sogv.isValidWithErrorMessage('fr_FR', 'locale')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('ar-dz', () => {
            expect(sogv.isValidWithErrorMessage('ar-dz', 'locale')).toBe("This value is not a valid locale.");
        });

        test('en-nz', () => {
            expect(sogv.isValidWithErrorMessage('en-nz', 'locale')).toBe("This value is not a valid locale.");
        });

        test('en-NZ', () => {
            expect(sogv.isValidWithErrorMessage('en-NZ', 'locale')).toBe("This value is not a valid locale.");
        });

        test('America/New_York', () => {
            expect(sogv.isValidWithErrorMessage('America/New_York', 'locale')).toBe("This value is not a valid locale.");
        });

        test('Europe/Paris', () => {
            expect(sogv.isValidWithErrorMessage('Europe/Paris', 'locale')).toBe("This value is not a valid locale.");
        });

        test('Europe/Kiev', () => {
            expect(sogv.isValidWithErrorMessage('Europe/Kiev', 'locale')).toBe("This value is not a valid locale.");
        });

        test('-60', () => {
            expect(sogv.isValidWithErrorMessage('-60', 'locale')).toBe("This value is not a valid locale.");
        });

        test('+0100', () => {
            expect(sogv.isValidWithErrorMessage('+0100', 'locale')).toBe("This value is not a valid locale.");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'locale')).toBe("This value is not a valid locale.");
        });

        test('Not Empty String', () => {
            expect(sogv.isValidWithErrorMessage('lorem ipsum', 'locale')).toBe("This value is not a valid locale.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'locale')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'locale')).toBe("This value should be of type scalar.");
        });
    });
});