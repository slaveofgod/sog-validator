'use strict';

const sogv = require('../../build/output/sog-validator');

describe('not-identical-to', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'not-identical-to:{"value":"12345"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'not-identical-to:{"value":"12345"}')).toBe(toBe);
        });

        test('12345 !== "12345"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'not-identical-to:{"value":"12345"}')).toBe(toBe);
        });

        test('1 !== true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'not-identical-to:{"value":true}')).toBe(toBe);
        });

        test('0 !== false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'not-identical-to:{"value":false}')).toBe(toBe);
        });

        test('new sogv.Application({"lang": "en"}) !== new sogv.Application({"lang": "de"})', () => {
            expect(sogv.isValidWithErrorMessage(new sogv.Application({"lang": "en"}), {
                "not-identical-to": {
                    "value": new sogv.Application({"lang": "de"})
                }
            })).toBe(toBe);
        });

        test('Lorem ipsum !== new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', {
                "not-identical-to": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('[1,2,3,4,5] !== new Array(1,2,3,4,5,6)', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5], {
                "not-identical-to": {
                    "value": new Array(1,2,3,4,5,6)
                }
            })).toBe(toBe);
        });

        test('{"name": "Vasy", "email": "vasy@fmail.com"} !== new Object("name": "Alex", "email": "alex@fmail.com")', () => {
            expect(sogv.isValidWithErrorMessage({"name": "Vasy", "email": "vasy@fmail.com"}, {
                "not-identical-to": {
                    "value": new Object({"name": "Alex", "email": "alex@fmail.com"})
                }
            })).toBe(toBe);
        });

        test('1995-12-17T03:24:00 !== new Date("1995-12-17T03:21:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "not-identical-to": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe(toBe);
        });

        test('new Date("1995-12-17T03:21:00") !== new Object()', () => {
            expect(sogv.isValidWithErrorMessage(new Date("1995-12-17T03:21:00"), {
                "not-identical-to": {
                    "value": new Object()
                }
            })).toBe(toBe);
        });

        test('"true" !== true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'not-identical-to:{"value":true}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('"a@a.com" !== "a@a.com"', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'not-identical-to:{"value":"a@a.com"}')).toBe("This value should not be identical to String a@a.com.");
        });

        test('1995-12-17T03:24:00 !== new Date("1995-12-17T03:24:00")', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "not-identical-to": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should not be identical to Date December 17, 1995 3:24 AM.");
        });

        test('new Object() !== new Object()', () => {
            expect(sogv.isValidWithErrorMessage(new Object(), {
                "not-identical-to": {
                    "value": new Object()
                }
            })).toBe("This value should not be identical to Object {}.");
        });

        test('{} !== new Object()', () => {
            expect(sogv.isValidWithErrorMessage({}, {
                "not-identical-to": {
                    "value": new Object()
                }
            })).toBe("This value should not be identical to Object {}.");
        });

        test('{"name": "Alex", "email": "alex@fmail.com"} !== new Object("name": "Alex", "email": "alex@fmail.com")', () => {
            expect(sogv.isValidWithErrorMessage({"name": "Alex", "email": "alex@fmail.com"}, {
                "not-identical-to": {
                    "value": new Object({"name": "Alex", "email": "alex@fmail.com"})
                }
            })).toBe('This value should not be identical to Object {\"name\":\"Alex\",\"email\":\"alex@fmail.com\"}.');
        });

        test('[1,2,3,4,5] !== new Array(1,2,3,4,5)', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5], {
                "not-identical-to": {
                    "value": new Array(1,2,3,4,5)
                }
            })).toBe("This value should not be identical to Array [1,2,3,4,5].");
        });

        test('new sogv.Application({"lang": "en"}) !== new sogv.Application({"lang": "en"})', () => {
            expect(sogv.isValidWithErrorMessage(new sogv.Application({"lang": "en"}), {
                "not-identical-to": {
                    "value": new sogv.Application({"lang": "en"})
                }
            })).toBe('This value should not be identical to Application {\"lang\":\"en\",\"internal\":false,\"name\":\"Application\"}.');
        });
    });
});