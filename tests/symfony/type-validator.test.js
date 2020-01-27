'use strict';

const abv = require('../../build/output/sog-validator');

/**
 * Array - Finds whether a variable is an array
 */
describe('type[type:array]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"array"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":["array","iterable"]}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"array"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type array.";

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":["array","string"]}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"array"}')).toBe(toBe);
        });

        test('Boolean', () => {
            expect(abv.isValidWithErrorMessage(false, 'type:{"type":"array"}')).toBe(toBe);
        });
    });
});

/**
 * Bool - Finds out whether a variable is a boolean
 */
describe('type[type:bool]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('True', () => {
            expect(abv.isValidWithErrorMessage(true, 'type:{"type":"bool"}')).toBe(toBe);
        });

        test('False', () => {
            expect(abv.isValidWithErrorMessage(false, 'type:{"type":"bool"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type bool.";

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"bool"}')).toBe(toBe);
        });
    });
});

/**
 * Callable - Verify that the contents of a variable can be called as a function
 */
describe('type[type:callable]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"callable"}')).toBe(toBe);
        });

        test('abv.isValidWithErrorMessage', () => {
            expect(abv.isValidWithErrorMessage(abv.isValidWithErrorMessage, 'type:{"type":"callable"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type callable.";

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"callable"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"callable"}')).toBe(toBe);
        });
    });
});

/**
 * Float - Finds whether the type of a variable is float
 */
describe('type[type:float]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'type:{"type":"float"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type float.";

        test('"10.25"', () => {
            expect(abv.isValidWithErrorMessage('10.25', 'type:{"type":"float"}')).toBe(toBe);
        });

        test('10', () => {
            expect(abv.isValidWithErrorMessage(10, 'type:{"type":"float"}')).toBe(toBe);
        });

        test('"10"', () => {
            expect(abv.isValidWithErrorMessage('10', 'type:{"type":"float"}')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"float"}')).toBe(toBe);
        });
    });
});

/**
 * Double - Finds whether the type of a variable is double
 */
describe('type[type:double]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'type:{"type":"double"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type double.";

        test('"10.25"', () => {
            expect(abv.isValidWithErrorMessage('10.25', 'type:{"type":"double"}')).toBe(toBe);
        });

        test('10', () => {
            expect(abv.isValidWithErrorMessage(10, 'type:{"type":"double"}')).toBe(toBe);
        });

        test('"10"', () => {
            expect(abv.isValidWithErrorMessage('10', 'type:{"type":"double"}')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"double"}')).toBe(toBe);
        });
    });
});

/**
 * Integer - Finds whether the type of a variable is integer
 */
describe('type[type:integer]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'type:{"type":"integer"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type integer.";

        test('"25"', () => {
            expect(abv.isValidWithErrorMessage('25', 'type:{"type":"integer"}')).toBe(toBe);
        });

        test('"10.25"', () => {
            expect(abv.isValidWithErrorMessage('10.25', 'type:{"type":"integer"}')).toBe(toBe);
        });

        test('15.26', () => {
            expect(abv.isValidWithErrorMessage(15.26, 'type:{"type":"integer"}')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"integer"}')).toBe(toBe);
        });
    });
});

/**
 * Iterable - Verify that the contents of a variable is an iterable value
 */
describe('type[type:iterable]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"iterable"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"iterable"}')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"iterable"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type iterable.";

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"iterable"}')).toBe(toBe);
        });

        test('function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"iterable"}')).toBe(toBe);
        });
    });
});

/**
 * Null - Finds whether a variable is NULL
 */
describe('type[type:null]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"null"}')).toBe(toBe);
        });

        test('Empty string', () => {
            expect(abv.isValidWithErrorMessage('', 'type:{"type":"null"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type null.";

        test('0', () => {
            expect(abv.isValidWithErrorMessage(0, 'type:{"type":"null"}')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"null"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"null"}')).toBe(toBe);
        });

        test('function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"null"}')).toBe(toBe);
        });
    });
});

/**
 * Numeric - Finds whether a variable is a number or a numeric string
 */
describe('type[type:numeric]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"numeric"}')).toBe(toBe);
        });

        test('Empty string', () => {
            expect(abv.isValidWithErrorMessage('', 'type:{"type":"numeric"}')).toBe(toBe);
        });

        test('10', () => {
            expect(abv.isValidWithErrorMessage(10, 'type:{"type":"numeric"}')).toBe(toBe);
        });

        test('"25"', () => {
            expect(abv.isValidWithErrorMessage('25', 'type:{"type":"numeric"}')).toBe(toBe);
        });

        test('26.98', () => {
            expect(abv.isValidWithErrorMessage(26.98, 'type:{"type":"numeric"}')).toBe(toBe);
        });

        test('"59.63"', () => {
            expect(abv.isValidWithErrorMessage('59.63', 'type:{"type":"numeric"}')).toBe(toBe);
        });

        test('.98', () => {
            expect(abv.isValidWithErrorMessage(.36, 'type:{"type":"numeric"}')).toBe(toBe);
        });

        test('".26"', () => {
            expect(abv.isValidWithErrorMessage('.26', 'type:{"type":"numeric"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type numeric.";

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"numeric"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"numeric"}')).toBe(toBe);
        });

        test('function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"numeric"}')).toBe(toBe);
        });
    });
});

