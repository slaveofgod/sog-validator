'use strict';

const sogv = require('../../build/output/sog-validator');

describe('lt', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'lt:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'lt:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('true lt false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'lt:{"value":true}')).toBe(toBe);
        });

        test('0.00000002 lt 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'lt:{"value":"0.00000002"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 lt new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', {
                "lt": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('1995-12-17T03:24:00 lt new Date("1996-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "lt": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('false lt true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'lt:{"value":true}')).toBe(toBe);
        });

        test('12345 lt "12346"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'lt:{"value":"12346"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1995-12-17T03:21:00 lt new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', {
                "lt": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("The value must be less than December 17, 1995 3:21 AM date.");
        });

        test('0.00000001 lt 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'lt:{"value":"0.00000001"}')).toBe("The value must be less than 0.00000001.");
        });

        test('0 lt false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'lt:{"value":false}')).toBe("The value must be less than false.");
        });

        test('1 lt true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'lt:{"value":true}')).toBe("The value must be less than true.");
        });

        test('12345 lt "12345"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'lt:{"value":"12345"}')).toBe("The value must be less than 12345.");
        });

        test('1995-12-17T03:24:00 lt new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "lt": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("The value must be less than December 17, 1995 3:24 AM date.");
        });

        test('Lorem ipsum lt new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', {
                "lt": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("The value must be less than December 17, 1995 3:24 AM date.");
        });

        test('"true" lt true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'lt:{"value":true}')).toBe("The value must be less than true.");
        });

        test('false lt false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'lt:{"value":false}')).toBe("The value must be less than false.");
        });
    });
});