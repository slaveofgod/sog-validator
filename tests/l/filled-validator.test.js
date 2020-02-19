'use strict';

const sogv = require('../../build/output/sog-validator');

describe('filled', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('String with spaces only', () => {
            expect(sogv.isValidWithErrorMessage('   ', 'filled')).toBe(toBe);
        });

        test('123456', () => {
            expect(sogv.isValidWithErrorMessage(123456, 'filled')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should not be blank.";

        test('Undefined', () => {
            expect(sogv.isValidWithErrorMessage(undefined, 'filled')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'filled')).toBe(toBe);
        });

        test('False', () => {
            expect(sogv.isValidWithErrorMessage(false, 'filled')).toBe(toBe);
        });

        test('Empty string', () => {
            expect(sogv.isValidWithErrorMessage('', 'filled')).toBe(toBe);
        });

        test('Empty array', () => {
            expect(sogv.isValidWithErrorMessage([], 'filled')).toBe(toBe);
        });
    });
});