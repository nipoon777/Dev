let fs = require("fs");

let arr = ["f1.txt", "f2.txt", "f3.txt", "f4.txt"];
console.log("Before");
for( let i = 0 ; i < arr.length ; i++ ){
    fs.readFile(arr[i], callback);
    function callback(err, resp){
        if(err){
            console.log(err);
        }else{
            console.log("Data : " + resp);
        }
    }
}
console.log("after");