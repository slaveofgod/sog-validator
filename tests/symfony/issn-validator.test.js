'use strict';

const sogv = require('../../build/output/sog-validator');

describe('issn', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'issn')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'issn')).toBe(toBe);
        });

        test('0028-0836', () => {
            expect(sogv.isValidWithErrorMessage('0028-0836', 'issn')).toBe(toBe);
        });

        test('0317-8471', () => {
            expect(sogv.isValidWithErrorMessage('0317-8471', 'issn')).toBe(toBe);
        });

        test('2434-561X', () => {
            expect(sogv.isValidWithErrorMessage('2434-561X', 'issn')).toBe(toBe);
        });

        test('2434561X', () => {
            expect(sogv.isValidWithErrorMessage('2434561X', 'issn')).toBe(toBe);
        });

        test('0028-0836 ["caseSensitive":false,"requireHyphen":false]', () => {
            expect(sogv.isValidWithErrorMessage('0028-0836', 'issn:{"caseSensitive":false,"requireHyphen":false}')).toBe(toBe);
        });

        test('0028-0836 ["caseSensitive":true,"requireHyphen":true]', () => {
            expect(sogv.isValidWithErrorMessage('0028-0836', 'issn:{"caseSensitive":true,"requireHyphen":true}')).toBe(toBe);
        });

        test('2434561X ["requireHyphen":false]', () => {
            expect(sogv.isValidWithErrorMessage('2434561X', 'issn:{"requireHyphen":false}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('2434561X ["requireHyphen":true]', () => {
            expect(sogv.isValidWithErrorMessage('2434561X', 'issn:{"requireHyphen":true}')).toBe("This value is not a valid ISSN.");
        });

        test('978-1-56619-909-4', () => {
            expect(sogv.isValidWithErrorMessage('978-1-56619-909-4', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('1-56619-909-3', () => {
            expect(sogv.isValidWithErrorMessage('1-56619-909-3', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('DE44 5001 0517 5407 3249 31', () => {
            expect(sogv.isValidWithErrorMessage('DE44 5001 0517 5407 3249 31', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('GR16 0110 1250 0000 0001 2300 695', () => {
            expect(sogv.isValidWithErrorMessage('GR16 0110 1250 0000 0001 2300 695', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('GB29 NWBK 6016 1331 9268 19', () => {
            expect(sogv.isValidWithErrorMessage('GB29 NWBK 6016 1331 9268 19', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('SA03 8000 0000 6080 1016 7519', () => {
            expect(sogv.isValidWithErrorMessage('SA03 8000 0000 6080 1016 7519', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('CH93 0076 2011 6238 5295 7', () => {
            expect(sogv.isValidWithErrorMessage('CH93 0076 2011 6238 5295 7', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('TR33 0006 1005 1978 6457 8413 26', () => {
            expect(sogv.isValidWithErrorMessage('TR33 0006 1005 1978 6457 8413 26', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('CH93 0076 2011 6238 5295 7', () => {
            expect(sogv.isValidWithErrorMessage('CH93 0076 2011 6238 5295 7', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('TR44 5001 0517 5407 3249 31', () => {
            expect(sogv.isValidWithErrorMessage('TR44 5001 0517 5407 3249 31', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('DE16 0110 1250 0000 0001 2300 695', () => {
            expect(sogv.isValidWithErrorMessage('DE16 0110 1250 0000 0001 2300 695', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('GR29 NWBK 6016 1331 9268 19', () => {
            expect(sogv.isValidWithErrorMessage('GR29 NWBK 6016 1331 9268 19', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('GB03 8000 0000 6080 1016 7519', () => {
            expect(sogv.isValidWithErrorMessage('GB03 8000 0000 6080 1016 7519', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('SA93 0076 2011 6238 5295 7', () => {
            expect(sogv.isValidWithErrorMessage('SA93 0076 2011 6238 5295 7', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('CH33 0006 1005 1978 6457 8413 26', () => {
            expect(sogv.isValidWithErrorMessage('CH33 0006 1005 1978 6457 8413 26', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('79927398713', () => {
            expect(sogv.isValidWithErrorMessage('79927398713', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('378282246310005', () => {
            expect(sogv.isValidWithErrorMessage('378282246310005', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('3566002020360505', () => {
            expect(sogv.isValidWithErrorMessage('3566002020360505', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('6331101999990016', () => {
            expect(sogv.isValidWithErrorMessage('6331101999990016', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('12345678985', () => {
            expect(sogv.isValidWithErrorMessage('12345678985', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('EUR', () => {
            expect(sogv.isValidWithErrorMessage('EUR', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('USD', () => {
            expect(sogv.isValidWithErrorMessage('USD', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "NED SZA JJX XX"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX XX', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('BOFAUS6S', () => {
            expect(sogv.isValidWithErrorMessage('BOFAUS6S', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(sogv.isValidWithErrorMessage('n4DSZBJJXXx', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZBJJXXX', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZAJJXXX', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX X%', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(sogv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(sogv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('https://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'issn')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'issn')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(sogv.isValidWithErrorMessage(false, 'issn')).toBe("This value is not a valid ISSN.");
        });
    });
});