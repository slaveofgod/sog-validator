'use strict';

const abv = require('../../build/output/bob-validator');

describe('greater-than', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('true > false', () => {
            expect(abv.isValidWithErrorMessage(true, 'greater-than:{"value":false}')).toBe(toBe);
        });

        test('0.00000002 > 0.00000001', () => {
            expect(abv.isValidWithErrorMessage(0.00000002, 'greater-than:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 > new Date("1995-12-17T03:21:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "greater-than": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {

        test('1995-12-17T03:24:00 > new Date("1996-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "greater-than": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe("This value should be greater than Tue Dec 17 1996 03:24:00 GMT+0200 (Eastern European Standard Time).");
        });

        test('false > true', () => {
            expect(abv.isValidWithErrorMessage(false, 'greater-than:{"value":true}')).toBe("This value should be greater than true.");
        });

        test('12345 > "12346"', () => {
            expect(abv.isValidWithErrorMessage(12345, 'greater-than:{"value":"12346"}')).toBe("This value should be greater than 12346.");
        });

        test('0 > false', () => {
            expect(abv.isValidWithErrorMessage(0, 'greater-than:{"value":false}')).toBe("This value should be greater than false.");
        });

        test('1 > true', () => {
            expect(abv.isValidWithErrorMessage(1, 'greater-than:{"value":true}')).toBe("This value should be greater than true.");
        });

        test('12345 > "12345"', () => {
            expect(abv.isValidWithErrorMessage(12345, 'greater-than:{"value":"12345"}')).toBe("This value should be greater than 12345.");
        });

        test('"a@a.com" > "a@a.com"', () => {
            expect(abv.isValidWithErrorMessage('a@a.com', 'greater-than:{"value":"a@a.com"}')).toBe("This value should be greater than a@a.com.");
        });

        test('1995-12-17T03:24:00 > new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "greater-than": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be greater than Sun Dec 17 1995 03:24:00 GMT+0200 (Eastern European Standard Time).");
        });

        test('Lorem ipsum > new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', {
                "greater-than": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be greater than Sun Dec 17 1995 03:24:00 GMT+0200 (Eastern European Standard Time).");
        });

        test('"true" > true', () => {
            expect(abv.isValidWithErrorMessage("true", 'greater-than:{"value":true}')).toBe("This value should be greater than true.");
        });

        test('false > false', () => {
            expect(abv.isValidWithErrorMessage(false, 'greater-than:{"value":false}')).toBe("This value should be greater than false.");
        });
    });
});