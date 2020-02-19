'use strict';

const sogv = require('../../build/output/sog-validator');

describe('greater-than-or-equal', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'greater-than-or-equal:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'greater-than-or-equal:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 >= new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "min": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('0 >= false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'greater-than-or-equal:{"value":false}')).toBe(toBe);
        });

        test('1 >= true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'greater-than-or-equal:{"value":true}')).toBe(toBe);
        });

        test('12345 >= "12345"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'greater-than-or-equal:{"value":"12345"}')).toBe(toBe);
        });

        test('"a@a.com" >= "a@a.com"', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'greater-than-or-equal:{"value":"a@a.com"}')).toBe(toBe);
        });

        test('false >= false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'greater-than-or-equal:{"value":false}')).toBe(toBe);
        });

        test('0.00000002 >= 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000002, 'greater-than-or-equal:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('1996-12-17T03:24:00 >= new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1996-12-17T03:24:00', {
                "greater-than-or-equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('1995-12-17T03:24:00 >= new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "min": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe(toBe);
        });

        test('true >= false', () => {
            expect(sogv.isValidWithErrorMessage(true, 'greater-than-or-equal:{"value":false}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('false >= true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'greater-than-or-equal:{"value":true}')).toBe("This value should be greater than or equal to true.");
        });

        test('12345 >= "12346"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'greater-than-or-equal:{"value":"12346"}')).toBe("This value should be greater than or equal to 12346.");
        });

        test('1995-12-17T03:24:00 >= new Date("1996-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "greater-than-or-equal": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe("This value should be greater than or equal to December 17, 1996 3:24 AM.");
        });

        test('Lorem ipsum >= new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', {
                "min": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be greater than or equal to December 17, 1995 3:24 AM.");
        });

        test('"true" >= true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'greater-than-or-equal:{"value":true}')).toBe("This value should be greater than or equal to true.");
        });
    });
});