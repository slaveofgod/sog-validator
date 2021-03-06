'use strict';

const sogv = require('../../build/output/sog-validator');

describe('negative-or-zero', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'negative-or-zero')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'negative-or-zero')).toBe(toBe);
        });

        test('String "0"', () => {
            expect(sogv.isValidWithErrorMessage("0", 'negative-or-zero')).toBe(toBe);
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'negative-or-zero')).toBe(toBe);
        });

        test('-5', () => {
            expect(sogv.isValidWithErrorMessage(-5, 'negative-or-zero')).toBe(toBe);
        });

        test('String "-5"', () => {
            expect(sogv.isValidWithErrorMessage("-5", 'negative-or-zero')).toBe(toBe);
        });

        test('-0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(-0.00000001, 'negative-or-zero')).toBe(toBe);
        });

        test('String "-0.00000001"', () => {
            expect(sogv.isValidWithErrorMessage("-0.00000001", 'negative-or-zero')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'negative-or-zero')).toBe("This value should be either negative or zero.");
        });

        test('String "0.00000005"', () => {
            expect(sogv.isValidWithErrorMessage("0.00000005", 'negative-or-zero')).toBe("This value should be either negative or zero.");
        });
    });
});