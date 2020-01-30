sogv.ctype_xdigit = function (text) {
    // eslint-disable-line camelcase
    //  discuss at: https://locutus.io/php/ctype_xdigit/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: ctype_xdigit('01dF')
    //   returns 1: true

    if (typeof text !== 'string') {
        return false;
    }
    // ensure setup of localization variables takes place
    sogv.setlocale('LC_ALL', 0);

    var __global; var __variant; if ('undefined' === typeof global) { __global = global; __variant = 1; } else { __global = global; __variant = 2; }
    var $global = (typeof window !== 'undefined' ? window : __global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    var p = $locutus.php;

    return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.xd) !== -1;
};