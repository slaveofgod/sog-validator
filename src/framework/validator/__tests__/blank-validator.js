'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('blank', () => {
    describe('Is Valid', () => {
        let toBe = true;

        test('Empty Line', () => {
            expect(abv.isValid('', 'blank')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValid(null, 'blank')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = false;

        test('0', () => {
            expect(abv.isValid(0, 'blank')).toBe(toBe);
        });

        test('Not Empty String', () => {
            expect(abv.isValid('lorem ipsum', 'blank')).toBe(toBe);
        });

        test('Empty Object', () => {
            expect(abv.isValid({}, 'blank')).toBe(toBe);
        });

        test('Empty Array', () => {
            expect(abv.isValid([], 'blank')).toBe(toBe);
        });
    });
});