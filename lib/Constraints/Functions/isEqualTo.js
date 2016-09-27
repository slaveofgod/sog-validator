var EqualToValidator = require('../Classes/EqualToValidator');

var isEqualTo = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new EqualToValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isEqualTo;