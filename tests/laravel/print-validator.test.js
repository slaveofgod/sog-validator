'use strict';

const abv = require('../../build/output/sog-validator');

describe('print', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'print')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'print')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'print')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'print')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'print')).toBe(toBe);
        });

        test('String "20"', () => {
            expect(abv.isValidWithErrorMessage("20", 'print')).toBe(toBe);
        });

        test('String "10.25"', () => {
            expect(abv.isValidWithErrorMessage("10.25", 'print')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'print')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be print.";

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'print')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'print')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'print')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'print')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'print')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'print')).toBe(toBe);
        });
    });
});