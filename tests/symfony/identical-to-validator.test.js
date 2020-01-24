'use strict';

const abv = require('../../build/output/bob-validator');

describe('identical-to', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Empty string will not validate', () => {
            expect(abv.isValidWithErrorMessage('', 'identical-to:{"value":"a@a.com"}')).toBe(toBe);
        });

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'identical-to:{"value":"a@a.com"}')).toBe(toBe);
        });

        test('"a@a.com" === "a@a.com"', () => {
            expect(abv.isValidWithErrorMessage('a@a.com', 'identical-to:{"value":"a@a.com"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 === new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "identical-to": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('new Object() === new Object()', () => {
            expect(abv.isValidWithErrorMessage(new Object(), {
                "identical-to": {
                    "value": new Object()
                }
            })).toBe(toBe);
        });

        test('{} === new Object()', () => {
            expect(abv.isValidWithErrorMessage({}, {
                "identical-to": {
                    "value": new Object()
                }
            })).toBe(toBe);
        });

        test('{"name": "Alex", "email": "alex@fmail.com"} === new Object("name": "Alex", "email": "alex@fmail.com")', () => {
            expect(abv.isValidWithErrorMessage({"name": "Alex", "email": "alex@fmail.com"}, {
                "identical-to": {
                    "value": new Object({"name": "Alex", "email": "alex@fmail.com"})
                }
            })).toBe(toBe);
        });

        test('[1,2,3,4,5] === new Array(1,2,3,4,5)', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5], {
                "identical-to": {
                    "value": new Array(1,2,3,4,5)
                }
            })).toBe(toBe);
        });

        test('new abv.Application({"lang": "en"}) === new abv.Application({"lang": "en"})', () => {
            expect(abv.isValidWithErrorMessage(new abv.Application({"lang": "en"}), {
                "identical-to": {
                    "value": new abv.Application({"lang": "en"})
                }
            })).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('12345 === "12345"', () => {
            expect(abv.isValidWithErrorMessage(12345, 'identical-to:{"value":"12345"}')).toBe("This value should be identical to String 12345.");
        });

        test('1 === true', () => {
            expect(abv.isValidWithErrorMessage(1, 'identical-to:{"value":true}')).toBe("This value should be identical to Boolean true.");
        });

        test('0 === false', () => {
            expect(abv.isValidWithErrorMessage(0, 'identical-to:{"value":false}')).toBe("This value should be identical to Boolean false.");
        });

        test('new abv.Application({"lang": "en"}) === new abv.Application({"lang": "de"})', () => {
            expect(abv.isValidWithErrorMessage(new abv.Application({"lang": "en"}), {
                "identical-to": {
                    "value": new abv.Application({"lang": "de"})
                }
            })).toBe('This value should be identical to Application {\"lang\":\"de\",\"internal\":false,\"name\":\"Application\"}.');
        });

        test('Lorem ipsum === new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', {
                "identical-to": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be identical to Date December 17, 1995 3:24 AM.");
        });

        test('[1,2,3,4,5] === new Array(1,2,3,4,5,6)', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5], {
                "identical-to": {
                    "value": new Array(1,2,3,4,5,6)
                }
            })).toBe("This value should be identical to Array [1,2,3,4,5,6].");
        });

        test('{"name": "Vasy", "email": "vasy@fmail.com"} === new Object("name": "Alex", "email": "alex@fmail.com")', () => {
            expect(abv.isValidWithErrorMessage({"name": "Vasy", "email": "vasy@fmail.com"}, {
                "identical-to": {
                    "value": new Object({"name": "Alex", "email": "alex@fmail.com"})
                }
            })).toBe('This value should be identical to Object {\"name\":\"Alex\",\"email\":\"alex@fmail.com\"}.');
        });

        test('1995-12-17T03:24:00 === new Date("1995-12-17T03:21:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "identical-to": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("This value should be identical to Date December 17, 1995 3:21 AM.");
        });

        test('new Date("1995-12-17T03:21:00") === new Object()', () => {
            expect(abv.isValidWithErrorMessage(new Date("1995-12-17T03:21:00"), {
                "identical-to": {
                    "value": new Object()
                }
            })).toBe("This value should be identical to Object {}.");
        });

        test('"true" === true', () => {
            expect(abv.isValidWithErrorMessage("true", 'identical-to:{"value":true}')).toBe("This value should be identical to Boolean true.");
        });
    });
});