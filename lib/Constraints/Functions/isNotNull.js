var NotNullValidator = require('../Classes/NotNullValidator');

var isNotNull = function(data){
    var _validator = new NotNullValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isNotNull;