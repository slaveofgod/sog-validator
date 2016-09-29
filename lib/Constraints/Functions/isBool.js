var TypeValidator = require('../Classes/TypeValidator');

var isBool = function(data, options){
    options = (options == null) ? {'type' : 'bool'} : options;
    options['type'] = 'bool';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isBool;