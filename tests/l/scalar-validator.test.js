'use strict';

const sogv = require('../../build/output/sog-validator');

describe('scalar', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'scalar')).toBe(toBe);
        });

        test('20', () => {
            expect(sogv.isValidWithErrorMessage(20, 'scalar')).toBe(toBe);
        });

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'scalar')).toBe(toBe);
        });

        test('True', () => {
            expect(sogv.isValidWithErrorMessage(true, 'scalar')).toBe(toBe);
        });

        test('False', () => {
            expect(sogv.isValidWithErrorMessage(false, 'scalar')).toBe(toBe);
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'scalar')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be scalar.";

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'scalar')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'scalar')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'scalar')).toBe(toBe);
        });
    });
});