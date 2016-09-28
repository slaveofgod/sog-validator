var UuidValidator = require('../Classes/UuidValidator');

var isUuid = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new UuidValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isUuid;