'use strict';

const abv = require('../../build/output/sog-validator');

describe('regex', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', {"regex": {
                pattern: /^.+\@\S+\.\S+$/
            }})).toBe(toBe);
        });

        test('test.email@gmail.com', () => {
            expect(abv.isValidWithErrorMessage('test.email@gmail.com', {"regex": {
                pattern: /^.+\@\S+\.\S+$/
            }})).toBe(toBe);
        });

        test('test.email@gmail.com', () => {
            expect(abv.isValidWithErrorMessage('test.email@gmail.com', {"regex": {
                pattern: /^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
            }})).toBe(toBe);
        });

        test('" test.email@gmail.com " [normalize: true]', () => {
            expect(abv.isValidWithErrorMessage(' test.email@gmail.com ', {"regex": {
                pattern: /^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
                normalize: true
            }})).toBe(toBe);
        });

        test('" test.email@gmail.com " [match: false]', () => {
            expect(abv.isValidWithErrorMessage(' test.email@gmail.com ', {"regex": {
                pattern: /^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
                match: false
            }})).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be blank.";

        test('test.email@gmai l.com', () => {
            expect(abv.isValidWithErrorMessage('test.email@gmai l.com', {"regex": {
                pattern: /^.+\@\S+\.\S+$/
            }})).toBe("This value is not valid.");
        });

        test('Wrong regular expression', () => {
            expect(abv.isValidWithErrorMessage('test.email@gmail.com', {"regex": {
                pattern: "'^www.google.com{1}|(?<=\\s)www.google.com{1}(?=\\s)|www.google.com{1}$'"
            }})).toBe("This value is not valid.");
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, {"regex": {
                pattern: /^.+\@\S+\.\S+$/
            }})).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], {"regex": {
                pattern: /^.+\@\S+\.\S+$/
            }})).toBe("This value should be of type scalar.");
        });

        test('Empty Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, {"regex": {
                pattern: /^.+\@\S+\.\S+$/
            }})).toBe("This value should be of type scalar.");
        });
    });
});