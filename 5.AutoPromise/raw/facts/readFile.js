let fs = require("fs");
console.log("Before");
// fs.readFile("f1.txt", function (err, data ) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data + "");
//     }
// });

let promise = fs.promises.readFile("f1.txt");
console.log("Before State : ", promise );

console.log("After");
// Not a correct way to check if promise is completed
// setTimeout(function (){
//     console.log("Final State : ", promise );
// }, 2000);
//We use Consumer Functions instead for promises

promise.then(function (data){
    console.log("data : ",data);
});


//In case of error we get it in catch

promise.catch(function (err) {
    console.log("Err : ", err);
});


console.log("Hello");

