var BicValidator = require('../Classes/BicValidator');

var isBic = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new BicValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isBic;