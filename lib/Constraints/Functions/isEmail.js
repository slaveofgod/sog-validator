var EmailValidator = require('../Classes/EmailValidator');

var isEmail = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new EmailValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isEmail;