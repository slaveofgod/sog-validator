var LessThanOrEqualValidator = require('../Classes/LessThanOrEqualValidator');

var isLessThanOrEqual = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new LessThanOrEqualValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isLessThanOrEqual;