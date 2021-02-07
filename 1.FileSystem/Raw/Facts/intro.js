//top - bottom, left se right

console.log("Hello Js");
//Variable Declare
let a;
//Basic data type -> undefined, number, string, boolean, null
//statically typed language mai int a = 10;
a = 10;
a = "Hi I am a String";
console.log(a);
// prime number hai ki nahi Find Karo
// Syntax exactly similar hai Java ki taraha sirf let is used to declare variables

let n = 23;
let flag = true;

for( let i = 2 ; i * i <= n ; i++){
    if(n % i == 0){
        flag = false;
        break;
    }
}
if(flag){
    console.log(n, "Is Prime");
}else{
    console.log(n, "Is Not Prime");
}