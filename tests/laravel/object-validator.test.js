'use strict';

const abv = require('../../build/output/sog-validator');

describe('object', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'object')).toBe(toBe);
        });

        test('abv', () => {
            expect(abv.isValidWithErrorMessage(abv, 'object')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'object')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be object.";

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'object')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'object')).toBe(toBe);
        });

        test('25.69', () => {
            expect(abv.isValidWithErrorMessage(25.69, 'object')).toBe(toBe);
        });

        test('85', () => {
            expect(abv.isValidWithErrorMessage(85, 'object')).toBe(toBe);
        });
    });
});