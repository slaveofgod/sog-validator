'use strict';

const abv = require('../../build/output/sog-validator');

describe('digit', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'digit')).toBe(toBe);
        });

        test('String "59"', () => {
            expect(abv.isValidWithErrorMessage("59", 'digit')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be digit.";

        test('59', () => {
            expect(abv.isValidWithErrorMessage(59, 'digit')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'digit')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'digit')).toBe(toBe);
        });

        test('26.35', () => {
            expect(abv.isValidWithErrorMessage(26.35, 'digit')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'digit')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'digit')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'digit')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'digit')).toBe(toBe);
        });
    });
});