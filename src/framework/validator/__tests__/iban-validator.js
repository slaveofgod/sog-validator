'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('iban', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'iban')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'iban')).toBe(toBe);
        });

        test('DE44 5001 0517 5407 3249 31', () => {
            expect(abv.isValidWithErrorMessage('DE44 5001 0517 5407 3249 31', 'iban')).toBe(toBe);
        });

        test('GR16 0110 1250 0000 0001 2300 695', () => {
            expect(abv.isValidWithErrorMessage('GR16 0110 1250 0000 0001 2300 695', 'iban')).toBe(toBe);
        });

        test('GB29 NWBK 6016 1331 9268 19', () => {
            expect(abv.isValidWithErrorMessage('GB29 NWBK 6016 1331 9268 19', 'iban')).toBe(toBe);
        });

        test('SA03 8000 0000 6080 1016 7519', () => {
            expect(abv.isValidWithErrorMessage('SA03 8000 0000 6080 1016 7519', 'iban')).toBe(toBe);
        });

        test('CH93 0076 2011 6238 5295 7', () => {
            expect(abv.isValidWithErrorMessage('CH93 0076 2011 6238 5295 7', 'iban')).toBe(toBe);
        });

        test('TR33 0006 1005 1978 6457 8413 26', () => {
            expect(abv.isValidWithErrorMessage('TR33 0006 1005 1978 6457 8413 26', 'iban')).toBe(toBe);
        });

        test('CH93 0076 2011 6238 5295 7', () => {
            expect(abv.isValidWithErrorMessage('CH93 0076 2011 6238 5295 7', 'iban')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('TR44 5001 0517 5407 3249 31', () => {
            expect(abv.isValidWithErrorMessage('TR44 5001 0517 5407 3249 31', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('DE16 0110 1250 0000 0001 2300 695', () => {
            expect(abv.isValidWithErrorMessage('DE16 0110 1250 0000 0001 2300 695', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('GR29 NWBK 6016 1331 9268 19', () => {
            expect(abv.isValidWithErrorMessage('GR29 NWBK 6016 1331 9268 19', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('GB03 8000 0000 6080 1016 7519', () => {
            expect(abv.isValidWithErrorMessage('GB03 8000 0000 6080 1016 7519', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('SA93 0076 2011 6238 5295 7', () => {
            expect(abv.isValidWithErrorMessage('SA93 0076 2011 6238 5295 7', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('CH33 0006 1005 1978 6457 8413 26', () => {
            expect(abv.isValidWithErrorMessage('CH33 0006 1005 1978 6457 8413 26', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('79927398713', () => {
            expect(abv.isValidWithErrorMessage('79927398713', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('378282246310005', () => {
            expect(abv.isValidWithErrorMessage('378282246310005', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('3566002020360505', () => {
            expect(abv.isValidWithErrorMessage('3566002020360505', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('6331101999990016', () => {
            expect(abv.isValidWithErrorMessage('6331101999990016', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('12345678985', () => {
            expect(abv.isValidWithErrorMessage('12345678985', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('EUR', () => {
            expect(abv.isValidWithErrorMessage('EUR', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('USD', () => {
            expect(abv.isValidWithErrorMessage('USD', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('String "NED SZA JJX XX"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX XX', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('BOFAUS6S', () => {
            expect(abv.isValidWithErrorMessage('BOFAUS6S', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(abv.isValidWithErrorMessage('n4DSZBJJXXx', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZBJJXXX', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZAJJXXX', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX X%', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(abv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(abv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('https://www.google.com/', () => {
            expect(abv.isValidWithErrorMessage('https://www.google.com/', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'iban')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'iban')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(abv.isValidWithErrorMessage(false, 'iban')).toBe("This is not a valid International Bank Account Number (IBAN).");
        });
    });
});