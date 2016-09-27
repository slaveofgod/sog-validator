var LocaleValidator = require('../Classes/LocaleValidator');

var isLocale = function(data){
    var _validator = new LocaleValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isLocale;