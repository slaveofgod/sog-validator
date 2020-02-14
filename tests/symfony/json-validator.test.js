'use strict';

const sogv = require('../../build/output/sog-validator');

describe('json', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'json')).toBe(toBe);
        });

        test('{"first_name": "Alexey", "last_name": "Ivalov", "age": 25}', () => {
            expect(sogv.isValidWithErrorMessage('{"first_name": "Alexey", "last_name": "Ivalov", "age": 25}', 'json')).toBe(toBe);
        });

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'email:{"mode":"html5"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'json')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be valid JSON.";

        test('a@a.com', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'json')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'json')).toBe(toBe);
        });

        test('a@a-com', () => {
            expect(sogv.isValidWithErrorMessage('a@a-com', 'json')).toBe(toBe);
        });

        test('abcdefg', () => {
            expect(sogv.isValidWithErrorMessage('abcdefg', 'json')).toBe(toBe);
        });

        test('String "GTEFFGGS"', () => {
            expect(sogv.isValidWithErrorMessage("GTEFFGGS", 'json')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(sogv.isValidWithErrorMessage("\r\n\t", 'json')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(sogv.isValidWithErrorMessage('*&$()', 'json')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('loremipsum', 'json')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(sogv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'json')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'json')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'json')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'json')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(sogv.isValidWithErrorMessage("\r fsd \tf \n", 'json')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'json')).toBe("This value should be of type scalar.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'json')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'json')).toBe("This value should be of type scalar.");
        });
    });
});