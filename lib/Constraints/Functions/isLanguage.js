var LanguageValidator = require('../Classes/LanguageValidator');

var isLanguage = function(data){
    var _validator = new LanguageValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isLanguage;