'use strict';

const sogv = require('../../build/output/sog-validator');

describe('integer', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('20', () => {
            expect(sogv.isValidWithErrorMessage(20, 'integer')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value must be an integer.";

        test('"25"', () => {
            expect(sogv.isValidWithErrorMessage('25', 'integer')).toBe(toBe);
        });

        test('"10.25"', () => {
            expect(sogv.isValidWithErrorMessage('10.25', 'integer')).toBe(toBe);
        });

        test('15.26', () => {
            expect(sogv.isValidWithErrorMessage(15.26, 'integer')).toBe(toBe);
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'integer')).toBe(toBe);
        });
    });
});