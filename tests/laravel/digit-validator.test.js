'use strict';

const sogv = require('../../build/output/sog-validator');

describe('digit', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'digit')).toBe(toBe);
        });

        test('String "59"', () => {
            expect(sogv.isValidWithErrorMessage("59", 'digit')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be digit.";

        test('59', () => {
            expect(sogv.isValidWithErrorMessage(59, 'digit')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'digit')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'digit')).toBe(toBe);
        });

        test('26.35', () => {
            expect(sogv.isValidWithErrorMessage(26.35, 'digit')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'digit')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'digit')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'digit')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'digit')).toBe(toBe);
        });
    });
});