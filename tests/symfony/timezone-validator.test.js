'use strict';

const abv = require('../../build/output/sog-validator');

describe('timezone', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'timezone')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'timezone')).toBe(toBe);
        });

        test('America/New_York', () => {
            expect(abv.isValidWithErrorMessage('America/New_York', 'timezone')).toBe(toBe);
        });

        test('Europe/Paris', () => {
            expect(abv.isValidWithErrorMessage('Europe/Paris', 'timezone')).toBe(toBe);
        });

        test('Europe/Kiev', () => {
            expect(abv.isValidWithErrorMessage('Europe/Kiev', 'timezone')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {

        test('-60', () => {
            expect(abv.isValidWithErrorMessage('-60', 'timezone')).toBe("This value is not a valid timezone.");
        });

        test('+0100', () => {
            expect(abv.isValidWithErrorMessage('+0100', 'timezone')).toBe("This value is not a valid timezone.");
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'timezone')).toBe("This value is not a valid timezone.");
        });

        test('Not Empty String', () => {
            expect(abv.isValidWithErrorMessage('lorem ipsum', 'timezone')).toBe("This value is not a valid timezone.");
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'timezone')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'timezone')).toBe("This value should be of type scalar.");
        });
    });
});