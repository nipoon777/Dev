let fs = require("fs");

fs.readFile("f1.txt", cb);

function cb (err, data){
    if(err){
        console.log(err);
    }else{
        console.log("content ->" + data);
        fs.readFile("f2.txt", cb1);
    }
}

function cb1 (err, data){
    if(err){
        console.log(err);
    }else{
        console.log("content ->" + data);
        fs.readFile("f3.txt", cb3);
    }
}
function cb3 (err, data){
    if(err){
        console.log(err);
    }else{
        console.log("content ->" + data);
        fs.readFile("f4.txt", cb4);
    }
}
function cb4 (err, data){
    if(err){
        console.log(err);
    }else{
        console.log("content ->" + data);
    }
}