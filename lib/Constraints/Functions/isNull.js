var IsNullValidator = require('../Classes/IsNullValidator');

var isNull = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new IsNullValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isNull;