let fs = require("fs");

let frP = fs.promises.readFile("f1.txt");

frP.then(cb).then(cb1).then(cb2).then(cb3);

function cb( data ){
    console.log("Content ->" + data);
    return fs.promises.readFile("f2.txt");
}

function cb1( data ){
    console.log("Content ->" + data);
    return fs.promises.readFile("f3.txt");
}
function cb2( data ){
    console.log("Content ->" + data);
    return fs.promises.readFile("f4.txt");
}
function cb3( data ){
    console.log("Content ->" + data);
}