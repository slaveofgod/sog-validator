'use strict';

const sogv = require('../../build/output/sog-validator');

describe('object', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'object')).toBe(toBe);
        });

        test('sogv', () => {
            expect(sogv.isValidWithErrorMessage(sogv, 'object')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'object')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be object.";

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'object')).toBe(toBe);
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'object')).toBe(toBe);
        });

        test('25.69', () => {
            expect(sogv.isValidWithErrorMessage(25.69, 'object')).toBe(toBe);
        });

        test('85', () => {
            expect(sogv.isValidWithErrorMessage(85, 'object')).toBe(toBe);
        });
    });
});