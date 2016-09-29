var IpValidator = require('../Classes/IpValidator');

var isIp = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new IpValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isIp;