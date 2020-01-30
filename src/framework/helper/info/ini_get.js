sogv.ini_get = function (varname) {
    // eslint-disable-line camelcase
    //  discuss at: https://locutus.io/php/ini_get/
    // original by: Brett Zamir (https://brett-zamir.me)
    //      note 1: The ini values must be set by ini_set or manually within an ini file
    //   example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
    //   example 1: ini_get('date.timezone')
    //   returns 1: 'Asia/Hong_Kong'

    var __global; var __variant; if ('undefined' === typeof global) { __global = global; __variant = 1; } else { __global = global; __variant = 2; } if (3 === __variant) { return; }
    var $global = (typeof window !== 'undefined' ? window : __global);
    $global.$locutus = $global.$locutus || {};
    var $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    $locutus.php.ini = $locutus.php.ini || {};

    if ($locutus.php.ini[varname] && $locutus.php.ini[varname].local_value !== undefined) {
        if ($locutus.php.ini[varname].local_value === null) {
            return '';
        }
        return $locutus.php.ini[varname].local_value;
    }

    return '';
};