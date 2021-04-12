let fs = require("fs");

let arr = ["f1.txt", "f2.txt", "f3.txt", "f4.txt"];

console.log("Before");

let frP = fs.promises.readFile(arr[0]);

for(let i = 1 ; i < arr.length ; i++ ){
    frP = frP.then(function(data){
        console.log("Content :" + data);
        return fs.promises.readFile(arr[i]);
    });
}

frP.then(function(data){
    console.log("Content :" + data);
});

console.log("After");