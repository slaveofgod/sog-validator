var TypeValidator = require('../Classes/TypeValidator');

var isAlpha = function(data, options){
    options = (options == null) ? {'type' : 'alpha'} : options;
    options['type'] = 'alpha';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isAlpha;