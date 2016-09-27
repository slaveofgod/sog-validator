var IpValidator = require('../Classes/IpValidator');

var isIp = function(data){
    var _validator = new IpValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isIp;