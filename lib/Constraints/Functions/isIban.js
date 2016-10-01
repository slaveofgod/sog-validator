var IbanValidator = require('../Classes/IbanValidator');

var isIban = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new IbanValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isIban;