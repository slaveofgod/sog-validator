var TypeValidator = require('../Classes/TypeValidator');

var isArray = function(data, options){
    options = (options == null) ? {'type' : 'array'} : options;
    options['type'] = 'array';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isArray;