/**
 * Object - Finds whether a variable is an object
 */
describe('type[type:object]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"object"}')).toBe(toBe);
        });

        test('abv', () => {
            expect(abv.isValidWithErrorMessage(abv, 'type:{"type":"object"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"object"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type object.";

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"object"}')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"object"}')).toBe(toBe);
        });

        test('25.69', () => {
            expect(abv.isValidWithErrorMessage(25.69, 'type:{"type":"object"}')).toBe(toBe);
        });

        test('85', () => {
            expect(abv.isValidWithErrorMessage(85, 'type:{"type":"object"}')).toBe(toBe);
        });
    });
});

/**
 * Real - Finds whether the type of a variable is real
 */
describe('type[type:real]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'type:{"type":"real"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type real.";

        test('"10.25"', () => {
            expect(abv.isValidWithErrorMessage('10.25', 'type:{"type":"real"}')).toBe(toBe);
        });

        test('"10"', () => {
            expect(abv.isValidWithErrorMessage('10', 'type:{"type":"real"}')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"real"}')).toBe(toBe);
        });
    });
});

/**
 * Scalar - Finds whether a variable is a scalar
 */
describe('type[type:scalar]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"scalar"}')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'type:{"type":"scalar"}')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'type:{"type":"scalar"}')).toBe(toBe);
        });

        test('True', () => {
            expect(abv.isValidWithErrorMessage(true, 'type:{"type":"scalar"}')).toBe(toBe);
        });

        test('False', () => {
            expect(abv.isValidWithErrorMessage(false, 'type:{"type":"scalar"}')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"scalar"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type scalar.";

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"scalar"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"scalar"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"scalar"}')).toBe(toBe);
        });
    });
});

/**
 * String - Find whether the type of a variable is string
 */
describe('type[type:string]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"string"}')).toBe(toBe);
        });

        test('String', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"string"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type string.";

        test('26.35', () => {
            expect(abv.isValidWithErrorMessage(26.35, 'type:{"type":"string"}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"string"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"string"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"string"}')).toBe(toBe);
        });
    });
});

/**
 * Alnum - Check for alphanumeric character(s)
 */
describe('type[type:alnum]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"alnum"}')).toBe(toBe);
        });

        test('String without space(s)', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'type:{"type":"alnum"}')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'type:{"type":"alnum"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type alnum.";

        test('59', () => {
            expect(abv.isValidWithErrorMessage(59, 'type:{"type":"alnum"}')).toBe(toBe);
        });

        test('26.35', () => {
            expect(abv.isValidWithErrorMessage(26.35, 'type:{"type":"alnum"}')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"alnum"}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"alnum"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"alnum"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"alnum"}')).toBe(toBe);
        });
    });
});

/**
 * Alpha - Check for alphabetic character(s)
 */
describe('type[type:alpha]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"alpha"}')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'type:{"type":"alpha"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type alpha.";

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'type:{"type":"alpha"}')).toBe(toBe);
        });

        test('59', () => {
            expect(abv.isValidWithErrorMessage(59, 'type:{"type":"alpha"}')).toBe(toBe);
        });

        test('26.35', () => {
            expect(abv.isValidWithErrorMessage(26.35, 'type:{"type":"alpha"}')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"alpha"}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"alpha"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"alpha"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"alpha"}')).toBe(toBe);
        });
    });
});

/**
 * Digit - Check for numeric character(s)
 */
describe('type[type:digit]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"digit"}')).toBe(toBe);
        });

        test('String "59"', () => {
            expect(abv.isValidWithErrorMessage("59", 'type:{"type":"digit"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type digit.";

        test('59', () => {
            expect(abv.isValidWithErrorMessage(59, 'type:{"type":"digit"}')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'type:{"type":"digit"}')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'type:{"type":"digit"}')).toBe(toBe);
        });

        test('26.35', () => {
            expect(abv.isValidWithErrorMessage(26.35, 'type:{"type":"digit"}')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"digit"}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"digit"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"digit"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"digit"}')).toBe(toBe);
        });
    });
});

/**
 * Graph - Check for any printable character(s) except space
 */
describe('type[type:graph]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"graph"}')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'type:{"type":"graph"}')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'type:{"type":"graph"}')).toBe(toBe);
        });

        test('String "20"', () => {
            expect(abv.isValidWithErrorMessage("20", 'type:{"type":"graph"}')).toBe(toBe);
        });

        test('String "10.25"', () => {
            expect(abv.isValidWithErrorMessage("10.25", 'type:{"type":"graph"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type graph.";

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"graph"}')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'type:{"type":"graph"}')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'type:{"type":"graph"}')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'type:{"type":"graph"}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"graph"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"graph"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"graph"}')).toBe(toBe);
        });
    });
});

