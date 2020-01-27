'use strict';

const abv = require('../../build/output/sog-validator');

describe('true', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('True', () => {
            expect(abv.isValidWithErrorMessage(true, 'true')).toBe(toBe);
        });

        test('1', () => {
            expect(abv.isValidWithErrorMessage(1, 'true')).toBe(toBe);
        });

        test('"1"', () => {
            expect(abv.isValidWithErrorMessage("1", 'true')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be true.";

        test('Empty String', () => {
            expect(abv.isValidWithErrorMessage('', 'true')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'true')).toBe(toBe);
        });

        test('Boolean', () => {
            expect(abv.isValidWithErrorMessage(false, 'true')).toBe(toBe);
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'true')).toBe(toBe);
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'true')).toBe(toBe);
        });
    });
});