var TypeValidator = require('../Classes/TypeValidator');

var isArray = function(data){
    var _validator = new TypeValidator({
        'type': 'array'
    });

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isArray;