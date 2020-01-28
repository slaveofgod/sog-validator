'use strict';

const abv = require('../../build/output/sog-validator');

describe('graph', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'graph')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'graph')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'graph')).toBe(toBe);
        });

        test('String "20"', () => {
            expect(abv.isValidWithErrorMessage("20", 'graph')).toBe(toBe);
        });

        test('String "10.25"', () => {
            expect(abv.isValidWithErrorMessage("10.25", 'graph')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be graph.";

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'graph')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'graph')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'graph')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'graph')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'graph')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'graph')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'graph')).toBe(toBe);
        });
    });
});