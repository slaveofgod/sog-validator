'use strict';

const abv = require('../../build/output/sog-validator');

describe('date-equals', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'date-equals:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'date-equals:{"value":"0.00000001"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 == new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "date-equals": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1996-12-17T03:24:00 == new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1996-12-17T03:24:00', {
                "date-equals": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("The value must be a date equal to December 17, 1996 3:24 AM.");
        });

        test('1995-12-17T03:24:00 == new Date("1995-12-17T03:21:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "date-equals": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("The value must be a date equal to December 17, 1995 3:24 AM.");
        });

        test('1995-12-17T03:24:00 == new Date("1996-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "date-equals": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe("The value must be a date equal to December 17, 1995 3:24 AM.");
        });

        test('Lorem ipsum == new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', {
                "date-equals": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be of type date-string.");
        });
    });
});