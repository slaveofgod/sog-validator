var TypeValidator = require('../Classes/TypeValidator');

var isLower = function(data, options){
    options = (options == null) ? {'type' : 'lower'} : options;
    options['type'] = 'lower';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isLower;