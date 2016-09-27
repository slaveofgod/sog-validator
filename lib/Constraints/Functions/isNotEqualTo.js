var NotEqualToValidator = require('../Classes/NotEqualToValidator');

var isNotEqualTo = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new NotEqualToValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isNotEqualTo;