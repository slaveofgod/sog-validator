'use strict';

const abv = require('../../build/output/sog-validator');

describe('in', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'in:{"choices":[]}')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'in:{"choices":[]}')).toBe(toBe);
        });

        test('Liam', () => {
            expect(abv.isValidWithErrorMessage('Liam', {'in': {'choices': [
                "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
            ]}})).toBe(toBe);
        });

        test('Michael', () => {
            expect(abv.isValidWithErrorMessage('Michael', {'in': {'choices': [
                "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
            ]}})).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('Bob', () => {
            expect(abv.isValidWithErrorMessage('Bob', {'in': {'choices': [
                "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
            ]}})).toBe("The selected value is invalid.");
        });

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'in:{"choices":[]}')).toBe("The selected value is invalid.");
        });

        test('Empty Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'in:{"choices":[]}')).toBe("This value should be of type scalar.");
        });

        test('Empty Array', () => {
            expect(abv.isValidWithErrorMessage([], 'in:{"choices":[]}')).toBe("This value should be of type scalar.");
        });
    });
});