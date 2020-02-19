'use strict';

const sogv = require('../../build/output/sog-validator');

describe('false', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('False', () => {
            expect(sogv.isValidWithErrorMessage(false, 'false')).toBe(toBe);
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'false')).toBe(toBe);
        });

        test('"0"', () => {
            expect(sogv.isValidWithErrorMessage("0", 'false')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be false.";

        test('Empty', () => {
            expect(sogv.isValidWithErrorMessage('', 'false')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'false')).toBe(toBe);
        });

        test('True', () => {
            expect(sogv.isValidWithErrorMessage(true, 'false')).toBe(toBe);
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'false')).toBe(toBe);
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'false')).toBe(toBe);
        });
    });
});