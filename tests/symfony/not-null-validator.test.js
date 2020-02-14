'use strict';

const sogv = require('../../build/output/sog-validator');

describe('not-null', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string', () => {
            expect(sogv.isValidWithErrorMessage('', 'not-null')).toBe(toBe);
        });

        test('Empty array', () => {
            expect(sogv.isValidWithErrorMessage([], 'not-null')).toBe(toBe);
        });

        test('Empty object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'not-null')).toBe(toBe);
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'not-null')).toBe(toBe);
        });

        test('False', () => {
            expect(sogv.isValidWithErrorMessage(false, 'not-null')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should not be null.";

        test('Undefined', () => {
            expect(sogv.isValidWithErrorMessage(undefined, 'not-null')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'not-null')).toBe(toBe);
        });
    });
});