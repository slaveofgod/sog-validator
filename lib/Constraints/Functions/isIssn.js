var IssnValidator = require('../Classes/IssnValidator');

var isIssn = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new IssnValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isIssn;