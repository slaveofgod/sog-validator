var IsTrueValidator = require('../Classes/IsTrueValidator');

var isTrue = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new IsTrueValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isTrue;