'use strict';

const abv = require('../../build/output/sog-validator');

describe('float', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'float')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be float.";

        test('"10.25"', () => {
            expect(abv.isValidWithErrorMessage('10.25', 'float')).toBe(toBe);
        });

        test('10', () => {
            expect(abv.isValidWithErrorMessage(10, 'float')).toBe(toBe);
        });

        test('"10"', () => {
            expect(abv.isValidWithErrorMessage('10', 'float')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'float')).toBe(toBe);
        });
    });
});