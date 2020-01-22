'use strict';

const abv = require('../../build/output/bob-validator');

describe('date_format', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'date_format')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'date_format')).toBe(toBe);
        });

        test('1958-06-15 22:15:19', () => {
            expect(abv.isValidWithErrorMessage('1958-06-15 22:15:19', 'date_format')).toBe(toBe);
        });

        test('2015-08-22 ["format":"YYYY-MM-DD"]', () => {
            expect(abv.isValidWithErrorMessage('2015-08-22', 'date-format:{"format":"YYYY-MM-DD"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1958-06-15 22:15:19 ["format":"YYYY-MM-DD"]', () => {
            expect(abv.isValidWithErrorMessage('1958-06-15 22:15:19', 'date_format:{"format":"YYYY-MM-DD"}')).toBe("This value is not a valid datetime.");
        });

        test('1958-28-48', () => {
            expect(abv.isValidWithErrorMessage('1958-28-48', 'date_format')).toBe("This value should be of type date-string.");
        });

        test('Not Empty String', () => {
            expect(abv.isValidWithErrorMessage('lorem ipsum', 'date_format')).toBe("This value should be of type date-string.");
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'date_format')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'date_format')).toBe("This value should be of type scalar.");
        });

        test('1958-06-15', () => {
            expect(abv.isValidWithErrorMessage('1958-06-15', 'date_format')).toBe("This value is not a valid datetime.");
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'date_format')).toBe("This value is not a valid datetime.");
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'date_format')).toBe("This value is not a valid datetime.");
        });
    });
});