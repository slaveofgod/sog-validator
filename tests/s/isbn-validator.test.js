'use strict';

const sogv = require('../../build/output/sog-validator');

describe('isbn', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'isbn')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'isbn')).toBe(toBe);
        });

        test('978-1-56619-909-4', () => {
            expect(sogv.isValidWithErrorMessage('978-1-56619-909-4', 'isbn')).toBe(toBe);
        });

        test('1-56619-909-3', () => {
            expect(sogv.isValidWithErrorMessage('1-56619-909-3', 'isbn')).toBe(toBe);
        });

        test('978-1-56619-909-4 ["type":"isbn13"]', () => {
            expect(sogv.isValidWithErrorMessage('978-1-56619-909-4', 'isbn:{"type":"isbn13"}')).toBe(toBe);
        });

        test('1-56619-909-3 ["type":"isbn13"]', () => {
            expect(sogv.isValidWithErrorMessage('1-56619-909-3', 'isbn:{"type":"isbn10"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('978-1-56619-909-4 ["type":"isbn10"]', () => {
            expect(sogv.isValidWithErrorMessage('978-1-56619-909-4', 'isbn:{"type":"isbn10"}')).toBe("This value is not a valid ISBN-10.");
        });

        test('1-56619-909-3 ["type":"isbn13"]', () => {
            expect(sogv.isValidWithErrorMessage('1-56619-909-3', 'isbn:{"type":"isbn13"}')).toBe("This value is not a valid ISBN-13.");
        });

        test('DE44 5001 0517 5407 3249 31', () => {
            expect(sogv.isValidWithErrorMessage('DE44 5001 0517 5407 3249 31', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('GR16 0110 1250 0000 0001 2300 695', () => {
            expect(sogv.isValidWithErrorMessage('GR16 0110 1250 0000 0001 2300 695', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('GB29 NWBK 6016 1331 9268 19', () => {
            expect(sogv.isValidWithErrorMessage('GB29 NWBK 6016 1331 9268 19', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('SA03 8000 0000 6080 1016 7519', () => {
            expect(sogv.isValidWithErrorMessage('SA03 8000 0000 6080 1016 7519', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('CH93 0076 2011 6238 5295 7', () => {
            expect(sogv.isValidWithErrorMessage('CH93 0076 2011 6238 5295 7', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('TR33 0006 1005 1978 6457 8413 26', () => {
            expect(sogv.isValidWithErrorMessage('TR33 0006 1005 1978 6457 8413 26', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('CH93 0076 2011 6238 5295 7', () => {
            expect(sogv.isValidWithErrorMessage('CH93 0076 2011 6238 5295 7', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('TR44 5001 0517 5407 3249 31', () => {
            expect(sogv.isValidWithErrorMessage('TR44 5001 0517 5407 3249 31', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('DE16 0110 1250 0000 0001 2300 695', () => {
            expect(sogv.isValidWithErrorMessage('DE16 0110 1250 0000 0001 2300 695', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('GR29 NWBK 6016 1331 9268 19', () => {
            expect(sogv.isValidWithErrorMessage('GR29 NWBK 6016 1331 9268 19', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('GB03 8000 0000 6080 1016 7519', () => {
            expect(sogv.isValidWithErrorMessage('GB03 8000 0000 6080 1016 7519', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('SA93 0076 2011 6238 5295 7', () => {
            expect(sogv.isValidWithErrorMessage('SA93 0076 2011 6238 5295 7', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('CH33 0006 1005 1978 6457 8413 26', () => {
            expect(sogv.isValidWithErrorMessage('CH33 0006 1005 1978 6457 8413 26', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('79927398713', () => {
            expect(sogv.isValidWithErrorMessage('79927398713', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('378282246310005', () => {
            expect(sogv.isValidWithErrorMessage('378282246310005', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('3566002020360505', () => {
            expect(sogv.isValidWithErrorMessage('3566002020360505', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('6331101999990016', () => {
            expect(sogv.isValidWithErrorMessage('6331101999990016', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('12345678985', () => {
            expect(sogv.isValidWithErrorMessage('12345678985', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('EUR', () => {
            expect(sogv.isValidWithErrorMessage('EUR', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('USD', () => {
            expect(sogv.isValidWithErrorMessage('USD', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "NED SZA JJX XX"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX XX', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('BOFAUS6S', () => {
            expect(sogv.isValidWithErrorMessage('BOFAUS6S', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(sogv.isValidWithErrorMessage('n4DSZBJJXXx', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZBJJXXX', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(sogv.isValidWithErrorMessage('N4DSZAJJXXX', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(sogv.isValidWithErrorMessage('NED SZA JJX X%', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(sogv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(sogv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('https://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'isbn')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'isbn')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(sogv.isValidWithErrorMessage(false, 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });
    });
});