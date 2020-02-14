'use strict';

const sogv = require('../../build/output/sog-validator');

describe('blank', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty Line', () => {
            expect(sogv.isValidWithErrorMessage('', 'blank')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'blank')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be blank.";

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'blank')).toBe(toBe);
        });

        test('Not Empty String', () => {
            expect(sogv.isValidWithErrorMessage('lorem ipsum', 'blank')).toBe(toBe);
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'blank')).toBe(toBe);
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'blank')).toBe(toBe);
        });
    });
});