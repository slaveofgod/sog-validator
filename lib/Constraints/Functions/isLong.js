var TypeValidator = require('../Classes/TypeValidator');

var isLong = function(data, options){
    options = (options == null) ? {'type' : 'long'} : options;
    options['type'] = 'long';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isLong;