/**
 * Lower - Check for lowercase character(s)
 */
describe('type[type:lower]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"lower"}')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'type:{"type":"lower"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type lower.";

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'type:{"type":"lower"}')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'type:{"type":"lower"}')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'type:{"type":"lower"}')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'type:{"type":"lower"}')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'type:{"type":"lower"}')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"lower"}')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'type:{"type":"lower"}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"lower"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"lower"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"lower"}')).toBe(toBe);
        });
    });
});

/**
 * Print - Check for printable character(s)
 */
describe('type[type:print]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"print"}')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'type:{"type":"print"}')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'type:{"type":"print"}')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'type:{"type":"print"}')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'type:{"type":"print"}')).toBe(toBe);
        });

        test('String "20"', () => {
            expect(abv.isValidWithErrorMessage("20", 'type:{"type":"print"}')).toBe(toBe);
        });

        test('String "10.25"', () => {
            expect(abv.isValidWithErrorMessage("10.25", 'type:{"type":"print"}')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"print"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type print.";

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'type:{"type":"print"}')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'type:{"type":"print"}')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'type:{"type":"print"}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"print"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"print"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"print"}')).toBe(toBe);
        });
    });
});

/**
 * Punct - Check for any printable character which is not whitespace or an alphanumeric character
 */
describe('type[type:punct]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"punct"}')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'type:{"type":"punct"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type punct.";

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'type:{"type":"punct"}')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'type:{"type":"punct"}')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'type:{"type":"punct"}')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'type:{"type":"punct"}')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'type:{"type":"punct"}')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'type:{"type":"punct"}')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"punct"}')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'type:{"type":"punct"}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"punct"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"punct"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"punct"}')).toBe(toBe);
        });
    });
});

/**
 * Space - Check for whitespace character(s)
 */
describe('type[type:space]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"space"}')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValidWithErrorMessage("\r\n\t", 'type:{"type":"space"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type space.";

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'type:{"type":"space"}')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'type:{"type":"space"}')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'type:{"type":"space"}')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'type:{"type":"space"}')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'type:{"type":"space"}')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'type:{"type":"space"}')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'type:{"type":"space"}')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"space"}')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'type:{"type":"space"}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"space"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"space"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"space"}')).toBe(toBe);
        });
    });
});

/**
 * Upper - Check for uppercase character(s)
 */
describe('type[type:upper]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('String "GTEFFGGS"', () => {
            expect(abv.isValidWithErrorMessage("GTEFFGGS", 'type:{"type":"upper"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type upper.";

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValidWithErrorMessage("\r\n\t", 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"upper"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"upper"}')).toBe(toBe);
        });
    });
});

/**
 * Xdigit - Check for character(s) representing a hexadecimal digit
 */
describe('type[type:xdigit]', () => {
    describe('Is Valid', () => {
        let toBe = null;

        test('Null', () => {
            expect(abv.isValidWithErrorMessage(null, 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('String "20"', () => {
            expect(abv.isValidWithErrorMessage("20", 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('String "AB2569"', () => {
            expect(abv.isValidWithErrorMessage("AB2569", 'type:{"type":"xdigit"}')).toBe(toBe);
        });
    });

    describe('Is Invalid', () => {
        let toBe = "This value should be of type xdigit.";

        test('20', () => {
            expect(abv.isValidWithErrorMessage(20, 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('String "GTEFFGGS"', () => {
            expect(abv.isValidWithErrorMessage("GTEFFGGS", 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('String "\\r\\n\\t"', () => {
            expect(abv.isValidWithErrorMessage("\r\n\t", 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('String "*&$()"', () => {
            expect(abv.isValidWithErrorMessage('*&$()', 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('String "loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('loremipsum', 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('String "lorem25$fcse97ipsum"', () => {
            expect(abv.isValidWithErrorMessage('lorem25$fcse97ipsum', 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('String "Loremipsum"', () => {
            expect(abv.isValidWithErrorMessage('Loremipsum', 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('String "AbF26Fg69H"', () => {
            expect(abv.isValidWithErrorMessage('AbF26Fg69H', 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('10.25', () => {
            expect(abv.isValidWithErrorMessage(10.25, 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('String with space(s)', () => {
            expect(abv.isValidWithErrorMessage('Lorem ipsum', 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('String with unprintable character(s)', () => {
            expect(abv.isValidWithErrorMessage("\r fsd \tf \n", 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('Function', () => {
            expect(abv.isValidWithErrorMessage(function () {}, 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('Object', () => {
            expect(abv.isValidWithErrorMessage({}, 'type:{"type":"xdigit"}')).toBe(toBe);
        });

        test('Array', () => {
            expect(abv.isValidWithErrorMessage([], 'type:{"type":"xdigit"}')).toBe(toBe);
        });
    });
});