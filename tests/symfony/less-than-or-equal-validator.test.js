'use strict';

const sogv = require('../../build/output/sog-validator');

describe('less-than-or-equal', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'less-than-or-equal:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'less-than-or-equal:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 < new Date("1996-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "max": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('1995-12-17T03:24:00 < new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "less-than-or-equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('false < true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'max:{"value":true}')).toBe(toBe);
        });

        test('12345 < "12346"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'less-than-or-equal:{"value":"12346"}')).toBe(toBe);
        });

        test('0 < false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'less-than-or-equal:{"value":false}')).toBe(toBe);
        });

        test('1 < true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'less-than-or-equal:{"value":true}')).toBe(toBe);
        });

        test('12345 < "12345"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'less-than-or-equal:{"value":"12345"}')).toBe(toBe);
        });

        test('"a@a.com" < "a@a.com"', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'less-than-or-equal:{"value":"a@a.com"}')).toBe(toBe);
        });

        test('false < false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'less-than-or-equal:{"value":false}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('0.00000002 < 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000002, 'less-than-or-equal:{"value":"0.00000001"}')).toBe("This value should be less than or equal to 0.00000001.");
        });

        test('1996-12-17T03:24:00 < new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1996-12-17T03:24:00', {
                "less-than-or-equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be less than or equal to December 17, 1995 3:24 AM.");
        });

        test('Lorem ipsum < new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', {
                "less-than-or-equal": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be less than or equal to December 17, 1995 3:24 AM.");
        });

        test('1995-12-17T03:24:00 < new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "less-than-or-equal": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("This value should be less than or equal to December 17, 1995 3:21 AM.");
        });

        test('"true" < true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'less-than-or-equal:{"value":true}')).toBe("This value should be less than or equal to true.");
        });

        test('true < false', () => {
            expect(sogv.isValidWithErrorMessage(true, 'less-than-or-equal:{"value":false}')).toBe("This value should be less than or equal to false.");
        });
    });
});