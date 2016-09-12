/**
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

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

class ValidatorAbstract {

    constructor(params) {
        this._messages = [];
        this._parameters = [];
        this._errors = [];

        this.YearMonthDayTokens = ['YYYY', 'YY', 'Y', 'Q', 'MMMM', 'MMM', 'MM', 'M', 'DDDD', 'DDD', 'DD', 'Do', 'D', 'X', 'x'];
        this.WeekYearWeekWeekdayTokens = ['gggg', 'gg', 'ww', 'w', 'e', 'dddd', 'ddd', 'GGGG', 'GG', 'WW', 'W', 'E'];
        this.HourMinuteSecondMillisecondOffsetTokens = ['HH', 'H', 'hh', 'h', 'A', 'a', 'mm', 'm', 'ss', 's', 'SSS', 'SS', 'S', 'ZZ', 'Z'];

        if (this.constructor === ValidatorAbstract) {
          throw new Error("Can't instantiate abstract class!");
        }
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
        this._errors = [];
    }

    addError(errorMessage){
        this._errors.push(errorMessage);
    }

    isEmpty(val){
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }

    isInvalid() {
        return (this._errors.length > 0) ? true : false;
    }

    isValid() {
        return (this._errors.length <= 0) ? true : false;
    }

    getErrors() {
        return this._errors;
    }

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
}

export default ValidatorAbstract;
