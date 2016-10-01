var ChoiceValidator = require('../Classes/ChoiceValidator');

var isInMultiple = function(data, options){
    options = (options == null) ? {'multiple': true} : options;
    options['multiple'] = true;

    var _validator = new ChoiceValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isInMultiple;