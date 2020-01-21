'use strict';

const abv = require('../../build/output/bob-validator');

describe('bic', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'bic')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'bic')).toBe(toBe);
        });

        test('String "NED SZA JJX XX"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX XX', 'bic')).toBe(toBe);
        });

        test('BOFAUS6S [iban:"BOFAUS3N"]', () => {
            expect(abv.isValidWithErrorMessage('BOFAUS6S', 'bic:{"iban":"BOFAUS3N"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('BOFAUS6S [iban:"USFAUS6S","ibanMessage":"IBAN error message"]', () => {
            expect(abv.isValidWithErrorMessage('BOFAUS6S', 'bic:{"iban":"USFAUS6S","ibanMessage":"IBAN error message"}')).toBe("IBAN error message");
        });

        test('BOFAUS6S [iban:"USFAUS6S"]', () => {
            expect(abv.isValidWithErrorMessage('BOFAUS6S', 'bic:{"iban":"USFAUS6S"}')).toBe("This Business Identifier Code (BIC) is not associated with IBAN USFAUS6S.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(abv.isValidWithErrorMessage('n4DSZBJJXXx', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZBJJXXX', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZAJJXXX', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX X%', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(abv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(abv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('https://www.google.com/', () => {
            expect(abv.isValidWithErrorMessage('https://www.google.com/', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'bic')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'bic')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(abv.isValidWithErrorMessage(false, 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });
    });
});