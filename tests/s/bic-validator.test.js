'use strict';

const sogv = require('../../build/output/sog-validator');

describe('bic', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'bic')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'bic')).toBe(toBe);
        });

        test('String "NED SZA JJX XX"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX XX', 'bic')).toBe(toBe);
        });

        test('BOFAUS6S [iban:"BOFAUS3N"]', () => {
            expect(sogv.isValidWithErrorMessage('BOFAUS6S', 'bic:{"iban":"BOFAUS3N"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('BOFAUS6S [iban:"USFAUS6S","ibanMessage":"IBAN error message"]', () => {
            expect(sogv.isValidWithErrorMessage('BOFAUS6S', 'bic:{"iban":"USFAUS6S","ibanMessage":"IBAN error message"}')).toBe("IBAN error message");
        });

        test('BOFAUS6S [iban:"USFAUS6S"]', () => {
            expect(sogv.isValidWithErrorMessage('BOFAUS6S', 'bic:{"iban":"USFAUS6S"}')).toBe("This Business Identifier Code (BIC) is not associated with IBAN USFAUS6S.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(sogv.isValidWithErrorMessage('n4DSZBJJXXx', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZBJJXXX', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZAJJXXX', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX X%', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(sogv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(sogv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('https://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'bic')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'bic')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(sogv.isValidWithErrorMessage(false, 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });
    });
});