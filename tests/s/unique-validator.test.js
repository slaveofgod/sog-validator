'use strict';

const sogv = require('../../build/output/sog-validator');

describe('unique', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'unique')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'unique')).toBe(toBe);
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'unique')).toBe(toBe);
        });

        test('[1,2,3,4,5,6,7]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5,6,7], 'unique')).toBe(toBe);
        });

        test('[1,2,3,4,"4",5,6,7]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,"4",5,6,7], 'unique')).toBe(toBe);
        });

        test('["a","b","c","d","e","f","g","h","i","j"]', () => {
            expect(sogv.isValidWithErrorMessage(["a","b","c","d","e","f","g","h","i","j"], 'unique')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('{a:1,b:2,c:3}', () => {
            expect(sogv.isValidWithErrorMessage({a:1,b:2,c:3}, 'unique')).toBe("This value should be of type iterable.");
        });

        test('["a","b","c","d","e","f","g","h","i","j","a"]', () => {
            expect(sogv.isValidWithErrorMessage(["a","b","c","d","e","f","g","h","i","j","a"], 'unique')).toBe("This collection should contain only unique elements.");
        });

        test('[1,2,3,4,"4","4",5,6,7]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,"4","4",5,6,7], 'unique')).toBe("This collection should contain only unique elements.");
        });

        test('[1,2,3,4,4,5,6,7]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,4,5,6,7], 'unique')).toBe("This collection should contain only unique elements.");
        });

        test('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'unique')).toBe("This collection should contain only unique elements.");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'unique')).toBe("This value should be of type iterable.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'unique')).toBe("This value should be of type iterable.");
        });
    });
});