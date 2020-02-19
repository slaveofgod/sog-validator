'use strict';

const sogv = require('../../build/output/sog-validator');

describe('luhn', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'luhn')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'luhn')).toBe(toBe);
        });

        test('79927398713', () => {
            expect(sogv.isValidWithErrorMessage('79927398713', 'luhn')).toBe(toBe);
        });

        test('378282246310005', () => {
            expect(sogv.isValidWithErrorMessage('378282246310005', 'luhn')).toBe(toBe);
        });

        test('3566002020360505', () => {
            expect(sogv.isValidWithErrorMessage('3566002020360505', 'luhn')).toBe(toBe);
        });

        test('6331101999990016', () => {
            expect(sogv.isValidWithErrorMessage('6331101999990016', 'luhn')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('12345678985', () => {
            expect(sogv.isValidWithErrorMessage('12345678985', 'luhn')).toBe("Invalid card number.");
        });

        test('EUR', () => {
            expect(sogv.isValidWithErrorMessage('EUR', 'luhn')).toBe("Invalid card number.");
        });

        test('USD', () => {
            expect(sogv.isValidWithErrorMessage('USD', 'luhn')).toBe("Invalid card number.");
        });

        test('String "NED SZA JJX XX"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX XX', 'luhn')).toBe("Invalid card number.");
        });

        test('BOFAUS6S', () => {
            expect(sogv.isValidWithErrorMessage('BOFAUS6S', 'luhn')).toBe("Invalid card number.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(sogv.isValidWithErrorMessage('n4DSZBJJXXx', 'luhn')).toBe("Invalid card number.");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZBJJXXX', 'luhn')).toBe("Invalid card number.");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZAJJXXX', 'luhn')).toBe("Invalid card number.");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX X%', 'luhn')).toBe("Invalid card number.");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(sogv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'luhn')).toBe("Invalid card number.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'luhn')).toBe("Invalid card number.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'luhn')).toBe("Invalid card number.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(sogv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'luhn')).toBe("Invalid card number.");
        });

        test('https://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'luhn')).toBe("Invalid card number.");
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'luhn')).toBe("Invalid card number.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'luhn')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'luhn')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(sogv.isValidWithErrorMessage(false, 'luhn')).toBe("Invalid card number.");
        });
    });
});