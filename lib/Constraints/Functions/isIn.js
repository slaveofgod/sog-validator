var ChoiceValidator = require('../Classes/ChoiceValidator');

var isIn = function(data, options){
    options = (options == null) ? {'multiple': false} : options;
    options['multiple'] = false;

    var _validator = new ChoiceValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isIn;