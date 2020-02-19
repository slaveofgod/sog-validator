'use strict';

const sogv = require('../../build/output/sog-validator');

describe('string', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'string')).toBe(toBe);
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'string')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value must be a string.";

        test('26.35', () => {
            expect(sogv.isValidWithErrorMessage(26.35, 'string')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'string')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'string')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'string')).toBe(toBe);
        });
    });
});