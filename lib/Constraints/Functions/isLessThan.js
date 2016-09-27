var LessThanValidator = require('../Classes/LessThanValidator');

var isLessThan = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new LessThanValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isLessThan;