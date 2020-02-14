'use strict';

const sogv = require('../../build/output/sog-validator');

describe('choice', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'choice:{"choices":[]}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'choice:{"choices":[]}')).toBe(toBe);
        });

        test('Liam,Noah,William,James [multiple:true,min:3,choices]', () => {
            expect(sogv.isValidWithErrorMessage(["Liam", "Noah", "William", "James"], {
                'choice': {
                    "choices": [
                        "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                        "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                        "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                        "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                    ],
                    "multiple": true,
                    "min": 3
                }
            })).toBe(toBe);
        });

        test('Liam,Noah,William,James [multiple:true,max:4,choices]', () => {
            expect(sogv.isValidWithErrorMessage(["Liam", "Noah", "William", "James"], {
                'choice': {
                    "choices": [
                        "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                        "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                        "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                        "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                    ],
                    "multiple": true,
                    "max": 4
                }
            })).toBe(toBe);
        });

        test('Liam [choices]', () => {
            expect(sogv.isValidWithErrorMessage("Liam", {
                'choice': {
                    "choices": [
                        "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                        "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                        "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                        "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                    ]
                }
            })).toBe(toBe);
        });

        test('Liam,Noah,William,James [multiple:true,min:3,callback]', () => {
            expect(sogv.isValidWithErrorMessage(["Liam", "Noah", "William", "James"], {
                'choice': {
                    "callback": function () {
                        return [
                            "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                            "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                            "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                            "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                        ];
                    },
                    "multiple": true,
                    "min": 3
                }
            })).toBe(toBe);
        });

        test('Liam,Noah,William,James [multiple:true,max:4,callback]', () => {
            expect(sogv.isValidWithErrorMessage(["Liam", "Noah", "William", "James"], {
                'choice': {
                    "callback": function () {
                        return [
                            "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                            "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                            "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                            "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                        ];
                    },
                    "multiple": true,
                    "max": 4
                }
            })).toBe(toBe);
        });

        test('Liam [callback]', () => {
            expect(sogv.isValidWithErrorMessage("Liam", {
                'choice': {
                    "callback": function () {
                        return [
                            "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                            "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                            "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                            "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                        ];
                    }
                }
            })).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {

        test('Bob [choices]', () => {
            expect(sogv.isValidWithErrorMessage("Bob", {
                'choice': {
                    "choices": [
                        "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                        "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                        "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                        "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                    ]
                }
            })).toBe("The value you selected is not a valid choice.");
        });

        test('Liam,Noah,William,James [multiple:true,max:3,choices]', () => {
            expect(sogv.isValidWithErrorMessage(["Liam", "Noah", "William", "James"], {
                'choice': {
                    "choices": [
                        "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                        "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                        "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                        "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                    ],
                    "multiple": true,
                    "max": 3
                }
            })).toBe("You must select at most 3 choices.");
        });

        test('Liam,Noah,William,James [multiple:true,min:5,choices]', () => {
            expect(sogv.isValidWithErrorMessage(["Liam", "Noah", "William", "James"], {
                'choice': {
                    "choices": [
                        "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                        "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                        "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                        "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                    ],
                    "multiple": true,
                    "min": 5
                }
            })).toBe("You must select at least 5 choices.");
        });

        test('Liam [choices]', () => {
            expect(sogv.isValidWithErrorMessage('Liam', {
                'choice': {
                    "choices": [
                        "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                        "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                        "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                        "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                    ],
                    "multiple": true
                }
            })).toBe("Expected argument of type 'Array', 'String' given");
        });

        test('Bob [callback]', () => {
            expect(sogv.isValidWithErrorMessage("Bob", {
                'choice': {
                    "callback": function () {
                        return [
                            "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                            "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                            "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                            "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                        ];
                    }
                }
            })).toBe("The value you selected is not a valid choice.");
        });

        test('Liam,Noah,William,James [multiple:true,max:3,callback]', () => {
            expect(sogv.isValidWithErrorMessage(["Liam", "Noah", "William", "James"], {
                'choice': {
                    "callback": function () {
                        return [
                            "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                            "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                            "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                            "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                        ];
                    },
                    "multiple": true,
                    "max": 3
                }
            })).toBe("You must select at most 3 choices.");
        });

        test('Liam,Noah,William,James [multiple:true,min:5,callback]', () => {
            expect(sogv.isValidWithErrorMessage(["Liam", "Noah", "William", "James"], {
                'choice': {
                    "callback": function () {
                        return [
                            "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                            "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                            "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                            "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                        ];
                    },
                    "multiple": true,
                    "min": 5
                }
            })).toBe("You must select at least 5 choices.");
        });

        test('Liam [callback]', () => {
            expect(sogv.isValidWithErrorMessage('Liam', {
                'choice': {
                    "callback": function () {
                        return [
                            "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                            "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                            "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                            "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                        ];
                    },
                    "multiple": true
                }
            })).toBe("Expected argument of type 'Array', 'String' given");
        });

        test('Liam [callback]', () => {
            expect(sogv.isValidWithErrorMessage('Liam', {
                'choice': {
                    "callback": function () {
                        return [
                            "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
                            "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
                            "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
                            "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
                        ];
                    },
                    "multiple": true
                }
            })).toBe("Expected argument of type 'Array', 'String' given");
        });

        test('0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'choice:{"choices":[]}')).toBe("The value you selected is not a valid choice.");
        });

        test('Empty Object', () => {
            expect(sogv.isValidWithErrorMessage({}, 'choice:{"choices":[]}')).toBe("The value you selected is not a valid choice.");
        });

        test('Empty Array', () => {
            expect(sogv.isValidWithErrorMessage([], 'choice:{"choices":[]}')).toBe("The value you selected is not a valid choice.");
        });
    });
});