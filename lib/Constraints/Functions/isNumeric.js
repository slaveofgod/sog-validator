var TypeValidator = require('../Classes/TypeValidator');

var isNumeric = function(data){
    var _validator = new TypeValidator({
        'type': 'numeric'
    });

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isNumeric;