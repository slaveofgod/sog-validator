var TypeValidator = require('../Classes/TypeValidator');

var isSpace = function(data, options){
    options = (options == null) ? {'type' : 'space'} : options;
    options['type'] = 'space';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isSpace;