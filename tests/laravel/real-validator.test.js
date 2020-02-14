'use strict';

const sogv = require('../../build/output/sog-validator');

describe('real', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'real')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be real.";

        test('"10.25"', () => {
            expect(sogv.isValidWithErrorMessage('10.25', 'real')).toBe(toBe);
        });

        test('"10"', () => {
            expect(sogv.isValidWithErrorMessage('10', 'real')).toBe(toBe);
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'real')).toBe(toBe);
        });
    });
});