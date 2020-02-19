'use strict';

const sogv = require('../../build/output/sog-validator');

describe('lte', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'lte:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'lte:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('true lte false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'lte:{"value":true}')).toBe(toBe);
        });

        test('0.00000002 lte 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'lte:{"value":"0.00000002"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 lte new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', {
                "lte": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('1995-12-17T03:21:00 lte new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', {
                "lte": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe(toBe);
        });

        test('0.00000001 lte 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'lte:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('0 lte false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'lte:{"value":false}')).toBe(toBe);
        });

        test('1 lte true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'lte:{"value":true}')).toBe(toBe);
        });

        test('12345 lte "12345"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'lte:{"value":"12345"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 lte new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "lte": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('false lte false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'lte:{"value":false}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 lte new Date("1996-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "lte": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('12345 lte "12346"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'lte:{"value":"12346"}')).toBe(toBe);
        });

        test('false lte true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'lte:{"value":true}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('Lorem ipsum lte new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', {
                "lte": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("The value must be less than or equal December 17, 1995 3:24 AM date.");
        });

        test('"true" lte true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'lte:{"value":true}')).toBe("The value must be less than or equal true.");
        });
    });
});