'use strict';

const abv = require('../../build/output/bob-validator');

describe('alpha_dash', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'alpha_dash')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'alpha_dash')).toBe(toBe);
        });

        test('String without space(s)', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'alpha_dash')).toBe(toBe);
        });

        test('String "Ab-F2_6F-g6_9H"', () => {
            expect(abv.isValidWithErrorMessage('Ab-F2_6F-g6_9H', 'alpha_dash')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'alpha_dash')).toBe(toBe);
        });

        test('59', () => {
            expect(abv.isValidWithErrorMessage(59, 'alpha_dash')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The field may only contain letters, numbers, dashes and underscores.";

        test('26.35', () => {
            expect(abv.isValidWithErrorMessage(26.35, 'alpha-dash')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'alpha_dash')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'alpha_dash')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'alpha_dash')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'alpha_dash')).toBe(toBe);
        });
    });
});