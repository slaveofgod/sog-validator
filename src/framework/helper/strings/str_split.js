sogv.str_split = function (str, split_length) {
    //Convert a string to an array

    if(split_length == null){
        split_length = 1;
    }

    str = str + '';
    var res = [];
    res[0] = '';
    var key = 0;
    var iterator = 0;
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
};