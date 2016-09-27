var TypeValidator = require('../Classes/TypeValidator');

var isDouble = function(data){
    var _validator = new TypeValidator({
        'type': 'double'
    });

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isDouble;