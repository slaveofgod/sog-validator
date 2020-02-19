'use strict';

const sogv = require('../../build/output/sog-validator');

describe('uuid', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'uuid')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'uuid')).toBe(toBe);
        });

        test('String "216f-ff40-98d9-11e3-a5e2-0800-200c-9a66" [strict: false]', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'uuid:{"strict": false}')).toBe(toBe);
        });

        test('String "{216fff40-98d9-11e3-a5e2-0800200c9a66}" [strict: false]', () => {
            expect(sogv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'uuid:{"strict": false}')).toBe(toBe);
        });

        test('String "216fff4098d911e3a5e20800200c9a66" [strict: false]', () => {
            expect(sogv.isValidWithErrorMessage('216fff4098d911e3a5e20800200c9a66', 'uuid:{"strict": false}')).toBe(toBe);
        });

        test('String "216f-ff40-98d9-11e3-a5e2-0800-200c-9a66" [strict: false]', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'uuid:{"strict": false}')).toBe(toBe);
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(sogv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'uuid')).toBe(toBe);
        });

        test('String " 216fff40-98d9-11e3-a5e2-0800200c9a66 " ["normalize": true]', () => {
            expect(sogv.isValidWithErrorMessage(' 216fff40-98d9-11e3-a5e2-0800200c9a66 ', 'uuid:{"normalize": true}')).toBe(toBe);
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66" ["versions": [1,4,5]]', () => {
            expect(sogv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'uuid:{"versions": [1,4,5]}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66" ["versions": [4,5]]', () => {
            expect(sogv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'uuid:{"versions": [4,5]}')).toBe("This is not a valid UUID.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'uuid')).toBe("This is not a valid UUID.");
        });

        test('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'uuid')).toBe("This is not a valid UUID.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(sogv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'uuid')).toBe("This is not a valid UUID.");
        });

        test('https://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'uuid')).toBe("This is not a valid UUID.");
        });

        test('String', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'uuid')).toBe("This is not a valid UUID.");
        });

        test('Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'uuid')).toBe("This value should be of type scalar.");
        });

        test('Function', () => {
            expect(sogv.isValidWithErrorMessage(function () {}, 'uuid')).toBe("This value should be of type scalar.");
        });

        test('Boolean', () => {
            expect(sogv.isValidWithErrorMessage(false, 'uuid')).toBe("This is not a valid UUID.");
        });
    });
});