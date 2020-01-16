'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('luhn', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'luhn')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'luhn')).toBe(toBe);
        });

        test('79927398713', () => {
            expect(abv.isValidWithErrorMessage('79927398713', 'luhn')).toBe(toBe);
        });

        test('378282246310005', () => {
            expect(abv.isValidWithErrorMessage('378282246310005', 'luhn')).toBe(toBe);
        });

        test('3566002020360505', () => {
            expect(abv.isValidWithErrorMessage('3566002020360505', 'luhn')).toBe(toBe);
        });

        test('6331101999990016', () => {
            expect(abv.isValidWithErrorMessage('6331101999990016', 'luhn')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('12345678985', () => {
            expect(abv.isValidWithErrorMessage('12345678985', 'luhn')).toBe("Invalid card number.");
        });

        test('EUR', () => {
            expect(abv.isValidWithErrorMessage('EUR', 'luhn')).toBe("Invalid card number.");
        });

        test('USD', () => {
            expect(abv.isValidWithErrorMessage('USD', 'luhn')).toBe("Invalid card number.");
        });

        test('String "NED SZA JJX XX"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX XX', 'luhn')).toBe("Invalid card number.");
        });

        test('BOFAUS6S', () => {
            expect(abv.isValidWithErrorMessage('BOFAUS6S', 'luhn')).toBe("Invalid card number.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(abv.isValidWithErrorMessage('n4DSZBJJXXx', 'luhn')).toBe("Invalid card number.");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZBJJXXX', 'luhn')).toBe("Invalid card number.");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZAJJXXX', 'luhn')).toBe("Invalid card number.");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX X%', 'luhn')).toBe("Invalid card number.");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(abv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'luhn')).toBe("Invalid card number.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'luhn')).toBe("Invalid card number.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'luhn')).toBe("Invalid card number.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(abv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'luhn')).toBe("Invalid card number.");
        });

        test('https://www.google.com/', () => {
            expect(abv.isValidWithErrorMessage('https://www.google.com/', 'luhn')).toBe("Invalid card number.");
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'luhn')).toBe("Invalid card number.");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'luhn')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'luhn')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(abv.isValidWithErrorMessage(false, 'luhn')).toBe("Invalid card number.");
        });
    });
});