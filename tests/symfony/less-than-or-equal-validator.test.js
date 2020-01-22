'use strict';

const abv = require('../../build/output/bob-validator');

describe('less-than-or-equal', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'less-than-or-equal:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'less-than-or-equal:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 < new Date("1996-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "less-than-or-equal": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('1995-12-17T03:24:00 < new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "less-than-or-equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('false < true', () => {
            expect(abv.isValidWithErrorMessage(false, 'less-than-or-equal:{"value":true}')).toBe(toBe);
        });

        test('12345 < "12346"', () => {
            expect(abv.isValidWithErrorMessage(12345, 'less-than-or-equal:{"value":"12346"}')).toBe(toBe);
        });

        test('0 < false', () => {
            expect(abv.isValidWithErrorMessage(0, 'less-than-or-equal:{"value":false}')).toBe(toBe);
        });

        test('1 < true', () => {
            expect(abv.isValidWithErrorMessage(1, 'less-than-or-equal:{"value":true}')).toBe(toBe);
        });

        test('12345 < "12345"', () => {
            expect(abv.isValidWithErrorMessage(12345, 'less-than-or-equal:{"value":"12345"}')).toBe(toBe);
        });

        test('"a@a.com" < "a@a.com"', () => {
            expect(abv.isValidWithErrorMessage('a@a.com', 'less-than-or-equal:{"value":"a@a.com"}')).toBe(toBe);
        });

        test('false < false', () => {
            expect(abv.isValidWithErrorMessage(false, 'less-than-or-equal:{"value":false}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('0.00000002 < 0.00000001', () => {
            expect(abv.isValidWithErrorMessage(0.00000002, 'less-than-or-equal:{"value":"0.00000001"}')).toBe("This value should be less than or equal to 0.00000001.");
        });

        test('1996-12-17T03:24:00 < new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1996-12-17T03:24:00', {
                "less-than-or-equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be less than or equal to December 17, 1995 3:24 AM.");
        });

        test('Lorem ipsum < new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', {
                "less-than-or-equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be less than or equal to December 17, 1995 3:24 AM.");
        });

        test('1995-12-17T03:24:00 < new Date("1995-12-17T03:21:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "less-than-or-equal": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("This value should be less than or equal to December 17, 1995 3:21 AM.");
        });

        test('"true" < true', () => {
            expect(abv.isValidWithErrorMessage("true", 'less-than-or-equal:{"value":true}')).toBe("This value should be less than or equal to true.");
        });

        test('true < false', () => {
            expect(abv.isValidWithErrorMessage(true, 'less-than-or-equal:{"value":false}')).toBe("This value should be less than or equal to false.");
        });
    });
});