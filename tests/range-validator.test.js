'use strict';

const abv = require('../build/output/bob-validator');

describe('range', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'range:{"min":10,"max":20}')).toBe(toBe);
        });

        test('1991-12-17T03:24:00 [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(abv.isValidWithErrorMessage('1991-12-17T03:24:00', 'range:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('692933040000 [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(abv.isValidWithErrorMessage(692933040000, 'range:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('String "692933040000" [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(abv.isValidWithErrorMessage("692933040000", 'range:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe(toBe);
        });


        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'range:{"min":10,"max":20}')).toBe(toBe);
        });

        test('150 [min: 150, max: 200]', () => {
            expect(abv.isValidWithErrorMessage(150, 'range:{"min":150,"max":200}')).toBe(toBe);
        });

        test('200 [min: 150, max: 200]', () => {
            expect(abv.isValidWithErrorMessage(200, 'range:{"min":150,"max":200}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('125 [min: 150, max: 200]', () => {
            expect(abv.isValidWithErrorMessage(125, 'range:{"min":150,"max":200}')).toBe("This value should be between 150 and 200.");
        });

        test('1990-12-17T03:24:00 [min: "1991-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(abv.isValidWithErrorMessage('1990-12-17T03:24:00', 'range:{"min":"1991-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe("This value should be between 692933040000 and 819163440000.");
        });

        test('Lorem ipsum [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'range:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe("This value should be a valid number.");
        });

        test('False', () => {
            expect(abv.isValidWithErrorMessage(false, 'range:{"min":10,"max":20}')).toBe("This value should be a valid number.");
        });

        test('Empty array', () => {
            expect(abv.isValidWithErrorMessage([], 'range:{"min":10,"max":20}')).toBe("This value should be a valid number.");
        });
    });
});