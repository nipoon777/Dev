let myHello = ["hello", "Hi", "How are you", "vadakam"];
/* 
    ye sare index ko individual variables mai store karta hai
    Agar koi variable ki value nahi chahiye ho toh uss index ko blank chodna
    agar array ka size is greater than the input array to jo fields array mai na ho
    unke jagaha undefined ayega
    in that case 
    default values de sakte hai
    let [greeting, welcome = "Hi", nature = "good", bhulta = "nahi"]
*/
// let [greeting, welcome, nature, bhulta] = myHello;
// console.log(greeting);
// console.log(bhulta);

let newArr = ["hi", "hello"];

let [welcome, hi ="nipp" , done ="not yet" ] = newArr;

console.log(welcome);
console.log(hi);
console.log(done);