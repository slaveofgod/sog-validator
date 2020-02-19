'use strict';

const sogv = require('../../build/output/sog-validator');

describe('range', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'range:{"min":10,"max":20}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'range:{"min":10,"max":20}')).toBe(toBe);
        });

        test('1991-12-17T03:24:00 [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage('1991-12-17T03:24:00', 'range:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('692933040000 [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage(692933040000, 'range:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('String "692933040000" [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage("692933040000", 'range:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe(toBe);
        });

        test('150 [min: 150, max: 200]', () => {
            expect(sogv.isValidWithErrorMessage(150, 'range:{"min":150,"max":200}')).toBe(toBe);
        });

        test('200 [min: 150, max: 200]', () => {
            expect(sogv.isValidWithErrorMessage(200, 'range:{"min":150,"max":200}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('125 [min: 150, max: 200]', () => {
            expect(sogv.isValidWithErrorMessage(125, 'range:{"min":150,"max":200}')).toBe("This value should be between 150 and 200.");
        });

        test('1990-12-17T03:24:00 [min: "1991-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage('1990-12-17T03:24:00', 'range:{"min":"1991-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe("This value should be between December 17, 1991 3:24 AM and December 17, 1995 3:24 AM.");
        });

        test('Lorem ipsum [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'range:{"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"}')).toBe("This value should be a valid number.");
        });

        test('False', () => {
            expect(sogv.isValidWithErrorMessage(false, 'range:{"min":10,"max":20}')).toBe("This value should be a valid number.");
        });

        test('Empty array', () => {
            expect(sogv.isValidWithErrorMessage([], 'range:{"min":10,"max":20}')).toBe("This value should be a valid number.");
        });
    });
});