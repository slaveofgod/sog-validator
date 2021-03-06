'use strict';

const sogv = require('../../build/output/sog-validator');

describe('not_in', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'not_in:{"choices":[]}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'not_in:{"choices":[]}')).toBe(toBe);
        });

        test('Bob', () => {
            expect(sogv.isValidWithErrorMessage('Bob', {'not_in': {'choices': [
                "Liam", "Noah", "William", "James", "Logan", "Benjamnot_in", "Mason", "Elijah",
                "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
            ]}})).toBe(toBe);
        });

        test('Bob', () => {
            expect(sogv.isValidWithErrorMessage('Mark', {'not-in': {'choices': [
                "Liam", "Noah", "William", "James", "Logan", "Benjamnot_in", "Mason", "Elijah",
                "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
            ]}})).toBe(toBe);
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'not_in:{"choices":[]}')).toBe(toBe);
        });
    });

    describe('Is not_invalid', () => {
        test('Liam', () => {
            expect(sogv.isValidWithErrorMessage('Liam', {'not_in': {'choices': [
                "Liam", "Noah", "William", "James", "Logan", "Benjamnot_in", "Mason", "Elijah",
                "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
            ]}})).toBe("The selected value is invalid.");
        });

        test('Michael', () => {
            expect(sogv.isValidWithErrorMessage('Michael', {'not_in': {'choices': [
                "Liam", "Noah", "William", "James", "Logan", "Benjamnot_in", "Mason", "Elijah",
                "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
            ]}})).toBe("The selected value is invalid.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'not_in:{"choices":[]}')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'not_in:{"choices":[]}')).toBe("This value should be of type scalar.");
        });
    });
});