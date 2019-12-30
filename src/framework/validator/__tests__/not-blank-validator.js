'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('not-blank', () => {
    describe('Is Valid', () => {
        let toBe = true;

        test('String with spaces only', () => {
            expect(abv.isValid('   ', 'not-blank')).toBe(toBe);
        });

        test('Null [allowNull:true]', () => {
            expect(abv.isValid(null, 'not-blank;allowNull:true')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = false;

        test('Undefined', () => {
            expect(abv.isValid(undefined, 'not-blank')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValid(null, 'not-blank')).toBe(toBe);
        });

        test('False', () => {
            expect(abv.isValid(false, 'not-blank')).toBe(toBe);
        });

        test('Empty string', () => {
            expect(abv.isValid('', 'not-blank')).toBe(toBe);
        });

        test('Empty array', () => {
            expect(abv.isValid([], 'not-blank')).toBe(toBe);
        });

        test('String with spaces only [normalize:true]', () => {
            expect(abv.isValid('   ', 'not-blank;normalize:true')).toBe(toBe);
        });
    });
});