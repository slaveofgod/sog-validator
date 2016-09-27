var UrlValidator = require('../Classes/UrlValidator');

var isUrl = function(data){
    var _validator = new UrlValidator({});

    _validator.validate(data);

    return _validator.isValid() ? true : false;
};

module.exports = isUrl;