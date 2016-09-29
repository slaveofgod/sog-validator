var NotNullValidator = require('../Classes/NotNullValidator');

var isNotNull = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new NotNullValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isNotNull;