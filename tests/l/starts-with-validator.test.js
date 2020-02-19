'use strict';

const sogv = require('../../build/output/sog-validator');

describe('starts_with', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'starts_with:{"starts":"abc"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'starts_with:{"starts":"abc"}')).toBe(toBe);
        });

        test('a@a.com', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'starts_with:{"starts":"a@a"}')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'starts_with:{"starts":["com","alexey","iam"]}')).toBe(toBe);
        });

        test('1234567895664', () => {
            expect(sogv.isValidWithErrorMessage('1234567895664', 'starts_with:{"starts":["com","alexey","1234"]}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('1234567895664', () => {
            expect(sogv.isValidWithErrorMessage('1234567895664', 'starts_with:{"starts":["com","alexey","12348"]}')).toBe('The value must start with one of the following: [\"com\",\"alexey\",\"12348\"].');
        });

        test('a@a-com', () => {
            expect(sogv.isValidWithErrorMessage('a@a-com', 'starts-with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('abcdefg', () => {
            expect(sogv.isValidWithErrorMessage('abcdefg', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "GTEFFGGS"', () => {
            expect(sogv.isValidWithErrorMessage("GTEFFGGS", 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "\\r\\n\\t"', () => {
            expect(sogv.isValidWithErrorMessage("\r\n\t", 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "*&$()"', () => {
            expect(sogv.isValidWithErrorMessage('*&$()', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('loremipsum', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(sogv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "Loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('String with unprintable character(s)', () => {
            expect(sogv.isValidWithErrorMessage("\r fsd \tf \n", 'starts_with:{"starts":"abs"}')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'starts_with:{"starts":"abs"}')).toBe("This value should be of type scalar.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'starts_with:{"starts":"abs"}')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'starts_with:{"starts":"abs"}')).toBe("This value should be of type scalar.");
        });
    });
});