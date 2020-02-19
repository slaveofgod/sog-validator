'use strict';

const sogv = require('../../build/output/sog-validator');

describe('negative', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'negative')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'negative')).toBe(toBe);
        });

        test('-5', () => {
            expect(sogv.isValidWithErrorMessage(-5, 'negative')).toBe(toBe);
        });

        test('String "-5"', () => {
            expect(sogv.isValidWithErrorMessage("-5", 'negative')).toBe(toBe);
        });

        test('-0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(-0.00000001, 'negative')).toBe(toBe);
        });

        test('String "-0.00000001"', () => {
            expect(sogv.isValidWithErrorMessage("-0.00000001", 'negative')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('String "0"', () => {
            expect(sogv.isValidWithErrorMessage("0", 'negative')).toBe("This value should be negative.");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'negative')).toBe("This value should be negative.");
        });

        test('0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'negative')).toBe("This value should be negative.");
        });

        test('String "0.00000005"', () => {
            expect(sogv.isValidWithErrorMessage("0.00000005", 'negative')).toBe("This value should be negative.");
        });
    });
});