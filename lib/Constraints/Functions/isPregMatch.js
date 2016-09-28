var RegexValidator = require('../Classes/RegexValidator');

var isPregMatch = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new RegexValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isPregMatch;