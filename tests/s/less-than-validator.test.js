'use strict';

const sogv = require('../../build/output/sog-validator');

describe('less-than', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'less-than:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'less-than:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 < new Date("1996-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "less-than": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('false < true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'less-than:{"value":true}')).toBe(toBe);
        });

        test('12345 < "12346"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'less-than:{"value":"12346"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('0.00000002 < 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000002, 'less-than:{"value":"0.00000001"}')).toBe("This value should be less than 0.00000001.");
        });

        test('0 < false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'less-than:{"value":false}')).toBe("This value should be less than false.");
        });

        test('1 < true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'less-than:{"value":true}')).toBe("This value should be less than true.");
        });

        test('12345 < "12345"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'less-than:{"value":"12345"}')).toBe("This value should be less than 12345.");
        });

        test('"a@a.com" < "a@a.com"', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'less-than:{"value":"a@a.com"}')).toBe("This value should be less than a@a.com.");
        });

        test('1995-12-17T03:24:00 < new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "less-than": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be less than December 17, 1995 3:24 AM.");
        });

        test('Lorem ipsum < new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', {
                "less-than": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be less than December 17, 1995 3:24 AM.");
        });

        test('1995-12-17T03:24:00 < new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "less-than": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("This value should be less than December 17, 1995 3:21 AM.");
        });

        test('"true" < true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'less-than:{"value":true}')).toBe("This value should be less than true.");
        });

        test('true < false', () => {
            expect(sogv.isValidWithErrorMessage(true, 'less-than:{"value":false}')).toBe("This value should be less than false.");
        });

        test('false < false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'less-than:{"value":false}')).toBe("This value should be less than false.");
        });
    });
});