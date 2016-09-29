var LanguageValidator = require('../Classes/LanguageValidator');

var isLanguage = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new LanguageValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isLanguage;