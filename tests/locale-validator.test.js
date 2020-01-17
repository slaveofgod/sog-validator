'use strict';

const abv = require('../build/output/bob-validator');

describe('locale', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'locale')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'locale')).toBe(toBe);
        });

        test('en', () => {
            expect(abv.isValidWithErrorMessage('en', 'locale')).toBe(toBe);
        });

        test('fr', () => {
            expect(abv.isValidWithErrorMessage('fr', 'locale')).toBe(toBe);
        });

        test('fr_FR', () => {
            expect(abv.isValidWithErrorMessage('fr_FR', 'locale')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('ar-dz', () => {
            expect(abv.isValidWithErrorMessage('ar-dz', 'locale')).toBe("This value is not a valid locale.");
        });

        test('en-nz', () => {
            expect(abv.isValidWithErrorMessage('en-nz', 'locale')).toBe("This value is not a valid locale.");
        });

        test('en-NZ', () => {
            expect(abv.isValidWithErrorMessage('en-NZ', 'locale')).toBe("This value is not a valid locale.");
        });

        test('America/New_York', () => {
            expect(abv.isValidWithErrorMessage('America/New_York', 'locale')).toBe("This value is not a valid locale.");
        });

        test('Europe/Paris', () => {
            expect(abv.isValidWithErrorMessage('Europe/Paris', 'locale')).toBe("This value is not a valid locale.");
        });

        test('Europe/Kiev', () => {
            expect(abv.isValidWithErrorMessage('Europe/Kiev', 'locale')).toBe("This value is not a valid locale.");
        });

        test('-60', () => {
            expect(abv.isValidWithErrorMessage('-60', 'locale')).toBe("This value is not a valid locale.");
        });

        test('+0100', () => {
            expect(abv.isValidWithErrorMessage('+0100', 'locale')).toBe("This value is not a valid locale.");
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'locale')).toBe("This value is not a valid locale.");
        });

        test('Not Empty String', () => {
            expect(abv.isValidWithErrorMessage('lorem ipsum', 'locale')).toBe("This value is not a valid locale.");
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'locale')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'locale')).toBe("This value should be of type scalar.");
        });
    });
});