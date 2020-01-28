'use strict';

const abv = require('../../build/output/sog-validator');

describe('scalar', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'scalar')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'scalar')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'scalar')).toBe(toBe);
        });

        test('True', () => {
            expect(abv.isValidWithErrorMessage(true, 'scalar')).toBe(toBe);
        });

        test('False', () => {
            expect(abv.isValidWithErrorMessage(false, 'scalar')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'scalar')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be scalar.";

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'scalar')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'scalar')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'scalar')).toBe(toBe);
        });
    });
});