var TypeValidator = require('../Classes/TypeValidator');

var isAlnum = function(data, options){
    options = (options == null) ? {'type' : 'alnum'} : options;
    options['type'] = 'alnum';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isAlnum;