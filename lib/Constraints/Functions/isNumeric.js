var TypeValidator = require('../Classes/TypeValidator');

var isNumeric = function(data, options){
    options = (options == null) ? {'type' : 'numeric'} : options;
    options['type'] = 'numeric';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isNumeric;