var TimeValidator = require('../Classes/TimeValidator');

var isTimeFormat = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new TimeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isTimeFormat;