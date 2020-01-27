'use strict';

const abv = require('../../build/output/sog-validator');

describe('issn', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'issn')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'issn')).toBe(toBe);
        });

        test('0028-0836', () => {
            expect(abv.isValidWithErrorMessage('0028-0836', 'issn')).toBe(toBe);
        });

        test('0317-8471', () => {
            expect(abv.isValidWithErrorMessage('0317-8471', 'issn')).toBe(toBe);
        });

        test('2434-561X', () => {
            expect(abv.isValidWithErrorMessage('2434-561X', 'issn')).toBe(toBe);
        });

        test('2434561X', () => {
            expect(abv.isValidWithErrorMessage('2434561X', 'issn')).toBe(toBe);
        });

        test('0028-0836 ["caseSensitive":false,"requireHyphen":false]', () => {
            expect(abv.isValidWithErrorMessage('0028-0836', 'issn:{"caseSensitive":false,"requireHyphen":false}')).toBe(toBe);
        });

        test('0028-0836 ["caseSensitive":true,"requireHyphen":true]', () => {
            expect(abv.isValidWithErrorMessage('0028-0836', 'issn:{"caseSensitive":true,"requireHyphen":true}')).toBe(toBe);
        });

        test('2434561X ["requireHyphen":false]', () => {
            expect(abv.isValidWithErrorMessage('2434561X', 'issn:{"requireHyphen":false}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('2434561X ["requireHyphen":true]', () => {
            expect(abv.isValidWithErrorMessage('2434561X', 'issn:{"requireHyphen":true}')).toBe("This value is not a valid ISSN.");
        });

        test('978-1-56619-909-4', () => {
            expect(abv.isValidWithErrorMessage('978-1-56619-909-4', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('1-56619-909-3', () => {
            expect(abv.isValidWithErrorMessage('1-56619-909-3', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('DE44 5001 0517 5407 3249 31', () => {
            expect(abv.isValidWithErrorMessage('DE44 5001 0517 5407 3249 31', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('GR16 0110 1250 0000 0001 2300 695', () => {
            expect(abv.isValidWithErrorMessage('GR16 0110 1250 0000 0001 2300 695', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('GB29 NWBK 6016 1331 9268 19', () => {
            expect(abv.isValidWithErrorMessage('GB29 NWBK 6016 1331 9268 19', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('SA03 8000 0000 6080 1016 7519', () => {
            expect(abv.isValidWithErrorMessage('SA03 8000 0000 6080 1016 7519', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('CH93 0076 2011 6238 5295 7', () => {
            expect(abv.isValidWithErrorMessage('CH93 0076 2011 6238 5295 7', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('TR33 0006 1005 1978 6457 8413 26', () => {
            expect(abv.isValidWithErrorMessage('TR33 0006 1005 1978 6457 8413 26', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('CH93 0076 2011 6238 5295 7', () => {
            expect(abv.isValidWithErrorMessage('CH93 0076 2011 6238 5295 7', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('TR44 5001 0517 5407 3249 31', () => {
            expect(abv.isValidWithErrorMessage('TR44 5001 0517 5407 3249 31', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('DE16 0110 1250 0000 0001 2300 695', () => {
            expect(abv.isValidWithErrorMessage('DE16 0110 1250 0000 0001 2300 695', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('GR29 NWBK 6016 1331 9268 19', () => {
            expect(abv.isValidWithErrorMessage('GR29 NWBK 6016 1331 9268 19', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('GB03 8000 0000 6080 1016 7519', () => {
            expect(abv.isValidWithErrorMessage('GB03 8000 0000 6080 1016 7519', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('SA93 0076 2011 6238 5295 7', () => {
            expect(abv.isValidWithErrorMessage('SA93 0076 2011 6238 5295 7', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('CH33 0006 1005 1978 6457 8413 26', () => {
            expect(abv.isValidWithErrorMessage('CH33 0006 1005 1978 6457 8413 26', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('79927398713', () => {
            expect(abv.isValidWithErrorMessage('79927398713', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('378282246310005', () => {
            expect(abv.isValidWithErrorMessage('378282246310005', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('3566002020360505', () => {
            expect(abv.isValidWithErrorMessage('3566002020360505', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('6331101999990016', () => {
            expect(abv.isValidWithErrorMessage('6331101999990016', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('12345678985', () => {
            expect(abv.isValidWithErrorMessage('12345678985', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('EUR', () => {
            expect(abv.isValidWithErrorMessage('EUR', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('USD', () => {
            expect(abv.isValidWithErrorMessage('USD', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "NED SZA JJX XX"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX XX', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('BOFAUS6S', () => {
            expect(abv.isValidWithErrorMessage('BOFAUS6S', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(abv.isValidWithErrorMessage('n4DSZBJJXXx', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZBJJXXX', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZAJJXXX', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX X%', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(abv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(abv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('https://www.google.com/', () => {
            expect(abv.isValidWithErrorMessage('https://www.google.com/', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'issn')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'issn')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(abv.isValidWithErrorMessage(false, 'issn')).toBe("This value is not a valid ISSN.");
        });
    });
});