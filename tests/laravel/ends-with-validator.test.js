'use strict';

const abv = require('../../build/output/sog-validator');

describe('ends_with', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'ends_with:{"ends":"abc"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'ends_with:{"ends":"abc"}')).toBe(toBe);
        });

        test('a@a.com', () => {
            expect(abv.isValidWithErrorMessage('a@a.com', 'ends_with:{"ends":"com"}')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com', () => {
            expect(abv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'ends_with:{"ends":["com","eu"]}')).toBe(toBe);
        });

        test('132453465465498', () => {
            expect(abv.isValidWithErrorMessage(132453465465498, 'ends_with:{"ends":["com","eu","5498"]}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('132453465465498', () => {
            expect(abv.isValidWithErrorMessage(132453465465498, 'ends_with:{"ends":["com","eu","6498"]}')).toBe('The value must end with one of the following: [\"com\",\"eu\",\"6498\"].');
        });

        test('a@a-com', () => {
            expect(abv.isValidWithErrorMessage('a@a-com', 'ends-with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('abcdefg', () => {
            expect(abv.isValidWithErrorMessage('abcdefg', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "GTEFFGGS"', () => {
            expect(abv.isValidWithErrorMessage("GTEFFGGS", 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValidWithErrorMessage("\r\n\t", 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'ends_with:{"ends":"abs"}')).toBe("This value should be of type scalar.");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'ends_with:{"ends":"abs"}')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'ends_with:{"ends":"abs"}')).toBe("This value should be of type scalar.");
        });
    });
});