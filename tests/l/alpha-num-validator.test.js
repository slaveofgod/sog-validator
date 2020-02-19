'use strict';

const sogv = require('../../build/output/sog-validator');

describe('alpha_num', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'alpha_num')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'alpha_num')).toBe(toBe);
        });

        test('String without space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'alpha_num')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'alpha_num')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value may only contain letters and numbers.";

        test('59', () => {
            expect(sogv.isValidWithErrorMessage(59, 'alpha_num')).toBe(toBe);
        });

        test('26.35', () => {
            expect(sogv.isValidWithErrorMessage(26.35, 'alpha-num')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'alpha_num')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'alpha_num')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'alpha_num')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'alpha_num')).toBe(toBe);
        });
    });
});