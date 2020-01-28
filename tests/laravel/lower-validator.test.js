'use strict';

const abv = require('../../build/output/sog-validator');

describe('lower', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'lower')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'lower')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be lower.";

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'lower')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'lower')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'lower')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'lower')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'lower')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'lower')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'lower')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'lower')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'lower')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'lower')).toBe(toBe);
        });
    });
});