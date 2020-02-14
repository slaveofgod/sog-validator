'use strict';

const sogv = require('../../build/output/sog-validator');

describe('iterable', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'iterable')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'iterable')).toBe(toBe);
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'iterable')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be iterable.";

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'iterable')).toBe(toBe);
        });

        test('function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'iterable')).toBe(toBe);
        });
    });
});