abv.is_iterable = function (mixedVar) {
    return (mixedVar && 'function' === typeof mixedVar[Symbol.iterator]) ? true : false;
};