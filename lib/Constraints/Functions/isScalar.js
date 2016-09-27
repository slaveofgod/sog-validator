var TypeValidator = require('../Classes/TypeValidator');

var isScalar = function(data){
    var _validator = new TypeValidator({
        'type': 'scalar'
    });

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isScalar;