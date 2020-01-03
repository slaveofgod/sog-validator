'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('url', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('https://www.google.com/', () => {
            expect(abv.isValidWithErrorMessage('https://www.google.com/', 'url')).toBe(toBe);
        });

        test('http://www.google.com/', () => {
            expect(abv.isValidWithErrorMessage('http://www.google.com/', 'url')).toBe(toBe);
        });

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'url')).toBe(toBe);
        });
    });

    // describe('Is Invalid', () => {
    //     let toBe = "This value should not be blank.";
    //
    //     test('Undefined', () => {
    //         expect(abv.isValidWithErrorMessage(undefined, 'not-blank')).toBe(toBe);
    //     });
    //
    //     test('Null', () => {
    //         expect(abv.isValidWithErrorMessage(null, 'not-blank')).toBe(toBe);
    //     });
    //
    //     test('False', () => {
    //         expect(abv.isValidWithErrorMessage(false, 'not-blank')).toBe(toBe);
    //     });
    //
    //     test('Empty string', () => {
    //         expect(abv.isValidWithErrorMessage('', 'not-blank')).toBe(toBe);
    //     });
    //
    //     test('Empty array', () => {
    //         expect(abv.isValidWithErrorMessage([], 'not-blank')).toBe(toBe);
    //     });
    //
    //     test('String with spaces only [normalize:true]', () => {
    //         expect(abv.isValidWithErrorMessage('   ', 'not-blank;normalize:true')).toBe(toBe);
    //     });
    // });
});