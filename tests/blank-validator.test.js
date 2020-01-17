'use strict';

const abv = require('../build/output/bob-validator');

describe('blank', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty Line', () => {
            expect(abv.isValidWithErrorMessage('', 'blank')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'blank')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be blank.";

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'blank')).toBe(toBe);
        });

        test('Not Empty String', () => {
            expect(abv.isValidWithErrorMessage('lorem ipsum', 'blank')).toBe(toBe);
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'blank')).toBe(toBe);
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'blank')).toBe(toBe);
        });
    });
});