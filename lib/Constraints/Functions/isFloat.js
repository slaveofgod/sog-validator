var TypeValidator = require('../Classes/TypeValidator');

var isFloat = function(data, options){
    options = (options == null) ? {'type' : 'float'} : options;
    options['type'] = 'float';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isFloat;