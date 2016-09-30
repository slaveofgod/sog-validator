/**
 * Validates that a value is a valid date, meaning either a Date object *or a string (or an object that can be cast into a string)* that follows a valid format.
 *
 * @todo: or a string (or an object that can be cast into a string)
 * @author Alexey Bob <alexey.bob@gmail.com>
 */
'use strict';

//import Validator from './AbstractValidator';
var Validator = require('./AbstractValidator');

class AbstractDateValidator extends Validator {
    constructor() {
        super(arguments);

        this.YearMonthDayTokens = ['YYYY', 'YY', 'Y', 'Q', 'MMMM', 'MMM', 'MM', 'M', 'DDDD', 'DDD', 'DD', 'Do', 'D', 'X', 'x'];
        this.WeekYearWeekWeekdayTokens = ['gggg', 'gg', 'ww', 'w', 'e', 'dddd', 'ddd', 'GGGG', 'GG', 'WW', 'W', 'E'];
        this.HourMinuteSecondMillisecondOffsetTokens = ['HH', 'H', 'hh', 'h', 'A', 'a', 'mm', 'm', 'ss', 's', 'SSS', 'SS', 'S', 'ZZ', 'Z'];

        this.DateTokens = ['YYYY', 'YY', 'Y', 'MMMM', 'MMM', 'MM', 'Mo', 'M', 'DD', 'Do', 'D'];
        this.DateTimeTokens = ['YYYY', 'YY', 'Y', 'MMMM', 'MMM', 'MM', 'Mo', 'M', 'DD', 'Do', 'D', 'kk', 'k', 'hh', 'h', 'HH', 'H', 'mm', 'm', 'ss', 's', 'A', 'a'];
        this.TimeTokens = ['kk', 'k', 'hh', 'h', 'HH', 'H', 'mm', 'm', 'ss', 's', 'A', 'a'];

        // http://momentjs.com/docs/#/parsing/is-valid/
        this.AllDateTimeTokens = {
            'Month': ['MMMM', 'MMM', 'MM', 'Mo', 'M'],
            'Quarter': ['Qo', 'Q'],
            'DayOfMonth': ['DD', 'Do', 'D'],
            'DayOfYear': ['DDDD', 'DDDo', 'DDD'],
            'DayOfWeek': ['dddd', 'ddd', 'dd', 'do', 'd'],
            'DayOfWeekLocale': ['e'],
            'DayOfWeekISO': ['E'],
            'WeekOfYear': ['ww', 'wo', 'w'],
            'WeekOfYearISO': ['WW', 'Wo', 'W'],
            'Year': ['YYYY', 'YY', 'Y'],
            'WeekYear': ['gggg', 'gg'],
            'WeekYearISO': ['GGGG', 'GG'],
            'AMPM': ['A', 'a'],
            'Hour': ['kk', 'k', 'hh', 'h', 'HH', 'H'],
            'Minute': ['mm', 'm'],
            'Second': ['ss', 's'],
            'FractionalSecond': ['SSS', 'SS', 'S'],
            'TimeZone': ['zz', 'z', 'ZZ', 'Z'],
            'UnixTimestamp': ['X'],
            'UnixMillisecondTimestamp': ['x']
        }
    }

    isDateTimeFormatValid(format) {
        //var tmpFormat = format.replace(/([^A-Za-z])/g, '');
        var tmpFormat = format.replace(/([ \-\:\.\/\\])/g, '');

        for (var DateTimeTokenKey in this.DateTimeTokens){
            tmpFormat = tmpFormat.replace(this.DateTimeTokens[DateTimeTokenKey], '');
        }

        if(tmpFormat != ''){
            return false;
        }

        var formats = ['Year', 'Month', 'DayOfMonth', 'Hour', 'Minute'];
        var ans = '';

        for (var formatKey in formats){
            var tokens = this.AllDateTimeTokens[formats[formatKey]];
            for (var tokenKey in tokens){
                if (format.indexOf(tokens[tokenKey]) >= 0){
                    ans += 'y';
                    break;
                }
            }
        }

        return (ans == 'yyyyy') ? true : false;
    }

    isDateFormatValid(format) {
        //var tmpFormat = format.replace(/([^A-Za-z])/g, '');
        var tmpFormat = format.replace(/([ \-\:\.\/\\])/g, '');

        for (var DateTokenKey in this.DateTokens){
            tmpFormat = tmpFormat.replace(this.DateTokens[DateTokenKey], '');
        }

        if(tmpFormat != ''){
            return false;
        }

        var formats = ['Year', 'Month', 'DayOfMonth'];
        var ans = '';

        for (var formatKey in formats){
            var tokens = this.AllDateTimeTokens[formats[formatKey]];
            for (var tokenKey in tokens){
                if (format.indexOf(tokens[tokenKey]) >= 0){
                    ans += 'y';
                    break;
                }
            }
        }

        return (ans == 'yyy') ? true : false;
    }

    isTimeFormatValid(format) {
        //var tmpFormat = format.replace(/([^A-Za-z])/g, '');
        var tmpFormat = format.replace(/([ \-\:\.\/\\])/g, '');

        for (var TimeTokenKey in this.TimeTokens){
            tmpFormat = tmpFormat.replace(this.TimeTokens[TimeTokenKey], '');
        }

        if(tmpFormat != ''){
            return false;
        }

        var formats = ['Hour', 'Minute'];
        var ans = '';

        for (var formatKey in formats){
            var tokens = this.AllDateTimeTokens[formats[formatKey]];
            for (var tokenKey in tokens){
                if (format.indexOf(tokens[tokenKey]) >= 0){
                    ans += 'y';
                    break;
                }
            }
        }

        return (ans == 'yy') ? true : false;
    }

//    isDateFormatValid(type, format) {
//        var tokens = [];
//        switch(type){
//            case 'ymd': // Year, month, and day tokens
//                for (var wywwKey in this.WeekYearWeekWeekdayTokens){
//                    tokens.push(this.WeekYearWeekWeekdayTokens[wywwKey]);
//                }
//
//                for (var hmsmoKey in this.HourMinuteSecondMillisecondOffsetTokens){
//                    tokens.push(this.HourMinuteSecondMillisecondOffsetTokens[hmsmoKey]);
//                }
//                break;
//            case 'wyww': // Week year, week, and weekday tokens
//                for (var ymdKey in this.YearMonthDayTokens){
//                    tokens.push(this.YearMonthDayTokens[ymdKey]);
//                }
//
//                for (var hmsmoKey in this.HourMinuteSecondMillisecondOffsetTokens){
//                    tokens.push(this.HourMinuteSecondMillisecondOffsetTokens[hmsmoKey]);
//                }
//                break;
//            case 'hmsmo': // Hour, minute, second, millisecond, and offset tokens
//                for (var ymdKey in this.YearMonthDayTokens){
//                    tokens.push(this.YearMonthDayTokens[ymdKey]);
//                }
//
//                for (var wywwKey in this.WeekYearWeekWeekdayTokens){
//                    tokens.push(this.WeekYearWeekWeekdayTokens[wywwKey]);
//                }
//                break;
//            default:
//                throw new Error('Unsupported type');
//                break;
//        }
//
//        for (var tokensKey in tokens){
//            if (format.indexOf(tokens[tokensKey]) >= 0){
//
//                return false;
//            }
//        }
//
//        return true;
//    }
}

module.exports = AbstractDateValidator;