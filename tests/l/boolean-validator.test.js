'use strict';

const sogv = require('../../build/output/sog-validator');

describe('boolean', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('True', () => {
            expect(sogv.isValidWithErrorMessage(true, 'boolean')).toBe(toBe);
        });

        test('1', () => {
            expect(sogv.isValidWithErrorMessage(1, 'boolean')).toBe(toBe);
        });

        test('"1"', () => {
            expect(sogv.isValidWithErrorMessage('1', 'boolean')).toBe(toBe);
        });

        test('False', () => {
            expect(sogv.isValidWithErrorMessage(false, 'bool')).toBe(toBe);
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'bool')).toBe(toBe);
        });

        test('"0"', () => {
            expect(sogv.isValidWithErrorMessage('0', 'bool')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be true or false.";

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'boolean')).toBe(toBe);
        });
    });
});