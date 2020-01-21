'use strict';

const abv = require('../../build/output/bob-validator');

describe('card-scheme', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'card-scheme:{"schemes": "MASTERCARD"}')).toBe(toBe);
        });

        test('Visa "4012888888881881" ["schemes": "VISA"]', () => {
            expect(abv.isValidWithErrorMessage('4012888888881881', 'card-scheme:{"schemes": "VISA"}')).toBe(toBe);
        });

        test('MasterCard "5105105105105100" ["schemes": "MASTERCARD"]', () => {
            expect(abv.isValidWithErrorMessage('5105105105105100', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe(toBe);
        });

        test('American Express "371449635398431" ["schemes": "AMEX"]', () => {
            expect(abv.isValidWithErrorMessage('371449635398431', 'card-scheme:{"schemes": "AMEX"}')).toBe(toBe);
        });

        test('Diner\'s Club "30569309025904" ["schemes": "DINERS"]', () => {
            expect(abv.isValidWithErrorMessage('30569309025904', 'card-scheme:{"schemes": "DINERS"}')).toBe(toBe);
        });

        test('Discover "6011000990139424" ["schemes": "DISCOVER"]', () => {
            expect(abv.isValidWithErrorMessage('6011000990139424', 'card-scheme:{"schemes": "DISCOVER"}')).toBe(toBe);
        });

        test('JCB "3530111333300000" ["schemes": "JCB"]', () => {
            expect(abv.isValidWithErrorMessage('3530111333300000', 'card-scheme:{"schemes": "JCB"}')).toBe(toBe);
        });

        test('JCB "3530111333300000" ["schemes": ["MASTERCARD","JCB"]]', () => {
            expect(abv.isValidWithErrorMessage('3530111333300000', 'card-scheme:{"schemes": ["MASTERCARD", "JCB"]}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('JCB "3530111333300000" ["schemes": ["MASTERCARD","MASTERCARD"]]', () => {
            expect(abv.isValidWithErrorMessage('3530111333300000', 'card-scheme:{"schemes": ["MASTERCARD", "MASTERCARD"]}')).toBe("Unsupported card type or invalid card number.");
        });

        test('Visa "4111111111111111"', () => {
            expect(abv.isValidWithErrorMessage('4111111111111111', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "NED SZA JJX XX"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX XX', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('BOFAUS6S', () => {
            expect(abv.isValidWithErrorMessage('BOFAUS6S', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(abv.isValidWithErrorMessage('n4DSZBJJXXx', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZBJJXXX', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZAJJXXX', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX X%', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(abv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(abv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('https://www.google.com/', () => {
            expect(abv.isValidWithErrorMessage('https://www.google.com/', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(abv.isValidWithErrorMessage(false, 'card-scheme:{"schemes": "MASTERCARD"}')).toBe("Unsupported card type or invalid card number.");
        });
    });
});