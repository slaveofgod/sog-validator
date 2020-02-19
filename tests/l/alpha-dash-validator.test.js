'use strict';

const sogv = require('../../build/output/sog-validator');

describe('alpha_dash', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'alpha_dash')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'alpha_dash')).toBe(toBe);
        });

        test('String without space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'alpha_dash')).toBe(toBe);
        });

        test('String "Ab-F2_6F-g6_9H"', () => {
            expect(sogv.isValidWithErrorMessage('Ab-F2_6F-g6_9H', 'alpha_dash')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'alpha_dash')).toBe(toBe);
        });

        test('59', () => {
            expect(sogv.isValidWithErrorMessage(59, 'alpha_dash')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value may only contain letters, numbers, dashes and underscores.";

        test('26.35', () => {
            expect(sogv.isValidWithErrorMessage(26.35, 'alpha-dash')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'alpha_dash')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'alpha_dash')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'alpha_dash')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'alpha_dash')).toBe(toBe);
        });
    });
});