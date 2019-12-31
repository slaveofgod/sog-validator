'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('length', () => {
    describe('Is Valid', () => {
        let toBe = true;

        test('String "GTEFFGGS"', () => {
            expect(abv.isValid("GTEFFGGS", 'length;min:1')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValid("\r\n\t", 'length;min:1')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(abv.isValid('*&$()', 'length;min:1')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValid('loremipsum', 'length;min:1')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValid('lorem25$fcse97ipsum', 'length;min:1')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValid('Loremipsum', 'length;min:1')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValid('AbF26Fg69H', 'length;min:1')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValid(10.25, 'length;min:1')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValid('Lorem ipsum', 'length;min:1')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValid("\r fsd \tf \n", 'length;min:1')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValid(function () {}, 'length;min:1')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValid({}, 'length;min:1')).toBe(toBe);
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