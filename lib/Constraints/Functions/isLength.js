var LengthValidator = require('../Classes/LengthValidator');

var isLength = function(data, options){
    var _validator = new LengthValidator({
        'min': 5,
        'max': 10,
    });

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isLength;