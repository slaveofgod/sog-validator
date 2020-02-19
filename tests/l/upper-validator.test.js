'use strict';

const sogv = require('../../build/output/sog-validator');

describe('upper', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'upper')).toBe(toBe);
        });

        test('String "GTEFFGGS"', () => {
            expect(sogv.isValidWithErrorMessage("GTEFFGGS", 'upper')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be upper.";

        test('String "\\r\\n\\t"', () => {
            expect(sogv.isValidWithErrorMessage("\r\n\t", 'upper')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(sogv.isValidWithErrorMessage('*&$()', 'upper')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('loremipsum', 'upper')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(sogv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'upper')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'upper')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'upper')).toBe(toBe);
        });

        test('20', () => {
            expect(sogv.isValidWithErrorMessage(20, 'upper')).toBe(toBe);
        });

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'upper')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'upper')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(sogv.isValidWithErrorMessage("\r fsd \tf \n", 'upper')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'upper')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'upper')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'upper')).toBe(toBe);
        });
    });
});