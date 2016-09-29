var CountryValidator = require('../Classes/CountryValidator');

var isCountry = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new CountryValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isCountry;