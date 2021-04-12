let fs = require("fs");
console.log("Before");

// let frP = fs.promises.readFile("f1.txt");

// let thenKP = frP.then( function(data){
//     console.log("Data " + data);
//     return fs.promises.readFile("f2.txt");
// })

// thenKP.then(function(data){
//     console.log("Data " + data);
// });

// (async function fn(){
//     let frP = fs.promises.readFile("f1.txt");
//     console.log("Before Adding await ");
//     let data = await frP;
//     console.log("Data "+ data);
//     console.log("After Reading File");

//     let secondFileData = await fs.promises.readFile("f2.txt");
//     console.log("Second file is read : " + secondFileData);
// })();

(async function (){
    let frP = fs.promises.readFile("f1.txt");
    console.log("Before Adding await");
    frP.then( function(data){
        console.log("Data "+ data);
        console.log("After reading 1st file");

        return fs.promises.readFile("f2.txt");
    }).then(function(data){
        console.log("Second file is read : " + data);
    })
})();

console.log("After");