'use strict';

const sogv = require('../../build/output/sog-validator');

describe('ends_with', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'ends_with:{"ends":"abc"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'ends_with:{"ends":"abc"}')).toBe(toBe);
        });

        test('a@a.com', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'ends_with:{"ends":"com"}')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'ends_with:{"ends":["com","eu"]}')).toBe(toBe);
        });

        test('132453465465498', () => {
            expect(sogv.isValidWithErrorMessage(132453465465498, 'ends_with:{"ends":["com","eu","5498"]}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('132453465465498', () => {
            expect(sogv.isValidWithErrorMessage(132453465465498, 'ends_with:{"ends":["com","eu","6498"]}')).toBe('The value must end with one of the following: [\"com\",\"eu\",\"6498\"].');
        });

        test('a@a-com', () => {
            expect(sogv.isValidWithErrorMessage('a@a-com', 'ends-with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('abcdefg', () => {
            expect(sogv.isValidWithErrorMessage('abcdefg', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "GTEFFGGS"', () => {
            expect(sogv.isValidWithErrorMessage("GTEFFGGS", 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "\\r\\n\\t"', () => {
            expect(sogv.isValidWithErrorMessage("\r\n\t", 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "*&$()"', () => {
            expect(sogv.isValidWithErrorMessage('*&$()', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('loremipsum', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(sogv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "Loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('String with unprintable character(s)', () => {
            expect(sogv.isValidWithErrorMessage("\r fsd \tf \n", 'ends_with:{"ends":"abs"}')).toBe('The value must end with one of the following: [\"abs\"].');
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'ends_with:{"ends":"abs"}')).toBe("This value should be of type scalar.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'ends_with:{"ends":"abs"}')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'ends_with:{"ends":"abs"}')).toBe("This value should be of type scalar.");
        });
    });
});