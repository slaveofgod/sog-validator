'use strict';

const sogv = require('../../build/output/sog-validator');

describe('punct', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'punct')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(sogv.isValidWithErrorMessage('*&$()', 'punct')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be punct.";

        test('String "loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('loremipsum', 'punct')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(sogv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'punct')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'punct')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'punct')).toBe(toBe);
        });

        test('20', () => {
            expect(sogv.isValidWithErrorMessage(20, 'punct')).toBe(toBe);
        });

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'punct')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'punct')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(sogv.isValidWithErrorMessage("\r fsd \tf \n", 'punct')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'punct')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'punct')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'punct')).toBe(toBe);
        });
    });
});