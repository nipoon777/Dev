const { Console } = require("console");
let fs = require("fs");

console.log("Before");

// Just like callback which use Async Architecture we have another feature known as Promises which is Used in Js

// fs.readFile("f1.txt", function cb(err, data){
//     if(err){
//         console.log(err);
//     }else {
//         console.log("Data ->" + data);
//     }
// } );
console.log("Before Promise");
let promise = fs.promises.readFile("f1.txt");


console.log("Before State :" + promise);

promise.then (function (data) {
    console.log("Data -> ", data );
});

promise.catch( function(err){
    console.log("Error" + err);
});

console.log("After");
console.log("SayHi");