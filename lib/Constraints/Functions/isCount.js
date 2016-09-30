var CountValidator = require('../Classes/CountValidator');

var isCount = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new CountValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isCount;