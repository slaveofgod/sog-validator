'use strict';

const sogv = require('../../build/output/sog-validator');

describe('between', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'between:{"min":10,"max":20}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'between:{"min":10,"max":20}')).toBe(toBe);
        });

        test('1991-12-17T03:24:00 [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage('1991-12-17T03:24:00', 'between:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('692933040000 [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage(692933040000, 'between:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('String "692933040000" [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage("692933040000", 'between:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('150 [min: 150, max: 200]', () => {
            expect(sogv.isValidWithErrorMessage(150, 'between:{"min":150,"max":200}')).toBe(toBe);
        });

        test('200 [min: 150, max: 200]', () => {
            expect(sogv.isValidWithErrorMessage(200, 'between:{"min":150,"max":200}')).toBe(toBe);
        });

        test('String "abcd efgh ijklmn" [min:1, max:20]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'between:{"min":1,"max":20}')).toBe(toBe);
        });

        test('[1,2,3,4,5,6,7,8,9,10,11,12] ["min":10,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9,10,11,12], 'between:{"min":10,"max":20}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('125 [min: 150, max: 200]', () => {
            expect(sogv.isValidWithErrorMessage(125, 'between:{"min":150,"max":200}')).toBe("The value must be between 150 and 200.");
        });

        test('1990-12-17T03:24:00 [min: "1991-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage('1990-12-17T03:24:00', 'between:{"min":"1991-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe("The value must be between 1991-12-17T03:24:00 and 1995-12-17T03:24:00 date.");
        });

        test('Lorem ipsum [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'between:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe("The value must be between 1990-12-17T03:24:00 and 1995-12-17T03:24:00 date.");
        });

        test('False', () => {
            expect(sogv.isValidWithErrorMessage(false, 'between:{"min":10,"max":20}')).toBe("Data type boolean does not supported");
        });

        test('Empty array', () => {
            expect(sogv.isValidWithErrorMessage([], 'between:{"min":10,"max":20}')).toBe("The value must have between 10 and 20 items.");
        });

        test('[1,2,3,4,5,6,7,8,9] ["min":10,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9], 'between:{"min":10,"max":20}')).toBe("The value must have between 10 and 20 items.");
        });

        test('String "abcd efgh ijklmnopq" ["min":6,"max":10]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'between:{"min":6,"max":10}')).toBe("The value must be between 6 and 10 characters.");
        });
    });
});