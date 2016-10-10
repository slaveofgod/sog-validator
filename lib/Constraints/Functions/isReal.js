var TypeValidator = require('../Classes/TypeValidator');

var isReal = function(data, options){
    options = (options == null) ? {'type' : 'real'} : options;
    options['type'] = 'real';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isReal;