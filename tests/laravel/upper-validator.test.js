'use strict';

const abv = require('../../build/output/sog-validator');

describe('upper', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'upper')).toBe(toBe);
        });

        test('String "GTEFFGGS"', () => {
            expect(abv.isValidWithErrorMessage("GTEFFGGS", 'upper')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be upper.";

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValidWithErrorMessage("\r\n\t", 'upper')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'upper')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'upper')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'upper')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'upper')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'upper')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'upper')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'upper')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'upper')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'upper')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'upper')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'upper')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'upper')).toBe(toBe);
        });
    });
});