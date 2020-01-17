'use strict';

const abv = require('../build/output/bob-validator');

describe('positive-or-zero', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('0.00000001', () => {
            expect(abv.isValidWithErrorMessage(0.00000001, 'positive-or-zero')).toBe(toBe);
        });

        test('String "0.00000005"', () => {
            expect(abv.isValidWithErrorMessage("0.00000005", 'positive-or-zero')).toBe(toBe);
        });

        test('String "0"', () => {
            expect(abv.isValidWithErrorMessage("0", 'positive-or-zero')).toBe(toBe);
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'positive-or-zero')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('-5', () => {
            expect(abv.isValidWithErrorMessage(-5, 'positive-or-zero')).toBe("This value should be either positive or zero.");
        });

        test('String "-5"', () => {
            expect(abv.isValidWithErrorMessage("-5", 'positive-or-zero')).toBe("This value should be either positive or zero.");
        });

        test('-0.00000001', () => {
            expect(abv.isValidWithErrorMessage(-0.00000001, 'positive-or-zero')).toBe("This value should be either positive or zero.");
        });

        test('String "-0.00000001"', () => {
            expect(abv.isValidWithErrorMessage("-0.00000001", 'positive-or-zero')).toBe("This value should be either positive or zero.");
        });
    });
});