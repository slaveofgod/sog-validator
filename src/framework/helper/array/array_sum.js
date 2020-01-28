/**
 *  Calculate the sum of values in an array
 *  @param  {array}     arr     The input array.
 *  @return {numeric}
 */
sogv.array_sum = function (arr) {
    var sum = 0;

    for (var arrKey in arr){
        sum += (arr[arrKey] * 1);
    }

    return sum;
};