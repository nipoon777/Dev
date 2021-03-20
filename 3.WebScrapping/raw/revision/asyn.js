let fs = require("fs");

console.log("This was before the call");
fs.readFile("f1.txt",'utf8',(err, data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});


console.log("This is After");  