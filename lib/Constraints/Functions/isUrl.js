var UrlValidator = require('../Classes/UrlValidator');

var isUrl = function(data, options){
    options = (options == null) ? {} : options;

    var _validator = new UrlValidator(options);

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isUrl;