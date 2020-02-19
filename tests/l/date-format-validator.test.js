'use strict';

const sogv = require('../../build/output/sog-validator');

describe('date_format', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'date_format')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'date_format')).toBe(toBe);
        });

        test('1958-06-15 22:15:19', () => {
            expect(sogv.isValidWithErrorMessage('1958-06-15 22:15:19', 'date_format')).toBe(toBe);
        });

        test('2015-08-22 ["format":"YYYY-MM-DD"]', () => {
            expect(sogv.isValidWithErrorMessage('2015-08-22', 'date-format:{"format":"YYYY-MM-DD"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1958-06-15 22:15:19 ["format":"YYYY-MM-DD"]', () => {
            expect(sogv.isValidWithErrorMessage('1958-06-15 22:15:19', 'date_format:{"format":"YYYY-MM-DD"}')).toBe("This value is not a valid datetime.");
        });

        test('1958-28-48', () => {
            expect(sogv.isValidWithErrorMessage('1958-28-48', 'date_format')).toBe("This value should be of type date-string.");
        });

        test('Not Empty String', () => {
            expect(sogv.isValidWithErrorMessage('lorem ipsum', 'date_format')).toBe("This value should be of type date-string.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'date_format')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'date_format')).toBe("This value should be of type scalar.");
        });

        test('1958-06-15', () => {
            expect(sogv.isValidWithErrorMessage('1958-06-15', 'date_format')).toBe("This value is not a valid datetime.");
        });

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'date_format')).toBe("This value is not a valid datetime.");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'date_format')).toBe("This value is not a valid datetime.");
        });
    });
});