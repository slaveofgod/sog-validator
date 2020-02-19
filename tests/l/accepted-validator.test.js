'use strict';

const sogv = require('../../build/output/sog-validator');

describe('accepted', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'accepted')).toBe(toBe);
        });

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'accepted')).toBe(toBe);
        });

        test('1', () => {
            expect(sogv.isValidWithErrorMessage(1, 'accepted')).toBe(toBe);
        });

        test('"1"', () => {
            expect(sogv.isValidWithErrorMessage('1', 'accepted')).toBe(toBe);
        });

        test('true', () => {
            expect(sogv.isValidWithErrorMessage(true, 'accepted')).toBe(toBe);
        });

        test('"true"', () => {
            expect(sogv.isValidWithErrorMessage('true', 'accepted')).toBe(toBe);
        });

        test('"yes"', () => {
            expect(sogv.isValidWithErrorMessage('yes', 'accepted')).toBe(toBe);
        });

        test('"on"', () => {
            expect(sogv.isValidWithErrorMessage('on', 'accepted')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {

        test('Available', () => {
            expect(sogv.isValidWithErrorMessage('Available', 'accepted')).toBe("The field must be accepted.");
        });
    });
});