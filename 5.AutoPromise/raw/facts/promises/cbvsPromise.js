let fs = require("fs");

console.log("Before");

function readFileValaPromise(filepath){
    return new Promise ( function (resolve, reject ) {
        fs.readFile(filepath, function cb(err, data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

let promise = readFileValaPromise("../f1.txt");

console.log("Initial State -> " , promise);

promise.then(function (data){
    console.log(data);
});

promise.catch(function (err) {
    console.log("Err -> " + err);
})