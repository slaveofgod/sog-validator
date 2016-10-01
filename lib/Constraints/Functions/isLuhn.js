var LuhnValidator = require('../Classes/LuhnValidator');

var isLuhn = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new LuhnValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isLuhn;