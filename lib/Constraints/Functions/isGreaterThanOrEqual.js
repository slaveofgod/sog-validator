var GreaterThanOrEqualValidator = require('../Classes/GreaterThanOrEqualValidator');

var isGreaterThanOrEqual = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new GreaterThanOrEqualValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isGreaterThanOrEqual;