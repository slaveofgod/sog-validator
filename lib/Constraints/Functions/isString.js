var TypeValidator = require('../Classes/TypeValidator');

var isString = function(data, options){
    options = (options == null) ? {'type' : 'string'} : options;
    options['type'] = 'string';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isString;