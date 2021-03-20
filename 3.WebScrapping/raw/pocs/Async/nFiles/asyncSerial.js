let fs = require("fs");

let arr = ["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt"];

console.log("Before");
function reader(arr, n){
    if(n == arr.length){
        return;
    }else{
        fs.readFile(arr[n], function (err, data){
            if ( err ){
                console.log(err);
            }else{
                console.log("data " + data);
            }
        })
        reader(arr, n + 1);
    }

}

reader(arr, 0);
console.log("After");