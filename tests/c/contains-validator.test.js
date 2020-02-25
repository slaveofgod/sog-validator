'use strict';

const sogv = require('../../build/output/sog-validator');

describe('contains', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'contains:{"value":"abc"}')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com [value: "@"]', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'contains:{"value":"@"}')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com [value: "eslaveo"]', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'contains:{"value":"eslaveo"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('iamtheslaveofgod@gmail.com [value: "alex"]', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'contains:{"value":"alex"}')).toBe('This value should contains the given substring.');
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'contains:{"value":"@"}')).toBe("This value should be of type scalar.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'contains:{"value":"@"}')).toBe("This value should be of type scalar.");
        });

        test('Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'contains:{"value":"@"}')).toBe("This value should be of type scalar.");
        });
    });
});