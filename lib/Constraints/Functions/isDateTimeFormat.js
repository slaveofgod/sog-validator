var DateTimeValidator = require('../Classes/DateTimeValidator');

var isDateTimeFormat = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new DateTimeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isDateTimeFormat;