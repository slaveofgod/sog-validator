'use strict';

const abv = require('../../build/output/bob-validator');

describe('negative', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('-5', () => {
            expect(abv.isValidWithErrorMessage(-5, 'negative')).toBe(toBe);
        });

        test('String "-5"', () => {
            expect(abv.isValidWithErrorMessage("-5", 'negative')).toBe(toBe);
        });

        test('-0.00000001', () => {
            expect(abv.isValidWithErrorMessage(-0.00000001, 'negative')).toBe(toBe);
        });

        test('String "-0.00000001"', () => {
            expect(abv.isValidWithErrorMessage("-0.00000001", 'negative')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('String "0"', () => {
            expect(abv.isValidWithErrorMessage("0", 'negative')).toBe("This value should be negative.");
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'negative')).toBe("This value should be negative.");
        });

        test('0.00000001', () => {
            expect(abv.isValidWithErrorMessage(0.00000001, 'negative')).toBe("This value should be negative.");
        });

        test('String "0.00000005"', () => {
            expect(abv.isValidWithErrorMessage("0.00000005", 'negative')).toBe("This value should be negative.");
        });
    });
});