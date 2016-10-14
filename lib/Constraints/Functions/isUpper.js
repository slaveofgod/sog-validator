var TypeValidator = require('../Classes/TypeValidator');

var isUpper = function(data, options){
    options = (options == null) ? {'type' : 'upper'} : options;
    options['type'] = 'upper';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isUpper;