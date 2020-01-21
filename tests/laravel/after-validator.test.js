'use strict';

const abv = require('../../build/output/bob-validator');

describe('after', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'after:{"value": "1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'after:{"value": "1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 > 1995-12-17T03:21:00', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', 'after:{"value": "1995-12-17T03:21:00"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 > new Date("1995-12-17T03:21:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "after": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1995-12-17T03:21:00 > 1995-12-17T03:21:00', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:21:00', 'after:{"value": "1995-12-17T03:21:00"}')).toBe("The value must be a date after 1995-12-17T03:21:00.");
        });

        test('1995-12-17T03:21:00 > 1995-12-17T03:24:00', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:21:00', 'after:{"value": "1995-12-17T03:24:00"}')).toBe("The value must be a date after 1995-12-17T03:21:00.");
        });

        test('1995-12-17T03:21:00 > new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:21:00', {
                "after": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("The value must be a date after 1995-12-17T03:21:00.");
        });
    });
});