'use strict';

const sogv = require('../../build/output/sog-validator');

describe('card-scheme', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'card-scheme:{"schemes": "MASTERCARD"}')).toBe(toBe);
        });

        test('Visa "4012888888881881" ["schemes": "VISA"]', () => {
            expect(sogv.isValidWithErrorMessage('4012888888881881', 'card-scheme:{"schemes": "VISA"}')).toBe(toBe);
        });

        test('MasterCard "5105105105105100" ["schemes": "MASTERCARD"]', () => {
            expect(sogv.isValidWithErrorMessage('5105105105105100', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe(toBe);
        });

        test('American Express "371449635398431" ["schemes": "AMEX"]', () => {
            expect(sogv.isValidWithErrorMessage('371449635398431', 'card-scheme:{"schemes": "AMEX"}')).toBe(toBe);
        });

        test('Diner\'s Club "30569309025904" ["schemes": "DINERS"]', () => {
            expect(sogv.isValidWithErrorMessage('30569309025904', 'card-scheme:{"schemes": "DINERS"}')).toBe(toBe);
        });

        test('Discover "6011000990139424" ["schemes": "DISCOVER"]', () => {
            expect(sogv.isValidWithErrorMessage('6011000990139424', 'card-scheme:{"schemes": "DISCOVER"}')).toBe(toBe);
        });

        test('JCB "3530111333300000" ["schemes": "JCB"]', () => {
            expect(sogv.isValidWithErrorMessage('3530111333300000', 'card-scheme:{"schemes": "JCB"}')).toBe(toBe);
        });

        test('JCB "3530111333300000" ["schemes": ["MASTERCARD","JCB"]]', () => {
            expect(sogv.isValidWithErrorMessage('3530111333300000', 'card-scheme:{"schemes": ["MASTERCARD", "JCB"]}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('JCB "3530111333300000" ["schemes": ["MASTERCARD","MASTERCARD"]]', () => {
            expect(sogv.isValidWithErrorMessage('3530111333300000', 'card-scheme:{"schemes": ["MASTERCARD", "MASTERCARD"]}')).toBe("Unsupported card type or invalid card number.");
        });

        test('Visa "4111111111111111"', () => {
            expect(sogv.isValidWithErrorMessage('4111111111111111', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "NED SZA JJX XX"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX XX', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('BOFAUS6S', () => {
            expect(sogv.isValidWithErrorMessage('BOFAUS6S', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(sogv.isValidWithErrorMessage('n4DSZBJJXXx', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZBJJXXX', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZAJJXXX', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX X%', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(sogv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(sogv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('https://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(sogv.isValidWithErrorMessage(false, 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });
    });
});