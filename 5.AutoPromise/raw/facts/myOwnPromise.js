let fs = require("fs");


function promisifiedReadFile(filepath){
    return new Promise ( function(resolve, reject){
        fs.readFile(filepath, function cb (err, data){
            if(err){
                //Reject should be called
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}
//achieve -> user

let fReadPromise = promisifiedReadFile("f1.txt");

console.log(fReadPromise);

fReadPromise
.then(function (data){
    console.log("Content -> " + data);
});

fReadPromise
.catch (function (err){
    console.log(err);
});