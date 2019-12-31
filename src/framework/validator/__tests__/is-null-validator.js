'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('null', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'null')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = false;

        test('Empty String', () => {
            expect(abv.isValid('', 'null')).toBe(toBe);
        });

        test('0', () => {
            expect(abv.isValid(0, 'null')).toBe(toBe);
        });

        test('Boolean', () => {
            expect(abv.isValid(false, 'null')).toBe(toBe);
        });
    });
});