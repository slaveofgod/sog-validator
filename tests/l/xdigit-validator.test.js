'use strict';

const sogv = require('../../build/output/sog-validator');

describe('xdigit', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'xdigit')).toBe(toBe);
        });

        test('String "20"', () => {
            expect(sogv.isValidWithErrorMessage("20", 'xdigit')).toBe(toBe);
        });

        test('String "AB2569"', () => {
            expect(sogv.isValidWithErrorMessage("AB2569", 'xdigit')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be xdigit.";

        test('20', () => {
            expect(sogv.isValidWithErrorMessage(20, 'xdigit')).toBe(toBe);
        });

        test('String "GTEFFGGS"', () => {
            expect(sogv.isValidWithErrorMessage("GTEFFGGS", 'xdigit')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(sogv.isValidWithErrorMessage("\r\n\t", 'xdigit')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(sogv.isValidWithErrorMessage('*&$()', 'xdigit')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('loremipsum', 'xdigit')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(sogv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'xdigit')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(sogv.isValidWithErrorMessage('Loremipsum', 'xdigit')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(sogv.isValidWithErrorMessage('AbF26Fg69H', 'xdigit')).toBe(toBe);
        });

        test('10.25', () => {
            expect(sogv.isValidWithErrorMessage(10.25, 'xdigit')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'xdigit')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(sogv.isValidWithErrorMessage("\r fsd \tf \n", 'xdigit')).toBe(toBe);
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'xdigit')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'xdigit')).toBe(toBe);
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'xdigit')).toBe(toBe);
        });
    });
});