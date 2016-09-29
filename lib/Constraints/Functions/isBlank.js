var BlankValidator = require('../Classes/BlankValidator');

var isBlank = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new BlankValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isBlank;