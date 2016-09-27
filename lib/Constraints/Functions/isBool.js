var TypeValidator = require('../Classes/TypeValidator');

var isBool = function(data){
    var _validator = new TypeValidator({
        'type': 'bool'
    });

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isBool;