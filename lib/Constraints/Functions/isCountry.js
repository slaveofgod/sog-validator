var CountryValidator = require('../Classes/CountryValidator');

var isCountry = function(data){
    var _validator = new CountryValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isCountry;