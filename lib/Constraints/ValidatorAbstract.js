/**
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

import ValidationError from '../Context/ValidationError';

if (!String.prototype.format) {
    String.prototype.format = function(args) {
        return this.replace(/{{ (\w+) }}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
            ;
        });
    };
}

// only run when the substr() function is broken
if ('ab'.substr(-1) != 'b') {
  /**
   *  Get the substring of a string
   *  @param  {integer}  start   where to start the substring
   *  @param  {integer}  length  how many characters to return
   *  @return {string}
   */
  String.prototype.substr = function(substr) {
    return function(start, length) {
      // call the original method
      return substr.call(this,
      	// did we get a negative start, calculate how much it is from the beginning of the string
        // adjust the start parameter for negative value
        start < 0 ? this.length + start : start,
        length)
    }
  }(String.prototype.substr);
}

class ValidatorAbstract {

    constructor(params) {
        this._messages = [];
        this._parameters = [];
        this._errors = [];
        this._hasErrors = false;
        this._errorType = 'array';

        this.YearMonthDayTokens = ['YYYY', 'YY', 'Y', 'Q', 'MMMM', 'MMM', 'MM', 'M', 'DDDD', 'DDD', 'DD', 'Do', 'D', 'X', 'x'];
        this.WeekYearWeekWeekdayTokens = ['gggg', 'gg', 'ww', 'w', 'e', 'dddd', 'ddd', 'GGGG', 'GG', 'WW', 'W', 'E'];
        this.HourMinuteSecondMillisecondOffsetTokens = ['HH', 'H', 'hh', 'h', 'A', 'a', 'mm', 'm', 'ss', 's', 'SSS', 'SS', 'S', 'ZZ', 'Z'];

        if (this.constructor === ValidatorAbstract) {
          throw new Error("Can't instantiate abstract class!");
        }
    }

    setErrorType(errorType) {
        if(!this.inArray(errorType, ['array', 'object'], false)) {
            throw new Error(`Unsupported error type \"${errorType}\"`);
        }

        this._errorType = errorType;
    }

    getErrorType() {
        return this._errorType;
    }

    setDefaultMessages(data) {
        this._messages = data;
    }

    setMessage(key, value) {
        if(this.isEmpty(value) == false){
            if(!(key in this._messages)){
                throw new Error(`Message key \"${key}\" does not exist`);
            }

            this._messages[key] = value;
        }
    }

    getMessage(key) {
        if(!(key in this._messages)){
            throw new Error(`Message key \"${key}\" does not exist`);
        }

        return this._messages[key];
    }

    setDefaultParameters(data) {
        this._parameters = data;
    }

    setParameter(key, value) {
        if(this.isEmpty(value) == false){
            if(!(key in this._parameters)){
                throw new Error(`Parameter key \"${key}\" does not exist`);
            }

            this._parameters[key] = value;
        }
    }

    getParameter(key) {
        if(!(key in this._parameters)){
            throw new Error(`Message key \"${key}\" does not exist`);
        }

        return this._parameters[key];
    }

    getParameters() {
        return this._parameters;
    }

    resetErrors() {
        this._hasErrors = false;
        this._errors = null;
    }

    addError(errorMessage){
        this._hasErrors = true;

        switch(this.getErrorType()){
            case 'array':
                if(this._errors == null){
                    this._errors = [];
                }

                this._errors.push(errorMessage);

                break;
            case 'object':
                if(this._errors == null){
                    this._errors = new ValidationError();
                }

                this._errors.addError(errorMessage);

                break;
        }
    }

    isEmpty(val){
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }

    isInvalid() {
        return (this._hasErrors == true) ? true : false;
    }

    isValid() {
        return (this._hasErrors == true) ? false : true;
    }

    getErrors() {
        return this._errors;
    }

    setErrors(errors) {
        this._hasErrors = true;
        this._errors = errors;
    }

