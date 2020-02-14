'use strict';

const sogv = require('../../build/output/sog-validator');

describe('divisible-by', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'divisible-by:{"value":2}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'divisible-by:{"value":2}')).toBe(toBe);
        });

        test('10 divisible by 2', () => {
            expect(sogv.isValidWithErrorMessage(10, 'divisible-by:{"value":2}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 divisible by new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "divisible-by": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('10.20 divisible by 2', () => {
            expect(sogv.isValidWithErrorMessage(10.20, 'divisible-by:{"value":2}')).toBe("This value should be a multiple of 2.");
        });

        test('1995-12-17T03:24:00 divisible by new Date("1996-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "divisible-by": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe("This value should be a multiple of December 17, 1996 3:24 AM.");
        });

        test('false divisible by true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'divisible-by:{"value":true}')).toBe("This value should be a multiple of true.");
        });

        test('12345 divisible by "12346"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'divisible-by:{"value":"12346"}')).toBe("This value should be a multiple of 12346.");
        });

        test('0 divisible by false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'divisible-by:{"value":false}')).toBe("This value should be a multiple of false.");
        });

        test('1 divisible by true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'divisible-by:{"value":true}')).toBe("This value should be a multiple of true.");
        });

        test('12345 divisible by "12345"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'divisible-by:{"value":"12345"}')).toBe("This value should be a multiple of 12345.");
        });

        test('false divisible by false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'divisible-by:{"value":false}')).toBe("This value should be a multiple of false.");
        });
    });
});