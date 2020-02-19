'use strict';

const sogv = require('../../build/output/sog-validator');

describe('float', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'float')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be float.";

        test('"10.25"', () => {
            expect(sogv.isValidWithErrorMessage('10.25', 'float')).toBe(toBe);
        });

        test('10', () => {
            expect(sogv.isValidWithErrorMessage(10, 'float')).toBe(toBe);
        });

        test('"10"', () => {
            expect(sogv.isValidWithErrorMessage('10', 'float')).toBe(toBe);
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'float')).toBe(toBe);
        });
    });
});