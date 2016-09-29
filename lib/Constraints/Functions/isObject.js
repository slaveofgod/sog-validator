var TypeValidator = require('../Classes/TypeValidator');

var isObject = function(data, options){
    options = (options == null) ? {'type' : 'object'} : options;
    options['type'] = 'object';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isObject;