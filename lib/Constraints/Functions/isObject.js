var TypeValidator = require('../Classes/TypeValidator');

var isObject = function(data){
    var _validator = new TypeValidator({
        'type': 'object'
    });

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isObject;