
function hello (param) {
    console.log( "Greetings from ", param);
    return "Welcome";
}

let reVal = hello("Nipoon");
console.log(reVal);

//Classical OOPs mai classes are used as Blue Print 

//{} se object declare kar sakte hai usmai key value Pair store hota hai
//Obj is JSON
// JSON is Java Script Object Notation isse koi bhi tarike ka value declare kar sakte hai

let obj = {
    name : "Tony",
    age :35,
    address :{
        city : "LA",
        state : "California"
    },
    isAvenger : true,
    movies : ["Iron Man 1-2-3","Civil War","Avenegers"],
    sayHi : function(param){
        console.log("Greetings from", param);
        return "I am Iron Man";
    }
}

//Display karne ka tareeka Obj

for(let key in obj){
    console.log("Key :", key, "Value :", obj[key]);
}

//Agar galat key access kiya toh undefined output ayega
console.log(obj.pinCode);

// Set aur Update kaise kare Vo dekhte hai Abhi 

obj.friends = ["Pepper", "Robert", "Black Widow"];

//PinCode Add karne ka Try karte hai

obj.address.pinCode = "0118";

//console.log(obj);

//Abhi lets try and Access each object

let prop = "address";

console.log("Name is :",obj.name);
console.log("Address is :", obj[prop]["pinCode"]);
//Array ko access karna ho toh

console.log("Best Friend is",obj.friends[1]);
//Obj delete karna ho toh delete key Word use karo aur obj.key se delete ho jata hai

delete obj.isAvenger;
console.log(obj);

console.log("SaysHi()", obj.sayHi("Nipoon"));