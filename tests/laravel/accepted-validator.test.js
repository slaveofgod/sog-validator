'use strict';

const abv = require('../../build/output/sog-validator');

describe('accepted', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'accepted')).toBe(toBe);
        });

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'accepted')).toBe(toBe);
        });

        test('1', () => {
            expect(abv.isValidWithErrorMessage(1, 'accepted')).toBe(toBe);
        });

        test('"1"', () => {
            expect(abv.isValidWithErrorMessage('1', 'accepted')).toBe(toBe);
        });

        test('true', () => {
            expect(abv.isValidWithErrorMessage(true, 'accepted')).toBe(toBe);
        });

        test('"true"', () => {
            expect(abv.isValidWithErrorMessage('true', 'accepted')).toBe(toBe);
        });

        test('"yes"', () => {
            expect(abv.isValidWithErrorMessage('yes', 'accepted')).toBe(toBe);
        });

        test('"on"', () => {
            expect(abv.isValidWithErrorMessage('on', 'accepted')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {

        test('Available', () => {
            expect(abv.isValidWithErrorMessage('Available', 'accepted')).toBe("The field must be accepted.");
        });
    });
});