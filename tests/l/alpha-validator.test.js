'use strict';

const sogv = require('../../build/output/sog-validator');

describe('alpha', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'alpha')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'alpha')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'alpha')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value may only contain letters.";

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'alpha')).toBe(toBe);
        });

        test('59', () => {
            expect(sogv.isValidWithErrorMessage(59, 'alpha')).toBe(toBe);
        });

        test('26.35', () => {
            expect(sogv.isValidWithErrorMessage(26.35, 'alpha')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'alpha')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'alpha')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'alpha')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'alpha')).toBe(toBe);
        });
    });
});