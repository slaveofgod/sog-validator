var IsNullValidator = require('../Classes/IsNullValidator');

var isNull = function(data){
    var _validator = new IsNullValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isNull;