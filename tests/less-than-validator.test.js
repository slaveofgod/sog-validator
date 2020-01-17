'use strict';

const abv = require('../build/output/bob-validator');

describe('less-than', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('1995-12-17T03:24:00 < new Date("1996-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "less-than": {
                    "value": new Date('1996-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('false < true', () => {
            expect(abv.isValidWithErrorMessage(false, 'less-than:{"value":true}')).toBe(toBe);
        });

        test('12345 < "12346"', () => {
            expect(abv.isValidWithErrorMessage(12345, 'less-than:{"value":"12346"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('0.00000002 < 0.00000001', () => {
            expect(abv.isValidWithErrorMessage(0.00000002, 'less-than:{"value":"0.00000001"}')).toBe("This value should be less than 0.00000001.");
        });

        test('0 < false', () => {
            expect(abv.isValidWithErrorMessage(0, 'less-than:{"value":false}')).toBe("This value should be less than false.");
        });

        test('1 < true', () => {
            expect(abv.isValidWithErrorMessage(1, 'less-than:{"value":true}')).toBe("This value should be less than true.");
        });

        test('12345 < "12345"', () => {
            expect(abv.isValidWithErrorMessage(12345, 'less-than:{"value":"12345"}')).toBe("This value should be less than 12345.");
        });

        test('"a@a.com" < "a@a.com"', () => {
            expect(abv.isValidWithErrorMessage('a@a.com', 'less-than:{"value":"a@a.com"}')).toBe("This value should be less than a@a.com.");
        });

        test('1995-12-17T03:24:00 < new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "less-than": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be less than Sun Dec 17 1995 03:24:00 GMT+0200 (Eastern European Standard Time).");
        });

        test('Lorem ipsum < new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', {
                "less-than": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be less than Sun Dec 17 1995 03:24:00 GMT+0200 (Eastern European Standard Time).");
        });

        test('1995-12-17T03:24:00 < new Date("1995-12-17T03:21:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "less-than": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("This value should be less than Sun Dec 17 1995 03:21:00 GMT+0200 (Eastern European Standard Time).");
        });

        test('"true" < true', () => {
            expect(abv.isValidWithErrorMessage("true", 'less-than:{"value":true}')).toBe("This value should be less than true.");
        });

        test('true < false', () => {
            expect(abv.isValidWithErrorMessage(true, 'less-than:{"value":false}')).toBe("This value should be less than false.");
        });

        test('false < false', () => {
            expect(abv.isValidWithErrorMessage(false, 'less-than:{"value":false}')).toBe("This value should be less than false.");
        });
    });
});