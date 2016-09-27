var LengthValidator = require('../Classes/LengthValidator');

var isLength = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new LengthValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isLength;