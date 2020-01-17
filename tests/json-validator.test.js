'use strict';

const abv = require('../build/output/bob-validator');

describe('json', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'json')).toBe(toBe);
        });

        test('{"first_name": "Alexey", "last_name": "Ivalov", "age": 25}', () => {
            expect(abv.isValidWithErrorMessage('{"first_name": "Alexey", "last_name": "Ivalov", "age": 25}', 'json')).toBe(toBe);
        });

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'email:{"mode":"html5"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'json')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be valid JSON.";

        test('a@a.com', () => {
            expect(abv.isValidWithErrorMessage('a@a.com', 'json')).toBe(toBe);
        });

        test('alexey.bob@gmail.com', () => {
            expect(abv.isValidWithErrorMessage('alexey.bob@gmail.com', 'json')).toBe(toBe);
        });

        test('a@a-com', () => {
            expect(abv.isValidWithErrorMessage('a@a-com', 'json')).toBe(toBe);
        });

        test('abcdefg', () => {
            expect(abv.isValidWithErrorMessage('abcdefg', 'json')).toBe(toBe);
        });

        test('String "GTEFFGGS"', () => {
            expect(abv.isValidWithErrorMessage("GTEFFGGS", 'json')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValidWithErrorMessage("\r\n\t", 'json')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'json')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'json')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'json')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'json')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'json')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'json')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'json')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'json')).toBe("This value should be of type scalar.");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'json')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'json')).toBe("This value should be of type scalar.");
        });
    });
});