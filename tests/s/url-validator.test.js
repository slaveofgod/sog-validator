'use strict';

const sogv = require('../../build/output/sog-validator');

describe('url', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'url')).toBe(toBe);
        });

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'url')).toBe(toBe);
        });

        test('https://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'url')).toBe(toBe);
        });

        test('http://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('http://www.google.com/', 'url')).toBe(toBe);
        });

        test('https://www.google.com/search?client=ubuntu&hs=uR9&channel=fs&sxsrf=ACYBGNR5Dpj9xy7MvTY_-94say---LjiMg%3A1578311181193&ei=DR4TXsW9C9rBmwWluZGwDQ&q=url+validator+regex&oq=url+validator&gs_l=psy-ab.1.1.0j0i20i263j0l7j0i10.1944.7340..10378...1.2..0.120.1168.13j1......0....1..gws-wiz.......0i71j35i39j0i273j0i67j0i22i30j0i22i10i30.UEZFNASt0HA', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/search?client=ubuntu&hs=uR9&channel=fs&sxsrf=ACYBGNR5Dpj9xy7MvTY_-94say---LjiMg%3A1578311181193&ei=DR4TXsW9C9rBmwWluZGwDQ&q=url+validator+regex&oq=url+validator&gs_l=psy-ab.1.1.0j0i20i263j0l7j0i10.1944.7340..10378...1.2..0.120.1168.13j1......0....1..gws-wiz.......0i71j35i39j0i273j0i67j0i22i30j0i22i10i30.UEZFNASt0HA', 'url')).toBe(toBe);
        });

        test('String " http://www.google.com/ " ["normalize": true]', () => {
            expect(sogv.isValidWithErrorMessage(' http://www.google.com/ ', 'url:{"normalize": true}')).toBe(toBe);
        });

        test('https://www.google.com/ ["protocols": ["https"]]', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'url:{"protocols": ["https"]}')).toBe(toBe);
        });

        test('ftp://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('ftp://www.google.com/', 'url')).toBe(toBe);
        });

        test('//www.google.com/ ["relativeProtocol": true]', () => {
            expect(sogv.isValidWithErrorMessage('//www.google.com/', 'url:{"relativeProtocol": true}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value is not a valid URL.";

        test('https://www.google.com/ ["protocols": ["http"]]', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'url:{"protocols": ["http"]}')).toBe(toBe);
        });

        test('http://www.google.com/ ["protocols": null]', () => {
            expect(sogv.isValidWithErrorMessage('http://www.google.com/', 'url:{"protocols": "dadadwd"}')).toBe(toBe);
        });

        test('String " http://www.google.com/ "', () => {
            expect(sogv.isValidWithErrorMessage(' http://www.google.com/ ', 'url')).toBe("This value is not a valid URL.");
        });

        test('False', () => {
            expect(sogv.isValidWithErrorMessage(false, 'url')).toBe("This value is not a valid URL.");
        });

        test('Empty array', () => {
            expect(sogv.isValidWithErrorMessage([], 'url')).toBe("This value should be of type scalar.");
        });

        test('//www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('//www.google.com/', 'url')).toBe(toBe);
        });
    });
});