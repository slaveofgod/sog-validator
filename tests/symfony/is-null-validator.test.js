'use strict';

const sogv = require('../../build/output/sog-validator');

describe('null', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'null')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be null.";

        test('Empty String', () => {
            expect(sogv.isValidWithErrorMessage('', 'null')).toBe(toBe);
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'null')).toBe(toBe);
        });

        test('Boolean', () => {
            expect(sogv.isValidWithErrorMessage(false, 'null')).toBe(toBe);
        });
    });
});