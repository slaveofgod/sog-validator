'use strict';

const sogv = require('../../build/output/sog-validator');

describe('email', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'email:{"mode":"html5"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'email')).toBe(toBe);
        });

        test('a@a.com', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'email:{"mode":"loose"}')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'email:{"mode":"html5"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value is not a valid email address.";

        test('a@a-com', () => {
            expect(sogv.isValidWithErrorMessage('a@a-com', 'email:{"mode":"loose"}')).toBe(toBe);
        });

        test('abcdefg', () => {
            expect(sogv.isValidWithErrorMessage('abcdefg', 'email:{"mode":"html5"}')).toBe(toBe);
        });

        test('String "GTEFFGGS"', () => {
            expect(sogv.isValidWithErrorMessage("GTEFFGGS", 'email')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(sogv.isValidWithErrorMessage("\r\n\t", 'email')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(sogv.isValidWithErrorMessage('*&$()', 'email')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('loremipsum', 'email')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(sogv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'email')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'email')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'email')).toBe(toBe);
        });

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'email')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'email')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(sogv.isValidWithErrorMessage("\r fsd \tf \n", 'email')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'email')).toBe("This value should be of type scalar.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'email')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'email')).toBe("This value should be of type scalar.");
        });
    });
});