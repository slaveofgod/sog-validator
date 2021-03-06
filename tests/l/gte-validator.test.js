'use strict';

const sogv = require('../../build/output/sog-validator');

describe('gte', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'gte:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'gte:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('true gte false', () => {
            expect(sogv.isValidWithErrorMessage(true, 'gte:{"value":false}')).toBe(toBe);
        });

        test('0.00000002 gte 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000002, 'gte:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 gte new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "gte": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe(toBe);
        });

        test('1995-12-17T03:21:00 gte new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', {
                "gte": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe(toBe);
        });

        test('0.00000001 gte 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'gte:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('0 gte false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'gte:{"value":false}')).toBe(toBe);
        });

        test('1 gte true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'gte:{"value":true}')).toBe(toBe);
        });

        test('12345 gte "12345"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'gte:{"value":"12345"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 gte new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "gte": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('false gte false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'gte:{"value":false}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1995-12-17T03:24:00 gte new Date("1996-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "gte": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe("The value must be greater than or equal December 17, 1996 3:24 AM date.");
        });

        test('false gte true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'gte:{"value":true}')).toBe("The value must be greater than or equal true.");
        });

        test('12345 gte "12346"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'gte:{"value":"12346"}')).toBe("The value must be greater than or equal 12346.");
        });

        test('Lorem ipsum gte new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', {
                "gte": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("The value must be greater than or equal December 17, 1995 3:24 AM date.");
        });

        test('"true" gte true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'gte:{"value":true}')).toBe("The value must be greater than or equal true.");
        });
    });
});