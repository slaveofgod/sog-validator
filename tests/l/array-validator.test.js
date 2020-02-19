'use strict';

const sogv = require('../../build/output/sog-validator');
describe('array', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'array')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'array')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'array')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'array')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value must be an array.";

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'array')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'array')).toBe(toBe);
        });

        test('Boolean', () => {
            expect(sogv.isValidWithErrorMessage(false, 'array')).toBe(toBe);
        });
    });
});