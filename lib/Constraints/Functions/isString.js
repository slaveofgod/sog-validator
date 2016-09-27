var TypeValidator = require('../Classes/TypeValidator');

var isString = function(data){
    var _validator = new TypeValidator({
        'type': 'string'
    });

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isString;