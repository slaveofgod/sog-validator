var IsbnValidator = require('../Classes/IsbnValidator');

var isIsbn = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new IsbnValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isIsbn;