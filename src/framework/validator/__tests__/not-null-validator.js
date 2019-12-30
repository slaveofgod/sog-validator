'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('not-null', () => {
    describe('Is Valid', () => {
        let toBe = true;

        test('Empty string', () => {
            expect(abv.isValid('', 'not-null')).toBe(toBe);
        });

        test('Empty array', () => {
            expect(abv.isValid([], 'not-null')).toBe(toBe);
        });

        test('Empty object', () => {
            expect(abv.isValid({}, 'not-null')).toBe(toBe);
        });

        test('0', () => {
            expect(abv.isValid(0, 'not-null')).toBe(toBe);
        });

        test('False', () => {
            expect(abv.isValid(false, 'not-null')).toBe(toBe);
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