sogv.ctype_lower = function (text) {
    // eslint-disable-line camelcase
    //  discuss at: https://locutus.io/php/ctype_lower/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: ctype_lower('abc')
    //   returns 1: true

    if (typeof text !== 'string') {
        return false;
    }

    // ensure setup of localization variables takes place
    sogv.setlocale('LC_ALL', 0);

    var __global; if ('undefined' === typeof global) { __global = global; } else { __global = global; }
    var $global = (typeof window !== 'undefined' ? window : __global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    var p = $locutus.php;

    return text.search(p.locales[p.localeCategories.LC_CTYPE].LC_CTYPE.lw) !== -1;
};