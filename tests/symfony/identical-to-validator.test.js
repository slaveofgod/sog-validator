'use strict';

const sogv = require('../../build/output/sog-validator');

describe('identical-to', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'identical-to:{"value":"a@a.com"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'identical-to:{"value":"a@a.com"}')).toBe(toBe);
        });

        test('"a@a.com" === "a@a.com"', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'identical-to:{"value":"a@a.com"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 === new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "identical-to": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('new Object() === new Object()', () => {
            expect(sogv.isValidWithErrorMessage(new Object(), {
                "identical-to": {
                    "value": new Object()
                }
            })).toBe(toBe);
        });

        test('{} === new Object()', () => {
            expect(sogv.isValidWithErrorMessage({}, {
                "identical-to": {
                    "value": new Object()
                }
            })).toBe(toBe);
        });

        test('{"name": "Alex", "email": "alex@fmail.com"} === new Object("name": "Alex", "email": "alex@fmail.com")', () => {
            expect(sogv.isValidWithErrorMessage({"name": "Alex", "email": "alex@fmail.com"}, {
                "identical-to": {
                    "value": new Object({"name": "Alex", "email": "alex@fmail.com"})
                }
            })).toBe(toBe);
        });

        test('[1,2,3,4,5] === new Array(1,2,3,4,5)', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5], {
                "identical-to": {
                    "value": new Array(1,2,3,4,5)
                }
            })).toBe(toBe);
        });

        test('new sogv.Application({"lang": "en"}) === new sogv.Application({"lang": "en"})', () => {
            expect(sogv.isValidWithErrorMessage(new sogv.Application({"lang": "en"}), {
                "identical-to": {
                    "value": new sogv.Application({"lang": "en"})
                }
            })).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('12345 === "12345"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'identical-to:{"value":"12345"}')).toBe("This value should be identical to String 12345.");
        });

        test('1 === true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'identical-to:{"value":true}')).toBe("This value should be identical to Boolean true.");
        });

        test('0 === false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'identical-to:{"value":false}')).toBe("This value should be identical to Boolean false.");
        });

        test('new sogv.Application({"lang": "en"}) === new sogv.Application({"lang": "de"})', () => {
            expect(sogv.isValidWithErrorMessage(new sogv.Application({"lang": "en"}), {
                "identical-to": {
                    "value": new sogv.Application({"lang": "de"})
                }
            })).toBe('This value should be identical to Application {\"lang\":\"de\",\"internal\":false,\"name\":\"Application\"}.');
        });

        test('Lorem ipsum === new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', {
                "identical-to": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be identical to Date December 17, 1995 3:24 AM.");
        });

        test('[1,2,3,4,5] === new Array(1,2,3,4,5,6)', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5], {
                "identical-to": {
                    "value": new Array(1,2,3,4,5,6)
                }
            })).toBe("This value should be identical to Array [1,2,3,4,5,6].");
        });

        test('{"name": "Vasy", "email": "vasy@fmail.com"} === new Object("name": "Alex", "email": "alex@fmail.com")', () => {
            expect(sogv.isValidWithErrorMessage({"name": "Vasy", "email": "vasy@fmail.com"}, {
                "identical-to": {
                    "value": new Object({"name": "Alex", "email": "alex@fmail.com"})
                }
            })).toBe('This value should be identical to Object {\"name\":\"Alex\",\"email\":\"alex@fmail.com\"}.');
        });

        test('1995-12-17T03:24:00 === new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "identical-to": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("This value should be identical to Date December 17, 1995 3:21 AM.");
        });

        test('new Date("1995-12-17T03:21:00") === new Object()', () => {
            expect(sogv.isValidWithErrorMessage(new Date("1995-12-17T03:21:00"), {
                "identical-to": {
                    "value": new Object()
                }
            })).toBe("This value should be identical to Object {}.");
        });

        test('"true" === true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'identical-to:{"value":true}')).toBe("This value should be identical to Boolean true.");
        });
    });
});