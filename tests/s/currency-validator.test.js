'use strict';

const sogv = require('../../build/output/sog-validator');

describe('currency', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'currency')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'currency')).toBe(toBe);
        });

        test('EUR', () => {
            expect(sogv.isValidWithErrorMessage('EUR', 'currency')).toBe(toBe);
        });

        test('USD', () => {
            expect(sogv.isValidWithErrorMessage('USD', 'currency')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('Visa "4111111111111111"', () => {
            expect(sogv.isValidWithErrorMessage('4111111111111111', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "NED SZA JJX XX"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX XX', 'currency')).toBe("This value is not a valid currency.");
        });

        test('BOFAUS6S', () => {
            expect(sogv.isValidWithErrorMessage('BOFAUS6S', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(sogv.isValidWithErrorMessage('n4DSZBJJXXx', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZBJJXXX', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZAJJXXX', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX X%', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(sogv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'currency')).toBe("This value is not a valid currency.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'currency')).toBe("This value is not a valid currency.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'currency')).toBe("This value is not a valid currency.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(sogv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'currency')).toBe("This value is not a valid currency.");
        });

        test('https://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'currency')).toBe("This value is not a valid currency.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'currency')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'currency')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(sogv.isValidWithErrorMessage(false, 'currency')).toBe("This value is not a valid currency.");
        });
    });
});