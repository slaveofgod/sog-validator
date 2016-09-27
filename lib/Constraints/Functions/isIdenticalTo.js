var IdenticalToValidator = require('../Classes/IdenticalToValidator');

var isIdenticalTo = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new IdenticalToValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isIdenticalTo;