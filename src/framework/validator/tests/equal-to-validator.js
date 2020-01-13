'use strict';

const abv = require('../../../../build/output/bob-validator');

describe('equal-to', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('"a@a.com" == "a@a.com"', () => {
            expect(abv.isValidWithErrorMessage('a@a.com', 'equal-to:{"value":"a@a.com"}')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 == new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "equal-to": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe(toBe);
        });

        test('12345 == "12345"', () => {
            expect(abv.isValidWithErrorMessage(12345, 'equal-to:{"value":"12345"}')).toBe(toBe);
        });

        test('1 == true', () => {
            expect(abv.isValidWithErrorMessage(1, 'equal-to:{"value":true}')).toBe(toBe);
        });

        test('0 == false', () => {
            expect(abv.isValidWithErrorMessage(0, 'equal-to:{"value":false}')).toBe(toBe);
        });

        test('new Object() == new Object()', () => {
            expect(abv.isValidWithErrorMessage(new Object(), {
                "equal-to": {
                    "value": new Object()
                }
            })).toBe(toBe);
        });

        test('{} == new Object()', () => {
            expect(abv.isValidWithErrorMessage({}, {
                "equal-to": {
                    "value": new Object()
                }
            })).toBe(toBe);
        });

        test('{"name": "Alex", "email": "alex@fmail.com"} == new Object("name": "Alex", "email": "alex@fmail.com")', () => {
            expect(abv.isValidWithErrorMessage({"name": "Alex", "email": "alex@fmail.com"}, {
                "equal-to": {
                    "value": new Object({"name": "Alex", "email": "alex@fmail.com"})
                }
            })).toBe(toBe);
        });

        test('[1,2,3,4,5] == new Array(1,2,3,4,5)', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5], {
                "equal-to": {
                    "value": new Array(1,2,3,4,5)
                }
            })).toBe(toBe);
        });

        test('new abv.Application({"lang": "en"}) == new abv.Application({"lang": "en"})', () => {
            expect(abv.isValidWithErrorMessage(new abv.Application({"lang": "en"}), {
                "equal-to": {
                    "value": new abv.Application({"lang": "en"})
                }
            })).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('new abv.Application({"lang": "en"}) == new abv.Application({"lang": "de"})', () => {
            expect(abv.isValidWithErrorMessage(new abv.Application({"lang": "en"}), {
                "equal-to": {
                    "value": new abv.Application({"lang": "de"})
                }
            })).toBe("This value should be equal to [object Object].");
        });

        test('Lorem ipsum == new Date("1995-12-17T03:24:00")', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', {
                "equal-to": {
                    "value": new Date('1995-12-17T03:24:00')
                }
            })).toBe("This value should be equal to Sun Dec 17 1995 03:24:00 GMT+0200 (Eastern European Standard Time).");
        });

        test('[1,2,3,4,5] == new Array(1,2,3,4,5,6)', () => {
            expect(abv.isValidWithErrorMessage([1,2,3,4,5], {
                "equal-to": {
                    "value": new Array(1,2,3,4,5,6)
                }
            })).toBe("This value should be equal to 1,2,3,4,5,6.");
        });

        test('{"name": "Vasy", "email": "vasy@fmail.com"} == new Object("name": "Alex", "email": "alex@fmail.com")', () => {
            expect(abv.isValidWithErrorMessage({"name": "Vasy", "email": "vasy@fmail.com"}, {
                "equal-to": {
                    "value": new Object({"name": "Alex", "email": "alex@fmail.com"})
                }
            })).toBe("This value should be equal to [object Object].");
        });

        test('1995-12-17T03:24:00 == new Date("1995-12-17T03:21:00")', () => {
            expect(abv.isValidWithErrorMessage('1995-12-17T03:24:00', {
                "equal-to": {
                    "value": new Date('1995-12-17T03:21:00')
                }
            })).toBe("This value should be equal to Sun Dec 17 1995 03:21:00 GMT+0200 (Eastern European Standard Time).");
        });

        test('new Date("1995-12-17T03:21:00") == new Object()', () => {
            expect(abv.isValidWithErrorMessage(new Date("1995-12-17T03:21:00"), {
                "equal-to": {
                    "value": new Object()
                }
            })).toBe("This value should be equal to [object Object].");
        });

        test('"true" == true', () => {
            expect(abv.isValidWithErrorMessage("true", 'equal-to:{"value":true}')).toBe("This value should be equal to true.");
        });
    });
});