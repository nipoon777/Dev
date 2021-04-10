let fs = require("fs");

let frP1 = fs.promises.readFile("f1.txt");
let frP2 = fs.promises.readFile("f2.txt");
let frP3 = fs.promises.readFile("f3.txt");
let frP4 = fs.promises.readFile("f4.txt");


// frP1.then(function(data){
//     console.log("Content" + data);
// });

// frP2.then(function(data){
//     console.log("Content" + data);
// });

// frP3.then(function(data){
//     console.log("Content" + data);
// });

// frP4.then(function(data){
//     console.log("Content" + data);
// });

frP1.then(cb);
frP2.then(cb);
frP3.then(cb);
frP4.then(cb);

function cb(data){
    console.log("Content "+ data);
}