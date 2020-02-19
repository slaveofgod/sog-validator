'use strict';

const sogv = require('../../build/output/sog-validator');

describe('double', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'double')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be double.";

        test('"10.25"', () => {
            expect(sogv.isValidWithErrorMessage('10.25', 'double')).toBe(toBe);
        });

        test('10', () => {
            expect(sogv.isValidWithErrorMessage(10, 'double')).toBe(toBe);
        });

        test('"10"', () => {
            expect(sogv.isValidWithErrorMessage('10', 'double')).toBe(toBe);
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'double')).toBe(toBe);
        });
    });
});