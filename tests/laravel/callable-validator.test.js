'use strict';

const sogv = require('../../build/output/sog-validator');

describe('callable', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'callable')).toBe(toBe);
        });

        test('sogv.isValidWithErrorMessage', () => {
            expect(sogv.isValidWithErrorMessage(sogv.isValidWithErrorMessage, 'callable')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "The value field must be callable.";

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'callable')).toBe(toBe);
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'callable')).toBe(toBe);
        });
    });
});