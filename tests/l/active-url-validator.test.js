'use strict';

const sogv = require('../../build/output/sog-validator');

describe('active_url', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(sogv.isValidWithErrorMessage(null, 'active_url')).toBe(toBe);
        });

        test('Empty string will not validate', () => {
            expect(sogv.isValidWithErrorMessage('', 'active_url')).toBe(toBe);
        });

        test('https://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/', 'active_url')).toBe(toBe);
        });

        test('http://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('http://www.google.com/', 'active-url')).toBe(toBe);
        });

        test('https://www.google.com/search?client=ubuntu&hs=uR9&channel=fs&sxsrf=ACYBGNR5Dpj9xy7MvTY_-94say---LjiMg%3A1578311181193&ei=DR4TXsW9C9rBmwWluZGwDQ&q=url+validator+regex&oq=url+validator&gs_l=psy-ab.1.1.0j0i20i263j0l7j0i10.1944.7340..10378...1.2..0.120.1168.13j1......0....1..gws-wiz.......0i71j35i39j0i273j0i67j0i22i30j0i22i10i30.UEZFNASt0HA', () => {
            expect(sogv.isValidWithErrorMessage('https://www.google.com/search?client=ubuntu&hs=uR9&channel=fs&sxsrf=ACYBGNR5Dpj9xy7MvTY_-94say---LjiMg%3A1578311181193&ei=DR4TXsW9C9rBmwWluZGwDQ&q=url+validator+regex&oq=url+validator&gs_l=psy-ab.1.1.0j0i20i263j0l7j0i10.1944.7340..10378...1.2..0.120.1168.13j1......0....1..gws-wiz.......0i71j35i39j0i273j0i67j0i22i30j0i22i10i30.UEZFNASt0HA', 'active_url')).toBe(toBe);
        });

        test('ftp://www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('ftp://www.google.com/', 'active_url')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        test('//www.google.com/', () => {
            expect(sogv.isValidWithErrorMessage('//www.google.com/', 'active_url')).toBe("The value is not a valid URL.");
        });

        test('Lorem Ipsum', () => {
            expect(sogv.isValidWithErrorMessage('Lorem Ipsum', 'active_url')).toBe("The value is not a valid URL.");
        });
    });
});