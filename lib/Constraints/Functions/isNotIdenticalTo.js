var NotIdenticalToValidator = require('../Classes/NotIdenticalToValidator');

var isNotIdenticalTo = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new NotIdenticalToValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isNotIdenticalTo;