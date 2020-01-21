'use strict';

const abv = require('../../build/output/bob-validator');

describe('count', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'count:{"min":1}')).toBe(toBe);
        });

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'count:{"min":1}')).toBe(toBe);
        });

        test('Lorem ipsum', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'count:{"min":1}')).toBe(toBe);
        });

        test('[1,2,3,4,5] ["min":5,"max":10]', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5], 'count:{"min":5,"max":10}')).toBe(toBe);
        });

        test('[1,2,3,4,5,6] ["min":5,"max":10]', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5,6], 'count:{"min":5,"max":10}')).toBe(toBe);
        });

        test('[1,2,3,4,5,6,7,8,9] ["min":5,"max":10]', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9], 'count:{"min":5,"max":10}')).toBe(toBe);
        });

        test('[1,2,3,4,5,6,7,8,9,10] ["min":5,"max":10]', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9,10], 'count:{"min":5,"max":10}')).toBe(toBe);
        });

        test('[1,2,3,4,5] ["min":5,"max":5]', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5], 'count:{"min":5,"max":5}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('[1,2,3,4] ["min":5,"max":5]', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4], 'count:{"min":5,"max":5}')).toBe("This collection should contain exactly 5 elements.");
        });

        test('abcdef ["min":7,"max":10]', () => {
            expect(abv.isValidWithErrorMessage('abcdef', 'count:{"min":7,"max":10}')).toBe("This collection should contain 7 elements or less.");
        });

        test('1234567890 ["min":5,"max":10]', () => {
            expect(abv.isValidWithErrorMessage(1234567890, 'count:{"min":5,"max":10}')).toBe("This value should be of type iterable.");
        });

        test('[1,2,3,4] ["min":5,"max":10]', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4], 'count:{"min":5,"max":10}')).toBe("This collection should contain 5 elements or less.");
        });

        test('[1,2,3,4,5,6,7,8,9,10,11] ["min":5,"max":10]', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9,10,11], 'count:{"min":5,"max":10}')).toBe("This collection should contain 10 elements or less.");
        });

        test('[1,2,3,4,5,6] ["min":5,"max":5]', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5,6], 'count:{"min":5,"max":5}')).toBe("This collection should contain exactly 5 elements.");
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'count:{"min":1}')).toBe("This collection should contain 1 element or less.");
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'count:{"min":1}')).toBe("This value should be of type iterable.");
        });

        test('function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'count:{"min":1}')).toBe("This value should be of type iterable.");
        });
    });
});