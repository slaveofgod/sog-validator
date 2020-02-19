'use strict';

const sogv = require('../../build/output/sog-validator');

describe('before', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'before:{"value": "1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'before:{"value": "1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('1995-12-17T03:21:00 < 1995-12-17T03:24:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', 'before:{"value": "1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('1995-12-17T03:21:00 < new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', {
                "before": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1995-12-17T03:21:00 < 1995-12-17T03:21:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', 'before:{"value": "1995-12-17T03:21:00"}')).toBe("The value must be a date before 1995-12-17T03:21:00.");
        });

        test('1995-12-17T03:24:00 < 1995-12-17T03:21:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', 'before:{"value": "1995-12-17T03:21:00"}')).toBe("The value must be a date before 1995-12-17T03:24:00.");
        });

        test('1995-12-17T03:24:00 < new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "before": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("The value must be a date before 1995-12-17T03:24:00.");
        });
    });
});