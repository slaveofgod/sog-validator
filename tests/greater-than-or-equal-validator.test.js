'use strict';

const abv = require('../build/output/bob-validator');

describe('greater-than-or-equal', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('1995-12-17T03:24:00 >= new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "greater-than-or-equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('0 >= false', () => {
            expect(abv.isValidWithErrorMessage(0, 'greater-than-or-equal:{"value":false}')).toBe(toBe);
        });

        test('1 >= true', () => {
            expect(abv.isValidWithErrorMessage(1, 'greater-than-or-equal:{"value":true}')).toBe(toBe);
        });

        test('12345 >= "12345"', () => {
            expect(abv.isValidWithErrorMessage(12345, 'greater-than-or-equal:{"value":"12345"}')).toBe(toBe);
        });

        test('"a@a.com" >= "a@a.com"', () => {
            expect(abv.isValidWithErrorMessage('a@a.com', 'greater-than-or-equal:{"value":"a@a.com"}')).toBe(toBe);
        });

        test('false >= false', () => {
            expect(abv.isValidWithErrorMessage(false, 'greater-than-or-equal:{"value":false}')).toBe(toBe);
        });

        test('0.00000002 >= 0.00000001', () => {
            expect(abv.isValidWithErrorMessage(0.00000002, 'greater-than-or-equal:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('1996-12-17T03:24:00 >= new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1996-12-17T03:24:00', {
                "greater-than-or-equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('1995-12-17T03:24:00 >= new Date("1995-12-17T03:21:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "greater-than-or-equal": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe(toBe);
        });

        test('true >= false', () => {
            expect(abv.isValidWithErrorMessage(true, 'greater-than-or-equal:{"value":false}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('false >= true', () => {
            expect(abv.isValidWithErrorMessage(false, 'greater-than-or-equal:{"value":true}')).toBe("This value should be greater than or equal to true.");
        });

        test('12345 >= "12346"', () => {
            expect(abv.isValidWithErrorMessage(12345, 'greater-than-or-equal:{"value":"12346"}')).toBe("This value should be greater than or equal to 12346.");
        });

        test('1995-12-17T03:24:00 >= new Date("1996-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "greater-than-or-equal": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe("This value should be greater than or equal to Tue Dec 17 1996 03:24:00 GMT+0200 (Eastern European Standard Time).");
        });

        test('Lorem ipsum >= new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', {
                "greater-than-or-equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be greater than or equal to Sun Dec 17 1995 03:24:00 GMT+0200 (Eastern European Standard Time).");
        });

        test('"true" >= true', () => {
            expect(abv.isValidWithErrorMessage("true", 'greater-than-or-equal:{"value":true}')).toBe("This value should be greater than or equal to true.");
        });
    });
});