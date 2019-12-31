'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('not-null', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string', () => {
            expect(abv.isValidWithErrorMessage('', 'not-null')).toBe(toBe);
        });

        test('Empty array', () => {
            expect(abv.isValidWithErrorMessage([], 'not-null')).toBe(toBe);
        });

        test('Empty object', () => {
            expect(abv.isValidWithErrorMessage({}, 'not-null')).toBe(toBe);
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'not-null')).toBe(toBe);
        });

        test('False', () => {
            expect(abv.isValidWithErrorMessage(false, 'not-null')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = false;

        test('Undefined', () => {
            expect(abv.isValid(undefined, 'not-null')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValid(null, 'not-null')).toBe(toBe);
        });
    });
});