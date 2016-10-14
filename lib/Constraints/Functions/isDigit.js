var TypeValidator = require('../Classes/TypeValidator');

var isDigit = function(data, options){
    options = (options == null) ? {'type' : 'digit'} : options;
    options['type'] = 'digit';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isDigit;