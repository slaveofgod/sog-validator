var TypeValidator = require('../Classes/TypeValidator');

var isXdigit = function(data, options){
    options = (options == null) ? {'type' : 'xdigit'} : options;
    options['type'] = 'xdigit';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isXdigit;