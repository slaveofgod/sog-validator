'use strict';

const abv = require('../../build/output/sog-validator');

describe('after_or_equal', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'after_or_equal:{"value": "1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'after_or_equal:{"value": "1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 >= 1995-12-17T03:21:00', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', 'after-or-equal:{"value": "1995-12-17T03:21:00"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 >= new Date("1995-12-17T03:21:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "after_or_equal": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe(toBe);
        });

        test('1995-12-17T03:21:00 >= 1995-12-17T03:21:00', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:21:00', 'after_or_equal:{"value": "1995-12-17T03:21:00"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1995-12-17T03:21:00 >= 1995-12-17T03:24:00', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:21:00', 'after_or_equal:{"value": "1995-12-17T03:24:00"}')).toBe("The value must be a date after or equal to 1995-12-17T03:21:00.");
        });

        test('1995-12-17T03:21:00 >= new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:21:00', {
                "after_or_equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("The value must be a date after or equal to 1995-12-17T03:21:00.");
        });
    });
});