'use strict';

const sogv = require('../../build/output/sog-validator');

describe('digits', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'digits:{"length":10}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'digits:{"length":10}')).toBe(toBe);
        });

        test('123456789 ["length":9]', () => {
            expect(sogv.isValidWithErrorMessage(123456789, 'digits:{"length":9}')).toBe(toBe);
        });

        test('"12589634875214" ["length":14]', () => {
            expect(sogv.isValidWithErrorMessage('12589634875214', 'digits:{"length":14}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('12589634875214 ["length":10]', () => {
            expect(sogv.isValidWithErrorMessage(12589634875214, 'digits:{"length":10}')).toBe("The value must be 10 digits.");
        });

        test('String "abcd efgh ijklmn" ["length":10]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'digits:{"length":10}')).toBe("This value should be of type numeric.");
        });

        test('String "abcd efgh ijklmn" ["length":15]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'digits:{"length":15}')).toBe("This value should be of type numeric.");
        });

        test('String " abcd efgh ijklmnopq " ["length":5]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'digits:{"length":5}')).toBe("This value should be of type numeric.");
        });

        test('String " abcd efghi " ["length":10]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efghi ", 'digits:{"length":10}')).toBe("This value should be of type numeric.");
        });

        test('String " abcd efgh ijklmnopq " ["length":10]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'digits:{"length":10}')).toBe("This value should be of type numeric.");
        });

        test('String "abcd efgh ijklmn" [min:1,max:10]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'digits:{"length":10}')).toBe("This value should be of type numeric.");
        });

        test('String "abcd" [min:5,max:10]', () => {
            expect(sogv.isValidWithErrorMessage("abcd", 'digits:{"length":5}')).toBe("This value should be of type numeric.");
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'digits:{"length":1}')).toBe("This value should be of type scalar.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'digits:{"length":1}')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'digits:{"length":1}')).toBe("This value should be of type scalar.");
        });
    });
});