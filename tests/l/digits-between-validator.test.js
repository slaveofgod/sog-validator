'use strict';

const sogv = require('../../build/output/sog-validator');

describe('digits_between', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'digits_between:{"min":10,"max":20}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'digits_between:{"min":10,"max":20}')).toBe(toBe);
        });

        test('123456789 [min":9,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage(123456789, 'digits_between:{"min":9,"max":20}')).toBe(toBe);
        });

        test('"12589634875214" ["min":14,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage('12589634875214', 'digits-between:{"min":14,"max":20}')).toBe(toBe);
        });

        test('1258963487521425 ["min":12,"max":21]', () => {
            expect(sogv.isValidWithErrorMessage(1258963487521425, 'digits-between:{"min":12,"max":21}')).toBe(toBe);
        });

        test('12345 ["min":5,"max":10]', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'digits-between:{"min":5,"max":10}')).toBe(toBe);
        });

        test('1234567890 ["min":5,"max":10]', () => {
            expect(sogv.isValidWithErrorMessage(1234567890, 'digits-between:{"min":5,"max":10}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('String "abcd efgh ijklmn" ["min":10,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'digits_between:{"min":10,"max":20}')).toBe("This value should be of type numeric.");
        });

        test('String "abcd efgh ijklmn" ["min":15,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'digits_between:{"min":15,"max":20}')).toBe("This value should be of type numeric.");
        });

        test('String " abcd efgh ijklmnopq " ["min":5,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'digits_between:{"min":5,"max":20}')).toBe("This value should be of type numeric.");
        });

        test('String " abcd efghi " ["min":10,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efghi ", 'digits_between:{"min":10,"max":20}')).toBe("This value should be of type numeric.");
        });

        test('String " abcd efgh ijklmnopq " ["min":10,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'digits_between:{"min":10,"max":20}')).toBe("This value should be of type numeric.");
        });

        test('String "abcd efgh ijklmn" ["min":10,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'digits_between:{"min":10,"max":20}')).toBe("This value should be of type numeric.");
        });

        test('String "abcd" ["min":5,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage("abcd", 'digits_between:{"min":5,"max":20}')).toBe("This value should be of type numeric.");
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'digits_between:{"min":1,"max":20}')).toBe("This value should be of type scalar.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'digits_between:{"min":1,"max":20}')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'digits_between:{"min":1,"max":20}')).toBe("This value should be of type scalar.");
        });
    });
});