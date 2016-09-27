var TypeValidator = require('../Classes/TypeValidator');

var isInt = function(data){
    var _validator = new TypeValidator({
        'type': 'int'
    });

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isInt;