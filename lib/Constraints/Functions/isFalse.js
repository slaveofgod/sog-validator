var IsFalseValidator = require('../Classes/IsFalseValidator');

var isFalse = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new IsFalseValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isFalse;