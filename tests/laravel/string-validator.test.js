'use strict';

const abv = require('../../build/output/sog-validator');

describe('string', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'string')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'string')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value must be a string.";

        test('26.35', () => {
            expect(abv.isValidWithErrorMessage(26.35, 'string')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'string')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'string')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'string')).toBe(toBe);
        });
    });
});