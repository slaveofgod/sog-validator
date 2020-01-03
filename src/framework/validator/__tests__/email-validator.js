'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('email', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('a@a.com', () => {
            expect(abv.isValidWithErrorMessage('a@a.com', 'email;mode:loose')).toBe(toBe);
        });

        test('alexey.bob@gmail.com', () => {
            expect(abv.isValidWithErrorMessage('alexey.bob@gmail.com', 'email;mode:html5')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value is not a valid email address.";

        test('a@a-com', () => {
            expect(abv.isValidWithErrorMessage('a@a-com', 'email;mode:loose')).toBe(toBe);
        });

        test('abcdefg', () => {
            expect(abv.isValidWithErrorMessage('abcdefg', 'email;mode:html5')).toBe(toBe);
        });

        test('String "GTEFFGGS"', () => {
            expect(abv.isValidWithErrorMessage("GTEFFGGS", 'email')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValidWithErrorMessage("\r\n\t", 'email')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'email')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'email')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'email')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'email')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'email')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'email')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'email')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'email')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'email')).toBe("This value should be of type scalar.");
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'email')).toBe("This value should be of type scalar.");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'email')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'email')).toBe("This value should be of type scalar.");
        });
    });
});