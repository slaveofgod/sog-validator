var TypeValidator = require('../Classes/TypeValidator');

var isFloat = function(data){
    var _validator = new TypeValidator({
        'type': 'float'
    });

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isFloat;