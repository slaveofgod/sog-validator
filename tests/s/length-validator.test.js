'use strict';

const sogv = require('../../build/output/sog-validator');

describe('length', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('String "abcd efgh ijklmn" [min:1]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'length:{"min":1}')).toBe(toBe);
        });

        test('String "abcd efgh ijklmn" [min:1, max:20, normalize:true]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'length:{"min":1,"max":20}')).toBe(toBe);
        });

        test('String " abcd efgh ijklmnopq " ["min":1,"max":20,"normalize":true]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'length:{"min":1,"max":20,"normalize":true}')).toBe(toBe);
        });

        test('Empty string [min:1,allowEmptyString:true]', () => {
            expect(sogv.isValidWithErrorMessage("", 'length:{"min":1,"allowEmptyString":true}')).toBe(toBe);
        });

        test('String " abcd efghi " ["min":10,"max":10,"normalize":true]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efghi ", 'length:{"min":10,"max":10,"normalize":true}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('String " abcd efgh ijklmnopq " ["min":10,"max":10,"normalize":true]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'length:{"min":10,"max":10,"normalize":true}')).toBe('This value should have exactly 10 characters.');
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'length:{"min":1}')).toBe("This value should be of type scalar.");
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'length:{"min":1}')).toBe("This value null could not be converted to string.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'length:{"min":1}')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'length:{"min":1}')).toBe("This value should be of type scalar.");
        });

        test('String "abcd efgh ijklmn" [min:1,max:10]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'length:{"min":1,"max":10}')).toBe("This value is too long. It should have 10 characters or less.");
        });

        test('String "abcd" [min:5,max:10]', () => {
            expect(sogv.isValidWithErrorMessage("abcd", 'length:{"min":5,"max":10}')).toBe("This value is too short. It should have 5 characters or more.");
        });
    });
});