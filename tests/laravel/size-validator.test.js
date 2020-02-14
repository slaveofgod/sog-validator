'use strict';

const sogv = require('../../build/output/sog-validator');

describe('size', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'size:{"value":1}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'size:{"value":1}')).toBe(toBe);
        });

        test('String "abcd efgh ijklmn" [value:16]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'size:{"value":16}')).toBe(toBe);
        });

        test('String "abcd efgh ijklmn" [value:23]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn eaffsf", 'size:{"value":23}')).toBe(toBe);
        });

        test('String " abcd efgh ijklmnopq " ["value":21]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'size:{"value":21}')).toBe(toBe);
        });

        test('125.63', () => {
            expect(sogv.isValidWithErrorMessage(125.63, 'size:{"value":125.63}')).toBe(toBe);
        });

        test('[1,2,3,4,5,6,7,8,9]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9], 'size:{"value":9}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('[1,2,3,4,5,6,7,8,9]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9], 'size:{"value":5}')).toBe("The value must contain 5 items.");
        });

        test('String " abcd efgh ijklmnopq " ["value":10]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'size:{"value":10}')).toBe('The value must be 10 characters.');
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'size:{"value":1}')).toBe("This value should be of type array.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'size:{"value":1}')).toBe("The value must contain 1 items.");
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'size:{"value":1}')).toBe("The value must contain 1 items.");
        });

        test('String "abcd efgh ijklmn" [min:1]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'size:{"value":1}')).toBe("The value must be 1 characters.");
        });

        test('String "abcd" [min:5]', () => {
            expect(sogv.isValidWithErrorMessage("abcd", 'size:{"value":50}')).toBe("The value must be 50 characters.");
        });
    });
});