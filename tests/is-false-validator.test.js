'use strict';

const abv = require('../build/output/bob-validator');

describe('false', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('False', () => {
            expect(abv.isValidWithErrorMessage(false, 'false')).toBe(toBe);
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'false')).toBe(toBe);
        });

        test('"0"', () => {
            expect(abv.isValidWithErrorMessage("0", 'false')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be false.";

        test('Empty', () => {
            expect(abv.isValidWithErrorMessage('', 'false')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'false')).toBe(toBe);
        });

        test('True', () => {
            expect(abv.isValidWithErrorMessage(true, 'false')).toBe(toBe);
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'false')).toBe(toBe);
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'false')).toBe(toBe);
        });
    });
});