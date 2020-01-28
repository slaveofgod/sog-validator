'use strict';

const abv = require('../../build/output/sog-validator');

describe('space', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'space')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValidWithErrorMessage("\r\n\t", 'space')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be space.";

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'space')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'space')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'space')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'space')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'space')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'space')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'space')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'space')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'space')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'space')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'space')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'space')).toBe(toBe);
        });
    });
});