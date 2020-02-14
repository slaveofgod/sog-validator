sogv.array_sum = function (arr) {
    // Calculate the sum of values in an array

    var sum = 0;

    for (var arrKey in arr){
        sum += (arr[arrKey] * 1);
    }

    return sum;
};