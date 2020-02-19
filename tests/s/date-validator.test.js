'use strict';

const sogv = require('../../build/output/sog-validator');

describe('date', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'date')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'date')).toBe(toBe);
        });

        test('1958-06-15', () => {
            expect(sogv.isValidWithErrorMessage('1958-06-15', 'date')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1958-28-48', () => {
            expect(sogv.isValidWithErrorMessage('1958-28-48', 'date')).toBe("This value is not a valid date.");
        });

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'date')).toBe("This value is not a valid date.");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'date')).toBe("This value is not a valid date.");
        });

        test('Not Empty String', () => {
            expect(sogv.isValidWithErrorMessage('lorem ipsum', 'date')).toBe("This value is not a valid date.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'date')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'date')).toBe("This value should be of type scalar.");
        });
    });
});