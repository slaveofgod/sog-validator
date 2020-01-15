abv.ctype_alpha = function (text) {
    // eslint-disable-line camelcase
    //  discuss at: https://locutus.io/php/ctype_alpha/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: ctype_alpha('Az')
    //   returns 1: true

    if (typeof text !== 'string') {
        return false;
    }
    // ensure setup of localization variables takes place
    abv.setlocale('LC_ALL', 0);

    var $global = (typeof window !== 'undefined' ? window : global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    var p = $locutus.php;

    return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.al) !== -1;
};