'use strict';

const abv = require('../build/output/bob-validator');

describe('isbn', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'isbn')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'isbn')).toBe(toBe);
        });

        test('978-1-56619-909-4', () => {
            expect(abv.isValidWithErrorMessage('978-1-56619-909-4', 'isbn')).toBe(toBe);
        });

        test('1-56619-909-3', () => {
            expect(abv.isValidWithErrorMessage('1-56619-909-3', 'isbn')).toBe(toBe);
        });

        test('978-1-56619-909-4 ["type":"isbn13"]', () => {
            expect(abv.isValidWithErrorMessage('978-1-56619-909-4', 'isbn:{"type":"isbn13"}')).toBe(toBe);
        });

        test('1-56619-909-3 ["type":"isbn13"]', () => {
            expect(abv.isValidWithErrorMessage('1-56619-909-3', 'isbn:{"type":"isbn10"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('978-1-56619-909-4 ["type":"isbn10"]', () => {
            expect(abv.isValidWithErrorMessage('978-1-56619-909-4', 'isbn:{"type":"isbn10"}')).toBe("This value is not a valid ISBN-10.");
        });

        test('1-56619-909-3 ["type":"isbn13"]', () => {
            expect(abv.isValidWithErrorMessage('1-56619-909-3', 'isbn:{"type":"isbn13"}')).toBe("This value is not a valid ISBN-13.");
        });

        test('DE44 5001 0517 5407 3249 31', () => {
            expect(abv.isValidWithErrorMessage('DE44 5001 0517 5407 3249 31', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('GR16 0110 1250 0000 0001 2300 695', () => {
            expect(abv.isValidWithErrorMessage('GR16 0110 1250 0000 0001 2300 695', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('GB29 NWBK 6016 1331 9268 19', () => {
            expect(abv.isValidWithErrorMessage('GB29 NWBK 6016 1331 9268 19', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('SA03 8000 0000 6080 1016 7519', () => {
            expect(abv.isValidWithErrorMessage('SA03 8000 0000 6080 1016 7519', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('CH93 0076 2011 6238 5295 7', () => {
            expect(abv.isValidWithErrorMessage('CH93 0076 2011 6238 5295 7', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('TR33 0006 1005 1978 6457 8413 26', () => {
            expect(abv.isValidWithErrorMessage('TR33 0006 1005 1978 6457 8413 26', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('CH93 0076 2011 6238 5295 7', () => {
            expect(abv.isValidWithErrorMessage('CH93 0076 2011 6238 5295 7', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('TR44 5001 0517 5407 3249 31', () => {
            expect(abv.isValidWithErrorMessage('TR44 5001 0517 5407 3249 31', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('DE16 0110 1250 0000 0001 2300 695', () => {
            expect(abv.isValidWithErrorMessage('DE16 0110 1250 0000 0001 2300 695', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('GR29 NWBK 6016 1331 9268 19', () => {
            expect(abv.isValidWithErrorMessage('GR29 NWBK 6016 1331 9268 19', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('GB03 8000 0000 6080 1016 7519', () => {
            expect(abv.isValidWithErrorMessage('GB03 8000 0000 6080 1016 7519', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('SA93 0076 2011 6238 5295 7', () => {
            expect(abv.isValidWithErrorMessage('SA93 0076 2011 6238 5295 7', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('CH33 0006 1005 1978 6457 8413 26', () => {
            expect(abv.isValidWithErrorMessage('CH33 0006 1005 1978 6457 8413 26', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('79927398713', () => {
            expect(abv.isValidWithErrorMessage('79927398713', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('378282246310005', () => {
            expect(abv.isValidWithErrorMessage('378282246310005', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('3566002020360505', () => {
            expect(abv.isValidWithErrorMessage('3566002020360505', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('6331101999990016', () => {
            expect(abv.isValidWithErrorMessage('6331101999990016', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('12345678985', () => {
            expect(abv.isValidWithErrorMessage('12345678985', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('EUR', () => {
            expect(abv.isValidWithErrorMessage('EUR', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('USD', () => {
            expect(abv.isValidWithErrorMessage('USD', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "NED SZA JJX XX"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX XX', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('BOFAUS6S', () => {
            expect(abv.isValidWithErrorMessage('BOFAUS6S', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(abv.isValidWithErrorMessage('n4DSZBJJXXx', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "N4DSZBJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZBJJXXX', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "N4DSZAJJXXX"', () => {
            expect(abv.isValidWithErrorMessage('N4DSZAJJXXX', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "NED SZA JJX X%"', () => {
            expect(abv.isValidWithErrorMessage('NED SZA JJX X%', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66"', () => {
            expect(abv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(abv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(abv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('https://www.google.com/', () => {
            expect(abv.isValidWithErrorMessage('https://www.google.com/', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'isbn')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'isbn')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(abv.isValidWithErrorMessage(false, 'isbn')).toBe("This value is neither a valid ISBN-10 nor a valid ISBN-13.");
        });
    });
});