'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('length', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('String "GTEFFGGS"', () => {
            expect(abv.isValidWithErrorMessage("GTEFFGGS", 'length;min:1')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValidWithErrorMessage("\r\n\t", 'length;min:1')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'length;min:1')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'length;min:1')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'length;min:1')).toBe(toBe);
        });

        test('String "isValidWithErrorMessage"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'length;min:1')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'length;min:1')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'length;min:1')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'length;min:1')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'length;min:1')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'length;min:1')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'length;min:1')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = false;

        test('Null', () => {
            expect(abv.isValid(null, 'length;min:1')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValid([], 'length;min:1')).toBe(toBe);
        });
    });
});