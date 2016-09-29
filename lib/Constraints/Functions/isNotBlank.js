var NotBlankValidator = require('../Classes/NotBlankValidator');

var isNotBlank = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new NotBlankValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isNotBlank;