    isDateFormatValid(type, format) {
        let tokens = [];
        switch(type){
            case 'ymd': // Year, month, and day tokens
                for (var wywwKey in this.WeekYearWeekWeekdayTokens){
                    tokens.push(this.WeekYearWeekWeekdayTokens[wywwKey]);
                }

                for (var hmsmoKey in this.HourMinuteSecondMillisecondOffsetTokens){
                    tokens.push(this.HourMinuteSecondMillisecondOffsetTokens[hmsmoKey]);
                }
                break;
            case 'wyww': // Week year, week, and weekday tokens
                for (var ymdKey in this.YearMonthDayTokens){
                    tokens.push(this.YearMonthDayTokens[ymdKey]);
                }

                for (var hmsmoKey in this.HourMinuteSecondMillisecondOffsetTokens){
                    tokens.push(this.HourMinuteSecondMillisecondOffsetTokens[hmsmoKey]);
                }
                break;
            case 'hmsmo': // Hour, minute, second, millisecond, and offset tokens
                for (var ymdKey in this.YearMonthDayTokens){
                    tokens.push(this.YearMonthDayTokens[ymdKey]);
                }

                for (var wywwKey in this.WeekYearWeekWeekdayTokens){
                    tokens.push(this.WeekYearWeekWeekdayTokens[wywwKey]);
                }
                break;
            default:
                throw new Error('Unsupported type');
                break;
        }

        for (var tokensKey in tokens){
            if (format.indexOf(tokens[tokensKey]) >= 0){

                return false;
            }
        }

        return true;
    }
    /* ------------------------------------------------------------------------------------------------------------------------------------------------------ */
    inArray(needle, haystack, strict) {
        for (var haystackKey in haystack){
            if(strict == true && haystack[haystackKey] === needle){
                return true;
            }else if(strict == false && haystack[haystackKey] == needle){
                return true;
            }
        }

        return false;
    }

    ord (string) {
        //  discuss at: http://locutus.io/php/ord/
        // original by: Kevin van Zonneveld (http://kvz.io)
        // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        // improved by: Brett Zamir (http://brett-zamir.me)
        //    input by: incidence
        //   example 1: ord('K')
        //   returns 1: 75
        //   example 2: ord('\uD800\uDC00'); // surrogate pair to create a single Unicode character
        //   returns 2: 65536

        var str = string + '';
        var code = str.charCodeAt(0);

        if (code >= 0xD800 && code <= 0xDBFF) {
            // High surrogate (could change last hex to 0xDB7F to treat
            // high private surrogates as single characters)
            var hi = code;
            if (str.length === 1) {
                // This is just a high surrogate with no following low surrogate,
                // so we return its value;
                return code;
                // we could also throw an error as it is not a complete character,
                // but someone may want to know
            }
            var low = str.charCodeAt(1);
            return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
        }
        if (code >= 0xDC00 && code <= 0xDFFF) {
            // Low surrogate
            // This is just a low surrogate with no preceding high surrogate,
            // so we return its value;
            return code;
            // we could also throw an error as it is not a complete character,
            // but someone may want to know
        }

        return code;
    }

    /**
     *  Check for alphanumeric character(s)
     *  @param  {string}    str             The tested string.
     *  @return {boolean}
     */
    ctype_alnum(str) {
        return /^[A-Za-z0-9]+$/.test(str);
    }

    /**
     *  Check for alphabetic character(s)
     *  @param  {string}    str             The tested string.
     *  @return {boolean}
     */
    ctype_alpha(str) {
        return /^[A-Za-z]+$/.test(str);
    }

    /**
     *  Check for uppercase character(s)
     *  @param  {string}    str             The tested string.
     *  @return {boolean}
     */
    ctype_upper(str) {
        return /^[A-Z]+$/.test(str);
    }

    /**
     *  Convert a string to an array
     *  @param  {string}    str             The input string.
     *  @param  {integer}   split_length    Maximum length of the chunk.
     *  @return {array}
     */
    str_split(str, split_length = 1) {
        str = str + '';
        let res = [];
        res[0] = '';
        let key = 0;
        let iterator = 0;
        for (var strKey in str){
            if(!str.hasOwnProperty(strKey)){
                continue;
            }

            if(iterator == split_length){
                iterator = 0;
                key ++;
                res[key] = '';
            }

            res[key] += str[strKey];

            iterator ++;
        }

        return res;
    }

    /**
     *  Check for numeric character(s)
     *  @param  {string}     text     The tested string.
     *  @return {boolean}
     */
    ctype_digit(text) {
        return /^[0-9]+$/.test(text);
    }

    /**
     *  Calculate the sum of values in an array
     *  @param  {array}     arr     The input array.
     *  @return {numeric}
     */
    array_sum(arr) {
        let sum = 0;

        for (var arrKey in arr){
            sum += (arr[arrKey] * 1);
        }

        return sum;
    }
}

export default ValidatorAbstract;
