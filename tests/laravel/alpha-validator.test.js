'use strict';

const abv = require('../../build/output/bob-validator');

describe('alpha', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'alpha')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'alpha')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'alpha')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value may only contain letters.";

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'alpha')).toBe(toBe);
        });

        test('59', () => {
            expect(abv.isValidWithErrorMessage(59, 'alpha')).toBe(toBe);
        });

        test('26.35', () => {
            expect(abv.isValidWithErrorMessage(26.35, 'alpha')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'alpha')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'alpha')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'alpha')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'alpha')).toBe(toBe);
        });
    });
});