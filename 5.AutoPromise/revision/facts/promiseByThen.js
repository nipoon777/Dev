let fs = require("fs");

let frP = fs.promises.readFile("f1.txt");

let thenKaPromise = frP.then(cb);

console.log("Before");

console.log(thenKaPromise);

function cb(data){
    console.log("File data" + data);
    return 10;
}

setTimeout( function (){
    console.log("Then ka Promise", thenKaPromise);
}, 1000 );

// thenKaPromise
// -> thenKaPromise ->  cb return value
// -> cb does not return value then undefined
// -> value -> value
// -> return value agar promise hoga toh uske resolution ka wait karega pending promise ka
// err -> next then will not run

