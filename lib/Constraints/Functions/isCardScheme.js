var CardSchemeValidator = require('../Classes/CardSchemeValidator');

var isCardScheme = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new CardSchemeValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isCardScheme;