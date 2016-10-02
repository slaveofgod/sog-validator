var _v = require('../index');

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
        _function(true, {'min': 5, 'max': 10}),
        _function(false, {'min': 5, 'max': 10}),
        _function(new Object(), {'min': 5, 'max': 10})
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

exports['test isEqualTo'] = function(assert, done) {
    var _function = _v.func.isEqualTo;
    var positive, negative;

    positive = [
        _function(10, {'value': 10}),
        _function('10', {'value': 10})
    ];

    negative = [
        _function(11, {'value': 10}),
        _function('11', {'value': 10})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isNotEqualTo'] = function(assert, done) {
    var _function = _v.func.isNotEqualTo;
    var positive, negative;

    positive = [
        _function(11, {'value': 10}),
        _function('11', {'value': 10})
    ];

    negative = [
        _function(10, {'value': 10}),
        _function('10', {'value': 10})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isIdenticalTo'] = function(assert, done) {
    var _function = _v.func.isIdenticalTo;
    var positive, negative;

    positive = [
        _function(10, {'value': 10})
    ];

    negative = [
        _function('10', {'value': 10})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isNotIdenticalTo'] = function(assert, done) {
    var _function = _v.func.isNotIdenticalTo;
    var positive, negative;

    positive = [
        _function('10', {'value': 10})
    ];

    negative = [
        _function(10, {'value': 10})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isLessThan'] = function(assert, done) {
    var _function = _v.func.isLessThan;
    var positive, negative;

    positive = [
        _function('9', {'value': 10}),
        _function(9, {'value': 10}),
        _function(new Date(2015, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)})
    ];

    negative = [
        _function('10', {'value': 10}),
        _function(10, {'value': 10}),
        _function(new Date(2016, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)}),
        _function(new Date(2017, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isLessThanOrEqual'] = function(assert, done) {
    var _function = _v.func.isLessThanOrEqual;
    var positive, negative;

    positive = [
        _function('9', {'value': 10}),
        _function(9, {'value': 10}),
        _function('10', {'value': 10}),
        _function(10, {'value': 10}),
        _function(new Date(2015, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)}),
        _function(new Date(2016, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)})
    ];

    negative = [
        _function('11', {'value': 10}),
        _function(11, {'value': 10}),
        _function(new Date(2017, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isGreaterThan'] = function(assert, done) {
    var _function = _v.func.isGreaterThan;
    var positive, negative;

    positive = [
        _function('11', {'value': 10}),
        _function(11, {'value': 10}),
        _function(new Date(2017, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)})
    ];

    negative = [
        _function('9', {'value': 10}),
        _function(9, {'value': 10}),
        _function(new Date(2015, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)}),
        _function(new Date(2016, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isGreaterThanOrEqual'] = function(assert, done) {
    var _function = _v.func.isGreaterThanOrEqual;
    var positive, negative;

    positive = [
        _function('10', {'value': 10}),
        _function(10, {'value': 10}),
        _function('11', {'value': 10}),
        _function(11, {'value': 10}),
        _function(new Date(2016, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)}),
        _function(new Date(2017, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)})
    ];

    negative = [
        _function('9', {'value': 10}),
        _function(9, {'value': 10}),
        _function(new Date(2015, 0, 1, 0, 0, 0, 0), {'value': new Date(2016, 0, 1, 0, 0, 0, 0)})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isLanguage'] = function(assert, done) {
    var _function = _v.func.isLanguage;
    var positive, negative;

    positive = [
        _function('njo'),
        _function('de_at'),
        _function('bar'),
        _function('ksh')
    ];

    negative = [
        _function('fgt'),
        _function('egh'),
        _function('oth')
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isLocale'] = function(assert, done) {
    var _function = _v.func.isLocale;
    var positive, negative;

    positive = [
        _function('af_ZA'),
        _function('sq'),
        _function('ar_SD'),
        _function('bs_Latn_BA'),
        _function('ms_BN'),
        _function('sr_Cyrl_RS')
    ];

    negative = [
        _function('fgt_US'),
        _function('egh_GB'),
        _function('oth_CA')
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isCountry'] = function(assert, done) {
    var _function = _v.func.isCountry;
    var positive, negative;

    positive = [
        _function('AD'),
        _function('BD'),
        _function('BO'),
        _function('IC'),
        _function('CR'),
        _function('FR')
    ];

    negative = [
        _function('fgt_US'),
        _function('egh_GB'),
        _function('oth_CA')
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isPregMatch'] = function(assert, done) {
    var _function = _v.func.isPregMatch;
    var positive, negative;

    positive = [
        _function('email@domain.com', {'pattern': /^.+\@\S+\.\S+$/})
    ];

    negative = [
        _function('Lorem Ipsum', {'pattern': /^.+\@\S+\.\S+$/})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isUuid'] = function(assert, done) {
    var _function = _v.func.isUuid;
    var positive, negative;

    positive = [
        _function('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', {'versions': [1,2,3,4,5], 'strict': false}),
        _function('644e1dd7-2a7f-18fb-b8ed-ed78c3f92c2b', {'versions': [1], 'strict': true}),
        _function('6ba7b810-9dad-11d1-80b4-00c04fd430c8', {'versions': [1], 'strict': true}),
        _function('f47ac10b-58cc-4372-a567-0e02b2c3d479', {'versions': [4], 'strict': true})
    ];

    negative = [
        _function('216f-ff40-98d9-11e3-a5e2-0800-200c-9a66', {'versions': [1,2,3,4,5], 'strict': true}),
        _function('644e1dd7-2a7f-18fb-b8ed-ed78c3f92c2b', {'versions': [2], 'strict': true}),
        _function('6ba7b810-9dad-11d1-80b4-00c04fd430c8', {'versions': [2], 'strict': true}),
        _function('f47ac10b-58cc-4372-a567-0e02b2c3d479', {'versions': [5], 'strict': true})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isRange'] = function(assert, done) {
    var _function = _v.func.isRange;
    var positive, negative;

    positive = [
        _function('1', {'min': 1, 'max': 100}),
        _function(1, {'min': 1, 'max': 100}),
        _function(10.25, {'min': 10.25, 'max': 86.69}),
        _function(86.69, {'min': 10.25, 'max': 86.69}),
        _function('10.25', {'min': 10.25, 'max': 86.69}),
        _function('86.69', {'min': 10.25, 'max': 86.69}),
        _function(new Date(2015, 0, 1, 0, 0, 0, 0), {'min': new Date(2015, 0, 1, 0, 0, 0, 0), 'max': new Date(2017, 0, 1, 0, 0, 0, 0)}),
        _function(new Date(2017, 0, 1, 0, 0, 0, 0), {'min': new Date(2015, 0, 1, 0, 0, 0, 0), 'max': new Date(2017, 0, 1, 0, 0, 0, 0)}),
        _function(new Date(2016, 0, 1, 0, 0, 0, 0), {'min': new Date(2015, 0, 1, 0, 0, 0, 0), 'max': new Date(2017, 0, 1, 0, 0, 0, 0)})
    ];

    negative = [
        _function('9', {'min': 10, 'max': 100}),
        _function('101', {'min': 10, 'max': 100}),
        _function(10.24, {'min': 10.25, 'max': 86.69}),
        _function(86.70, {'min': 10.25, 'max': 86.69}),
        _function('10.24', {'min': 10.25, 'max': 86.69}),
        _function('86.70', {'min': 10.25, 'max': 86.69}),
        _function(new Date(2014, 0, 1, 0, 0, 0, 0), {'min': new Date(2015, 0, 1, 0, 0, 0, 0), 'max': new Date(2017, 0, 1, 0, 0, 0, 0)}),
        _function(new Date(2018, 0, 1, 0, 0, 0, 0), {'min': new Date(2015, 0, 1, 0, 0, 0, 0), 'max': new Date(2017, 0, 1, 0, 0, 0, 0)}),
        _function(86.69, {'min': new Date(2015, 0, 1, 0, 0, 0, 0), 'max': new Date(2017, 0, 1, 0, 0, 0, 0)}),
        _function('86.69', {'min': new Date(2015, 0, 1, 0, 0, 0, 0), 'max': new Date(2017, 0, 1, 0, 0, 0, 0)})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isDateFormat'] = function(assert, done) {
    var _function = _v.func.isDateFormat;
    var positive, negative;

    positive = [
        _function('2015-11-25', {'format': 'YYYY-MM-DD'}),
        _function('25-11-2015', {'format': 'DD-MM-YYYY'})
    ];

    negative = [
        _function('25-11-2015', {'format': 'YYYY-MM-DD'}),
        _function(123456789, {'format': 'YYYY-MM-DD'}),
        _function('123456789', {'format': 'YYYY-MM-DD'}),
        _function(new Date(2015, 0, 1, 0, 0, 0, 0), {'format': 'YYYY-MM-DD'})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isDateTimeFormat'] = function(assert, done) {
    var _function = _v.func.isDateTimeFormat;
    var positive, negative;

    positive = [
        _function('2015-11-25 22:45:35', {'format': 'YYYY-MM-DD HH:mm:ss'}),
        _function('2015-11-25 22:45', {'format': 'YYYY-MM-DD HH:mm'}),
        _function('11-2015-25 45:22:59', {'format': 'MM-YYYY-DD mm:HH:ss'})
    ];

    negative = [
        _function('2015-11-25', {'format': 'YYYY-MM-DD HH:mm:ss'}),
        _function('22:45:35', {'format': 'YYYY-MM-DD HH:mm:ss'}),
        _function(123456789, {'format': 'YYYY-MM-DD HH:mm:ss'}),
        _function('123456789', {'format': 'YYYY-MM-DD HH:mm:ss'}),
        _function('2015-11-25 22:45:35', {'format': 'MM-YYYY-DD mm:HH:ss'}),
        _function(new Date(2015, 0, 1, 0, 0, 0, 0), {'format': 'YYYY-MM-DD HH:mm:ss'})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isTimeFormat'] = function(assert, done) {
    var _function = _v.func.isTimeFormat;
    var positive, negative;

    positive = [
        _function('22:45:35', {'format': 'HH:mm:ss'}),
        _function('22:45', {'format': 'HH:mm'}),
        _function('45:22:59', {'format': 'mm:HH:ss'})
    ];

    negative = [
        _function('2015-11-25', {'format': 'HH:mm:ss'}),
        _function(123456789, {'format': 'HH:mm:ss'}),
        _function('123456789', {'format': 'HH:mm:ss'}),
        _function('2015-11-25 22:45:35', {'format': 'mm:HH:ss'}),
        _function(new Date(2015, 0, 1, 0, 0, 0, 0), {'format': 'HH:mm:ss'})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isCount'] = function(assert, done) {
    var _function = _v.func.isCount;
    var positive, negative;

    positive = [
        _function([1,2,3,4,5], {'min': 5, 'max': 10}),
        _function([1,2,3,4,5,6], {'min': 5, 'max': 10}),
        _function([1,2,3,4,5,6,7,8,9], {'min': 5, 'max': 10}),
        _function([1,2,3,4,5,6,7,8,9,10], {'min': 5, 'max': 10}),
        _function([1,2,3,4,5], {'min': 5, 'max': 5})
    ];

    negative = [
        _function('abcdef', {'min': 5, 'max': 10}),
        _function(1234567890, {'min': 5, 'max': 10}),
        _function(new Object(), {'min': 5, 'max': 10}),
        _function([1,2,3,4], {'min': 5, 'max': 10}),
        _function([1,2,3,4,5,6,7,8,9,10, 11], {'min': 5, 'max': 10}),
        _function([1,2,3,4,5,6], {'min': 5, 'max': 5}),
        _function([1,2,3,4], {'min': 5, 'max': 5})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isIn'] = function(assert, done) {
    var _function = _v.func.isIn;
    var positive, negative;

    positive = [
        _function(3333, {'choices': [1111, 'aaaaa', '3333', '123a']}),
        _function(3333, {'choices': [1111, 'aaaaa', 3333, '123a']}),
        _function('3333', {'choices': [1111, 'aaaaa', 3333, '123a']}),
        _function(3333, {'choices': [1111, 'aaaaa', 3333, '123a'], 'strict': true})
    ];

    negative = [
        _function(3333, {'choices': [1111, 'aaaaa', '3333', '123a'], 'strict': true}),
        _function('3333', {'choices': [1111, 'aaaaa', 3333, '123a'], 'strict': true}),
        _function('abcd', {'choices': [1111, 'aaaaa', 3333, '123a']}),
        _function(1234, {'choices': [1111, 'aaaaa', 3333, '123a']}),
        _function(new Object(), {'choices': [1111, 'aaaaa', 3333, '123a']})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isInMultiple'] = function(assert, done) {
    var _function = _v.func.isInMultiple;
    var positive, negative;

    positive = [
        _function([3333, 5678], {'choices': [1111, 'aaaaa', '3333', '123a', 'bbbb', '12ab', 1234, '5678'], 'min': 2, 'max': 4}),
        _function([3333, 'aaaaa', 5678, '12ab'], {'choices': [1111, 'aaaaa', '3333', '123a', 'bbbb', '12ab', 1234, '5678'], 'min': 2, 'max': 4}),
        _function(['3333', '5678'], {'choices': [1111, 'aaaaa', '3333', '123a', 'bbbb', '12ab', 1234, '5678'], 'min': 2, 'max': 4, 'strict': true})
    ];

    negative = [
        _function([3333, 'aaaaa', 5678], {'choices': [1111, 'aaaaa', '3333', '123a', 'bbbb', '12ab', 1234, '5678'], 'min': 2, 'max': 4, 'strict': true}),
        _function([1111, 'aaaaa', '3333', '123a', 'bbbb', '12ab', 1234, '5678'], {'choices': [1111, 'aaaaa', '3333', '123a', 'bbbb', '12ab', 1234, '5678'], 'min': 2, 'max': 4, 'strict': true}),
        _function([3333], {'choices': [1111, 'aaaaa', '3333', '123a', 'bbbb', '12ab', 1234, '5678'], 'min': 2, 'max': 4, 'strict': true}),
        _function(1234, {'choices': [1111, 'aaaaa', '3333', '123a', 'bbbb', '12ab', 1234, '5678'], 'min': 2, 'max': 4, 'strict': true})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isBic'] = function(assert, done) {
    var _function = _v.func.isBic;
    var positive, negative;

    positive = [
        _function('DABAIE2D'),
        _function('MIDLGB22'),
        _function('MIDLGB2103J')
    ];

    negative = [
        _function('123456789'),
        _function('abcdef'),
        _function(123456789)
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isCardScheme'] = function(assert, done) {
    var _function = _v.func.isCardScheme;
    var positive, negative;

    positive = [
        _function('4111111111111111', {'schemes': ['AMEX', 'CHINA_UNIONPAY', 'DINERS', 'DISCOVER', 'INSTAPAYMENT', 'JCB', 'LASER', 'MAESTRO', 'MASTERCARD', 'VISA']}),
        _function('378282246310005', {'schemes': ['AMEX']}),
        _function('371449635398431', {'schemes': ['AMEX']}),
        _function('378734493671000', {'schemes': ['AMEX']}),
        _function('30569309025904', {'schemes': ['DINERS']}),
        _function('38520000023237', {'schemes': ['DINERS']}),
        _function('6011111111111117', {'schemes': ['DISCOVER']}),
        _function('6011000990139424', {'schemes': ['DISCOVER']}),
        _function('3530111333300000', {'schemes': ['JCB']}),
        _function('3566002020360505', {'schemes': ['JCB']}),
        _function('5555555555554444', {'schemes': ['MASTERCARD']}),
        _function('5105105105105100', {'schemes': ['MASTERCARD']}),
        _function('4111111111111111', {'schemes': ['VISA']}),
        _function('4012888888881881', {'schemes': ['VISA']})
    ];

    negative = [
        _function('5555555555554444', {'schemes': ['VISA']}),
        _function('5105105105105100', {'schemes': ['VISA']}),
        _function('4111111111111111', {'schemes': ['MASTERCARD']}),
        _function('4012888888881881', {'schemes': ['MASTERCARD']})
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isCurrency'] = function(assert, done) {
    var _function = _v.func.isCurrency;
    var positive, negative;

    positive = [
        _function('AFN'),
        _function('COP'),
        _function('RUB'),
        _function('USD')
    ];

    negative = [
        _function('AAA'),
        _function('BBB'),
        _function('CCC'),
        _function('DDD')
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isLuhn'] = function(assert, done) {
    var _function = _v.func.isLuhn;
    var positive, negative;

    positive = [
        _function('79927398713')
    ];

    negative = [
        _function('12345678985'),
        _function(new Object()),
        _function([1111,2222])
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isIban'] = function(assert, done) {
    var _function = _v.func.isIban;
    var positive, negative;

    positive = [
        _function('DE44 5001 0517 5407 3249 31'),
        _function('GR16 0110 1250 0000 0001 2300 695'),
        _function('GB29 NWBK 6016 1331 9268 19'),
        _function('SA03 8000 0000 6080 1016 7519'),
        _function('CH93 0076 2011 6238 5295 7'),
        _function('TR33 0006 1005 1978 6457 8413 26')
    ];

    negative = [
        _function('TR44 5001 0517 5407 3249 31'),
        _function('DE16 0110 1250 0000 0001 2300 695'),
        _function('GR29 NWBK 6016 1331 9268 19'),
        _function('GB03 8000 0000 6080 1016 7519'),
        _function('SA93 0076 2011 6238 5295 7'),
        _function('CH33 0006 1005 1978 6457 8413 26'),
        _function(new Object()),
        _function(1234567890),
        _function('Mauris fermentum arcu rhoncus eros convallis vulputate.')
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isIsbn'] = function(assert, done) {
    var _function = _v.func.isIsbn;
    var positive, negative;

    positive = [
        _function('978-1-56619-909-4'),
        _function('1-56619-909-3'),
        _function('978-1-56619-909-4', {'type': 'isbn13'}),
        _function('1-56619-909-3', {'type': 'isbn10'})
    ];

    negative = [
        _function('978-1-56619-909-4', {'type': 'isbn10'}),
        _function('1-56619-909-3', {'type': 'isbn13'}),
        _function('Mauris fermentum arcu rhoncus eros convallis vulputate.'),
        _function(new Object()),
        _function(1234567890)
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isIssn'] = function(assert, done) {
    var _function = _v.func.isIssn;
    var positive, negative;

    positive = [
        _function('0028-0836'),
        _function('0028-0836', {'caseSensitive': false, 'requireHyphen': false}),
        _function('0028-0836', {'caseSensitive': true, 'requireHyphen': true}),
        _function('0317-8471'),
        _function('2434-561X'),
        _function('2434561X'),
        _function('2434561X', {'requireHyphen': false})
    ];

    negative = [
        _function('2434561X', {'requireHyphen': true}),
        _function('Mauris fermentum arcu rhoncus eros convallis vulputate.'),
        _function(new Object()),
        _function(1234567890)
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}

exports['test isUniqueEntity'] = function(assert, done) {
    var _function = _v.func.isUniqueEntity;
    var positive, negative;

    positive = [
        _function({"id":16,"first_name":"Tammy","last_name":"Montgomery","email":"tmontgomeryf@tinyurl.com"}, {
            'fields': ['first_name', 'email'],
            'repositoryData':[
                {"id":1,"first_name":"Diana","last_name":"Simmons","email":"dsimmons0@google.com"},
                {"id":2,"first_name":"Earl","last_name":"Hunt","email":"ehunt1@wp.com"},
                {"id":3,"first_name":"Kathy","last_name":"Day","email":"kday2@dagondesign.com"},
                {"id":4,"first_name":"Andrew","last_name":"Gilbert","email":"agilbert3@ft.com"},
                {"id":5,"first_name":"Matthew","last_name":"Watkins","email":"mwatkins4@freewebs.com"},
                {"id":6,"first_name":"Phillip","last_name":"Burke","email":"pburke5@unc.edu"},
                {"id":7,"first_name":"Ashley","last_name":"James","email":"ajames6@oaic.gov.au"},
                {"id":8,"first_name":"Roger","last_name":"Franklin","email":"rfranklin7@phpbb.com"},
                {"id":9,"first_name":"Randy","last_name":"Shaw","email":"rshaw8@google.fr"},
                {"id":10,"first_name":"Marie","last_name":"Perez","email":"mperez9@mozilla.org"},
                {"id":11,"first_name":"Jennifer","last_name":"Kennedy","email":"jkennedya@sciencedaily.com"},
                {"id":12,"first_name":"Carol","last_name":"Butler","email":"cbutlerb@mac.com"},
                {"id":13,"first_name":"Angela","last_name":"Morrison","email":"amorrisonc@cbsnews.com"},
                {"id":14,"first_name":"Stephanie","last_name":"Mitchell","email":"smitchelld@free.fr"},
                {"id":15,"first_name":"Henry","last_name":"Ramos","email":"hramose@ibm.com"}
            ]
        }),
        _function({"id":16,"first_name":"Tammy","last_name":"Montgomery","email":"tmontgomeryf@tinyurl.com"}, {
            'fields': ['first_name'],
            'repositoryData':[
                {"id":1,"first_name":"Diana","last_name":"Simmons","email":"dsimmons0@google.com"},
                {"id":2,"first_name":"Earl","last_name":"Hunt","email":"ehunt1@wp.com"},
                {"id":3,"first_name":"Kathy","last_name":"Day","email":"kday2@dagondesign.com"},
                {"id":4,"first_name":"Andrew","last_name":"Gilbert","email":"agilbert3@ft.com"},
                {"id":5,"first_name":"Matthew","last_name":"Watkins","email":"mwatkins4@freewebs.com"},
                {"id":6,"first_name":"Phillip","last_name":"Burke","email":"pburke5@unc.edu"},
                {"id":7,"first_name":"Ashley","last_name":"James","email":"ajames6@oaic.gov.au"},
                {"id":8,"first_name":"Roger","last_name":"Franklin","email":"rfranklin7@phpbb.com"},
                {"id":9,"first_name":"Randy","last_name":"Shaw","email":"rshaw8@google.fr"},
                {"id":10,"first_name":"Marie","last_name":"Perez","email":"mperez9@mozilla.org"},
                {"id":11,"first_name":"Jennifer","last_name":"Kennedy","email":"jkennedya@sciencedaily.com"},
                {"id":12,"first_name":"Carol","last_name":"Butler","email":"cbutlerb@mac.com"},
                {"id":13,"first_name":"Angela","last_name":"Morrison","email":"amorrisonc@cbsnews.com"},
                {"id":14,"first_name":"Stephanie","last_name":"Mitchell","email":"smitchelld@free.fr"},
                {"id":15,"first_name":"Henry","last_name":"Ramos","email":"hramose@ibm.com"}
            ]
        })
    ];

    negative = [
        _function({"id":15,"first_name":"Henry","last_name":"Ramos","email":"hramose@ibm.com"}, {
            'fields': ['first_name', 'email'],
            'repositoryData':[
                {"id":1,"first_name":"Diana","last_name":"Simmons","email":"dsimmons0@google.com"},
                {"id":2,"first_name":"Earl","last_name":"Hunt","email":"ehunt1@wp.com"},
                {"id":3,"first_name":"Kathy","last_name":"Day","email":"kday2@dagondesign.com"},
                {"id":4,"first_name":"Andrew","last_name":"Gilbert","email":"agilbert3@ft.com"},
                {"id":5,"first_name":"Matthew","last_name":"Watkins","email":"mwatkins4@freewebs.com"},
                {"id":6,"first_name":"Phillip","last_name":"Burke","email":"pburke5@unc.edu"},
                {"id":7,"first_name":"Ashley","last_name":"James","email":"ajames6@oaic.gov.au"},
                {"id":8,"first_name":"Roger","last_name":"Franklin","email":"rfranklin7@phpbb.com"},
                {"id":9,"first_name":"Randy","last_name":"Shaw","email":"rshaw8@google.fr"},
                {"id":10,"first_name":"Marie","last_name":"Perez","email":"mperez9@mozilla.org"},
                {"id":11,"first_name":"Jennifer","last_name":"Kennedy","email":"jkennedya@sciencedaily.com"},
                {"id":12,"first_name":"Carol","last_name":"Butler","email":"cbutlerb@mac.com"},
                {"id":13,"first_name":"Angela","last_name":"Morrison","email":"amorrisonc@cbsnews.com"},
                {"id":14,"first_name":"Stephanie","last_name":"Mitchell","email":"smitchelld@free.fr"},
                {"id":15,"first_name":"Henry","last_name":"Ramos","email":"hramose@ibm.com"}
            ]
        }),
        _function("Mauris fermentum arcu rhoncus eros convallis vulputate.", {
            'fields': ['first_name', 'email'],
            'repositoryData':[
                {"id":1,"first_name":"Diana","last_name":"Simmons","email":"dsimmons0@google.com"},
                {"id":2,"first_name":"Earl","last_name":"Hunt","email":"ehunt1@wp.com"},
                {"id":3,"first_name":"Kathy","last_name":"Day","email":"kday2@dagondesign.com"},
                {"id":4,"first_name":"Andrew","last_name":"Gilbert","email":"agilbert3@ft.com"},
                {"id":5,"first_name":"Matthew","last_name":"Watkins","email":"mwatkins4@freewebs.com"},
                {"id":6,"first_name":"Phillip","last_name":"Burke","email":"pburke5@unc.edu"},
                {"id":7,"first_name":"Ashley","last_name":"James","email":"ajames6@oaic.gov.au"},
                {"id":8,"first_name":"Roger","last_name":"Franklin","email":"rfranklin7@phpbb.com"},
                {"id":9,"first_name":"Randy","last_name":"Shaw","email":"rshaw8@google.fr"},
                {"id":10,"first_name":"Marie","last_name":"Perez","email":"mperez9@mozilla.org"},
                {"id":11,"first_name":"Jennifer","last_name":"Kennedy","email":"jkennedya@sciencedaily.com"},
                {"id":12,"first_name":"Carol","last_name":"Butler","email":"cbutlerb@mac.com"},
                {"id":13,"first_name":"Angela","last_name":"Morrison","email":"amorrisonc@cbsnews.com"},
                {"id":14,"first_name":"Stephanie","last_name":"Mitchell","email":"smitchelld@free.fr"},
                {"id":15,"first_name":"Henry","last_name":"Ramos","email":"hramose@ibm.com"}
            ]
        }),
        _function(new Object(), {
            'fields': ['first_name', 'email'],
            'repositoryData':[
                {"id":1,"first_name":"Diana","last_name":"Simmons","email":"dsimmons0@google.com"},
                {"id":2,"first_name":"Earl","last_name":"Hunt","email":"ehunt1@wp.com"},
                {"id":3,"first_name":"Kathy","last_name":"Day","email":"kday2@dagondesign.com"},
                {"id":4,"first_name":"Andrew","last_name":"Gilbert","email":"agilbert3@ft.com"},
                {"id":5,"first_name":"Matthew","last_name":"Watkins","email":"mwatkins4@freewebs.com"},
                {"id":6,"first_name":"Phillip","last_name":"Burke","email":"pburke5@unc.edu"},
                {"id":7,"first_name":"Ashley","last_name":"James","email":"ajames6@oaic.gov.au"},
                {"id":8,"first_name":"Roger","last_name":"Franklin","email":"rfranklin7@phpbb.com"},
                {"id":9,"first_name":"Randy","last_name":"Shaw","email":"rshaw8@google.fr"},
                {"id":10,"first_name":"Marie","last_name":"Perez","email":"mperez9@mozilla.org"},
                {"id":11,"first_name":"Jennifer","last_name":"Kennedy","email":"jkennedya@sciencedaily.com"},
                {"id":12,"first_name":"Carol","last_name":"Butler","email":"cbutlerb@mac.com"},
                {"id":13,"first_name":"Angela","last_name":"Morrison","email":"amorrisonc@cbsnews.com"},
                {"id":14,"first_name":"Stephanie","last_name":"Mitchell","email":"smitchelld@free.fr"},
                {"id":15,"first_name":"Henry","last_name":"Ramos","email":"hramose@ibm.com"}
            ]
        }),
        _function(new Array(), {
            'fields': ['first_name', 'email'],
            'repositoryData':[
                {"id":1,"first_name":"Diana","last_name":"Simmons","email":"dsimmons0@google.com"},
                {"id":2,"first_name":"Earl","last_name":"Hunt","email":"ehunt1@wp.com"},
                {"id":3,"first_name":"Kathy","last_name":"Day","email":"kday2@dagondesign.com"},
                {"id":4,"first_name":"Andrew","last_name":"Gilbert","email":"agilbert3@ft.com"},
                {"id":5,"first_name":"Matthew","last_name":"Watkins","email":"mwatkins4@freewebs.com"},
                {"id":6,"first_name":"Phillip","last_name":"Burke","email":"pburke5@unc.edu"},
                {"id":7,"first_name":"Ashley","last_name":"James","email":"ajames6@oaic.gov.au"},
                {"id":8,"first_name":"Roger","last_name":"Franklin","email":"rfranklin7@phpbb.com"},
                {"id":9,"first_name":"Randy","last_name":"Shaw","email":"rshaw8@google.fr"},
                {"id":10,"first_name":"Marie","last_name":"Perez","email":"mperez9@mozilla.org"},
                {"id":11,"first_name":"Jennifer","last_name":"Kennedy","email":"jkennedya@sciencedaily.com"},
                {"id":12,"first_name":"Carol","last_name":"Butler","email":"cbutlerb@mac.com"},
                {"id":13,"first_name":"Angela","last_name":"Morrison","email":"amorrisonc@cbsnews.com"},
                {"id":14,"first_name":"Stephanie","last_name":"Mitchell","email":"smitchelld@free.fr"},
                {"id":15,"first_name":"Henry","last_name":"Ramos","email":"hramose@ibm.com"}
            ]
        })
    ];

    positive.forEach(function (value) {
        assert.equal(value, true, 'Positive conditions')
    })

    negative.forEach(function (value) {
        assert.notEqual(value, true, 'Negative conditions')
    })

    done();
}








if (module == require.main) require('test').run(exports);