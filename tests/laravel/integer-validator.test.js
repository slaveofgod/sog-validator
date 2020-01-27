'use strict';

const abv = require('../../build/output/sog-validator');

describe('integer', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'integer')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value must be an integer.";

        test('"25"', () => {
            expect(abv.isValidWithErrorMessage('25', 'integer')).toBe(toBe);
        });

        test('"10.25"', () => {
            expect(abv.isValidWithErrorMessage('10.25', 'integer')).toBe(toBe);
        });

        test('15.26', () => {
            expect(abv.isValidWithErrorMessage(15.26, 'integer')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'integer')).toBe(toBe);
        });
    });
});