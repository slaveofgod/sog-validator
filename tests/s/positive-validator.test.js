'use strict';

const sogv = require('../../build/output/sog-validator');

describe('positive', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'positive')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'positive')).toBe(toBe);
        });

        test('0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'positive')).toBe(toBe);
        });

        test('String "0.00000005"', () => {
            expect(sogv.isValidWithErrorMessage("0.00000005", 'positive')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('String "0"', () => {
            expect(sogv.isValidWithErrorMessage("0", 'positive')).toBe("This value should be positive.");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'positive')).toBe("This value should be positive.");
        });

        test('-5', () => {
            expect(sogv.isValidWithErrorMessage(-5, 'positive')).toBe("This value should be positive.");
        });

        test('String "-5"', () => {
            expect(sogv.isValidWithErrorMessage("-5", 'positive')).toBe("This value should be positive.");
        });

        test('-0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(-0.00000001, 'positive')).toBe("This value should be positive.");
        });

        test('String "-0.00000001"', () => {
            expect(sogv.isValidWithErrorMessage("-0.00000001", 'positive')).toBe("This value should be positive.");
        });
    });
});