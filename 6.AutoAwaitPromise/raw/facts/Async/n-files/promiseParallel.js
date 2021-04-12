let fs = require("fs");

let arr = ["f1.txt", "f2.txt", "f3.txt", "f4.txt"];
console.log("Before");

for(let i = 0 ; i < arr.length ; i++ ){
    let frP = fs.promises.readFile(arr[i]);
    frP.then(cb);
}

function cb(data){
    console.log("Content : "+ data);
}
console.log("After");