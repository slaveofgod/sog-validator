var IsFalseValidator = require('../Classes/IsFalseValidator');

var isFalse = function(data){
    var _validator = new IsFalseValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isFalse;