'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('false', () => {
    describe('Is Valid', () => {
        let toBe = true;

        test('False', () => {
            expect(abv.isValid(false, 'false')).toBe(toBe);
        });

        test('0', () => {
            expect(abv.isValid(0, 'false')).toBe(toBe);
        });

        test('"0"', () => {
            expect(abv.isValid("0", 'false')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = false;

        test('Empty', () => {
            expect(abv.isValid('', 'false')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValid(null, 'false')).toBe(toBe);
        });

        test('True', () => {
            expect(abv.isValid(true, 'false')).toBe(toBe);
        });

        test('Empty Array', () => {
            expect(abv.isValid([], 'false')).toBe(toBe);
        });

        test('Empty Object', () => {
            expect(abv.isValid({}, 'false')).toBe(toBe);
        });
    });
});