'use strict';

const sogv = require('../../build/output/sog-validator');

describe('numeric', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'numeric')).toBe(toBe);
        });

        test('Empty string', () => {
            expect(sogv.isValidWithErrorMessage('', 'numeric')).toBe(toBe);
        });

        test('10', () => {
            expect(sogv.isValidWithErrorMessage(10, 'numeric')).toBe(toBe);
        });

        test('"25"', () => {
            expect(sogv.isValidWithErrorMessage('25', 'numeric')).toBe(toBe);
        });

        test('26.98', () => {
            expect(sogv.isValidWithErrorMessage(26.98, 'numeric')).toBe(toBe);
        });

        test('"59.63"', () => {
            expect(sogv.isValidWithErrorMessage('59.63', 'numeric')).toBe(toBe);
        });

        test('.98', () => {
            expect(sogv.isValidWithErrorMessage(.36, 'numeric')).toBe(toBe);
        });

        test('".26"', () => {
            expect(sogv.isValidWithErrorMessage('.26', 'numeric')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value must be a number.";

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'numeric')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'numeric')).toBe(toBe);
        });

        test('function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'numeric')).toBe(toBe);
        });
    });
});