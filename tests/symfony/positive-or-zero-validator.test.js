'use strict';

const sogv = require('../../build/output/sog-validator');

describe('positive-or-zero', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'positive-or-zero')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'positive-or-zero')).toBe(toBe);
        });

        test('0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'positive-or-zero')).toBe(toBe);
        });

        test('String "0.00000005"', () => {
            expect(sogv.isValidWithErrorMessage("0.00000005", 'positive-or-zero')).toBe(toBe);
        });

        test('String "0"', () => {
            expect(sogv.isValidWithErrorMessage("0", 'positive-or-zero')).toBe(toBe);
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'positive-or-zero')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('-5', () => {
            expect(sogv.isValidWithErrorMessage(-5, 'positive-or-zero')).toBe("This value should be either positive or zero.");
        });

        test('String "-5"', () => {
            expect(sogv.isValidWithErrorMessage("-5", 'positive-or-zero')).toBe("This value should be either positive or zero.");
        });

        test('-0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(-0.00000001, 'positive-or-zero')).toBe("This value should be either positive or zero.");
        });

        test('String "-0.00000001"', () => {
            expect(sogv.isValidWithErrorMessage("-0.00000001", 'positive-or-zero')).toBe("This value should be either positive or zero.");
        });
    });
});