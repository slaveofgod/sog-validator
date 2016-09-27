var NotBlankValidator = require('../Classes/NotBlankValidator');

var isNotBlank = function(data){
    var _validator = new NotBlankValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isNotBlank;