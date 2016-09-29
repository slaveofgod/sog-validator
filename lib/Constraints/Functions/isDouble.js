var TypeValidator = require('../Classes/TypeValidator');

var isDouble = function(data, options){
    options = (options == null) ? {'type' : 'double'} : options;
    options['type'] = 'double';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isDouble;