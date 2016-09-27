var GreaterThanValidator = require('../Classes/GreaterThanValidator');

var isGreaterThan = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new GreaterThanValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isGreaterThan;