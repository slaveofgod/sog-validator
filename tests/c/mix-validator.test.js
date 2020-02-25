'use strict';

const sogv = require('../../build/output/sog-validator');

describe('mix', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('user.first_name ["regex": "/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/', () => {
            expect(sogv.isValidWithErrorMessage('user.first_name', 'regex:^[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$')).toBe(toBe);
        });

        test('Visa "4012888888881881" ["schemes": "VISA"]', () => {
            expect(sogv.isValidWithErrorMessage('4012888888881881', 'card-scheme:VISA')).toBe(toBe);
        });

        test('JCB "3530111333300000" ["schemes": ["MASTERCARD","JCB"]]', () => {
            expect(sogv.isValidWithErrorMessage('3530111333300000', 'card-scheme:MASTERCARD;JCB')).toBe(toBe);
        });

        test('10 divisible by 2', () => {
            expect(sogv.isValidWithErrorMessage(10, 'divisible-by:2')).toBe(toBe);
        });

        test('1958-06-15 22:15:19', () => {
            expect(sogv.isValidWithErrorMessage('1958-06-15 22:15:19', 'date-time')).toBe(toBe);
        });

        test('2015-08-22 ["format":"YYYY-MM-DD"]', () => {
            expect(sogv.isValidWithErrorMessage('2015-08-22', 'date-time:YYYY-MM-DD')).toBe(toBe);
        });

        test('"a@a.com" == "a@a.com"', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'equal-to:a@a.com')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 == 1995-12-17T03:24:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', "equal-to:1995-12-17T03:24:00")).toBe(toBe);
        });

        test('12345 == 12345', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'equal-to:12345')).toBe(toBe);
        });

        test('String "AB2569"', () => {
            expect(sogv.isValidWithErrorMessage("AB2569", 'type:xdigit')).toBe(toBe);
        });

        test('String "AB2569"', () => {
            expect(sogv.isValidWithErrorMessage("AB2569", 'type:integer;xdigit,true')).toBe(toBe);
        });

        test('127.0.0.1', () => {
            expect(sogv.isValidWithErrorMessage('127.0.0.1', 'ip')).toBe(toBe);
        });

        test('127.25.250.1', () => {
            expect(sogv.isValidWithErrorMessage('127.25.250.1', 'ip:4')).toBe(toBe);
        });

        test('true > false', () => {
            expect(sogv.isValidWithErrorMessage(true, 'greater-than:false')).toBe(toBe);
        });

        test('0.00000002 > 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000002, 'greater-than:0.00000001')).toBe(toBe);
        });

        test('String "216fff40-98d9-11e3-a5e2-0800200c9a66" ["versions": [1,4,5]]', () => {
            expect(sogv.isValidWithErrorMessage('216fff40-98d9-11e3-a5e2-0800200c9a66', 'uuid:1;4;5')).toBe(toBe);
        });

        test('String "216f-ff40-98d9-11e3-a5e2-0800-200c-9a66" ["versions": [1,4,5], strict: false]', () => {
            expect(sogv.isValidWithErrorMessage('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', 'uuid:1;4;5,false')).toBe(toBe);
        });

        test('BOFAUS6S [iban:"BOFAUS3N"]', () => {
            expect(sogv.isValidWithErrorMessage('BOFAUS6S', 'bic:BOFAUS3N')).toBe(toBe);
        });

        test('"a@a.com" === "a@a.com"', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'identical-to:a@a.com')).toBe(toBe);
        });

        test('12345 === 12345', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'identical-to:12345')).toBe(toBe);
        });

        test('Lorem ipsum', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'count:1')).toBe(toBe);
        });

        test('[1,2,3,4,5] ["min":5,"max":10]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5], 'count:5,10')).toBe(toBe);
        });

        test('0028-0836 ["caseSensitive":false,"requireHyphen":false]', () => {
            expect(sogv.isValidWithErrorMessage('0028-0836', 'issn:false,false')).toBe(toBe);
        });

        test('0028-0836 ["caseSensitive":true,"requireHyphen":true]', () => {
            expect(sogv.isValidWithErrorMessage('0028-0836', 'issn:true,true')).toBe(toBe);
        });

        test('1 !== true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'not-identical-to:true')).toBe(toBe);
        });

        test('0 !== false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'not-identical-to:false')).toBe(toBe);
        });

        test('String "692933040000" [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage("692933040000", 'range:1990-12-17T03:24:00,1995-12-17T03:24:00')).toBe(toBe);
        });

        test('150 [min: 150, max: 200]', () => {
            expect(sogv.isValidWithErrorMessage(150, 'range:150,200')).toBe(toBe);
        });

        test('1-56619-909-3', () => {
            expect(sogv.isValidWithErrorMessage('1-56619-909-3', 'isbn')).toBe(toBe);
        });

        test('978-1-56619-909-4 ["type":"isbn13"]', () => {
            expect(sogv.isValidWithErrorMessage('978-1-56619-909-4', 'isbn:isbn13')).toBe(toBe);
        });

        test('a@a.com', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'ends_with:com')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'ends_with:eu;com')).toBe(toBe);
        });

        test('true gt false', () => {
            expect(sogv.isValidWithErrorMessage(true, 'gt:false')).toBe(toBe);
        });

        test('0.00000002 gt 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000002, 'gt:0.00000001')).toBe(toBe);
        });

        test('false < true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'max:true')).toBe(toBe);
        });

        test('12345 < "12346"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'less-than-or-equal:12346')).toBe(toBe);
        });

        test('a@a.com', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'starts_with:a@a')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'starts_with:com;alexey;iam')).toBe(toBe);
        });

        test('String " abcd efgh ijklmnopq " ["value":21]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'size:21')).toBe(toBe);
        });

        test('125.63', () => {
            expect(sogv.isValidWithErrorMessage(125.63, 'size:125.63')).toBe(toBe);
        });

        test('[1,2,3,4,5,6,7,8,9]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9], 'size:9')).toBe(toBe);
        });

        test('0 >= false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'greater-than-or-equal:false')).toBe(toBe);
        });

        test('1 >= true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'greater-than-or-equal:true')).toBe(toBe);
        });

        test('12346 >= 12345', () => {
            expect(sogv.isValidWithErrorMessage(12346, 'greater-than-or-equal:12345')).toBe(toBe);
        });

        test('12345 >= 12345', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'greater-than-or-equal:12345')).toBe(toBe);
        });

        test('a@a.com', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'email:loose')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'email:html5')).toBe(toBe);
        });

        test('1995-12-17T03:21:00 <= 1995-12-17T03:24:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', 'before_or_equal:1995-12-17T03:24:00')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 > 1995-12-17T03:21:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', 'after:1995-12-17T03:21:00')).toBe(toBe);
        });

        test('1995-12-17T03:24:00 >= 1995-12-17T03:21:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', 'after-or-equal:1995-12-17T03:21:00')).toBe(toBe);
        });

        test('1995-12-17T03:21:00 >= 1995-12-17T03:21:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', 'after_or_equal:1995-12-17T03:21:00')).toBe(toBe);
        });

        test('Lorem ipsum != 1995-12-17T03:24:00', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', "not-equal-to:1995-12-17T03:24:00")).toBe(toBe);
        });

        test('[1,2,3,4,5] != [1,2,3,4,5,6]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5], "not-equal-to:1;2;3;4;5")).toBe(toBe);
        });

        test('"12589634875214" ["min":14,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage('12589634875214', 'digits-between:14,20')).toBe(toBe);
        });

        test('1258963487521425 ["min":12,"max":21]', () => {
            expect(sogv.isValidWithErrorMessage(1258963487521425, 'digits-between:12,21')).toBe(toBe);
        });

        test('1991-12-17T03:24:00 [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage('1991-12-17T03:24:00', 'between:1990-12-17T03:24:00,1995-12-17T03:24:00')).toBe(toBe);
        });

        test('692933040000 [min: "1990-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage(692933040000, 'between:1990-12-17T03:24:00,1995-12-17T03:24:00')).toBe(toBe);
        });

        test('150 [min: 150, max: 200]', () => {
            expect(sogv.isValidWithErrorMessage(150, 'between:150,200')).toBe(toBe);
        });

        test('[1,2,3,4,5,6,7,8,9,10,11,12] ["min":10,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9,10,11,12], 'between:10,20')).toBe(toBe);
        });

        test('String "abcd efgh ijklmn" [min:1, max:20]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'between:1,20')).toBe(toBe);
        });

        test('String "abcd efgh ijklmn" [min:1, max:20]', () => {
            expect(sogv.isValidWithErrorMessage("abcd efgh ijklmn", 'length:1,20')).toBe(toBe);
        });

        test('false < true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'less-than:true')).toBe(toBe);
        });

        test('12345 < 12346', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'less-than:12346')).toBe(toBe);
        });

        test('//www.google.com/ ["relativeProtocol": true]', () => {
            expect(sogv.isValidWithErrorMessage('//www.google.com/', 'url:true')).toBe(toBe);
        });

        test('https://www.google.com/ ["protocols": ["https","http"]]', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'url:false,https;http')).toBe(toBe);
        });

        test('https://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'url')).toBe(toBe);
        });

        test('1995-12-17T03:21:00 < 1995-12-17T03:24:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', 'before:1995-12-17T03:24:00')).toBe(toBe);
        });

        test('Bob', () => {
            expect(sogv.isValidWithErrorMessage('Bob', 'not_in:Liam;Noah;William;James;Logan;Benjamnot_in;Mason;Elijah;Oliver;Jacob;Lucas;Michael;Alexander;Ethan;Daniel;Matthew;Aiden;Henry;Joseph;Jackson;Samuel;Sebastian;David;Carter;Wyatt;Jayden;John;Owen;Dylan;Luke')).toBe(toBe);
        });

        test('true lte false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'lte:true')).toBe(toBe);
        });

        test('0.00000002 lte 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'lte:0.00000002')).toBe(toBe);
        });

        test('true gte false', () => {
            expect(sogv.isValidWithErrorMessage(true, 'gte:false')).toBe(toBe);
        });

        test('0.00000002 gte 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000002, 'gte:0.00000001')).toBe(toBe);
        });

        test('true lt false', () => {
            expect(sogv.isValidWithErrorMessage(false, 'lt:true')).toBe(toBe);
        });

        test('0.00000002 lt 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'lt:0.00000002')).toBe(toBe);
        });

        test('Liam', () => {
            expect(sogv.isValidWithErrorMessage('Liam', 'in:Liam;Noah;William;James;Logan;Benjamnot_in;Mason;Elijah;Oliver;Jacob;Lucas;Michael;Alexander;Ethan;Daniel;Matthew;Aiden;Henry;Joseph;Jackson;Samuel;Sebastian;David;Carter;Wyatt;Jayden;John;Owen;Dylan;Luke')).toBe(toBe);
        });

        test('Liam,Noah,William,James [multiple:true,min:3,choices]', () => {
            expect(sogv.isValidWithErrorMessage(["Liam", "Noah", "William", "James"], 'choice:Liam;Noah;William;James;Logan;Benjamin;Mason;Elijah;Oliver;Jacob;Lucas;Michael;Alexander;Ethan;Daniel;Matthew;Aiden;Henry;Joseph;Jackson;Samuel;Sebastian;David;Carter;Wyatt;Jayden;John;Owen;Dylan;Luke,3,10,true')).toBe(toBe);
        });

        test('iamtheslaveofgod@gmail.com [value: "eslaveo"]', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'contains:eslaveo')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('JCB "3530111333300000" ["schemes": ["MASTERCARD","MASTERCARD"]]', () => {
            expect(sogv.isValidWithErrorMessage('3530111333300000', 'card-scheme:MASTERCARD,MASTERCARD')).toBe("Unsupported card type or invalid card number.");
        });

        test('Visa "4111111111111111"', () => {
            expect(sogv.isValidWithErrorMessage('4111111111111111', 'card-scheme:MASTERCARD')).toBe("Unsupported card type or invalid card number.");
        });

        test('10.20 divisible by 2', () => {
            expect(sogv.isValidWithErrorMessage(10.20, 'divisible-by:2')).toBe("This value should be a multiple of 2.");
        });

        test('1958-06-15 22:15:19 ["format":"YYYY-MM-DD"]', () => {
            expect(sogv.isValidWithErrorMessage('1958-06-15 22:15:19', 'date-time:YYYY-MM-DD')).toBe("This value is not a valid datetime.");
        });

        test('1958-28-48', () => {
            expect(sogv.isValidWithErrorMessage('1958-28-48', 'date-time')).toBe("This value should be of type date-string.");
        });

        test('Lorem ipsum == 1995-12-17T03:24:00', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', "equal-to:1995-12-17T03:24:00")).toBe("This value should be equal to December 17, 1995 3:24 AM.");
        });

        test('String "GTEFFGGS"', () => {
            expect(sogv.isValidWithErrorMessage("GTEFFGGS", 'type:xdigit')).toBe("This value should be of type xdigit.");
        });

        test('Lorem ipsum', () => {
            expect(sogv.isValidWithErrorMessage('Lorem ipsum', 'ip')).toBe("This is not a valid IP address.");
        });

        test('0.00000001 > 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'greater-than:0.00000001')).toBe("This value should be greater than 1e-8.");
        });

        test('216fff40-98d9-11e3-a5e2-0800200c9a66', () => {
            expect(sogv.isValidWithErrorMessage('{216fff40-98d9-11e3-a5e2-0800200c9a66}', 'uuid')).toBe("This is not a valid UUID.");
        });

        test('BOFAUS6S [iban:"USFAUS6S"]', () => {
            expect(sogv.isValidWithErrorMessage('BOFAUS6S', 'bic:USFAUS6S')).toBe("This Business Identifier Code (BIC) is not associated with IBAN USFAUS6S.");
        });

        test('String "n4DSZBJJXXx"', () => {
            expect(sogv.isValidWithErrorMessage('n4DSZBJJXXx', 'bic')).toBe("This is not a valid Business Identifier Code (BIC).");
        });

        test('0 === false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'identical-to:false')).toBe("This value should be identical to Boolean false.");
        });

        test('abcdef ["min":7,"max":10]', () => {
            expect(sogv.isValidWithErrorMessage('abcdef', 'count:7,10')).toBe("This collection should contain 7 elements or more.");
        });

        test('[1,2,3,4] ["min":5,"max":10]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4], 'count:5,10')).toBe("This collection should contain 5 elements or more.");
        });

        test('2434561X ["requireHyphen":true]', () => {
            expect(sogv.isValidWithErrorMessage('2434561X', 'issn:false,true')).toBe("This value is not a valid ISSN.");
        });

        test('978-1-56619-909-4', () => {
            expect(sogv.isValidWithErrorMessage('978-1-56619-909-4', 'issn')).toBe("This value is not a valid ISSN.");
        });

        test('1 !== 1', () => {
            expect(sogv.isValidWithErrorMessage(1, 'not-identical-to:1')).toBe("This value should not be identical to Number 1.");
        });

        test('0 !== 0', () => {
            expect(sogv.isValidWithErrorMessage(0, 'not-identical-to:0')).toBe("This value should not be identical to Number 0.");
        });

        test('true !== true', () => {
            expect(sogv.isValidWithErrorMessage(true, 'not-identical-to:true')).toBe("This value should not be identical to Boolean true.");
        });

        test('1990-12-17T03:24:00 [min: "1991-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage('1990-12-17T03:24:00', 'range:1991-12-17T03:24:00,1995-12-17T03:24:00')).toBe("This value should be between December 17, 1991 3:24 AM and December 17, 1995 3:24 AM.");
        });

        test('1-56619-909-3 ["type":"isbn13"]', () => {
            expect(sogv.isValidWithErrorMessage('1-56619-909-3', 'isbn:isbn13')).toBe("This value is not a valid ISBN-13.");
        });

        test('132453465465498', () => {
            expect(sogv.isValidWithErrorMessage(132453465465498, 'ends_with:com;eu;6498')).toBe('The value must end with one of the following: [\"com\",\"eu\",\"6498\"].');
        });

        test('12345 gt "12346"', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'gt:12346')).toBe("The value must be greater than 12346.");
        });

        test('0 gt false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'gt:false')).toBe("The value must be greater than false.");
        });

        test('"true" < true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'less-than-or-equal:true')).toBe("This value should be less than or equal to true.");
        });

        test('true < false', () => {
            expect(sogv.isValidWithErrorMessage(true, 'less-than-or-equal:false')).toBe("This value should be less than or equal to false.");
        });

        test('a@a-com', () => {
            expect(sogv.isValidWithErrorMessage('a@a-com', 'starts-with:abs')).toBe('The value must start with one of the following: [\"abs\"].');
        });

        test('[1,2,3,4,5,6,7,8,9]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9], 'size:5')).toBe("The value must contain 5 items.");
        });

        test('String " abcd efgh ijklmnopq " ["value":10]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'size:10')).toBe('The value must be 10 characters.');
        });

        test('false >= true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'greater-than-or-equal:true')).toBe("This value should be greater than or equal to true.");
        });

        test('12345 >= 12346', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'greater-than-or-equal:12346')).toBe("This value should be greater than or equal to 12346.");
        });

        test('a@a-com', () => {
            expect(sogv.isValidWithErrorMessage('a@a-com', 'email:loose')).toBe("This value is not a valid email address.");
        });

        test('1995-12-17T03:24:00 <= 1995-12-17T03:21:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:24:00', 'before-or-equal:1995-12-17T03:21:00')).toBe("The value must be a date before or equal to 1995-12-17T03:24:00.");
        });

        test('1995-12-17T03:21:00 > 1995-12-17T03:21:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', 'after:1995-12-17T03:21:00')).toBe("The value must be a date after 1995-12-17T03:21:00.");
        });

        test('1995-12-17T03:21:00 >= 1995-12-17T03:24:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', 'after_or_equal:1995-12-17T03:24:00')).toBe("The value must be a date after or equal to 1995-12-17T03:21:00.");
        });

        test('"a@a.com" != "a@a.com"', () => {
            expect(sogv.isValidWithErrorMessage('a@a.com', 'not-equal-to:a@a.com')).toBe("This value should not be equal to a@a.com.");
        });

        test('12345 ["min":8,"max":10]', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'digits-between:8,10')).toBe("The value must be between 8 and 10 digits.");
        });

        test('1234567890 ["min":11,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage(1234567890, 'digits-between:11,20')).toBe("The value must be between 11 and 20 digits.");
        });

        test('125 [min: 150, max: 200]', () => {
            expect(sogv.isValidWithErrorMessage(125, 'between:150,200')).toBe("The value must be between 150 and 200.");
        });

        test('1990-12-17T03:24:00 [min: "1991-12-17T03:24:00", max: "1995-12-17T03:24:00"]', () => {
            expect(sogv.isValidWithErrorMessage('1990-12-17T03:24:00', 'between:1991-12-17T03:24:00,1995-12-17T03:24:00')).toBe("The value must be between 1991-12-17T03:24:00 and 1995-12-17T03:24:00 date.");
        });

        test('[1,2,3,4,5,6,7,8,9] ["min":10,"max":20]', () => {
            expect(sogv.isValidWithErrorMessage([1,2,3,4,5,6,7,8,9], 'between:10,20')).toBe("The value must have between 10 and 20 items.");
        });

        test('String "abcd efgh ijklmnopq" ["min":6,"max":10]', () => {
            expect(sogv.isValidWithErrorMessage(" abcd efgh ijklmnopq ", 'between:6,10')).toBe("The value must be between 6 and 10 characters.");
        });

        test('String "abcd" [min:5,max:10]', () => {
            expect(sogv.isValidWithErrorMessage("abcd", 'length:5,10')).toBe("This value is too short. It should have 5 characters or more.");
        });

        test('0 < false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'less-than:false')).toBe("This value should be less than false.");
        });

        test('1 < true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'less-than:true')).toBe("This value should be less than true.");
        });

        test('12345 < 12345', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'less-than:12345')).toBe("This value should be less than 12345.");
        });

        test('https://www.google.com/ ["protocols": ["http"]]', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'url:false,http}')).toBe("This value is not a valid URL.");
        });

        test('1995-12-17T03:21:00 < 1995-12-17T03:21:00', () => {
            expect(sogv.isValidWithErrorMessage('1995-12-17T03:21:00', 'before:1995-12-17T03:21:00')).toBe("The value must be a date before 1995-12-17T03:21:00.");
        });

        test('Liam', () => {
            expect(sogv.isValidWithErrorMessage('Liam', 'not_in:Liam;Noah;William;James;Logan;Benjamnot_in;Mason;Elijah;Oliver;Jacob;Lucas;Michael;Alexander;Ethan;Daniel;Matthew;Aiden;Henry;Joseph;Jackson;Samuel;Sebastian;David;Carter;Wyatt;Jayden;John;Owen;Dylan;Luke')).toBe("The selected value is invalid.");
        });

        test('"true" lte true', () => {
            expect(sogv.isValidWithErrorMessage("true", 'lte:true')).toBe("The value must be less than or equal true.");
        });

        test('false gte true', () => {
            expect(sogv.isValidWithErrorMessage(false, 'gte:true')).toBe("The value must be greater than or equal true.");
        });

        test('12345 gte 12346', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'gte:12346')).toBe("The value must be greater than or equal 12346.");
        });

        test('0.00000001 lt 0.00000001', () => {
            expect(sogv.isValidWithErrorMessage(0.00000001, 'lt:0.00000001')).toBe("The value must be less than 1e-8.");
        });

        test('0 lt false', () => {
            expect(sogv.isValidWithErrorMessage(0, 'lt:false')).toBe("The value must be less than false.");
        });

        test('1 lt true', () => {
            expect(sogv.isValidWithErrorMessage(1, 'lt:true')).toBe("The value must be less than true.");
        });

        test('12345 lt 12345', () => {
            expect(sogv.isValidWithErrorMessage(12345, 'lt:12345')).toBe("The value must be less than 12345.");
        });

        test('Bob', () => {
            expect(sogv.isValidWithErrorMessage('Bob', 'in:Liam;Noah;William;James;Logan;Benjamnot_in;Mason;Elijah;Oliver;Jacob;Lucas;Michael;Alexander;Ethan;Daniel;Matthew;Aiden;Henry;Joseph;Jackson;Samuel;Sebastian;David;Carter;Wyatt;Jayden;John;Owen;Dylan;Luke')).toBe("The selected value is invalid.");
        });

        test('Liam,Noah,Bob [multiple:true,min:3,choices]', () => {
            expect(sogv.isValidWithErrorMessage(["Liam", "Noah", "Bob"], 'choice:Liam;Noah;William;James;Logan;Benjamin;Mason;Elijah;Oliver;Jacob;Lucas;Michael;Alexander;Ethan;Daniel;Matthew;Aiden;Henry;Joseph;Jackson;Samuel;Sebastian;David;Carter;Wyatt;Jayden;John;Owen;Dylan;Luke,3,10,true')).toBe("One or more of the given values is invalid.");
        });

        test('Liam,Noah [multiple:true,min:3,choices]', () => {
            expect(sogv.isValidWithErrorMessage(["Liam", "Noah"], 'choice:Liam;Noah;William;James;Logan;Benjamin;Mason;Elijah;Oliver;Jacob;Lucas;Michael;Alexander;Ethan;Daniel;Matthew;Aiden;Henry;Joseph;Jackson;Samuel;Sebastian;David;Carter;Wyatt;Jayden;John;Owen;Dylan;Luke,3,10,true')).toBe("You must select at least 3 choices.");
        });

        test('iamtheslaveofgod@gmail.com [value: "alex"]', () => {
            expect(sogv.isValidWithErrorMessage('iamtheslaveofgod@gmail.com', 'contains:alex')).toBe("This value should contains the given substring.");
        });

        test('user.first_name ["regex": "/^[a-zA-Z0-9_-]+\;[a-zA-Z0-9_-]+$/', () => {
            expect(sogv.isValidWithErrorMessage('user.first_name', 'regex:^[a-zA-Z0-9_-]+\;[a-zA-Z0-9_-]+$')).toBe('This value is not valid.');
        });
    });
});