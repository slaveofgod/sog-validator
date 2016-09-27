var EmailValidator = require('../Classes/EmailValidator');

var isEmail = function(data){
    var _validator = new EmailValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isEmail;