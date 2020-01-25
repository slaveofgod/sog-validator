'use strict';

const abv = require('../../build/output/bob-validator');

describe('numeric', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'numeric')).toBe(toBe);
        });

        test('Empty string', () => {
            expect(abv.isValidWithErrorMessage('', 'numeric')).toBe(toBe);
        });

        test('10', () => {
            expect(abv.isValidWithErrorMessage(10, 'numeric')).toBe(toBe);
        });

        test('"25"', () => {
            expect(abv.isValidWithErrorMessage('25', 'numeric')).toBe(toBe);
        });

        test('26.98', () => {
            expect(abv.isValidWithErrorMessage(26.98, 'numeric')).toBe(toBe);
        });

        test('"59.63"', () => {
            expect(abv.isValidWithErrorMessage('59.63', 'numeric')).toBe(toBe);
        });

        test('.98', () => {
            expect(abv.isValidWithErrorMessage(.36, 'numeric')).toBe(toBe);
        });

        test('".26"', () => {
            expect(abv.isValidWithErrorMessage('.26', 'numeric')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value must be a number.";

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'numeric')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'numeric')).toBe(toBe);
        });

        test('function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'numeric')).toBe(toBe);
        });
    });
});