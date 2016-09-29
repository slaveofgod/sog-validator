var TypeValidator = require('../Classes/TypeValidator');

var isInt = function(data, options){
    options = (options == null) ? {'type' : 'int'} : options;
    options['type'] = 'int';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isInt;