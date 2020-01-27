'use strict';

const abv = require('../../build/output/sog-validator');
describe('array', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'array')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'array')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'array')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'array')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value must be an array.";

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'array')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'array')).toBe(toBe);
        });

        test('Boolean', () => {
            expect(abv.isValidWithErrorMessage(false, 'array')).toBe(toBe);
        });
    });
});