'use strict';

const abv = require('../../build/output/sog-validator');

describe('null', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'null')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be null.";

        test('Empty String', () => {
            expect(abv.isValidWithErrorMessage('', 'null')).toBe(toBe);
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'null')).toBe(toBe);
        });

        test('Boolean', () => {
            expect(abv.isValidWithErrorMessage(false, 'null')).toBe(toBe);
        });
    });
});