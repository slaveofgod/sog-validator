'use strict';

const abv = require('../../build/output/sog-validator');

describe('punct', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'punct')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'punct')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be punct.";

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'punct')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'punct')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'punct')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'punct')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'punct')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'punct')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'punct')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'punct')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'punct')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'punct')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'punct')).toBe(toBe);
        });
    });
});