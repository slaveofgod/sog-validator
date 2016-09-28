var RangeValidator = require('../Classes/RangeValidator');

var isRange = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new RangeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isRange;