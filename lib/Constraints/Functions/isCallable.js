var TypeValidator = require('../Classes/TypeValidator');

var isCallable = function(data, options){
    options = (options == null) ? {'type' : 'callable'} : options;
    options['type'] = 'callable';

    var _validator = new TypeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isCallable;