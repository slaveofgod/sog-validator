var _v = require('bob-validator');

exports['test isNotBlank'] = function(assert, done) {
    var _function = _v.func.isNotBlank;
    var positive, negative;

    positive = [
        _function('Lorem Ipsum')
    ];

    negative = [
        _function(''),
        _function(),
        _function(null)
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isBlank'] = function(assert, done) {
    var _function = _v.func.isBlank;
    var positive, negative;

    positive = [
        _function(''),
        _function(),
        _function(null)
    ];

    negative = [
        _function('Lorem Ipsum')
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isNotNull'] = function(assert, done) {
    var _function = _v.func.isNotNull;
    var positive, negative;

    positive = [
        _function('Lorem Ipsum'),
        _function(''),
        _function(false),
        _function()
    ];

    negative = [
        _function(null)
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isNull'] = function(assert, done) {
    var _function = _v.func.isNull;
    var positive, negative;

    positive = [
        _function(null)
    ];

    negative = [
        _function('Lorem Ipsum'),
        _function(''),
        _function(false),
        _function()
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isTrue'] = function(assert, done) {
    var _function = _v.func.isTrue;
    var positive, negative;

    positive = [
        _function(true),
        _function(1),
        _function('1'),
        _function("1")
    ];

    negative = [
        _function(false),
        _function(0),
        _function('0'),
        _function("0"),
        _function("Lorem Ipsum")
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isFalse'] = function(assert, done) {
    var _function = _v.func.isFalse;
    var positive, negative;

    positive = [
        _function(false),
        _function(0),
        _function('0'),
        _function("0"),
    ];

    negative = [
        _function(true),
        _function(1),
        _function('1'),
        _function("1"),
        _function("Lorem Ipsum")
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isArray'] = function(assert, done) {
    var _function = _v.func.isArray;
    var positive, negative;

    positive = [
        _function(new Array()),
        _function([]),
        _function([1111, 'aaaa']),
    ];

    negative = [
        _function(12345),
        _function('abcde'),
        _function('123.45'),
        _function(123.45),
        _function("Lorem Ipsum"),
        _function({})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isBool'] = function(assert, done) {
    var _function = _v.func.isBool;
    var positive, negative;

    positive = [
        _function(true),
        _function(false)
    ];

    negative = [
        _function(12345),
        _function('abcde'),
        _function('123.45'),
        _function(123.45),
        _function("Lorem Ipsum"),
        _function({}),
        _function(new Array()),
        _function([]),
        _function([1111, 'aaaa']),
        _function(1),
        _function(0),
        _function(null)
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isFloat'] = function(assert, done) {
    var _function = _v.func.isFloat;
    var positive, negative;

    positive = [
        _function(123.45)
    ];

    negative = [
        _function('123.45'),
        _function(12345),
        _function('abcde'),
        _function("Lorem Ipsum"),
        _function({}),
        _function(new Array()),
        _function([]),
        _function([1111, 'aaaa']),
        _function(1),
        _function(0),
        _function(null),
        _function(true),
        _function(false)
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isDouble'] = function(assert, done) {
    var _function = _v.func.isDouble;
    var positive, negative;

    positive = [
        _function(123.45)
    ];

    negative = [
        _function('123.45'),
        _function(12345),
        _function('abcde'),
        _function("Lorem Ipsum"),
        _function({}),
        _function(new Array()),
        _function([]),
        _function([1111, 'aaaa']),
        _function(1),
        _function(0),
        _function(null),
        _function(true),
        _function(false)
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isInt'] = function(assert, done) {
    var _function = _v.func.isInt;
    var positive, negative;

    positive = [
        _function(12345),
        _function(1),
        _function(0),
        _function('12345')
    ];

    negative = [
        _function('123.45'),
        _function(123.45),
        _function('abcde'),
        _function("Lorem Ipsum"),
        _function({}),
        _function(new Array()),
        _function([]),
        _function([1111, 'aaaa']),
        _function(null),
        _function(true),
        _function(false)
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isNumeric'] = function(assert, done) {
    var _function = _v.func.isNumeric;
    var positive, negative;

    positive = [
        _function(12345),
        _function(1),
        _function(0),
        _function('12345'),
        _function('123.45'),
        _function(123.45)
    ];

    negative = [
        _function('abcde'),
        _function("Lorem Ipsum"),
        _function({}),
        _function(new Array()),
        _function([]),
        _function([1111, 'aaaa']),
        _function(null),
        _function(true),
        _function(false)
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isObject'] = function(assert, done) {
    var _function = _v.func.isObject;
    var positive, negative;

    positive = [
        _function({}),
        _function(new Object()),
        _function({'aaa': 111, 'bbb': 222})
    ];

    negative = [
        _function(new Array()),
        _function('abcde'),
        _function("Lorem Ipsum"),
        _function([]),
        _function([1111, 'aaaa']),
        _function(null),
        _function(true),
        _function(false),
        _function(12345),
        _function(1),
        _function(0),
        _function('12345'),
        _function('123.45'),
        _function(123.45)
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isScalar'] = function(assert, done) {
    var _function = _v.func.isScalar;
    var positive, negative;

    positive = [
        _function(true),
        _function(false),
        _function(12345),
        _function(1),
        _function(0),
        _function('12345'),
        _function('123.45'),
        _function(123.45),
        _function('abcde'),
        _function("Lorem Ipsum")
    ];

    negative = [
        _function(new Array()),
        _function([]),
        _function([1111, 'aaaa']),
        _function(null),
        _function({}),
        _function(new Object()),
        _function({'aaa': 111, 'bbb': 222})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isString'] = function(assert, done) {
    var _function = _v.func.isString;
    var positive, negative;

    positive = [
        _function('12345'),
        _function('123.45'),
        _function('abcde'),
        _function("Lorem Ipsum")
    ];

    negative = [
        _function(123.45),
        _function(12345),
        _function(1),
        _function(0),
        _function(true),
        _function(false),
        _function(new Array()),
        _function([]),
        _function([1111, 'aaaa']),
        _function(null),
        _function({}),
        _function(new Object()),
        _function({'aaa': 111, 'bbb': 222})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isEmail'] = function(assert, done) {
    var _function = _v.func.isEmail;
    var positive, negative;

    positive = [
        _function('email@domain.com'),
        _function('firstname.lastname@domain.com'),
        _function('email@subdomain.domain.com'),
        _function('firstname+lastname@domain.com'),
        _function('email@[123.123.123.123]'),
        _function('“email”@domain.com'),
        _function('1234567890@domain.com'),
        _function('email@domain-one.com'),
        _function('_______@domain.com'),
        _function('email@domain.name'),
        _function('email@domain.co.jp'),
        _function('firstname-lastname@domain.com'),
        _function('あいうえお@domain.com'),
        _function('email@-domain.com'),
        _function('email@domain.web')
    ];

    negative = [
        _function('plainaddress'),
        _function('#@%^%#$@#$@#.com'),
        _function('@domain.com'),
        _function('Joe Smith <email@domain.com>'),
        _function('email.domain.com'),
        _function('email@domain@domain.com'),
        _function('.email@domain.com'),
        _function('email.@domain.com'),
        _function('email..email@domain.com'),
        _function('email@domain.com (Joe Smith)'),
        _function('email@domain'),
        _function('email@111.222.333.44444'),
        _function('email@domain..com')
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isLength'] = function(assert, done) {
    var _function = _v.func.isLength;
    var positive, negative;

    positive = [
        _function(12345, {'min': 5, 'max': 10}),
        _function(1234567, {'min': 5, 'max': 10}),
        _function(1234567890, {'min': 5, 'max': 10}),
        _function('12345', {'min': 5, 'max': 10}),
        _function('1234567', {'min': 5, 'max': 10}),
        _function('1234567890', {'min': 5, 'max': 10}),
        _function([1,2,3,4,5], {'min': 5, 'max': 10}),
        _function([1,2,3,4,5,6,7], {'min': 5, 'max': 10}),
        _function([1,2,3,4,5,6,7,8,9,10], {'min': 5, 'max': 10}),
        _function(new Array(1,2,3,4,5), {'min': 5, 'max': 10}),
        _function(new Array(1,2,3,4,5,6,7), {'min': 5, 'max': 10}),
        _function(new Array(1,2,3,4,5,6,7,8,9,10), {'min': 5, 'max': 10})
    ];

    negative = [
        _function(1234, {'min': 5, 'max': 10}),
        _function(12345678901, {'min': 5, 'max': 10}),
        _function([1,2,3,4], {'min': 5, 'max': 10}),
        _function([1,2,3,4,5,6,7,8,9,10,11], {'min': 5, 'max': 10}),
        _function(true),
        _function(false),
        _function(new Object())
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isUrl'] = function(assert, done) {
    var _function = _v.func.isUrl;
    var positive, negative;

    positive = [
        _function('http://foo.com/blah_blah'),
        _function('http://foo.com/blah_blah/'),
        _function('http://foo.com/blah_blah_(wikipedia)'),
        _function('http://foo.com/blah_blah_(wikipedia)_(again)'),
        _function('http://www.example.com/wpstyle/?p=364'),
        _function('https://www.example.com/foo/?bar=baz&inga=42&quux'),
        _function('http://userid:password@example.com:8080'),
        _function('http://userid:password@example.com:8080/'),
        _function('http://userid@example.com'),
        _function('http://userid@example.com/'),
        _function('http://userid@example.com:8080'),
        _function('http://userid@example.com:8080/'),
        _function('http://userid:password@example.com'),
        _function('http://userid:password@example.com/'),
        _function('http://142.42.1.1/'),
        _function('http://142.42.1.1:8080/'),
        _function('http://foo.com/blah_(wikipedia)#cite-1'),
        _function('http://foo.com/blah_(wikipedia)_blah#cite-1'),
        _function('http://foo.com/(something)?after=parens'),
        _function('http://code.google.com/events/#&product=browser'),
        _function('http://j.mp'),
        _function('ftp://foo.bar/baz'),
        _function('http://foo.bar/?q=Test%20URL-encoded%20stuff'),
        _function('http://1337.net'),
        _function('http://a.b-c.de'),
        _function('http://223.255.255.254')
    ];

    negative = [
        _function('http://'),
        _function('http://?'),
        _function('http://??'),
        _function('http://??/'),
        _function('http://#'),
        _function('http://##'),
        _function('http://##/'),
        _function('http://foo.bar?q=Spaces should be encoded'),
        _function('//'),
        _function('//a'),
        _function('///a'),
        _function('///'),
        _function('http:///a'),
        _function('foo.com'),
        _function('http:// shouldfail.com'),
        _function(':// should fail'),
        _function('http://foo.bar/foo(bar)baz quux')
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isIp'] = function(assert, done) {
    var _function = _v.func.isIp;
    var positive, negative;

    positive = [
        _function('200.200.200.200'),
        _function('0.0.0.0'),
        _function('00.00.00.00'),
        _function('100.100.020.100'),
        _function('255.255.255.255')
    ];

    negative = [
        _function(' 200.200.200.200'),
        _function('200.200.200.200 '),
        _function('200.200.256.200'),
        _function('200.200.200.200.'),
        _function('200.200.200'),
        _function('200.200.200.2d0'),
        _function('-1.0.0.0'),
        _function('200000000000000000000000000000000000000000000000000000000000000000000000000000.200.200.200'),
        _function('00000000000005.10.10.10'),
        _function('00AB:0002:3008:8CFD:00AB:0002:3008:8CFD'),
        _function('00ab:0002:3008:8cfd:00ab:0002:3008:8cfd'),
        _function('00aB:0002:3008:8cFd:00Ab:0002:3008:8cfD'),
        _function('00AB:00002:3008:8CFD:00AB:0002:3008:8CFD'),
        _function(':0002:3008:8CFD:00AB:0002:3008:8CFD'),
        _function('00AB:0002:3008:8CFD:00AB:0002:3008:'),
        _function('AB:02:3008:8CFD:AB:02:3008:8CFD'),
        _function('AB:02:3008:8CFD:AB:02:3008:8CFD:02'),
        _function('AB:02:3008:8CFD::02:3008:8CFD'),
        _function('AB:02:3008:8CFD::02:3008:8CFD:02'),
        _function('AB:02:3008:8CFD::02::8CFD'),
        _function('GB:02:3008:8CFD:AB:02:3008:8CFD'),
        _function('::'),
        _function('::1'),
        _function('0::'),
        _function('0::0'),
        _function('2:::3')
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}
































if (module == require.main) require('test').run(exports)