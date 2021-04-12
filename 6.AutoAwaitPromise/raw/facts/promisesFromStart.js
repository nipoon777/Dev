let fs = require("fs");
const { Agent } = require("http");

console.log("Before");

// fs.readFile("f1.txt", cb);
// For example ye dekhte hai

// function sayHello ( giveName, name){
//     return giveName(name);
// }

// // function giveName(name ){
// //     console.log( "hello "+ name);
// // }
// function cb (err, data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Data -> "+ data);
//     }
// }

// console.log("After");

// sayHello(function(name){
//     console.log("Hello "+ name);
// }, "nipoon");
// This is a traditional callback Function through which we achieve async functionality
// Par ismai kafi disadvantages hai
// 1. Hum log call back function ko kitne bar bhi call kar sakte hai
// 2. Iske vajaha se trust issues ho sakte hai Jo hum ek TV buy karne ke example mai padhenge
// 3. Callback function ke vajaha se call back hell ho sakta hai
// 4. JS mai function ko argument ki taraha pas kar sakte hai isse first class function kehte hai
// 5. iska matlab mai argument mai ek function pass karunga jo badmai hum log run kar payenge
// 6. Ye sabhi ke confusion ko avoid karne ke liye ek structure banaya gaya jisse hum promises kehte hai
// 7. Toh promise ek Object ya Token return karta hai aur vo input mai ek resolve aur reject function leta hai
// 8. Jaise agar humne 

//  class Person{
//     firstName;
//     LastName;
//     Age;
//     Education;
// }
// Isse standard man liya hai vaise hi promise class ke object ka ek fixed standard hai jismai hame
// value aur state data members milte hai.
// Ye humlog detail mai custom made promise mai dekhenge.
// Abhi ke liye lets try and make promised read File.
// Ye humne predefined promise ko use kaise kare vo dekha.
// abhi next dekhte hai khud ka promise function kaise banaye
// chaliye shuru karte hai

let promise = fs.promises.readFile("f1.txt");

console.log("Promise ", promise);

console.log("Before promise is resolved");

promise.then(scb);


promise.catch(fcb);

function scb(data){
    console.log("I am resolved");
    console.log("File data" + data);
    console.log(promise);
}

function fcb( err){
    console.log("I am reject");
    console.log(err);
}
console.log("After Promise is resolved");