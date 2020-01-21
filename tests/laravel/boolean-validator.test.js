'use strict';

const abv = require('../../build/output/bob-validator');

describe('boolean', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('True', () => {
            expect(abv.isValidWithErrorMessage(true, 'boolean')).toBe(toBe);
        });

        test('1', () => {
            expect(abv.isValidWithErrorMessage(1, 'boolean')).toBe(toBe);
        });

        test('"1"', () => {
            expect(abv.isValidWithErrorMessage('1', 'boolean')).toBe(toBe);
        });

        test('False', () => {
            expect(abv.isValidWithErrorMessage(false, 'bool')).toBe(toBe);
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'bool')).toBe(toBe);
        });

        test('"0"', () => {
            expect(abv.isValidWithErrorMessage('0', 'bool')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be true or false.";

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'boolean')).toBe(toBe);
        });
    });
});