'use strict';

const abv = require('../../build/output/sog-validator');

describe('alpha_num', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'alpha_num')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'alpha_num')).toBe(toBe);
        });

        test('String without space(s)', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'alpha_num')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'alpha_num')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value may only contain letters and numbers.";

        test('59', () => {
            expect(abv.isValidWithErrorMessage(59, 'alpha_num')).toBe(toBe);
        });

        test('26.35', () => {
            expect(abv.isValidWithErrorMessage(26.35, 'alpha-num')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'alpha_num')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'alpha_num')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'alpha_num')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'alpha_num')).toBe(toBe);
        });
    });
});