var CurrencyValidator = require('../Classes/CurrencyValidator');

var isCurrency = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new CurrencyValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isCurrency;