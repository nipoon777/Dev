// Functional Scope.

// let a = 10;

// function fn(){
//     let a = 20;
//     a++;
//     console.log("6", a);
//     if(true){
//         let a = 31;
//         console.log("9", a);
//     }
//     console.log("11", a);
// }
// console.log("13", a);
// fn();
// console.log("15", a);


// Var Ek Functional Scope hai Aur let ek Block Scope variable hai.
var a = 10;

function fn(){
    var a = 20;
    a++;
    console.log("6", a);
    if(true){
        var a = 31;
        console.log("9", a);
    }
    console.log("11", a);
}
console.log("13", a);
fn();
console.log("15", a);