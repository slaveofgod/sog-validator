'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('email', () => {
    describe('Is Valid', () => {
        let toBe = true;

        test('a@a.com', () => {
            expect(abv.isValid('a@a.com', 'email;mode:loose')).toBe(toBe);
        });

        test('alexey.bob@gmail.com', () => {
            expect(abv.isValid('alexey.bob@gmail.com', 'email;mode:html5')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = false;

        test('a@a-com', () => {
            expect(abv.isValid('a@a-com', 'email;mode:loose')).toBe(toBe);
        });

        test('abcdefg', () => {
            expect(abv.isValid('abcdefg', 'email;mode:html5')).toBe(toBe);
        });

        test('String "GTEFFGGS"', () => {
            expect(abv.isValid("GTEFFGGS", 'email')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValid("\r\n\t", 'email')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(abv.isValid('*&$()', 'email')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValid('loremipsum', 'email')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValid('lorem25$fcse97ipsum', 'email')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValid('Loremipsum', 'email')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValid('AbF26Fg69H', 'email')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValid(10.25, 'email')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValid('Lorem ipsum', 'email')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValid("\r fsd \tf \n", 'email')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValid(function () {}, 'email')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValid(null, 'email')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValid({}, 'email')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValid([], 'email')).toBe(toBe);
        });
    });
});