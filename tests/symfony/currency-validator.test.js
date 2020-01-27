'use strict';

const abv = require('../../build/output/sog-validator');

describe('currency', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'currency')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'currency')).toBe(toBe);
        });

        test('EUR', () => {
            expect(abv.isValidWithErrorMessage('EUR', 'currency')).toBe(toBe);
        });

        test('USD', () => {
            expect(abv.isValidWithErrorMessage('USD', 'currency')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('Visa "4111111111111111"', () => {
            expect(abv.isValidWithErrorMessage('4111111111111111', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "NED SZA JJX XX"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX XX', 'currency')).toBe("This value is not a valid currency.");
        });

        test('BOFAUS6S', () => {
            expect(abv.isValidWithErrorMessage('BOFAUS6S', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(abv.isValidWithErrorMessage('n4DSZBJJXXx', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZBJJXXX', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZAJJXXX', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX X%', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(abv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'currency')).toBe("This value is not a valid currency.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'currency')).toBe("This value is not a valid currency.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'currency')).toBe("This value is not a valid currency.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(abv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'currency')).toBe("This value is not a valid currency.");
        });

        test('https://www.google.com/', () => {
            expect(abv.isValidWithErrorMessage('https://www.google.com/', 'currency')).toBe("This value is not a valid currency.");
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'currency')).toBe("This value is not a valid currency.");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'currency')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'currency')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(abv.isValidWithErrorMessage(false, 'currency')).toBe("This value is not a valid currency.");
        });
    });
});