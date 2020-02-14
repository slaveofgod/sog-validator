'use strict';

const sogv = require('../../build/output/sog-validator');

describe('not-blank', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('String with spaces only', () => {
            expect(sogv.isValidWithErrorMessage('   ', 'not-blank')).toBe(toBe);
        });

        test('Null [allowNull:true]', () => {
            expect(sogv.isValidWithErrorMessage(null, 'not-blank:{"allowNull":true}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should not be blank.";

        test('Undefined', () => {
            expect(sogv.isValidWithErrorMessage(undefined, 'not-blank')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'not-blank')).toBe(toBe);
        });

        test('False', () => {
            expect(sogv.isValidWithErrorMessage(false, 'not-blank')).toBe(toBe);
        });

        test('Empty string', () => {
            expect(sogv.isValidWithErrorMessage('', 'not-blank')).toBe(toBe);
        });

        test('Empty array', () => {
            expect(sogv.isValidWithErrorMessage([], 'not-blank')).toBe(toBe);
        });

        test('String with spaces only [normalize:true]', () => {
            expect(sogv.isValidWithErrorMessage('   ', 'not-blank:{"normalize":true}')).toBe(toBe);
        });
    });
});