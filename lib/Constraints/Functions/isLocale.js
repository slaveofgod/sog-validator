var LocaleValidator = require('../Classes/LocaleValidator');

var isLocale = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new LocaleValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isLocale;