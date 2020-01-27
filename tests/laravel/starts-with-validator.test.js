'use strict';

const abv = require('../../build/output/sog-validator');

describe('starts_with', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'starts_with:{"starts":"abc"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'starts_with:{"starts":"abc"}')).toBe(toBe);
        });

        test('a@a.com', () => {
            expect(abv.isValidWithErrorMessage('a@a.com', 'starts_with:{"starts":"a@a"}')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com', () => {
            expect(abv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'starts_with:{"starts":["com","alexey","iam"]}')).toBe(toBe);
        });

        test('1234567895664', () => {
            expect(abv.isValidWithErrorMessage('1234567895664', 'starts_with:{"starts":["com","alexey","1234"]}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1234567895664', () => {
            expect(abv.isValidWithErrorMessage('1234567895664', 'starts_with:{"starts":["com","alexey","12348"]}')).toBe('The value must start with one of the following: [\"com\",\"alexey\",\"12348\"].');
        });

        test('a@a-com', () => {
            expect(abv.isValidWithErrorMessage('a@a-com', 'starts-with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('abcdefg', () => {
            expect(abv.isValidWithErrorMessage('abcdefg', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "GTEFFGGS"', () => {
            expect(abv.isValidWithErrorMessage("GTEFFGGS", 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValidWithErrorMessage("\r\n\t", 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'starts_with:{"starts":"abs"}')).toBe("This value should be of type scalar.");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'starts_with:{"starts":"abs"}')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'starts_with:{"starts":"abs"}')).toBe("This value should be of type scalar.");
        });
    });
});