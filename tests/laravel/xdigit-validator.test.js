'use strict';

const abv = require('../../build/output/sog-validator');

describe('xdigit', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'xdigit')).toBe(toBe);
        });

        test('String "20"', () => {
            expect(abv.isValidWithErrorMessage("20", 'xdigit')).toBe(toBe);
        });

        test('String "AB2569"', () => {
            expect(abv.isValidWithErrorMessage("AB2569", 'xdigit')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be xdigit.";

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'xdigit')).toBe(toBe);
        });

        test('String "GTEFFGGS"', () => {
            expect(abv.isValidWithErrorMessage("GTEFFGGS", 'xdigit')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValidWithErrorMessage("\r\n\t", 'xdigit')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'xdigit')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'xdigit')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'xdigit')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'xdigit')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'xdigit')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'xdigit')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'xdigit')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'xdigit')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'xdigit')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'xdigit')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'xdigit')).toBe(toBe);
        });
    });
});