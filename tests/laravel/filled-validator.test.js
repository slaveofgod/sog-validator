'use strict';

const abv = require('../../build/output/sog-validator');

describe('filled', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('String with spaces only', () => {
            expect(abv.isValidWithErrorMessage('   ', 'filled')).toBe(toBe);
        });

        test('123456', () => {
            expect(abv.isValidWithErrorMessage(123456, 'filled')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The current field must have a value.";

        test('Undefined', () => {
            expect(abv.isValidWithErrorMessage(undefined, 'filled')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'filled')).toBe(toBe);
        });

        test('False', () => {
            expect(abv.isValidWithErrorMessage(false, 'filled')).toBe(toBe);
        });

        test('Empty string', () => {
            expect(abv.isValidWithErrorMessage('', 'filled')).toBe(toBe);
        });

        test('Empty array', () => {
            expect(abv.isValidWithErrorMessage([], 'filled')).toBe(toBe);
        });
    });
});