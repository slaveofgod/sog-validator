'use strict';

const sogv = require('../../build/output/sog-validator');

describe('print', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'print')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('loremipsum', 'print')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(sogv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'print')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'print')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'print')).toBe(toBe);
        });

        test('String "20"', () => {
            expect(sogv.isValidWithErrorMessage("20", 'print')).toBe(toBe);
        });

        test('String "10.25"', () => {
            expect(sogv.isValidWithErrorMessage("10.25", 'print')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'print')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be print.";

        test('20', () => {
            expect(sogv.isValidWithErrorMessage(20, 'print')).toBe(toBe);
        });

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'print')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(sogv.isValidWithErrorMessage("\r fsd \tf \n", 'print')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'print')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'print')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'print')).toBe(toBe);
        });
    });
});