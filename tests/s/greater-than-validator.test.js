'use strict';

const sogv = require('../../build/output/sog-validator');

describe('greater-than', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'greater-than:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'greater-than:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('true > false', () => {
            expect(sogv.isValidWithErrorMessage(true, 'greater-than:{"value":false}')).toBe(toBe);
        });

        test('0.00000002 > 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000002, 'greater-than:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 > new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "greater-than": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {

        test('1995-12-17T03:24:00 > new Date("1996-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "greater-than": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe("This value should be greater than December 17, 1996 3:24 AM.");
        });

        test('false > true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'greater-than:{"value":true}')).toBe("This value should be greater than true.");
        });

        test('12345 > "12346"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'greater-than:{"value":"12346"}')).toBe("This value should be greater than 12346.");
        });

        test('0 > false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'greater-than:{"value":false}')).toBe("This value should be greater than false.");
        });

        test('1 > true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'greater-than:{"value":true}')).toBe("This value should be greater than true.");
        });

        test('12345 > "12345"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'greater-than:{"value":"12345"}')).toBe("This value should be greater than 12345.");
        });

        test('"a@a.com" > "a@a.com"', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'greater-than:{"value":"a@a.com"}')).toBe("This value should be greater than a@a.com.");
        });

        test('1995-12-17T03:24:00 > new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "greater-than": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be greater than December 17, 1995 3:24 AM.");
        });

        test('Lorem ipsum > new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', {
                "greater-than": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be greater than December 17, 1995 3:24 AM.");
        });

        test('"true" > true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'greater-than:{"value":true}')).toBe("This value should be greater than true.");
        });

        test('false > false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'greater-than:{"value":false}')).toBe("This value should be greater than false.");
        });
    });
});