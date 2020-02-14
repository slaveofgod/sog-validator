'use strict';

const sogv = require('../../build/output/sog-validator');

describe('true', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('True', () => {
            expect(sogv.isValidWithErrorMessage(true, 'true')).toBe(toBe);
        });

        test('1', () => {
            expect(sogv.isValidWithErrorMessage(1, 'true')).toBe(toBe);
        });

        test('"1"', () => {
            expect(sogv.isValidWithErrorMessage("1", 'true')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be true.";

        test('Empty String', () => {
            expect(sogv.isValidWithErrorMessage('', 'true')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'true')).toBe(toBe);
        });

        test('Boolean', () => {
            expect(sogv.isValidWithErrorMessage(false, 'true')).toBe(toBe);
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'true')).toBe(toBe);
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'true')).toBe(toBe);
        });
    });
});