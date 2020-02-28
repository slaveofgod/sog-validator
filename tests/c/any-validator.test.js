'use strict';

const sogv = require('../../build/output/sog-validator');

describe('any', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'any:string;alnum')).toBe(toBe);
        });

        test('Lipsum generator: Lorem Ipsum - All the facts', () => {
            expect(sogv.isValidWithErrorMessage('Lipsum generator: Lorem Ipsum - All the facts', 'any:string;integer')).toBe(toBe);
        });

        test('1234567890', () => {
            expect(sogv.isValidWithErrorMessage(1234567890, 'any:string;integer')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'any:string;integer')).toBe('This value should be valid at least for one rule.');
        });
    });
});