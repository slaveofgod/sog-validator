var IsTrueValidator = require('../Classes/IsTrueValidator');

var isTrue = function(data){
    var _validator = new IsTrueValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isTrue;