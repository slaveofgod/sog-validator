var BlankValidator = require('../Classes/BlankValidator');

var isBlank = function(data){
    var _validator = new BlankValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isBlank;