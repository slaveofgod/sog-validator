'use strict';

const abv = require('../../build/output/bob-validator');

describe('size', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'size:{"value":1}')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'size:{"value":1}')).toBe(toBe);
        });

        test('String "abcd efgh ijklmn" [value:16]', () => {
            expect(abv.isValidWithErrorMessage("abcd efgh ijklmn", 'size:{"value":16}')).toBe(toBe);
        });

        test('String "abcd efgh ijklmn" [value:23]', () => {
            expect(abv.isValidWithErrorMessage("abcd efgh ijklmn eaffsf", 'size:{"value":23}')).toBe(toBe);
        });

        test('String " abcd efgh ijklmnopq " ["value":21]', () => {
            expect(abv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'size:{"value":21}')).toBe(toBe);
        });

        test('125.63', () => {
            expect(abv.isValidWithErrorMessage(125.63, 'size:{"value":125.63}')).toBe(toBe);
        });

        test('[1,2,3,4,5,6,7,8,9]', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9], 'size:{"value":9}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('[1,2,3,4,5,6,7,8,9]', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9], 'size:{"value":5}')).toBe("The value must contain 5 items.");
        });

        test('String " abcd efgh ijklmnopq " ["value":10]', () => {
            expect(abv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'size:{"value":10}')).toBe('The value must be 10 characters.');
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'size:{"value":1}')).toBe("This value should be of type array.");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'size:{"value":1}')).toBe("The value must contain 1 items.");
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'size:{"value":1}')).toBe("The value must contain 1 items.");
        });

        test('String "abcd efgh ijklmn" [min:1]', () => {
            expect(abv.isValidWithErrorMessage("abcd efgh ijklmn", 'size:{"value":1}')).toBe("The value must be 1 characters.");
        });

        test('String "abcd" [min:5]', () => {
            expect(abv.isValidWithErrorMessage("abcd", 'size:{"value":50}')).toBe("The value must be 50 characters.");
        });
    });
});