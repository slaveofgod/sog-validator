'use strict';

const sogv = require('../../build/output/sog-validator');

describe('before_or_equal', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'before_or_equal:{"value": "1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'before_or_equal:{"value": "1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('1995-12-17T03:21:00 <= 1995-12-17T03:24:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', 'before_or_equal:{"value": "1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('1995-12-17T03:21:00 <= new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', {
                "before_or_equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('1995-12-17T03:21:00 <= 1995-12-17T03:21:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', 'before_or_equal:{"value": "1995-12-17T03:21:00"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1995-12-17T03:24:00 <= 1995-12-17T03:21:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', 'before-or-equal:{"value": "1995-12-17T03:21:00"}')).toBe("The value must be a date before or equal to 1995-12-17T03:24:00.");
        });

        test('1995-12-17T03:24:00 <= new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "before_or_equal": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("The value must be a date before or equal to 1995-12-17T03:24:00.");
        });
    });
});