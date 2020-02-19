'use strict';

const sogv = require('../../build/output/sog-validator');

describe('time', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'time')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'time')).toBe(toBe);
        });

        test('22:15:18', () => {
            expect(sogv.isValidWithErrorMessage('22:15:18', 'time')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('28:65:89', () => {
            expect(sogv.isValidWithErrorMessage('28:65:89', 'time')).toBe("This value is not a valid time.");
        });

        test('1958-06-15', () => {
            expect(sogv.isValidWithErrorMessage('1958-06-15', 'time')).toBe("This value is not a valid time.");
        });

        test('1958-28-48', () => {
            expect(sogv.isValidWithErrorMessage('1958-28-48', 'time')).toBe("This value is not a valid time.");
        });

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'time')).toBe("This value is not a valid time.");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'time')).toBe("This value is not a valid time.");
        });

        test('Not Empty String', () => {
            expect(sogv.isValidWithErrorMessage('lorem ipsum', 'time')).toBe("This value is not a valid time.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'time')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'time')).toBe("This value should be of type scalar.");
        });
    });
});