'use strict';

const abv = require('../../build/output/sog-validator');

describe('iterable', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'iterable')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'iterable')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'iterable')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be iterable.";

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'iterable')).toBe(toBe);
        });

        test('function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'iterable')).toBe(toBe);
        });
    });
});