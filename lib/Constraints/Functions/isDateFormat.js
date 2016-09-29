var DateValidator = require('../Classes/DateValidator');

var isDateFormat = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new DateValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isDateFormat;