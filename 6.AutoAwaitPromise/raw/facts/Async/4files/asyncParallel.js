let fs = require("fs");

fs.readFile("f1.txt", cb1);

fs.readFile("f2.txt", cb2);

fs.readFile("f3.txt", cb3);

fs.readFile("f4.txt", cb4);

function cb1(err, data){
    if(err){
        console.log(err);
    }else{
        console.log("Content" + data);
    }
}
function cb2(err, data){
    if(err){
        console.log(err);
    }else{
        console.log("Content" + data);
    }
}
function cb3(err, data){
    if(err){
        console.log(err);
    }else{
        console.log("Content" + data);
    }
}
function cb4(err, data){
    if(err){
        console.log(err);
    }else{
        console.log("Content" + data);
    }
}