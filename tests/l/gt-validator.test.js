'use strict';

const sogv = require('../../build/output/sog-validator');

describe('gt', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'gt:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'gt:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('true gt false', () => {
            expect(sogv.isValidWithErrorMessage(true, 'gt:{"value":false}')).toBe(toBe);
        });

        test('0.00000002 gt 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000002, 'gt:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 gt new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "gt": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1995-12-17T03:21:00 gt new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', {
                "gt": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("The value must be greater than December 17, 1995 3:21 AM date.");
        });

        test('0.00000001 gt 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'gt:{"value":"0.00000001"}')).toBe("The value must be greater than 0.00000001.");
        });

        test('1995-12-17T03:24:00 gt new Date("1996-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "gt": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe("The value must be greater than December 17, 1996 3:24 AM date.");
        });

        test('false gt true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'gt:{"value":true}')).toBe("The value must be greater than true.");
        });

        test('12345 gt "12346"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'gt:{"value":"12346"}')).toBe("The value must be greater than 12346.");
        });

        test('0 gt false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'gt:{"value":false}')).toBe("The value must be greater than false.");
        });

        test('1 gt true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'gt:{"value":true}')).toBe("The value must be greater than true.");
        });

        test('12345 gt "12345"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'gt:{"value":"12345"}')).toBe("The value must be greater than 12345.");
        });

        test('1995-12-17T03:24:00 gt new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "gt": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("The value must be greater than December 17, 1995 3:24 AM date.");
        });

        test('Lorem ipsum gt new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', {
                "gt": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("The value must be greater than December 17, 1995 3:24 AM date.");
        });

        test('"true" gt true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'gt:{"value":true}')).toBe("The value must be greater than true.");
        });

        test('false gt false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'gt:{"value":false}')).toBe("The value must be greater than false.");
        });
    });
});