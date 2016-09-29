var TypeValidator = require('../Classes/TypeValidator');

var isScalar = function(data, options){
    options = (options == null) ? {'type' : 'scalar'} : options;
    options['type'] = 'scalar';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isScalar;