'use strict';

const abv = require('../../build/output/sog-validator');

describe('callable', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'callable')).toBe(toBe);
        });

        test('abv.isValidWithErrorMessage', () => {
            expect(abv.isValidWithErrorMessage(abv.isValidWithErrorMessage, 'callable')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be callable.";

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'callable')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'callable')).toBe(toBe);
        });
    });
});