var UniqueEntityValidator = require('../Classes/UniqueEntityValidator');

var isUniqueEntity = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new UniqueEntityValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isUniqueEntity;